// Coches especiales que se consiguen SOLO abriendo cajas con llaves (no se cazan por la calle).
// tier 'common'   -> se consiguen con llaves turbocomunes  (marcas más accesibles)
// tier 'epic'     -> se consiguen con llaves turboépicas   (marcas más caras/exclusivas)
// tier 'legendary'-> se consiguen con llaves turbolegendarias (marcas 100% inventadas, súper exclusivas)

export const VAULT_CARS = [
  // --- Comunes: VGT de marcas "más accesibles" ---
  { id: 'porsche_vgt', name: 'Porsche Vision Turbo GT', brand: 'Porsche', tier: 'common', emoji: '🏎️' },
  { id: 'maserati_vgt', name: 'Maserati Fuoco Concept', brand: 'Maserati', tier: 'common', emoji: '🏎️' },
  { id: 'astonmartin_vgt', name: 'Aston Martin Spectre Vision', brand: 'Aston Martin', tier: 'common', emoji: '🏎️' },

  // --- Épicos: VGT de marcas "de gama muy alta" ---
  { id: 'ferrari_vgt', name: 'Ferrari Vision GT', brand: 'Ferrari', tier: 'epic', emoji: '🏁' },
  { id: 'lamborghini_vgt', name: 'Lamborghini Terzo Vision', brand: 'Lamborghini', tier: 'epic', emoji: '🏁' },
  { id: 'bugatti_vgt', name: 'Bugatti Chiron Vision', brand: 'Bugatti', tier: 'epic', emoji: '🏁' },
  { id: 'koenigsegg_vgt', name: 'Koenigsegg Ragnarok Concept', brand: 'Koenigsegg', tier: 'epic', emoji: '🏁' },

  // --- Legendarios: marcas 100% inventadas, imposibles de encontrar en la calle ---
  { id: 'nyxa_specter', name: 'Specter', brand: 'Nyxa', tier: 'legendary', emoji: '👑' },
  { id: 'velocryn_aurora', name: 'Aurora', brand: 'Velocryn', tier: 'legendary', emoji: '👑' },
  { id: 'draco_ombra', name: 'Ombra', brand: 'Draco Motors', tier: 'legendary', emoji: '👑' },
  { id: 'kaion_nova', name: 'Nova', brand: 'Kaion', tier: 'legendary', emoji: '👑' },
  { id: 'zephyra_glaive', name: 'Glaive', brand: 'Zephyra', tier: 'legendary', emoji: '👑' },
];

export function poolByTier(tier) {
  return VAULT_CARS.filter(c => c.tier === tier);
}

export function findVaultCar(id) {
  return VAULT_CARS.find(c => c.id === id);
}

// Monedas de compensación si te toca un coche duplicado
export const DUPLICATE_COMPENSATION = { common: 40, epic: 120, legendary: 400 };
