import React from 'react'
import { ButtonX } from '../custom-antd/ButtonX';
import { ModalX } from '../custom-antd/ModalX';
import { CheckCircle2, Medal } from 'lucide-react';
import { rarityColors, rarityFromPercent } from '@/src/constants/system.constants';
import { cn } from '@/src/lib/utils';
import { toggleAchievement } from '@/src/lib/api';
import { IAchievementItem } from '@/src/types/gaming/gaming.types';

const AchievementsModal = ({ selectedGameAchievements, setSelectedGameAchievements, games, setGames }) => {

    const handleToggleAchievement = async (achievement: IAchievementItem) => {
        try {
            const updated = await toggleAchievement(achievement.gameId, achievement.id);
            const game = games.find(g => g.id === String(achievement.gameId));
            if (game && selectedGameAchievements) {
                setSelectedGameAchievements(
                    selectedGameAchievements.map(a => a.id === achievement.id ? updated : a)
                );
                setGames(games.map(g =>
                    g.id === String(achievement.gameId)
                        ? { ...g, achievements: g.achievements.map(a => a.id === achievement.id ? updated : a) }
                        : g
                ));
            }
        } catch (err) {
            console.error('Failed to toggle achievement:', err);
        }
    };
    return (
        <ModalX
            isOpen={selectedGameAchievements !== null}
            onClose={() => setSelectedGameAchievements(null)}
            title="Accomplishments"
        >
            <div className="space-y-2 max-h-96 overflow-y-auto custom-scrollbar pr-1">
                {selectedGameAchievements?.map((ach) => {
                    const rarity = rarityFromPercent(ach.percent || '0');
                    return (
                        <ButtonX
                            key={ach.id}
                            onClick={() => handleToggleAchievement(ach)}
                            className={cn(
                                "w-full flex items-center gap-3 p-3 rounded-xl border transition-all text-left",
                                ach.earned
                                    ? "bg-emerald-500/10 border-emerald-500/20"
                                    : "bg-white/5 border-white/10 hover:bg-white/10"
                            )}
                        >
                            {ach.imageUrl ? (
                                <img src={ach.imageUrl} alt="" className="w-8 h-8 rounded-lg object-cover" />
                            ) : (
                                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center">
                                    {ach.earned ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Medal className="w-4 h-4 text-white/20" />}
                                </div>
                            )}
                            <div className="flex-1 min-w-0">
                                <p className={cn("text-xs font-bold truncate", ach.earned ? "text-emerald-300" : "text-white/80")}>
                                    {ach.name}
                                </p>
                                {ach.description && (
                                    <p className="text-[9px] text-white/30 truncate">{ach.description}</p>
                                )}
                            </div>
                            <div className={cn(
                                "text-[7px] font-black uppercase tracking-widest px-1.5 py-0.5 rounded border",
                                rarityColors[rarity]
                            )}>
                                {rarity}
                            </div>
                            {ach.percent && (
                                <span className="text-[9px] font-bold text-white/20 w-10 text-right">{ach.percent}%</span>
                            )}
                        </ButtonX>
                    );
                })}
                {selectedGameAchievements?.length === 0 && (
                    <p className="text-center text-white/20 text-xs font-bold py-8">No achievements found for this game</p>
                )}
            </div>
        </ModalX>
    )
}

export default AchievementsModal