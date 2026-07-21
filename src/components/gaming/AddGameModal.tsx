import React, { useState, useEffect } from 'react';
import {
    Flame,
    Gamepad2,
    Loader2,
    Search,
    Star,
    Sword,
    Target,
    Trophy,
    Activity,
} from 'lucide-react';
import { ModalX } from '../custom-antd/ModalX';
import { ButtonX } from '../custom-antd/ButtonX';
import { DropdownX } from '../custom-antd/DropdownX';
import { addGame, searchRAWG } from '@/src/lib/api';
import { GamePlatform, GameStatus, IGame } from '@/src/types/gaming/gaming.types';

interface AddGameModalProps {
    isModalOpen: boolean;
    setIsModalOpen: (open: boolean) => void;
    games: IGame[];
    setGames: React.Dispatch<React.SetStateAction<IGame[]>>;
}

export const AddGameModal: React.FC<AddGameModalProps> = ({
    isModalOpen,
    setIsModalOpen,
    games,
    setGames,
}) => {
    const [isSearchingRawg, setIsSearchingRawg] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [title, setTitle] = useState('');
    const [coverImage, setCoverImage] = useState('');
    const [genre, setGenre] = useState('');
    const [selectedRawgId, setSelectedRawgId] = useState<number | null>(null);
    const [rawgResults, setRawgResults] = useState<any[]>([]);
    const [simPlatform, setSimPlatform] = useState<GamePlatform>('PC');
    const [simStatus, setSimStatus] = useState<GameStatus>('backlog');

    const resetForm = () => {
        setTitle('');
        setCoverImage('');
        setGenre('');
        setSelectedRawgId(null);
        setRawgResults([]);
        setSimPlatform('PC');
        setSimStatus('backlog');
    };

    useEffect(() => {
        if (!isModalOpen) {
            resetForm();
        }
    }, [isModalOpen]);

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
        setSelectedRawgId(null);
        setRawgResults([]);
    };

    const handleSearchRAWG = async () => {
        if (title.trim().length < 2) return;

        setIsSearchingRawg(true);
        try {
            const results = await searchRAWG(title);
            setRawgResults(results || []);
        } catch (err) {
            console.error('RAWG search error:', err);
            setRawgResults([]);
        } finally {
            setIsSearchingRawg(false);
        }
    };

    const handleSelectRawg = (item: any) => {
        setTitle(item.title);
        setSelectedRawgId(item.rawg_id);
        setCoverImage(item.cover_image || '');
        setGenre((item.genres && item.genres[0]) || '');

        if (item.platforms && item.platforms.length > 0) {
            const mapped: Record<string, GamePlatform> = {
                PC: 'PC',
                PlayStation: 'PlayStation',
                Xbox: 'Xbox',
                Nintendo: 'Nintendo',
                iOS: 'iOS',
                Android: 'Android',
            };
            for (const p of item.platforms) {
                if (mapped[p]) {
                    setSimPlatform(mapped[p]);
                    break;
                }
            }
        }
        setRawgResults([]);
    };

    const handleAddGame = async () => {
        if (!title.trim()) return;

        setIsSubmitting(true);
        const payload = {
            title,
            platform: simPlatform,
            status: simStatus,
            playtime: 0,
            rating: 0,
            cover_image: coverImage || undefined,
            genre: genre || undefined,
            rawg_id: selectedRawgId || undefined,
        };

        try {
            const newGame = await addGame(payload);
            setGames([newGame, ...games]);
            setIsModalOpen(false);
        } catch (err) {
            alert(err instanceof Error ? err.message : 'Failed to add game');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <ModalX
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            title="Simulation Protocol"
        >
            <div className="space-y-4">
                {/* Title & RAWG Search Field */}
                <div className="space-y-1.5 relative">
                    <label className="text-[10px] font-black uppercase tracking-wider text-white/30 ml-1">
                        Title
                    </label>
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Ex: Sekiro, Doom Eternal..."
                            value={title}
                            onChange={handleTitleChange}
                            onKeyDown={(e) => e.key === 'Enter' && handleSearchRAWG()}
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm font-bold focus:ring-1 focus:ring-rose-500/50 outline-none transition-all placeholder:text-white/10 pr-12"
                        />
                        <div className="absolute right-3.5 top-1/2 -translate-y-1/2">
                            {isSearchingRawg ? (
                                <Loader2 className="w-4 h-4 text-rose-500 animate-spin" />
                            ) : (
                                <ButtonX
                                    onClick={handleSearchRAWG}
                                    className="text-white/30 hover:text-rose-400 transition-colors p-0.5"
                                >
                                    <Search className="w-4 h-4" />
                                </ButtonX>
                            )}
                        </div>
                    </div>

                    {/* Search Dropdown Results */}
                    {rawgResults.length > 0 && (
                        <div className="absolute left-0 right-0 top-full mt-1.5 z-50 glass border border-white/10 rounded-xl overflow-hidden max-h-52 overflow-y-auto custom-scrollbar p-1 shadow-2xl">
                            {rawgResults.map((result) => (
                                <div
                                    key={result.rawg_id}
                                    onClick={() => handleSelectRawg(result)}
                                    className="flex items-center gap-3 p-2 hover:bg-white/5 rounded-lg cursor-pointer transition-colors"
                                >
                                    {result.cover_image ? (
                                        <img
                                            src={result.cover_image}
                                            alt=""
                                            className="w-7 h-9 object-cover rounded"
                                        />
                                    ) : (
                                        <div className="w-7 h-9 bg-white/5 rounded flex items-center justify-center">
                                            <Gamepad2 className="w-3.5 h-3.5 text-white/20" />
                                        </div>
                                    )}
                                    <div className="flex-1 min-w-0">
                                        <p className="text-xs font-bold text-white truncate">{result.title}</p>
                                        <p className="text-[9px] text-white/40 uppercase font-black">
                                            {result.platforms?.slice(0, 2).join(', ') || 'N/A'} •{' '}
                                            {result.released ? result.released.split('-')[0] : 'N/A'}
                                        </p>
                                    </div>
                                    {result.rating > 0 && (
                                        <div className="flex items-center gap-1 text-[10px] font-bold text-amber-400/80">
                                            <Star className="w-3 h-3 fill-amber-400/60" />
                                            {result.rating}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Selected RAWG Preview Banner */}
                {selectedRawgId && (
                    <div className="glass border border-rose-500/20 bg-rose-500/5 p-3 rounded-xl flex items-center gap-3">
                        {coverImage ? (
                            <img src={coverImage} alt="" className="w-10 h-12 object-cover rounded-lg" />
                        ) : (
                            <div className="w-10 h-12 bg-white/5 rounded-lg flex items-center justify-center">
                                <Gamepad2 className="w-4 h-4 text-white/20" />
                            </div>
                        )}
                        <div className="flex-1 min-w-0">
                            <span className="px-1.5 py-0.5 rounded bg-rose-500/20 text-[7px] font-black text-rose-300 uppercase tracking-widest block w-fit mb-1">
                                RAWG Connected
                            </span>
                            <p className="text-xs font-bold text-white truncate">{title}</p>
                            <p className="text-[9px] text-white/40 uppercase font-black">
                                {genre || 'N/A'} • {simPlatform}
                            </p>
                        </div>
                        <ButtonX
                            onClick={() => {
                                setSelectedRawgId(null);
                                setCoverImage('');
                                setGenre('');
                            }}
                            className="text-[10px] text-rose-400 hover:text-rose-300 font-bold uppercase tracking-wider px-2 py-1 rounded hover:bg-rose-500/10 transition-colors"
                        >
                            Unlink
                        </ButtonX>
                    </div>
                )}

                {/* Select Dropdowns */}
                <div className="grid grid-cols-2 gap-3">
                    <DropdownX
                        label="Platform"
                        value={simPlatform}
                        onChange={(val: GamePlatform) => setSimPlatform(val)}
                        options={[
                            { label: 'PC', value: 'PC', icon: Sword },
                            { label: 'PlayStation', value: 'PlayStation', icon: Gamepad2 },
                            { label: 'Xbox', value: 'Xbox', icon: Gamepad2 },
                            { label: 'Nintendo', value: 'Nintendo', icon: Gamepad2 },
                            { label: 'iOS', value: 'iOS', icon: Activity },
                            { label: 'Android', value: 'Android', icon: Activity },
                        ]}
                    />
                    <DropdownX
                        label="Status"
                        value={simStatus}
                        onChange={(val: GameStatus) => setSimStatus(val)}
                        options={[
                            { label: 'Protocol (Backlog)', value: 'backlog', icon: Target },
                            { label: 'Execution (Active)', value: 'playing', icon: Flame },
                            { label: 'Archive (Finished)', value: 'completed', icon: Trophy },
                        ]}
                    />
                </div>

                {/* Action Controls */}
                <div className="pt-4 flex gap-2">
                    <ButtonX
                        variant="ghost"
                        className="flex-1 h-11 rounded-xl font-bold"
                        onClick={() => setIsModalOpen(false)}
                    >
                        Cancel
                    </ButtonX>
                    <ButtonX
                        variant="primary"
                        className="flex-1 h-11 rounded-xl font-black uppercase tracking-widest text-[10px] bg-rose-600 hover:bg-rose-500"
                        onClick={handleAddGame}
                        disabled={isSubmitting || !title.trim()}
                    >
                        {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Sync Simulation'}
                    </ButtonX>
                </div>
            </div>
        </ModalX>
    );
};

export default AddGameModal;