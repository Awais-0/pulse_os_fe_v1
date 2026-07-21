import React from 'react';
import { motion } from 'motion/react';
import {
  TrendingUp,
  BarChart3,
  PieChart as PieChartIcon,
  Calendar,
  ArrowUp,
  ArrowDown,
  Info,
  Clock,
  Zap,
  Target
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { cn } from '@/src/lib/utils';
import { ButtonX } from '@/src/components/custom-antd/ButtonX';

const productivityData = [
  { name: 'Mon', value: 65 },
  { name: 'Tue', value: 78 },
  { name: 'Wed', value: 82 },
  { name: 'Thu', value: 75 },
  { name: 'Fri', value: 94 },
  { name: 'Sat', value: 45 },
  { name: 'Sun', value: 30 },
];

const categoryData = [
  { name: 'Coding', value: 45, color: '#6366f1' },
  { name: 'Meetings', value: 25, color: '#a855f7' },
  { name: 'Design', value: 20, color: '#ec4899' },
  { name: 'Social', value: 10, color: '#94a3b8' },
];

const hourlyActivity = [
  { time: '9 AM', hours: 0.8 },
  { time: '10 AM', hours: 1.0 },
  { time: '11 AM', hours: 0.9 },
  { time: '12 PM', hours: 0.4 },
  { time: '1 PM', hours: 0.5 },
  { time: '2 PM', hours: 0.9 },
  { time: '3 PM', hours: 1.0 },
  { time: '4 PM', hours: 0.8 },
  { time: '5 PM', hours: 0.6 },
];

export function Analytics() {
  return (
    <div className="flex-1 h-full overflow-y-auto custom-scrollbar p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-black tracking-tighter mb-2">Advanced Analytics</h1>
            <p className="text-white/40 font-medium italic">Uncovering patterns in your digital consciousness</p>
          </div>

          <div className="flex items-center gap-3">
            <ButtonX variant="glass" icon={Calendar}>
              Last 7 Days
            </ButtonX>
            <ButtonX variant="primary" icon={TrendingUp}>
              Export Report
            </ButtonX>
          </div>
        </header>

        {/* Insight Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          {[
            { label: 'Avg. Focus', value: '7.4h', trend: '+12%', up: true, icon: Clock, color: 'text-indigo-400' },
            { label: 'Productivity', value: '88%', trend: '+5%', up: true, icon: Target, color: 'text-emerald-400' },
            { label: 'Deep Work', value: '18h', trend: '-2%', up: false, icon: Zap, color: 'text-purple-400' },
            { label: 'Flow State', value: '12.5h', trend: '+8%', up: true, icon: TrendingUp, color: 'text-pink-400' },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass p-6 rounded-3xl group hover:bg-white/[0.05] transition-all"
            >
              <div className="flex justify-between items-start mb-4">
                <div className={cn("p-2.5 rounded-xl bg-white/5", stat.color)}>
                  <stat.icon className="w-5 h-5" />
                </div>
                <div className={cn(
                  "flex items-center gap-1 text-[10px] font-black px-2 py-1 rounded-lg",
                  stat.up ? "text-emerald-400 bg-emerald-400/10" : "text-red-400 bg-red-400/10"
                )}>
                  {stat.up ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
                  {stat.trend}
                </div>
              </div>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 mb-1">{stat.label}</p>
              <h3 className="text-3xl font-black tracking-tight">{stat.value}</h3>
            </motion.div>
          ))}
        </div>

        {/* Main Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Productivity Trend */}
          <div className="lg:col-span-2 glass p-8 rounded-[2.5rem] min-h-[400px] flex flex-col">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-xl font-bold tracking-tight">Productivity Velocity</h3>
                <p className="text-sm text-white/30">Your performance efficiency over the week</p>
              </div>
              <BarChart3 className="w-6 h-6 text-indigo-400/50" />
            </div>
            <div className="flex-1 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={productivityData}>
                  <defs>
                    <linearGradient id="colorProd" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                  <XAxis
                    dataKey="name"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 12, fontWeight: 600 }}
                    dy={10}
                  />
                  <YAxis hide />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'rgba(5, 5, 5, 0.8)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '16px',
                      backdropFilter: 'blur(10px)',
                    }}
                    itemStyle={{ color: '#fff', fontWeight: 700 }}
                  />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="#6366f1"
                    strokeWidth={4}
                    fillOpacity={1}
                    fill="url(#colorProd)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Time Distribution */}
          <div className="glass p-8 rounded-[2.5rem] flex flex-col">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-xl font-bold tracking-tight">Distribution</h3>
                <p className="text-sm text-white/30">Time by category</p>
              </div>
              <PieChartIcon className="w-6 h-6 text-purple-400/50" />
            </div>
            <div className="flex-1 w-full relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={8}
                    dataKey="value"
                    stroke="none"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'rgba(5, 5, 5, 0.8)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '16px',
                      backdropFilter: 'blur(10px)',
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="text-center">
                  <div className="text-2xl font-black">24h</div>
                  <div className="text-[10px] font-bold text-white/20 uppercase tracking-widest">Total</div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-6">
              {categoryData.map((cat) => (
                <div key={cat.name} className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: cat.color }} />
                  <span className="text-xs font-bold text-white/50">{cat.name}</span>
                  <span className="text-xs font-black ml-auto">{cat.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Hourly Flow Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="glass p-8 rounded-[2.5rem]">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-xl font-bold tracking-tight">Hourly Flow State</h3>
                <p className="text-sm text-white/30">Peak productivity hours analysis</p>
              </div>
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 bg-emerald-400/10 px-3 py-1.5 rounded-full">
                <Zap className="w-3 h-3" />
                Peak at 3 PM
              </div>
            </div>
            <div className="h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={hourlyActivity}>
                  <XAxis
                    dataKey="time"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: 'rgba(255,255,255,0.2)', fontSize: 10, fontWeight: 700 }}
                  />
                  <Tooltip
                    cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                    contentStyle={{
                      backgroundColor: 'rgba(5, 5, 5, 0.8)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '16px',
                      backdropFilter: 'blur(10px)',
                    }}
                  />
                  <Bar dataKey="hours" radius={[6, 6, 0, 0]}>
                    {hourlyActivity.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={entry.hours > 0.8 ? '#6366f1' : 'rgba(99, 102, 241, 0.2)'}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* AI Insights Card */}
          <div className="glass p-8 rounded-[2.5rem] bg-gradient-to-br from-indigo-500/10 to-purple-600/10 border-indigo-500/20 relative overflow-hidden">
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-indigo-500 flex items-center justify-center shadow-lg shadow-indigo-500/40">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-black tracking-tight">Flow AI Insights</h3>
              </div>
              <div className="space-y-6">
                <div className="flex gap-4 p-4 rounded-2xl bg-white/5 border border-white/5">
                  <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0">
                    <TrendingUp className="w-4 h-4 text-emerald-400" />
                  </div>
                  <p className="text-sm font-medium text-white/70 leading-relaxed">
                    Your focus is <span className="text-white font-bold">22% higher</span> during the 2 PM - 4 PM window. Consider scheduling deep coding sessions during this period.
                  </p>
                </div>
                <div className="flex gap-4 p-4 rounded-2xl bg-white/5 border border-white/5">
                  <div className="w-8 h-8 rounded-full bg-amber-500/20 flex items-center justify-center shrink-0">
                    <Info className="w-4 h-4 text-amber-400" />
                  </div>
                  <p className="text-sm font-medium text-white/70 leading-relaxed">
                    Productivity dropped on <span className="text-white font-bold">Saturday</span> due to frequent context switching between VS Code and Chrome.
                  </p>
                </div>
              </div>
              <ButtonX variant="glass" className="w-full mt-8 border-indigo-500/30">
                View Detailed Analysis
              </ButtonX>
            </div>
            {/* Background Decorative Element */}
            <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-indigo-500/20 blur-[100px] rounded-full pointer-events-none" />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
