/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ClientBrief } from '../types/brief';
import { WEBSITE_TYPES, DESIGN_STYLES, COLOR_PALETTES } from './presets';

/**
 * =========================================================================
 * ⚙️ ຕັ້ງຄ່າເບີ WhatsApp ຂອງທ່ານສຳລັບຮັບຂໍ້ມູນລູກຄ້າ (WHATSAPP CONFIGURATION)
 * =========================================================================
 * ໃສ່ເບີ WhatsApp ຂອງທ່ານໃນຮູບແບບສາກົນ (ລະຫັດປະເທດລາວ 856 ຕັດເລກ 0 ທາງໜ້າອອກ):
 * ຕົວຢ່າງ:
 *   - ເບີ 020 99998888  -> '8562099998888'
 *   - ເບີ 020 55554444  -> '8562055554444'
 *   - ເບີ 030 55556666  -> '8563055556666'
 */
export const DEFAULT_AGENCY_WHATSAPP = '8562055575537'; // 👈 ປ່ຽນເບີໂທ WhatsApp ຂອງທ່ານຢູ່ນີ້!

const STORAGE_KEY_WHATSAPP = 'webbrief_agency_whatsapp_number';

export const getAgencyWhatsAppNumber = (): string => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY_WHATSAPP);
    if (saved && saved.trim().length >= 8) {
      return saved.trim();
    }
  } catch {
    // ignore
  }
  return DEFAULT_AGENCY_WHATSAPP;
};

export const setAgencyWhatsAppNumber = (phoneNumber: string) => {
  try {
    const cleanNumber = phoneNumber.replace(/[^0-9]/g, '');
    localStorage.setItem(STORAGE_KEY_WHATSAPP, cleanNumber);
  } catch {
    // ignore
  }
};

/**
 * ຟັງຊັນສ້າງຂໍ້ຄວາມສະຫຼຸບຂໍ້ມູນລູກຄ້າສຳລັບສົ່ງຜ່ານ WhatsApp
 */
export const formatBriefForWhatsApp = (brief: ClientBrief): string => {
  const typeObj = WEBSITE_TYPES.find((w) => w.id === brief.websiteType);
  const styleObj = DESIGN_STYLES.find((s) => s.id === brief.designStyle);
  const paletteObj = COLOR_PALETTES.find((p) => p.id === brief.colorPaletteId);

  const websiteTypeName = brief.customWebsiteType
    ? `${brief.customWebsiteType} (ກຳນົດເອງ)`
    : (typeObj?.titleLo || brief.websiteType);

  const styleName = brief.customDesignStyle
    ? `${brief.customDesignStyle} (ກຳນົດເອງ)`
    : (styleObj?.titleLo || brief.designStyle);

  const pagesList = brief.selectedPages.length > 0
    ? brief.selectedPages.map((p) => `  • ${p}`).join('\n')
    : '  (ບໍ່ໄດ້ລະບຸ)';

  const featuresList = brief.features.length > 0
    ? brief.features.map((f) => `  • ${f}`).join('\n')
    : '  (ບໍ່ໄດ້ລະບຸ)';

  return `
*📋 ຂໍ້ມູນຄວາມຕ້ອງການສ້າງເວັບໄຊ (Web Discovery Brief)*
---------------------------------------
👤 *ຊື່ລູກຄ້າ:* ${brief.clientName || 'ບໍ່ໄດ້ລະບຸ'}
🏢 *ແບຣນ/ຮ້ານ:* ${brief.companyName || 'ບໍ່ໄດ້ລະບຸ'}
📞 *ເບີໂທລະສັບ:* ${brief.phone || 'ບໍ່ໄດ້ລະບຸ'}
${brief.email ? `✉️ *ອີເມວ:* ${brief.email}\n` : ''}💬 *WhatsApp/Line:* ${brief.whatsappOrLine || 'ບໍ່ໄດ້ລະບຸ'}
🏢 *ປະເພດທຸລະກິດ:* ${brief.businessCategory || 'ບໍ່ໄດ້ລະບຸ'}
${brief.businessDescription ? `📝 *ລາຍລະອຽດທຸລະກິດ:* ${brief.businessDescription}\n` : ''}
🌐 *ປະເພດເວັບໄຊ:* ${websiteTypeName}
🎯 *ເປົ້າໝາຍຫຼັກ:* ${brief.primaryGoal || 'ບໍ່ໄດ້ລະບຸ'}

📄 *ໜ້າເວັບທີ່ຕ້ອງການ:*
${pagesList}
${brief.customPages ? `  • ໜ້າເພີ່ມເຕີມ: ${brief.customPages}\n` : ''}
🎨 *ສະໄຕລ໌ດີໄຊນ໌:* ${styleName}
🎨 *ໂທນສີ:* ${paletteObj?.nameLo || brief.colorPaletteId}
${brief.referenceUrls ? `🔗 *ເວັບໄຊຕົວຢ່າງອ້າງອີງ:* ${brief.referenceUrls}\n` : ''}
⚡ *ຟັງຊັນລະບົບທີ່ເລືອກ:*
${featuresList}

${brief.additionalNotes ? `📝 *ໝາຍເຫດ/ຄວາມຕ້ອງການພິເສດ:*\n${brief.additionalNotes}\n` : ''}---------------------------------------
_ສົ່ງຈາກລະບົບ WebBrief Lao_
`.trim();
};

/**
 * ສ້າງ URL ສຳລັບເປີດ WhatsApp Click-to-Chat
 */
export const buildWhatsAppUrl = (brief: ClientBrief, customNumber?: string): string => {
  const number = (customNumber || getAgencyWhatsAppNumber()).replace(/[^0-9]/g, '');
  const message = formatBriefForWhatsApp(brief);
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
};
