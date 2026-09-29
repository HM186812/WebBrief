import React, { useState } from 'react';
import { Language } from '../translations/i18n';
import { DESIGN_STYLES, COLOR_PALETTES } from '../constants/presets';
import { DesignStyleId } from '../types/brief';
import {
  Monitor,
  Tablet,
  Smartphone,
  Sparkles,
  ShoppingBag,
  ArrowRight,
  Check,
  Star,
  ShieldCheck,
  Send,
  Eye,
  Sliders,
} from 'lucide-react';

interface StyleVisualizerProps {
  lang: Language;
}

export const StyleVisualizer: React.FC<StyleVisualizerProps> = ({ lang }) => {
  const [selectedStyle, setSelectedStyle] = useState<DesignStyleId>('minimal_luxury');
  const [selectedPalette, setSelectedPalette] = useState<string>('slate_corporate');
  const [viewportMode, setViewportMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [typoMode, setTypoMode] = useState<'sans' | 'serif'>('sans');

  const currentStyleObj = DESIGN_STYLES.find((s) => s.id === selectedStyle) || DESIGN_STYLES[0];
  const currentPaletteObj = COLOR_PALETTES.find((p) => p.id === selectedPalette) || COLOR_PALETTES[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900">
            {lang === 'lo' ? 'ຫ້ອງທົດລອງຮູບແບບ ແລະ ສະໄຕລ໌ (Style Lab)' : 'Interactive Style & Aesthetic Lab'}
          </h1>
          <p className="text-xs sm:text-sm text-neutral-600 mt-1">
            {lang === 'lo'
              ? 'ທົດລອງປັບປ່ຽນຮູບແບບດີໄຊນ໌, ໂທນສີ, ແລະ ທົດສອບການສະແດງຜົນໃນໜ້າຈໍຄອມພິວເຕີ, ແທັບເລັດ ແລະ ມືຖື'
              : 'Live interactive sandbox for clients and designers to preview styles, palettes, and device viewports.'}
          </p>
        </div>

        {/* Viewport Switcher */}
        <div className="flex items-center gap-1 bg-neutral-100 p-1 rounded-lg border border-neutral-200">
          <button
            onClick={() => setViewportMode('desktop')}
            className={`p-1.5 rounded-md text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer ${
              viewportMode === 'desktop' ? 'bg-white text-neutral-900 shadow-2xs font-semibold' : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            <Monitor className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Desktop</span>
          </button>
          <button
            onClick={() => setViewportMode('tablet')}
            className={`p-1.5 rounded-md text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer ${
              viewportMode === 'tablet' ? 'bg-white text-neutral-900 shadow-2xs font-semibold' : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            <Tablet className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Tablet</span>
          </button>
          <button
            onClick={() => setViewportMode('mobile')}
            className={`p-1.5 rounded-md text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer ${
              viewportMode === 'mobile' ? 'bg-white text-neutral-900 shadow-2xs font-semibold' : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Mobile</span>
          </button>
        </div>
      </div>

      {/* Control Strip */}
      <div className="bg-white border border-neutral-200 rounded-xl p-4 shadow-2xs grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
        {/* Style Selector */}
        <div>
          <label className="font-semibold text-neutral-700 block mb-1.5">
            {lang === 'lo' ? '1. ເລືອກຮູບແບບສະໄຕລ໌' : '1. Design Style'}
          </label>
          <select
            value={selectedStyle}
            onChange={(e) => setSelectedStyle(e.target.value as DesignStyleId)}
            className="w-full px-3 py-1.5 border border-neutral-200 rounded-lg bg-neutral-50 text-neutral-900 font-medium cursor-pointer"
          >
            {DESIGN_STYLES.map((s) => (
              <option key={s.id} value={s.id}>
                {lang === 'lo' ? s.titleLo : s.titleEn}
              </option>
            ))}
          </select>
        </div>

        {/* Palette Selector */}
        <div>
          <label className="font-semibold text-neutral-700 block mb-1.5">
            {lang === 'lo' ? '2. ໂທນສີຫຼັກ (Color Palette)' : '2. Brand Palette'}
          </label>
          <div className="flex items-center gap-2">
            <select
              value={selectedPalette}
              onChange={(e) => setSelectedPalette(e.target.value)}
              className="flex-1 px-3 py-1.5 border border-neutral-200 rounded-lg bg-neutral-50 text-neutral-900 font-medium cursor-pointer"
            >
              {COLOR_PALETTES.map((p) => (
                <option key={p.id} value={p.id}>
                  {lang === 'lo' ? p.nameLo : p.nameEn}
                </option>
              ))}
            </select>
            <div className="flex items-center gap-1 shrink-0">
              <span
                className="w-4 h-4 rounded-full border border-black/10"
                style={{ backgroundColor: currentPaletteObj.primary }}
              />
              <span
                className="w-4 h-4 rounded-full border border-black/10"
                style={{ backgroundColor: currentPaletteObj.accent }}
              />
            </div>
          </div>
        </div>

        {/* Typography Mode */}
        <div>
          <label className="font-semibold text-neutral-700 block mb-1.5">
            {lang === 'lo' ? '3. ຕົວໜັງສື (Typography)' : '3. Typography'}
          </label>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setTypoMode('sans')}
              className={`flex-1 py-1.5 px-3 rounded-lg border text-xs font-medium cursor-pointer transition-colors ${
                typoMode === 'sans'
                  ? 'bg-neutral-900 text-white border-neutral-900'
                  : 'bg-white text-neutral-700 border-neutral-200 hover:bg-neutral-50'
              }`}
            >
              Sans (Modern Clean)
            </button>
            <button
              onClick={() => setTypoMode('serif')}
              className={`flex-1 py-1.5 px-3 rounded-lg border text-xs font-medium font-serif cursor-pointer transition-colors ${
                typoMode === 'serif'
                  ? 'bg-neutral-900 text-white border-neutral-900'
                  : 'bg-white text-neutral-700 border-neutral-200 hover:bg-neutral-50'
              }`}
            >
              Serif (Refined Luxury)
            </button>
          </div>
        </div>
      </div>

      {/* Interactive Mock Canvas with responsive containment */}
      <div className="flex justify-center bg-neutral-100/80 p-4 sm:p-8 rounded-2xl border border-neutral-200/80 min-h-[600px] overflow-hidden">
        <div
          className={`bg-white transition-all duration-300 rounded-2xl shadow-xl overflow-hidden border border-neutral-200/80 flex flex-col ${
            viewportMode === 'mobile'
              ? 'w-[375px]'
              : viewportMode === 'tablet'
              ? 'w-[768px]'
              : 'w-full max-w-[1100px]'
          }`}
          style={{ fontFamily: typoMode === 'serif' ? 'serif' : 'inherit' }}
        >
          {/* Mock Browser Header Bar */}
          <div className="bg-neutral-100 border-b border-neutral-200 px-4 py-2.5 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
            </div>
            <div className="bg-white px-4 py-0.5 rounded-md text-[11px] font-mono text-neutral-500 border border-neutral-200/60 truncate max-w-[240px]">
              https://client-demo.la
            </div>
            <div className="text-[10px] font-semibold text-neutral-400 uppercase">
              {viewportMode}
            </div>
          </div>

          {/* Mock Website Navbar */}
          <div
            className="px-6 py-4 flex items-center justify-between border-b"
            style={{ borderColor: `${currentPaletteObj.primary}15` }}
          >
            <div className="flex items-center gap-2">
              <span
                className="w-7 h-7 rounded-lg text-white flex items-center justify-center font-bold text-xs"
                style={{ backgroundColor: currentPaletteObj.primary }}
              >
                C
              </span>
              <span
                className="font-bold text-base tracking-tight"
                style={{ color: currentPaletteObj.primary }}
              >
                ClientBrand<span style={{ color: currentPaletteObj.accent }}>.la</span>
              </span>
            </div>

            {viewportMode !== 'mobile' && (
              <div className="flex items-center gap-5 text-xs font-medium text-neutral-600">
                <span className="hover:text-black cursor-pointer">
                  {lang === 'lo' ? 'ໜ້າຫຼັກ' : 'Home'}
                </span>
                <span className="hover:text-black cursor-pointer">
                  {lang === 'lo' ? 'ບໍລິການ' : 'Services'}
                </span>
                <span className="hover:text-black cursor-pointer">
                  {lang === 'lo' ? 'ຜົນງານ' : 'Works'}
                </span>
                <span className="hover:text-black cursor-pointer">
                  {lang === 'lo' ? 'ກ່ຽວກັບພວກເຮົາ' : 'About'}
                </span>
              </div>
            )}

            <button
              className="px-3.5 py-1.5 rounded-lg text-xs font-bold text-white shadow-xs cursor-pointer transition-opacity hover:opacity-90"
              style={{ backgroundColor: currentPaletteObj.accent }}
            >
              {lang === 'lo' ? 'ຕິດຕໍ່ສອບຖາມ' : 'Get in Touch'}
            </button>
          </div>

          {/* Mock Hero Section */}
          <div className="p-6 sm:p-12 relative overflow-hidden">
            <div className="max-w-2xl">
              <span
                className="text-[11px] font-bold uppercase tracking-wider block mb-2"
                style={{ color: currentPaletteObj.accent }}
              >
                {lang === 'lo'
                  ? 'ມາດຕະຖານດີໄຊນ໌ສາກົນ · ຕອບໂຈດທຸລະກິດລາວ'
                  : 'Engineered for Performance · International Standards'}
              </span>

              <h2
                className={`font-bold tracking-tight mb-4 ${
                  viewportMode === 'mobile' ? 'text-2xl' : 'text-3xl sm:text-4xl'
                }`}
                style={{ color: currentPaletteObj.primary }}
              >
                {selectedStyle === 'minimal_luxury' && (lang === 'lo' ? 'ຄວາມສະຫງ່າງາມທີ່ລຽບງ່າຍ ແລະ ຊົງຄຸນຄ່າ' : 'Quiet Elegance & Timeless Craftsmanship')}
                {selectedStyle === 'corporate_tech' && (lang === 'lo' ? 'ຂັບເຄື່ອນທຸລະກິດດ້ວຍຄວາມໜ້າເຊື່ອຖືລະດັບສູງ' : 'Empowering Enterprises with Digital Authority')}
                {selectedStyle === 'ecommerce_modern' && (lang === 'lo' ? 'ປະສົບການຊື້ເຄື່ອງອອນລາຍທີ່ງ່າຍ ແລະ ວ່ອງໄວ' : 'Seamless Modern Shopping & Instant Checkout')}
                {selectedStyle === 'hospitality_warm' && (lang === 'lo' ? 'ສຳຜັດຄວາມອົບອຸ່ນ ແລະ ທຳມະຊາດທີ່ແທ້ຈິງ' : 'Discover Genuine Warmth & Natural Serenity')}
              </h2>

              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed mb-6">
                {lang === 'lo'
                  ? 'ເວັບໄຊທີ່ຖືກອອກແບບໃຫ້ໂຫຼດໄວຕໍ່າກວ່າ 2 ວິນາທີ, ຮອງຮັບທຸກຂະໜາດໜ້າຈໍ, ມີລະບົບຈັດການງ່າຍ ແລະ ປອດໄພດ້ວຍມາດຕະຖານ SSL 100%.'
                  : 'Engineered for instant sub-2s load speeds, responsive typography, and bank-grade SSL security.'}
              </p>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  className="px-5 py-2.5 rounded-lg text-xs font-bold text-white shadow-sm cursor-pointer hover:opacity-90 transition-opacity flex items-center gap-1.5"
                  style={{ backgroundColor: currentPaletteObj.primary }}
                >
                  <span>{lang === 'lo' ? 'ເລີ່ມຕົ້ນໂຄງການ' : 'Explore Offerings'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <button className="px-4 py-2.5 rounded-lg text-xs font-semibold text-neutral-800 border border-neutral-200 hover:bg-neutral-50 transition-colors cursor-pointer">
                  {lang === 'lo' ? 'ເບິ່ງລາຍລະອຽດ' : 'Learn More'}
                </button>
              </div>
            </div>
          </div>

          {/* Visual Showcase Card */}
          <div className="px-6 sm:px-12 pb-10">
            <div className="rounded-xl overflow-hidden border border-neutral-200 shadow-sm relative aspect-21/9 max-h-[300px] bg-neutral-100">
              <img
                src={currentStyleObj.imageSrc}
                alt="Style mockup preview"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-5">
                <div className="text-white">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-neutral-200">
                    {lang === 'lo' ? 'ຕົວຢ່າງຮູບແບບດີໄຊນ໌' : 'Visual Archetype Preview'}
                  </span>
                  <h3 className="text-sm sm:text-base font-bold">
                    {lang === 'lo' ? currentStyleObj.titleLo : currentStyleObj.titleEn}
                  </h3>
                </div>
              </div>
            </div>

            {/* Feature Mini Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4 text-xs">
              <div className="p-3.5 rounded-lg bg-neutral-50 border border-neutral-200/80">
                <ShieldCheck className="w-4 h-4 text-emerald-600 mb-1.5" />
                <h4 className="font-bold text-neutral-900">
                  {lang === 'lo' ? 'ຄວາມປອດໄພ SSL & ໂຫຼດໄວ' : 'SSL Secured & Fast'}
                </h4>
                <p className="text-[11px] text-neutral-500 mt-0.5">
                  {lang === 'lo' ? 'ເຂົ້າລະຫັດ HTTPS ມາດຕະຖານສາກົນ' : 'Bank-level TLS encryption'}
                </p>
              </div>

              <div className="p-3.5 rounded-lg bg-neutral-50 border border-neutral-200/80">
                <Smartphone className="w-4 h-4 text-blue-600 mb-1.5" />
                <h4 className="font-bold text-neutral-900">
                  {lang === 'lo' ? '100% Mobile Ready' : '100% Mobile Ready'}
                </h4>
                <p className="text-[11px] text-neutral-500 mt-0.5">
                  {lang === 'lo' ? 'ໃຊ້ງານສະດວກທຸກໜ້າຈໍມືຖື' : 'Optimized touch navigation'}
                </p>
              </div>

              <div className="p-3.5 rounded-lg bg-neutral-50 border border-neutral-200/80">
                <Sparkles className="w-4 h-4 text-amber-600 mb-1.5" />
                <h4 className="font-bold text-neutral-900">
                  {lang === 'lo' ? 'ຮອງຮັບພາສາລາວສົມບູນ' : 'Lao Unicode Font'}
                </h4>
                <p className="text-[11px] text-neutral-500 mt-0.5">
                  {lang === 'lo' ? 'ວັນນະຍຸດບໍ່ຕົກ ອ່ານງ່າຍ' : 'Perfect typography standards'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
