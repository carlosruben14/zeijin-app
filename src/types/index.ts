/**
 * Shared TypeScript type definitions for the Zeijin app
 */

/**
 * Game pricing package
 */
export interface PricingPackage {
  amount: string;
  price: number;
  currency?: string;
}

/**
 * Pricing section for games with multiple categories
 */
export interface PricingSection {
  title: string;
  type?: 'pricing' | 'instructions';
  items?: PricingPackage[];
  content?: string[];
}

/**
 * Game data structure
 */
export interface Game {
  id: number;
  title: string;
  category: 'moba' | 'fps' | 'rpg' | 'strategy' | 'other';
  description: string;
  image: string;
  pricing: PricingPackage[];
  pricingSections?: PricingSection[];
}

/**
 * Wiki search result
 */
export interface WikiSearchResult {
  valid: boolean;
  type: 'hero' | 'item' | 'agent' | 'champion' | 'character';
  game: 'mlbb' | 'valorant' | 'lol' | 'genshin';
  name: string;
  data: Record<string, any>;
  message: string;
}

/**
 * Form validation error
 */
export interface FormErrors {
  [key: string]: string;
}

/**
 * Contact form data
 */
export interface ContactFormData {
  playerName: string;
  playerID: string;
  email: string;
  phone: string;
  message?: string;
}

/**
 * Ask Us / Feature Request form data
 */
export interface AskUsFormData {
  name: string;
  email: string;
  category: 'bug_report' | 'feature_request' | 'question' | 'game_request' | 'other';
  priority: 'low' | 'medium' | 'high';
  subject: string;
  message: string;
  attachment?: File | null;
}

/**
 * IGN validator form data
 */
export interface IGNValidatorData {
  ign: string;
  orderedAmount: string;
  paymentMethod: 'GCash' | 'Maya' | 'Grab' | 'Bank Transfer' | 'Other';
  otherConcern?: string;
}

/**
 * Image loading state tracker
 */
export interface ImageLoadingStates {
  [gameId: number]: boolean;
}

/**
 * Wiki suggestion for search
 */
export interface WikiSuggestion {
  name: string;
  type: string;
}

/**
 * Logger entry for debugging
 */
export interface LogEntry {
  timestamp: string;
  level: 'INFO' | 'WARN' | 'ERROR' | 'DEBUG';
  message: string;
  error?: string;
  context?: Record<string, any>;
  stack?: string;
}

/**
 * Game event
 */
export interface GameEvent {
  id: number;
  game: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  badge: string;
  image?: string;
  wikiUrl?: string;
}

/**
 * Wiki hero data
 */
export interface WikiHeroData {
  hero_id: number;
  hero_name: string;
  hero_title: string;
  role: string;
  specialty: string[];
  hero_type: string;
  [key: string]: any;
}

/**
 * Wiki agent data (Valorant)
 */
export interface WikiAgentData {
  uuid: string;
  displayName: string;
  description: string;
  displayIcon: string;
  fullPortrait: string;
  role?: {
    displayName: string;
    description: string;
  };
  abilities: Array<{
    slot: string;
    displayName: string;
    displayIcon: string;
  }>;
  [key: string]: any;
}

/**
 * Wiki character data (Genshin)
 */
export interface WikiCharacterData {
  name: string;
  title: string;
  vision: string;
  weapon: string;
  rarity: number;
  description: string;
  image?: string;
  [key: string]: any;
}

/**
 * ML Check result for IGN validation
 */
export interface MLCheckResult {
  valid: boolean;
  ign?: string;
  level?: number;
  rankTier?: string;
  avatar?: string;
  country?: string;
  message: string;
}

/**
 * Search type union
 */
export type SearchType = 'hero' | 'agent' | 'character' | 'item';

/**
 * Game type union
 */
export type GameType = 'mlbb' | 'valorant' | 'lol' | 'genshin';

/**
 * Event status
 */
export type EventStatus = 'upcoming' | 'ongoing' | 'ended';
