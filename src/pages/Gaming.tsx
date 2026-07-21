import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Gamepad2,
  Trophy,
  Clock,
  Plus,
  Star,
  Search,
  MoreVertical,
  Activity,
  Sword,
  Target,
  Flame,
  LayoutGrid,
  Zap,
  Award,
  Trash2,
  Loader2,
} from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { ButtonX } from '@/src/components/custom-antd/ButtonX';
import { getGames, updateGame, deleteGame } from '@/src/lib/api';
import { rarityColors, rarityFromPercent } from '../constants/system.constants';
import AchievementsModal from '../components/gaming/AchievementsModal';
import AddGameModal from '../components/gaming/AddGameModal';
import { IAchievementItem, IGame } from '../types/gaming/gaming.types';

export type GamePlatform = 'PC' | 'PlayStation' | 'Xbox' | 'Nintendo' | 'iOS' | 'Android';
export type GameStatus = 'playing' | 'backlog' | 'completed' | 'abandoned';

const platformIcons: Record<string, any> = {
  PC: Sword,
  PlayStation: Gamepad2,
  Xbox: Gamepad2,
  Nintendo: Gamepad2,
  iOS: Activity,
  Android: Activity,
};

const statusColors: Record<GameStatus, string> = {
  playing: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20',
  completed: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
  backlog: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
  abandoned: 'text-rose-400 bg-rose-500/10 border-rose-500/20',
};

export function Gaming() {
  const [activeTab, setActiveTab] = useState<GameStatus | 'all'>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const [games, setGames] = useState<IGame[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);

  // Achievements modal state
  const [selectedGameAchievements, setSelectedGameAchievements] = useState<IAchievementItem[] | null>(null);

  const fetchGames = async (statusFilter?: string) => {
    setLoading(true);
    try {
      const data = await getGames(statusFilter === 'all' ? undefined : statusFilter);
      setGames(data || []);
    } catch (err) {
      console.error('Failed to fetch games:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGames(activeTab);
  }, [activeTab]);

  useEffect(() => {
    const handleGlobalClick = () => setActiveMenuId(null);
    document.addEventListener('click', handleGlobalClick);
    return () => document.removeEventListener('click', handleGlobalClick);
  }, []);

  const handleUpdateGame = async (gameId: string, updateData: Partial<IGame>) => {
    try {
      const updated = await updateGame(gameId, updateData);
      setGames(games?.map((g) => (g.id === gameId ? updated : g)));
    } catch (err) {
      console.error('Failed to update game:', err);
    }
  };

  const handleStatusChange = async (e: React.MouseEvent, game: IGame, newStatus: GameStatus) => {
    e.stopPropagation();
    setActiveMenuId(null);
    await handleUpdateGame(game.id, { status: newStatus });
  };

  const handleDelete = async (e: React.MouseEvent, gameId: string) => {
    e.stopPropagation();
    setActiveMenuId(null);
    if (!confirm('Remove this game from your library?')) return;
    try {
      await deleteGame(gameId);
      setGames(games.filter((g) => g.id !== gameId));
    } catch (err) {
      console.error('Failed to delete game:', err);
    }
  };

  const recentAchievements: IAchievementItem[] = games
    .flatMap((g) => g.achievements || [])
    .filter((a) => a.earned)
    .sort((a, b) => (a.earnedAt && b.earnedAt ? (a.earnedAt > b.earnedAt ? -1 : 1) : 0))
    .slice(0, 4);

  const tabs: { id: GameStatus | 'all'; label: string; icon: any }[] = [
    { id: 'all', label: 'All Games', icon: LayoutGrid },
    { id: 'playing', label: 'In-Game', icon: Flame },
    { id: 'completed', label: 'Legacy', icon: Trophy },
    { id: 'backlog', label: 'Protocol', icon: Target },
  ];

  const filteredGames = games.filter((game) =>
    game.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex-1 h-full overflow-y-auto custom-scrollbar p-6">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-[1600px] mx-auto"
      >
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-1.5 py-0.5 rounded bg-rose-500/10 border border-rose-500/20 text-[9px] font-black text-rose-400 uppercase tracking-widest">
                Dimension Gaming
              </span>
            </div>
            <h1 className="text-3xl font-black tracking-tight text-white/90">Pulse Engine</h1>
            <p className="text-white/40 text-sm font-medium">
              Syncing execution states across your digital simulations
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative group">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 group-focus-within:text-rose-400 transition-colors" />
              <input
                type="text"
                placeholder="Search simulations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-white/5 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-sm font-bold w-40 focus:w-60 focus:outline-none focus:ring-2 focus:ring-rose-500/20 transition-all placeholder:text-white/10"
              />
            </div>
            <ButtonX
              icon={Plus}
              size="sm"
              variant="primary"
              onClick={() => setIsModalOpen(true)}
              className="bg-rose-600 hover:bg-rose-500"
            >
              New Init
            </ButtonX>
          </div>
        </header>

        <div className="flex flex-col xl:flex-row gap-6 mb-8">
          <div className="flex-1">
            <div className="flex flex-wrap gap-1.5 p-1 glass rounded-xl w-fit">
              {tabs.map((tab) => (
                <ButtonX
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    'flex items-center gap-2 px-4 py-2 rounded-lg text-[11px] font-black uppercase tracking-wider transition-all duration-300',
                    activeTab === tab.id
                      ? 'bg-white/10 text-white shadow-lg'
                      : 'text-white/30 hover:text-white/60'
                  )}
                >
                  <tab.icon className="w-3.5 h-3.5" />
                  {tab.label}
                </ButtonX>
              ))}
            </div>
          </div>

          <div className="flex gap-4 overflow-x-auto pb-2 xl:pb-0 no-scrollbar">
            <MiniStat label="Library" value={games.length} color="text-indigo-400" />
            <MiniStat
              label="Runtime"
              value={games.filter((g) => g.status === 'playing').length}
              color="text-rose-400"
            />
            <MiniStat
              label="Achieved"
              value={games.filter((g) => g.status === 'completed').length}
              color="text-emerald-400"
            />
          </div>
        </div>

        {recentAchievements.length > 0 && (
          <div className="mb-10">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30 flex items-center gap-2">
                <Award className="w-3.5 h-3.5 text-rose-400" />
                Recent Accomplishments
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
              {recentAchievements.map((ach) => {
                const rarity = rarityFromPercent(ach.percent || '0');
                const game = games.find((g) => g.id === String(ach.gameId));
                const AchIcon =
                  rarity === 'Legendary'
                    ? Trophy
                    : rarity === 'Epic'
                      ? Zap
                      : rarity === 'Rare'
                        ? Sword
                        : Target;
                return (
                  <motion.div
                    key={ach.id}
                    whileHover={{ y: -2 }}
                    className="glass p-4 rounded-2xl border border-white/5 flex items-center gap-4 group"
                  >
                    <div
                      className={cn(
                        'w-12 h-12 rounded-xl flex items-center justify-center border shrink-0 transition-transform group-hover:scale-110 shadow-lg backdrop-blur-md',
                        rarityColors[rarity]
                      )}
                    >
                      <AchIcon className="w-6 h-6" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-black tracking-tight truncate group-hover:text-white transition-colors">
                        {ach.name}
                      </div>
                      <div className="text-[9px] font-bold text-white/30 uppercase tracking-wider truncate mb-1">
                        {game?.title || 'Unknown'}
                      </div>
                      <div
                        className={cn(
                          'text-[8px] font-black uppercase tracking-widest px-1.5 py-0.5 rounded border-0 w-fit',
                          rarityColors[rarity]
                        )}
                      >
                        {rarity}
                      </div>
                    </div>
                    <div className="ml-auto text-[8px] font-bold text-white/10 uppercase tracking-widest whitespace-nowrap hidden group-hover:block transition-all italic">
                      {ach.earnedAt ? new Date(ach.earnedAt).toLocaleDateString() : ''}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}

        <div className="flex items-center gap-2 mb-6">
          <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30">
            Active Simulations
          </h2>
          <div className="h-px flex-1 bg-white/5" />
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <Loader2 className="w-8 h-8 text-rose-500 animate-spin" />
            <p className="text-xs text-white/30 font-bold uppercase tracking-widest">
              Loading Simulations...
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-5">
            <AnimatePresence mode="popLayout">
              {filteredGames.map((game, i) => (
                <motion.div
                  key={game.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3, delay: i * 0.03 }}
                  className="group flex flex-col"
                >
                  <div className="glass rounded-2xl overflow-hidden border border-white/5 hover:border-white/20 transition-all flex flex-col h-full shadow-xl">
                    <div className="relative aspect-[3/4] overflow-hidden bg-white/5">
                      {game.coverImage ? (
                        <img
                          src={game.coverImage}
                          alt={game.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-white/10">
                          <Gamepad2 className="w-12 h-12" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent" />

                      <div className="absolute top-2 right-2">
                        <div className="glass px-2 py-1 rounded-lg flex items-center gap-1 border-white/10 backdrop-blur-md">
                          <Star className="w-2.5 h-2.5 text-amber-400 fill-amber-400" />
                          <span className="text-[10px] font-black">{game.rating || 'N/A'}</span>
                        </div>
                      </div>

                      <div
                        className={cn(
                          'absolute bottom-3 left-3 px-2 py-0.5 rounded-md text-[8px] font-black uppercase tracking-widest border backdrop-blur-md',
                          statusColors[game.status]
                        )}
                      >
                        {game.status}
                      </div>
                    </div>

                    <div className="p-4 flex-1 flex flex-col justify-between">
                      <div className="mb-3">
                        <h3 className="text-sm font-bold tracking-tight line-clamp-1 group-hover:text-rose-400 transition-colors mb-1">
                          {game.title}
                        </h3>
                        <div className="flex items-center gap-1.5 opacity-30">
                          {React.createElement(platformIcons[game.platform] || Gamepad2, {
                            className: 'w-2.5 h-2.5',
                          })}
                          <span className="text-[9px] font-bold uppercase tracking-wider">
                            {game.platform} • {game.genre}
                          </span>
                        </div>
                      </div>

                      <div className="space-y-2.5">
                        <div className="flex justify-between items-end text-[9px] font-black uppercase tracking-wider">
                          <div className="text-white/40">
                            <span className="text-white/80">{game.playtime}</span>
                            <span className="ml-1">HRS</span>
                          </div>
                          {game.achievementsTotal > 0 && (
                            <ButtonX
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedGameAchievements(game.achievements);
                              }}
                              className="text-rose-400/80 hover:text-rose-300 transition-colors"
                            >
                              {Math.round(
                                (game.achievementsCompleted / game.achievementsTotal) * 100
                              )}
                              % CP
                            </ButtonX>
                          )}
                        </div>

                        {game.achievementsTotal > 0 && (
                          <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{
                                width: `${(game.achievementsCompleted /
                                  Math.max(game.achievementsTotal, 1)) *
                                  100
                                  }%`,
                              }}
                              className="h-full bg-gradient-to-r from-rose-600 to-orange-500 rounded-full"
                            />
                          </div>
                        )}

                        <div className="flex items-center justify-between pt-2 border-t border-white/5 opacity-40 group-hover:opacity-100 transition-opacity relative">
                          <div className="text-[8px] font-bold flex items-center gap-1">
                            <Clock className="w-2.5 h-2.5" />
                            {game.lastUpdated}
                          </div>
                          <ButtonX
                            onClick={(e) => {
                              e.stopPropagation();
                              setActiveMenuId(activeMenuId === game.id ? null : game.id);
                            }}
                            className="p-1 hover:bg-white/10 rounded-md transition-colors"
                          >
                            <MoreVertical className="w-3.5 h-3.5" />
                          </ButtonX>

                          {activeMenuId === game.id && (
                            <div className="absolute right-0 bottom-8 z-50 glass border border-white/10 rounded-xl shadow-2xl p-1.5 min-w-[120px] space-y-1">
                              <p className="text-[7px] font-black uppercase tracking-wider text-white/20 px-2 py-0.5">
                                Status
                              </p>
                              {(['playing', 'backlog', 'completed', 'abandoned'] as GameStatus[]).map(
                                (status) => (
                                  <ButtonX
                                    key={status}
                                    onClick={(e) => handleStatusChange(e, game, status)}
                                    className={cn(
                                      'w-full text-left text-[9px] font-bold px-2 py-1 rounded transition-colors uppercase tracking-wider',
                                      game.status === status
                                        ? 'bg-rose-600/80 text-white'
                                        : 'text-white/60 hover:bg-white/5 hover:text-white'
                                    )}
                                  >
                                    {status}
                                  </ButtonX>
                                )
                              )}
                              <div className="border-t border-white/5 my-1" />
                              <ButtonX
                                onClick={(e) => handleDelete(e, game.id)}
                                className="w-full text-left text-[9px] font-bold px-2 py-1 rounded transition-colors text-rose-400 hover:bg-rose-500/10 flex items-center gap-1.5 uppercase tracking-wider"
                              >
                                <Trash2 className="w-3 h-3" />
                                Delete
                              </ButtonX>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}

              <motion.div
                layout
                onClick={() => setIsModalOpen(true)}
                className="border border-dashed border-white/10 rounded-2xl flex flex-col items-center justify-center p-6 hover:bg-white/5 hover:border-white/20 transition-all cursor-pointer group min-h-[300px]"
              >
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center mb-3 group-hover:scale-110 group-hover:bg-rose-500/10 transition-all">
                  <Plus className="w-5 h-5 text-white/20 group-hover:text-rose-400" />
                </div>
                <p className="text-[11px] font-black uppercase tracking-widest text-white/20 group-hover:text-white/40">
                  Initialize
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        )}

        {/* Add Game Modal */}
        <AddGameModal
          games={games}
          isModalOpen={isModalOpen}
          setGames={setGames}
          setIsModalOpen={setIsModalOpen}
        />

        {/* Achievements Modal */}
        <AchievementsModal
          selectedGameAchievements={selectedGameAchievements}
          setSelectedGameAchievements={setSelectedGameAchievements}
          games={games}
          setGames={setGames}
        />
      </motion.div>
    </div>
  );
}

function MiniStat({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div className="glass px-4 py-2 rounded-xl flex flex-col min-w-[80px]">
      <span className="text-[8px] font-black uppercase tracking-widest text-white/20 mb-0.5">
        {label}
      </span>
      <span className={cn('text-lg font-black tracking-tight', color)}>{value}</span>
    </div>
  );
}