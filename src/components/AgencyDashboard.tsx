import React, { useState } from 'react';
import { Language, TRANSLATIONS } from '../translations/i18n';
import { ClientBrief, BriefStatus, WebsiteType } from '../types/brief';
import { WEBSITE_TYPES, DESIGN_STYLES } from '../constants/presets';
import {
  Search,
  Filter,
  Plus,
  FileText,
  Trash2,
  Download,
  Upload,
  Calendar,
  Layers,
  ArrowUpRight,
  TrendingUp,
  CheckCircle2,
  Clock,
  ExternalLink,
} from 'lucide-react';

interface AgencyDashboardProps {
  briefs: ClientBrief[];
  lang: Language;
  onSelectBrief: (brief: ClientBrief) => void;
  onNewBrief: () => void;
  onDeleteBrief: (id: string) => void;
  onUpdateStatus: (id: string, status: BriefStatus) => void;
  onImportBriefs: (imported: ClientBrief[]) => void;
}

const getStatusBadge = (status: BriefStatus, lang: Language) => {
  const t = TRANSLATIONS[lang].status;
  switch (status) {
    case 'new':
      return { label: t.new, color: 'text-blue-700 bg-blue-50 border-blue-200' };
    case 'reviewing':
      return { label: t.reviewing, color: 'text-amber-700 bg-amber-50 border-amber-200' };
    case 'proposal_sent':
      return { label: t.proposal_sent, color: 'text-purple-700 bg-purple-50 border-purple-200' };
    case 'approved':
      return { label: t.approved, color: 'text-teal-700 bg-teal-50 border-teal-200' };
    case 'in_development':
      return { label: t.in_development, color: 'text-indigo-700 bg-indigo-50 border-indigo-200' };
    case 'completed':
      return { label: t.completed, color: 'text-emerald-700 bg-emerald-50 border-emerald-200' };
  }
};

export const AgencyDashboard: React.FC<AgencyDashboardProps> = ({
  briefs,
  lang,
  onSelectBrief,
  onNewBrief,
  onDeleteBrief,
  onUpdateStatus,
  onImportBriefs,
}) => {
  const t = TRANSLATIONS[lang];
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  // Filtered briefs
  const filtered = briefs.filter((b) => {
    const matchesSearch =
      b.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.businessCategory.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || b.status === statusFilter;
    const matchesCategory = categoryFilter === 'all' || b.websiteType === categoryFilter;
    return matchesSearch && matchesStatus && matchesCategory;
  });

  // Analytics Metrics
  const totalBriefs = briefs.length;
  const inDevCount = briefs.filter((b) => b.status === 'in_development').length;
  const avgPages = Math.round(
    briefs.reduce((acc, b) => acc + (b.selectedPages?.length || 5), 0) / (totalBriefs || 1)
  );

  // Export JSON
  const handleExportJson = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(briefs, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `webbrief_submissions_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // Import JSON
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (Array.isArray(parsed)) {
          onImportBriefs(parsed);
        }
      } catch (err) {
        console.error('Failed to parse JSON', err);
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Top Banner / Heading */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900">
            {t.dashboard.title}
          </h1>
          <p className="text-xs sm:text-sm text-neutral-600 mt-1">
            {t.dashboard.subtitle}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <label className="px-3 py-2 border border-neutral-200 hover:bg-neutral-50 text-neutral-700 rounded-lg text-xs font-medium cursor-pointer transition-colors flex items-center gap-1.5 shadow-2xs">
            <Upload className="w-3.5 h-3.5 text-neutral-500" />
            <span>Import</span>
            <input type="file" accept=".json" onChange={handleFileUpload} className="hidden" />
          </label>

          <button
            onClick={handleExportJson}
            className="px-3 py-2 border border-neutral-200 hover:bg-neutral-50 text-neutral-700 rounded-lg text-xs font-medium transition-colors cursor-pointer flex items-center gap-1.5 shadow-2xs"
          >
            <Download className="w-3.5 h-3.5 text-neutral-500" />
            <span>{t.dashboard.exportJson}</span>
          </button>

          <button
            onClick={onNewBrief}
            className="px-4 py-2 bg-neutral-900 hover:bg-neutral-800 text-white rounded-lg text-xs font-semibold transition-colors cursor-pointer flex items-center gap-1.5 shadow-xs"
          >
            <Plus className="w-4 h-4" />
            <span>{t.dashboard.newBriefBtn}</span>
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white border border-neutral-200 rounded-xl p-4 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-neutral-500">{t.dashboard.statsTotal}</span>
            <FileText className="w-4 h-4 text-neutral-400" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-neutral-900 font-mono tabular-nums">
              {totalBriefs}
            </span>
            <span className="text-[11px] text-neutral-500">ໂຄງການ</span>
          </div>
        </div>

        <div className="bg-white border border-neutral-200 rounded-xl p-4 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-neutral-500">{t.dashboard.statsInDev}</span>
            <Clock className="w-4 h-4 text-indigo-500" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-indigo-600 font-mono tabular-nums">
              {inDevCount}
            </span>
            <span className="text-[11px] text-neutral-500">Active Build</span>
          </div>
        </div>

        <div className="bg-white border border-neutral-200 rounded-xl p-4 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-neutral-500">{t.dashboard.statsAvgPages}</span>
            <Layers className="w-4 h-4 text-neutral-400" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-neutral-900 font-mono tabular-nums">
              ~{avgPages}
            </span>
            <span className="text-[11px] text-neutral-500">{lang === 'lo' ? 'ໜ້າ/ເວັບ' : 'pages/site'}</span>
          </div>
        </div>

        <div className="bg-white border border-neutral-200 rounded-xl p-4 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-neutral-500">{t.dashboard.statsTopStyle}</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="mt-2">
            <span className="text-sm font-bold text-neutral-900 truncate block">
              Minimal Luxury
            </span>
            <span className="text-[11px] text-neutral-500">
              {lang === 'lo' ? 'ມາດຕະຖານສາກົນ' : 'Editorial Grade'}
            </span>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white border border-neutral-200 rounded-xl p-3 sm:p-4 shadow-2xs flex flex-col sm:flex-row items-center gap-3">
        <div className="relative w-full sm:flex-1">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={t.dashboard.searchPlaceholder}
            className="w-full pl-9 pr-3.5 py-1.5 text-xs sm:text-sm border border-neutral-200 rounded-lg focus:outline-hidden focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-1.5 text-xs font-medium border border-neutral-200 rounded-lg bg-white text-neutral-700 cursor-pointer focus:outline-hidden"
          >
            <option value="all">{lang === 'lo' ? 'ທຸກສະຖານະ' : 'All Statuses'}</option>
            <option value="new">{t.status.new}</option>
            <option value="reviewing">{t.status.reviewing}</option>
            <option value="proposal_sent">{t.status.proposal_sent}</option>
            <option value="approved">{t.status.approved}</option>
            <option value="in_development">{t.status.in_development}</option>
            <option value="completed">{t.status.completed}</option>
          </select>

          {/* Category Filter */}
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-3 py-1.5 text-xs font-medium border border-neutral-200 rounded-lg bg-white text-neutral-700 cursor-pointer focus:outline-hidden"
          >
            <option value="all">{lang === 'lo' ? 'ທຸກໝວດໝູ່' : 'All Categories'}</option>
            {WEBSITE_TYPES.map((type) => (
              <option key={type.id} value={type.id}>
                {lang === 'lo' ? type.titleLo : type.titleEn}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Briefs Table / Cards */}
      <div className="bg-white border border-neutral-200 rounded-xl overflow-hidden shadow-2xs">
        {filtered.length === 0 ? (
          <div className="py-16 text-center">
            <FileText className="w-10 h-10 text-neutral-300 mx-auto mb-3" />
            <p className="text-sm font-medium text-neutral-700 mb-1">{t.dashboard.noBriefs}</p>
            <p className="text-xs text-neutral-500 mb-4">{t.dashboard.createFirst}</p>
            <button
              onClick={onNewBrief}
              className="px-4 py-2 bg-neutral-900 text-white rounded-lg text-xs font-semibold hover:bg-neutral-800 transition-colors"
            >
              {t.dashboard.newBriefBtn}
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-neutral-50/70 border-b border-neutral-200 text-[11px] font-semibold text-neutral-500 uppercase tracking-wider">
                  <th className="py-3 px-4">{lang === 'lo' ? 'ໂຄງການ & ລູກຄ້າ' : 'Client & Company'}</th>
                  <th className="py-3 px-4">{lang === 'lo' ? 'ປະເພດເວັບໄຊ' : 'Website Type'}</th>
                  <th className="py-3 px-4">{lang === 'lo' ? 'ສະໄຕລ໌' : 'Aesthetic'}</th>
                  <th className="py-3 px-4 text-center">{lang === 'lo' ? 'ຂອບເຂດໜ້າ' : 'Pages'}</th>
                  <th className="py-3 px-4">{lang === 'lo' ? 'ງົບປະມານ/ກຳນົດເວລາ' : 'Budget & Time'}</th>
                  <th className="py-3 px-4">{lang === 'lo' ? 'ສະຖານະ' : 'Status'}</th>
                  <th className="py-3 px-4 text-right">{lang === 'lo' ? 'ຈັດການ' : 'Actions'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100 text-xs">
                {filtered.map((brief) => {
                  const badge = getStatusBadge(brief.status, lang);
                  const typeObj = WEBSITE_TYPES.find((w) => w.id === brief.websiteType);
                  const styleObj = DESIGN_STYLES.find((s) => s.id === brief.designStyle);

                  return (
                    <tr
                      key={brief.id}
                      className="hover:bg-neutral-50/80 transition-colors group cursor-pointer"
                      onClick={() => onSelectBrief(brief)}
                    >
                      {/* Client / Business */}
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-neutral-900 text-sm group-hover:text-blue-600 transition-colors">
                          {brief.companyName}
                        </div>
                        <div className="text-[11px] text-neutral-500 mt-0.5">
                          {brief.clientName} · {brief.phone || brief.email || brief.whatsappOrLine}
                        </div>
                      </td>

                      {/* Type */}
                      <td className="py-3.5 px-4 text-neutral-700">
                        <div className="font-medium truncate max-w-[160px]">
                          {lang === 'lo' ? typeObj?.titleLo : typeObj?.titleEn}
                        </div>
                        <div className="text-[11px] text-neutral-400 truncate max-w-[160px]">
                          {brief.businessCategory}
                        </div>
                      </td>

                      {/* Style */}
                      <td className="py-3.5 px-4">
                        <span className="font-medium text-neutral-800">
                          {lang === 'lo' ? styleObj?.titleLo : styleObj?.titleEn}
                        </span>
                      </td>

                      {/* Pages Scope */}
                      <td className="py-3.5 px-4 text-center font-mono tabular-nums font-semibold text-neutral-900">
                        {brief.selectedPages?.length || 0}
                      </td>

                      {/* Budget & Timeline */}
                      <td className="py-3.5 px-4">
                        <div className="font-semibold text-neutral-900 text-[11px]">
                          {brief.estimatedBudgetEstimateLo || brief.budgetRange}
                        </div>
                        <div className="text-[11px] text-neutral-500">
                          {brief.estimatedTimelineWeeks || brief.timeline}
                        </div>
                      </td>

                      {/* Status Dropdown */}
                      <td className="py-3.5 px-4" onClick={(e) => e.stopPropagation()}>
                        <select
                          value={brief.status}
                          onChange={(e) => onUpdateStatus(brief.id, e.target.value as BriefStatus)}
                          className={`text-xs font-semibold px-2.5 py-1 rounded-md border cursor-pointer focus:outline-hidden ${badge.color}`}
                        >
                          <option value="new">{t.status.new}</option>
                          <option value="reviewing">{t.status.reviewing}</option>
                          <option value="proposal_sent">{t.status.proposal_sent}</option>
                          <option value="approved">{t.status.approved}</option>
                          <option value="in_development">{t.status.in_development}</option>
                          <option value="completed">{t.status.completed}</option>
                        </select>
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => onSelectBrief(brief)}
                            className="p-1.5 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 rounded-md transition-colors"
                            title="View SRS Specification"
                          >
                            <ArrowUpRight className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => {
                              if (window.confirm(lang === 'lo' ? 'ທ່ານແນ່ໃຈບໍ່ວ່າຕ້ອງການລຶບ Brief ນີ້?' : 'Are you sure you want to delete this brief?')) {
                                onDeleteBrief(brief.id);
                              }
                            }}
                            className="p-1.5 text-neutral-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
