import type { ClampPaletteType } from 'global/colors';

export const settings: {
  colors: Record<ClampPaletteType, string>;
} = {
  colors: {
    foreground:
      'bg-foreground placeholder-white text-white border-2 border-transparent hover:border-foreground focus:border-muted',
    muted:
      'bg-muted placeholder-white text-white border-2 border-transparent hover:border-gray focus:border-gray',
    background:
      'bg-background border-2 border-transparent placeholder-white text-white hover:border-foreground focus:border-foreground'
  }
};
