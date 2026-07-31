export const AVATARS = [
  { id: 'avatar_01', emoji: '😎', colors: ['#ff5c5c', '#7a1c14'] },
  { id: 'avatar_02', emoji: '🤓', colors: ['#5cc8ff', '#12507a'] },
  { id: 'avatar_03', emoji: '🥳', colors: ['#ffd75c', '#7a5a1a'] },
  { id: 'avatar_04', emoji: '🦸', colors: ['#7ee08a', '#1f6b3a'] },
  { id: 'avatar_05', emoji: '😺', colors: ['#c084fc', '#5a2a7a'] },
  { id: 'avatar_06', emoji: '🤠', colors: ['#e0a53a', '#5a3d0a'] },
  { id: 'avatar_07', emoji: '👽', colors: ['#4ade80', '#124a2a'] },
  { id: 'avatar_08', emoji: '🥷', colors: ['#8a8d93', '#2a2a2e'] },
];

export function findAvatar(id) {
  return AVATARS.find(a => a.id === id) || AVATARS[0];
}
