import React, { useState } from 'react';
import { Language } from '../translations/i18n';
import {
  Code2,
  Cpu,
  Layers,
  Sparkles,
  Zap,
  Globe,
  Database,
  ShieldCheck,
  CheckCircle2,
  ExternalLink,
  GitBranch,
  Terminal,
  Check,
  Flame,
  ArrowRight,
} from 'lucide-react';

interface ReactTechStackGuideProps {
  lang: Language;
}

interface ReactEcosystemItem {
  id: string;
  name: string;
  category: 'framework' | 'styling' | 'state' | 'animation' | 'backend' | 'icons';
  version: string;
  popularityBadge: string;
  popularityRank: number;
  whyPopularLo: string;
  whyPopularEn: string;
  bestForLo: string;
  bestForEn: string;
  codeSnippet: string;
}

const REACT_ECOSYSTEM: ReactEcosystemItem[] = [
  {
    id: 'react-core',
    name: 'React 19 + TypeScript + Vite 6',
    category: 'framework',
    version: '^19.0.0',
    popularityBadge: '#1 Global Frontend Standard',
    popularityRank: 1,
    whyPopularLo:
      'ເປັນ Library ອັນດັບ 1 ຂອງໂລກທີ່ຖືກນຳໃຊ້ຫຼາຍທີ່ສຸດ ດ້ວຍ React Server Actions, Hooks ໃໝ່ (useActionState, useOptimistic) ໂຫຼດໄວ ແລະ ບໍ່ມີ Lag ດ້ວຍ Vite HMR.',
    whyPopularEn:
      'The world standard declarative UI library with React 19 Hooks, concurrent rendering, and sub-millisecond Vite bundler speed.',
    bestForLo: 'ເວັບໄຊທຸລະກິດ, E-Commerce, Dashboard, Web Portal ທຸກຮູບແບບ',
    bestForEn: 'Enterprise corporate platforms, high-conversion e-commerce, interactive portals',
    codeSnippet: `// React 19 Functional Hook
import { useState, useTransition } from 'react';

export function ClientDiscovery() {
  const [isPending, startTransition] = useTransition();
  const [scope, setScope] = useState({ style: 'minimal_luxury' });
  
  return <div className="p-6 bg-white rounded-xl shadow-xs">...</div>;
}`,
  },
  {
    id: 'nextjs',
    name: 'Next.js 15 (App Router & SSR / SSG)',
    category: 'framework',
    version: '^15.1.0',
    popularityBadge: '#1 Production React Framework',
    popularityRank: 2,
    whyPopularLo:
      'Framework React ຍອດນິຍົມທີ່ສຸດໃນໂລກສຳລັບ Production. ຊ່ວຍໃຫ້ເວັບໄຊຕິດ SEO Google ງ່າຍດາຍດ້ວຍ Server-Side Rendering (SSR) ແລະ Static Generation.',
    whyPopularEn:
      'The industry-dominant fullstack React framework powering top global brands with Server Components and SEO perfection.',
    bestForLo: 'ເວັບໄຊບໍລິສັດ, ຮ້ານຄ້າສິນຄ້າທີ່ຕ້ອງການຕິດ Google Search ອັນດັບຕົ້ນໆ',
    bestForEn: 'SEO-critical corporate websites, content portals, and high-performance digital stores',
    codeSnippet: `// Next.js 15 Server Component with Instant SEO
export async function generateMetadata() {
  return {
    title: 'Bolaven Coffee | Artisan Web Store',
    description: 'Specialty coffee direct from Bolaven Plateau Laos',
  };
}`,
  },
  {
    id: 'tailwind',
    name: 'Tailwind CSS v4 (Modern Utility-First)',
    category: 'styling',
    version: '^4.3.0',
    popularityBadge: '#1 CSS Framework Worldwide',
    popularityRank: 3,
    whyPopularLo:
      'CSS Framework ທີ່ນັກພັດທະນາ React ນິຍົມທີ່ສຸດໃນປະຈຸບັນ. ບໍ່ຕ້ອງຂຽນ CSS ແຍກ, ຂະໜາດໄຟລ໌ນ້ອຍທີ່ສຸດ (Zero Runtime), ແລະ ສະແດງຜົນ Responsive ທຸກໜ້າຈໍ.',
    whyPopularEn:
      'Ultra-fast styling with the latest Oxide engine, zero-runtime overhead, and perfect mobile responsive adaptation.',
    bestForLo: 'ອອກແບບ UI ໃຫ້ສວຍງາມທັນສະໄໝ, ໂຫຼດໄວ, ແລະ ຈັດການ Layout ງ່າຍ',
    bestForEn: 'Clean, pixel-perfect responsive layouts with minimal bundle size footprint',
    codeSnippet: `@import "tailwindcss";

/* Zero CSS bloat, instant styling directly in TSX JSX */
<div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-sans">
  <div className="p-4 bg-white border border-neutral-200 rounded-xl" />
</div>`,
  },
  {
    id: 'lucide',
    name: 'Lucide React Icons',
    category: 'icons',
    version: '^0.546.0',
    popularityBadge: '#1 Modern Icon Library',
    popularityRank: 4,
    whyPopularLo:
      'ໄອຄອນ SVG ມາດຕະຖານທີ່ສວຍງາມ, ສະອາດ, ຂະໜາດເບົາ ແລະ ຮອງຮັບ Tree-shaking 100% ເຮັດໃຫ້ເວັບໄຊໂຫຼດໄວ.',
    whyPopularEn:
      'Over 1,400 consistent, beautiful open-source vector glyphs optimized for React components with tree-shaking.',
    bestForLo: 'ປຸ່ມກົດ, ເມນູ, ໄອຄອນສະແດງສະຖານະ, ແລະ ລະບົບ Dashboard',
    bestForEn: 'Navigation menus, action buttons, and status indicator badges',
    codeSnippet: `import { Building2, ShoppingBag, ShieldCheck } from 'lucide-react';

<ShieldCheck className="w-5 h-5 text-emerald-600" />`,
  },
  {
    id: 'motion',
    name: 'Motion (Framer Motion v12)',
    category: 'animation',
    version: '^12.23.0',
    popularityBadge: '#1 Animation Engine for React',
    popularityRank: 5,
    whyPopularLo:
      'Library Animation ທີ່ດັງທີ່ສຸດໃນວົງການ React. ສ້າງ Animation ທີ່ລ່ຽນໄຫຼແບບ 60fps ລະດັບ Apple / Vercel ໂດຍບໍ່ເຮັດໃຫ້ເຄື່ອງຊ້າ.',
    whyPopularEn:
      'The gold-standard production animation library for React, delivering fluid 60fps micro-interactions.',
    bestForLo: 'ການເລື່ອນເປີດ Modal, Smooth Transition ປ່ຽນໜ້າ, ແລະ Scroll Animation',
    bestForEn: 'Smooth page transitions, micro-interactions, modal overlays, and scroll reveals',
    codeSnippet: `import * as motion from 'motion/react-client';

<motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}>
  <h1>Seamless Modern Web</h1>
</motion.div>`,
  },
  {
    id: 'supabase-node',
    name: 'Supabase / Node.js + PostgreSQL',
    category: 'backend',
    version: 'Cloud Edge',
    popularityBadge: '#1 Modern Cloud Backend for React',
    popularityRank: 6,
    whyPopularLo:
      'ລະບົບ Cloud Database ທີ່ເຂົ້າກັນໄດ້ດີທີ່ສຸດກັບ React. ຮອງຮັບການເກັບຂໍ້ມູນລູກຄ້າ, ລະບົບຊຳລະ BCEL One QR, ແລະ Realtime Database ທີ່ປອດໄພສູງ.',
    whyPopularEn:
      'Enterprise-grade PostgreSQL with instant Auth, Edge Functions, and bank-grade SSL security out of the box.',
    bestForLo: 'ເກັບຂໍ້ມູນຄຳສັ່ງຊື້, ຂໍ້ມູນລູກຄ້າ, ການຈອງຫ້ອງພັກ, ແລະ ລະບົບສະມາຊິກ',
    bestForEn: 'E-commerce orders, client brief storage, booking reservations, and user authentication',
    codeSnippet: `// Server-side integration with PostgreSQL / Supabase
const { data, error } = await supabase
  .from('client_briefs')
  .insert([newClientBrief]);`,
  },
];

export const ReactTechStackGuide: React.FC<ReactTechStackGuideProps> = ({ lang }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const filtered = REACT_ECOSYSTEM.filter(
    (item) => activeCategory === 'all' || item.category === activeCategory
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Hero Badge & Title */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <div className="w-6 h-6 rounded-md bg-blue-600 text-white flex items-center justify-center font-bold text-xs">
            ⚛
          </div>
          <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">
            {lang === 'lo' ? 'ເທັກໂນໂລຢີ React.js ຍອດນິຍົມອັນດັບ 1' : '#1 Popular React.js Ecosystem'}
          </span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900">
          {lang === 'lo'
            ? 'ມາດຕະຖານການພັດທະນາເວັບໄຊດ້ວຍ React.js ທີ່ໄດ້ຮັບຄວາມນິຍົມສູງສຸດ'
            : 'Modern Popular React.js Development Architecture & Standards'}
        </h1>
        <p className="text-xs sm:text-sm text-neutral-600 mt-1 max-w-3xl">
          {lang === 'lo'
            ? 'ລະບົບ WebBrief ນີ້ຖືກສ້າງຂຶ້ນ ແລະ ແນະນຳການນຳໃຊ້ເທັກໂນໂລຢີ React.js 19 + TypeScript + Tailwind CSS ເຊິ່ງເປັນ Stack ທີ່ໄດ້ຮັບຄວາມນິຍົມສູງສຸດໃນໂລກ ສຳລັບການສ້າງເວັບໄຊໃຫ້ລູກຄ້າໄດ້ຕາມມາດຕະຖານສາກົນ.'
            : 'This platform is engineered using React 19, TypeScript, and modern Tailwind CSS — the industry standard architecture trusted by leading tech companies globally.'}
        </p>
      </div>

      {/* Why Popular React Callout Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white border border-neutral-200 rounded-xl p-5 shadow-2xs">
          <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center mb-3">
            <Zap className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-bold text-neutral-900 mb-1">
            {lang === 'lo' ? '1. ໂຫຼດໄວ ແລະ ຕອບສະໜອງທັນທີ' : '1. Blazing Fast Sub-2s Speed'}
          </h3>
          <p className="text-xs text-neutral-600 leading-relaxed">
            {lang === 'lo'
              ? 'React.js ໃຊ້ Virtual DOM ແລະ Single Page Architecture ເຮັດໃຫ້ກົດປ່ຽນໜ້າໄດ້ທັນທີໂດຍບໍ່ຕ້ອງລໍຖ້າ Reload ໜ້າໃໝ່.'
              : 'React Virtual DOM and SPA routing eliminate full-page reload lag, achieving sub-200ms instantaneous page transitions.'}
          </p>
        </div>

        <div className="bg-white border border-neutral-200 rounded-xl p-5 shadow-2xs">
          <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3">
            <Globe className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-bold text-neutral-900 mb-1">
            {lang === 'lo' ? '2. ຮອງຮັບ SEO Google 100%' : '2. 100% Google SEO Ready'}
          </h3>
          <p className="text-xs text-neutral-600 leading-relaxed">
            {lang === 'lo'
              ? 'ສາມາດ Deploy ເປັນ Static Site ຫຼື Next.js Server Components ໃຫ້ Search Engine ຂອງ Google ເກັບ Index ໄດ້ງ່າຍ ແລະ ຕິດອັນດັບດີ.'
              : 'Native support for server-side rendering and pre-rendering guarantees Google bots index all business content with clean rich cards.'}
          </p>
        </div>

        <div className="bg-white border border-neutral-200 rounded-xl p-5 shadow-2xs">
          <div className="w-9 h-9 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center mb-3">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-bold text-neutral-900 mb-1">
            {lang === 'lo' ? '3. ງ່າຍຕໍ່ການຕໍ່ຍອດໃນອະນາຄົດ' : '3. Future-Proof Scalability'}
          </h3>
          <p className="text-xs text-neutral-600 leading-relaxed">
            {lang === 'lo'
              ? 'ໂຄງສ້າງແບບ Component ຊ່ວຍໃຫ້ສາມາດເພີ່ມລະບົບຈ່າຍເງິນ BCEL One, ລະບົບສະມາຊິກ, ຫຼື ແປງເປັນ Mobile App (React Native) ໄດ້ງ່າຍດາຍ.'
              : 'Modular component architecture allows seamless addition of bank QR checkout, member portals, or migration into React Native mobile apps.'}
          </p>
        </div>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-neutral-200 text-xs">
        {[
          { id: 'all', lo: 'ທຸກເທັກໂນໂລຢີໃນ React Stack', en: 'All React Ecosystem' },
          { id: 'framework', lo: 'Framework & Core', en: 'Framework & Core' },
          { id: 'styling', lo: 'CSS & UI Styling', en: 'CSS & UI Styling' },
          { id: 'animation', lo: 'Animation & Motion', en: 'Animation & Motion' },
          { id: 'backend', lo: 'Cloud DB & Backend', en: 'Cloud DB & Backend' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveCategory(tab.id)}
            className={`px-3 py-1.5 rounded-lg font-medium cursor-pointer transition-colors whitespace-nowrap ${
              activeCategory === tab.id
                ? 'bg-neutral-900 text-white font-semibold'
                : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'
            }`}
          >
            {lang === 'lo' ? tab.lo : tab.en}
          </button>
        ))}
      </div>

      {/* React Stack Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="bg-white border border-neutral-200 rounded-xl overflow-hidden shadow-2xs hover:border-neutral-300 transition-all flex flex-col justify-between"
          >
            <div className="p-5">
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 uppercase tracking-wider">
                  {item.popularityBadge}
                </span>
                <span className="text-[11px] font-mono text-neutral-400 font-semibold">
                  {item.version}
                </span>
              </div>

              <h3 className="text-base font-bold text-neutral-900 mb-2">
                {item.name}
              </h3>

              <p className="text-xs text-neutral-600 leading-relaxed mb-4">
                {lang === 'lo' ? item.whyPopularLo : item.whyPopularEn}
              </p>

              <div className="bg-neutral-50 rounded-lg p-3 border border-neutral-200/80 mb-4 text-xs">
                <span className="font-semibold text-neutral-800 block mb-1">
                  {lang === 'lo' ? 'ເໝາະສຳລັບໂຄງການ:' : 'Recommended for:'}
                </span>
                <p className="text-neutral-600 text-[11px]">
                  {lang === 'lo' ? item.bestForLo : item.bestForEn}
                </p>
              </div>

              {/* Code Snippet Preview */}
              <div>
                <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-wider block mb-1">
                  {lang === 'lo' ? 'ຕົວຢ່າງໂຄດມາດຕະຖານ (Code Example):' : 'Production Code Pattern:'}
                </span>
                <pre className="bg-neutral-900 text-neutral-200 p-3 rounded-lg text-[11px] font-mono overflow-x-auto leading-relaxed border border-neutral-800">
                  <code>{item.codeSnippet}</code>
                </pre>
              </div>
            </div>

            <div className="p-3 bg-neutral-50 border-t border-neutral-100 flex items-center justify-between text-[11px] text-neutral-500">
              <span className="flex items-center gap-1.5 font-medium text-emerald-700">
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                {lang === 'lo' ? 'ຕິດຕັ້ງ ແລະ ໃຊ້ງານແລ້ວໃນໂຄງການ' : 'Configured & Active in Project'}
              </span>
              <span className="font-mono text-neutral-400">#Rank {item.popularityRank}</span>
            </div>
          </div>
        ))}
      </div>

      {/* React vs Legacy Comparison Card */}
      <div className="bg-neutral-900 text-white rounded-2xl p-6 sm:p-8">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 mb-3">
            <span className="px-2 py-0.5 text-[10px] font-mono font-bold bg-blue-500 text-white rounded-md uppercase">
              Architecture Analysis
            </span>
            <span className="text-xs text-neutral-400">
              {lang === 'lo' ? 'ເປັນຫຍັງລູກຄ້າຈຶ່ງຄວນເລືອກ React.js?' : 'Why React.js is the Client Standard'}
            </span>
          </div>

          <h2 className="text-xl sm:text-2xl font-bold tracking-tight mb-3">
            {lang === 'lo'
              ? 'ປຽບທຽບ React.js ສະໄໝໃໝ່ ກັບ ເວັບໄຊແບບເກົ່າ (Traditional Static HTML / WordPress)'
              : 'Modern React.js vs Traditional Legacy CMS Platforms'}
          </h2>

          <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed mb-6">
            {lang === 'lo'
              ? 'ການເລືອກ React.js ຊ່ວຍໃຫ້ເວັບໄຊຂອງລູກຄ້າມີອາຍຸການໃຊ້ງານຍາວນານ, ປອດໄພຈາກການຖືກແຮັກ (No PHP Vulnerabilities), ໂຫຼດໄວຕໍ່າກວ່າ 2 ວິນາທີ ແລະ ຮອງຮັບການເຊື່ອມຕໍ່ລະບົບທະນາຄານລາວ (BCEL One) ໄດ້ຢ່າງສົມບູນແບບ.'
              : 'React provides a clean, secure runtime environment with no legacy CMS security exploits, lightning performance, and direct API integration with Lao banking services.'}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-neutral-800/80 border border-neutral-700">
              <h4 className="font-bold text-emerald-400 mb-1.5 flex items-center gap-1.5">
                <Check className="w-4 h-4" />
                <span>{lang === 'lo' ? 'ເວັບໄຊ React.js (ມາດຕະຖານ WebBrief)' : 'Modern React.js Stack'}</span>
              </h4>
              <ul className="space-y-1.5 text-neutral-300 text-[11px]">
                <li>• ໂຫຼດໜ້າໄວຕໍ່າກວ່າ 1-2 ວິນາທີ ດ້ວຍ Vite Bundler</li>
                <li>• ບໍ່ມີບັນຫາສະຫຼະພາສາລາວຕົກລ໋ອກ (Noto Sans Lao Unicode)</li>
                <li>• ປອດໄພສູງດ້ວຍ SSL HTTPS ແລະ Serverless Functions</li>
                <li>• ມອບ Source Code ໃຫ້ລູກຄ້າ 100% ບໍ່ມີຄ່າທຳນຽມແອບແຝງ</li>
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-neutral-800/40 border border-neutral-800 text-neutral-400">
              <h4 className="font-bold text-red-400 mb-1.5">
                {lang === 'lo' ? 'ເວັບໄຊລະບົບເກົ່າ (Legacy CMS / Slow Sites)' : 'Traditional Legacy Websites'}
              </h4>
              <ul className="space-y-1.5 text-[11px]">
                <li>• ໂຫຼດຊ້າ 5-8 ວິນາທີ ເນື່ອງຈາກ Plugin ຫຼາຍເກີນໄປ</li>
                <li>• ສ່ຽງຖືກແຮັກ ແລະ ຕິດມາວແວ ຖ້າບໍ່ໄດ້ອັບເດດ Plugin</li>
                <li>• ປັບແຕ່ງດີໄຊນ໌ຍາກ, ຕິດກອບແມ່ແບບ (Template)</li>
                <li>• ຍ້າຍ Server ຍາກ ແລະ ມັກຖືກຜູກຂາດໂດຍຜູ້ພັດທະນາ</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
