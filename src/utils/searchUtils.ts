/**
 * Search and matching utility functions
 */

/**
 * Calculate string similarity using Levenshtein distance (0-1 scale)
 */
export const calculateSimilarity = (str1: string, str2: string): number => {
  const s1 = str1.toLowerCase();
  const s2 = str2.toLowerCase();

  // Exact match or substring match
  if (s1 === s2 || s1.includes(s2) || s2.includes(s1)) return 1;

  // Levenshtein distance
  const matrix: number[][] = Array(s2.length + 1)
    .fill(null)
    .map(() => Array(s1.length + 1).fill(0));

  for (let i = 0; i <= s1.length; i++) matrix[0][i] = i;
  for (let j = 0; j <= s2.length; j++) matrix[j][0] = j;

  for (let j = 1; j <= s2.length; j++) {
    for (let i = 1; i <= s1.length; i++) {
      const indicator = s1[i - 1] === s2[j - 1] ? 0 : 1;
      matrix[j][i] = Math.min(
        matrix[j][i - 1] + 1, // insertion
        matrix[j - 1][i] + 1, // deletion
        matrix[j - 1][i - 1] + indicator // substitution
      );
    }
  }

  const distance = matrix[s2.length][s1.length];
  const maxLen = Math.max(s1.length, s2.length);

  // Convert distance to similarity (0-1)
  return 1 - distance / maxLen;
};

/**
 * Find closest match from array based on query string
 */
export const findClosestMatch = <T,>(
  query: string,
  array: T[],
  getNameFn: (item: T) => string,
  threshold: number = 0.75
): T | null => {
  let bestMatch: T | null = null;
  let bestScore = 0;

  for (const item of array) {
    const name = getNameFn(item);
    const score = calculateSimilarity(query, name);
    if (score > bestScore && score > threshold) {
      bestScore = score;
      bestMatch = item;
    }
  }

  return bestMatch;
};

/**
 * Calculate event status based on dates
 */
export const getEventStatus = (
  startDate: string,
  endDate: string
): 'upcoming' | 'ongoing' | 'ended' => {
  const today = new Date();
  const start = new Date(startDate);
  const end = new Date(endDate);

  if (today < start) return 'upcoming';
  if (today > end) return 'ended';
  return 'ongoing';
};

/**
 * Calculate days remaining until event end
 */
export const calculateDaysLeft = (endDate: string): number => {
  const end = new Date(endDate);
  const today = new Date();
  return Math.ceil((end.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
};
