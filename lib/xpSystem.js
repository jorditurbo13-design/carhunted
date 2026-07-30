// XP necesaria para completar un nivel dado (va subiendo poco a poco)
export function xpNeededForLevel(level) {
  return 100 + (level - 1) * 25;
}

// Recompensa que se da al completar un nivel concreto
export function rewardForLevel(level) {
  const reward = { level, coins: 50 + level * 20, keys_common: 0, keys_epic: 0, keys_legendary: 0 };
  if (level % 3 === 0) reward.keys_common = 1;
  if (level % 10 === 0) reward.keys_epic = 1;
  if (level % 100 === 0) reward.keys_legendary = 1;
  return reward;
}

// Aplica la XP ganada por cazar un coche (normal = 1/4 de nivel, icónico = 1/2 de nivel)
// y devuelve el perfil actualizado + qué recompensas se han desbloqueado (para animarlas)
export function grantCarXp(profile, isIconic) {
  let { level, xp, coins, keys_common, keys_epic, keys_legendary } = profile;
  const needed = xpNeededForLevel(level);
  const xpGained = Math.round(needed * (isIconic ? 0.5 : 0.25));
  xp += xpGained;

  const levelUps = [];
  while (xp >= xpNeededForLevel(level)) {
    xp -= xpNeededForLevel(level);
    level += 1;
    const reward = rewardForLevel(level);
    coins += reward.coins;
    keys_common += reward.keys_common;
    keys_epic += reward.keys_epic;
    keys_legendary += reward.keys_legendary;
    levelUps.push(reward);
  }

  return { level, xp, coins, keys_common, keys_epic, keys_legendary, xpGained, levelUps };
}
