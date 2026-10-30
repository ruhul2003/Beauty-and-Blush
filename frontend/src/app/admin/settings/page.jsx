"use client";

import React, { useState, useEffect } from 'react';
import { 
  Settings, 
  Store, 
  Truck, 
  ShieldCheck, 
  Phone, 
  Mail, 
  DollarSign, 
  Save, 
  Sparkles,
  CheckCircle2,
  Bell
} from 'lucide-react';
import { useToast } from '@/context/ToastContext';

export default function AdminSettingsPage() {
  const { showToast } = useToast();

  const [storeName, setStoreName] = useState('Beauty & Blush');
  const [tagline, setTagline] = useState('Luxury Cosmetics, Skincare & Fragrance Marketplace');
  const [phone, setPhone] = useState('+880 1711-224466');
  const [email, setEmail] = useState('care@beautyandblush.com');
  const [dhakaFee, setDhakaFee] = useState('60');
  const [outsideFee, setOutsideFee] = useState('120');
  const [freeShippingThreshold, setFreeShippingThreshold] = useState('2500');
  const [announcement, setAnnouncement] = useState('FREE SHIPPING on all orders over $50 | 30 Days Easy Returns');
  const [batchCheckUrl, setBatchCheckUrl] = useState('http://checkcosmetic.net');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('bnb_store_settings') || '{}');
      if (saved.storeName) setStoreName(saved.storeName);
      if (saved.tagline) setTagline(saved.tagline);
      if (saved.phone) setPhone(saved.phone);
      if (saved.email) setEmail(saved.email);
      if (saved.dhakaFee) setDhakaFee(saved.dhakaFee);
      if (saved.outsideFee) setOutsideFee(saved.outsideFee);
      if (saved.freeShippingThreshold) setFreeShippingThreshold(saved.freeShippingThreshold);
      if (saved.announcement) setAnnouncement(saved.announcement);
    } catch (e) {}
  }, []);

  const handleSave = (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const settings = {
        storeName,
        tagline,
        phone,
        email,
        dhakaFee,
        outsideFee,
        freeShippingThreshold,
        announcement,
        batchCheckUrl
      };
      localStorage.setItem('bnb_store_settings', JSON.stringify(settings));
      setTimeout(() => {
        setSaving(false);
        showToast('Store settings & courier rules saved successfully!', 'success');
      }, 400);
    } catch (err) {
      setSaving(false);
      showToast('Failed to save settings', 'error');
    }
  };

  return (
    <div className="space-y-6 max-w-4xl animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#191416] dark:text-white">
          Store Operations & System Settings
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Configure default delivery charges, support contact hotlines, announcement banner, and authenticity policy.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6 text-xs">
        {/* Section 1: Store Brand Info */}
        <div className="p-6 rounded-3xl bg-white/60 dark:bg-[#140b17]/65 backdrop-blur-2xl border border-black/[0.05] dark:border-white/[0.08] shadow-sm space-y-4">
          <div className="flex items-center gap-2 border-b border-black/[0.05] dark:border-white/[0.06] pb-3 text-[#b84357] dark:text-rose-300">
            <Store className="w-4 h-4" />
            <h3 className="text-sm font-bold text-[#191416] dark:text-white">
              Boutique Brand Identity
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="font-bold text-[#191416] dark:text-slate-300 block mb-1">
                Store Name
              </label>
              <input
                type="text"
                value={storeName}
                onChange={(e) => setStoreName(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-black/[0.08] dark:border-white/[0.1] bg-black/[0.02] dark:bg-white/[0.04] text-[#191416] dark:text-white focus:outline-none focus:border-[#b84357]/50"
                required
              />
            </div>

            <div>
              <label className="font-bold text-[#191416] dark:text-slate-300 block mb-1">
                Store Tagline
              </label>
              <input
                type="text"
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-black/[0.08] dark:border-white/[0.1] bg-black/[0.02] dark:bg-white/[0.04] text-[#191416] dark:text-white focus:outline-none focus:border-[#b84357]/50"
              />
            </div>

            <div>
              <label className="font-bold text-[#191416] dark:text-slate-300 block mb-1">
                Official WhatsApp Helpline
              </label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-black/[0.08] dark:border-white/[0.1] bg-black/[0.02] dark:bg-white/[0.04] text-[#191416] dark:text-white focus:outline-none focus:border-[#b84357]/50"
              />
            </div>

            <div>
              <label className="font-bold text-[#191416] dark:text-slate-300 block mb-1">
                Support Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-black/[0.08] dark:border-white/[0.1] bg-black/[0.02] dark:bg-white/[0.04] text-[#191416] dark:text-white focus:outline-none focus:border-[#b84357]/50"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Delivery & Courier Rates */}
        <div className="p-6 rounded-3xl bg-white/60 dark:bg-[#140b17]/65 backdrop-blur-2xl border border-black/[0.05] dark:border-white/[0.08] shadow-sm space-y-4">
          <div className="flex items-center gap-2 border-b border-black/[0.05] dark:border-white/[0.06] pb-3 text-[#b84357] dark:text-rose-300">
            <Truck className="w-4 h-4" />
            <h3 className="text-sm font-bold text-[#191416] dark:text-white">
              Nationwide Delivery & Courier Charges
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="font-bold text-[#191416] dark:text-slate-300 block mb-1">
                Inside Dhaka Rate (BDT ৳)
              </label>
              <input
                type="number"
                value={dhakaFee}
                onChange={(e) => setDhakaFee(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-black/[0.08] dark:border-white/[0.1] bg-black/[0.02] dark:bg-white/[0.04] text-[#191416] dark:text-white focus:outline-none focus:border-[#b84357]/50"
              />
            </div>

            <div>
              <label className="font-bold text-[#191416] dark:text-slate-300 block mb-1">
                Outside Dhaka Rate (BDT ৳)
              </label>
              <input
                type="number"
                value={outsideFee}
                onChange={(e) => setOutsideFee(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-black/[0.08] dark:border-white/[0.1] bg-black/[0.02] dark:bg-white/[0.04] text-[#191416] dark:text-white focus:outline-none focus:border-[#b84357]/50"
              />
            </div>

            <div>
              <label className="font-bold text-[#191416] dark:text-slate-300 block mb-1">
                Free Shipping Threshold (BDT ৳)
              </label>
              <input
                type="number"
                value={freeShippingThreshold}
                onChange={(e) => setFreeShippingThreshold(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-black/[0.08] dark:border-white/[0.1] bg-black/[0.02] dark:bg-white/[0.04] text-[#191416] dark:text-white focus:outline-none focus:border-[#b84357]/50"
              />
            </div>
          </div>
        </div>

        {/* Section 3: Announcement Banner */}
        <div className="p-6 rounded-3xl bg-white/60 dark:bg-[#140b17]/65 backdrop-blur-2xl border border-black/[0.05] dark:border-white/[0.08] shadow-sm space-y-4">
          <div className="flex items-center gap-2 border-b border-black/[0.05] dark:border-white/[0.06] pb-3 text-[#b84357] dark:text-rose-300">
            <Bell className="w-4 h-4" />
            <h3 className="text-sm font-bold text-[#191416] dark:text-white">
              Top Announcement Banner Message
            </h3>
          </div>

          <div>
            <label className="font-bold text-[#191416] dark:text-slate-300 block mb-1">
              Top Header Strip Headline
            </label>
            <input
              type="text"
              value={announcement}
              onChange={(e) => setAnnouncement(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-black/[0.08] dark:border-white/[0.1] bg-black/[0.02] dark:bg-white/[0.04] text-[#191416] dark:text-white focus:outline-none focus:border-[#b84357]/50"
            />
            <p className="text-[10px] text-slate-400 mt-1">
              Displayed prominently across the website header for promotional campaigns.
            </p>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end pt-2">
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-3 text-xs font-bold rounded-2xl bg-[#b84357] hover:bg-[#a13649] text-white flex items-center gap-2 shadow-lg shadow-[#b84357]/20 transition-all"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? 'Saving...' : 'Save Configuration'}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
