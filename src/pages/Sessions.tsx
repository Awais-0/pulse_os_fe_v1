import React from 'react';
import { motion } from 'motion/react';
import { 
  Clock, 
  Target, 
  Zap, 
  Calendar, 
  Filter, 
  MoreVertical,
  ArrowUpRight,
  Monitor,
  Gamepad2,
  Code2,
  Briefcase
} from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { Button } from '@/src/components/Button';
import { SearchBar } from '@/src/components/SearchBar';
import { Modal } from '@/src/components/Modal';

interface Session {
  id: string;
  title: string;
  category: 'work' | 'coding' | 'gaming' | 'focus';
  startTime: string;
  duration: string;
  focusScore: number;
  status: 'completed' | 'in-progress' | 'interrupted';
  apps: string[];
}

const sessions: Session[] = [
  {
    id: '1',
    title: 'Frontend Refactoring',
    category: 'coding',
    startTime: '10:30 AM',
    duration: '2h 15m',
    focusScore: 94,
    status: 'completed',
    apps: ['VS Code', 'Chrome', 'Spotify'],
  },
  {
    id: '2',
    title: 'UI Design Review',
    category: 'work',
    startTime: '01:45 PM',
    duration: '45m',
    focusScore: 82,
    status: 'completed',
    apps: ['Figma', 'Slack'],
  },
  {
    id: '3',
    title: 'Core Algorithm Dev',
    category: 'coding',
    startTime: '03:00 PM',
    duration: '1h 20m',
    focusScore: 98,
    status: 'in-progress',
    apps: ['VS Code', 'Terminal', 'Linear'],
  },
  {
    id: '4',
    title: 'Weekly Sync',
    category: 'work',
    startTime: '09:00 AM',
    duration: '1h 00m',
    focusScore: 65,
    status: 'interrupted',
    apps: ['Zoom', 'Notion'],
  },
];

const categoryIcons = {
  work: Briefcase,
  coding: Code2,
  gaming: Gamepad2,
  focus: Target,
};

const statusColors = {
  completed: 'text-emerald-400 bg-emerald-500/10',
  'in-progress': 'text-indigo-400 bg-indigo-500/10',
  interrupted: 'text-amber-400 bg-amber-500/10',
};

export function Sessions() {
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  return (
    <div className="flex-1 h-full overflow-y-auto custom-scrollbar p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-black tracking-tighter mb-2">Focus Sessions</h1>
            <p className="text-white/40 font-medium italic">Chronicle of your deep work and digital flow</p>
          </div>
          
          <div className="flex items-center gap-3">
            <SearchBar placeholder="Search sessions..." className="w-40" />
            <Button variant="glass" className="p-3">
              <Filter className="w-5 h-5 text-indigo-400" />
            </Button>
            <Button icon={Zap} onClick={() => setIsModalOpen(true)}>
              Start Session
            </Button>
          </div>
        </header>

        {/* Start Session Modal */}
        <Modal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          title="Begin New Session"
        >
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-white/30 ml-1">Session Title</label>
              <input 
                type="text" 
                placeholder="e.g. Frontend Architecture" 
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all placeholder:text-white/20"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-white/30 ml-1">Category</label>
                <select className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all appearance-none cursor-pointer">
                  <option value="coding">Coding</option>
                  <option value="work">General Work</option>
                  <option value="focus">Deep Focus</option>
                  <option value="learning">Learning</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-white/30 ml-1">Duration</label>
                <select className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all appearance-none cursor-pointer">
                  <option value="25">25 Minutes</option>
                  <option value="50">50 Minutes</option>
                  <option value="90">90 Minutes</option>
                  <option value="custom">Custom</option>
                </select>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-indigo-500/5 border border-indigo-500/10">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-indigo-500/20 flex items-center justify-center">
                  <Target className="w-4 h-4 text-indigo-400" />
                </div>
                <p className="text-xs font-medium text-white/60">
                   System will automatically block distracting notifications during this period.
                </p>
              </div>
            </div>

            <div className="pt-4 flex gap-3">
              <Button variant="ghost" className="flex-1" onClick={() => setIsModalOpen(false)}>Cancel</Button>
              <Button variant="primary" className="flex-1" icon={Zap}>Initialize Session</Button>
            </div>
          </div>
        </Modal>

        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {[
            { label: 'Total Focus', value: '4h 20m', icon: Clock, color: 'text-indigo-400' },
            { label: 'Avg. Score', value: '89%', icon: Target, color: 'text-emerald-400' },
            { label: 'Deep Work', value: '3 Sessions', icon: Zap, color: 'text-purple-400' },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass p-6 rounded-3xl relative overflow-hidden group"
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 mb-2">{stat.label}</p>
                  <h3 className="text-3xl font-black tracking-tight">{stat.value}</h3>
                </div>
                <div className={cn("p-3 rounded-2xl bg-white/5", stat.color)}>
                  <stat.icon className="w-6 h-6" />
                </div>
              </div>
              <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-white/5 blur-3xl rounded-full group-hover:bg-white/10 transition-colors" />
            </motion.div>
          ))}
        </div>

        {/* Sessions List */}
        <div className="space-y-4">
          <div className="flex items-center justify-between px-6 mb-4">
            <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-white/20">Recent Timeline</h2>
            <div className="flex items-center gap-2 text-xs font-bold text-white/40">
              <Calendar className="w-3 h-3" />
              Today, May 8
            </div>
          </div>

          {sessions.map((session, i) => {
            const Icon = categoryIcons[session.category];
            return (
              <motion.div
                key={session.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.1 }}
                className="glass p-4 md:p-6 rounded-[2rem] hover:bg-white/[0.05] transition-all group cursor-pointer border border-white/5 hover:border-white/10"
              >
                <div className="flex flex-col md:flex-row md:items-center gap-6">
                  {/* Category Icon */}
                  <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center shrink-0 shadow-inner group-hover:scale-110 transition-transform">
                    <Icon className="w-7 h-7 text-white/70" />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="text-xl font-bold tracking-tight truncate">{session.title}</h3>
                      <span className={cn("text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md", statusColors[session.status])}>
                        {session.status}
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-white/40 font-medium">
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-4 h-4" />
                        {session.startTime} • {session.duration}
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Monitor className="w-4 h-4" />
                        {session.apps.join(', ')}
                      </div>
                    </div>
                  </div>

                  {/* Score */}
                  <div className="flex items-center gap-8 md:px-6">
                    <div className="text-right">
                      <div className="text-[10px] font-bold uppercase tracking-widest text-white/20 mb-1">Focus Score</div>
                      <div className="flex items-center gap-2">
                        <div className="text-2xl font-black text-white/90">{session.focusScore}</div>
                        <div className="w-12 h-1.5 bg-white/10 rounded-full overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${session.focusScore}%` }}
                            transition={{ duration: 1, delay: 0.5 + i * 0.1 }}
                            className={cn(
                              "h-full rounded-full",
                              session.focusScore > 90 ? "bg-emerald-500" : session.focusScore > 70 ? "bg-indigo-500" : "bg-amber-500"
                            )}
                          />
                        </div>
                      </div>
                    </div>
                    <button className="p-2 hover:bg-white/10 rounded-xl transition-colors text-white/30 hover:text-white">
                      <MoreVertical className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}

          <Button 
            variant="ghost" 
            className="w-full py-8 border-2 border-dashed border-white/5 hover:border-white/10 rounded-[2rem]"
            icon={ArrowUpRight}
            iconPosition="right"
          >
            Load Older Sessions
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
