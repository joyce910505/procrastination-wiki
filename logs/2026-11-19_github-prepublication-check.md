# GitHub 公開發布前檢查

- **日期：** 2026-11-19（Asia/Taipei）
- **範圍：** 專案盤點、公開 README、隱私／著作權、`.gitignore`、GitHub Pages 靜態相容性
- **限制：** 未建立遠端 Repository，未執行 `git add`、`git commit`、`git push`，未啟用或測試 GitHub Pages

## 專案盤點

已確認下列必要內容存在：

- 根目錄 `index.html`、`AGENTS.md`、`slide-source-map.md`
- `assets/styles.css`、`assets/app.js`
- `wiki/` 內六章、Wiki README、術語表、主張表及來源表，共 10 個 Markdown 檔案
- `logs/` 內既有 Ingest、Query、Lint、HTML 生成與 Presentation Check 紀錄
- `sources/` 內 SRC-001～SRC-006 六份 PDF

檢查時此目錄尚未初始化為 Git Repository，因此沒有既有追蹤檔案或 Git 歷史可供檢查。

## 本次建立

- 根目錄 `README.md`
- 根目錄 `.gitignore`
- 本檢查紀錄

## 隱私與秘密掃描

對公開候選文字與程式檔執行關鍵字／格式搜尋，包括 API Key、access/auth token、client secret、密碼、常見 GitHub／OpenAI／AWS token 格式、私鑰標頭、Email、`/Users/`、`file://`、localhost 與 `127.0.0.1`。

- 未發現 API Key、Token、帳密、Email、私鑰或憑證。
- 未在 `index.html`、`assets/`、`wiki/`、`slide-source-map.md`、`logs/` 或 `AGENTS.md` 發現 Mac 絕對路徑、`file://` 或 localhost 連結。
- 新建根目錄 README 含 `127.0.0.1`，用途僅為本機預覽指令，不是網站執行時的資源連結。
- `logs/` 未發現需要遮蔽的本機絕對路徑，因此未修改既有證據紀錄。

本次為模式式掃描與人工檢視，不能保證偵測所有可能的秘密格式；建立 Repository 前仍應查看預計提交的差異與檔案清單。

## 著作權與排除範圍

- `sources/` 含六份原始研究 PDF，約 11 MB；以 `.gitignore` 排除，不納入公開版本。
- `tmp/` 含 PDF 擷取文字與頁面圖片，約 14 MB；可能重製原文內容，也屬本機工作產物，因此一併排除。
- `.DS_Store` 已存在於根目錄，已由 `.gitignore` 排除；本次未刪除本機檔案。
- 專案目前沒有 `LICENSE`；公開前需由專案擁有者決定原創程式碼與內容的再利用授權。

## GitHub Pages 靜態相容性

| 檢查 | 結果 |
|---|---|
| 根目錄 `index.html` | PASS |
| CSS／JavaScript 相對路徑 | PASS：`assets/styles.css`、`assets/app.js` |
| JavaScript 語法 | PASS：bundled Node `--check` |
| 外部框架或建置依賴 | PASS：未使用 |
| Mac 絕對路徑／`file://`／localhost 執行連結 | PASS：未發現 |
| 十頁投影片結構 | PASS：10 個 slide section |
| Wiki 相對檔案目標 | PASS：目前專案中均存在 |
| GitHub Pages 實際部署 | 未執行 |

### 待確認：Markdown 公開連結

`index.html` 的研究來源區目前連到 `wiki/*.md` 及其中錨點。這些路徑在 Repository 中可讀，且本機目標存在；但 GitHub Pages 預設 Jekyll 可能把 Markdown 頁面輸出為 `.html`，不一定保留 `.md` 公開網址。部署前建議二擇一：

1. 若來源按鈕要開啟 Repository 內的 Markdown，待 Repository 網址確定後改為 GitHub `blob` 連結。
2. 若 Wiki 也由 GitHub Pages 呈現，確認實際輸出網址後把簡報連結改為對應的 `.html` 路徑，並重新測試錨點。

本輪未擅自選擇或改寫連結，因為遠端 Repository 網址與 Pages 呈現策略尚未決定。

## 結果

本機內容已完成公開發布前的基本整理；原始 PDF、擷取產物、秘密檔案與常見暫存檔已有排除規則。建立公開 Repository 前仍需確認授權選擇及 Wiki 在 Pages 上的連結策略。
