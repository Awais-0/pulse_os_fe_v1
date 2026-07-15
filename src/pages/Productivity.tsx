import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Zap,
  Clock,
  Target,
  Calendar,
  BarChart3,
  Monitor,
  Code2,
  Briefcase,
  TrendingUp,
  Search,
  Plus,
  Play,
  Pause,
  RotateCcw,
  CheckCircle2,
  LayoutGrid,
  Activity,
  ChevronRight,
  Flame,
  Layout
} from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { Button } from '@/src/components/Button';
import { Modal } from '@/src/components/Modal';
import { Dropdown } from '@/src/components/Dropdown';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

const productivityData = [
  { day: 'Mon', focus: 85, output: 65 },
  { day: 'Tue', focus: 72, output: 82 },
  { day: 'Wed', focus: 98, output: 91 },
  { day: 'Thu', focus: 65, output: 54 },
  { day: 'Fri', focus: 88, output: 78 },
  { day: 'Sat', focus: 45, output: 32 },
  { day: 'Sun', focus: 32, output: 21 },
];

interface Task {
  id: string;
  title: string;
  project: string;
  priority: 'High' | 'Medium' | 'Low';
  status: 'pending' | 'completed';
  timeEstimate: string;
}

const dummyTasks: Task[] = [
  { id: 't1', title: 'System Architecture Refactor', project: 'PulseOS', priority: 'High', status: 'pending', timeEstimate: '4h' },
  { id: 't2', title: 'Fiscal Ledger API Integration', project: 'PulseOS', priority: 'High', status: 'pending', timeEstimate: '2h' },
  { id: 't3', title: 'Design System Documentation', project: 'Design', priority: 'Medium', status: 'completed', timeEstimate: '1.5h' },
  { id: 't4', title: 'Stakeholder Sync Session', project: 'Management', priority: 'Low', status: 'pending', timeEstimate: '1h' },
];

export function Productivity() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'engine'>('overview');
  const [timer, setTimer] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [taskProject, setTaskProject] = useState('PulseOS');
  const [taskPriority, setTaskPriority] = useState('High');

  useEffect(() => {
    let interval: any = null;
    if (isActive && timer > 0) {
      interval = setInterval(() => {
        setTimer((timer) => timer - 1);
      }, 1000);
    } else if (timer === 0) {
      setIsActive(false);
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, timer]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

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
              <span className="px-1.5 py-0.5 rounded bg-indigo-500/10 border border-indigo-500/20 text-[9px] font-black text-indigo-400 uppercase tracking-widest">Dimension Optimization Protocol</span>
            </div>
            <h1 className="text-3xl font-black tracking-tight text-white/90">Cognitive Output</h1>
            <p className="text-white/40 text-sm font-medium">Measuring digital velocity, focus depth, and task execution</p>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex p-1 glass rounded-xl">
              <button
                onClick={() => setActiveTab('overview')}
                className={cn(
                  "px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all",
                  activeTab === 'overview' ? "bg-white/10 text-white" : "text-white/20 hover:text-white/40"
                )}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab('engine')}
                className={cn(
                  "px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all",
                  activeTab === 'engine' ? "bg-white/10 text-white" : "text-white/20 hover:text-white/40"
                )}
              >
                Focus Engine
              </button>
            </div>
            <Button icon={Plus} size="sm" variant="primary" onClick={() => setIsModalOpen(true)} className="bg-indigo-600 hover:bg-indigo-500">
              New Init
            </Button>
          </div>
        </header>

        {activeTab === 'overview' ? (
          <>
            {/* Efficiency Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              <StatCard label="Productivity Score" value="84%" change="+5.2%" trend="up" icon={Zap} color="text-indigo-400" />
              <StatCard label="Deep Work Hours" value="32h 15m" change="+2h" trend="up" icon={Clock} color="text-purple-400" />
              <StatCard label="Focus Quality" value="92/100" change="Stable" trend="stable" icon={Target} color="text-emerald-400" />
              <StatCard label="Task Velocity" value="12/day" change="+3" trend="up" icon={Activity} color="text-amber-400" />
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mb-12">
              {/* Velocity Chart */}
              <div className="xl:col-span-2 space-y-6">
                <div className="flex items-center justify-between px-2">
                  <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30 flex items-center gap-2">
                    <BarChart3 className="w-3.5 h-3.5" />
                    Output Velocity Chart
                  </h2>
                  <div className="flex gap-4">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-indigo-500" />
                      <span className="text-[8px] font-black uppercase text-white/20">Focus</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-emerald-500" />
                      <span className="text-[8px] font-black uppercase text-white/20">Output</span>
                    </div>
                  </div>
                </div>
                <div className="glass p-6 rounded-[2.5rem] border border-white/5 h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={productivityData}>
                      <defs>
                        <linearGradient id="colorFocus" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="colorOutput" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.02)" />
                      <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: 'rgba(255,255,255,0.2)', fontSize: 9, fontWeight: 900 }} />
                      <YAxis hide />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: 'rgba(5,5,5,0.9)',
                          border: '1px solid rgba(255,255,255,0.1)',
                          borderRadius: '16px',
                          fontSize: '10px',
                          fontFamily: 'inherit',
                          fontWeight: 'bold'
                        }}
                      />
                      <Area type="monotone" dataKey="focus" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorFocus)" />
                      <Area type="monotone" dataKey="output" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorOutput)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Task Stack */}
              <div className="space-y-6">
                <div className="px-2 flex items-center justify-between">
                  <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30 flex items-center gap-2">
                    <LayoutGrid className="w-3.5 h-3.5" />
                    Priority Stack
                  </h2>
                  <button className="text-[9px] font-black uppercase tracking-widest text-indigo-400">Expand Stack</button>
                </div>
                <div className="space-y-3">
                  {dummyTasks.map((task) => (
                    <div key={task.id} className="glass p-4 rounded-2xl border border-white/5 group hover:border-white/10 transition-all cursor-pointer">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center gap-3">
                          <div className={cn(
                            "w-2 h-2 rounded-full",
                            task.status === 'completed' ? 'bg-emerald-500' : 'bg-indigo-500'
                          )} />
                          <span className="text-xs font-bold text-white/90 group-hover:text-indigo-400 transition-colors line-clamp-1">{task.title}</span>
                        </div>
                        {task.status === 'completed' && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />}
                      </div>
                      <div className="flex justify-between items-center text-[9px] font-black uppercase tracking-widest">
                        <span className="text-white/20">{task.project}</span>
                        <span className={cn(
                          task.priority === 'High' ? 'text-rose-400' : task.priority === 'Medium' ? 'text-amber-400' : 'text-indigo-400'
                        )}>{task.priority}</span>
                      </div>
                    </div>
                  ))}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    className="w-full border border-dashed border-white/5 rounded-2xl p-4 flex items-center justify-center gap-2 group hover:bg-white/5 transition-all mt-4"
                    onClick={() => setIsModalOpen(true)}
                  >
                    <Plus className="w-4 h-4 text-white/20 group-hover:text-indigo-400" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-white/10 group-hover:text-white/40">Queue Task</span>
                  </motion.button>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center min-h-[500px]">
            {/* Timer Engine */}
            <div className="flex flex-col items-center justify-center space-y-12">
              <div className="relative w-72 h-72">
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    cx="144"
                    cy="144"
                    r="130"
                    fill="transparent"
                    stroke="currentColor"
                    strokeWidth="8"
                    className="text-white/5"
                  />
                  <motion.circle
                    cx="144"
                    cy="144"
                    r="130"
                    fill="transparent"
                    stroke="currentColor"
                    strokeWidth="8"
                    strokeDasharray={2 * Math.PI * 130}
                    animate={{ strokeDashoffset: (1 - timer / (25 * 60)) * (2 * Math.PI * 130) }}
                    className="text-indigo-500"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <div className="text-6xl font-black tracking-tighter text-white/90">{formatTime(timer)}</div>
                  <div className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20 mt-2">Deep Work Session</div>
                </div>
              </div>

              <div className="flex gap-4">
                <Button
                  onClick={() => setIsActive(!isActive)}
                  variant="primary"
                  className="h-14 w-14 rounded-full p-0 flex items-center justify-center bg-indigo-600 shadow-lg shadow-indigo-500/20"
                >
                  {isActive ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 fill-white" />}
                </Button>
                <Button
                  onClick={() => { setIsActive(false); setTimer(25 * 60); }}
                  variant="ghost"
                  className="h-14 w-14 rounded-full p-0 flex items-center justify-center glass border-white/10"
                >
                  <RotateCcw className="w-6 h-6 text-white/40" />
                </Button>
              </div>
            </div>

            {/* Active Session Info */}
            <div className="space-y-8">
              <div className="glass p-8 rounded-[2.5rem] border border-white/5 relative overflow-hidden">
                <div className="absolute -right-10 -top-10 w-40 h-40 bg-indigo-500/10 blur-3xl rounded-full" />
                <div className="relative z-10">
                  <div className="text-[10px] font-black uppercase tracking-widest text-indigo-400 mb-2">Currently Optimizing</div>
                  <h2 className="text-2xl font-black text-white/90 mb-4 line-clamp-2">System Architecture Refactor & Dimensional Alignment</h2>
                  <div className="flex gap-6">
                    <div>
                      <div className="text-[9px] font-black uppercase text-white/20 mb-1">Project</div>
                      <div className="text-xs font-bold text-white/60">PulseOS</div>
                    </div>
                    <div>
                      <div className="text-[9px] font-black uppercase text-white/20 mb-1">Expected Output</div>
                      <div className="text-xs font-bold text-white/60">+15% Velocity</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-[10px] font-black uppercase tracking-widest text-white/20 px-2">Sub-Protocol Steps</h3>
                {['Research patterns', 'Implement core hooks', 'Refactor state logic'].map((step, i) => (
                  <div key={i} className="glass p-4 rounded-2xl border border-white/5 flex items-center gap-4 group">
                    <div className="w-5 h-5 rounded-md border border-white/10 flex items-center justify-center group-hover:border-indigo-500/50 transition-colors">
                      <div className="w-2 h-2 rounded-sm bg-white/5 group-hover:bg-indigo-500/30" />
                    </div>
                    <span className="text-xs font-bold text-white/60">{step}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Modal Logic */}
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Task Initialization"
        >
          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-black uppercase tracking-wider text-white/30 ml-1">Objective Title</label>
              <input
                type="text"
                placeholder="Ex: Refactor State Machine..."
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm font-bold focus:ring-1 focus:ring-indigo-500/50 outline-none transition-all placeholder:text-white/10 text-white"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Dropdown
                label="Project"
                value={taskProject}
                onChange={setTaskProject}
                options={[
                  { label: 'PulseOS', value: 'PulseOS', icon: Zap },
                  { label: 'Design', value: 'Design', icon: Layout },
                  { label: 'Management', value: 'Management', icon: Briefcase },
                ]}
              />
              <Dropdown
                label="Priority"
                value={taskPriority}
                onChange={setTaskPriority}
                options={[
                  { label: 'High', value: 'High', icon: Flame },
                  { label: 'Medium', value: 'Medium', icon: Activity },
                  { label: 'Low', value: 'Low', icon: Target },
                ]}
              />
            </div>

            <div className="pt-4 flex gap-2">
              <Button variant="ghost" className="flex-1 h-11 rounded-xl font-bold" onClick={() => setIsModalOpen(false)}>Cancel</Button>
              <Button variant="primary" className="flex-1 h-11 rounded-xl font-black uppercase tracking-widest text-[10px] bg-indigo-600 hover:bg-indigo-500">Initialize</Button>
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
      <div className="text-[10px] font-black uppercase tracking-widest text-white/20 truncate">{label}</div>
    </div>
  );
}
