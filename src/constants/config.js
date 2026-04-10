// API Endpoints
export const API_ENDPOINTS = {
  MLBB_HEROES: import.meta.env.VITE_MLBB_HEROES_API || '/api/heroes',
  MLBB_EQUIPMENT: import.meta.env.VITE_MLBB_EQUIPMENT_API || '/api/equipment',
  VALORANT_AGENTS: import.meta.env.VITE_VALORANT_AGENTS_API || 'https://valorant-api.com/v1/agents',
  GENSHIN_CHARACTERS: import.meta.env.VITE_GENSHIN_CHARACTERS_API || 'https://genshin.jmp.blue/characters',
  LOL_CHAMPIONS: import.meta.env.VITE_LOL_CHAMPIONS_API || 'https://ddragon.leagueoflegends.com/cdn/14.1.1/data/en_US/champion.json',
  LOL_ITEMS: import.meta.env.VITE_LOL_ITEMS_API || 'https://ddragon.leagueoflegends.com/cdn/14.1.1/data/en_US/item.json',
};

// Social Media Links
export const SOCIAL_LINKS = {
  MESSENGER: import.meta.env.VITE_MESSENGER_URL || 'https://m.me/ZeijinDiscountedTopUpSalePH',
  FACEBOOK: import.meta.env.VITE_FACEBOOK_URL || 'https://www.facebook.com/ZeijinDiscountedTopUpSalePH',
  TELEGRAM: import.meta.env.VITE_TELEGRAM_URL || 'https://t.me/Zeijin_Discounted_Top_Up_Sale_PH',
  INSTAGRAM: import.meta.env.VITE_INSTAGRAM_URL || 'https://www.instagram.com/zeijindiscountedgame',
  BROADCAST: 'https://m.me/j/AbYX1OEPa00PufWZ/',
};

// UI Colors
export const COLORS = {
  PRIMARY: '#ff3333',
  SUCCESS: '#00ff88',
  WARNING: '#ffa500',
  SECONDARY: '#6496ff',
};

// Responsive Breakpoints
export const BREAKPOINTS = {
  MOBILE: parseInt(import.meta.env.VITE_MOBILE_BREAKPOINT || '480'),
  TABLET: 768,
  DESKTOP: 1024,
};

// Form Validation
export const VALIDATION = {
  IGN_MAX_LENGTH: 50,
  CONCERN_MAX_LENGTH: 500,
  AMOUNT_MAX: 9999999,
  AMOUNT_MIN: 1,
};

// Search Configuration
export const SEARCH = {
  SIMILARITY_THRESHOLD: 0.75,
  DEBOUNCE_DELAY: 300,
};

// App Information
export const APP_INFO = {
  NAME: import.meta.env.VITE_APP_NAME || 'Zeijin Discounted Top Up Sale PH',
  DESCRIPTION: import.meta.env.VITE_APP_DESCRIPTION || 'Best prices for discounted game currency packages',
  VERSION: '1.0.0',
};

export default {
  API_ENDPOINTS,
  SOCIAL_LINKS,
  COLORS,
  BREAKPOINTS,
  VALIDATION,
  SEARCH,
  APP_INFO,
};
