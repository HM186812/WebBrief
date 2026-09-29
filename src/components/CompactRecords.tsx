import React, { useState } from 'react';
import { ClientBrief, BriefStatus } from '../types/brief';
import { WEBSITE_TYPES, DESIGN_STYLES } from '../constants/presets';
import {
  Search,
  Plus,
  Trash2,
  Download,
  Calendar,
  Layers,
  ArrowUpRight,
  Phone,
  Mail,
  Building2,
  ExternalLink,
  CheckCircle2,
} from 'lucide-react';

interface CompactRecordsProps {
  briefs: ClientBrief[];
  onSelectBrief: (brief: ClientBrief) => void;
  onNewBrief: () => void;
  onDeleteBrief: (id: string) => void;
  onUpdateStatus: (id: string, status: BriefStatus) => void;
}

const STATUS_LABELS: Record<BriefStatus, { label: string; color: string }> = {
  new: { label: 'ໃໝ່', color: 'text-blue-700 bg-blue-50 border-blue-200' },
  reviewing: { label: 'ກຳລັງກວດສອບ', color: 'text-amber-700 bg-amber-50 border-amber-200' },
  proposal_sent: { label: 'ສົ່ງສະເໜີລາຄາ', color: 'text-purple-700 bg-purple-50 border-purple-200' },
  approved: { label: 'ອະນຸມັດແລ້ວ', color: 'text-teal-700 bg-teal-50 border-teal-200' },
  in_development: { label: 'ກຳລັງພັດທະນາ', color: 'text-indigo-700 bg-indigo-50 border-indigo-200' },
  completed: { label: 'ສຳເລັດແລ້ວ', color: 'text-emerald-700 bg-emerald-50 border-emerald-200' },
};

export const CompactRecords: React.FC<CompactRecordsProps> = ({
  briefs,
  onSelectBrief,
  onNewBrief,
  onDeleteBrief,
  onUpdateStatus,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filtered = briefs.filter((b) => {
    const matchesSearch =
      b.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (b.phone && b.phone.includes(searchTerm));
    const matchesStatus = statusFilter === 'all' || b.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleExportJson = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(briefs, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `customer_briefs_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 space-y-4">
      {/* Top Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-3.5 rounded-xl border border-neutral-200 shadow-2xs">
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="ຄົ້ນຫາຕາມຊື່, ບໍລິສັດ, ເບີໂທ..."
            className="w-full pl-9 pr-3 py-1.5 text-xs border border-neutral-200 rounded-lg focus:outline-hidden focus:border-neutral-900 bg-neutral-50/50"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-2.5 py-1.5 text-xs border border-neutral-200 rounded-lg bg-neutral-50/50 text-neutral-800 font-medium cursor-pointer"
          >
            <option value="all">ທຸກສະຖານະ ({briefs.length})</option>
            <option value="new">ໃໝ່</option>
            <option value="reviewing">ກຳລັງກວດສອບ</option>
            <option value="proposal_sent">ສົ່ງສະເໜີລາຄາ</option>
            <option value="approved">ອະນຸມັດແລ້ວ</option>
            <option value="in_development">ກຳລັງພັດທະນາ</option>
            <option value="completed">ສຳເລັດແລ້ວ</option>
          </select>

          <button
            onClick={handleExportJson}
            className="px-2.5 py-1.5 border border-neutral-200 hover:bg-neutral-50 rounded-lg text-xs font-medium text-neutral-700 transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs"
            title="Download JSON"
          >
            <Download className="w-3.5 h-3.5 text-neutral-500" />
            <span className="hidden sm:inline">Export</span>
          </button>

          <button
            onClick={onNewBrief}
            className="px-3.5 py-1.5 bg-neutral-900 hover:bg-neutral-800 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer flex items-center gap-1 shadow-2xs"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>+ ເກັບຂໍ້ມູນ</span>
          </button>
        </div>
      </div>

      {/* Compact Data Cards Grid */}
      {filtered.length === 0 ? (
        <div className="bg-white border border-neutral-200 rounded-xl p-10 text-center">
          <Building2 className="w-10 h-10 text-neutral-300 mx-auto mb-2" />
          <p className="text-sm font-semibold text-neutral-700">ຍັງບໍ່ມີຂໍ້ມູນລູກຄ້າທີ່ກົງກັບການຄົ້ນຫາ</p>
          <p className="text-xs text-neutral-500 mt-1 mb-4">ກົດປຸ່ມດ້ານລຸ່ມເພື່ອເລີ່ມເກັບຂໍ້ມູນລູກຄ້າໃໝ່</p>
          <button
            onClick={onNewBrief}
            className="px-4 py-2 bg-neutral-900 text-white rounded-lg text-xs font-semibold hover:bg-neutral-800 transition-colors"
          >
            + ເກັບກຳຂໍ້ມູນລູກຄ້າ
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {filtered.map((brief) => {
            const statusConfig = STATUS_LABELS[brief.status] || STATUS_LABELS.new;
            const typeObj = WEBSITE_TYPES.find((w) => w.id === brief.websiteType);
            const styleObj = DESIGN_STYLES.find((s) => s.id === brief.designStyle);

            return (
              <div
                key={brief.id}
                onClick={() => onSelectBrief(brief)}
                className="bg-white border border-neutral-200 rounded-xl p-4 shadow-2xs hover:border-neutral-300 transition-all cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  {/* Top card info */}
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div>
                      <h3 className="font-bold text-sm text-neutral-900 group-hover:text-blue-600 transition-colors">
                        {brief.companyName}
                      </h3>
                      <p className="text-xs text-neutral-600 mt-0.5">
                        {brief.clientName} · <span className="text-neutral-500">{brief.businessCategory}</span>
                      </p>
                    </div>

                    <select
                      value={brief.status}
                      onClick={(e) => e.stopPropagation()}
                      onChange={(e) => onUpdateStatus(brief.id, e.target.value as BriefStatus)}
                      className={`text-[11px] font-bold px-2 py-0.5 rounded-md border cursor-pointer focus:outline-hidden ${statusConfig.color}`}
                    >
                      <option value="new">ໃໝ່</option>
                      <option value="reviewing">ກວດສອບ</option>
                      <option value="proposal_sent">ສະເໜີລາຄາ</option>
                      <option value="approved">ອະນຸມັດ</option>
                      <option value="in_development">ພັດທະນາ</option>
                      <option value="completed">ສຳເລັດ</option>
                    </select>
                  </div>

                  {/* Goal summary */}
                  <p className="text-xs text-neutral-600 line-clamp-2 bg-neutral-50 p-2 rounded-lg mb-3">
                    {brief.primaryGoal}
                  </p>

                  {/* Details badges */}
                  <div className="flex flex-wrap items-center gap-1.5 text-[11px] text-neutral-600 mb-3">
                    <span className="px-2 py-0.5 bg-neutral-100 rounded-md font-medium text-neutral-700">
                      {typeObj?.titleLo.split('(')[0] || brief.websiteType}
                    </span>
                    <span className="px-2 py-0.5 bg-neutral-100 rounded-md font-medium text-neutral-700">
                      {styleObj?.titleLo.split('(')[0] || brief.designStyle}
                    </span>
                    <span className="px-2 py-0.5 bg-blue-50 text-blue-700 rounded-md font-semibold">
                      {brief.selectedPages?.length || 0} ໜ້າ
                    </span>
                    {brief.estimatedBudgetEstimateLo && (
                      <span className="px-2 py-0.5 bg-emerald-50 text-emerald-800 rounded-md font-semibold">
                        {brief.estimatedBudgetEstimateLo.split(' ')[0]} LAK
                      </span>
                    )}
                  </div>
                </div>

                {/* Footer contact & action */}
                <div
                  className="pt-2.5 border-t border-neutral-100 flex items-center justify-between text-xs text-neutral-500"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex items-center gap-3">
                    {brief.phone && (
                      <span className="flex items-center gap-1 font-mono text-[11px]">
                        <Phone className="w-3 h-3 text-neutral-400" />
                        {brief.phone}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => onSelectBrief(brief)}
                      className="px-2 py-1 text-[11px] font-semibold text-neutral-700 hover:text-black hover:bg-neutral-100 rounded-md transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      <span>ເບິ່ງໃບສະຫຼຸບ</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </button>
                    <button
                      onClick={() => {
                        if (window.confirm('ທ່ານແນ່ໃຈບໍ່ວ່າຕ້ອງການລຶບຂໍ້ມູນລູກຄ້ານີ້?')) {
                          onDeleteBrief(brief.id);
                        }
                      }}
                      className="p-1 text-neutral-400 hover:text-red-600 rounded-md transition-colors cursor-pointer"
                      title="Delete"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
