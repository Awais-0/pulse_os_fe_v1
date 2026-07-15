import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  LayoutDashboard,
  Wallet,
  HeartPulse,
  Gamepad2,
  Film,
  Target,
  Settings,
  LogOut,
  User,
  Zap,
  ChevronLeft,
  ChevronRight,
  Activity
} from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { Link, useLocation } from 'react-router-dom';

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
  { id: 'productivity', label: 'Productivity', icon: Zap, path: '/productivity' },
  { id: 'finance', label: 'Finance', icon: Wallet, path: '/finance' },
  { id: 'health', label: 'Health', icon: HeartPulse, path: '/health' },
  { id: 'gaming', label: 'Gaming', icon: Gamepad2, path: '/gaming' },
  { id: 'media', label: 'Media', icon: Film, path: '/media' },
  { id: 'goals', label: 'Goals', icon: Target, path: '/goals' },
];

const secondaryItems = [
  { id: 'settings', label: 'Settings', icon: Settings, path: '/settings' },
  // { id: 'profile', label: 'Profile', icon: User, path: '/profile' },
];

export function Sidebar() {
  const location = useLocation();

  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapse = () => setCollapsed(prev => !prev);



  return (
    <aside
      className={cn(
        "h-full glass border-r border-white/5 flex flex-col z-50 transition-all duration-300 ease-in-out",
        collapsed ? "w-20" : "w-72"
      )}
    >
      {/* Logo & Toggle */}
      <div className={cn(
        "p-8 flex items-center transition-all",
        collapsed ? "justify-center" : "justify-between"
      )}>
        <div className={cn(
          "flex items-center gap-3 overflow-hidden",
          collapsed && "justify-center w-full"
        )}>

          {!collapsed ? (
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="font-black text-2xl tracking-tighter bg-gradient-to-r from-white to-white/40 bg-clip-text text-transparent"
            >
              <div className="w-40 h-10 shrink-0 rounded-2xl flex items-center justify-center overflow-hidden">
                <img src="assets/logo/PulseOSWide.png" alt="PulseOS" className="w-full h-full object-cover" />
              </div>
            </motion.span>
          ) : (
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="font-black text-2xl tracking-tighter bg-gradient-to-r from-white to-white/40 bg-clip-text text-transparent"
            >
              <div className="w-10 h-10 shrink-0 rounded-2xl flex items-center justify-center overflow-hidden">
                <img src="assets/logo/PulseOS.png" alt="PulseOS" className="w-full h-full object-cover" />
              </div>
            </motion.span>
          )}
        </div>
        <button
          onClick={toggleCollapse}
          className={cn(
            "text-white/50 hover:text-white transition-all hover:bg-white/10 rounded-lg p-1",
            collapsed && "absolute -right-4 bg-white/10 top-8 shadow-md"
          )}
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>

      <nav className="flex-1 px-4 space-y-2 mt-4 overflow-y-auto custom-scrollbar">
        {/* Main Menu label */}
        {!collapsed && (
          <div className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em] px-4 mb-4">
            Main Menu
          </div>
        )}

        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.id}
              to={item.path}
              className={cn(
                "flex items-center gap-4 px-4 py-3 rounded-2xl transition-all duration-300 group relative",
                "overflow-hidden",
                isActive
                  ? "bg-white/10 text-white shadow-sm"
                  : "text-white/50 hover:text-white hover:bg-white/5",
                collapsed && "justify-center px-2"
              )}
              title={collapsed ? item.label : undefined}
            >
              <item.icon className={cn(
                "w-5 h-5 flex-shrink-0 transition-transform duration-300",
                isActive ? "scale-110" : "group-hover:scale-110"
              )} />
              {!collapsed && (
                <span className="font-medium whitespace-nowrap">{item.label}</span>
              )}
              {isActive && !collapsed && (
                <motion.div
                  layoutId="active-pill"
                  className="absolute left-0 w-1 h-6 bg-indigo-500 rounded-full"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              {isActive && collapsed && (
                <div className="absolute left-0 w-1 h-6 bg-indigo-500 rounded-full" />
              )}
            </Link>
          );
        })}

        {/* Personal label */}
        {!collapsed && (
          <div className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em] px-4 mb-4 mt-8">
            Personal
          </div>
        )}

        {secondaryItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.id}
              to={item.path}
              className={cn(
                "flex items-center gap-4 px-4 py-3 rounded-2xl transition-all duration-300 group",
                collapsed && "justify-center px-2",
                isActive
                  ? "bg-white/10 text-white shadow-sm"
                  : "text-white/50 hover:text-white hover:bg-white/5"
              )}
              title={collapsed ? item.label : undefined}
            >
              <item.icon className="w-5 h-5 flex-shrink-0" />
              {!collapsed && <span className="font-medium whitespace-nowrap">{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Logout button */}
      <div className={cn("p-6", collapsed && "p-4")}>
        <Link
          to='/profile'
          className={cn(
            "flex items-center gap-4 px-4 py-3 rounded-2xl transition-all duration-300 group",
            collapsed && "justify-center px-2",
            location.pathname === '/profile'
              ? "bg-white/10 text-white shadow-sm"
              : "text-white/50 hover:text-white hover:bg-white/5"
          )}
          title={collapsed ? "Profile" : undefined}
        >
          <User className="w-5 h-5 flex-shrink-0" />
          {!collapsed && <span className="font-medium whitespace-nowrap">Profile</span>}
        </Link>
      </div>
    </aside>
  );
}
