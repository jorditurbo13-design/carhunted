import { BRANDS, MODELS, ICONIC_LINKS } from './carsData';

function totalCazados(garage) {
  return Object.keys(garage).length;
}
function totalIconicos(garage) {
  return Object.keys(garage).filter(id => ICONIC_LINKS[id]).length;
}
function cazadosDeMarca(garage, brandId) {
  return MODELS[brandId].filter(m => garage[m.id]).length;
}
function marcasConAlMenosUno(garage) {
  return BRANDS.filter(b => MODELS[b.id].some(m => garage[m.id])).length;
}

export const MISSIONS = [
  {
    id: 'caza_3',
    title: 'Primeros pasos',
    description: 'Caza 3 coches (de cualquier marca)',
    target: 3,
    progress: (garage) => totalCazados(garage),
    reward: { coins: 80, xp: 40, keys_common: 0, keys_epic: 0, keys_legendary: 0 },
  },
  {
    id: 'caza_10',
    title: 'Cazador aplicado',
    description: 'Caza 10 coches',
    target: 10,
    progress: (garage) => totalCazados(garage),
    reward: { coins: 200, xp: 100, keys_common: 1, keys_epic: 0, keys_legendary: 0 },
  },
  {
    id: 'caza_20',
    title: 'Ojo de lince',
    description: 'Caza 20 coches',
    target: 20,
    progress: (garage) => totalCazados(garage),
    reward: { coins: 400, xp: 200, keys_common: 2, keys_epic: 0, keys_legendary: 0 },
  },
  {
    id: 'iconicos_3',
    title: 'Leyendas sobre ruedas',
    description: 'Caza 3 coches icónicos',
    target: 3,
    progress: (garage) => totalIconicos(garage),
    reward: { coins: 300, xp: 150, keys_common: 0, keys_epic: 1, keys_legendary: 0 },
  },
  {
    id: 'iconicos_todos',
    title: 'Salón de la fama',
    description: 'Caza TODOS los coches icónicos',
    target: Object.keys(ICONIC_LINKS).length,
    progress: (garage) => totalIconicos(garage),
    reward: { coins: 800, xp: 400, keys_common: 0, keys_epic: 1, keys_legendary: 1 },
  },
  {
    id: 'marca_ferrari',
    title: 'Rojo pasión',
    description: 'Caza todos los Ferrari del listado',
    target: MODELS.ferrari.length,
    progress: (garage) => cazadosDeMarca(garage, 'ferrari'),
    reward: { coins: 250, xp: 120, keys_common: 1, keys_epic: 0, keys_legendary: 0 },
  },
  {
    id: 'marca_lamborghini',
    title: 'El toro embiste',
    description: 'Caza todos los Lamborghini del listado',
    target: MODELS.lamborghini.length,
    progress: (garage) => cazadosDeMarca(garage, 'lamborghini'),
    reward: { coins: 250, xp: 120, keys_common: 1, keys_epic: 0, keys_legendary: 0 },
  },
  {
    id: 'todas_las_marcas',
    title: 'Coleccionista completo',
    description: 'Caza al menos 1 coche de cada marca',
    target: BRANDS.length,
    progress: (garage) => marcasConAlMenosUno(garage),
    reward: { coins: 500, xp: 250, keys_common: 0, keys_epic: 2, keys_legendary: 0 },
  },
];
