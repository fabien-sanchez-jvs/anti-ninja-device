interface selectNinjaOptions {
    chanceToHaveNinja?: number; // percentage chance to have a ninja
}

/**
 * Sélectionne un ninja aléatoire parmi les participants
 */
export const selectNinja = (participants: string[], options?: selectNinjaOptions): string | null => {
  const chanceToHaveNinja = options?.chanceToHaveNinja ?? 2;
  if (participants.length < 4) return null;
  const hasNinja = Math.random() * 100 < chanceToHaveNinja; 
  if (!hasNinja) return null;
  const randomIndex = Math.floor(Math.random() * participants.length);
  return participants[randomIndex];
};
