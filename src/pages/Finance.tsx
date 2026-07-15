import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Wallet,
  TrendingUp,
  TrendingDown,
  CreditCard,
  PieChart,
  Plus,
  Search,
  MoreVertical,
  History,
  ArrowUpRight,
  ArrowDownLeft,
  DollarSign,
  Briefcase,
  Landmark,
  ShoppingCart,
  ChevronRight,
  Activity,
  Zap,
  BarChart3
} from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { Button } from '@/src/components/Button';
import { Modal } from '@/src/components/Modal';
import { Dropdown } from '@/src/components/Dropdown';

type FiscalEventType = 'income' | 'expense' | 'investment' | 'debt_payment';

interface Transaction {
  id: string;
  title: string;
  amount: number;
  type: 'income' | 'expense' | 'purchase';
  category: string;
  timestamp: string;
  icon: any;
}

interface Asset {
  id: string;
  label: string;
  value: number;
  change: string;
  trend: 'up' | 'down';
  color: string;
}

const dummyTransactions: Transaction[] = [
  { id: 't1', title: 'Salary Execution', amount: 5200, type: 'income', category: 'Monthly Income', timestamp: '2 days ago', icon: Briefcase },
  { id: 't2', title: 'NVIDIA Stock Purchase', amount: 850, type: 'expense', category: 'Investment', timestamp: 'Yesterday', icon: TrendingUp },
  { id: 't3', title: 'AWS Cloud Services', amount: 45.20, type: 'expense', category: 'SaaS', timestamp: 'Today', icon: Zap },
  { id: 't4', title: 'Premium Hardware', amount: 1200, type: 'purchase', category: 'Tech', timestamp: '3 days ago', icon: ShoppingCart },
  { id: 't5', title: 'Freelance Protocol', amount: 750, type: 'income', category: 'Side Income', timestamp: '1 week ago', icon: Activity },
];

const dummyAssets: Asset[] = [
  { id: 'a1', label: 'Tech Portfolio', value: 8420.50, change: '+12.4%', trend: 'up', color: 'text-indigo-400 bg-indigo-500/10' },
  { id: 'a2', label: 'Crypto Nodes', value: 3120.20, change: '-4.2%', trend: 'down', color: 'text-amber-400 bg-amber-500/10' },
  { id: 'a3', label: 'Cash Liquidity', value: 12450.00, change: '+2.1%', trend: 'up', color: 'text-emerald-400 bg-emerald-500/10' },
];

export function Finance() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState<'all' | 'income' | 'expense'>('all');
  const [eventType, setEventType] = useState('income');

  return (
    <div className="flex-1 h-full overflow-y-auto custom-scrollbar p-6">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-[1600px] mx-auto"
      >
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-1.5 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-[9px] font-black text-emerald-400 uppercase tracking-widest">Dimension Fiscal Ledger</span>
            </div>
            <h1 className="text-3xl font-black tracking-tight text-white/90">Portfolio Architecture</h1>
            <p className="text-white/40 text-sm font-medium">Tracking capital flow, asset appreciation, and debt resolution</p>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative group hidden sm:block">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 group-focus-within:text-emerald-400 transition-colors" />
              <input
                type="text"
                placeholder="Search ledger..."
                className="bg-white/5 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-sm font-bold w-40 focus:w-60 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all placeholder:text-white/10"
              />
            </div>
            <Button icon={Plus} size="sm" variant="primary" onClick={() => setIsModalOpen(true)} className="bg-emerald-600 hover:bg-emerald-500">
              New Event
            </Button>
          </div>
        </header>

        {/* Global Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <StatCard label="Total Net Worth" value="$23,990.70" change="+8.4%" trend="up" icon={Wallet} color="text-indigo-400" />
          <StatCard label="Monthly Income" value="$5,950.00" change="+15.2%" trend="up" icon={ArrowUpRight} color="text-emerald-400" />
          <StatCard label="Monthly Expense" value="$2,095.70" change="-5.4%" trend="down" icon={ArrowDownLeft} color="text-rose-400" />
          <StatCard label="Active Debt" value="$1,200.00" change="Stable" trend="stable" icon={CreditCard} color="text-amber-400" />
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Main Ledger */}
          <div className="xl:col-span-2 space-y-6">
            <div className="flex items-center justify-between px-2">
              <div className="flex items-center gap-6">
                <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30 flex items-center gap-2">
                  <History className="w-3.5 h-3.5" />
                  Transaction Ledger
                </h2>
                <div className="flex gap-2 p-1 glass rounded-lg">
                  {['all', 'income', 'expense'].map((f) => (
                    <button
                      key={f}
                      onClick={() => setActiveFilter(f as any)}
                      className={cn(
                        "px-3 py-1 rounded-md text-[9px] font-black uppercase tracking-widest transition-all",
                        activeFilter === f ? "bg-white/10 text-white" : "text-white/20 hover:text-white/40"
                      )}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              </div>
              <button className="text-[10px] font-black uppercase tracking-widest text-white/20 hover:text-white/40">Full Report</button>
            </div>

            <div className="space-y-3">
              {dummyTransactions
                .filter(t => activeFilter === 'all' || (activeFilter === 'expense' ? (t.type === 'expense' || t.type === 'purchase') : t.type === activeFilter))
                .map((t) => (
                  <motion.div
                    key={t.id}
                    whileHover={{ x: 4 }}
                    className="glass p-5 rounded-2xl border border-white/5 flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-5">
                      <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center border border-white/5 group-hover:border-white/20">
                        <t.icon className="w-6 h-6 text-white/20 group-hover:text-white transition-colors" />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-white/90">{t.title}</div>
                        <div className="text-[9px] font-black uppercase tracking-wider text-white/20">{t.category} • {t.timestamp}</div>
                      </div>
                    </div>
                    <div className={cn(
                      "text-sm font-black tracking-tight",
                      t.type === 'income' ? 'text-emerald-400' : 'text-rose-400'
                    )}>
                      {t.type === 'income' ? '+' : '-'}${t.amount.toLocaleString()}
                    </div>
                  </motion.div>
                ))}
            </div>
          </div>

          {/* Right Sidebar: Assets & Debts */}
          <div className="space-y-8">
            {/* Assets */}
            <section className="space-y-6">
              <div className="px-2">
                <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30 flex items-center gap-2">
                  <PieChart className="w-3.5 h-3.5 text-indigo-400" />
                  Asset Portfolios
                </h2>
              </div>
              <div className="space-y-4">
                {dummyAssets.map((asset) => (
                  <div key={asset.id} className="glass p-5 rounded-3xl border border-white/5 group hover:border-white/10 transition-all">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <div className="text-[10px] font-black uppercase tracking-widest text-white/20 mb-1">{asset.label}</div>
                        <div className="text-xl font-black text-white/90">${asset.value.toLocaleString()}</div>
                      </div>
                      <div className={cn(
                        "text-[9px] font-black px-1.5 py-0.5 rounded border-0",
                        asset.trend === 'up' ? 'text-emerald-400 bg-emerald-500/10' : 'text-rose-400 bg-rose-500/10'
                      )}>
                        {asset.change}
                      </div>
                    </div>
                    <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.random() * 60 + 40}%` }}
                        className={cn("h-full", asset.color.split(' ')[1])}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Debts / Obligations */}
            <section className="space-y-6">
              <div className="px-2">
                <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30 flex items-center gap-2">
                  <Landmark className="w-3.5 h-3.5 text-rose-400" />
                  Fiscal Obligations
                </h2>
              </div>
              <div className="glass p-6 rounded-3xl border border-white/5 space-y-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-end">
                    <div className="text-[10px] font-black uppercase tracking-widest text-white/40">Student Protocol Loan</div>
                    <div className="text-[10px] font-black text-white/60">$12,400 / $25,000</div>
                  </div>
                  <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                    <motion.div initial={{ width: 0 }} animate={{ width: '48%' }} className="h-full bg-rose-500" />
                  </div>
                </div>
                <div className="pt-4 border-t border-white/5 flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                  <span className="text-white/20">Next Payment</span>
                  <span className="text-indigo-400">June 12, 2026</span>
                </div>
              </div>
            </section>
          </div>
        </div>

        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Fiscal Event Sync"
        >
          <div className="space-y-4">
            <div className="space-y-1.5">
              <Dropdown
                label="Event Type"
                value={eventType}
                onChange={setEventType}
                options={[
                  { label: 'Income Stream', value: 'income', icon: ArrowUpRight },
                  { label: 'Expense Log', value: 'expense', icon: ArrowDownLeft },
                  { label: 'Capital Purchase', value: 'purchase', icon: ShoppingCart },
                  { label: 'Asset Acquisition', value: 'investment', icon: TrendingUp },
                ]}
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase tracking-wider text-white/30 ml-1">Amount ($)</label>
                <input
                  type="text"
                  placeholder="Ex: 500.00"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm font-bold focus:ring-1 focus:ring-emerald-500/50 outline-none transition-all placeholder:text-white/10 text-white"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase tracking-wider text-white/30 ml-1">Category</label>
                <input
                  type="text"
                  placeholder="Ex: SaaS, Food, Invest"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm font-bold focus:ring-1 focus:ring-emerald-500/50 outline-none transition-all placeholder:text-white/10 text-white"
                />
              </div>
            </div>

            <div className="pt-4 flex gap-2">
              <Button variant="ghost" className="flex-1 h-11 rounded-xl font-bold" onClick={() => setIsModalOpen(false)}>Abort</Button>
              <Button variant="primary" className="flex-1 h-11 rounded-xl font-black uppercase tracking-widest text-[10px] bg-emerald-600 hover:bg-emerald-500">Execute Transaction</Button>
            </div>
          </div>
        </Modal>
      </motion.div>
    </div>
  );
}

function StatCard({ label, value, change, trend, icon: Icon, color }: any) {
  return (
    <div className="glass p-6 rounded-3xl border border-white/5 hover:border-white/10 transition-all group overflow-hidden relative">
      <div className="flex justify-between items-start mb-4">
        <div className={cn("p-3 rounded-2xl bg-white/5", color)}>
          <Icon className="w-6 h-6" />
        </div>
        <div className={cn(
          "text-[9px] font-black uppercase px-2 py-0.5 rounded border-0",
          trend === 'up' ? 'text-emerald-400 bg-emerald-500/10' : trend === 'down' ? 'text-rose-400 bg-rose-500/10' : 'text-white/20 bg-white/5'
        )}>
          {change}
        </div>
      </div>
      <div className="text-2xl font-black tracking-tight text-white/90 mb-1">{value}</div>
      <div className="text-[10px] font-black uppercase tracking-widest text-white/20">{label}</div>
    </div>
  );
}
