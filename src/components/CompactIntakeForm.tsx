import React, { useState } from 'react';
import {
  ClientBrief,
  WebsiteType,
  DesignStyleId,
  BudgetRange,
  LaunchTimeline,
} from '../types/brief';
import { WEBSITE_TYPES, DESIGN_STYLES, COLOR_PALETTES } from '../constants/presets';
import {
  Send,
  Building2,
  Phone,
  Globe,
  Palette,
  Check,
  Sparkles,
  ShieldCheck,
  Plus,
  X,
  Sliders,
  MessageCircle,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import {
  buildWhatsAppUrl,
  getAgencyWhatsAppNumber,
  setAgencyWhatsAppNumber,
} from '../constants/contactConfig';

interface CompactIntakeFormProps {
  onSaveBrief: (brief: ClientBrief) => void;
  onSuccess?: (brief: ClientBrief) => void;
}

const COMMON_PAGES_OPTIONS = [
  'Home (ໜ້າຫຼັກ)',
  'About Us (ກ່ຽວກັບພວກເຮົາ)',
  'Services / Products (ບໍລິການ / ສິນຄ້າ)',
  'Shop / Catalog (ລາຍການສິນຄ້າ)',
  'Booking / Reservation (ຈອງອອນລາຍ)',
  'Portfolio / Works (ຜົນງານທີ່ຜ່ານມາ)',
  'Pricing / Packages (ລາຄາ / ແພັກເກດ)',
  'Blog / News (ຂ່າວສານ & ບົດຄວາມ)',
  'Contact Us (ຕິດຕໍ່ສອບຖາມ)',
  'FAQ (ຄຳຖາມທີ່ພົບເລື້ອຍ)',
];

const POPULAR_FEATURES = [
  { id: 'multilingual', label: 'ຫຼາຍພາສາ (Lao + Eng)' },
  { id: 'bcel_one_qr', label: 'ຈ່າຍເງິນ BCEL One QR' },
  { id: 'cart_checkout', label: 'ກະຕ່າສິນຄ້າ (Shopping Cart)' },
  { id: 'booking_calendar', label: 'ປະຕິທິນຈອງວັນ-ເວລາ' },
  { id: 'whatsapp_chat', label: 'ປຸ່ມແຊັດ WhatsApp / Line' },
  { id: 'admin_dashboard', label: 'ລະບົບຫຼັງບ້ານແກ້ໄຂເອງ (CMS)' },
  { id: 'seo_optimization', label: 'SEO ຕິດ Google' },
  { id: 'page_speed_guarantee', label: 'ໂຫຼດໄວຕໍ່າກວ່າ 2 ວິນາທີ' },
  { id: 'google_map', label: 'ແຜນທີ່ Google Maps' },
  { id: 'social_integration', label: 'ເຊື່ອມຕໍ່ Facebook / TikTok' },
];

export const CompactIntakeForm: React.FC<CompactIntakeFormProps> = ({
  onSaveBrief,
  onSuccess,
}) => {
  // Submission status for inline notification (no popup modal)
  const [submittedBrief, setSubmittedBrief] = useState<ClientBrief | null>(null);

  // 1. Business Info
  const [clientName, setClientName] = useState('');
  const [companyName, setCompanyName] = useState(''); // Optional!
  const [phone, setPhone] = useState('');
  const [whatsappOrLine, setWhatsappOrLine] = useState('');
  const [businessCategory, setBusinessCategory] = useState('');
  const [businessDescription, setBusinessDescription] = useState('');

  // 2. Website Type & Pages
  const [websiteType, setWebsiteType] = useState<WebsiteType>('corporate');
  const [isOtherWebsiteType, setIsOtherWebsiteType] = useState(false);
  const [customWebsiteType, setCustomWebsiteType] = useState('');
  const [primaryGoal, setPrimaryGoal] = useState('');
  const [selectedPages, setSelectedPages] = useState<string[]>([
    'Home (ໜ້າຫຼັກ)',
    'About Us (ກ່ຽວກັບພວກເຮົາ)',
    'Services / Products (ບໍລິການ / ສິນຄ້າ)',
    'Contact Us (ຕິດຕໍ່ສອບຖາມ)',
  ]);
  const [newPageInput, setNewPageInput] = useState('');
  const [customPagesList, setCustomPagesList] = useState<string[]>([]);

  // 3. Design & Style (Customizable)
  const [designStyle, setDesignStyle] = useState<DesignStyleId>('minimal_luxury');
  const [isCustomDesignStyle, setIsCustomDesignStyle] = useState(false);
  const [customDesignStyleText, setCustomDesignStyleText] = useState('');
  const [colorPaletteId, setColorPaletteId] = useState<string>('slate_corporate');
  const [isCustomColors, setIsCustomColors] = useState(false);
  const [customPrimaryColor, setCustomPrimaryColor] = useState('#0F172A');
  const [customAccentColor, setCustomAccentColor] = useState('#2563EB');
  const [referenceUrls, setReferenceUrls] = useState('');

  // 4. Features
  const [features, setFeatures] = useState<string[]>([
    'multilingual',
    'whatsapp_chat',
    'seo_optimization',
    'page_speed_guarantee',
  ]);

  // Additional Notes
  const [additionalNotes, setAdditionalNotes] = useState('');

  const togglePage = (page: string) => {
    setSelectedPages((prev) =>
      prev.includes(page) ? prev.filter((p) => p !== page) : [...prev, page]
    );
  };

  const handleAddCustomPage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPageInput.trim() && !customPagesList.includes(newPageInput.trim())) {
      const pageName = newPageInput.trim();
      setCustomPagesList((prev) => [...prev, pageName]);
      setSelectedPages((prev) => [...prev, pageName]);
      setNewPageInput('');
    }
  };

  const removeCustomPage = (pageName: string) => {
    setCustomPagesList((prev) => prev.filter((p) => p !== pageName));
    setSelectedPages((prev) => prev.filter((p) => p !== pageName));
  };

  const toggleFeature = (featId: string) => {
    setFeatures((prev) =>
      prev.includes(featId) ? prev.filter((f) => f !== featId) : [...prev, featId]
    );
  };

  const buildBriefData = (): ClientBrief => {
    let complexity: 'Low' | 'Medium' | 'High' | 'Enterprise' = 'Medium';
    let estBudget = '25,000,000 - 35,000,000 LAK';
    let estWeeks = '3 - 4 ອາທິດ';

    if (
      features.includes('cart_checkout') ||
      features.includes('bcel_one_qr') ||
      websiteType === 'ecommerce'
    ) {
      complexity = 'High';
      estBudget = '35,000,000 - 50,000,000 LAK';
      estWeeks = '4 - 6 ອາທິດ';
    } else if (websiteType === 'custom_app') {
      complexity = 'Enterprise';
      estBudget = '60,000,000+ LAK';
      estWeeks = '8 - 12 ອາທິດ';
    }

    const finalCompanyName = companyName.trim() || clientName.trim() || 'ລູກຄ້າທົ່ວໄປ';

    return {
      id: `brief-${Date.now().toString().slice(-4)}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      status: 'new',
      clientName: clientName.trim(),
      companyName: finalCompanyName,
      email: '',
      phone: phone.trim(),
      whatsappOrLine: whatsappOrLine.trim(),
      businessCategory: businessCategory.trim() || 'ທຸລະກິດທົ່ວໄປ',
      businessDescription: businessDescription.trim(),
      targetAudience: '',
      websiteType,
      customWebsiteType: isOtherWebsiteType ? customWebsiteType.trim() : undefined,
      primaryGoal: primaryGoal.trim() || 'ສ້າງເວັບໄຊມາດຕະຖານຕາມຄວາມຕ້ອງການຂອງລູກຄ້າ',
      selectedPages,
      customPages: customPagesList.join(', '),
      designStyle,
      customDesignStyle: isCustomDesignStyle ? customDesignStyleText.trim() : undefined,
      colorPaletteId: isCustomColors ? 'custom' : colorPaletteId,
      customPrimaryColor: isCustomColors ? customPrimaryColor : undefined,
      customSecondaryColor: isCustomColors ? customAccentColor : undefined,
      visualMoodKeywords: ['ທັນສະໄໝ', 'ໜ້າເຊື່ອຖື'],
      typographyPreference: 'modern_sans',
      referenceUrls: referenceUrls.trim(),
      features,
      languages: ['lo', 'en'],
      paymentMethods: features.includes('bcel_one_qr') ? ['bcel_one'] : [],
      logoStatus: 'ready',
      copywritingStatus: 'partial',
      photographyStatus: 'ready_hd',
      domainHostingStatus: 'need_agency_recommendation',
      budgetRange: 'flexible',
      timeline: 'flexible',
      paymentTerms: 'single_full_payment',
      warrantyPeriod: '1_year',
      additionalNotes: additionalNotes.trim(),
      estimatedComplexity: complexity,
      estimatedTimelineWeeks: estWeeks,
      estimatedBudgetEstimateLo: estBudget,
      estimatedBudgetEstimateEn: '$1,200 - $2,200 USD',
      recommendedTechStack: {
        frontend: 'React 19 + TypeScript + Tailwind CSS',
        backend: 'Node.js / Supabase Edge Cloud',
        database: 'PostgreSQL Cloud',
        hosting: 'Cloud Hosting with Global CDN',
        payment: features.includes('bcel_one_qr')
          ? 'BCEL OnePay QR Gateway'
          : 'Direct Payment (ງວດດຽວຈົບ)',
      },
      standardsAudit: [],
    };
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!clientName.trim()) {
      alert('ກະລຸນາປ້ອນຊື່ ແລະ ນາມສະກຸນ ຜູ້ຕິດຕໍ່ກ່ອນ (Please enter contact name)');
      return;
    }
    if (!phone.trim()) {
      alert('ກະລຸນາປ້ອນເບີໂທລະສັບ / WhatsApp ກ່ອນ (Please enter phone number)');
      return;
    }

    const newBrief = buildBriefData();
    onSaveBrief(newBrief);
    setSubmittedBrief(newBrief);

    try {
      confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
    } catch {
      // ignore
    }

    let targetNumber = getAgencyWhatsAppNumber();
    if (targetNumber === '85620XXXXXXXX' || !targetNumber) {
      const userEntered = window.prompt(
        'ກະລຸນາໃສ່ເບີ WhatsApp ຂອງທ່ານສຳລັບຮັບຂໍ້ມູນ (ຕົວຢ່າງ: 8562099998888 ຕັດເລກ 0 ອອກ):\n*(ຫຼື ສາມາດເຂົ້າໄປປ່ຽນຖາວອນໄດ້ໃນໄຟລ໌ src/constants/contactConfig.ts)*',
        ''
      );
      if (userEntered && userEntered.trim()) {
        const clean = userEntered.replace(/[^0-9]/g, '');
        setAgencyWhatsAppNumber(clean);
        targetNumber = clean;
      } else {
        return;
      }
    }

    const waUrl = buildWhatsAppUrl(newBrief, targetNumber);
    window.open(waUrl, '_blank');
  };

  return (
    <div className="w-full max-w-4xl mx-auto py-4 sm:py-6 px-3 sm:px-6">
      {/* Form Container */}
      <div className="bg-white border border-neutral-200 rounded-xl sm:rounded-2xl shadow-xs overflow-hidden">
        {/* Banner Header */}
        <div className="bg-neutral-900 text-white p-4 sm:p-6">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[11px] sm:text-xs font-mono tracking-wider uppercase font-semibold text-neutral-300">
              Web Discovery Form · ຟອມເກັບກຳຄວາມຕ້ອງການລູກຄ້າ
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight">
            ເກັບກຳຂໍ້ມູນການສ້າງເວັບໄຊຂອງລູກຄ້າ
          </h1>
          <p className="text-xs sm:text-sm text-neutral-300 mt-1 max-w-2xl">
            ຕື່ມຂໍ້ມູນຄວາມຕ້ອງການ ເພື່ອໃຫ້ທີມງານອອກແບບ ແລະ ພັດທະນາເວັບໄຊໄດ້ຕົງຕາມມາດຕະຖານຂອງທ່ານ
          </p>
        </div>

        {/* Inline Success Banner if brief was submitted to WhatsApp */}
        {submittedBrief && (
          <div className="bg-emerald-50 border-b border-emerald-200 p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0">
                <Check className="w-5 h-5" />
              </div>
              <div>
                <p className="font-bold text-emerald-950 text-sm">
                  ລະບົບໄດ້ເປີດ WhatsApp ເພື່ອສົ່ງຂໍ້ມູນຫາທີມງານຮຽບຮ້ອຍແລ້ວ!
                </p>
                <p className="text-emerald-700 mt-0.5">
                  ຂໍ້ມູນຂອງ {submittedBrief.clientName} ໄດ້ຖືກບັນທຶກ ແລະ ສັງເຄາະແລ້ວ.
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => {
                const waUrl = buildWhatsAppUrl(submittedBrief, getAgencyWhatsAppNumber());
                window.open(waUrl, '_blank');
              }}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg flex items-center gap-1.5 cursor-pointer shadow-2xs shrink-0"
            >
              <MessageCircle className="w-4 h-4" />
              <span>ເປີດ WhatsApp ອີກຄັ້ງ</span>
            </button>
          </div>
        )}

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-4 sm:p-6 md:p-8 space-y-6 sm:space-y-8">
          {/* SECTION 1: Client & Business Info */}
          <div>
            <div className="flex items-center gap-2 pb-2 mb-3.5 border-b border-neutral-100">
              <Building2 className="w-4 h-4 text-neutral-800" />
              <h2 className="text-sm sm:text-base font-bold text-neutral-900">
                1. ຂໍ້ມູນລູກຄ້າ & ທຸລະກິດ (Client & Business Info)
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
              {/* Contact Person Name (Required) */}
              <div>
                <label className="block text-xs font-semibold text-neutral-800 mb-1">
                  ຊື່ ແລະ ນາມສະກຸນ ຜູ້ຕິດຕໍ່ <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  placeholder="ຊື່ ແລະ ນາມສະກຸນຂອງທ້ານ"
                  className="w-full px-3 py-2 text-xs sm:text-sm border border-neutral-200 rounded-lg focus:outline-hidden focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 bg-neutral-50/60"
                />
              </div>

              {/* Company / Brand Name (Optional) */}
              <div>
                <label className="block text-xs font-semibold text-neutral-800 mb-1">
                  ຊື່ບໍລິສັດ / ຮ້ານ / ແບຣນ <span className="text-neutral-400 font-normal">(ທາງເລືອກ - ບໍ່ບັງຄັບ)</span>
                </label>
                <input
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="ຕົວຢ່າງ: Lao Artisan Coffee Co., Ltd."
                  className="w-full px-3 py-2 text-xs sm:text-sm border border-neutral-200 rounded-lg focus:outline-hidden focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 bg-neutral-50/60"
                />
              </div>

              {/* Phone / WhatsApp (Required) */}
              <div>
                <label className="block text-xs font-semibold text-neutral-800 mb-1">
                  ເບີໂທລະສັບ / WhatsApp <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Phone className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+856 20 5555 1234"
                    className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm border border-neutral-200 rounded-lg focus:outline-hidden focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 bg-neutral-50/60"
                  />
                </div>
              </div>

              {/* Line ID or Social Account */}
              <div>
                <label className="block text-xs font-semibold text-neutral-800 mb-1">
                  Line ID ຫຼື ເຟສບຸກ (ຖ້າມີ)
                </label>
                <input
                  type="text"
                  value={whatsappOrLine}
                  onChange={(e) => setWhatsappOrLine(e.target.value)}
                  placeholder="Line ID: somsak_la"
                  className="w-full px-3 py-2 text-xs sm:text-sm border border-neutral-200 rounded-lg focus:outline-hidden focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 bg-neutral-50/60"
                />
              </div>

              {/* Business Industry / Category */}
              <div>
                <label className="block text-xs font-semibold text-neutral-800 mb-1">
                  ປະເພດທຸລະກິດ (Industry)
                </label>
                <input
                  type="text"
                  value={businessCategory}
                  onChange={(e) => setBusinessCategory(e.target.value)}
                  placeholder="ຕົວຢ່າງ: ຮ້ານອາຫານ, ໂຮງແຮມ, ຂາຍເຄື່ອງອອນລາຍ, ທີ່ປຶກສາ..."
                  className="w-full px-3 py-2 text-xs sm:text-sm border border-neutral-200 rounded-lg focus:outline-hidden focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 bg-neutral-50/60"
                />
              </div>

              {/* Business Description */}
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-neutral-800 mb-1">
                  ອະທິບາຍກ່ຽວກັບທຸລະກິດ ຫຼື ສິນຄ້າ/ບໍລິການໂດຍຫຍໍ້
                </label>
                <textarea
                  rows={2}
                  value={businessDescription}
                  onChange={(e) => setBusinessDescription(e.target.value)}
                  placeholder="ທຸລະກິດເຮັດກ່ຽວກັບຫຍັງ, ຂາຍຫຍັງ, ມີຈຸດເດັ່ນແນວໃດ..."
                  className="w-full px-3 py-2 text-xs sm:text-sm border border-neutral-200 rounded-lg focus:outline-hidden focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 bg-neutral-50/60"
                />
              </div>
            </div>
          </div>

          {/* SECTION 2: Website Type & Scope */}
          <div>
            <div className="flex items-center gap-2 pb-2 mb-3.5 border-b border-neutral-100">
              <Globe className="w-4 h-4 text-neutral-800" />
              <h2 className="text-sm sm:text-base font-bold text-neutral-900">
                2. ຮູບແບບເວັບໄຊ & ໜ້າຕ່າງໆ (Website Type & Pages)
              </h2>
            </div>

            <div className="space-y-4">
              {/* Website Type Selection + Other Option */}
              <div>
                <label className="block text-xs font-semibold text-neutral-800 mb-1.5">
                  ເລືອກປະເພດເວັບໄຊທີ່ຕ້ອງການ
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                  {[
                    { id: 'corporate', label: '🏢 ບໍລິສັດ / ອົງກອນ' },
                    { id: 'ecommerce', label: '🛍️ ຂາຍເຄື່ອງອອນລາຍ' },
                    { id: 'hospitality', label: '🏨 ໂຮງແຮມ / ຣີສອດ' },
                    { id: 'restaurant', label: '🍽️ ຮ້ານອາຫານ / ຄາເຟ່' },
                    { id: 'portfolio', label: '✨ ພອດໂຟລິໂອ / Agency' },
                    { id: 'education', label: '🎓 ການສຶກສາ / ຄອສ' },
                    { id: 'real_estate', label: '🏡 ອະສັງຫາລິມະຊັບ' },
                    { id: 'custom_app', label: '💻 Web App ສະເພາະ' },
                  ].map((t) => (
                    <button
                      type="button"
                      key={t.id}
                      onClick={() => {
                        setWebsiteType(t.id as WebsiteType);
                        setIsOtherWebsiteType(false);
                      }}
                      className={`p-2.5 rounded-lg text-xs font-medium border text-left cursor-pointer transition-colors ${
                        websiteType === t.id && !isOtherWebsiteType
                          ? 'bg-neutral-900 text-white border-neutral-900 font-semibold shadow-2xs'
                          : 'bg-white text-neutral-700 border-neutral-200 hover:bg-neutral-50'
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}

                  {/* "Other" Option button */}
                  <button
                    type="button"
                    onClick={() => setIsOtherWebsiteType(true)}
                    className={`p-2.5 rounded-lg text-xs font-medium border text-left cursor-pointer transition-colors ${
                      isOtherWebsiteType
                        ? 'bg-blue-600 text-white border-blue-600 font-semibold shadow-2xs'
                        : 'bg-neutral-50 text-neutral-700 border-neutral-300 border-dashed hover:bg-neutral-100'
                    }`}
                  >
                    ➕ ອື່ນໆ (ລະບຸເອງ)
                  </button>
                </div>

                {/* Other Website Type Text Input */}
                {isOtherWebsiteType && (
                  <div className="mt-2.5 p-3 bg-blue-50/60 border border-blue-200 rounded-lg">
                    <label className="block text-xs font-semibold text-blue-900 mb-1">
                      ກະລຸນາລະບຸປະເພດເວັບໄຊອື່ນໆ ທີ່ທ່ານຕ້ອງການ:
                    </label>
                    <input
                      type="text"
                      required={isOtherWebsiteType}
                      value={customWebsiteType}
                      onChange={(e) => setCustomWebsiteType(e.target.value)}
                      placeholder="ຕົວຢ່າງ: ເວັບໄຊປະມູນສິນຄ້າ, ລະບົບຄລີນິກປິ່ນປົວ, ເວັບຂ່າວສານທ້ອງຖິ່ນ..."
                      className="w-full px-3 py-2 text-xs sm:text-sm border border-blue-300 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-blue-600 bg-white"
                    />
                  </div>
                )}
              </div>

              {/* Primary Goal */}
              <div>
                <label className="block text-xs font-semibold text-neutral-800 mb-1">
                  ເປົ້າໝາຍຕົ້ນຕໍຂອງການສ້າງເວັບໄຊ <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows={2}
                  required
                  value={primaryGoal}
                  onChange={(e) => setPrimaryGoal(e.target.value)}
                  placeholder="ຕົວຢ່າງ: ຕ້ອງການໃຫ້ລູກຄ້າຊື້ສິນຄ້າ ແລະ ຈ່າຍ BCEL One ໄດ້ງ່າຍ, ຫຼື ຢາກສ້າງຄວາມໜ້າເຊື່ອຖືໃຫ້ແກ່ລູກຄ້າຕ່າງປະເທດ..."
                  className="w-full px-3 py-2 text-xs sm:text-sm border border-neutral-200 rounded-lg focus:outline-hidden focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 bg-neutral-50/60"
                />
              </div>

              {/* Pages Checklist + Add Custom Page option */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-semibold text-neutral-800">
                    ເລືອກໜ້າຕ່າງໆ ທີ່ຕ້ອງການໃຫ້ມີໃນເວັບ (Sitemap)
                  </label>
                  <span className="text-[11px] text-neutral-500 font-mono">
                    {selectedPages.length} ໜ້າທີ່ເລືອກ
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                  {COMMON_PAGES_OPTIONS.map((page) => {
                    const checked = selectedPages.includes(page);
                    return (
                      <div
                        key={page}
                        onClick={() => togglePage(page)}
                        className={`flex items-center gap-1.5 p-2 rounded-lg border text-[11px] sm:text-xs cursor-pointer transition-colors ${
                          checked
                            ? 'bg-neutral-900/5 border-neutral-900 font-semibold text-neutral-900'
                            : 'bg-white border-neutral-200 text-neutral-600 hover:bg-neutral-50'
                        }`}
                      >
                        <div
                          className={`w-3.5 h-3.5 rounded-xs flex items-center justify-center border shrink-0 ${
                            checked
                              ? 'bg-neutral-900 border-neutral-900 text-white'
                              : 'border-neutral-300 bg-white'
                          }`}
                        >
                          {checked && <Check className="w-2.5 h-2.5" />}
                        </div>
                        <span className="truncate">{page}</span>
                      </div>
                    );
                  })}

                  {/* Render custom added pages */}
                  {customPagesList.map((cp) => (
                    <div
                      key={cp}
                      className="flex items-center justify-between gap-1 p-2 rounded-lg border text-[11px] sm:text-xs bg-blue-50/80 border-blue-300 text-blue-900 font-semibold"
                    >
                      <span className="truncate">{cp}</span>
                      <button
                        type="button"
                        onClick={() => removeCustomPage(cp)}
                        className="p-0.5 text-blue-500 hover:text-red-600 rounded-sm"
                        title="Remove"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Add Custom Page Input Bar */}
                <div className="mt-2.5 flex items-center gap-2">
                  <input
                    type="text"
                    value={newPageInput}
                    onChange={(e) => setNewPageInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddCustomPage(e);
                      }
                    }}
                    placeholder="+ ພິມຊື່ໜ້າອື່ນໆ ທີ່ຕ້ອງການເພີ່ມ..."
                    className="flex-1 px-3 py-1.5 text-xs border border-neutral-200 rounded-lg focus:outline-hidden focus:border-neutral-900 bg-neutral-50/50"
                  />
                  <button
                    type="button"
                    onClick={handleAddCustomPage}
                    className="px-3 py-1.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1 cursor-pointer shrink-0"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>ເພີ່ມໜ້າ</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* SECTION 3: Style & Color Aesthetics (Fully Customizable) */}
          <div>
            <div className="flex items-center gap-2 pb-2 mb-3.5 border-b border-neutral-100">
              <Palette className="w-4 h-4 text-neutral-800" />
              <h2 className="text-sm sm:text-base font-bold text-neutral-900">
                3. ສະໄຕລ໌ດີໄຊນ໌ & ໂທນສີ (Style & Aesthetics)
              </h2>
            </div>

            <div className="space-y-4">
              {/* Design Style Archetype + Custom Option */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-semibold text-neutral-800">
                    ສະໄຕລ໌ດີໄຊນ໌ທີ່ລູກຄ້າມັກ
                  </label>
                  <button
                    type="button"
                    onClick={() => setIsCustomDesignStyle(!isCustomDesignStyle)}
                    className="text-[11px] font-semibold text-blue-600 hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <Sliders className="w-3 h-3" />
                    <span>{isCustomDesignStyle ? 'ເລືອກຈາກແມ່ແບບ' : '+ ກຳນົດສະໄຕລ໌ເອງ'}</span>
                  </button>
                </div>

                {!isCustomDesignStyle ? (
                  <select
                    value={designStyle}
                    onChange={(e) => setDesignStyle(e.target.value as DesignStyleId)}
                    className="w-full px-3 py-2 text-xs sm:text-sm border border-neutral-200 rounded-lg bg-neutral-50/60 text-neutral-900 font-medium cursor-pointer"
                  >
                    {DESIGN_STYLES.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.titleLo}
                      </option>
                    ))}
                  </select>
                ) : (
                  <div className="p-3 bg-blue-50/60 border border-blue-200 rounded-lg space-y-1">
                    <label className="block text-xs font-semibold text-blue-900">
                      ອະທິບາຍສະໄຕລ໌ທີ່ທ່ານຕ້ອງການ (Custom Style):
                    </label>
                    <input
                      type="text"
                      value={customDesignStyleText}
                      onChange={(e) => setCustomDesignStyleText(e.target.value)}
                      placeholder="ຕົວຢ່າງ: ໂທນສີດຳ-ຄຳ ຫຼູຫຼາ, ເນັ້ນຮູບພາບໃຫຍ່ແບບວາລະສານແຟຊັ່ນ, ມີ Dark Mode..."
                      className="w-full px-3 py-2 text-xs sm:text-sm border border-blue-300 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-blue-600 bg-white"
                    />
                  </div>
                )}
              </div>

              {/* Color Palette + Custom Color Picker */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-semibold text-neutral-800">
                    ໂທນສີຫຼັກຂອງແບຣນ (Brand Colors)
                  </label>
                  <button
                    type="button"
                    onClick={() => setIsCustomColors(!isCustomColors)}
                    className="text-[11px] font-semibold text-blue-600 hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <Palette className="w-3 h-3" />
                    <span>{isCustomColors ? 'ເລືອກຈາກໂທນສີມາດຕະຖານ' : '+ ເລືອກລະຫັດສີເອງ (Color Picker)'}</span>
                  </button>
                </div>

                {!isCustomColors ? (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {COLOR_PALETTES.map((p) => {
                      const isSelected = colorPaletteId === p.id;
                      return (
                        <div
                          key={p.id}
                          onClick={() => setColorPaletteId(p.id)}
                          className={`p-2.5 rounded-lg border text-left cursor-pointer transition-colors ${
                            isSelected
                              ? 'border-neutral-900 bg-neutral-50 ring-1 ring-neutral-900'
                              : 'border-neutral-200 hover:bg-neutral-50/60'
                          }`}
                        >
                          <div className="flex items-center gap-1.5 mb-1.5">
                            <span
                              className="w-3.5 h-3.5 rounded-full border border-black/10 shrink-0"
                              style={{ backgroundColor: p.primary }}
                            />
                            <span
                              className="w-3.5 h-3.5 rounded-full border border-black/10 shrink-0"
                              style={{ backgroundColor: p.secondary }}
                            />
                            <span
                              className="w-3.5 h-3.5 rounded-full border border-black/10 shrink-0"
                              style={{ backgroundColor: p.accent }}
                            />
                          </div>
                          <span className="text-[11px] sm:text-xs font-medium text-neutral-800 block truncate">
                            {p.nameLo}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="p-3.5 bg-neutral-50 border border-neutral-200 rounded-lg grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={customPrimaryColor}
                        onChange={(e) => setCustomPrimaryColor(e.target.value)}
                        className="w-8 h-8 rounded-md border border-neutral-300 cursor-pointer p-0.5"
                      />
                      <div>
                        <span className="block text-[11px] font-semibold text-neutral-700">
                          ສີຫຼັກ (Primary Color)
                        </span>
                        <input
                          type="text"
                          value={customPrimaryColor}
                          onChange={(e) => setCustomPrimaryColor(e.target.value)}
                          className="font-mono text-xs px-2 py-0.5 border border-neutral-200 rounded-md uppercase"
                        />
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={customAccentColor}
                        onChange={(e) => setCustomAccentColor(e.target.value)}
                        className="w-8 h-8 rounded-md border border-neutral-300 cursor-pointer p-0.5"
                      />
                      <div>
                        <span className="block text-[11px] font-semibold text-neutral-700">
                          ສີໄຮໄລທ໌/ປຸ່ມ (Accent Color)
                        </span>
                        <input
                          type="text"
                          value={customAccentColor}
                          onChange={(e) => setCustomAccentColor(e.target.value)}
                          className="font-mono text-xs px-2 py-0.5 border border-neutral-200 rounded-md uppercase"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Reference URLs */}
              <div>
                <label className="block text-xs font-semibold text-neutral-800 mb-1">
                  ລິ້ງເວັບໄຊຕົວຢ່າງທີ່ລູກຄ້າມັກ ຫຼື ເວັບຄູ່ແຂ່ງ (Reference URLs)
                </label>
                <input
                  type="text"
                  value={referenceUrls}
                  onChange={(e) => setReferenceUrls(e.target.value)}
                  placeholder="ຕົວຢ່າງ: https://apple.com, https://airbnb.com (ວາງຫຼາຍລິ້ງໄດ້)"
                  className="w-full px-3 py-2 text-xs sm:text-sm border border-neutral-200 rounded-lg focus:outline-hidden focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 bg-neutral-50/60"
                />
              </div>
            </div>
          </div>

          {/* SECTION 4: Functional Features */}
          <div>
            <div className="flex items-center gap-2 pb-2 mb-3.5 border-b border-neutral-100">
              <Sparkles className="w-4 h-4 text-neutral-800" />
              <h2 className="text-sm sm:text-base font-bold text-neutral-900">
                4. ລະບົບ ແລະ ຟັງຊັນການໃຊ້ງານ (Features & Functionality)
              </h2>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
              {POPULAR_FEATURES.map((feat) => {
                const checked = features.includes(feat.id);
                return (
                  <div
                    key={feat.id}
                    onClick={() => toggleFeature(feat.id)}
                    className={`flex items-center gap-1.5 p-2 rounded-lg border text-[11px] sm:text-xs cursor-pointer transition-colors ${
                      checked
                        ? 'bg-neutral-900/5 border-neutral-900 font-semibold text-neutral-900'
                        : 'bg-white border-neutral-200 text-neutral-600 hover:bg-neutral-50'
                    }`}
                  >
                    <div
                      className={`w-3.5 h-3.5 rounded-xs flex items-center justify-center border shrink-0 ${
                        checked
                          ? 'bg-neutral-900 border-neutral-900 text-white'
                          : 'border-neutral-300 bg-white'
                      }`}
                    >
                      {checked && <Check className="w-2.5 h-2.5" />}
                    </div>
                    <span className="truncate">{feat.label}</span>
                  </div>
                );
              })}
            </div>

            {/* Additional Notes (ໝາຍເຫດເພີ່ມເຕີມ) */}
            <div className="mt-4 pt-3 border-t border-neutral-100">
              <label className="block text-xs font-semibold text-neutral-800 mb-1">
                ໝາຍເຫດ ຫຼື ຄວາມຕ້ອງການພິເສດເພີ່ມເຕີມ (Additional Notes)
              </label>
              <textarea
                rows={2}
                value={additionalNotes}
                onChange={(e) => setAdditionalNotes(e.target.value)}
                placeholder="ຕົວຢ່າງ: ຂໍ້ມູນເພີ່ມເຕີມ, ລະບົບທີ່ຕ້ອງການເຊື່ອມຕໍ່ ຫຼື ຂໍ້ກຳນົດພິເສດ..."
                className="w-full px-3 py-2 text-xs sm:text-sm border border-neutral-200 rounded-lg focus:outline-hidden focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 bg-neutral-50/60"
              />
            </div>
          </div>

          {/* Submit Action */}
          <div className="pt-4 border-t border-neutral-200 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs text-neutral-500">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>ຂໍ້ມູນຈະຖືກສົ່ງຕົງເຂົ້າ WhatsApp ຂອງທີມງານທັນທີ</span>
            </div>
            <button
              type="submit"
              className="w-full sm:w-auto px-7 py-3.5 bg-emerald-600 hover:bg-emerald-700 active:scale-[0.98] text-white rounded-xl text-xs sm:text-sm font-bold transition-all shadow-sm hover:shadow-md cursor-pointer flex items-center justify-center gap-2"
              title="ສົ່ງຂໍ້ມູນຄວາມຕ້ອງການເຂົ້າ WhatsApp ທັນທີ"
            >
              <MessageCircle className="w-4 h-4" />
              <span>ສົ່ງຂໍ້ມູນຜ່ານ WhatsApp 🟢</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
