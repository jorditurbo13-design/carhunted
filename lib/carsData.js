export const BRANDS = [
  { id: 'ferrari', name: 'Ferrari', badge: '🐎' },
  { id: 'lamborghini', name: 'Lamborghini', badge: '🐂' },
  { id: 'porsche', name: 'Porsche', badge: '🐎' },
  { id: 'koenigsegg', name: 'Koenigsegg', badge: '👑' },
  { id: 'bugatti', name: 'Bugatti', badge: '◆' },
  { id: 'maserati', name: 'Maserati', badge: '▲' },
  { id: 'astonmartin', name: 'Aston Martin', badge: '🦅' },
];

export const MODELS = {
  ferrari: [
    { id: 'f40', name: 'F40', chassis: '1987–1992' },
    { id: 'testarossa', name: 'Testarossa', chassis: '1984–1996' },
    { id: '488gtb', name: '488 GTB', chassis: '2015–2019' },
    { id: 'sf90', name: 'SF90 Stradale', chassis: '2019–hoy' },
  ],
  lamborghini: [
    { id: 'countach', name: 'Countach', chassis: '1974–1990' },
    { id: 'miura', name: 'Miura', chassis: '1966–1973' },
    { id: 'huracan', name: 'Huracán', chassis: '2014–hoy' },
    { id: 'aventador', name: 'Aventador', chassis: '2011–2022' },
  ],
  porsche: [
    { id: '911', name: '911 (964)', chassis: '1989–1994' },
    { id: '959', name: '959', chassis: '1986–1988' },
    { id: 'cayman', name: 'Cayman GT4', chassis: '2015–hoy' },
  ],
  koenigsegg: [
    { id: 'jesko', name: 'Jesko', chassis: '2019–hoy' },
    { id: 'agera', name: 'Agera RS', chassis: '2015–2018' },
  ],
  bugatti: [
    { id: 'veyron', name: 'Veyron', chassis: '2005–2015' },
    { id: 'chiron', name: 'Chiron', chassis: '2016–hoy' },
  ],
  maserati: [
    { id: 'ghibli', name: 'Ghibli (AM115)', chassis: '1966–1973' },
    { id: 'mc20', name: 'MC20', chassis: '2020–hoy' },
  ],
  astonmartin: [
    { id: 'db5', name: 'DB5', chassis: '1963–1965' },
    { id: 'vantage', name: 'Vantage', chassis: '2018–hoy' },
  ],
};

// modelo -> ficha de icónico (se marca solo al cazarlo desde "Marcas")
export const ICONIC_LINKS = {
  f40: { brand: 'ferrari', label: 'Ferrari F40' },
  countach: { brand: 'lamborghini', label: 'Lamborghini Countach' },
  miura: { brand: 'lamborghini', label: 'Lamborghini Miura' },
  959: { brand: 'porsche', label: 'Porsche 959' },
  db5: { brand: 'astonmartin', label: 'Aston Martin DB5' },
  veyron: { brand: 'bugatti', label: 'Bugatti Veyron' },
};

// icónicos de marcas que todavía no están en la lista (ej: Mazda MX-5)
export const ICONIC_EXTRA = [
  { id: 'mx5', label: 'Mazda MX-5', note: 'añade la marca Mazda para poder cazarlo' },
];
