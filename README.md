# 臺灣種子植物名錄 Taiwan Seed Plant Checklist

**https://bahamutzerox.github.io/taiwan-seed-plants/**

臺灣種子植物的線上互動名錄，收錄裸子植物與被子植物共約 4,947 種（含外來種），依科 → 屬 → 種階層排列，支援即時搜尋與篩選。

本名錄為 [分類沙丘 Taxonomic Dune](https://taxonomicdune.com) 的附屬頁面。

---

## 功能

- 依科、屬、種三層階層瀏覽
- 即時搜尋中文名或拉丁學名
- 篩選原生種 / 外來種
- 顯示各分類群的參考文獻與 DOI 連結
- 支援桌面與行動裝置

---

## 資料來源與更新

物種資料儲存於 Google Sheets，分為兩個工作表：

| 工作表 | 說明 |
|---|---|
| `species` | 各分類群的中文名、拉丁學名、命名者、是否外來種 |
| `references` | 各分類群對應的參考文獻與 DOI |

**更新資料**：直接編輯 Google Sheets，網站重新整理後即顯示最新內容，無需修改程式碼。

---

## 技術

純靜態網站（HTML + CSS + JavaScript），透過 [PapaParse](https://www.papaparse.com/) 讀取 Google Sheets 公開 CSV，托管於 GitHub Pages。

---

## 版本

- ver1.0 202505：初版發布，外來種資料持續補充中
