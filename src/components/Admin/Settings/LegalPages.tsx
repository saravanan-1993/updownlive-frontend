"use client";
import React, { useState, useEffect } from 'react';
import axiosInstance from '@/lib/axios';
import { FileText, Shield, Save, Loader2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/UI/Card";
import { useToast } from "@/hooks/use-toast";
import TiptapEditor from '@/components/Admin/Newsletter/TiptapEditor';

type Tab = 'terms' | 'privacy';

export default function LegalPages() {
  const [activeTab, setActiveTab] = useState<Tab>('terms');
  const [termsContent, setTermsContent] = useState('');
  const [privacyContent, setPrivacyContent] = useState('');
  const [loadingTerms, setLoadingTerms] = useState(true);
  const [loadingPrivacy, setLoadingPrivacy] = useState(true);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    axiosInstance.get('/settings/legal/terms')
      .then(res => setTermsContent(res.data?.content || ''))
      .catch(() => {})
      .finally(() => setLoadingTerms(false));

    axiosInstance.get('/settings/legal/privacy')
      .then(res => setPrivacyContent(res.data?.content || ''))
      .catch(() => {})
      .finally(() => setLoadingPrivacy(false));
  }, []);

  const handleSave = async (type: Tab) => {
    setSaving(true);
    try {
      const content = type === 'terms' ? termsContent : privacyContent;
      await axiosInstance.post(`/settings/legal/${type}`, { content });
      toast({ title: 'Saved', description: `${type === 'terms' ? 'Terms & Conditions' : 'Privacy Notice'} updated successfully.` });
    } catch {
      toast({ variant: 'destructive', description: 'Failed to save. Please try again.' });
    } finally {
      setSaving(false);
    }
  };

  const tabs = [
    { id: 'terms' as Tab, label: 'Terms & Conditions', icon: FileText },
    { id: 'privacy' as Tab, label: 'Privacy Notice', icon: Shield },
  ];

  const isLoading = activeTab === 'terms' ? loadingTerms : loadingPrivacy;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-brand-black dark:text-white">Legal Pages</h1>
        <p className="text-sm text-brand-gray dark:text-gray-400 mt-1">Manage your Terms & Conditions and Privacy Notice content</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2">
        {tabs.map(tab => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                activeTab === tab.id
                  ? 'bg-brand-blue text-white shadow-lg shadow-brand-blue/20'
                  : 'bg-white dark:bg-zinc-900 text-brand-gray dark:text-gray-400 border border-brand-border dark:border-white/10 hover:bg-gray-50 dark:hover:bg-white/5'
              }`}
            >
              <Icon size={16} />
              {tab.label}
            </button>
          );
        })}
      </div>

      <Card className="shadow-lg rounded-2xl overflow-hidden bg-white dark:bg-zinc-900">
        <CardHeader className="bg-slate-50/50 dark:bg-white/5 border-b border-slate-100 dark:border-white/5 px-8 py-5 flex flex-row items-center justify-between">
          <CardTitle className="text-lg font-bold text-brand-black dark:text-white flex items-center gap-2">
            {activeTab === 'terms' ? <FileText size={18} className="text-brand-blue" /> : <Shield size={18} className="text-purple-500" />}
            {activeTab === 'terms' ? 'Terms & Conditions' : 'Privacy Notice'}
          </CardTitle>
          <button
            onClick={() => handleSave(activeTab)}
            disabled={saving || isLoading}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand-blue text-white font-semibold rounded-xl hover:bg-blue-600 transition-all shadow-md disabled:opacity-50 disabled:cursor-not-allowed text-sm"
          >
            {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </CardHeader>
        <CardContent className="p-6">
          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-brand-blue" />
            </div>
          ) : (
            <div>
              <p className="text-xs text-brand-gray dark:text-gray-500 mb-3">
                Use the rich text editor below to format your content. Changes are saved when you click "Save Changes".
              </p>
              {activeTab === 'terms' ? (
                <TiptapEditor
                  value={termsContent}
                  onChange={setTermsContent}
                  placeholder="Enter your Terms & Conditions content..."
                />
              ) : (
                <TiptapEditor
                  value={privacyContent}
                  onChange={setPrivacyContent}
                  placeholder="Enter your Privacy Notice content..."
                />
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
