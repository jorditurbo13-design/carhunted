export const BRANDS = [
  { id: 'ferrari', name: 'Ferrari', badge: '🐎' },
  { id: 'lamborghini', name: 'Lamborghini', badge: '🐂' },
  { id: 'porsche', name: 'Porsche', badge: '🛡️' },
  { id: 'koenigsegg', name: 'Koenigsegg', badge: '👑' },
  { id: 'bugatti', name: 'Bugatti', badge: '◆' },
  { id: 'maserati', name: 'Maserati', badge: '🔱' },
  { id: 'astonmartin', name: 'Aston Martin', badge: '🦅' },
  { id: 'mclaren', name: 'McLaren', badge: '🧡' },
  { id: 'pagani', name: 'Pagani', badge: '💨' },
  { id: 'mercedesamg', name: 'Mercedes-AMG', badge: '⭐' },
  { id: 'bmwm', name: 'BMW M', badge: '🔵' },
  { id: 'nissan', name: 'Nissan', badge: '🔴' },
  { id: 'chevrolet', name: 'Chevrolet', badge: '🏁' },
];

export const MODELS = {
  ferrari: [
    { id: 'f40', name: 'F40', chassis: '1987–1992' },
    { id: 'enzo', name: 'Enzo', chassis: '2002–2004' },
    { id: 'testarossa', name: 'Testarossa', chassis: '1984–1996' },
    { id: '488gtb', name: '488 GTB', chassis: '2015–2019' },
    { id: 'sf90', name: 'SF90 Stradale', chassis: '2019–hoy' },
    { id: '812superfast', name: '812 Superfast', chassis: '2017–2022' },
  ],
  lamborghini: [
    { id: 'countach', name: 'Countach', chassis: '1974–1990' },
    { id: 'miura', name: 'Miura', chassis: '1966–1973' },
    { id: 'diablo', name: 'Diablo', chassis: '1990–2001' },
    { id: 'huracan', name: 'Huracán', chassis: '2014–hoy' },
    { id: 'aventador', name: 'Aventador', chassis: '2011–2022' },
    { id: 'urus', name: 'Urus', chassis: '2018–hoy' },
  ],
  porsche: [
    { id: '911', name: '911 (964)', chassis: '1989–1994' },
    { id: '959', name: '959', chassis: '1986–1988' },
    { id: '918spyder', name: '918 Spyder', chassis: '2013–2015' },
    { id: 'cayman', name: 'Cayman GT4', chassis: '2015–hoy' },
    { id: 'cayenneturbo', name: 'Cayenne Turbo', chassis: '2002–hoy' },
  ],
  koenigsegg: [
    { id: 'jesko', name: 'Jesko', chassis: '2019–hoy' },
    { id: 'agera', name: 'Agera RS', chassis: '2015–2018' },
    { id: 'regera', name: 'Regera', chassis: '2015–hoy' },
  ],
  bugatti: [
    { id: 'veyron', name: 'Veyron', chassis: '2005–2015' },
    { id: 'chiron', name: 'Chiron', chassis: '2016–hoy' },
    { id: 'divo', name: 'Divo', chassis: '2018–2021' },
  ],
  maserati: [
    { id: 'ghibli', name: 'Ghibli (AM115)', chassis: '1966–1973' },
    { id: 'mc20', name: 'MC20', chassis: '2020–hoy' },
    { id: 'granturismo', name: 'GranTurismo', chassis: '2007–2019' },
  ],
  astonmartin: [
    { id: 'db5', name: 'DB5', chassis: '1963–1965' },
    { id: 'vantage', name: 'Vantage', chassis: '2018–hoy' },
    { id: 'dbssuperleggera', name: 'DBS Superleggera', chassis: '2018–hoy' },
  ],
  mclaren: [
    { id: 'mclarenf1', name: 'F1', chassis: '1992–1998' },
    { id: '720s', name: '720S', chassis: '2017–2021' },
    { id: 'senna', name: 'Senna', chassis: '2018–2019' },
  ],
  pagani: [
    { id: 'zonda', name: 'Zonda', chassis: '1999–2018' },
    { id: 'huayra', name: 'Huayra', chassis: '2011–hoy' },
  ],
  mercedesamg: [
    { id: 'sl300', name: '300 SL "Alas de Gaviota"', chassis: '1954–1957' },
    { id: 'amggt', name: 'AMG GT', chassis: '2014–hoy' },
    { id: 'projectone', name: 'AMG ONE', chassis: '2022–hoy' },
  ],
  bmwm: [
    { id: 'm3e30', name: 'M3 (E30)', chassis: '1986–1991' },
    { id: 'm4competition', name: 'M4 Competition', chassis: '2020–hoy' },
    { id: 'm5', name: 'M5', chassis: '1984–hoy' },
  ],
  nissan: [
    { id: 'gtr34', name: 'GT-R R34 "Skyline"', chassis: '1999–2002' },
    { id: 'gtr35', name: 'GT-R R35', chassis: '2007–hoy' },
  ],
  chevrolet: [
    { id: 'corvettec8', name: 'Corvette C8', chassis: '2019–hoy' },
    { id: 'camaroZL1', name: 'Camaro ZL1', chassis: '2016–hoy' },
  ],
};

// modelo -> ficha de icónico (se marca solo al cazarlo desde "Marcas")
export const ICONIC_LINKS = {
  f40: { brand: 'ferrari', label: 'Ferrari F40' },
  enzo: { brand: 'ferrari', label: 'Ferrari Enzo' },
  countach: { brand: 'lamborghini', label: 'Lamborghini Countach' },
  miura: { brand: 'lamborghini', label: 'Lamborghini Miura' },
  959: { brand: 'porsche', label: 'Porsche 959' },
  db5: { brand: 'astonmartin', label: 'Aston Martin DB5' },
  veyron: { brand: 'bugatti', label: 'Bugatti Veyron' },
  mclarenf1: { brand: 'mclaren', label: 'McLaren F1' },
  zonda: { brand: 'pagani', label: 'Pagani Zonda' },
  sl300: { brand: 'mercedesamg', label: 'Mercedes 300 SL' },
  gtr34: { brand: 'nissan', label: 'Nissan GT-R R34' },
};

// icónicos de marcas que todavía no están en la lista (por si se amplía más adelante)
export const ICONIC_EXTRA = [];
