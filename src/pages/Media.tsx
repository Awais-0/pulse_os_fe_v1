import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Film,
  PlayCircle,
  Tv,
  BookOpen,
  Plus,
  Star,
  Clock,
  CheckCircle2,
  MoreVertical,
  History,
  Trash2,
  Loader2,
  Search,
  TrendingUp
} from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { ButtonX } from '@/src/components/custom-antd/ButtonX';
import { ModalX } from '@/src/components/custom-antd/ModalX';
import { DropdownX } from '@/src/components/custom-antd/DropdownX';
import { getMedia, addMedia, updateMedia, deleteMedia, searchTMDB } from '@/src/lib/api';

type MediaType = 'movie' | 'anime' | 'manga' | 'tv_show';
type MediaStatus = 'planning' | 'active' | 'completed' | 'paused';

interface MediaItem {
  id: string;
  title: string;
  type: MediaType;
  status: MediaStatus;
  currentProgress: number;
  totalUnits: number;
  rating: number;
  coverImage: string;
  genres: string[];
  lastUpdated: string;
  tmdbId?: number;
}

const typeIcons = {
  movie: Film,
  anime: PlayCircle,
  manga: BookOpen,
  tv_show: Tv
};

const statusColors = {
  active: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20',
  completed: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
  planning: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
  paused: 'text-rose-400 bg-rose-500/10 border-rose-500/20',
};

export function Media() {
  const [activeTab, setActiveTab] = useState<MediaType | 'all'>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Data State
  const [mediaList, setMediaList] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);

  // Form State
  const [title, setTitle] = useState('');
  const [mediaType, setMediaType] = useState('movie');
  const [mediaStatus, setMediaStatus] = useState('planning');
  const [currentProgress, setCurrentProgress] = useState(0);
  const [totalUnits, setTotalUnits] = useState(1);
  const [rating, setRating] = useState(0);
  const [coverImage, setCoverImage] = useState('');
  const [genres, setGenres] = useState<string[]>([]);
  
  // TMDB State
  const [selectedTmdbId, setSelectedTmdbId] = useState<number | null>(null);
  const [tmdbResults, setTmdbResults] = useState<any[]>([]);
  const [isSearchingTmdb, setIsSearchingTmdb] = useState(false);

  // Fetch Media List
  const fetchMedia = async (typeFilter?: string) => {
    setLoading(true);
    try {
      const data = await getMedia(typeFilter);
      setMediaList(data || []);
    } catch (err) {
      console.error('Failed to fetch media list:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMedia(activeTab);
  }, [activeTab]);

  // Close menus on click outside
  useEffect(() => {
    const handleGlobalClick = () => setActiveMenuId(null);
    document.addEventListener('click', handleGlobalClick);
    return () => document.removeEventListener('click', handleGlobalClick);
  }, []);



  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    setSelectedTmdbId(null);
    setTmdbResults([]);
  };

  const handleSearchTMDB = async () => {
    if (mediaType === 'manga' || title.trim().length < 2) return;

    setIsSearchingTmdb(true);
    try {
      const results = await searchTMDB(title);
      setTmdbResults(results || []);
    } catch (err) {
      console.error('TMDB Search error:', err);
      setTmdbResults([]);
    } finally {
      setIsSearchingTmdb(false);
    }
  };

  // Select TMDB Search Result
  const handleSelectTmdb = (item: any) => {
    setTitle(item.title);
    setSelectedTmdbId(item.tmdb_id);
    setCoverImage(item.cover_image || '');
    setGenres(item.genres || []);
    setRating(item.rating || 0);
    
    // Auto-detect type
    if (item.type === 'movie') {
      setMediaType('movie');
    } else {
      if (mediaType !== 'anime' && mediaType !== 'tv_show') {
        setMediaType('tv_show');
      }
    }
    
    setTmdbResults([]);
  };

  // Reset Add Form
  const resetForm = () => {
    setTitle('');
    setMediaType('movie');
    setMediaStatus('planning');
    setCurrentProgress(0);
    setTotalUnits(1);
    setRating(0);
    setCoverImage('');
    setGenres([]);
    setSelectedTmdbId(null);
    setTmdbResults([]);
  };

  // Submit new Media
  const handleEstablishSync = async () => {
    if (!title.trim()) return;

    const payload = {
      title,
      type: mediaType,
      status: mediaStatus,
      current_progress: Number(currentProgress),
      total_units: Number(totalUnits),
      rating: Number(rating),
      cover_image: coverImage || undefined,
      genres,
      tmdb_id: selectedTmdbId || undefined
    };

    try {
      const newMedia = await addMedia(payload);
      setMediaList([newMedia, ...mediaList]);
      setIsModalOpen(false);
      resetForm();
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to establish sync');
    }
  };

  // Quick increment progress
  const handleIncrementProgress = async (e: React.MouseEvent, media: MediaItem) => {
    e.stopPropagation();
    if (media.currentProgress >= media.totalUnits) return;

    const nextProgress = media.currentProgress + 1;
    const isCompleted = nextProgress === media.totalUnits;
    const updatePayload = {
      current_progress: nextProgress,
      status: isCompleted ? 'completed' : media.status
    };

    try {
      const updated = await updateMedia(media.id, updatePayload);
      setMediaList(mediaList.map(m => m.id === media.id ? updated : m));
    } catch (err) {
      console.error('Failed to increment progress:', err);
    }
  };

  // Quick decrement progress
  const handleDecrementProgress = async (e: React.MouseEvent, media: MediaItem) => {
    e.stopPropagation();
    if (media.currentProgress <= 0) return;

    const nextProgress = media.currentProgress - 1;
    const updatePayload = {
      current_progress: nextProgress
    };

    try {
      const updated = await updateMedia(media.id, updatePayload);
      setMediaList(mediaList.map(m => m.id === media.id ? updated : m));
    } catch (err) {
      console.error('Failed to decrement progress:', err);
    }
  };

  // Card status change
  const handleStatusChange = async (e: React.MouseEvent, media: MediaItem, newStatus: MediaStatus) => {
    e.stopPropagation();
    setActiveMenuId(null);
    
    const updatePayload: any = { status: newStatus };
    if (newStatus === 'completed') {
      updatePayload.current_progress = media.totalUnits;
    }

    try {
      const updated = await updateMedia(media.id, updatePayload);
      setMediaList(mediaList.map(m => m.id === media.id ? updated : m));
    } catch (err) {
      console.error('Failed to update status:', err);
    }
  };

  // Card deletion
  const handleDelete = async (e: React.MouseEvent, mediaId: string) => {
    e.stopPropagation();
    setActiveMenuId(null);
    if (!confirm('Are you sure you want to remove this media tracking item?')) return;

    try {
      await deleteMedia(mediaId);
      setMediaList(mediaList.filter(m => m.id !== mediaId));
    } catch (err) {
      console.error('Failed to delete media:', err);
    }
  };

  const tabs: { id: MediaType | 'all'; label: string; icon: any }[] = [
    { id: 'all', label: 'All', icon: History },
    { id: 'movie', label: 'Movies', icon: Film },
    { id: 'anime', label: 'Anime', icon: PlayCircle },
    { id: 'manga', label: 'Manga', icon: BookOpen },
    { id: 'tv_show', label: 'TV Shows', icon: Tv },
  ];

  const filteredMedia = mediaList.filter(item => 
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
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
              <span className="px-1.5 py-0.5 rounded bg-purple-500/10 border border-purple-500/20 text-[9px] font-black text-purple-400 uppercase tracking-widest">Dimension Media</span>
            </div>
            <h1 className="text-3xl font-black tracking-tight text-white/90">Pulse Library</h1>
            <p className="text-white/40 text-sm font-medium">Track your immersion across digital entertainment dimensions</p>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative group">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 group-focus-within:text-purple-400 transition-colors" />
              <input
                type="text"
                placeholder="Quick search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-white/5 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-sm font-bold w-40 focus:w-60 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all placeholder:text-white/10"
              />
            </div>
            <ButtonX icon={Plus} size="sm" variant="primary" onClick={() => { resetForm(); setIsModalOpen(true); }}>
              Track
            </ButtonX>
          </div>
        </header>

        {/* Categories & Stats Row */}
        <div className="flex flex-col xl:flex-row gap-6 mb-8">
          <div className="flex-1">
            <div className="flex flex-wrap gap-1.5 p-1 glass rounded-xl w-fit">
              {tabs.map((tab) => (
                <ButtonX
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-lg text-[11px] font-black uppercase tracking-wider transition-all duration-300",
                    activeTab === tab.id
                      ? "bg-white/10 text-white shadow-lg"
                      : "text-white/30 hover:text-white/60"
                  )}
                >
                  <tab.icon className="w-3.5 h-3.5" />
                  {tab.label}
                </ButtonX>
              ))}
            </div>
          </div>

          <div className="flex gap-4 overflow-x-auto pb-2 xl:pb-0 no-scrollbar">
            <MiniStat label="Total" value={mediaList.length} color="text-indigo-400" />
            <MiniStat label="Active" value={mediaList.filter(m => m.status === 'active').length} color="text-emerald-400" />
            <MiniStat label="Done" value={mediaList.filter(m => m.status === 'completed').length} color="text-purple-400" />
          </div>
        </div>

        {/* Media Grid */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <Loader2 className="w-8 h-8 text-purple-500 animate-spin" />
            <p className="text-xs text-white/30 font-bold uppercase tracking-widest">Loading Library...</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-5">
            <AnimatePresence mode="popLayout">
              {filteredMedia.map((media, i) => (
                <motion.div
                  key={media.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3, delay: i * 0.03 }}
                  className="group flex flex-col"
                >
                  <div className="glass rounded-2xl overflow-hidden border border-white/5 hover:border-white/20 transition-all flex flex-col h-full shadow-xl">
                    <div className="relative aspect-[3/3] overflow-hidden bg-white/5">
                      {media.coverImage ? (
                        <img
                          src={media.coverImage}
                          alt={media.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-white/10">
                          {React.createElement(typeIcons[media.type] || Film, { className: "w-12 h-12" })}
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

                      <div className="absolute top-2 right-2">
                        <div className="glass px-2 py-1 rounded-lg flex items-center gap-1 border-white/10 backdrop-blur-md">
                          <Star className="w-2.5 h-2.5 text-amber-400 fill-amber-400" />
                          <span className="text-[10px] font-black">{media.rating}</span>
                        </div>
                      </div>

                      <div className={cn(
                        "absolute bottom-3 left-3 px-2 py-0.5 rounded-md text-[8px] font-black uppercase tracking-widest border backdrop-blur-md",
                        statusColors[media.status]
                      )}>
                        {media.status}
                      </div>
                    </div>

                    <div className="p-4 flex-1 flex flex-col justify-between">
                      <div className="mb-3">
                        <h3 className="text-sm font-bold tracking-tight line-clamp-1 group-hover:text-purple-400 transition-colors mb-1">
                          {media.title}
                        </h3>
                        <div className="flex items-center gap-1.5 opacity-30">
                          {React.createElement(typeIcons[media.type] || Film, { className: "w-2.5 h-2.5" })}
                          <span className="text-[9px] font-bold uppercase tracking-wider">{media.type.replace('_', ' ')}</span>
                        </div>
                      </div>

                      <div className="space-y-2.5">
                        <div className="flex justify-between items-center text-[9px] font-black uppercase tracking-wider">
                          <div className="text-white/40 flex items-center gap-1">
                            <ButtonX
                              onClick={(e) => handleDecrementProgress(e, media)}
                              disabled={media.currentProgress <= 0}
                              className="w-4 h-4 rounded bg-white/5 hover:bg-white/10 active:scale-90 flex items-center justify-center font-bold text-white text-[10px] disabled:opacity-20 transition-all"
                            >
                              -
                            </ButtonX>
                            <span className="text-white/80 px-1 font-bold text-[10px]">{media.currentProgress}</span>
                            <span className="text-white/10">/</span>
                            <span>{media.totalUnits}</span>
                            <ButtonX
                              onClick={(e) => handleIncrementProgress(e, media)}
                              disabled={media.currentProgress >= media.totalUnits}
                              className="w-4 h-4 rounded bg-white/5 hover:bg-white/10 active:scale-90 flex items-center justify-center font-bold text-white text-[10px] disabled:opacity-20 transition-all"
                            >
                              +
                            </ButtonX>
                          </div>
                          <div className="text-purple-400/80">{Math.round((media.currentProgress / Math.max(media.totalUnits, 1)) * 100)}%</div>
                        </div>

                        <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${(media.currentProgress / Math.max(media.totalUnits, 1)) * 100}%` }}
                            className="h-full bg-gradient-to-r from-purple-600 to-indigo-500 rounded-full"
                          />
                        </div>

                        <div className="flex items-center justify-between pt-2 border-t border-white/5 opacity-40 group-hover:opacity-100 transition-opacity relative">
                          <div className="text-[8px] font-bold flex items-center gap-1">
                            <History className="w-2.5 h-2.5" />
                            {media.lastUpdated}
                          </div>
                          <ButtonX
                            onClick={(e) => {
                              e.stopPropagation();
                              setActiveMenuId(activeMenuId === media.id ? null : media.id);
                            }}
                            className="p-1 hover:bg-white/10 rounded-md transition-colors"
                          >
                            <MoreVertical className="w-3.5 h-3.5" />
                          </ButtonX>

                          {activeMenuId === media.id && (
                            <div className="absolute right-0 bottom-8 z-50 glass border border-white/10 rounded-xl shadow-2xl p-1.5 min-w-[120px] space-y-1">
                              <p className="text-[7px] font-black uppercase tracking-wider text-white/20 px-2 py-0.5">Status</p>
                              {(['planning', 'active', 'completed', 'paused'] as MediaStatus[]).map((status) => (
                                <ButtonX
                                  key={status}
                                  onClick={(e) => handleStatusChange(e, media, status)}
                                  className={cn(
                                    "w-full text-left text-[9px] font-bold px-2 py-1 rounded transition-colors uppercase tracking-wider",
                                    media.status === status ? "bg-purple-600/80 text-white" : "text-white/60 hover:bg-white/5 hover:text-white"
                                  )}
                                >
                                  {status}
                                </ButtonX>
                              ))}
                              <div className="border-t border-white/5 my-1" />
                              <ButtonX
                                onClick={(e) => handleDelete(e, media.id)}
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
                onClick={() => { resetForm(); setIsModalOpen(true); }}
                className="border border-dashed border-white/10 rounded-2xl flex flex-col items-center justify-center p-6 hover:bg-white/5 hover:border-white/20 transition-all cursor-pointer group min-h-[280px]"
              >
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center mb-3 group-hover:scale-110 group-hover:bg-purple-500/10 transition-all">
                  <Plus className="w-5 h-5 text-white/20 group-hover:text-purple-400" />
                </div>
                <p className="text-[11px] font-black uppercase tracking-widest text-white/20 group-hover:text-white/40">Add New</p>
              </motion.div>
            </AnimatePresence>
          </div>
        )}

        <ModalX
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Leisure Sync"
        >
          <div className="space-y-4">
            <div className="space-y-1.5 relative">
              <label className="text-[10px] font-black uppercase tracking-wider text-white/30 ml-1">Title</label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Ex: Berserk, Inception..."
                  value={title}
                  onChange={handleTitleChange}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearchTMDB()}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm font-bold focus:ring-1 focus:ring-purple-500/50 outline-none transition-all placeholder:text-white/10 pr-12"
                />
                <div className="absolute right-3.5 top-1/2 -translate-y-1/2">
                  {isSearchingTmdb ? (
                    <Loader2 className="w-4 h-4 text-purple-500 animate-spin" />
                  ) : (
                    <ButtonX
                      onClick={handleSearchTMDB}
                      className="text-white/30 hover:text-purple-400 transition-colors p-0.5"
                    >
                      <Search className="w-4 h-4" />
                    </ButtonX>
                  )}
                </div>
              </div>

              {/* TMDB Search results list */}
              {tmdbResults.length > 0 && (
                <div className="absolute left-0 right-0 top-full mt-1.5 z-50 glass border border-white/10 rounded-xl overflow-hidden max-h-52 overflow-y-auto custom-scrollbar p-1 shadow-2xl">
                  {tmdbResults.map((result) => (
                    <div
                      key={result.tmdb_id}
                      onClick={() => handleSelectTmdb(result)}
                      className="flex items-center gap-3 p-2 hover:bg-white/5 rounded-lg cursor-pointer transition-colors"
                    >
                      {result.cover_image ? (
                        <img src={result.cover_image} alt="" className="w-7 h-9 object-cover rounded" />
                      ) : (
                        <div className="w-7 h-9 bg-white/5 rounded flex items-center justify-center">
                          <Film className="w-3.5 h-3.5 text-white/20" />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold text-white truncate">{result.title}</p>
                        <p className="text-[9px] text-white/40 uppercase font-black">
                          {result.type.replace('_', ' ')} • {result.release_date ? result.release_date.split('-')[0] : 'N/A'}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Selected TMDB Indicator */}
            {selectedTmdbId && (
              <div className="glass border border-purple-500/20 bg-purple-500/5 p-3 rounded-xl flex items-center gap-3">
                {coverImage ? (
                  <img src={coverImage} alt="" className="w-10 h-12 object-cover rounded-lg" />
                ) : (
                  <div className="w-10 h-12 bg-white/5 rounded-lg flex items-center justify-center">
                    <Film className="w-4 h-4 text-white/20" />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <span className="px-1.5 py-0.5 rounded bg-purple-500/20 text-[7px] font-black text-purple-300 uppercase tracking-widest block w-fit mb-1">TMDB Connected</span>
                  <p className="text-xs font-bold text-white truncate">{title}</p>
                  <p className="text-[9px] text-white/40 uppercase font-black">{mediaType.replace('_', ' ')}</p>
                </div>
                <ButtonX
                  onClick={() => {
                    setSelectedTmdbId(null);
                    setCoverImage('');
                    setGenres([]);
                  }}
                  className="text-[10px] text-purple-400 hover:text-purple-300 font-bold uppercase tracking-wider px-2 py-1 rounded hover:bg-purple-500/10 transition-colors"
                >
                  Unlink
                </ButtonX>
              </div>
            )}

            <div className="grid grid-cols-2 gap-3">
              <DropdownX
                label="Type"
                value={mediaType}
                onChange={setMediaType}
                options={[
                  { label: 'Movie', value: 'movie', icon: Film },
                  { label: 'Anime', value: 'anime', icon: PlayCircle },
                  { label: 'Manga', value: 'manga', icon: BookOpen },
                  { label: 'TV Show', value: 'tv_show', icon: Tv },
                ]}
              />
              <DropdownX
                label="Status"
                value={mediaStatus}
                onChange={setMediaStatus}
                options={[
                  { label: 'Planning', value: 'planning', icon: Clock },
                  { label: 'Active', value: 'active', icon: TrendingUp },
                  { label: 'Completed', value: 'completed', icon: CheckCircle2 },
                ]}
              />
            </div>

            {/* Manual Fields (only visible if TMDB is not connected or manga is selected) */}
            {(!selectedTmdbId || mediaType === 'manga') && (
              <div className="grid grid-cols-2 gap-3 pt-2 border-t border-white/5">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase tracking-wider text-white/30 ml-1">Total Units (Ep/Vol)</label>
                  <input
                    type="number"
                    value={totalUnits}
                    onChange={(e) => setTotalUnits(Math.max(1, Number(e.target.value)))}
                    min={1}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm font-bold focus:ring-1 focus:ring-purple-500/50 outline-none transition-all placeholder:text-white/10"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase tracking-wider text-white/30 ml-1">Cover Image URL</label>
                  <input
                    type="text"
                    placeholder="https://..."
                    value={coverImage}
                    onChange={(e) => setCoverImage(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm font-bold focus:ring-1 focus:ring-purple-500/50 outline-none transition-all placeholder:text-white/10"
                  />
                </div>
              </div>
            )}

            <div className="pt-4 flex gap-2">
              <ButtonX variant="ghost" className="flex-1 h-11 rounded-xl font-bold" onClick={() => setIsModalOpen(false)}>Cancel</ButtonX>
              <ButtonX variant="primary" className="flex-1 h-11 rounded-xl font-black uppercase tracking-widest text-[10px] bg-purple-600" onClick={handleEstablishSync}>Establish Sync</ButtonX>
            </div>
          </div>
        </ModalX>
      </motion.div>
    </div>
  );
}

function MiniStat({ label, value, color }: any) {
  return (
    <div className="glass px-4 py-2 rounded-xl flex flex-col min-w-[80px]">
      <span className="text-[8px] font-black uppercase tracking-widest text-white/20 mb-0.5">{label}</span>
      <span className={cn("text-lg font-black tracking-tight", color)}>{value}</span>
    </div>
  );
}
