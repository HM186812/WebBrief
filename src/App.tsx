/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ClientBrief } from './types/brief';
import { INITIAL_SAMPLE_BRIEFS } from './constants/presets';
import { Navbar } from './components/Navbar';
import { CompactIntakeForm } from './components/CompactIntakeForm';

const STORAGE_KEY = 'webbrief_lao_submissions_v3_singlepage';

export default function App() {
  const [briefs, setBriefs] = useState<ClientBrief[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.error('Error loading briefs from localStorage', e);
    }
    return INITIAL_SAMPLE_BRIEFS;
  });

  // Sync briefs to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(briefs));
    } catch (e) {
      console.error('Failed to save to localStorage', e);
    }
  }, [briefs]);

  // Add new brief
  const handleSaveBrief = (newBrief: ClientBrief) => {
    setBriefs((prev) => [newBrief, ...prev]);
  };

  return (
    <div className="min-h-screen bg-neutral-50/80 text-neutral-900 flex flex-col text-sm leading-normal selection:bg-neutral-900 selection:text-white">
      {/* Top Clean Navbar */}
      <Navbar />

      {/* Main Single Page Content: Focused Intake Form (No popups) */}
      <main className="flex-1 w-full">
        <CompactIntakeForm onSaveBrief={handleSaveBrief} />
      </main>

      {/* Compact Clean Footer */}
      <footer className="border-t border-neutral-200 bg-white py-4 no-print text-xs text-neutral-500">
        <div className="max-w-4xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
          <div className="flex items-center justify-center gap-2">
            <span className="font-bold text-neutral-800">WebBrief Lao</span>
            <span>·</span>
            <span>ແບບຟອມເກັບກຳຂໍ້ມູນຄວາມຕ້ອງການສ້າງເວັບໄຊ</span>
          </div>
          <div className="text-neutral-400 text-[11px]">
            ຮອງຮັບການສະແດງຜົນໃນທຸກອຸປະກອນ (Mobile / Tablet / Desktop)
          </div>
        </div>
      </footer>
    </div>
  );
}
