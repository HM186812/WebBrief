import React from 'react';
import { Language } from '../translations/i18n';
import { STANDARD_QUALITY_ITEMS } from '../constants/presets';
import {
  ShieldCheck,
  Zap,
  Smartphone,
  Lock,
  Search,
  Globe,
  Database,
  CheckCircle2,
  Check,
  AlertCircle,
  Code,
} from 'lucide-react';

interface StandardsGuideProps {
  lang: Language;
}

export const StandardsGuide: React.FC<StandardsGuideProps> = ({ lang }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <ShieldCheck className="w-5 h-5 text-emerald-600" />
          <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
            {lang === 'lo' ? 'ມາດຕະຖານຄຸນນະພາບເວັບໄຊ' : 'Engineering Quality Standards'}
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900">
          {lang === 'lo'
            ? 'ມາດຕະຖານການສ້າງເວັບໄຊເພື່ອຕອບໂຈດລູກຄ້າ (Web Standards & Quality Assurance)'
            : 'Production Web Standards & Client Quality Assurance'}
        </h1>
        <p className="text-xs sm:text-sm text-neutral-600 mt-1 max-w-3xl">
          {lang === 'lo'
            ? 'ທຸກເວັບໄຊທີ່ພັດທະນາຜ່ານລະບົບ WebBrief ຈະຕ້ອງຜ່ານການກວດສອບມາດຕະຖານ 7 ຂໍ້ຫຼັກ ເພື່ອໃຫ້ໝັ້ນໃຈວ່າເວັບໄຊມີປະສິດທິພາບສູງ, ປອດໄພ ແລະ ສ້າງຍອດຂາຍໄດ້ຈິງ.'
            : 'Every web platform engineered through WebBrief complies with these 7 foundational pillars to guarantee high-performance, security, and conversion.'}
        </p>
      </div>

      {/* 7 Pillars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {STANDARD_QUALITY_ITEMS.map((item, idx) => (
          <div
            key={item.id}
            className="bg-white border border-neutral-200 rounded-xl p-5 shadow-2xs hover:border-neutral-300 transition-colors"
          >
            <div className="flex items-start justify-between gap-3 mb-3">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-md bg-neutral-900 text-white font-mono text-xs flex items-center justify-center font-bold">
                  {idx + 1}
                </span>
                <span className="text-[11px] font-mono font-bold text-neutral-400">
                  {item.code}
                </span>
              </div>
              <span className="px-2 py-0.5 text-[10px] font-bold text-emerald-700 bg-emerald-50 rounded-md uppercase tracking-wider">
                {lang === 'lo' ? 'ມາດຕະຖານບັງຄັບ' : 'Mandatory Standard'}
              </span>
            </div>

            <h3 className="text-base font-bold text-neutral-900 mb-1.5">
              {lang === 'lo' ? item.titleLo : item.titleEn}
            </h3>

            <p className="text-xs text-neutral-600 leading-relaxed mb-4">
              {lang === 'lo' ? item.descriptionLo : item.descriptionEn}
            </p>

            <div className="pt-3 border-t border-neutral-100 flex items-center justify-between text-[11px]">
              <span className="text-neutral-500">
                {lang === 'lo' ? 'ຄວາມສຳຄັນ: ' : 'Priority: '}
                <strong className="text-neutral-800 uppercase">{item.importance}</strong>
              </span>
              <span className="flex items-center gap-1 text-emerald-600 font-semibold">
                <Check className="w-3.5 h-3.5" />
                <span>{lang === 'lo' ? 'ກວດສອບກ່ອນສົ່ງມອບ' : 'Pre-delivery Verified'}</span>
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Comparison table: Standard Agency vs Freelancer / Substandard */}
      <div className="bg-white border border-neutral-200 rounded-xl p-6 shadow-2xs">
        <h2 className="text-lg font-bold text-neutral-900 mb-2">
          {lang === 'lo' ? 'ຕາຕະລາງປຽບທຽບມາດຕະຖານການສ້າງເວັບໄຊ' : 'Standard Development vs Substandard Pitfalls'}
        </h2>
        <p className="text-xs text-neutral-500 mb-5">
          {lang === 'lo'
            ? 'ເຫດຜົນທີ່ຄວນເກັບກຳຄວາມຕ້ອງການ ແລະ ສ້າງເວັບຕາມມາດຕະຖານສາກົນ'
            : 'Why rigorous client discovery and engineering standards protect business investment.'}
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-neutral-200 bg-neutral-50/70 text-[11px] font-bold text-neutral-600 uppercase">
                <th className="py-2.5 px-3">{lang === 'lo' ? 'ດ້ານຄຸນນະພາບ' : 'Quality Aspect'}</th>
                <th className="py-2.5 px-3 text-emerald-700 bg-emerald-50/50">
                  {lang === 'lo' ? '✓ ມາດຕະຖານ WebBrief Agency' : '✓ WebBrief Agency Standard'}
                </th>
                <th className="py-2.5 px-3 text-red-600 bg-red-50/30">
                  {lang === 'lo' ? '✕ ເວັບໄຊທົ່ວໄປທີ່ບໍ່ມີມາດຕະຖານ' : '✕ Common Substandard Builds'}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100 text-xs">
              <tr>
                <td className="py-3 px-3 font-semibold text-neutral-900">
                  {lang === 'lo' ? 'ຄວາມໄວໃນການໂຫຼດ' : 'Page Speed'}
                </td>
                <td className="py-3 px-3 text-emerald-800 bg-emerald-50/20 font-medium">
                  ໂຫຼດໄວກວ່າ 2 ວິນາທີ, ບີບອັດຮູບ WebP, Google Score 90+
                </td>
                <td className="py-3 px-3 text-neutral-600 bg-red-50/10">
                  ໂຫຼດຊ້າ 5-10 ວິນາທີ ເນື່ອງຈາກຮູບໃຫຍ່ເກີນຂະໜາດ, ລູກຄ້າກົດອອກກ່ອນ
                </td>
              </tr>
              <tr>
                <td className="py-3 px-3 font-semibold text-neutral-900">
                  {lang === 'lo' ? 'ການຮອງຮັບໜ້າຈໍມືຖື' : 'Mobile Experience'}
                </td>
                <td className="py-3 px-3 text-emerald-800 bg-emerald-50/20 font-medium">
                  Responsive 100%, ຕົວໜັງສືພໍດີຕາ, ປຸ່ມກົດງ່າຍດ້ວຍນິ້ວໂປ້
                </td>
                <td className="py-3 px-3 text-neutral-600 bg-red-50/10">
                  ໜ້າຈໍແຕກ, ຕົວໜັງສືລົ້ນຂອບ, ຕ້ອງຊູມເຂົ້າ-ອອກເພື່ອອ່ານ
                </td>
              </tr>
              <tr>
                <td className="py-3 px-3 font-semibold text-neutral-900">
                  {lang === 'lo' ? 'ຕົວອັກສອນພາສາລາວ' : 'Lao Typography'}
                </td>
                <td className="py-3 px-3 text-emerald-800 bg-emerald-50/20 font-medium">
                  ຟອນ Unicode ມາດຕະຖານສາກົນ (Noto Sans Lao), ສະຫຼະ-ວັນນະຍຸດຕົກລ໋ອກຊັດເຈນ
                </td>
                <td className="py-3 px-3 text-neutral-600 bg-red-50/10">
                  ວັນນະຍຸດຊ້ອນກັນ, ສະຫຼະລອຍ, ບາງເຄື່ອງສະແດງຜົນເປັນກ່ອງສີ່ຫຼ່ຽມ
                </td>
              </tr>
              <tr>
                <td className="py-3 px-3 font-semibold text-neutral-900">
                  {lang === 'lo' ? 'ຄວາມປອດໄພ & ຄວາມເປັນເຈົ້າຂອງ' : 'Security & Ownership'}
                </td>
                <td className="py-3 px-3 text-emerald-800 bg-emerald-50/20 font-medium">
                  SSL HTTPS ຟຣີຕະຫຼອດຊີວິດ, ມອບ Source Code & Domain ໃຫ້ລູກຄ້າ 100%
                </td>
                <td className="py-3 px-3 text-neutral-600 bg-red-50/10">
                  ຖືກລັອກບັນຊີໄວ້ນຳຜູ້ພັດທະນາ, ຍ້າຍເວັບຍາກ, ບໍ່ມີໃບຢັ້ງຢືນຄວາມປອດໄພ
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
