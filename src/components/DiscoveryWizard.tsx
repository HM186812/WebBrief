import React, { useState } from 'react';
import { Language, TRANSLATIONS } from '../translations/i18n';
import {
  ClientBrief,
  WebsiteType,
  DesignStyleId,
  BudgetRange,
  LaunchTimeline,
} from '../types/brief';
import {
  WEBSITE_TYPES,
  DESIGN_STYLES,
  COLOR_PALETTES,
  ALL_FEATURES,
  STANDARD_QUALITY_ITEMS,
} from '../constants/presets';
import {
  Building2,
  ShoppingBag,
  Hotel,
  Utensils,
  Sparkles,
  GraduationCap,
  Home,
  Cpu,
  Check,
  ChevronRight,
  ChevronLeft,
  ArrowRight,
  ExternalLink,
  Layers,
  HelpCircle,
  Clock,
  Sparkle,
  CheckCircle2,
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface DiscoveryWizardProps {
  lang: Language;
  onSaveBrief: (brief: ClientBrief) => void;
  onViewBrief: (brief: ClientBrief) => void;
}

const getWebsiteIcon = (iconName: string) => {
  switch (iconName) {
    case 'Building2': return <Building2 className="w-5 h-5" />;
    case 'ShoppingBag': return <ShoppingBag className="w-5 h-5" />;
    case 'Hotel': return <Hotel className="w-5 h-5" />;
    case 'Utensils': return <Utensils className="w-5 h-5" />;
    case 'Sparkles': return <Sparkles className="w-5 h-5" />;
    case 'GraduationCap': return <GraduationCap className="w-5 h-5" />;
    case 'Home': return <Home className="w-5 h-5" />;
    case 'Cpu': return <Cpu className="w-5 h-5" />;
    default: return <Layers className="w-5 h-5" />;
  }
};

const COMMON_PAGES = [
  { id: 'Home', lo: 'ໜ້າຫຼັກ (Home Page)', en: 'Home Page' },
  { id: 'About Us', lo: 'ກ່ຽວກັບພວກເຮົາ / ປະຫວັດຄວາມເປັນມາ (About Us)', en: 'About Us' },
  { id: 'Services', lo: 'ບໍລິການ / ສິນຄ້າ (Services / Offerings)', en: 'Services' },
  { id: 'Shop / Catalog', lo: 'ລາຍການສິນຄ້າອອນລາຍ (Shop / Catalog)', en: 'Shop / Catalog' },
  { id: 'Product Detail', lo: 'ລາຍລະອຽດສິນຄ້າ (Product Detail)', en: 'Product Detail' },
  { id: 'Portfolio', lo: 'ຜົນງານທີ່ຜ່ານມາ (Selected Works / Projects)', en: 'Portfolio / Works' },
  { id: 'Rooms & Villas', lo: 'ຫ້ອງພັກ & ວິວລາ (Rooms & Accommodation)', en: 'Rooms & Villas' },
  { id: 'Booking', lo: 'ລະບົບຈອງອອນລາຍ (Online Booking)', en: 'Online Booking' },
  { id: 'News & Blog', lo: 'ຂ່າວສານ & ບົດຄວາມ (News & Insights)', en: 'News & Blog' },
  { id: 'Contact Us', lo: 'ຕິດຕໍ່ສອບຖາມ & ແຜນທີ່ (Contact & Map)', en: 'Contact & Map' },
  { id: 'Team', lo: 'ທີມງານບໍລິຫານ (Our Team / Leadership)', en: 'Leadership / Team' },
  { id: 'FAQ', lo: 'ຄຳຖາມທີ່ພົບເລື້ອຍ (FAQ)', en: 'FAQ' },
];

export const DiscoveryWizard: React.FC<DiscoveryWizardProps> = ({
  lang,
  onSaveBrief,
  onViewBrief,
}) => {
  const t = TRANSLATIONS[lang];
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [submittedBrief, setSubmittedBrief] = useState<ClientBrief | null>(null);

  // Form State
  const [clientName, setClientName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [whatsappOrLine, setWhatsappOrLine] = useState('');
  const [businessCategory, setBusinessCategory] = useState('');
  const [businessDescription, setBusinessDescription] = useState('');
  const [targetAudience, setTargetAudience] = useState('');

  const [websiteType, setWebsiteType] = useState<WebsiteType>('corporate');
  const [primaryGoal, setPrimaryGoal] = useState('');
  const [selectedPages, setSelectedPages] = useState<string[]>([
    'Home',
    'About Us',
    'Services',
    'Contact Us',
  ]);
  const [customPages, setCustomPages] = useState('');

  const [designStyle, setDesignStyle] = useState<DesignStyleId>('minimal_luxury');
  const [colorPaletteId, setColorPaletteId] = useState<string>('slate_corporate');
  const [visualMoodKeywords, setVisualMoodKeywords] = useState<string[]>([
    'ທັນສະໄໝ & ໂປ່ງສະອາດ',
    'ໜ້າເຊື່ອຖືສູງ',
  ]);
  const [typographyPreference, setTypographyPreference] = useState<
    'modern_sans' | 'editorial_serif' | 'clean_minimal' | 'bold_impact'
  >('modern_sans');
  const [referenceUrls, setReferenceUrls] = useState('');

  const [features, setFeatures] = useState<string[]>([
    'multilingual',
    'contact_inquiry_line',
    'seo_optimization',
    'admin_dashboard',
    'page_speed_guarantee',
  ]);
  const [languages, setLanguages] = useState<string[]>(['lo', 'en']);
  const [paymentMethods, setPaymentMethods] = useState<string[]>(['bcel_one']);

  const [logoStatus, setLogoStatus] = useState<'ready' | 'needs_refresh' | 'needs_new_creation'>('ready');
  const [copywritingStatus, setCopywritingStatus] = useState<'ready' | 'partial' | 'needs_agency_writing'>('partial');
  const [photographyStatus, setPhotographyStatus] = useState<'ready_hd' | 'smartphone' | 'needs_photography_service'>('ready_hd');
  const [domainHostingStatus, setDomainHostingStatus] = useState<'already_have' | 'need_agency_recommendation' | 'need_assistance'>('need_agency_recommendation');
  const [domainNameDesired, setDomainNameDesired] = useState('');

  const [budgetRange, setBudgetRange] = useState<BudgetRange>('25m_50m_lak');
  const [timeline, setTimeline] = useState<LaunchTimeline>('1_month');
  const [additionalNotes, setAdditionalNotes] = useState('');

  // Handle auto-preset when website type changes
  const handleSelectWebsiteType = (type: WebsiteType) => {
    setWebsiteType(type);
    const preset = WEBSITE_TYPES.find((w) => w.id === type);
    if (preset) {
      setSelectedPages(preset.recommendedPages);
      // Auto recommend style if appropriate
      if (type === 'ecommerce') setDesignStyle('ecommerce_modern');
      else if (type === 'hospitality' || type === 'restaurant') setDesignStyle('hospitality_warm');
      else if (type === 'corporate' || type === 'custom_app') setDesignStyle('corporate_tech');
      else setDesignStyle('minimal_luxury');

      // Add recommended features
      const merged = Array.from(new Set([...features, ...preset.recommendedFeatures]));
      setFeatures(merged);
    }
  };

  const togglePage = (pageId: string) => {
    if (selectedPages.includes(pageId)) {
      setSelectedPages(selectedPages.filter((p) => p !== pageId));
    } else {
      setSelectedPages([...selectedPages, pageId]);
    }
  };

  const toggleFeature = (featureId: string) => {
    if (features.includes(featureId)) {
      setFeatures(features.filter((f) => f !== featureId));
    } else {
      setFeatures([...features, featureId]);
    }
  };

  const toggleLanguage = (langCode: string) => {
    if (languages.includes(langCode)) {
      if (languages.length > 1) {
        setLanguages(languages.filter((l) => l !== langCode));
      }
    } else {
      setLanguages([...languages, langCode]);
    }
  };

  const togglePayment = (method: string) => {
    if (paymentMethods.includes(method)) {
      setPaymentMethods(paymentMethods.filter((m) => m !== method));
    } else {
      setPaymentMethods([...paymentMethods, method]);
    }
  };

  // Calculate scope complexity & estimates
  const totalPagesCount = selectedPages.length + (customPages.trim() ? customPages.split(',').length : 0);
  
  let complexity: 'Low' | 'Medium' | 'High' | 'Enterprise' = 'Low';
  let estTimeline = '2 - 3 ອາທິດ';
  let estBudgetLo = '15,000,000 - 25,000,000 LAK';
  let estBudgetEn = '$700 - $1,150 USD';

  if (features.includes('cart_checkout') || features.includes('booking_calendar') || totalPagesCount > 8) {
    complexity = 'High';
    estTimeline = '4 - 6 ອາທິດ';
    estBudgetLo = '35,000,000 - 55,000,000 LAK';
    estBudgetEn = '$1,600 - $2,500 USD';
  } else if (totalPagesCount >= 5 || features.includes('user_auth_roles')) {
    complexity = 'Medium';
    estTimeline = '3 - 4 ອາທິດ';
    estBudgetLo = '25,000,000 - 35,000,000 LAK';
    estBudgetEn = '$1,150 - $1,600 USD';
  }

  if (websiteType === 'custom_app' || budgetRange === 'over_100m_lak') {
    complexity = 'Enterprise';
    estTimeline = '8 - 12 ອາທິດ';
    estBudgetLo = '70,000,000+ LAK';
    estBudgetEn = '$3,200+ USD';
  }

  // Calculate completion percentage
  let score = 0;
  if (clientName) score += 15;
  if (companyName) score += 15;
  if (email || phone) score += 15;
  if (primaryGoal) score += 15;
  if (selectedPages.length > 0) score += 15;
  if (features.length > 0) score += 15;
  if (budgetRange) score += 10;
  const completeness = Math.min(score, 100);

  // Submit Handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const techStack = {
      frontend: 'React 19 / Next.js + Tailwind CSS',
      backend: features.includes('cart_checkout')
        ? 'Supabase / Node.js API with Edge Engine'
        : 'Headless Content Engine / Cloud Storage',
      database: 'PostgreSQL / Managed Cloud DB',
      hosting: 'Vercel / Cloud Run with Multi-region CDN',
      payment: paymentMethods.includes('bcel_one')
        ? 'BCEL OnePay QR API + Domestic Banking'
        : 'Direct Inquiry / Invoicing',
    };

    const newBrief: ClientBrief = {
      id: `brief-${Date.now().toString().slice(-4)}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      status: 'new',
      clientName: clientName || (lang === 'lo' ? 'ລູກຄ້າໃໝ່' : 'New Client'),
      companyName: companyName || (lang === 'lo' ? 'ທຸລະກິດໃໝ່' : 'New Business'),
      email,
      phone,
      whatsappOrLine,
      businessCategory: businessCategory || (lang === 'lo' ? 'ທຸລະກິດທົ່ວໄປ' : 'General Business'),
      businessDescription,
      targetAudience,
      websiteType,
      primaryGoal: primaryGoal || (lang === 'lo' ? 'ສ້າງເວັບໄຊມາດຕະຖານຕາມຄວາມຕ້ອງການ' : 'Build standard website per client specifications'),
      selectedPages,
      customPages,
      designStyle,
      colorPaletteId,
      visualMoodKeywords,
      typographyPreference,
      referenceUrls,
      features,
      languages,
      paymentMethods,
      logoStatus,
      copywritingStatus,
      photographyStatus,
      domainHostingStatus,
      domainNameDesired,
      budgetRange,
      timeline,
      additionalNotes,
      estimatedComplexity: complexity,
      estimatedTimelineWeeks: estTimeline,
      estimatedBudgetEstimateLo: estBudgetLo,
      estimatedBudgetEstimateEn: estBudgetEn,
      recommendedTechStack: techStack,
      standardsAudit: STANDARD_QUALITY_ITEMS,
    };

    onSaveBrief(newBrief);
    setSubmittedBrief(newBrief);

    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });
    } catch {
      // ignore
    }
  };

  if (submittedBrief) {
    return (
      <div className="max-w-3xl mx-auto py-12 px-4 sm:px-6">
        <div className="bg-white border border-neutral-200 rounded-2xl p-8 sm:p-10 shadow-xs text-center">
          <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 tracking-tight mb-3">
            {lang === 'lo' ? 'ເກັບກຳຂໍ້ມູນສຳເລັດແລ້ວ!' : 'Brief Submitted Successfully!'}
          </h2>
          <p className="text-neutral-600 text-sm sm:text-base max-w-xl mx-auto mb-8">
            {lang === 'lo'
              ? `ຂໍ້ມູນຄວາມຕ້ອງການສ້າງເວັບໄຊສຳລັບ "${submittedBrief.companyName}" ໄດ້ຖືກບັນທຶກ ແລະ ສັງເຄາະເປັນໃບສະເໜີຂອບເຂດວຽກ (SRS Brief) ຮຽບຮ້ອຍແລ້ວ.`
              : `The web requirements for "${submittedBrief.companyName}" have been processed into a technical Scope of Work (SRS).`}
          </p>

          <div className="bg-neutral-50 border border-neutral-200 rounded-xl p-5 mb-8 text-left grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm">
            <div>
              <span className="text-neutral-500 block mb-1">
                {lang === 'lo' ? 'ປະເພດເວັບໄຊ' : 'Website Type'}
              </span>
              <span className="font-semibold text-neutral-900">
                {WEBSITE_TYPES.find((w) => w.id === submittedBrief.websiteType)?.[
                  lang === 'lo' ? 'titleLo' : 'titleEn'
                ]}
              </span>
            </div>
            <div>
              <span className="text-neutral-500 block mb-1">
                {lang === 'lo' ? 'ຂອບເຂດໜ້າ' : 'Pages Scope'}
              </span>
              <span className="font-semibold text-neutral-900">
                {submittedBrief.selectedPages.length} {lang === 'lo' ? 'ໜ້າຫຼັກ' : 'Pages'}
              </span>
            </div>
            <div>
              <span className="text-neutral-500 block mb-1">
                {lang === 'lo' ? 'ໄລຍະເວລາປະມານການ' : 'Est. Timeline'}
              </span>
              <span className="font-semibold text-neutral-900">
                {submittedBrief.estimatedTimelineWeeks}
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => onViewBrief(submittedBrief)}
              className="w-full sm:w-auto px-6 py-2.5 bg-neutral-900 hover:bg-neutral-800 text-white rounded-lg font-semibold text-sm transition-colors cursor-pointer flex items-center justify-center gap-2"
            >
              <span>{lang === 'lo' ? 'ເບິ່ງໃບສະເໜີຂອບເຂດເຕັມ (SRS Sheet)' : 'View Full Technical SRS'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                setSubmittedBrief(null);
                setCurrentStep(1);
                setClientName('');
                setCompanyName('');
                setPrimaryGoal('');
              }}
              className="w-full sm:w-auto px-5 py-2.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 rounded-lg font-medium text-sm transition-colors cursor-pointer"
            >
              {lang === 'lo' ? 'ສ້າງ Brief ອື່ນເພີ່ມ' : 'Create Another Brief'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header section */}
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900 mb-2">
          {t.wizard.title}
        </h1>
        <p className="text-sm sm:text-base text-neutral-600 max-w-3xl">
          {t.wizard.subtitle}
        </p>

        {/* Step progress pills */}
        <div className="mt-6 flex items-center gap-2 overflow-x-auto pb-2 border-b border-neutral-200">
          {[
            { num: 1, label: t.wizard.step1 },
            { num: 2, label: t.wizard.step2 },
            { num: 3, label: t.wizard.step3 },
            { num: 4, label: t.wizard.step4 },
            { num: 5, label: t.wizard.step5 },
            { num: 6, label: t.wizard.step6 },
          ].map((st) => (
            <button
              key={st.num}
              onClick={() => setCurrentStep(st.num)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors flex items-center gap-1.5 cursor-pointer ${
                currentStep === st.num
                  ? 'bg-neutral-900 text-white shadow-xs'
                  : currentStep > st.num
                  ? 'bg-neutral-100 text-neutral-800 hover:bg-neutral-200/70'
                  : 'text-neutral-500 hover:text-neutral-800'
              }`}
            >
              <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] ${
                currentStep === st.num
                  ? 'bg-neutral-700 text-white'
                  : currentStep > st.num
                  ? 'bg-emerald-600 text-white'
                  : 'bg-neutral-200 text-neutral-600'
              }`}>
                {currentStep > st.num ? '✓' : st.num}
              </span>
              <span>{st.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Main Step Form Area */}
        <div className="lg:col-span-8 bg-white border border-neutral-200 rounded-xl p-6 sm:p-8 shadow-xs">
          <form onSubmit={handleSubmit}>
            {/* STEP 1: Business Profile */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-semibold text-neutral-900 mb-1">
                    {lang === 'lo' ? 'ຂໍ້ມູນທຸລະກິດ ແລະ ຈຸດປະສົງ' : 'Business Profile & Contact'}
                  </h2>
                  <p className="text-xs sm:text-sm text-neutral-500">
                    {lang === 'lo'
                      ? 'ຂໍ້ມູນເບື້ອງຕົ້ນຊ່ວຍໃຫ້ເຮົາເຂົ້າໃຈແບຣນ ແລະ ສາມາດຕິດຕໍ່ປະສານງານໄດ້ສະດວກ'
                      : 'Basic contact and company information to frame the web project.'}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-neutral-700 mb-1">
                      {t.businessForm.clientName} <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      placeholder={t.businessForm.clientNamePlaceholder}
                      className="w-full px-3.5 py-2 text-sm border border-neutral-200 rounded-lg focus:outline-hidden focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-neutral-700 mb-1">
                      {t.businessForm.companyName} <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      placeholder={t.businessForm.companyNamePlaceholder}
                      className="w-full px-3.5 py-2 text-sm border border-neutral-200 rounded-lg focus:outline-hidden focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-neutral-700 mb-1">
                      {t.businessForm.phone}
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder={t.businessForm.phonePlaceholder}
                      className="w-full px-3.5 py-2 text-sm border border-neutral-200 rounded-lg focus:outline-hidden focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-neutral-700 mb-1">
                      {t.businessForm.whatsappOrLine}
                    </label>
                    <input
                      type="text"
                      value={whatsappOrLine}
                      onChange={(e) => setWhatsappOrLine(e.target.value)}
                      placeholder={t.businessForm.whatsappPlaceholder}
                      className="w-full px-3.5 py-2 text-sm border border-neutral-200 rounded-lg focus:outline-hidden focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-neutral-700 mb-1">
                      {t.businessForm.email}
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={t.businessForm.emailPlaceholder}
                      className="w-full px-3.5 py-2 text-sm border border-neutral-200 rounded-lg focus:outline-hidden focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-neutral-700 mb-1">
                      {t.businessForm.businessCategory}
                    </label>
                    <input
                      type="text"
                      value={businessCategory}
                      onChange={(e) => setBusinessCategory(e.target.value)}
                      placeholder={t.businessForm.businessCategoryPlaceholder}
                      className="w-full px-3.5 py-2 text-sm border border-neutral-200 rounded-lg focus:outline-hidden focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-neutral-700 mb-1">
                      {t.businessForm.targetAudience}
                    </label>
                    <input
                      type="text"
                      value={targetAudience}
                      onChange={(e) => setTargetAudience(e.target.value)}
                      placeholder={t.businessForm.targetAudiencePlaceholder}
                      className="w-full px-3.5 py-2 text-sm border border-neutral-200 rounded-lg focus:outline-hidden focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-700 mb-1">
                    {t.businessForm.businessDesc}
                  </label>
                  <textarea
                    rows={3}
                    value={businessDescription}
                    onChange={(e) => setBusinessDescription(e.target.value)}
                    placeholder={t.businessForm.businessDescPlaceholder}
                    className="w-full px-3.5 py-2 text-sm border border-neutral-200 rounded-lg focus:outline-hidden focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900"
                  />
                </div>
              </div>
            )}

            {/* STEP 2: Website Type & Sitemap Scope */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-semibold text-neutral-900 mb-1">
                    {t.scopeForm.selectType}
                  </h2>
                  <p className="text-xs sm:text-sm text-neutral-500">
                    {lang === 'lo'
                      ? 'ເລືອກປະເພດທີ່ໃກ້ຄຽງກັບທຸລະກິດຂອງທ່ານ ລະບົບຈະແນະນຳໜ້າ ແລະ ຟັງຊັນທີ່ເໝາະສົມໃຫ້'
                      : 'Choose the primary format for the site. Recommended pages will adjust automatically.'}
                  </p>
                </div>

                {/* Category Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {WEBSITE_TYPES.map((type) => {
                    const isSelected = websiteType === type.id;
                    return (
                      <div
                        key={type.id}
                        onClick={() => handleSelectWebsiteType(type.id)}
                        className={`p-4 rounded-xl border text-left cursor-pointer transition-all ${
                          isSelected
                            ? 'border-neutral-900 bg-neutral-50 ring-1 ring-neutral-900 shadow-xs'
                            : 'border-neutral-200 hover:border-neutral-300 hover:bg-neutral-50/50'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div
                            className={`p-2 rounded-lg ${
                              isSelected ? 'bg-neutral-900 text-white' : 'bg-neutral-100 text-neutral-700'
                            }`}
                          >
                            {getWebsiteIcon(type.iconName)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <h3 className="text-sm font-bold text-neutral-900 truncate">
                                {lang === 'lo' ? type.titleLo : type.titleEn}
                              </h3>
                              {isSelected && <Check className="w-4 h-4 text-neutral-900 shrink-0" />}
                            </div>
                            <p className="text-xs text-neutral-500 mt-1 line-clamp-2">
                              {lang === 'lo' ? type.descLo : type.descEn}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Primary Goal */}
                <div>
                  <label className="block text-xs font-medium text-neutral-700 mb-1">
                    {t.scopeForm.primaryGoal} <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    rows={2}
                    value={primaryGoal}
                    onChange={(e) => setPrimaryGoal(e.target.value)}
                    placeholder={t.scopeForm.goalPlaceholder}
                    className="w-full px-3.5 py-2 text-sm border border-neutral-200 rounded-lg focus:outline-hidden focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900"
                  />
                </div>

                {/* Sitemap Checkbox Selection */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-semibold text-neutral-800">
                      {t.scopeForm.sitemapTitle}
                    </label>
                    <span className="text-xs text-neutral-500">
                      {selectedPages.length} {lang === 'lo' ? 'ໜ້າທີ່ເລືອກ' : 'pages selected'}
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-56 overflow-y-auto pr-1">
                    {COMMON_PAGES.map((page) => {
                      const checked = selectedPages.includes(page.id);
                      return (
                        <div
                          key={page.id}
                          onClick={() => togglePage(page.id)}
                          className={`flex items-center gap-2 p-2.5 rounded-lg border text-xs cursor-pointer transition-colors ${
                            checked
                              ? 'border-neutral-900 bg-neutral-900/5 text-neutral-900 font-medium'
                              : 'border-neutral-200 text-neutral-600 hover:bg-neutral-50'
                          }`}
                        >
                          <div
                            className={`w-4 h-4 rounded-sm flex items-center justify-center border ${
                              checked
                                ? 'bg-neutral-900 border-neutral-900 text-white'
                                : 'border-neutral-300 bg-white'
                            }`}
                          >
                            {checked && <Check className="w-3 h-3" />}
                          </div>
                          <span className="truncate">{lang === 'lo' ? page.lo : page.en}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Custom Pages */}
                <div>
                  <label className="block text-xs font-medium text-neutral-700 mb-1">
                    {t.scopeForm.customPagesLabel}
                  </label>
                  <input
                    type="text"
                    value={customPages}
                    onChange={(e) => setCustomPages(e.target.value)}
                    placeholder={t.scopeForm.customPagesPlaceholder}
                    className="w-full px-3.5 py-2 text-sm border border-neutral-200 rounded-lg focus:outline-hidden focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900"
                  />
                </div>
              </div>
            )}

            {/* STEP 3: Style & Aesthetics */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-semibold text-neutral-900 mb-1">
                    {t.styleForm.selectStyle}
                  </h2>
                  <p className="text-xs sm:text-sm text-neutral-500">
                    {lang === 'lo'
                      ? 'ເລືອກທິດທາງດີໄຊນ໌ທີ່ສະທ້ອນຕົວຕົນຂອງແບຣນ ແລະ ສ້າງຄວາມປະທັບໃຈໃຫ້ລູກຄ້າຂອງທ່ານ'
                      : 'Select visual aesthetic archetype to establish the website look and feel.'}
                  </p>
                </div>

                {/* Style Archetypes with visual image preview cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {DESIGN_STYLES.map((style) => {
                    const isSelected = designStyle === style.id;
                    return (
                      <div
                        key={style.id}
                        onClick={() => setDesignStyle(style.id)}
                        className={`rounded-xl border overflow-hidden cursor-pointer transition-all ${
                          isSelected
                            ? 'border-neutral-900 ring-2 ring-neutral-900 shadow-md'
                            : 'border-neutral-200 hover:border-neutral-300 hover:shadow-xs'
                        }`}
                      >
                        <div className="aspect-video w-full bg-neutral-100 relative overflow-hidden">
                          <img
                            src={style.imageSrc}
                            alt={style.titleEn}
                            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                          />
                          {isSelected && (
                            <div className="absolute top-2.5 right-2.5 bg-neutral-900 text-white p-1 rounded-full shadow-sm">
                              <Check className="w-3.5 h-3.5" />
                            </div>
                          )}
                        </div>
                        <div className="p-4 bg-white">
                          <h3 className="text-sm font-bold text-neutral-900 mb-1">
                            {lang === 'lo' ? style.titleLo : style.titleEn}
                          </h3>
                          <p className="text-xs text-neutral-600 line-clamp-2 mb-2">
                            {lang === 'lo' ? style.descLo : style.descEn}
                          </p>
                          <div className="text-[11px] text-neutral-500">
                            <span className="font-semibold text-neutral-700">
                              {lang === 'lo' ? 'ເໝາະສຳລັບ: ' : 'Best for: '}
                            </span>
                            {lang === 'lo' ? style.bestForLo : style.bestForEn}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Color Palettes */}
                <div>
                  <label className="block text-xs font-semibold text-neutral-800 mb-2">
                    {t.styleForm.colorPalette}
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                    {COLOR_PALETTES.map((palette) => {
                      const isSelected = colorPaletteId === palette.id;
                      return (
                        <div
                          key={palette.id}
                          onClick={() => setColorPaletteId(palette.id)}
                          className={`p-3 rounded-lg border text-left cursor-pointer transition-colors ${
                            isSelected
                              ? 'border-neutral-900 bg-neutral-50 ring-1 ring-neutral-900'
                              : 'border-neutral-200 hover:bg-neutral-50/60'
                          }`}
                        >
                          <div className="flex items-center gap-1.5 mb-2">
                            <span
                              className="w-4 h-4 rounded-full border border-black/10 shrink-0"
                              style={{ backgroundColor: palette.primary }}
                            />
                            <span
                              className="w-4 h-4 rounded-full border border-black/10 shrink-0"
                              style={{ backgroundColor: palette.secondary }}
                            />
                            <span
                              className="w-4 h-4 rounded-full border border-black/10 shrink-0"
                              style={{ backgroundColor: palette.accent }}
                            />
                          </div>
                          <span className="text-xs font-medium text-neutral-800 block truncate">
                            {lang === 'lo' ? palette.nameLo : palette.nameEn}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Typography Feeling */}
                <div>
                  <label className="block text-xs font-semibold text-neutral-800 mb-2">
                    {t.styleForm.typography}
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {[
                      { id: 'modern_sans', label: t.styleForm.modernSans, fontClass: 'font-sans' },
                      { id: 'editorial_serif', label: t.styleForm.editorialSerif, fontClass: 'font-serif' },
                      { id: 'clean_minimal', label: t.styleForm.cleanMinimal, fontClass: 'font-sans' },
                      { id: 'bold_impact', label: t.styleForm.boldImpact, fontClass: 'font-sans font-bold' },
                    ].map((typo) => {
                      const isSelected = typographyPreference === typo.id;
                      return (
                        <div
                          key={typo.id}
                          onClick={() =>
                            setTypographyPreference(
                              typo.id as 'modern_sans' | 'editorial_serif' | 'clean_minimal' | 'bold_impact'
                            )
                          }
                          className={`p-3 rounded-lg border text-xs cursor-pointer transition-colors ${
                            isSelected
                              ? 'border-neutral-900 bg-neutral-900/5 text-neutral-900 font-semibold'
                              : 'border-neutral-200 text-neutral-600 hover:bg-neutral-50'
                          }`}
                        >
                          <span className={typo.fontClass}>{typo.label}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Reference URLs */}
                <div>
                  <label className="block text-xs font-medium text-neutral-700 mb-1">
                    {t.styleForm.refUrls}
                  </label>
                  <input
                    type="text"
                    value={referenceUrls}
                    onChange={(e) => setReferenceUrls(e.target.value)}
                    placeholder={t.styleForm.refUrlsPlaceholder}
                    className="w-full px-3.5 py-2 text-sm border border-neutral-200 rounded-lg focus:outline-hidden focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900"
                  />
                </div>
              </div>
            )}

            {/* STEP 4: Features & Functional Characteristics */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-semibold text-neutral-900 mb-1">
                    {t.featuresForm.title}
                  </h2>
                  <p className="text-xs sm:text-sm text-neutral-500">
                    {t.featuresForm.subtitle}
                  </p>
                </div>

                {/* Languages selection */}
                <div>
                  <label className="block text-xs font-semibold text-neutral-800 mb-2">
                    {t.featuresForm.languagesTitle}
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { code: 'lo', name: 'ພາສາລາວ (Lao - Default)' },
                      { code: 'en', name: 'English' },
                      { code: 'th', name: 'ภาษาไทย (Thai)' },
                      { code: 'zh', name: '中文 (Chinese)' },
                    ].map((l) => {
                      const isSelected = languages.includes(l.code);
                      return (
                        <button
                          type="button"
                          key={l.code}
                          onClick={() => toggleLanguage(l.code)}
                          className={`px-3 py-1.5 text-xs font-medium rounded-md border transition-colors cursor-pointer ${
                            isSelected
                              ? 'bg-neutral-900 text-white border-neutral-900'
                              : 'bg-white text-neutral-700 border-neutral-200 hover:bg-neutral-50'
                          }`}
                        >
                          {isSelected ? '✓ ' : ''}{l.name}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Payment Methods */}
                <div>
                  <label className="block text-xs font-semibold text-neutral-800 mb-2">
                    {t.featuresForm.paymentTitle}
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {[
                      { id: 'bcel_one', name: 'BCEL One / OnePay QR Code (ທະນາຄານການຄ້າລາວ)' },
                      { id: 'other_banks', name: 'LDB Trust / Lao-Viet Bank / JDB' },
                      { id: 'credit_card', name: 'Credit / Debit Cards (Visa / Mastercard)' },
                      { id: 'cash_on_delivery', name: 'Cash on Delivery (ຈ່າຍເງິນປາຍທາງ)' },
                    ].map((p) => {
                      const isSelected = paymentMethods.includes(p.id);
                      return (
                        <div
                          key={p.id}
                          onClick={() => togglePayment(p.id)}
                          className={`flex items-center gap-2 p-3 rounded-lg border text-xs cursor-pointer transition-colors ${
                            isSelected
                              ? 'border-neutral-900 bg-neutral-900/5 font-semibold text-neutral-900'
                              : 'border-neutral-200 text-neutral-600 hover:bg-neutral-50'
                          }`}
                        >
                          <div
                            className={`w-4 h-4 rounded-sm flex items-center justify-center border ${
                              isSelected
                                ? 'bg-neutral-900 border-neutral-900 text-white'
                                : 'border-neutral-300 bg-white'
                            }`}
                          >
                            {isSelected && <Check className="w-3 h-3" />}
                          </div>
                          <span>{p.name}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Feature Checklist */}
                <div>
                  <label className="block text-xs font-semibold text-neutral-800 mb-2">
                    {lang === 'lo' ? 'ລະບົບ & ຟັງຊັນການໃຊ້ງານ' : 'Interactive Systems & Modules'}
                  </label>
                  <div className="space-y-2">
                    {ALL_FEATURES.map((feat) => {
                      const isEnabled = features.includes(feat.id);
                      return (
                        <div
                          key={feat.id}
                          onClick={() => toggleFeature(feat.id)}
                          className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                            isEnabled
                              ? 'border-neutral-900 bg-neutral-50 ring-1 ring-neutral-900 shadow-2xs'
                              : 'border-neutral-200 hover:border-neutral-300 hover:bg-neutral-50/50'
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <div
                              className={`w-5 h-5 mt-0.5 rounded-sm flex items-center justify-center border shrink-0 ${
                                isEnabled
                                  ? 'bg-neutral-900 border-neutral-900 text-white'
                                  : 'border-neutral-300 bg-white'
                              }`}
                            >
                              {isEnabled && <Check className="w-3.5 h-3.5" />}
                            </div>
                            <div className="flex-1">
                              <h4 className="text-sm font-semibold text-neutral-900">
                                {lang === 'lo' ? feat.titleLo : feat.titleEn}
                              </h4>
                              <p className="text-xs text-neutral-500 mt-0.5">
                                {lang === 'lo' ? feat.descriptionLo : feat.descriptionEn}
                              </p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* STEP 5: Assets & Content Readiness */}
            {currentStep === 5 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-semibold text-neutral-900 mb-1">
                    {lang === 'lo' ? 'ຄວາມພ້ອມຂອງເນື້ອຫາ ແລະ ຊັບພະຍາກອນ' : 'Content & Asset Readiness'}
                  </h2>
                  <p className="text-xs sm:text-sm text-neutral-500">
                    {lang === 'lo'
                      ? 'ກວດສອບວ່າທ່ານມີຮູບພາບ, ໂລໂກ້ ຫຼື ຂໍ້ຄວາມພ້ອມແລ້ວ ຫຼື ຕ້ອງການໃຫ້ທີມງານຊ່ວຍຜະລິດ'
                      : 'Review asset readiness so we can budget copywriting, identity, or photography support.'}
                  </p>
                </div>

                {/* Logo status */}
                <div>
                  <label className="block text-xs font-semibold text-neutral-800 mb-2">
                    {t.assetsForm.logoStatus}
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {[
                      { id: 'ready', label: t.assetsForm.logoReady },
                      { id: 'needs_refresh', label: t.assetsForm.logoRefresh },
                      { id: 'needs_new_creation', label: t.assetsForm.logoNew },
                    ].map((opt) => (
                      <div
                        key={opt.id}
                        onClick={() =>
                          setLogoStatus(opt.id as 'ready' | 'needs_refresh' | 'needs_new_creation')
                        }
                        className={`p-3 rounded-lg border text-xs cursor-pointer transition-colors ${
                          logoStatus === opt.id
                            ? 'border-neutral-900 bg-neutral-900/5 font-semibold text-neutral-900'
                            : 'border-neutral-200 text-neutral-600 hover:bg-neutral-50'
                        }`}
                      >
                        {opt.label}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Copywriting */}
                <div>
                  <label className="block text-xs font-semibold text-neutral-800 mb-2">
                    {t.assetsForm.copywritingStatus}
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {[
                      { id: 'ready', label: t.assetsForm.copyReady },
                      { id: 'partial', label: t.assetsForm.copyPartial },
                      { id: 'needs_agency_writing', label: t.assetsForm.copyNone },
                    ].map((opt) => (
                      <div
                        key={opt.id}
                        onClick={() =>
                          setCopywritingStatus(
                            opt.id as 'ready' | 'partial' | 'needs_agency_writing'
                          )
                        }
                        className={`p-3 rounded-lg border text-xs cursor-pointer transition-colors ${
                          copywritingStatus === opt.id
                            ? 'border-neutral-900 bg-neutral-900/5 font-semibold text-neutral-900'
                            : 'border-neutral-200 text-neutral-600 hover:bg-neutral-50'
                        }`}
                      >
                        {opt.label}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Photos */}
                <div>
                  <label className="block text-xs font-semibold text-neutral-800 mb-2">
                    {t.assetsForm.photoStatus}
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {[
                      { id: 'ready_hd', label: t.assetsForm.photoHd },
                      { id: 'smartphone', label: t.assetsForm.photoSmartphone },
                      { id: 'needs_photography_service', label: t.assetsForm.photoNone },
                    ].map((opt) => (
                      <div
                        key={opt.id}
                        onClick={() =>
                          setPhotographyStatus(
                            opt.id as 'ready_hd' | 'smartphone' | 'needs_photography_service'
                          )
                        }
                        className={`p-3 rounded-lg border text-xs cursor-pointer transition-colors ${
                          photographyStatus === opt.id
                            ? 'border-neutral-900 bg-neutral-900/5 font-semibold text-neutral-900'
                            : 'border-neutral-200 text-neutral-600 hover:bg-neutral-50'
                        }`}
                      >
                        {opt.label}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Domain & Hosting */}
                <div>
                  <label className="block text-xs font-semibold text-neutral-800 mb-2">
                    {t.assetsForm.domainStatus}
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-3">
                    {[
                      { id: 'already_have', label: t.assetsForm.domainHave },
                      { id: 'need_agency_recommendation', label: t.assetsForm.domainRecommend },
                      { id: 'need_assistance', label: t.assetsForm.domainNotSure },
                    ].map((opt) => (
                      <div
                        key={opt.id}
                        onClick={() =>
                          setDomainHostingStatus(
                            opt.id as 'already_have' | 'need_agency_recommendation' | 'need_assistance'
                          )
                        }
                        className={`p-3 rounded-lg border text-xs cursor-pointer transition-colors ${
                          domainHostingStatus === opt.id
                            ? 'border-neutral-900 bg-neutral-900/5 font-semibold text-neutral-900'
                            : 'border-neutral-200 text-neutral-600 hover:bg-neutral-50'
                        }`}
                      >
                        {opt.label}
                      </div>
                    ))}
                  </div>

                  <label className="block text-xs font-medium text-neutral-700 mb-1">
                    {t.assetsForm.domainDesired}
                  </label>
                  <input
                    type="text"
                    value={domainNameDesired}
                    onChange={(e) => setDomainNameDesired(e.target.value)}
                    placeholder={t.assetsForm.domainDesiredPlaceholder}
                    className="w-full px-3.5 py-2 text-sm border border-neutral-200 rounded-lg focus:outline-hidden focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900"
                  />
                </div>
              </div>
            )}

            {/* STEP 6: Budget & Timeline */}
            {currentStep === 6 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-semibold text-neutral-900 mb-1">
                    {lang === 'lo' ? 'ງົບປະມານ ແລະ ກຳນົດເວລາ' : 'Budget, Timeline & Constraints'}
                  </h2>
                  <p className="text-xs sm:text-sm text-neutral-500">
                    {lang === 'lo'
                      ? 'ກຳນົດຂອບເຂດງົບປະມານເພື່ອໃຫ້ທີມງານສະເໜີ Solutions ທີ່ຄຸ້ມຄ່າທີ່ສຸດ'
                      : 'Define delivery pacing and budgetary boundaries for the proposal.'}
                  </p>
                </div>

                {/* Budget Range */}
                <div>
                  <label className="block text-xs font-semibold text-neutral-800 mb-2">
                    {t.budgetForm.budgetRange}
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {[
                      { id: 'under_10m_lak', label: t.budgetForm.under10m },
                      { id: '10m_25m_lak', label: t.budgetForm.from10to25m },
                      { id: '25m_50m_lak', label: t.budgetForm.from25to50m },
                      { id: '50m_100m_lak', label: t.budgetForm.from50to100m },
                      { id: 'over_100m_lak', label: t.budgetForm.over100m },
                      { id: 'flexible', label: t.budgetForm.flexible },
                    ].map((b) => (
                      <div
                        key={b.id}
                        onClick={() => setBudgetRange(b.id as BudgetRange)}
                        className={`p-3 rounded-lg border text-xs cursor-pointer transition-colors ${
                          budgetRange === b.id
                            ? 'border-neutral-900 bg-neutral-900/5 font-semibold text-neutral-900'
                            : 'border-neutral-200 text-neutral-600 hover:bg-neutral-50'
                        }`}
                      >
                        {b.label}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Timeline */}
                <div>
                  <label className="block text-xs font-semibold text-neutral-800 mb-2">
                    {t.budgetForm.timeline}
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {[
                      { id: 'urgent_2_weeks', label: t.budgetForm.urgent2w },
                      { id: '1_month', label: t.budgetForm.month1 },
                      { id: '2_3_months', label: t.budgetForm.months2to3 },
                      { id: 'flexible', label: t.budgetForm.timelineFlex },
                    ].map((time) => (
                      <div
                        key={time.id}
                        onClick={() => setTimeline(time.id as LaunchTimeline)}
                        className={`p-3 rounded-lg border text-xs cursor-pointer text-center transition-colors ${
                          timeline === time.id
                            ? 'border-neutral-900 bg-neutral-900/5 font-semibold text-neutral-900'
                            : 'border-neutral-200 text-neutral-600 hover:bg-neutral-50'
                        }`}
                      >
                        {time.label}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Additional Notes */}
                <div>
                  <label className="block text-xs font-medium text-neutral-700 mb-1">
                    {t.budgetForm.additionalNotes}
                  </label>
                  <textarea
                    rows={3}
                    value={additionalNotes}
                    onChange={(e) => setAdditionalNotes(e.target.value)}
                    placeholder={t.budgetForm.additionalNotesPlaceholder}
                    className="w-full px-3.5 py-2 text-sm border border-neutral-200 rounded-lg focus:outline-hidden focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900"
                  />
                </div>
              </div>
            )}

            {/* Navigation buttons */}
            <div className="mt-8 pt-6 border-t border-neutral-200 flex items-center justify-between">
              {currentStep > 1 ? (
                <button
                  type="button"
                  onClick={() => setCurrentStep((prev) => prev - 1)}
                  className="px-4 py-2 border border-neutral-200 rounded-lg text-xs font-medium text-neutral-700 hover:bg-neutral-50 transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>{t.wizard.prevStep}</span>
                </button>
              ) : (
                <div />
              )}

              {currentStep < 6 ? (
                <button
                  type="button"
                  onClick={() => setCurrentStep((prev) => prev + 1)}
                  className="px-5 py-2 bg-neutral-900 hover:bg-neutral-800 text-white rounded-lg text-xs font-semibold transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <span>{t.wizard.nextStep}</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer shadow-sm flex items-center gap-2"
                >
                  <Check className="w-4 h-4" />
                  <span>{t.wizard.submitBrief}</span>
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Live Scope Summary Sidebar */}
        <div className="lg:col-span-4 bg-white border border-neutral-200 rounded-xl p-5 shadow-xs sticky top-20">
          <div className="flex items-center justify-between pb-3 border-b border-neutral-200 mb-4">
            <h3 className="text-xs font-bold text-neutral-900 uppercase tracking-wider">
              {t.summarySidebar.title}
            </h3>
            <span className="text-[11px] font-semibold text-neutral-500 font-mono tabular-nums">
              {completeness}%
            </span>
          </div>

          {/* Progress bar */}
          <div className="w-full h-1.5 bg-neutral-100 rounded-full overflow-hidden mb-5">
            <div
              className="h-full bg-neutral-900 transition-all duration-300"
              style={{ width: `${completeness}%` }}
            />
          </div>

          <div className="space-y-3.5 text-xs">
            <div>
              <span className="text-neutral-500 block mb-0.5">
                {t.summarySidebar.client}
              </span>
              <p className="font-semibold text-neutral-900 truncate">
                {companyName || clientName || t.summarySidebar.notSpecified}
              </p>
            </div>

            <div>
              <span className="text-neutral-500 block mb-0.5">
                {t.summarySidebar.category}
              </span>
              <p className="font-medium text-neutral-800">
                {WEBSITE_TYPES.find((w) => w.id === websiteType)?.[
                  lang === 'lo' ? 'titleLo' : 'titleEn'
                ]}
              </p>
            </div>

            <div>
              <span className="text-neutral-500 block mb-0.5">
                {t.summarySidebar.style}
              </span>
              <p className="font-medium text-neutral-800">
                {DESIGN_STYLES.find((s) => s.id === designStyle)?.[
                  lang === 'lo' ? 'titleLo' : 'titleEn'
                ]}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-neutral-100">
              <div>
                <span className="text-neutral-500 block mb-0.5">
                  {t.summarySidebar.pagesCount}
                </span>
                <p className="font-bold text-neutral-900 font-mono tabular-nums text-sm">
                  {totalPagesCount} {lang === 'lo' ? 'ໜ້າ' : 'Pages'}
                </p>
              </div>

              <div>
                <span className="text-neutral-500 block mb-0.5">
                  {t.summarySidebar.featuresCount}
                </span>
                <p className="font-bold text-neutral-900 font-mono tabular-nums text-sm">
                  {features.length} {lang === 'lo' ? 'ລະບົບ' : 'Modules'}
                </p>
              </div>
            </div>

            <div className="pt-2 border-t border-neutral-100">
              <span className="text-neutral-500 block mb-0.5">
                {t.summarySidebar.estComplexity}
              </span>
              <div className="flex items-center gap-1.5">
                <span
                  className={`w-2 h-2 rounded-full ${
                    complexity === 'Enterprise'
                      ? 'bg-purple-600'
                      : complexity === 'High'
                      ? 'bg-amber-600'
                      : complexity === 'Medium'
                      ? 'bg-blue-600'
                      : 'bg-emerald-600'
                  }`}
                />
                <span className="font-semibold text-neutral-800">{complexity}</span>
              </div>
            </div>

            <div className="pt-2 border-t border-neutral-100">
              <span className="text-neutral-500 block mb-0.5">
                {t.summarySidebar.estTimeline}
              </span>
              <p className="font-semibold text-neutral-900">
                {estTimeline}
              </p>
            </div>

            <div className="pt-2 border-t border-neutral-100 bg-neutral-50 p-2.5 rounded-lg">
              <span className="text-neutral-500 block mb-0.5 text-[11px]">
                {lang === 'lo' ? 'ງົບປະມານປະມານການ' : 'Estimated Budget Range'}
              </span>
              <p className="font-bold text-neutral-900 text-xs">
                {lang === 'lo' ? estBudgetLo : estBudgetEn}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
