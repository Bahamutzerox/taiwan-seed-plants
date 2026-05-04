// ── Configuration ────────────────────────────────────────────────
const CONFIG = {
  speciesUrl: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTRrQG7JtZIPCO5neNhi1qQSxfuCAMhDxl06bDqCeQGfyQVX_iGXodeRshtH7DNZZjCPBggdxr1whbI/pub?gid=156413889&single=true&output=csv',
  refsUrl:    'https://docs.google.com/spreadsheets/d/e/2PACX-1vTRrQG7JtZIPCO5neNhi1qQSxfuCAMhDxl06bDqCeQGfyQVX_iGXodeRshtH7DNZZjCPBggdxr1whbI/pub?gid=988139071&single=true&output=csv',
};

// ── 示範資料（未設定 Google Sheets 時使用）─────────────────────
const SAMPLE_SPECIES = [
  { group_cn:'裸子植物', group_lat:'Gymnosperm', family_cn:'蘇鐵科', family_lat:'Cycadaceae', genus_cn:'蘇鐵屬', genus_lat:'Cycas', species_cn:'蘇鐵', species_lat:'Cycas revoluta', author:'Thunb.', is_exotic:'FALSE', notes:'' },
];
const SAMPLE_REFS = [
  { taxon_lat:'Cycas revoluta', citation:'Chang et al. 2022. Divergence With Gene Flow...', doi:'10.3389/fpls.2022.824158' },
];

// ── APG IV 科別分組對照表 ─────────────────────────────────────
// group: 0=裸子植物 1=被子植物基群 2=單子葉植物 3=真雙子葉植物
// ord: 目中文名  order: 排序用數字
const APG_FAMILY = {
  // 裸子植物
  'Cycadaceae':      { group: 0, ord: '蘇鐵目', order:  1 },
  'Ginkgoaceae':     { group: 0, ord: '銀杏目', order:  2 },
  'Pinaceae':        { group: 0, ord: '松目',   order:  3 },
  'Podocarpaceae':   { group: 0, ord: '松目',   order:  4 },
  'Taxaceae':        { group: 0, ord: '松目',   order:  5 },
  'Cupressaceae':    { group: 0, ord: '松目',   order:  6 },
  'Ephedraceae':     { group: 0, ord: '麻黃目', order:  7 },
  'Gnetaceae':       { group: 0, ord: '麻黃目', order:  8 },

  // 被子植物基群
  'Nymphaeaceae':    { group: 1, ord: '睡蓮目',   order: 10 },
  'Cabombaceae':     { group: 1, ord: '睡蓮目',   order: 11 },
  'Schisandraceae':  { group: 1, ord: '八角目',   order: 20 },
  'Chloranthaceae':  { group: 1, ord: '金粟蘭目', order: 30 },
  'Aristolochiaceae':{ group: 1, ord: '胡椒目',   order: 40 },
  'Piperaceae':      { group: 1, ord: '胡椒目',   order: 41 },
  'Saururaceae':     { group: 1, ord: '胡椒目',   order: 42 },
  'Annonaceae':      { group: 1, ord: '木蘭目',   order: 50 },
  'Magnoliaceae':    { group: 1, ord: '木蘭目',   order: 51 },
  'Myristicaceae':   { group: 1, ord: '木蘭目',   order: 52 },
  'Lauraceae':       { group: 1, ord: '樟目',     order: 60 },
  'Hernandiaceae':   { group: 1, ord: '樟目',     order: 61 },
  'Ceratophyllaceae':{ group: 1, ord: '金魚藻目', order: 70 },

  // 單子葉植物
  'Acoraceae':       { group: 2, ord: '菖蒲目',   order:  10 },
  'Alismataceae':    { group: 2, ord: '澤瀉目',   order:  20 },
  'Aponogetonaceae': { group: 2, ord: '澤瀉目',   order:  21 },
  'Araceae':         { group: 2, ord: '澤瀉目',   order:  22 },
  'Cymodoceaceae':   { group: 2, ord: '澤瀉目',   order:  23 },
  'Hydrocharitaceae':{ group: 2, ord: '澤瀉目',   order:  24 },
  'Potamogetonaceae':{ group: 2, ord: '澤瀉目',   order:  25 },
  'Ruppiaceae':      { group: 2, ord: '澤瀉目',   order:  26 },
  'Zosteraceae':     { group: 2, ord: '澤瀉目',   order:  27 },
  'Petrosaviaceae':  { group: 2, ord: '波葉目',   order:  30 },
  'Burmanniaceae':   { group: 2, ord: '薯蕷目',   order:  40 },
  'Dioscoreaceae':   { group: 2, ord: '薯蕷目',   order:  41 },
  'Nartheciaceae':   { group: 2, ord: '薯蕷目',   order:  42 },
  'Triuridaceae':    { group: 2, ord: '薯蕷目',   order:  43 },
  'Pandanaceae':     { group: 2, ord: '露兜樹目', order:  50 },
  'Stemonaceae':     { group: 2, ord: '露兜樹目', order:  51 },
  'Colchicaceae':    { group: 2, ord: '百合目',   order:  60 },
  'Liliaceae':       { group: 2, ord: '百合目',   order:  61 },
  'Melanthiaceae':   { group: 2, ord: '百合目',   order:  62 },
  'Smilacaceae':     { group: 2, ord: '百合目',   order:  63 },
  'Amaryllidaceae':  { group: 2, ord: '天門冬目', order:  70 },
  'Asparagaceae':    { group: 2, ord: '天門冬目', order:  71 },
  'Asphodelaceae':   { group: 2, ord: '天門冬目', order:  72 },
  'Hypoxidaceae':    { group: 2, ord: '天門冬目', order:  73 },
  'Iridaceae':       { group: 2, ord: '天門冬目', order:  74 },
  'Orchidaceae':     { group: 2, ord: '天門冬目', order:  75 },
  'Arecaceae':       { group: 2, ord: '棕櫚目',   order:  80 },
  'Commelinaceae':   { group: 2, ord: '鴨跖草目', order:  90 },
  'Philydraceae':    { group: 2, ord: '鴨跖草目', order:  91 },
  'Pontederiaceae':  { group: 2, ord: '鴨跖草目', order:  92 },
  'Cyperaceae':      { group: 2, ord: '禾本目',   order: 100 },
  'Eriocaulaceae':   { group: 2, ord: '禾本目',   order: 101 },
  'Flagellariaceae': { group: 2, ord: '禾本目',   order: 102 },
  'Juncaceae':       { group: 2, ord: '禾本目',   order: 103 },
  'Poaceae':         { group: 2, ord: '禾本目',   order: 104 },
  'Typhaceae':       { group: 2, ord: '禾本目',   order: 105 },
  'Xyridaceae':      { group: 2, ord: '禾本目',   order: 106 },
  'Cannaceae':       { group: 2, ord: '薑目',     order: 110 },
  'Costaceae':       { group: 2, ord: '薑目',     order: 111 },
  'Marantaceae':     { group: 2, ord: '薑目',     order: 112 },
  'Musaceae':        { group: 2, ord: '薑目',     order: 113 },
  'Zingiberaceae':   { group: 2, ord: '薑目',     order: 114 },

  // 真雙子葉植物
  'Berberidaceae':   { group: 3, ord: '毛茛目',   order:  10 },
  'Lardizabalaceae': { group: 3, ord: '毛茛目',   order:  11 },
  'Menispermaceae':  { group: 3, ord: '毛茛目',   order:  12 },
  'Papaveraceae':    { group: 3, ord: '毛茛目',   order:  13 },
  'Ranunculaceae':   { group: 3, ord: '毛茛目',   order:  14 },
  'Proteaceae':      { group: 3, ord: '山龍眼目', order:  20 },
  'Sabiaceae':       { group: 3, ord: '山龍眼目', order:  21 },
  'Trochodendraceae':{ group: 3, ord: '昆欄樹目', order:  30 },
  'Buxaceae':        { group: 3, ord: '黃楊目',   order:  40 },
  'Daphniphyllaceae':{ group: 3, ord: '虎皮楠目', order:  50 },
  'Altingiaceae':    { group: 3, ord: '虎耳草目', order:  60 },
  'Crassulaceae':    { group: 3, ord: '虎耳草目', order:  61 },
  'Grossulariaceae': { group: 3, ord: '虎耳草目', order:  62 },
  'Hamamelidaceae':  { group: 3, ord: '虎耳草目', order:  63 },
  'Haloragaceae':    { group: 3, ord: '虎耳草目', order:  64 },
  'Iteaceae':        { group: 3, ord: '虎耳草目', order:  65 },
  'Saxifragaceae':   { group: 3, ord: '虎耳草目', order:  66 },
  'Vitaceae':        { group: 3, ord: '葡萄目',   order:  70 },
  'Zygophyllaceae':  { group: 3, ord: '蒺藜目',   order:  80 },
  'Celastraceae':    { group: 3, ord: '衛矛目',   order:  90 },
  'Connaraceae':     { group: 3, ord: '酢醬草目', order: 100 },
  'Elaeocarpaceae':  { group: 3, ord: '酢醬草目', order: 101 },
  'Oxalidaceae':     { group: 3, ord: '酢醬草目', order: 102 },
  'Calophyllaceae':  { group: 3, ord: '金虎尾目', order: 110 },
  'Clusiaceae':      { group: 3, ord: '金虎尾目', order: 111 },
  'Elatinaceae':     { group: 3, ord: '金虎尾目', order: 112 },
  'Euphorbiaceae':   { group: 3, ord: '金虎尾目', order: 113 },
  'Hypericaceae':    { group: 3, ord: '金虎尾目', order: 114 },
  'Linaceae':        { group: 3, ord: '金虎尾目', order: 115 },
  'Malpighiaceae':   { group: 3, ord: '金虎尾目', order: 116 },
  'Passifloraceae':  { group: 3, ord: '金虎尾目', order: 117 },
  'Phyllanthaceae':  { group: 3, ord: '金虎尾目', order: 118 },
  'Putranjivaceae':  { group: 3, ord: '金虎尾目', order: 119 },
  'Rhizophoraceae':  { group: 3, ord: '金虎尾目', order: 120 },
  'Salicaceae':      { group: 3, ord: '金虎尾目', order: 121 },
  'Violaceae':       { group: 3, ord: '金虎尾目', order: 122 },
  'Fabaceae':        { group: 3, ord: '豆目',     order: 130 },
  'Polygalaceae':    { group: 3, ord: '豆目',     order: 131 },
  'Surianaceae':     { group: 3, ord: '豆目',     order: 132 },
  'Cannabaceae':     { group: 3, ord: '薔薇目',   order: 140 },
  'Elaeagnaceae':    { group: 3, ord: '薔薇目',   order: 141 },
  'Moraceae':        { group: 3, ord: '薔薇目',   order: 142 },
  'Rhamnaceae':      { group: 3, ord: '薔薇目',   order: 143 },
  'Rosaceae':        { group: 3, ord: '薔薇目',   order: 144 },
  'Ulmaceae':        { group: 3, ord: '薔薇目',   order: 145 },
  'Urticaceae':      { group: 3, ord: '薔薇目',   order: 146 },
  'Begoniaceae':     { group: 3, ord: '葫蘆目',   order: 150 },
  'Coriariaceae':    { group: 3, ord: '葫蘆目',   order: 151 },
  'Cucurbitaceae':   { group: 3, ord: '葫蘆目',   order: 152 },
  'Betulaceae':      { group: 3, ord: '殼斗目',   order: 160 },
  'Casuarinaceae':   { group: 3, ord: '殼斗目',   order: 161 },
  'Fagaceae':        { group: 3, ord: '殼斗目',   order: 162 },
  'Juglandaceae':    { group: 3, ord: '殼斗目',   order: 163 },
  'Myricaceae':      { group: 3, ord: '殼斗目',   order: 164 },
  'Geraniaceae':     { group: 3, ord: '牻牛兒苗目',order: 170 },
  'Combretaceae':    { group: 3, ord: '桃金孃目', order: 180 },
  'Lythraceae':      { group: 3, ord: '桃金孃目', order: 181 },
  'Melastomataceae': { group: 3, ord: '桃金孃目', order: 182 },
  'Myrtaceae':       { group: 3, ord: '桃金孃目', order: 183 },
  'Onagraceae':      { group: 3, ord: '桃金孃目', order: 184 },
  'Stachyuraceae':   { group: 3, ord: '旌節花目', order: 190 },
  'Staphyleaceae':   { group: 3, ord: '旌節花目', order: 191 },
  'Dipentodontaceae':{ group: 3, ord: '十齒花目', order: 200 },
  'Akaniaceae':      { group: 3, ord: '十字花目', order: 210 },
  'Capparaceae':     { group: 3, ord: '十字花目', order: 211 },
  'Caricaceae':      { group: 3, ord: '十字花目', order: 212 },
  'Cleomaceae':      { group: 3, ord: '十字花目', order: 213 },
  'Malvaceae':       { group: 3, ord: '錦葵目',   order: 220 },
  'Muntingiaceae':   { group: 3, ord: '錦葵目',   order: 221 },
  'Thymelaeaceae':   { group: 3, ord: '錦葵目',   order: 222 },
  'Anacardiaceae':   { group: 3, ord: '無患子目', order: 230 },
  'Meliaceae':       { group: 3, ord: '無患子目', order: 231 },
  'Rutaceae':        { group: 3, ord: '無患子目', order: 232 },
  'Sapindaceae':     { group: 3, ord: '無患子目', order: 233 },
  'Simaroubaceae':   { group: 3, ord: '無患子目', order: 234 },
  'Balanophoraceae': { group: 3, ord: '檀香目',   order: 240 },
  'Loranthaceae':    { group: 3, ord: '檀香目',   order: 241 },
  'Olacaceae':       { group: 3, ord: '檀香目',   order: 242 },
  'Opiliaceae':      { group: 3, ord: '檀香目',   order: 243 },
  'Santalaceae':     { group: 3, ord: '檀香目',   order: 244 },
  'Schoepfiaceae':   { group: 3, ord: '檀香目',   order: 245 },
  'Amaranthaceae':   { group: 3, ord: '石竹目',   order: 250 },
  'Basellaceae':     { group: 3, ord: '石竹目',   order: 251 },
  'Cactaceae':       { group: 3, ord: '石竹目',   order: 252 },
  'Caryophyllaceae': { group: 3, ord: '石竹目',   order: 253 },
  'Droseraceae':     { group: 3, ord: '石竹目',   order: 254 },
  'Molluginaceae':   { group: 3, ord: '石竹目',   order: 255 },
  'Nyctaginaceae':   { group: 3, ord: '石竹目',   order: 256 },
  'Petiveriaceae':   { group: 3, ord: '石竹目',   order: 257 },
  'Phytolaccaceae':  { group: 3, ord: '石竹目',   order: 258 },
  'Plumbaginaceae':  { group: 3, ord: '石竹目',   order: 259 },
  'Polygonaceae':    { group: 3, ord: '石竹目',   order: 260 },
  'Portulacaceae':   { group: 3, ord: '石竹目',   order: 261 },
  'Talinaceae':      { group: 3, ord: '石竹目',   order: 262 },
  'Tamaricaceae':    { group: 3, ord: '石竹目',   order: 263 },
  'Cornaceae':       { group: 3, ord: '山茱萸目', order: 270 },
  'Hydrangeaceae':   { group: 3, ord: '山茱萸目', order: 271 },
  'Actinidiaceae':   { group: 3, ord: '杜鵑花目', order: 280 },
  'Balsaminaceae':   { group: 3, ord: '杜鵑花目', order: 281 },
  'Diapensiaceae':   { group: 3, ord: '杜鵑花目', order: 282 },
  'Ebenaceae':       { group: 3, ord: '杜鵑花目', order: 283 },
  'Ericaceae':       { group: 3, ord: '杜鵑花目', order: 284 },
  'Lecythidaceae':   { group: 3, ord: '杜鵑花目', order: 285 },
  'Mitrastemonaceae':{ group: 3, ord: '杜鵑花目', order: 286 },
  'Pentaphylacaceae':{ group: 3, ord: '杜鵑花目', order: 287 },
  'Primulaceae':     { group: 3, ord: '杜鵑花目', order: 288 },
  'Sapotaceae':      { group: 3, ord: '杜鵑花目', order: 289 },
  'Styracaceae':     { group: 3, ord: '杜鵑花目', order: 290 },
  'Symplocaceae':    { group: 3, ord: '杜鵑花目', order: 291 },
  'Theaceae':        { group: 3, ord: '杜鵑花目', order: 292 },
  'Garryaceae':      { group: 3, ord: '絞木目',   order: 300 },
  'Apocynaceae':     { group: 3, ord: '龍膽目',   order: 310 },
  'Gentianaceae':    { group: 3, ord: '龍膽目',   order: 311 },
  'Loganiaceae':     { group: 3, ord: '龍膽目',   order: 312 },
  'Rubiaceae':       { group: 3, ord: '龍膽目',   order: 313 },
  'Convolvulaceae':  { group: 3, ord: '茄目',     order: 320 },
  'Hydroleaceae':    { group: 3, ord: '茄目',     order: 321 },
  'Solanaceae':      { group: 3, ord: '茄目',     order: 322 },
  'Sphenocleaceae':  { group: 3, ord: '茄目',     order: 323 },
  'Boraginaceae':    { group: 3, ord: '紫草目',   order: 330 },
  'Coldeniaceae':    { group: 3, ord: '紫草目',   order: 331 },
  'Cordiaceae':      { group: 3, ord: '紫草目',   order: 332 },
  'Ehretiaceae':     { group: 3, ord: '紫草目',   order: 333 },
  'Heliotropiaceae': { group: 3, ord: '紫草目',   order: 334 },
  'Acanthaceae':     { group: 3, ord: '唇形目',   order: 340 },
  'Bignoniaceae':    { group: 3, ord: '唇形目',   order: 341 },
  'Carlemanniaceae': { group: 3, ord: '唇形目',   order: 342 },
  'Gesneriaceae':    { group: 3, ord: '唇形目',   order: 343 },
  'Lamiaceae':       { group: 3, ord: '唇形目',   order: 344 },
  'Lentibulariaceae':{ group: 3, ord: '唇形目',   order: 345 },
  'Linderniaceae':   { group: 3, ord: '唇形目',   order: 346 },
  'Mazaceae':        { group: 3, ord: '唇形目',   order: 347 },
  'Oleaceae':        { group: 3, ord: '唇形目',   order: 348 },
  'Orobanchaceae':   { group: 3, ord: '唇形目',   order: 349 },
  'Paulowniaceae':   { group: 3, ord: '唇形目',   order: 350 },
  'Pedaliaceae':     { group: 3, ord: '唇形目',   order: 351 },
  'Plantaginaceae':  { group: 3, ord: '唇形目',   order: 352 },
  'Scrophulariaceae':{ group: 3, ord: '唇形目',   order: 353 },
  'Verbenaceae':     { group: 3, ord: '唇形目',   order: 354 },
  'Aquifoliaceae':   { group: 3, ord: '冬青目',   order: 360 },
  'Helwingiaceae':   { group: 3, ord: '冬青目',   order: 361 },
  'Stemonuraceae':   { group: 3, ord: '冬青目',   order: 362 },
  'Asteraceae':      { group: 3, ord: '菊目',     order: 370 },
  'Campanulaceae':   { group: 3, ord: '菊目',     order: 371 },
  'Goodeniaceae':    { group: 3, ord: '菊目',     order: 372 },
  'Menyanthaceae':   { group: 3, ord: '菊目',     order: 373 },
  'Adoxaceae':       { group: 3, ord: '川續斷目', order: 380 },
  'Caprifoliaceae':  { group: 3, ord: '川續斷目', order: 381 },
  'Apiaceae':        { group: 3, ord: '繖形目',   order: 390 },
  'Araliaceae':      { group: 3, ord: '繖形目',   order: 391 },
  'Pittosporaceae':  { group: 3, ord: '繖形目',   order: 392 },
};

const APG_GROUP_NAMES = ['裸子植物', '被子植物基群', '單子葉植物', '真雙子葉植物'];

function getApgInfo(familyLat) {
  return APG_FAMILY[familyLat] || { group: 3, order: 999 };
}

// ── State ────────────────────────────────────────────────────────
let allSpecies = [];
let allRefs    = [];
let query      = '';
let showNative = true;
let showExotic = true;

// ── DOM ──────────────────────────────────────────────────────────
const searchInput  = document.getElementById('search-input');
const clearBtn     = document.getElementById('clear-search');
const filterNative = document.getElementById('filter-native');
const filterExotic = document.getElementById('filter-exotic');
const chipNative   = document.getElementById('chip-native');
const chipExotic   = document.getElementById('chip-exotic');
const checklistEl  = document.getElementById('checklist');
const noResultsEl  = document.getElementById('no-results');
const searchTermEl = document.getElementById('search-term');
const statsEl      = document.getElementById('stats');
const loadingEl    = document.getElementById('loading');
const sidebarEl    = document.getElementById('family-sidebar');

// ── Header height CSS var ─────────────────────────────────────
function setHeaderHeight() {
  const h = document.querySelector('.site-header')?.offsetHeight || 110;
  document.documentElement.style.setProperty('--header-h', h + 'px');
}
window.addEventListener('resize', setHeaderHeight);

// ── Data Loading ─────────────────────────────────────────────────
async function loadData() {
  try {
    if (CONFIG.speciesUrl && CONFIG.refsUrl) {
      const [speciesData, refsData] = await Promise.all([
        fetchCSV(CONFIG.speciesUrl),
        fetchCSV(CONFIG.refsUrl),
      ]);
      allSpecies = speciesData;
      allRefs    = refsData;
    } else {
      allSpecies = SAMPLE_SPECIES;
      allRefs    = SAMPLE_REFS;
    }
  } catch (err) {
    console.warn('無法載入 Google Sheets 資料，改用示範資料。', err);
    allSpecies = SAMPLE_SPECIES;
    allRefs    = SAMPLE_REFS;
  }
  loadingEl.classList.add('hidden');
  setHeaderHeight();
  render();
}

function fetchCSV(url) {
  return new Promise((resolve, reject) => {
    Papa.parse(url, {
      download:       true,
      header:         true,
      skipEmptyLines: true,
      complete: r => resolve(r.data),
      error:    reject,
    });
  });
}

// ── Data Grouping ────────────────────────────────────────────────
function buildHierarchy(species, refs) {
  const refsByTaxon = new Map();
  for (const ref of refs) {
    const key = (ref.taxon_lat ?? ref.species_lat ?? '').trim();
    if (!key) continue;
    if (!refsByTaxon.has(key)) refsByTaxon.set(key, []);
    refsByTaxon.get(key).push(ref);
  }

  const familyMap = new Map();
  for (const sp of species) {
    const fKey = sp.family_lat?.trim() || sp.family_cn?.trim() || '';
    if (!familyMap.has(fKey)) {
      familyMap.set(fKey, { cn: sp.family_cn?.trim() || '', lat: fKey, genera: new Map() });
    }
    const family = familyMap.get(fKey);

    const geKey = sp.genus_lat?.trim() || '';
    if (!family.genera.has(geKey)) {
      family.genera.set(geKey, { cn: sp.genus_cn?.trim() || '', lat: geKey, species: [] });
    }

    const spRefs    = refsByTaxon.get(sp.species_lat?.trim()) || [];
    const genusRefs = refsByTaxon.get(geKey) || [];
    const mergedRefs = [...spRefs, ...genusRefs.filter(r => !spRefs.includes(r))];

    family.genera.get(geKey).species.push({
      cn:       sp.species_cn?.trim()  || '',
      lat:      sp.species_lat?.trim() || '',
      author:   sp.author?.trim()      || '',
      isExotic: sp.is_exotic?.trim().toUpperCase() === 'TRUE',
      notes:    sp.notes?.trim()       || '',
      refs:     mergedRefs,
    });
  }

  // 依 APG IV 分組並排序
  const apgGroups = APG_GROUP_NAMES.map(cn => ({ cn, families: [] }));
  for (const [, family] of familyMap) {
    const info = getApgInfo(family.lat);
    apgGroups[info.group].families.push({ ...family, apgOrder: info.order });
  }
  for (const group of apgGroups) {
    group.families.sort((a, b) => a.apgOrder - b.apgOrder);
  }
  return apgGroups;
}

// ── Filtering & Highlighting ──────────────────────────────────────
function matchesQuery(sp, q) {
  if (!q) return true;
  const low = q.toLowerCase();
  return sp.cn.toLowerCase().includes(low) || sp.lat.toLowerCase().includes(low);
}

function escHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function highlight(text, q) {
  if (!q) return escHtml(text);
  const safeQ = escHtml(q).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return escHtml(text).replace(new RegExp(`(${safeQ})`, 'gi'), '<mark>$1</mark>');
}

function formatLat(text, q) {
  const parts = text.split(/\b(var\.|subsp\.|f\.|ex)(?=\s|$)/);
  return parts.map(part =>
    /^(var\.|subsp\.|f\.|ex)$/.test(part)
      ? `<span class="lat-abbr">${escHtml(part)}</span>`
      : highlight(part, q)
  ).join('');
}

// ── Sidebar ───────────────────────────────────────────────────────
function renderSidebar(apgGroups, visibleFamilyLats) {
  if (!sidebarEl) return;
  let html = '';
  for (const group of apgGroups) {
    const visible = group.families.filter(f => visibleFamilyLats.has(f.lat));
    if (visible.length === 0) continue;
    html += `<div class="sidebar-group"><div class="sidebar-group-title">${escHtml(group.cn)}</div>`;

    // 按目分組
    const orderMap = new Map();
    for (const f of visible) {
      const ordName = getApgInfo(f.lat).ord || '';
      if (!orderMap.has(ordName)) orderMap.set(ordName, []);
      orderMap.get(ordName).push(f);
    }
    for (const [ordName, families] of orderMap) {
      if (ordName) html += `<div class="sidebar-order">${escHtml(ordName)}</div>`;
      for (const f of families) {
        html += `<a class="sidebar-family" href="#fam-${escHtml(f.lat)}">${escHtml(f.cn)}</a>`;
      }
    }
    html += '</div>';
  }
  sidebarEl.innerHTML = html;
}

// ── Rendering ────────────────────────────────────────────────────
function render() {
  const apgGroups = buildHierarchy(allSpecies, allRefs);
  const q = query.trim();
  let totalVisible = 0;
  let familyCount  = 0;
  let genusCount   = 0;
  let html = '';
  const visibleFamilyLats = new Set();

  for (const group of apgGroups) {
    let groupHtml  = '';
    let familyNum  = 0;

    for (const family of group.families) {
      let familyHtml    = '';
      let familyVisible = false;
      let genusNum = 0;

      for (const [, genus] of family.genera) {
        let genusSp = '';
        let spNum   = 0;

        for (const sp of genus.species) {
          if (sp.isExotic && !showExotic) continue;
          if (!sp.isExotic && !showNative) continue;
          if (!matchesQuery(sp, q)) continue;

          spNum++;
          totalVisible++;

          const hasRefs    = sp.refs.length > 0;
          const exoticMark = sp.isExotic ? '<span class="exotic-mark">*</span>' : '';
          const refIcon    = hasRefs ? '<span class="ref-toggle-icon">▾</span>' : '';

          const refsHtml = hasRefs
            ? `<div class="species-refs">${sp.refs.map(r => {
                const doiLink = r.doi?.trim()
                  ? ` <a class="ref-doi" href="https://doi.org/${escHtml(r.doi.trim())}" target="_blank" rel="noopener">DOI ↗</a>`
                  : '';
                return `<div class="ref-item"><span class="ref-citation">${escHtml(r.citation || '')}</span>${doiLink}</div>`;
              }).join('')}</div>`
            : '';

          genusSp += `
<li class="species-item${hasRefs ? ' has-refs' : ''}">
  <div class="species-line">
    <span class="sp-num">${spNum}.</span>
    <span class="species-cn">${highlight(sp.cn, q)}</span>
    <span class="species-lat">${formatLat(sp.lat, q)}</span>
    <span class="species-suffix"><span class="species-author">${escHtml(sp.author)}</span>${exoticMark}${refIcon}</span>
  </div>
  ${refsHtml}
</li>`;
        }

        if (spNum > 0) {
          genusNum++;
          genusCount++;
          familyVisible = true;
          familyHtml += `
<div class="genus">
  <div class="genus-title"><span class="genus-num">${genusNum}.</span> ${escHtml(genus.cn)} <em>${escHtml(genus.lat)}</em></div>
  <ol class="species-list">${genusSp}</ol>
</div>`;
        }
      }

      if (familyVisible) {
        familyNum++;
        familyCount++;
        visibleFamilyLats.add(family.lat);
        groupHtml += `
<div class="family" id="fam-${escHtml(family.lat)}">
  <div class="family-header">
    <span class="family-num">${familyCount}.</span>
    <span class="family-title">${escHtml(family.cn)} ${escHtml(family.lat)}</span>
    <span class="family-toggle">▾</span>
  </div>
  <div class="family-content">${familyHtml}</div>
</div>`;
      }
    }

    if (familyNum > 0) {
      html += `
<section class="higher-group">
  <h2 class="higher-group-title">${escHtml(group.cn)}</h2>
  ${groupHtml}
</section>`;
    }
  }

  checklistEl.innerHTML = html;
  checklistEl.classList.toggle('hidden', totalVisible === 0);
  noResultsEl.classList.toggle('hidden', totalVisible > 0);
  if (searchTermEl) searchTermEl.textContent = q;

  statsEl.textContent = q
    ? `搜尋結果：${familyCount} 科 · ${genusCount} 屬 · ${totalVisible} 種`
    : `共 ${familyCount} 科 · ${genusCount} 屬 · ${totalVisible} 種`;

  renderSidebar(apgGroups, visibleFamilyLats);
  attachEvents();
}

function attachEvents() {
  document.querySelectorAll('.family-header').forEach(header => {
    header.addEventListener('click', () => {
      header.closest('.family').classList.toggle('collapsed');
    });
  });

  document.querySelectorAll('.species-item.has-refs .species-line').forEach(line => {
    line.addEventListener('click', () => {
      line.closest('.species-item').classList.toggle('refs-open');
    });
  });
}

// ── Event Listeners ──────────────────────────────────────────────
let debounceTimer;
searchInput.addEventListener('input', () => {
  query = searchInput.value;
  clearBtn.classList.toggle('hidden', !query);
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(render, 200);
});

clearBtn.addEventListener('click', () => {
  searchInput.value = '';
  query = '';
  clearBtn.classList.add('hidden');
  render();
  searchInput.focus();
});

filterNative.addEventListener('change', () => {
  showNative = filterNative.checked;
  chipNative.classList.toggle('active', showNative);
  render();
});

filterExotic.addEventListener('change', () => {
  showExotic = filterExotic.checked;
  chipExotic.classList.toggle('active', showExotic);
  render();
});

// ── Init ─────────────────────────────────────────────────────────
if (sidebarEl) {
  sidebarEl.addEventListener('wheel', e => {
    const { deltaY } = e;
    const atTop    = sidebarEl.scrollTop === 0 && deltaY < 0;
    const atBottom = sidebarEl.scrollTop + sidebarEl.clientHeight >= sidebarEl.scrollHeight && deltaY > 0;
    if (!atTop && !atBottom) {
      e.preventDefault();
      sidebarEl.scrollTop += deltaY;
    }
  }, { passive: false });
}

loadData();
