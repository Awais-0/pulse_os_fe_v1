import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Target,
  Plus,
  Flag,
  TrendingUp,
  Zap,
  Clock,
  CheckCircle2,
  Calendar,
  MoreVertical,
  ChevronRight,
  Trophy,
  Flame,
  Wallet,
  HeartPulse,
  Gamepad2,
  Film,
  Search,
  Filter,
  Activity
} from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { ButtonX } from '@/src/components/custom-antd/ButtonX';
import { ModalX } from '@/src/components/custom-antd/ModalX';
import { DropdownX } from '@/src/components/custom-antd/DropdownX';

type GoalCategory = 'productivity' | 'finance' | 'health' | 'media' | 'gaming';

interface Milestone {
  id: string;
  title: string;
  completed: boolean;
}

interface Goal {
  id: string;
  title: string;
  description: string;
  category: GoalCategory;
  targetValue: number;
  currentValue: number;
  unit: string;
  priority: 'low' | 'medium' | 'high';
  status: 'active' | 'completed' | 'on_hold';
  color: string;
  icon: any;
  milestones: Milestone[];
  deadline: string;
}

const dummyGoals: Goal[] = [
  {
    id: '1',
    title: 'Financial Independence baseline',
    description: 'Establish a $10k emergency fund and clear high-interest debt',
    category: 'finance',
    targetValue: 10000,
    currentValue: 4500,
    unit: 'USD',
    priority: 'high',
    status: 'active',
    color: 'emerald',
    icon: Wallet,
    deadline: 'Dec 2026',
    milestones: [
      { id: 'm1', title: 'Save first $1,000', completed: true },
      { id: 'm2', title: 'Pay off credit card', completed: true },
      { id: 'm3', title: 'Reach $5,000 halfway mark', completed: false },
      { id: 'm4', title: 'Final $10k milestone', completed: false },
    ]
  },
  {
    id: '2',
    title: 'Deep Work Mastery',
    description: 'Reach 4 hours of consistent deep work daily for 30 days',
    category: 'productivity',
    targetValue: 30,
    currentValue: 12,
    unit: 'days',
    priority: 'high',
    status: 'active',
    color: 'indigo',
    icon: Zap,
    deadline: 'June 2026',
    milestones: [
      { id: 'p1', title: 'Install Focus Block habit', completed: true },
      { id: 'p2', title: '7-day streak reached', completed: true },
      { id: 'p3', title: '14-day streak reached', completed: false },
      { id: 'p4', title: '30-day mastery', completed: false },
    ]
  },
  {
    id: '3',
    title: 'Marathon Readiness',
    description: 'Complete a full marathon under 4 hours',
    category: 'health',
    targetValue: 42.2,
    currentValue: 15,
    unit: 'km',
    priority: 'medium',
    status: 'active',
    color: 'rose',
    icon: HeartPulse,
    deadline: 'Sept 2026',
    milestones: [
      { id: 'h1', title: '5km non-stop', completed: true },
      { id: 'h2', title: '10km milestone', completed: true },
      { id: 'h3', title: 'Half-marathon (21km)', completed: false },
      { id: 'h4', title: 'Full 42.2km race', completed: false },
    ]
  },
  {
    id: '4',
    title: 'Anime Backlog Clearing',
    description: 'Complete top 20 must-watch series from watchlist',
    category: 'media',
    targetValue: 20,
    currentValue: 8,
    unit: 'series',
    priority: 'low',
    status: 'active',
    color: 'purple',
    icon: Film,
    deadline: 'Ongoing',
    milestones: [
      { id: 'e1', title: 'Finish One Piece (Egghead)', completed: true },
      { id: 'e2', title: 'Complete Monogatari Series', completed: false },
      { id: 'e3', title: 'Catch up on JJK', completed: true },
    ]
  },
  {
    id: '5',
    title: 'Elden Ring Platinum',
    description: 'Achieve 100% achievements in Elden Ring + DLC',
    category: 'gaming',
    targetValue: 42,
    currentValue: 35,
    unit: 'achievements',
    priority: 'medium',
    status: 'active',
    color: 'amber',
    icon: Gamepad2,
    deadline: 'July 2026',
    milestones: [
      { id: 'g1', title: 'Defeat Malenia', completed: true },
      { id: 'g2', title: 'Collect all legendary spells', completed: true },
      { id: 'g3', title: 'Complete DLC main path', completed: false },
    ]
  }
];

const categoryColors = {
  productivity: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20',
  finance: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
  health: 'text-rose-400 bg-rose-500/10 border-rose-500/20',
  media: 'text-purple-400 bg-purple-500/10 border-purple-500/20',
  gaming: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
};

const progressColors = {
  productivity: 'bg-indigo-500',
  finance: 'bg-emerald-500',
  health: 'bg-rose-500',
  media: 'bg-purple-500',
  gaming: 'bg-amber-500',
};

export function Goals() {
  const [activeCategory, setActiveCategory] = useState<GoalCategory | 'all'>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [expandedGoal, setExpandedGoal] = useState<string | null>(null);
  const [goalCategory, setGoalCategory] = useState('productivity');
  const [goalPriority, setGoalPriority] = useState('medium');

  const categories: { id: GoalCategory | 'all'; label: string; icon: any }[] = [
    { id: 'all', label: 'All Targets', icon: Target },
    { id: 'productivity', label: 'Productivity', icon: Zap },
    { id: 'finance', label: 'Finance', icon: Wallet },
    { id: 'health', label: 'Health', icon: HeartPulse },
    { id: 'gaming', label: 'Gaming', icon: Gamepad2 },
    { id: 'media', label: 'Media', icon: Film },
  ];

  const filteredGoals = activeCategory === 'all'
    ? dummyGoals
    : dummyGoals.filter(g => g.category === activeCategory);

  return (
    <div className="flex-1 h-full overflow-y-auto custom-scrollbar p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="px-2 py-0.5 rounded bg-indigo-500/10 border border-indigo-500/20 text-[10px] font-black text-indigo-400 uppercase tracking-widest">Dimension Architecture</div>
            </div>
            <h1 className="text-4xl font-black tracking-tighter mb-2">Goal Orchestration</h1>
            <p className="text-white/40 font-medium italic">Strategize, track, and conquer your life-track objectives</p>
          </div>

          <div className="flex items-center gap-3">
            <ButtonX icon={Plus} onClick={() => setIsModalOpen(true)}>
              New Objective
            </ButtonX>
          </div>
        </header>

        {/* Category Navigation */}
        <div className="flex flex-wrap gap-2 mb-10 p-1.5 glass rounded-2xl w-fit">
          {categories.map((cat) => (
            <ButtonX
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={cn(
                "flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all duration-300",
                activeCategory === cat.id
                  ? "bg-white/10 text-white shadow-lg shadow-black/20"
                  : "text-white/30 hover:text-white/60"
              )}
            >
              <cat.icon className="w-4 h-4" />
              {cat.label}
            </ButtonX>
          ))}
        </div>

        {/* Goals Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredGoals.map((goal, i) => (
              <motion.div
                key={goal.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="glass p-8 rounded-[2.5rem] group border border-white/5 hover:border-white/10 transition-all relative overflow-hidden"
              >
                {/* Background glow based on category */}
                <div className={cn(
                  "absolute -right-20 -bottom-20 w-64 h-64 blur-[100px] opacity-10 rounded-full transition-opacity group-hover:opacity-20",
                  progressColors[goal.category]
                )} />

                <div className="flex justify-between items-start mb-8 relative z-10">
                  <div className="flex gap-5 items-start">
                    <div className={cn("p-4 rounded-2xl shadow-xl", categoryColors[goal.category])}>
                      <goal.icon className="w-8 h-8" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-black tracking-tight mb-1 group-hover:text-white transition-colors">{goal.title}</h3>
                      <div className="flex items-center gap-3">
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30">{goal.category}</span>
                        <div className="w-1 h-1 rounded-full bg-white/10" />
                        <span className={cn(
                          "text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded border",
                          goal.priority === 'high' ? 'text-rose-400 border-rose-500/20 bg-rose-500/5' :
                            goal.priority === 'medium' ? 'text-amber-400 border-amber-500/20 bg-amber-500/5' :
                              'text-indigo-400 border-indigo-500/20 bg-indigo-500/5'
                        )}>
                          {goal.priority} priority
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <div className="text-[10px] font-black text-white/20 uppercase tracking-widest">Deadline</div>
                    <div className="text-xs font-bold text-white/60">{goal.deadline}</div>
                  </div>
                </div>

                <div className="space-y-6 relative z-10">
                  {/* Progress Section */}
                  <div className="space-y-3">
                    <div className="flex justify-between items-end">
                      <div className="text-3xl font-black tracking-tighter">
                        {goal.currentValue.toLocaleString()} <span className="text-sm font-bold text-white/20 uppercase tracking-widest italic">{goal.unit}</span>
                        <span className="text-sm text-white/10 mx-2 font-medium">/</span>
                        <span className="text-sm font-bold text-white/30 tracking-normal">{goal.targetValue.toLocaleString()}</span>
                      </div>
                      <div className="text-2xl font-black italic opacity-60">
                        {Math.round((goal.currentValue / goal.targetValue) * 100)}%
                      </div>
                    </div>
                    <div className="h-3 w-full bg-white/5 rounded-full overflow-hidden border border-white/5 p-0.5">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${(goal.currentValue / goal.targetValue) * 100}%` }}
                        transition={{ duration: 1.5, ease: "circOut" }}
                        className={cn("h-full rounded-full relative shadow-[0_0_15px_rgba(0,0,0,0.5)]", progressColors[goal.category])}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-[shimmer_2s_infinite]" />
                      </motion.div>
                    </div>
                  </div>

                  {/* Milestones Preview */}
                  <div className="p-6 rounded-[1.5rem] bg-black/20 border border-white/5">
                    <div
                      className="flex items-center justify-between cursor-pointer group/ms mb-4"
                      onClick={() => setExpandedGoal(expandedGoal === goal.id ? null : goal.id)}
                    >
                      <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30 flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400" />
                        Structural Milestones
                      </h4>
                      <div className="flex items-center gap-2 text-[10px] font-bold text-white/40 group-hover/ms:text-white transition-colors">
                        {goal.milestones.filter(m => m.completed).length}/{goal.milestones.length}
                        <ChevronRight className={cn("w-3 h-3 transition-transform", expandedGoal === goal.id && "rotate-90")} />
                      </div>
                    </div>

                    <div className={cn(
                      "space-y-3 transition-all duration-300 overflow-hidden",
                      expandedGoal === goal.id ? "max-h-[500px] opacity-100 mt-4" : "max-h-0 opacity-0"
                    )}>
                      {goal.milestones.map((ms) => (
                        <div key={ms.id} className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
                          <div className={cn(
                            "w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors",
                            ms.completed ? "bg-emerald-500 border-emerald-500" : "border-white/10"
                          )}>
                            {ms.completed && <CheckCircle2 className="w-3 h-3 text-white" />}
                          </div>
                          <span className={cn(
                            "text-xs font-medium transition-colors",
                            ms.completed ? "text-white/40 line-through" : "text-white/80"
                          )}>
                            {ms.title}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 flex gap-3">
                    <ButtonX variant="primary" className="flex-1 rounded-2xl gap-2 font-black uppercase tracking-widest text-[10px]">
                      Update Progress
                    </ButtonX>
                    <ButtonX variant="glass" className="aspect-square p-0 w-12 rounded-2xl">
                      <MoreVertical className="w-5 h-5 text-white/40" />
                    </ButtonX>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* New Goal Card */}
          <motion.div
            layout
            onClick={() => setIsModalOpen(true)}
            className="border-2 border-dashed border-white/5 rounded-[2.5rem] flex flex-col items-center justify-center p-12 hover:bg-white/5 hover:border-white/10 transition-all cursor-pointer group min-h-[300px]"
          >
            <div className="w-16 h-16 rounded-3xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-indigo-500/10 transition-all duration-500">
              <Plus className="w-8 h-8 text-white/20 group-hover:text-indigo-400 transition-colors" />
            </div>
            <div className="text-center">
              <p className="text-lg font-black text-white/30 group-hover:text-white/60 transition-colors mb-1">Establish New Dimension</p>
              <p className="text-[10px] font-bold text-white/10 uppercase tracking-widest">Architect your future milestones</p>
            </div>
          </motion.div>
        </div>

        {/* Modal Logic remains but is now connected to state */}
        <ModalX
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Architect New Objective"
        >
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20 ml-1">Objective Title</label>
              <input
                type="text"
                placeholder="Ex: Reach 100% Deep Work Velocity"
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white font-bold focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all placeholder:text-white/10"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <DropdownX
                label="Dimension"
                value={goalCategory}
                onChange={setGoalCategory}
                options={[
                  { label: 'Productivity', value: 'productivity', icon: Zap },
                  { label: 'Finance', value: 'finance', icon: Wallet },
                  { label: 'Health', value: 'health', icon: HeartPulse },
                  { label: 'Gaming', value: 'gaming', icon: Gamepad2 },
                  { label: 'Media', value: 'media', icon: Film },
                ]}
              />
              <DropdownX
                label="Priority"
                value={goalPriority}
                onChange={setGoalPriority}
                options={[
                  { label: 'High Velocity', value: 'high', icon: Flame },
                  { label: 'Standard', value: 'medium', icon: Activity },
                  { label: 'Passive', value: 'low', icon: Target },
                ]}
              />
            </div>

            <div className="pt-4 flex gap-3">
              <ButtonX variant="ghost" className="flex-1 h-14 rounded-2xl font-bold" onClick={() => setIsModalOpen(false)}>Abort</ButtonX>
              <ButtonX variant="primary" className="flex-1 h-14 rounded-2xl font-black uppercase tracking-widest text-xs" icon={Flag}>Establish Goal</ButtonX>
            </div>
          </div>
        </ModalX>
      </motion.div>
    </div>
  );
}

function shimmerAnimation() {
  return (
    <style>{`
      @keyframes shimmer {
        0% { transform: translateX(-100%); }
        100% { transform: translateX(100%); }
      }
    `}</style>
  );
}
