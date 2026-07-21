export const rarityColors: Record<string, string> = {
  Common: 'text-white/40 bg-white/5 border-white/10',
  Rare: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20',
  Epic: 'text-purple-400 bg-purple-500/10 border-purple-500/20',
  Legendary: 'text-amber-400 bg-amber-500/10 border-amber-500/20 shadow-[0_0_15px_rgba(245,158,11,0.1)]',
};

export const rarityFromPercent = (pct: string): string => {
      const n = parseFloat(pct);
      if (isNaN(n)) return 'Common';
      if (n < 5) return 'Legendary';
      if (n < 15) return 'Epic';
      if (n < 40) return 'Rare';
      return 'Common';
    };