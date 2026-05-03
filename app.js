// ── Configuration ────────────────────────────────────────────────
// 設定 Google Sheets 資料來源。
// 步驟：
//   1. 在 Google Sheets 中，點選「檔案 > 共用 > 發布到網路」
//   2. 選擇工作表，格式選 CSV，按「發布」
//   3. 將產生的網址貼到下方對應欄位
//
// URL 格式範例：
//   https://docs.google.com/spreadsheets/d/YOUR_SHEET_ID/gviz/tq?tqx=out:csv&sheet=species

const CONFIG = {
  speciesUrl: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTRrQG7JtZIPCO5neNhi1qQSxfuCAMhDxl06bDqCeQGfyQVX_iGXodeRshtH7DNZZjCPBggdxr1whbI/pub?gid=156413889&single=true&output=csv',
  refsUrl:    'https://docs.google.com/spreadsheets/d/e/2PACX-1vTRrQG7JtZIPCO5neNhi1qQSxfuCAMhDxl06bDqCeQGfyQVX_iGXodeRshtH7DNZZjCPBggdxr1whbI/pub?gid=988139071&single=true&output=csv',
};

// ── 示範資料（未設定 Google Sheets 時使用）─────────────────────
// 欄位說明：
//   group_cn / group_lat  → 大類（裸子植物 Gymnosperm / 被子植物 Angiosperm）
//   family_cn / family_lat → 科
//   genus_cn / genus_lat   → 屬
//   species_cn             → 中文種名
//   species_lat            → 拉丁學名（含種下分類群）
//   author                 → 命名者
//   is_exotic              → TRUE 為外來種，FALSE 為原生種
//   notes                  → 備注（選填）

const SAMPLE_SPECIES = [
  // 裸子植物 ─ 蘇鐵科
  { group_cn:'裸子植物', group_lat:'Gymnosperm', family_cn:'蘇鐵科', family_lat:'Cycadaceae', genus_cn:'蘇鐵屬', genus_lat:'Cycas', species_cn:'蘇鐵', species_lat:'Cycas revoluta', author:'Thunb.', is_exotic:'FALSE', notes:'' },

  // 裸子植物 ─ 松科
  { group_cn:'裸子植物', group_lat:'Gymnosperm', family_cn:'松科', family_lat:'Pinaceae', genus_cn:'冷杉屬', genus_lat:'Abies', species_cn:'臺灣冷杉', species_lat:'Abies kawakamii', author:'(Hayata) Ito', is_exotic:'FALSE', notes:'' },
  { group_cn:'裸子植物', group_lat:'Gymnosperm', family_cn:'松科', family_lat:'Pinaceae', genus_cn:'冷杉屬', genus_lat:'Abies', species_cn:'日本冷杉', species_lat:'Abies firma', author:'Siebold & Zucc.', is_exotic:'TRUE', notes:'' },
  { group_cn:'裸子植物', group_lat:'Gymnosperm', family_cn:'松科', family_lat:'Pinaceae', genus_cn:'油杉屬', genus_lat:'Keteleeria', species_cn:'臺灣油杉', species_lat:'Keteleeria davidiana var. formosana', author:'Hayata', is_exotic:'FALSE', notes:'' },
  { group_cn:'裸子植物', group_lat:'Gymnosperm', family_cn:'松科', family_lat:'Pinaceae', genus_cn:'雲杉屬', genus_lat:'Picea', species_cn:'臺灣雲杉', species_lat:'Picea morrisonicola', author:'Hayata', is_exotic:'FALSE', notes:'' },
  { group_cn:'裸子植物', group_lat:'Gymnosperm', family_cn:'松科', family_lat:'Pinaceae', genus_cn:'松屬', genus_lat:'Pinus', species_cn:'臺灣華山松', species_lat:'Pinus armandii var. mastersiana', author:'(Hayata) Hayata', is_exotic:'FALSE', notes:'' },
  { group_cn:'裸子植物', group_lat:'Gymnosperm', family_cn:'松科', family_lat:'Pinaceae', genus_cn:'松屬', genus_lat:'Pinus', species_cn:'華山松', species_lat:'Pinus armandii', author:'Franchet', is_exotic:'FALSE', notes:'' },
  { group_cn:'裸子植物', group_lat:'Gymnosperm', family_cn:'松科', family_lat:'Pinaceae', genus_cn:'松屬', genus_lat:'Pinus', species_cn:'天龍二葉松', species_lat:'Pinus fragilissima', author:'Businský', is_exotic:'FALSE', notes:'' },
  { group_cn:'裸子植物', group_lat:'Gymnosperm', family_cn:'松科', family_lat:'Pinaceae', genus_cn:'松屬', genus_lat:'Pinus', species_cn:'馬尾松', species_lat:'Pinus massoniana', author:'D. Don', is_exotic:'FALSE', notes:'' },
  { group_cn:'裸子植物', group_lat:'Gymnosperm', family_cn:'松科', family_lat:'Pinaceae', genus_cn:'松屬', genus_lat:'Pinus', species_cn:'臺灣五葉松', species_lat:'Pinus morrisonicola', author:'Hayata', is_exotic:'FALSE', notes:'' },
  { group_cn:'裸子植物', group_lat:'Gymnosperm', family_cn:'松科', family_lat:'Pinaceae', genus_cn:'松屬', genus_lat:'Pinus', species_cn:'臺灣二葉松', species_lat:'Pinus taiwanensis', author:'Hayata', is_exotic:'FALSE', notes:'' },
  { group_cn:'裸子植物', group_lat:'Gymnosperm', family_cn:'松科', family_lat:'Pinaceae', genus_cn:'松屬', genus_lat:'Pinus', species_cn:'早田氏松', species_lat:'Pinus × hayatana', author:'Businský', is_exotic:'FALSE', notes:'' },
  { group_cn:'裸子植物', group_lat:'Gymnosperm', family_cn:'松科', family_lat:'Pinaceae', genus_cn:'黃杉屬', genus_lat:'Pseudotsuga', species_cn:'臺灣黃杉', species_lat:'Pseudotsuga wilsoniana', author:'Hayata', is_exotic:'FALSE', notes:'' },
  { group_cn:'裸子植物', group_lat:'Gymnosperm', family_cn:'松科', family_lat:'Pinaceae', genus_cn:'鐵杉屬', genus_lat:'Tsuga', species_cn:'鐵杉', species_lat:'Tsuga chinensis', author:'(Franch.) Pritz.', is_exotic:'FALSE', notes:'' },

  // 裸子植物 ─ 羅漢松科（示範）
  { group_cn:'裸子植物', group_lat:'Gymnosperm', family_cn:'羅漢松科', family_lat:'Podocarpaceae', genus_cn:'羅漢松屬', genus_lat:'Podocarpus', species_cn:'羅漢松', species_lat:'Podocarpus macrophyllus', author:'(Thunb.) Sweet', is_exotic:'FALSE', notes:'' },
  { group_cn:'裸子植物', group_lat:'Gymnosperm', family_cn:'羅漢松科', family_lat:'Podocarpaceae', genus_cn:'羅漢松屬', genus_lat:'Podocarpus', species_cn:'蘭嶼羅漢松', species_lat:'Podocarpus costalis', author:'C.Presl', is_exotic:'FALSE', notes:'' },
];

const SAMPLE_REFS = [
  { species_lat:'Cycas revoluta', citation:'Chang et al. 2022. Divergence With Gene Flow and Contrasting Population Size Blur the Species Boundary in Cycas Sect. Asiorientales, as Inferred From Morphology and RAD-Seq Data. Frontiers in Plant Science.', doi:'10.3389/fpls.2022.824158' },
];

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
  // refs 工作表用 taxon_lat 欄（可以是種名或屬名）
  const refsByTaxon = new Map();
  for (const ref of refs) {
    const key = (ref.taxon_lat ?? ref.species_lat ?? '').trim();
    if (!key) continue;
    if (!refsByTaxon.has(key)) refsByTaxon.set(key, []);
    refsByTaxon.get(key).push(ref);
  }

  const groups = new Map();
  for (const sp of species) {
    const gKey = sp.group_lat?.trim() || 'Other';
    if (!groups.has(gKey)) {
      groups.set(gKey, { cn: sp.group_cn?.trim() || '', lat: gKey, families: new Map() });
    }
    const group = groups.get(gKey);

    const fKey = sp.family_lat?.trim() || '';
    if (!group.families.has(fKey)) {
      group.families.set(fKey, { cn: sp.family_cn?.trim() || '', lat: fKey, genera: new Map() });
    }
    const family = group.families.get(fKey);

    const geKey = sp.genus_lat?.trim() || '';
    if (!family.genera.has(geKey)) {
      family.genera.set(geKey, { cn: sp.genus_cn?.trim() || '', lat: geKey, species: [] });
    }

    // 合併種層級文獻 + 屬層級文獻
    const spRefs    = refsByTaxon.get(sp.species_lat?.trim()) || [];
    const genusRefs = refsByTaxon.get(geKey) || [];
    const allRefs   = [...spRefs, ...genusRefs.filter(r => !spRefs.includes(r))];

    family.genera.get(geKey).species.push({
      cn:       sp.species_cn?.trim()  || '',
      lat:      sp.species_lat?.trim() || '',
      author:   sp.author?.trim()      || '',
      isExotic: sp.is_exotic?.trim().toUpperCase() === 'TRUE',
      notes:    sp.notes?.trim()       || '',
      refs:     allRefs,
    });
  }
  return groups;
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

// ── Rendering ────────────────────────────────────────────────────
function render() {
  const hierarchy = buildHierarchy(allSpecies, allRefs);
  const q = query.trim();
  let totalVisible = 0;
  let html = '';

  for (const [, group] of hierarchy) {
    let groupHtml  = '';
    let familyNum  = 0;

    for (const [, family] of group.families) {
      let familyHtml    = '';
      let familyVisible = false;

      let genusNum = 0;
      for (const [, genus] of family.genera) {
        let genusSp  = '';
        let spNum    = 0;

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
    <span class="species-lat">${highlight(sp.lat, q)}</span>
    <span class="species-author">${escHtml(sp.author)}</span>${exoticMark}${refIcon}
  </div>
  ${refsHtml}
</li>`;
        }

        if (spNum > 0) {
          genusNum++;
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
        groupHtml += `
<div class="family">
  <div class="family-header">
    <span class="family-num">${familyNum}.</span>
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
  <h2 class="higher-group-title">${escHtml(group.cn)} ${escHtml(group.lat)}</h2>
  ${groupHtml}
</section>`;
    }
  }

  checklistEl.innerHTML = html;
  checklistEl.classList.toggle('hidden', totalVisible === 0);
  noResultsEl.classList.toggle('hidden', totalVisible > 0);
  if (searchTermEl) searchTermEl.textContent = q;

  // 計算可見的科數和屬數
  let familyCount = 0, genusCount = 0;
  for (const [, group] of hierarchy) {
    for (const [, family] of group.families) {
      let famHasVisible = false;
      for (const [, genus] of family.genera) {
        const visibleSp = genus.species.filter(sp => {
          if (sp.isExotic && !showExotic) return false;
          if (!sp.isExotic && !showNative) return false;
          return matchesQuery(sp, q);
        });
        if (visibleSp.length > 0) { genusCount++; famHasVisible = true; }
      }
      if (famHasVisible) familyCount++;
    }
  }

  statsEl.textContent = q
    ? `搜尋結果：${familyCount} 科 · ${genusCount} 屬 · ${totalVisible} 種`
    : `共 ${familyCount} 科 · ${genusCount} 屬 · ${totalVisible} 種`;

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
loadData();
