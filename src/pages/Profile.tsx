import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import {
  User,
  MapPin,
  Link as LinkIcon,
  Calendar,
  Trophy,
  Zap,
  Flame,
  Github,
  Twitter,
  Linkedin,
  Clock,
  LogOut,
  Target,
  Mail,
  Edit2,
  Camera,
  ChevronRight,
  Star,
  Briefcase,
  Info
} from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { ButtonX } from '@/src/components/custom-antd/ButtonX';
import { ModalX } from '@/src/components/custom-antd/ModalX';
import { getProfile, updateProfile, uploadAvatar, uploadBanner } from '@/src/lib/api';
import { useNavigate } from 'react-router-dom';
import Loader from '@/src/components/custom-antd/LoaderX';

export function Profile() {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isBannerModalOpen, setIsBannerModalOpen] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const avatarInputRef = useRef<HTMLInputElement>(null);
  const bannerInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const bannerTemplates = [
    '/assets/banners/banner1.jpg',
    '/assets/banners/banner2.jpg',
    '/assets/banners/banner3.jpg',
    '/assets/banners/banner4.jpg',
    '/assets/banners/banner5.jpg',
  ];

  // Form state
  const [formData, setFormData] = useState({
    fullname: '',
    occupation: '',
    address: '',
    about: '',
    github_url: '',
    twitter_url: '',
    linkedin_url: ''
  });

  useEffect(() => {
    fetchProfileData();
  }, []);

  const fetchProfileData = async () => {
    try {
      setLoading(true);
      const data = await getProfile();
      setProfile(data);
      setFormData({
        fullname: data.fullname || '',
        occupation: data.occupation || '',
        address: data.address || '',
        about: data.about || '',
        github_url: data.github_url || '',
        twitter_url: data.twitter_url || '',
        linkedin_url: data.linkedin_url || ''
      });
    } catch (error) {
      console.error('Failed to fetch profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsUpdating(true);
      await updateProfile(formData);
      await fetchProfileData();
      setIsEditModalOpen(false);
    } catch (error) {
      console.error('Failed to update profile:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const handleAvatarClick = () => {
    avatarInputRef.current?.click();
  };

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setLoading(true);
      await uploadAvatar(file);
      await fetchProfileData();
    } catch (error) {
      console.error('Failed to upload avatar:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBannerUploadClick = () => {
    bannerInputRef.current?.click();
  };

  const handleBannerChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUpdating(true);
      await uploadBanner(file);
      await fetchProfileData();
      setIsBannerModalOpen(false);
    } catch (error) {
      console.error('Failed to upload banner:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleTemplateSelect = async (url: string) => {
    try {
      setIsUpdating(true);
      await updateProfile({ cover_pic_url: url });
      await fetchProfileData();
      setIsBannerModalOpen(false);
    } catch (error) {
      console.error('Failed to update banner template:', error);
    } finally {
      setIsUpdating(false);
    }
  };
  return (
    <div className="flex-1 h-full overflow-y-auto custom-scrollbar">
      {(loading || isUpdating) && <Loader />}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Banner Section */}
        <div className="h-48 md:h-64 w-full relative overflow-hidden">
          {profile?.cover_pic_url ? (
            <img src={profile.cover_pic_url} alt="Cover" className="w-full h-full object-cover" />
          ) : (
            <div className="absolute inset-0 mesh-gradient opacity-60" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] to-transparent" />
          <ButtonX variant="glass" size="sm" className="absolute top-6 right-8 gap-2 border-white/10" onClick={() => setIsBannerModalOpen(true)}>
            <Camera className="w-4 h-4" />
            Edit Banner
          </ButtonX>

          <input
            type="file"
            ref={avatarInputRef}
            className="hidden"
            accept="image/*"
            onChange={handleAvatarChange}
          />

          <input
            type="file"
            ref={bannerInputRef}
            className="hidden"
            accept="image/*"
            onChange={handleBannerChange}
          />
        </div>

        {/* Profile Info Overlay */}
        <div className="px-8 -mt-20 relative z-10 mb-12">
          <div className="flex flex-col md:flex-row md:items-end gap-6 md:gap-10">
            <div className="relative group">
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-[2.5rem] bg-gradient-to-br from-indigo-500 to-purple-600 border-[6px] border-[#050505] shadow-2xl flex items-center justify-center text-4xl md:text-5xl font-black text-white overflow-hidden">
                {profile?.avatar_url ? (
                  <img src={profile.avatar_url} alt="Avatar" className="w-full h-full object-cover" />
                ) : (
                  profile?.fullname?.split(' ').map((n: string) => n[0]).join('').toUpperCase() || '?'
                )}
              </div>
              <div
                className="absolute inset-0 rounded-[2.5rem] bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer"
                onClick={handleAvatarClick}
              >
                <Camera className="w-8 h-8 text-white" />
              </div>
            </div>

            <div className="flex-1 pb-2">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h1 className="text-4xl font-black tracking-tighter">{profile?.fullname || 'Unnamed User'}</h1>
                    <div className="px-3 py-1 bg-indigo-500/20 text-indigo-400 rounded-full text-[10px] font-black uppercase tracking-widest border border-indigo-500/10">
                      {profile?.membership_status || 'Free'} Member
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm font-bold text-white/40 italic">
                    <div className="flex items-center gap-1.5"><MapPin className="w-4 h-4" /> {profile?.address || 'Location not set'}</div>
                    <div className="flex items-center gap-1.5 text-indigo-400"><Briefcase className="w-4 h-4" /> {profile?.occupation || 'Occupation not set'}</div>
                    <div className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> Joined {profile?.joined_at ? new Date(profile.joined_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : 'Recently'}</div>
                  </div>
                </div>
                <div className="flex gap-3">
                  <ButtonX variant="primary" icon={Edit2} onClick={() => setIsEditModalOpen(true)}>Edit Profile</ButtonX>
                  <ButtonX variant="glass" className="p-3"><Mail className="w-5 h-5" /></ButtonX>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="px-8 grid grid-cols-1 lg:grid-cols-3 gap-8 pb-12">

          {/* Left Column: Stats & About */}
          <div className="space-y-8">
            <section className="glass p-8 rounded-[2.5rem]">
              <h3 className="text-sm font-black uppercase tracking-[0.3em] text-white/20 mb-6">About Me</h3>
              <p className="text-sm font-medium leading-relaxed text-white/60 mb-6 italic">
                {profile?.about || 'No bio provided yet.'}
              </p>
              <div className="flex gap-4">
                {[
                  { Icon: Github, url: profile?.github_url },
                  { Icon: Twitter, url: profile?.twitter_url },
                  { Icon: Linkedin, url: profile?.linkedin_url }
                ].map(({ Icon, url }, i) => (
                  <a
                    key={i}
                    href={url || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      "p-3 rounded-2xl bg-white/5 hover:bg-white/10 hover:text-indigo-400 transition-all",
                      !url && "opacity-20 cursor-not-allowed"
                    )}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </section>

            <section className="glass p-8 rounded-[2.5rem] bg-gradient-to-br from-indigo-500/5 to-purple-600/5 border-indigo-500/10">
              <h3 className="text-sm font-black uppercase tracking-[0.3em] text-white/20 mb-6">Focus Skills</h3>
              <div className="space-y-4">
                {[
                  { label: 'Frontend Dev', level: 92, color: 'bg-indigo-500' },
                  { label: 'UI Design', level: 85, color: 'bg-purple-500' },
                  { label: 'Core Algorithms', level: 78, color: 'bg-emerald-500' },
                  { label: 'Research', level: 65, color: 'bg-amber-500' },
                ].map((skill) => (
                  <div key={skill.label}>
                    <div className="flex justify-between text-xs font-bold mb-2">
                      <span className="text-white/60">{skill.label}</span>
                      <span className="text-indigo-400">{skill.level}%</span>
                    </div>
                    <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.level}%` }}
                        transition={{ duration: 1.5, delay: 0.5 }}
                        className={cn("h-full rounded-full", skill.color)}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section
              className="glass p-5 rounded-[1.5rem] hover:text-red-400 hover:bg-red-500/10 transition-colors duration-300 cursor-pointer text-white/40 flex items-center gap-4"
              onClick={handleLogout}
            >
              <LogOut className="w-5 h-5 flex-shrink-0" />
              <h1 className="font-bold">Logout</h1>
            </section>
          </div>

          {/* Right Column: Achievements & Activity */}
          <div className="lg:col-span-2 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { label: 'All-Time Focus', value: '482h', icon: Clock, color: 'text-indigo-400' },
                { label: 'Total Sessions', value: '156', icon: Target, color: 'text-purple-400' },
                { label: 'Max Streak', value: '24 Days', icon: Flame, color: 'text-orange-500' },
              ].map((stat, i) => (
                <div key={stat.label} className="glass p-6 rounded-[2rem] flex flex-col items-center text-center">
                  <div className={cn("p-3 rounded-2xl bg-white/5 mb-4", stat.color)}>
                    <stat.icon className="w-6 h-6" />
                  </div>
                  <div className="text-2xl font-black tracking-tight">{stat.value}</div>
                  <div className="text-[10px] font-bold uppercase tracking-widest text-white/20">{stat.label}</div>
                </div>
              ))}
            </div>

            <section className="glass p-8 rounded-[2.5rem]">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-sm font-black uppercase tracking-[0.3em] text-white/20">Unlocked Achievements</h3>
                <ButtonX variant="ghost" size="sm">View All</ButtonX>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {[
                  { name: 'Flow State', desc: '4h Deep Work', icon: Zap, color: 'bg-indigo-500/20 text-indigo-400' },
                  { name: 'Night Owl', desc: 'Focus @ 2 AM', icon: Star, color: 'bg-purple-500/20 text-purple-400' },
                  { name: 'Unstoppable', desc: '14 Day Streak', icon: Flame, color: 'bg-orange-500/20 text-orange-500' },
                  { name: 'Grandmaster', desc: '100 Sessions', icon: Trophy, color: 'bg-emerald-500/20 text-emerald-400' },
                ].map((badge) => (
                  <div key={badge.name} className="flex flex-col items-center text-center group">
                    <div className={cn("w-16 h-16 rounded-2xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform shadow-inner", badge.color)}>
                      <badge.icon className="w-8 h-8" />
                    </div>
                    <div className="text-xs font-bold text-white/80">{badge.name}</div>
                    <div className="text-[9px] font-bold text-white/20 uppercase tracking-widest mt-1">{badge.desc}</div>
                  </div>
                ))}
              </div>
            </section>

            <section className="glass p-8 rounded-[2.5rem]">
              <h3 className="text-sm font-black uppercase tracking-[0.3em] text-white/20 mb-8">Recent Milestones</h3>
              <div className="space-y-6">
                {[
                  { title: 'Completed React 19 Integration', time: '2 hours ago', icon: Zap },
                  { title: 'Reached 10h focus goal this week', time: 'Yesterday', icon: Target },
                  { title: 'Unlocked "Flow State" badge', time: '2 days ago', icon: Trophy },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 group">
                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center shrink-0 group-hover:bg-indigo-500/20 transition-colors">
                      <item.icon className="w-5 h-5 text-white/30 group-hover:text-indigo-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-bold text-white/80 truncate">{item.title}</div>
                      <div className="text-[10px] font-bold text-white/20 uppercase tracking-widest">{item.time}</div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-white/10 group-hover:text-white/40" />
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </motion.div>

      {/* Edit Profile Modal */}
      <ModalX
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Edit Personal Velocity"
        size="lg"
      >
        <form onSubmit={handleUpdateProfile} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-1">Full Name</label>
              <div className="relative group">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 group-focus-within:text-indigo-400 transition-colors" />
                <input
                  type="text"
                  value={formData.fullname}
                  onChange={(e) => setFormData({ ...formData, fullname: e.target.value })}
                  placeholder="Your Full Name"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-12 pr-4 focus:outline-none focus:border-indigo-500/50 transition-all font-bold text-sm"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-1">Occupation</label>
              <div className="relative group">
                <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 group-focus-within:text-indigo-400 transition-colors" />
                <input
                  type="text"
                  value={formData.occupation}
                  onChange={(e) => setFormData({ ...formData, occupation: e.target.value })}
                  placeholder="e.g. Software Engineer"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-12 pr-4 focus:outline-none focus:border-indigo-500/50 transition-all font-bold text-sm"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-1">Location</label>
              <div className="relative group">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 group-focus-within:text-indigo-400 transition-colors" />
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="e.g. Islamabad, PK"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-12 pr-4 focus:outline-none focus:border-indigo-500/50 transition-all font-bold text-sm"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-1">GitHub URL</label>
              <div className="relative group">
                <Github className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 group-focus-within:text-indigo-400 transition-colors" />
                <input
                  type="text"
                  value={formData.github_url}
                  onChange={(e) => setFormData({ ...formData, github_url: e.target.value })}
                  placeholder="https://github.com/your-username"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-12 pr-4 focus:outline-none focus:border-indigo-500/50 transition-all font-bold text-sm"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-1">Twitter URL</label>
              <div className="relative group">
                <Twitter className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 group-focus-within:text-indigo-400 transition-colors" />
                <input
                  type="text"
                  value={formData.twitter_url}
                  onChange={(e) => setFormData({ ...formData, twitter_url: e.target.value })}
                  placeholder="https://twitter.com/your-handle"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-12 pr-4 focus:outline-none focus:border-indigo-500/50 transition-all font-bold text-sm"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-1">LinkedIn URL</label>
              <div className="relative group">
                <Linkedin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 group-focus-within:text-indigo-400 transition-colors" />
                <input
                  type="text"
                  value={formData.linkedin_url}
                  onChange={(e) => setFormData({ ...formData, linkedin_url: e.target.value })}
                  placeholder="https://linkedin.com/in/your-profile"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-12 pr-4 focus:outline-none focus:border-indigo-500/50 transition-all font-bold text-sm"
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-1">About / Bio</label>
            <div className="relative group">
              <Info className="absolute left-4 top-4 w-4 h-4 text-white/20 group-focus-within:text-indigo-400 transition-colors" />
              <textarea
                value={formData.about}
                onChange={(e) => setFormData({ ...formData, about: e.target.value })}
                placeholder="Tell us about yourself..."
                rows={4}
                className="w-full bg-white/5 border border-white/10 rounded-[2rem] py-4 pl-12 pr-4 focus:outline-none focus:border-indigo-500/50 transition-all font-bold text-sm resize-none"
              />
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <ButtonX
              type="button"
              variant="glass"
              className="flex-1"
              onClick={() => setIsEditModalOpen(false)}
            >
              Cancel
            </ButtonX>
            <ButtonX
              type="submit"
              variant="primary"
              className="flex-1"
              disabled={isUpdating}
            >
              {isUpdating ? 'Saving...' : 'Save Changes'}
            </ButtonX>
          </div>
        </form>
      </ModalX>

      {/* Banner Edit Modal */}
      <ModalX
        isOpen={isBannerModalOpen}
        onClose={() => setIsBannerModalOpen(false)}
        title="Customize Workspace View"
        size="lg"
      >
        <div className="space-y-8">
          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30 mb-4 ml-1">Pre-added Templates</h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {bannerTemplates.map((url, i) => (
                <ButtonX
                  key={i}
                  onClick={() => handleTemplateSelect(url)}
                  className={cn(
                    "relative aspect-[3/1] rounded-2xl overflow-hidden border-2 transition-all group",
                    profile?.cover_pic_url === url ? "border-indigo-500 scale-[0.98]" : "border-white/5 hover:border-white/20"
                  )}
                >
                  <img src={url} alt={`Template ${i + 1}`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  {profile?.cover_pic_url === url && (
                    <div className="absolute inset-0 bg-indigo-500/20 flex items-center justify-center">
                      <div className="w-6 h-6 rounded-full bg-indigo-500 flex items-center justify-center">
                        <Star className="w-3 h-3 text-white fill-white" />
                      </div>
                    </div>
                  )}
                </ButtonX>
              ))}
              <ButtonX
                onClick={handleBannerUploadClick}
                className="relative aspect-[3/1] rounded-2xl border-2 border-dashed border-white/10 hover:border-indigo-500/50 hover:bg-indigo-500/5 transition-all flex flex-col items-center justify-center gap-2 group"
              >
                <div className="w-8 h-8 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-indigo-500/20 transition-colors">
                  <Camera className="w-4 h-4 text-white/30 group-hover:text-indigo-400" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest text-white/20 group-hover:text-white/40">Upload Custom</span>
              </ButtonX>
            </div>
          </div>

          <div className="p-6 rounded-[2rem] bg-indigo-500/5 border border-indigo-500/10 flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center shrink-0">
              <Zap className="w-6 h-6 text-indigo-400" />
            </div>
            <div>
              <div className="text-sm font-black text-white/80">Pro Tip</div>
              <p className="text-[11px] font-bold text-white/40 leading-relaxed">
                High-resolution cinematic shots (1920x480) work best for maintaining visual velocity across all devices.
              </p>
            </div>
          </div>

          <ButtonX
            variant="glass"
            className="w-full py-4 rounded-2xl text-sm font-black uppercase tracking-widest"
            onClick={() => setIsBannerModalOpen(false)}
          >
            Close
          </ButtonX>
        </div>
      </ModalX>
    </div>
  );
}
