import React, { useState, useEffect } from 'react';
import { fetchHealth } from '@/src/lib/api';
import { Responsive, WidthProvider } from 'react-grid-layout/legacy';
import '/node_modules/react-grid-layout/css/styles.css';
import '/node_modules/react-resizable/css/styles.css';
import {
  Wallet,
  HeartPulse,
  Gamepad2,
  Film,
  TrendingUp,
  Zap,
  Activity,
  Target,
  Calendar,
  ArrowUpRight,
  Flame,
  Clock,
  ChevronRight,
  Star
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  PieChart,
  Pie
} from 'recharts';
import { ButtonX } from '../components/custom-antd/ButtonX';
import { CardX } from '../components/custom-antd/CardX';

const ResponsiveGridLayout = WidthProvider(Responsive);

const financeData = [
  { day: 'Mon', amount: 2400 },
  { day: 'Tue', amount: 1398 },
  { day: 'Wed', amount: 9800 },
  { day: 'Thu', amount: 3908 },
  { day: 'Fri', amount: 4800 },
  { day: 'Sat', amount: 3800 },
  { day: 'Sun', amount: 4300 },
];

const radarData = [
  { subject: 'Finance', A: 120, fullMark: 150 },
  { subject: 'Health', A: 98, fullMark: 150 },
  { subject: 'Gaming', A: 86, fullMark: 150 },
  { subject: 'Media', A: 99, fullMark: 150 },
  { subject: 'Productivity', A: 85, fullMark: 150 },
  { subject: 'Social', A: 65, fullMark: 150 },
];

const mediaPieData = [
  { name: 'Movies', value: 400, color: '#6366f1' },
  { name: 'Anime', value: 300, color: '#a855f7' },
  { name: 'TV Shows', value: 300, color: '#f43f5e' },
  { name: 'Manga', value: 200, color: '#fbbf24' },
];

const initialLayouts = {
  lg: [
    { i: 'finance', x: 0, y: 0, w: 3, h: 2 },
    { i: 'health', x: 3, y: 0, w: 3, h: 1 },
    { i: 'gaming', x: 3, y: 1, w: 1, h: 1 },
    { i: 'media', x: 4, y: 1, w: 1, h: 1 },
    { i: 'overview', x: 0, y: 2, w: 2, h: 2 },
    { i: 'productivity', x: 2, y: 2, w: 2, h: 2 },
    { i: 'goals', x: 4, y: 2, w: 2, h: 2 },
    { i: 'streak', x: 4, y: 4, w: 2, h: 1 },
  ],
  md: [
    { i: 'finance', x: 0, y: 0, w: 2, h: 2 },
    { i: 'health', x: 2, y: 0, w: 2, h: 1 },
    { i: 'gaming', x: 2, y: 1, w: 1, h: 1 },
    { i: 'media', x: 3, y: 1, w: 1, h: 1 },
    { i: 'overview', x: 0, y: 2, w: 2, h: 2 },
    { i: 'productivity', x: 2, y: 2, w: 2, h: 2 },
    { i: 'goals', x: 0, y: 4, w: 4, h: 1 },
    { i: 'streak', x: 0, y: 5, w: 4, h: 1 },
  ],
};

export function Dashboard() {
  const [layouts, setLayouts] = useState(initialLayouts);
  const [apiStatus, setApiStatus] = useState<'online' | 'offline' | 'checking'>('checking');

  useEffect(() => {
    const checkStatus = async () => {
      try {
        await fetchHealth();
        setApiStatus('online');
      } catch (error) {
        setApiStatus('offline');
      }
    };
    checkStatus();
  }, []);

  const onLayoutChange = (currentLayout: any, allLayouts: any) => {
    // Only update if actually different to prevent potential infinite loops
    if (JSON.stringify(allLayouts) !== JSON.stringify(layouts)) {
      setLayouts(allLayouts);
    }
  };

  return (
    <div className="flex-1 h-full overflow-y-auto custom-scrollbar">
      <header className="p-8 pb-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2 mb-2">
              <div className="px-2 py-0.5 rounded bg-indigo-500/10 border border-indigo-500/20 text-[10px] font-black text-indigo-400 uppercase tracking-widest">PulseOS v2.0</div>
            </div>
            <h1 className="text-4xl font-black tracking-tight text-white/90">Life Dimensions</h1>
            <p className="text-white/40 font-medium max-w-md">Orchestrating your personal velocity through visual analytics</p>
          </div>
          <div className="flex items-center gap-4">
            <div className={`glass px-4 py-2 rounded-2xl flex items-center gap-3 cursor-default border transition-colors ${apiStatus === 'online' ? 'border-emerald-500/30' : 'border-rose-500/30'}`}>
              <div className={`w-2 h-2 rounded-full ${apiStatus === 'online' ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]' : apiStatus === 'offline' ? 'bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.8)]' : 'bg-white/20 animate-pulse'}`} />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/60">
                Core Engine: {apiStatus}
              </span>
            </div>
            <div className="glass px-5 py-2.5 rounded-2xl flex items-center gap-3 cursor-default border border-white/5">
              <Calendar className="w-4 h-4 text-indigo-400" />
              <span className="text-sm font-bold tracking-tight">Monday, May 11</span>
            </div>
          </div>
        </div>
      </header>

      <div className="px-4 pb-8 overflow-x-hidden">
        <ResponsiveGridLayout
          className="layout"
          layouts={layouts}
          breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
          cols={{ lg: 6, md: 4, sm: 2, xs: 1, xxs: 1 }}
          rowHeight={120}
          draggableHandle=".cursor-grab"
          onLayoutChange={onLayoutChange}
          margin={[12, 12]}
          useCSSTransforms={true}
        >
          {/* Finance Dimension */}
          <div key="finance">
            <CardX delay={0.1} className="rainbow-border overflow-hidden">
              <div className="relative h-full flex flex-col">
                <div className="flex justify-between items-start mb-6">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-emerald-400">
                      <Wallet className="w-4 h-4" />
                      <span className="font-black uppercase tracking-[0.2em] text-[10px]">Financial Assets</span>
                    </div>
                    <div className="text-3xl font-black">$12,450.00</div>
                  </div>
                  <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 border border-emerald-500/20">
                    <ArrowUpRight className="w-5 h-5" />
                  </div>
                </div>

                <div className="flex-1 min-h-0 -mx-6 -mb-6 mt-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={financeData}>
                      <defs>
                        <linearGradient id="colorFinance" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <Area type="monotone" dataKey="amount" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorFinance)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </CardX>
          </div>

          {/* Health Dimension */}
          <div key="health">
            <CardX delay={0.2} className="relative overflow-hidden">
              <div className="flex justify-between items-center h-full">
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-rose-500">
                    <HeartPulse className="w-4 h-4 animate-pulse" />
                    <span className="font-black uppercase tracking-[0.2em] text-[10px]">Health Index</span>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-black">92</span>
                    <span className="text-xs font-bold text-emerald-400">OPTIMAL</span>
                  </div>
                </div>
                <div className="h-full w-24 opacity-20">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={financeData.slice(0, 4)}>
                      <Bar dataKey="amount" fill="#f43f5e" radius={[2, 2, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </CardX>
          </div>

          {/* Gaming Dimension */}
          <div key="gaming">
            <CardX delay={0.3} className="bg-gradient-to-br from-indigo-600/20 to-purple-600/20 border-indigo-500/20">
              <div className="flex items-center gap-4 h-full">
                <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center relative">
                  <Gamepad2 className="w-8 h-8 text-indigo-400" />
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full border-2 border-[#050505] shadow-[0_0_8px_#10b981]" />
                </div>
                <div className="min-w-0">
                  <div className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-1">Active Now</div>
                  <div className="text-lg font-black truncate">Elden Ring</div>
                  <div className="flex items-center gap-2 mt-1">
                    <Clock className="w-3 h-3 text-white/30" />
                    <span className="text-[10px] font-bold text-white/40">2h 15m session</span>
                  </div>
                </div>
              </div>
            </CardX>
          </div>

          {/* Life Dimensions Radar */}
          <div key="overview">
            <CardX delay={0.4} className="flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 text-yellow-500">
                  <Zap className="w-5 h-5 fill-yellow-500/20" />
                  <span className="font-black uppercase tracking-[0.2em] text-[11px]">Dimension Velocity</span>
                </div>
                <ButtonX className="text-white/20 hover:text-white transition-colors">
                  <ChevronRight className="w-5 h-5" />
                </ButtonX>
              </div>
              <div className="flex-1 min-h-0">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                    <PolarGrid stroke="rgba(255,255,255,0.05)" />
                    <PolarAngleAxis dataKey="subject" tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 10, fontWeight: 'bold' }} />
                    <Radar
                      name="Dimension"
                      dataKey="A"
                      stroke="#818cf8"
                      fill="#818cf8"
                      fillOpacity={0.3}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </CardX>
          </div>

          {/* Productivity Dimension */}
          <div key="productivity">
            <CardX delay={0.5} className="bg-indigo-500/5 border-indigo-500/10">
              <div className="flex flex-col h-full">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-2 text-indigo-400">
                    <Zap className="w-4 h-4 fill-current" />
                    <span className="font-black uppercase tracking-[0.2em] text-[10px]">Productivity</span>
                  </div>
                  <div className="text-xs font-black text-indigo-400">84%</div>
                </div>
                <div className="flex-1 flex flex-col justify-center">
                  <div className="text-3xl font-black mb-1">Deep Flow</div>
                  <div className="text-[10px] font-bold text-white/30 uppercase">4h 20m Focused today</div>
                </div>
                <div className="h-12 -mx-2 opacity-30 mt-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={[40, 70, 45, 90, 65, 80, 50].map(v => ({ v }))}>
                      <Bar dataKey="v" fill="#6366f1" radius={[2, 2, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </CardX>
          </div>

          <div key="media">
            <CardX delay={0.5}>
              <div className="flex flex-col h-full">
                <div className="flex items-center gap-2 text-purple-400 mb-6">
                  <Film className="w-4 h-4" />
                  <span className="font-black uppercase tracking-[0.2em] text-[10px]">Media Consumption</span>
                </div>
                <div className="flex-1 flex items-center justify-center relative">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={mediaPieData}
                        innerRadius={50}
                        outerRadius={70}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {mediaPieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          background: 'rgba(5,5,5,0.9)',
                          border: '1px solid rgba(255,255,255,0.1)',
                          borderRadius: '12px',
                          fontSize: '10px'
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                    <span className="text-2xl font-black">1.2k</span>
                    <span className="text-[8px] font-bold text-white/30 uppercase tracking-widest">Units</span>
                  </div>
                </div>
              </div>
            </CardX>
          </div>

          {/* Goal Progress */}
          <div key="goals">
            <CardX delay={0.6}>
              <div className="h-full flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-yellow-400">
                      <Target className="w-4 h-4" />
                      <span className="font-black uppercase tracking-[0.2em] text-[10px]">Q2 Goals</span>
                    </div>
                    <div className="text-2xl font-black">12 Active</div>
                  </div>
                  <div className="px-3 py-1 rounded-full bg-yellow-400/10 text-yellow-400 text-[10px] font-black border border-yellow-400/20">
                    65% TOTAL
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-[9px] font-black text-white/40 uppercase tracking-widest">
                      <span>Milestone Progress</span>
                      <span>14 / 20</span>
                    </div>
                    <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                      <div className="h-full bg-gradient-to-r from-yellow-400 via-orange-500 to-rose-500 w-[70%]" />
                    </div>
                  </div>
                </div>
              </div>
            </CardX>
          </div>

          {/* Consistency Streak */}
          <div key="streak">
            <CardX delay={0.7} className="bg-rose-500/5 border-rose-500/10">
              <div className="flex items-center gap-6 h-full px-4">
                <div className="relative">
                  <div className="absolute inset-0 bg-rose-500 blur-2xl opacity-20 animate-pulse" />
                  <Flame className="w-12 h-12 text-rose-500 relative z-10" />
                </div>
                <div className="space-y-1">
                  <div className="text-[10px] font-black text-rose-500 uppercase tracking-[0.3em]">Consistency</div>
                  <div className="text-4xl font-black tracking-tighter">12 DAYS</div>
                  <div className="flex items-center gap-1 text-emerald-400">
                    <Star className="w-3 h-3 fill-current" />
                    <span className="text-[9px] font-bold uppercase tracking-widest">NEW RECORD</span>
                  </div>
                </div>
              </div>
            </CardX>
          </div>
        </ResponsiveGridLayout>
      </div>
    </div>
  );
}
