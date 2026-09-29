import React, { useState } from 'react';
import { Language, TRANSLATIONS } from '../translations/i18n';
import { ClientBrief, BriefStatus } from '../types/brief';
import { WEBSITE_TYPES, DESIGN_STYLES, COLOR_PALETTES, ALL_FEATURES } from '../constants/presets';
import {
  buildWhatsAppUrl,
  getAgencyWhatsAppNumber,
  setAgencyWhatsAppNumber,
} from '../constants/contactConfig';
import {
  X,
  Printer,
  Copy,
  Check,
  Building2,
  Calendar,
  Layers,
  Palette,
  Code2,
  ShieldCheck,
  CheckCircle,
  ExternalLink,
  Phone,
  Mail,
  MessageSquare,
  Globe,
  Settings,
} from 'lucide-react';

interface BriefDetailModalProps {
  brief: ClientBrief | null;
  lang: Language;
  onClose: () => void;
  onUpdateStatus: (id: string, status: BriefStatus) => void;
  onUpdateAgencyNotes: (id: string, notes: string) => void;
}

export const BriefDetailModal: React.FC<BriefDetailModalProps> = ({
  brief,
  lang,
  onClose,
  onUpdateStatus,
  onUpdateAgencyNotes,
}) => {
  if (!brief) return null;

  const t = TRANSLATIONS[lang];
  const [copied, setCopied] = useState(false);
  const [agencyNotes, setAgencyNotes] = useState(brief.agencyNotes || '');
  const [waNumber, setWaNumber] = useState(getAgencyWhatsAppNumber());

  const handleOpenWhatsApp = () => {
    let number = getAgencyWhatsAppNumber();
    if (number === '85620XXXXXXXX' || !number) {
      const input = window.prompt(
        'ກະລຸນາປ້ອນເບີ WhatsApp ຂອງທ່ານສຳລັບຮັບຂໍ້ມູນ (ຕົວຢ່າງ: 8562099998888 ຕັດເລກ 0 ອອກ):\n*(ຫຼື ປ່ຽນຖາວອນໄດ້ໃນໄຟລ໌ src/constants/contactConfig.ts)*',
        ''
      );
      if (input && input.trim()) {
        const clean = input.replace(/[^0-9]/g, '');
        setAgencyWhatsAppNumber(clean);
        setWaNumber(clean);
        number = clean;
      } else {
        return;
      }
    }
    const url = buildWhatsAppUrl(brief, number);
    window.open(url, '_blank');
  };

  const handleChangeWhatsAppNumber = () => {
    const current = getAgencyWhatsAppNumber();
    const input = window.prompt(
      'ປ້ອນເບີ WhatsApp ໃໝ່ (ລະຫັດ 856 ຕັດເລກ 0 ອອກ, ເຊັ່ນ: 8562099998888):',
      current === '85620XXXXXXXX' ? '' : current
    );
    if (input && input.trim()) {
      const clean = input.replace(/[^0-9]/g, '');
      setAgencyWhatsAppNumber(clean);
      setWaNumber(clean);
      alert(`ອັບເດດເບີ WhatsApp ເປັນ: ${clean} ຮຽບຮ້ອຍແລ້ວ!`);
    }
  };

  const websiteTypeObj = WEBSITE_TYPES.find((w) => w.id === brief.websiteType);
  const styleObj = DESIGN_STYLES.find((s) => s.id === brief.designStyle);
  const paletteObj = COLOR_PALETTES.find((p) => p.id === brief.colorPaletteId);

  // Copy full brief as formatted markdown
  const handleCopyMarkdown = () => {
    const text = `
# WEB SPECIFICATION & CLIENT BRIEF: ${brief.companyName}
- Status: ${brief.status.toUpperCase()}
- Client: ${brief.clientName}
- Contact: ${brief.phone} | ${brief.email || 'N/A'} | ${brief.whatsappOrLine || 'N/A'}
- Category: ${brief.businessCategory}

## 1. SCOPE & OBJECTIVES
- Type: ${brief.customWebsiteType ? `${brief.customWebsiteType} (ກຳນົດເອງ)` : (websiteTypeObj?.titleLo || brief.websiteType)}
- Primary Goal: ${brief.primaryGoal}
- Selected Pages (${brief.selectedPages.length}): ${brief.selectedPages.join(', ')}
${brief.customPages ? `- Custom Pages: ${brief.customPages}` : ''}

## 2. DESIGN & AESTHETIC
- Style: ${brief.customDesignStyle ? `${brief.customDesignStyle} (ກຳນົດເອງ)` : (styleObj?.titleLo || brief.designStyle)}
- Palette: ${brief.colorPaletteId === 'custom' ? `Custom Primary (${brief.customPrimaryColor}), Accent (${brief.customSecondaryColor})` : (paletteObj?.nameLo || brief.colorPaletteId)}
- Reference Sites: ${brief.referenceUrls || 'None specified'}

## 3. FUNCTIONALITY & CHARACTERISTICS
- Features: ${brief.features.join(', ')}
- Languages: ${brief.languages.join(', ')}
- Payment Gateways: ${brief.paymentMethods.join(', ')}

## 4. PAYMENT TERMS & WARRANTY
- Payment Terms: ${brief.paymentTerms === 'single_full_payment' ? 'ຈ່າຍງວດດຽວຈົບ (Single Full Payment)' : (brief.paymentTerms || 'N/A')}
- Warranty & Support: ${brief.warrantyPeriod === '1_year' ? 'ຮັບປະກັນ ແລະ ດູແລຟຣີ 1 ປີເຕັມ (1 Year Warranty)' : (brief.warrantyPeriod || 'N/A')}
- Budget Range: ${brief.estimatedBudgetEstimateLo} / ${brief.estimatedBudgetEstimateEn}
- Timeline: ${brief.estimatedTimelineWeeks}
- Complexity: ${brief.estimatedComplexity}

## 5. RECOMMENDED TECH STACK
- Frontend: ${brief.recommendedTechStack.frontend}
- Backend: ${brief.recommendedTechStack.backend}
- Database: ${brief.recommendedTechStack.database}
- Hosting: ${brief.recommendedTechStack.hosting}
- Payment: ${brief.recommendedTechStack.payment}
    `.trim();

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 print:p-0 print:bg-white print:static">
      <div className="bg-white rounded-2xl border border-neutral-200 shadow-2xl w-full max-w-5xl max-h-[90vh] flex flex-col overflow-hidden print:max-h-none print:border-none print:shadow-none">
        {/* Top Modal Header */}
        <div className="p-4 sm:p-6 border-b border-neutral-200 flex items-center justify-between bg-neutral-50/70 print:bg-white no-print">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-500 font-semibold">
                Project Spec #{brief.id}
              </span>
              <span className="text-neutral-300">·</span>
              <span className="text-xs text-neutral-500">
                {new Date(brief.createdAt).toLocaleDateString()}
              </span>
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-neutral-900 mt-0.5 truncate">
              {brief.companyName}
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <select
              value={brief.status}
              onChange={(e) => onUpdateStatus(brief.id, e.target.value as BriefStatus)}
              className="text-xs font-semibold px-2.5 sm:px-3 py-1.5 rounded-lg border border-neutral-300 bg-white text-neutral-800 cursor-pointer focus:outline-hidden"
            >
              <option value="new">{t.status.new}</option>
              <option value="reviewing">{t.status.reviewing}</option>
              <option value="proposal_sent">{t.status.proposal_sent}</option>
              <option value="approved">{t.status.approved}</option>
              <option value="in_development">{t.status.in_development}</option>
              <option value="completed">{t.status.completed}</option>
            </select>

            <button
              onClick={handleOpenWhatsApp}
              className="px-2.5 sm:px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 active:scale-[0.98] text-white rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
              title="ເປີດສົ່ງຂໍ້ມູນນີ້ເຂົ້າ WhatsApp ຫາທີມງານ"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">ສົ່ງເຂົ້າ WhatsApp</span>
              <span className="sm:hidden">WhatsApp</span>
            </button>

            <button
              onClick={handleCopyMarkdown}
              className="px-2.5 sm:px-3 py-1.5 border border-neutral-200 hover:bg-neutral-100 rounded-lg text-xs font-medium text-neutral-700 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span className="hidden sm:inline">{copied ? t.detailModal.copiedSuccess : t.detailModal.copyBrief}</span>
            </button>

            <button
              onClick={handlePrint}
              className="px-2.5 sm:px-3 py-1.5 bg-neutral-900 hover:bg-neutral-800 text-white rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Printer className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{t.detailModal.printPdf}</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 text-neutral-400 hover:text-neutral-800 hover:bg-neutral-200/60 rounded-lg transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Content */}
        <div className="p-4 sm:p-8 overflow-y-auto space-y-6 sm:space-y-8 print:p-4 print:space-y-6">
          {/* WhatsApp Direct Dispatch Card (no-print) */}
          <div className="bg-emerald-50 border border-emerald-200/90 rounded-xl p-3.5 sm:p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 no-print">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                <MessageSquare className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs sm:text-sm font-bold text-emerald-950 flex items-center gap-2">
                  <span>ສົ່ງຂໍ້ມູນຄວາມຕ້ອງການນີ້ເຂົ້າ WhatsApp ຂອງທີມງານ</span>
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 font-semibold px-2 py-0.5 rounded-full border border-emerald-300">
                    ແນະນຳ
                  </span>
                </div>
                <div className="text-[11px] text-emerald-700 mt-0.5 flex items-center gap-1.5 flex-wrap">
                  <span>ເບີ WhatsApp ປາຍທາງ:</span>
                  <span className="font-mono font-bold bg-white px-2 py-0.5 rounded border border-emerald-200 text-emerald-900">
                    {waNumber}
                  </span>
                  <button
                    type="button"
                    onClick={handleChangeWhatsAppNumber}
                    className="text-emerald-800 underline hover:text-emerald-950 cursor-pointer font-medium"
                  >
                    (ຄລິກເພື່ອປ່ຽນເບີ)
                  </button>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={handleOpenWhatsApp}
              className="w-full sm:w-auto px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 active:scale-[0.98] text-white text-xs sm:text-sm font-bold rounded-xl flex items-center justify-center gap-2 cursor-pointer shadow-xs transition-all shrink-0"
            >
              <MessageSquare className="w-4 h-4" />
              <span>ເປີດສົ່ງໃນ WhatsApp ດຽວນີ້</span>
            </button>
          </div>

          {/* Print Title Block */}
          <div className="hidden print:block border-b pb-4 mb-6">
            <h1 className="text-2xl font-bold">{brief.companyName} - Web Project Brief</h1>
            <p className="text-sm text-neutral-500">
              Requirements Specification & Standard Compliance Sheet · ID: {brief.id} · Generated {new Date().toLocaleDateString()}
            </p>
          </div>

          {/* Section 1: Executive Profile & Client Contact */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-neutral-50 border border-neutral-200 rounded-xl p-5 text-xs">
            <div>
              <span className="text-neutral-500 block mb-1 font-semibold uppercase tracking-wider text-[10px]">
                {t.detailModal.clientInfo}
              </span>
              <p className="font-bold text-sm text-neutral-900 mb-1">{brief.clientName}</p>
              <p className="text-neutral-600 mb-1">{brief.companyName}</p>
              <p className="text-neutral-500">{brief.businessCategory}</p>
            </div>

            <div>
              <span className="text-neutral-500 block mb-1 font-semibold uppercase tracking-wider text-[10px]">
                {lang === 'lo' ? 'ຊ່ອງທາງຕິດຕໍ່' : 'Contact Details'}
              </span>
              <p className="flex items-center gap-1.5 text-neutral-800 mb-1">
                <Phone className="w-3.5 h-3.5 text-neutral-400" />
                <span>{brief.phone || 'N/A'}</span>
              </p>
              <p className="flex items-center gap-1.5 text-neutral-800 mb-1">
                <Mail className="w-3.5 h-3.5 text-neutral-400" />
                <span>{brief.email || 'N/A'}</span>
              </p>
              <p className="flex items-center gap-1.5 text-neutral-800">
                <MessageSquare className="w-3.5 h-3.5 text-neutral-400" />
                <span>{brief.whatsappOrLine || 'N/A'}</span>
              </p>
            </div>

            <div>
              <span className="text-neutral-500 block mb-1 font-semibold uppercase tracking-wider text-[10px]">
                {lang === 'lo' ? 'ການປະເມີນຂອບເຂດວຽກ' : 'Scope Assessment'}
              </span>
              <div className="flex items-center justify-between mb-1">
                <span className="text-neutral-600">{lang === 'lo' ? 'ຄວາມຊັບຊ້ອນ' : 'Complexity'}:</span>
                <span className="font-bold text-neutral-900">{brief.estimatedComplexity}</span>
              </div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-neutral-600">{lang === 'lo' ? 'ໄລຍະເວລາ' : 'Timeline'}:</span>
                <span className="font-bold text-neutral-900">{brief.estimatedTimelineWeeks}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-neutral-600">{lang === 'lo' ? 'ປະມານການລາຄາ' : 'Est. Cost'}:</span>
                <span className="font-bold text-emerald-700">{brief.estimatedBudgetEstimateLo}</span>
              </div>
            </div>
          </div>

          {/* Section 2: Goals & Target Audience */}
          <div>
            <h3 className="text-xs font-bold text-neutral-900 uppercase tracking-wider mb-2">
              {lang === 'lo' ? 'ເປົ້າໝາຍທຸລະກິດ & ກຸ່ມລູກຄ້າ' : 'Business Goal & Target Audience'}
            </h3>
            <div className="bg-white border border-neutral-200 rounded-xl p-4 text-xs space-y-3">
              <div>
                <span className="font-semibold text-neutral-700 block mb-1">
                  {lang === 'lo' ? 'ເປົ້າໝາຍຫຼັກຂອງເວັບໄຊ:' : 'Primary Objective:'}
                </span>
                <p className="text-neutral-900 leading-relaxed bg-neutral-50 p-2.5 rounded-lg">
                  {brief.primaryGoal}
                </p>
              </div>
              {brief.businessDescription && (
                <div>
                  <span className="font-semibold text-neutral-700 block mb-1">
                    {lang === 'lo' ? 'ລາຍລະອຽດທຸລະກິດ:' : 'Business Overview:'}
                  </span>
                  <p className="text-neutral-600 leading-relaxed">{brief.businessDescription}</p>
                </div>
              )}
              {brief.targetAudience && (
                <div>
                  <span className="font-semibold text-neutral-700 block mb-1">
                    {lang === 'lo' ? 'ກຸ່ມລູກຄ້າເປົ້າໝາຍ:' : 'Target Audience:'}
                  </span>
                  <p className="text-neutral-600 leading-relaxed">{brief.targetAudience}</p>
                </div>
              )}
            </div>
          </div>

          {/* Section 3: Sitemap & Page Scope */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xs font-bold text-neutral-900 uppercase tracking-wider">
                {t.detailModal.projectScope}
              </h3>
              <span className="text-xs font-semibold text-neutral-500 font-mono">
                {brief.selectedPages.length} {lang === 'lo' ? 'ໜ້າຫຼັກ' : 'Core Pages'}
              </span>
            </div>
            <div className="bg-white border border-neutral-200 rounded-xl p-4">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {brief.selectedPages.map((page, idx) => (
                  <div
                    key={idx}
                    className="p-2 bg-neutral-50 border border-neutral-200/80 rounded-lg text-xs font-medium text-neutral-800 flex items-center gap-1.5"
                  >
                    <CheckCircle className="w-3.5 h-3.5 text-neutral-600 shrink-0" />
                    <span className="truncate">{page}</span>
                  </div>
                ))}
              </div>
              {brief.customPages && (
                <div className="mt-3 pt-3 border-t border-neutral-100 text-xs">
                  <span className="font-semibold text-neutral-700">
                    {lang === 'lo' ? 'ໜ້າເພີ່ມເຕີມ: ' : 'Additional Pages: '}
                  </span>
                  <span className="text-neutral-600">{brief.customPages}</span>
                </div>
              )}
            </div>
          </div>

          {/* Section 4: Design Specifications */}
          <div>
            <h3 className="text-xs font-bold text-neutral-900 uppercase tracking-wider mb-2">
              {t.detailModal.designSpecs}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-white border border-neutral-200 rounded-xl p-4 text-xs">
              <div>
                <span className="text-neutral-500 block mb-1">
                  {lang === 'lo' ? 'ສະໄຕລ໌ຫຼັກ' : 'Design Style'}
                </span>
                <p className="font-bold text-neutral-900">
                  {brief.customDesignStyle ? `${brief.customDesignStyle} (ກຳນົດເອງ)` : (styleObj?.titleLo || brief.designStyle)}
                </p>
                <p className="text-[11px] text-neutral-500 mt-1">
                  {styleObj?.descLo || ''}
                </p>
              </div>

              <div>
                <span className="text-neutral-500 block mb-1">
                  {lang === 'lo' ? 'ໂທນສີ (Color Scheme)' : 'Color Scheme'}
                </span>
                <p className="font-semibold text-neutral-900 mb-2">
                  {brief.colorPaletteId === 'custom' ? 'ໂທນສີກຳນົດເອງ (Custom Colors)' : (paletteObj?.nameLo || brief.colorPaletteId)}
                </p>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    <span
                      className="w-5 h-5 rounded-full border border-black/10"
                      style={{ backgroundColor: brief.customPrimaryColor || paletteObj?.primary }}
                      title="Primary"
                    />
                    <span className="font-mono text-[10px] text-neutral-500">
                      {brief.customPrimaryColor || paletteObj?.primary}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span
                      className="w-5 h-5 rounded-full border border-black/10"
                      style={{ backgroundColor: brief.customSecondaryColor || paletteObj?.accent }}
                      title="Accent"
                    />
                    <span className="font-mono text-[10px] text-neutral-500">
                      {brief.customSecondaryColor || paletteObj?.accent}
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <span className="text-neutral-500 block mb-1">
                  {lang === 'lo' ? 'ຕົວໜັງສື & ເອກະສານອ້າງອີງ' : 'Typography & References'}
                </span>
                <p className="font-semibold text-neutral-900 capitalize mb-1">
                  {brief.typographyPreference.replace('_', ' ')}
                </p>
                {brief.referenceUrls ? (
                  <p className="text-blue-600 truncate text-[11px]" title={brief.referenceUrls}>
                    {brief.referenceUrls}
                  </p>
                ) : (
                  <p className="text-neutral-400 text-[11px]">
                    {lang === 'lo' ? 'ບໍ່ມີລິ້ງອ້າງອີງ' : 'No reference URL'}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Section 5: Functional Requirements & Features */}
          <div>
            <h3 className="text-xs font-bold text-neutral-900 uppercase tracking-wider mb-2">
              {t.detailModal.featuresSpecs}
            </h3>
            <div className="bg-white border border-neutral-200 rounded-xl p-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                {ALL_FEATURES.filter((f) => brief.features.includes(f.id)).map((feat) => (
                  <div
                    key={feat.id}
                    className="p-3 bg-neutral-50 border border-neutral-200/80 rounded-lg flex items-start gap-2.5"
                  >
                    <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-neutral-900">
                        {lang === 'lo' ? feat.titleLo : feat.titleEn}
                      </h4>
                      <p className="text-neutral-500 text-[11px] mt-0.5">
                        {lang === 'lo' ? feat.descriptionLo : feat.descriptionEn}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 pt-3 border-t border-neutral-100 flex flex-wrap gap-4 text-xs">
                <div>
                  <span className="text-neutral-500">{lang === 'lo' ? 'ພາສາ: ' : 'Languages: '}</span>
                  <span className="font-bold text-neutral-900 uppercase">
                    {brief.languages.join(' · ')}
                  </span>
                </div>
                <div>
                  <span className="text-neutral-500">{lang === 'lo' ? 'ຊ່ອງທາງຊຳລະ: ' : 'Payments: '}</span>
                  <span className="font-bold text-neutral-900">
                    {brief.paymentMethods.join(' · ')}
                  </span>
                </div>
                <div>
                  <span className="text-neutral-500">{lang === 'lo' ? 'ໂດເມນ: ' : 'Domain: '}</span>
                  <span className="font-bold text-neutral-900">
                    {brief.domainNameDesired || brief.domainHostingStatus}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Section 6: Recommended Tech Stack & Architecture */}
          <div>
            <h3 className="text-xs font-bold text-neutral-900 uppercase tracking-wider mb-2">
              {t.detailModal.techArchitecture}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-neutral-900 text-white rounded-xl p-4 text-xs">
              <div>
                <span className="text-neutral-400 block mb-0.5 text-[10px] uppercase font-mono">
                  Frontend
                </span>
                <p className="font-semibold text-neutral-100">
                  {brief.recommendedTechStack.frontend}
                </p>
              </div>
              <div>
                <span className="text-neutral-400 block mb-0.5 text-[10px] uppercase font-mono">
                  Backend & DB
                </span>
                <p className="font-semibold text-neutral-100">
                  {brief.recommendedTechStack.backend} / {brief.recommendedTechStack.database}
                </p>
              </div>
              <div>
                <span className="text-neutral-400 block mb-0.5 text-[10px] uppercase font-mono">
                  Cloud Hosting & Payments
                </span>
                <p className="font-semibold text-neutral-100">
                  {brief.recommendedTechStack.hosting} / {brief.recommendedTechStack.payment}
                </p>
              </div>
            </div>
          </div>

          {/* Section 7: Web Quality Assurance Standards Audit */}
          <div>
            <h3 className="text-xs font-bold text-neutral-900 uppercase tracking-wider mb-2">
              {t.detailModal.standardsCheck}
            </h3>
            <div className="bg-white border border-neutral-200 rounded-xl divide-y divide-neutral-100 text-xs">
              {brief.standardsAudit?.map((std) => (
                <div key={std.id} className="p-3 flex items-start justify-between gap-4">
                  <div className="flex items-start gap-2.5">
                    <span className="font-mono text-[10px] font-bold text-neutral-500 bg-neutral-100 px-1.5 py-0.5 rounded-sm">
                      {std.code}
                    </span>
                    <div>
                      <h4 className="font-semibold text-neutral-900">
                        {lang === 'lo' ? std.titleLo : std.titleEn}
                      </h4>
                      <p className="text-neutral-500 text-[11px] mt-0.5">
                        {lang === 'lo' ? std.descriptionLo : std.descriptionEn}
                      </p>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 text-[10px] font-bold text-emerald-700 bg-emerald-50 rounded-sm shrink-0 uppercase">
                    Guaranteed
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Section 8: Agency Notes / Internal Notes */}
          <div className="no-print">
            <h3 className="text-xs font-bold text-neutral-900 uppercase tracking-wider mb-2">
              {t.detailModal.agencyNotes}
            </h3>
            <div className="space-y-2">
              <textarea
                rows={3}
                value={agencyNotes}
                onChange={(e) => setAgencyNotes(e.target.value)}
                onBlur={() => onUpdateAgencyNotes(brief.id, agencyNotes)}
                placeholder={lang === 'lo' ? 'ບັນທຶກຄວາມເຫັນຂອງທີມງານ, ແຜນດຳເນີນການ...' : 'Internal notes, team assignments, or sprint planning...'}
                className="w-full px-3.5 py-2 text-xs border border-neutral-200 rounded-lg focus:outline-hidden focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 bg-neutral-50"
              />
              <span className="text-[11px] text-neutral-400 block">
                {lang === 'lo' ? '* ບັນທຶກອັດຕະໂນມັດເມື່ອພິມສຳເລັດ' : '* Automatically saved when clicking out of the field.'}
              </span>
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div className="p-4 border-t border-neutral-200 bg-neutral-50/70 flex items-center justify-between no-print">
          <span className="text-xs text-neutral-500">
            {lang === 'lo' ? 'ໃບສະຫຼຸບຂອບເຂດມາດຕະຖານ WebBrief.la' : 'Standard WebBrief SRS Document'}
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-neutral-900 hover:bg-neutral-800 text-white rounded-lg text-xs font-semibold transition-colors cursor-pointer"
          >
            {t.detailModal.close}
          </button>
        </div>
      </div>
    </div>
  );
};
