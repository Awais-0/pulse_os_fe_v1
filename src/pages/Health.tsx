import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  HeartPulse,
  Activity,
  Zap,
  Utensils,
  Moon,
  Plus,
  Search,
  MoreVertical,
  History,
  TrendingUp,
  Target,
  Droplets,
  Trophy,
  Dumbbell,
  Clock,
  ChevronRight,
  Flame,
  Scale,
  CigaretteOff,
  Beer
} from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { Button } from '@/src/components/Button';
import { Modal } from '@/src/components/Modal';
import { Dropdown } from '@/src/components/Dropdown';

type MetricType = 'vitals' | 'activity' | 'nutrition' | 'recovery';

interface BioMetric {
  id: string;
  label: string;
  value: string;
  unit: string;
  trend: 'up' | 'down' | 'stable';
  change: string;
  icon: any;
  color: string;
  type: MetricType;
}

interface ActivityLog {
  id: string;
  type: string;
  duration: string;
  intensity: 'Low' | 'Moderate' | 'High';
  calories: number;
  timestamp: string;
}

const dummyMetrics: BioMetric[] = [
  {
    id: '1',
    label: 'Heart Rate',
    value: '72',
    unit: 'BPM',
    trend: 'stable',
    change: '0%',
    icon: HeartPulse,
    color: 'text-rose-400 bg-rose-500/10 border-rose-500/20',
    type: 'vitals'
  },
  {
    id: '2',
    label: 'Daily Steps',
    value: '8,420',
    unit: 'steps',
    trend: 'up',
    change: '+12%',
    icon: Activity,
    color: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20',
    type: 'activity'
  },
  {
    id: '3',
    label: 'Calories',
    value: '1,850',
    unit: 'kcal',
    trend: 'down',
    change: '-5%',
    icon: Utensils,
    color: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
    type: 'nutrition'
  },
  {
    id: '4',
    label: 'Sleep Quality',
    value: '84%',
    unit: 'avg',
    trend: 'up',
    change: '+5%',
    icon: Moon,
    color: 'text-purple-400 bg-purple-500/10 border-purple-500/20',
    type: 'recovery'
  }
];

const dummyLogs: ActivityLog[] = [
  { id: 'l1', type: 'Weightlifting', duration: '1h 15m', intensity: 'High', calories: 450, timestamp: '2 hours ago' },
  { id: 'l2', type: 'Evening Run', duration: '45m', intensity: 'Moderate', calories: 380, timestamp: 'Yesterday' },
  { id: 'l3', type: 'Yoga/Mobility', duration: '30m', intensity: 'Low', calories: 120, timestamp: '2 days ago' },
];

export function Health() {
  const [activeTab, setActiveTab] = useState<MetricType | 'all'>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [protocolType, setProtocolType] = useState('gym');

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
              <span className="px-1.5 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-[9px] font-black text-emerald-400 uppercase tracking-widest">Dimension Bio-Link</span>
            </div>
            <h1 className="text-3xl font-black tracking-tight text-white/90">Biological Status</h1>
            <p className="text-white/40 text-sm font-medium">Monitoring physiological execution and metabolic performance</p>
          </div>

          <div className="flex items-center gap-3">
            <Button icon={Plus} size="sm" variant="primary" onClick={() => setIsModalOpen(true)} className="bg-emerald-600 hover:bg-emerald-500">
              Log Protocol
            </Button>
          </div>
        </header>

        {/* Vitals Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {dummyMetrics.map((metric, i) => (
            <motion.div
              key={metric.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              className="glass p-6 rounded-3xl border border-white/5 hover:border-white/10 transition-all group relative overflow-hidden"
            >
              <div className="flex justify-between items-start mb-4">
                <div className={cn("p-3 rounded-2xl", metric.color)}>
                  <metric.icon className="w-6 h-6" />
                </div>
                <div className="flex flex-col items-end">
                  <div className={cn(
                    "flex items-center gap-1 text-[10px] font-black uppercase tracking-wider",
                    metric.trend === 'up' ? 'text-emerald-400' : metric.trend === 'down' ? 'text-rose-400' : 'text-white/20'
                  )}>
                    {metric.trend === 'up' ? <TrendingUp className="w-3 h-3" /> : <TrendingUp className="w-3 h-3 rotate-180" />}
                    {metric.change}
                  </div>
                  <span className="text-[8px] font-bold text-white/10 uppercase tracking-widest">vs Baseline</span>
                </div>
              </div>

              <div className="space-y-1">
                <div className="text-3xl font-black tracking-tighter text-white/90">
                  {metric.value} <span className="text-xs font-bold text-white/20 uppercase tracking-widest">{metric.unit}</span>
                </div>
                <div className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30 truncate">{metric.label}</div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mb-12">
          {/* Gym: Training Architecture */}
          <div className="xl:col-span-2 space-y-6">
            <div className="flex items-center justify-between px-2">
              <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30 flex items-center gap-2">
                <Dumbbell className="w-3.5 h-3.5 text-emerald-400" />
                Training Architecture (Gym)
              </h2>
              <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400/60">Hypertrophy Cycle 2.0</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <WorkoutDay day="Monday" focus="Push (Chest/Shoulders)" completed={true} exercises={['Bench Press 4x8', 'Overhead Press 3x10', 'Lateral Raises 4x15']} />
              <WorkoutDay day="Tuesday" focus="Pull (Back/Biceps)" completed={true} exercises={['Deadlift 3x5', 'Pull-Ups 4x10', 'Barbell Rows 3x8']} />
              <WorkoutDay day="Wednesday" focus="Recovery & Mobility" completed={true} exercises={['Yoga Flow 30m', 'Foam Rolling', 'Light Walk']} />
              <WorkoutDay day="Thursday" focus="Legs (Quads/Hams)" completed={false} exercises={['Squats 4x6', 'Leg Press 3x12', 'Romanian Deadlift 3x10']} active />
            </div>
          </div>

          {/* Diet: Nutritional Matrix */}
          <div className="space-y-6">
            <div className="px-2">
              <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30 flex items-center gap-2">
                <Utensils className="w-3.5 h-3.5 text-amber-400" />
                Nutritional Matrix (Diet)
              </h2>
            </div>

            <div className="glass p-8 rounded-[2.5rem] border border-white/5 space-y-8">
              <div className="flex justify-between items-end">
                <div>
                  <div className="text-4xl font-black tracking-tight text-white/90">1,850</div>
                  <div className="text-[10px] font-black uppercase tracking-widest text-white/20">Consumed Kcal</div>
                </div>
                <div className="text-right">
                  <div className="text-xl font-black text-white/40">2,200</div>
                  <div className="text-[10px] font-black uppercase tracking-widest text-white/10">Target Kcal</div>
                </div>
              </div>

              <div className="space-y-6">
                <MacroBar label="Protein" current={165} target={180} color="bg-rose-500" />
                <MacroBar label="Carbs" current={180} target={250} color="bg-indigo-500" />
                <MacroBar label="Fats" current={55} target={70} color="bg-amber-500" />
              </div>

              <div className="pt-4 border-t border-white/5 flex gap-4">
                <div className="flex-1 text-center">
                  <div className="text-xs font-black text-emerald-400">Stable</div>
                  <div className="text-[8px] font-bold text-white/20 uppercase tracking-widest">Weight Trend</div>
                </div>
                <div className="w-px bg-white/5" />
                <div className="flex-1 text-center">
                  <div className="text-xs font-black text-white/80">3.5L</div>
                  <div className="text-[8px] font-bold text-white/20 uppercase tracking-widest">Hydration</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Activity Feed Section */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          <div className="xl:col-span-2 space-y-6">
            <div className="flex items-center justify-between px-2">
              <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30 flex items-center gap-2">
                <History className="w-3.5 h-3.5" />
                Vitals Log
              </h2>
            </div>
            <div className="space-y-3">
              {dummyLogs.map((log) => (
                <div key={log.id} className="glass p-4 rounded-2xl border border-white/5 flex justify-between items-center group hover:border-emerald-500/20 transition-all">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                      <Activity className="w-5 h-5 text-white/20 group-hover:text-emerald-400" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white/90">{log.type}</div>
                      <div className="text-[9px] font-black uppercase text-white/20">{log.duration} • {log.calories} kcal</div>
                    </div>
                  </div>
                  <div className="text-[8px] font-bold text-white/10 uppercase tracking-widest">{log.timestamp}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="px-2">
              <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30 flex items-center gap-2">
                <Trophy className="w-3.5 h-3.5 text-amber-400" />
                Milestones
              </h2>
            </div>
            <div className="glass p-6 rounded-3xl border border-white/5 space-y-4">
              <MilestoneItem label="Bench Press 100kg" completed />
              <MilestoneItem label="Sub 25min 5k" completed={false} />
              <MilestoneItem label="30 Day Step Streak" completed />
            </div>
          </div>
        </div>

        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Bio-Data Sync"
        >
          <div className="space-y-4">
            <div className="space-y-1.5">
              <Dropdown
                label="Protocol Type"
                value={protocolType}
                onChange={setProtocolType}
                options={[
                  { label: 'Gym Session', value: 'gym', icon: Dumbbell },
                  { label: 'Meal Consumption', value: 'diet', icon: Utensils },
                  { label: 'Vital Update', value: 'vital', icon: Activity },
                ]}
              />
            </div>
            {/* Modal content continues... */}
            <div className="pt-4 flex gap-2">
              <Button variant="ghost" className="flex-1 h-11 rounded-xl font-bold" onClick={() => setIsModalOpen(false)}>Cancel</Button>
              <Button variant="primary" className="flex-1 h-11 rounded-xl font-black uppercase tracking-widest text-[10px] bg-emerald-600 hover:bg-emerald-500">Establish Sync</Button>
            </div>
          </div>
        </Modal>
      </motion.div>
    </div>
  );
}

function WorkoutDay({ day, focus, completed, exercises, active }: any) {
  return (
    <div className={cn(
      "glass p-5 rounded-2xl border transition-all group",
      completed ? "border-white/5 opacity-50" : active ? "border-emerald-500/30 bg-emerald-500/5" : "border-white/5",
      !completed && active && "shadow-[0_0_20px_rgba(16,185,129,0.05)]"
    )}>
      <div className="flex justify-between items-start mb-3">
        <div>
          <div className="text-[10px] font-black uppercase tracking-widest text-emerald-400 mb-1">{day}</div>
          <div className="text-sm font-bold text-white/90">{focus}</div>
        </div>
        <div className={cn(
          "w-5 h-5 rounded-full border-2 flex items-center justify-center",
          completed ? "bg-emerald-500 border-emerald-500" : "border-white/10"
        )}>
          {completed && <Zap className="w-3 h-3 text-white fill-white" />}
        </div>
      </div>
      <div className="space-y-1.5">
        {exercises.map((ex: string, i: number) => (
          <div key={i} className="text-[10px] font-medium text-white/40 flex items-center gap-2">
            <div className="w-1 h-1 rounded-full bg-white/20" />
            {ex}
          </div>
        ))}
      </div>
    </div>
  );
}

function MacroBar({ label, current, target, color }: any) {
  const percent = Math.min(100, (current / target) * 100);
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-end">
        <span className="text-[10px] font-black uppercase tracking-widest text-white/40">{label}</span>
        <span className="text-[10px] font-black text-white/60">{current}g / {target}g</span>
      </div>
      <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percent}%` }}
          className={cn("h-full rounded-full", color)}
        />
      </div>
    </div>
  );
}

function MilestoneItem({ label, completed }: any) {
  return (
    <div className="flex items-center justify-between group cursor-default">
      <span className={cn("text-xs font-bold transition-colors", completed ? "text-white/30" : "text-white/70 group-hover:text-emerald-400")}>{label}</span>
      <div className={cn(
        "w-4 h-4 rounded-md border flex items-center justify-center",
        completed ? "bg-white/10 border-white/5" : "border-white/10"
      )}>
        {completed && <Zap className="w-2.5 h-2.5 text-white/20" />}
      </div>
    </div>
  );
}
