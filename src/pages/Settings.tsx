import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  User,
  Bell,
  Shield,
  Monitor,
  Globe,
  Database,
  Github,
  Cloud,
  Mail,
  Lock,
  Eye,
  Trash2,
  ChevronRight,
  Sparkles,
  Smartphone,
  Wallet,
  HeartPulse,
  Gamepad2,
  Film,
  Zap,
  Target,
  Palette,
  Check,
  CreditCard
} from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { ButtonX } from '@/src/components/custom-antd/ButtonX';

type SettingTab = 'general' | 'dimensions' | 'appearance' | 'data';

export function Settings() {
  const [activeTab, setActiveTab] = useState<SettingTab>('general');
  const [accentColor, setAccentColor] = useState('#6366f1');

  const accents = [
    { name: 'Indigo', color: '#6366f1' },
    { name: 'Rose', color: '#f43f5e' },
    { name: 'Emerald', color: '#10b981' },
    { name: 'Amber', color: '#f59e0b' },
    { name: 'Purple', color: '#a855f7' },
  ];

  const tabs = [
    { id: 'general', label: 'General', icon: SettingsIcon },
    { id: 'dimensions', label: 'Dimensions', icon: ActivityIcon },
    { id: 'appearance', label: 'Appearance', icon: Palette },
    { id: 'data', label: 'Data & Sync', icon: Database },
  ];

  return (
    <div className="flex-1 h-full overflow-y-auto custom-scrollbar p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-6xl mx-auto"
      >
        <header className="mb-12">
          <div className="flex items-center gap-3 mb-2">
            <div className="px-2 py-0.5 rounded bg-indigo-500/10 border border-indigo-500/20 text-[10px] font-black text-indigo-400 uppercase tracking-widest">System Core</div>
          </div>
          <h1 className="text-4xl font-black tracking-tighter mb-2 text-white/90">Control Center</h1>
          <p className="text-white/40 font-medium italic">Orchestrate your PulseOS environment and tracking metrics</p>
        </header>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 mb-10 p-1.5 glass rounded-2xl w-fit">
          {tabs.map((tab) => (
            <ButtonX
              key={tab.id}
              onClick={() => setActiveTab(tab.id as SettingTab)}
              className={cn(
                "flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-300",
                activeTab === tab.id 
                  ? "bg-white/10 text-white shadow-lg shadow-black/20" 
                  : "text-white/40 hover:text-white/60"
              )}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </ButtonX>
          ))}
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Main Settings Area */}
          <div className="xl:col-span-2">
            <AnimatePresence mode="wait">
              {activeTab === 'general' && (
                <motion.div
                  key="general"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="space-y-8"
                >
                  {/* Membership & Profile */}
                  <section className="glass p-8 rounded-[2.5rem] relative overflow-hidden group">
                    <div className="flex flex-col md:flex-row md:items-center gap-8 relative z-10">
                      <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-3xl font-black shadow-xl shadow-indigo-500/20">
                        AR
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-1">
                          <h3 className="text-2xl font-bold tracking-tight">Awais Raza</h3>
                          <span className="px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-400 text-[10px] font-black uppercase tracking-widest border border-indigo-500/20">Pro</span>
                        </div>
                        <p className="text-white/40 text-sm mb-4 font-medium italic">Productivity Architect since May 2024</p>
                        <div className="flex flex-wrap gap-3">
                          <ButtonX variant="glass" size="sm" className="gap-2">
                            <CreditCard className="w-4 h-4" />
                            Manage Subscription
                          </ButtonX>
                        </div>
                      </div>
                    </div>
                  </section>

                  {/* Notification & Security */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <SettingsCard 
                      icon={Bell} 
                      title="Alert System" 
                      desc="Manage session notifications & goal milestones"
                      color="text-amber-400"
                      bg="bg-amber-400/10"
                    />
                    <SettingsCard 
                      icon={Shield} 
                      title="Privacy Vault" 
                      desc="Biometric lock and end-to-end data encryption"
                      color="text-emerald-400"
                      bg="bg-emerald-400/10"
                    />
                  </div>

                  <div className="glass p-8 rounded-[2.5rem] border-red-500/10">
                    <h4 className="text-sm font-black uppercase tracking-[0.3em] text-white/20 mb-6 px-2">Account Integrity</h4>
                    <div className="space-y-4">
                      <ButtonX className="w-full flex items-center justify-between p-4 rounded-2xl bg-white/5 hover:bg-white/[0.08] transition-colors group">
                        <div className="flex items-center gap-4 text-white/80 font-bold">
                          <Lock className="w-5 h-5 text-white/30" />
                          Rotate Security Keys
                        </div>
                        <ChevronRight className="w-4 h-4 text-white/10" />
                      </ButtonX>
                      <ButtonX className="w-full flex items-center justify-between p-4 rounded-2xl bg-red-500/5 hover:bg-red-500/10 transition-colors group">
                        <div className="flex items-center gap-4 text-red-400/80 font-bold">
                          <Trash2 className="w-5 h-5" />
                          Deactivate PulseOS Identity
                        </div>
                        <span className="text-[9px] font-black text-red-500/40 uppercase tracking-widest px-2 py-1 rounded-md border border-red-500/20">Danger Zone</span>
                      </ButtonX>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'dimensions' && (
                <motion.div
                  key="dimensions"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-6"
                >
                  <DimensionToggle icon={Zap} title="Productivity" desc="Work session tracking & deep work detection" active />
                  <DimensionToggle icon={Wallet} title="Finance" desc="Multi-currency support & transaction history" active />
                  <DimensionToggle icon={HeartPulse} title="Health" desc="Heart rate sync & activity benchmarks" active />
                  <DimensionToggle icon={Gamepad2} title="Gaming" desc="Steam API sync & session recording" active />
                  <DimensionToggle icon={Film} title="Media" desc="Anime/Movie progress & watchlist management" active />
                  <DimensionToggle icon={Target} title="Goals" desc="Milestone tracking & visual progress" active />
                </motion.div>
              )}

              {activeTab === 'appearance' && (
                <motion.div
                  key="appearance"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="space-y-8"
                >
                  <section className="glass p-8 rounded-[2.5rem]">
                    <h4 className="text-sm font-black uppercase tracking-[0.3em] text-white/20 mb-8">Interface Theme</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-4">
                        <label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-1">Accent Core Color</label>
                        <div className="flex gap-4">
                          {accents.map((accent) => (
                            <ButtonX
                              key={accent.name}
                              onClick={() => setAccentColor(accent.color)}
                              className="w-10 h-10 rounded-2xl flex items-center justify-center transition-transform hover:scale-110 active:scale-95 shadow-lg"
                              style={{ backgroundColor: accent.color }}
                            >
                              {accentColor === accent.color && <Check className="w-5 h-5 text-white" />}
                            </ButtonX>
                          ))}
                        </div>
                      </div>
                      <div className="space-y-4">
                        <label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-1">Glass Intensity</label>
                        <input type="range" className="w-full accent-indigo-500 h-1.5 bg-white/5 rounded-full appearance-none cursor-pointer" />
                        <div className="flex justify-between text-[9px] font-black text-white/20 uppercase tracking-widest">
                          <span>Low (Performance)</span>
                          <span>High (Ultra)</span>
                        </div>
                      </div>
                    </div>
                  </section>

                  <section className="glass p-8 rounded-[2.5rem]">
                    <h4 className="text-sm font-black uppercase tracking-[0.3em] text-white/20 mb-8">Visual Components</h4>
                    <div className="space-y-4">
                      <VisualOption title="Bento Animations" desc="Enable smooth transitions between layouts" active />
                      <VisualOption title="Dynamic Mesh Background" desc="Interactive aurora background effects" active />
                      <VisualOption title="Micro-interactions" desc="Tactile feedback for buttons and sliders" active />
                    </div>
                  </section>
                </motion.div>
              )}

              {activeTab === 'data' && (
                <motion.div
                  key="data"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="space-y-8"
                >
                  <section className="glass p-8 rounded-[2.5rem]">
                    <h4 className="text-sm font-black uppercase tracking-[0.3em] text-white/20 mb-8">Cloud Infrastructure</h4>
                    <div className="flex items-center justify-between p-6 rounded-3xl bg-white/5 border border-white/5">
                      <div className="flex items-center gap-5">
                        <div className="p-4 rounded-2xl bg-indigo-500/10 text-indigo-400">
                          <Cloud className="w-6 h-6" />
                        </div>
                        <div>
                          <h5 className="font-bold text-lg">Real-time Backup</h5>
                          <p className="text-xs text-white/30 italic">Last synced: 2 minutes ago</p>
                        </div>
                      </div>
                      <div className="w-12 h-6 bg-indigo-500 rounded-full relative p-1 cursor-pointer">
                        <div className="absolute right-1 top-1 bottom-1 w-4 h-4 bg-white rounded-full shadow-sm" />
                      </div>
                    </div>
                  </section>

                  <section className="glass p-8 rounded-[2.5rem]">
                    <h4 className="text-sm font-black uppercase tracking-[0.3em] text-white/20 mb-8">Data Liquidity</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <ButtonX variant="glass" className="h-16 rounded-2xl gap-3 font-bold">
                        <Database className="w-5 h-5 text-indigo-400" />
                        Export JSON Archive
                      </ButtonX>
                      <ButtonX variant="glass" className="h-16 rounded-2xl gap-3 font-bold">
                        <Smartphone className="w-5 h-5 text-purple-400" />
                        Sync Local Device
                      </ButtonX>
                    </div>
                  </section>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right Column: Active Integrations */}
          <div className="space-y-8">
            <section className="glass p-8 rounded-[2.5rem]">
              <h4 className="text-sm font-black uppercase tracking-[0.3em] text-white/20 mb-8">Pulse Matrix</h4>
              <div className="space-y-6">
                {[
                  { name: 'VS Code Pulse', icon: Github, status: 'Active', val: '92%' },
                  { name: 'Chrome Sync', icon: Globe, status: 'Active', val: 'Online' },
                  { name: 'System Agent', icon: Smartphone, status: 'Warning', val: 'v0.9.1' },
                ].map((sync) => (
                  <div key={sync.name} className="flex items-center gap-4 group cursor-pointer">
                    <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors">
                      <sync.icon className="w-6 h-6 text-white/60 group-hover:text-white transition-colors" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-bold truncate">{sync.name}</div>
                      <div className="text-[10px] text-white/30 font-medium uppercase tracking-widest">{sync.val}</div>
                    </div>
                    <div className={cn(
                      "w-2 h-2 rounded-full",
                      sync.status === 'Active' ? "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]" : "bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.8)]"
                    )} />
                  </div>
                ))}
              </div>
              <ButtonX variant="ghost" className="w-full mt-8 border-white/5 rounded-2xl font-black uppercase tracking-widest text-[10px]">
                Add Dimension Hook
              </ButtonX>
            </section>

            <section className="glass p-8 rounded-[2.5rem] bg-indigo-500/5 relative overflow-hidden group">
              <Sparkles className="absolute -top-4 -right-4 w-24 h-24 text-indigo-500/10 group-hover:scale-125 transition-transform duration-700" />
              <h4 className="font-black text-lg mb-2 relative z-10">PulseOS Enterprise</h4>
              <p className="text-xs text-white/40 leading-relaxed mb-6 relative z-10">Unlock predictive AI modeling and unlimited dimension hooks for deep-level life orchestration.</p>
              <ButtonX variant="primary" className="w-full rounded-2xl shadow-lg shadow-indigo-500/20 relative z-10">Scale Your Potential</ButtonX>
            </section>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function SettingsCard({ icon: Icon, title, desc, color, bg }: any) {
  return (
    <div className="glass p-6 rounded-[2.5rem] hover:bg-white/[0.05] transition-all cursor-pointer group flex items-start gap-5">
      <div className={cn("p-4 rounded-2xl shrink-0 group-hover:scale-110 transition-transform shadow-lg", bg, color)}>
        <Icon className="w-6 h-6" />
      </div>
      <div>
        <h4 className="font-bold text-lg tracking-tight mb-1">{title}</h4>
        <p className="text-xs text-white/30 leading-relaxed font-medium italic">{desc}</p>
      </div>
    </div>
  );
}

function DimensionToggle({ icon: Icon, title, desc, active }: any) {
  return (
    <div className="glass p-6 rounded-[2.5rem] flex flex-col gap-4 group hover:bg-white/5 transition-all">
      <div className="flex justify-between items-start">
        <div className="p-3.5 rounded-2xl bg-white/5 text-white/60 group-hover:bg-indigo-500/20 group-hover:text-indigo-400 transition-all">
          <Icon className="w-6 h-6" />
        </div>
        <div className={cn(
          "w-12 h-6 rounded-full relative p-1 cursor-pointer transition-colors",
          active ? "bg-indigo-500" : "bg-white/10"
        )}>
          <div className={cn(
            "w-4 h-4 bg-white rounded-full transition-all duration-300",
            active ? "translate-x-6" : "translate-x-0"
          )} />
        </div>
      </div>
      <div>
        <h4 className="font-bold text-lg">{title}</h4>
        <p className="text-xs text-white/30 italic font-medium">{desc}</p>
      </div>
    </div>
  );
}

function VisualOption({ title, desc, active }: any) {
  return (
    <div className="flex items-center justify-between p-4 rounded-2xl bg-white/5 hover:bg-white/[0.08] transition-colors cursor-pointer group">
      <div>
        <div className="text-sm font-bold text-white/80">{title}</div>
        <div className="text-[10px] text-white/30 italic">{desc}</div>
      </div>
      <div className={cn(
        "w-10 h-5 rounded-full relative p-1 transition-colors",
        active ? "bg-indigo-500" : "bg-white/10"
      )}>
        <div className={cn(
          "w-3 h-3 bg-white rounded-full transition-all",
          active ? "translate-x-5" : "translate-x-0"
        )} />
      </div>
    </div>
  );
}

function SettingsIcon(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path><circle cx="12" cy="12" r="3"></circle></svg>
  );
}

function ActivityIcon(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"></path></svg>
  );
}
