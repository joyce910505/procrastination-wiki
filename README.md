# 為什麼我們總是拖延？——從心理學到改善方法

這是一個以一般讀者與學生為對象的生成式 AI 課程專案。專案先建立可追溯來源的「拖延心理學 LLM Wiki」，再將其中已查核的研究內容轉換成十頁互動式 HTML 教學簡報。內容刻意區分研究發現、理論解釋與可以嘗試的實務建議，不把相關性、統計中介或一般目標達成研究誤寫成拖延改善的因果證據。

> GitHub Pages 公開網址：**尚未部署，待填寫**

GitHub Repository：<https://github.com/joyce910505/procrastination-wiki>

## 專案成果

### LLM Wiki

- 已 Ingest 6 篇文獻（SRC-001～SRC-006）。
- 已建立 52 個可追溯研究主張（CLM-001～CLM-052）。
- Wiki 共六章：拖延定義、成因、心理循環、開始行動、維持專注與長期改善。
- 每項重要研究主張記錄來源 ID、原始位置、證據類型、限制與查核狀態。

### HTML 教學簡報

- 共 10 頁，採清新藍色「拖延百寶袋」工具箱風格。
- 三項核心互動：生活情境選擇、心理循環探索、個人 If–Then 行動計畫。
- 支援上一頁／下一頁、鍵盤方向鍵、指定頁面、頁碼、進度條、重新整理保留頁面及響應式排版。
- If–Then 行動卡只儲存在使用者瀏覽器的 `localStorage`，不會傳送到外部服務。

## 工作流程

```text
原始文獻
   ↓ Ingest：核對來源、擷取內容、登錄 SRC／CLM
LLM Wiki
   ↓ Query：只使用 Wiki 中已建立且查核通過的內容回答
Query 結果
   ↓ Lint：檢查來源、推論、限制、連結與內容一致性
教學簡報
   ↓ Presentation Check：檢查內容、證據、互動、排版與部署相容性
可發布的靜態網站
```

若檢查未通過，流程會返回相應節點進行最小修正，再另存重新檢查紀錄；不覆寫原始失敗結果。

## 專案結構

```text
.
├── index.html                 # 十頁 HTML 教學簡報
├── assets/
│   ├── styles.css             # 視覺與響應式排版
│   └── app.js                 # 導航與互動功能
├── wiki/
│   ├── README.md              # Wiki 導覽與證據範圍
│   ├── 01-...md ～ 06-...md   # 六個正式章節
│   ├── glossary.md            # 術語表
│   ├── claims-register.md     # CLM 主張登錄表
│   └── references.md          # SRC 文獻登錄表
├── slide-source-map.md        # Slide → Wiki → CLM → SRC 對照
├── logs/                      # Ingest、Query、Lint 與簡報檢查紀錄
├── AGENTS.md                  # 專案工作與查核規範
└── sources/                   # 原始 PDF（僅供本機查核，不公開）
```

`tmp/` 為 PDF 擷取文字、頁面圖片等本機工作產物，不屬於公開版本。

## 實際檢查與修正案例

- 全 Wiki Lint Run 01 發現 `wiki/README.md` 仍描述初始化狀態，與已完成的六篇來源及 52 個主張不符；更新狀態後，Run 02 重新檢查通過。
- Presentation Check Run 01 發現心理循環按鈕的 ARIA 角色遭覆寫，會使按鈕語意從可及性樹消失；移除錯誤角色後，Run 02 確認六個節點恢復原生按鈕語意。
- 同一次檢查發現瀏覽器會請求不存在的 `/favicon.ico`；加入不需外部檔案的 data favicon 後，不再產生該 404。
- 已以實際瀏覽器測試導航、三項核心互動、重新整理狀態及 1440、390、320 像素寬度下的水平溢出；Safari、Firefox、實體手機、VoiceOver、200% 文字縮放及部署後子路徑仍屬環境／人工驗收項目。詳情請見 [`logs/`](logs/)。

## 使用方式

### 閱讀 Wiki

由 [`wiki/README.md`](wiki/README.md) 進入六個章節；研究主張與來源分別列於 [`wiki/claims-register.md`](wiki/claims-register.md) 與 [`wiki/references.md`](wiki/references.md)。

### 本機預覽簡報

在專案根目錄執行：

```bash
python3 -m http.server 8000 --bind 127.0.0.1
```

再以瀏覽器開啟 `http://127.0.0.1:8000/`。結束時在終端機按 `Control-C`。

也可以直接開啟 `index.html`，但使用本機 HTTP 伺服器較接近 GitHub Pages 的執行情境。

## 來源與公開範圍

- 公開版本不包含 `sources/` 中的原始 PDF；文獻資訊與 DOI 連結保留在 Wiki 中。
- 公開版本不包含 `tmp/` 的 PDF 擷取文字與頁面圖片。
- 簡報不使用外部框架、外部字型、分析工具或第三方圖片服務。
- 研究結論只代表目前六篇來源所支持的範圍；已知證據不足處會明確標示，不以模型既有知識補寫。

## 授權

本專案目前尚未加入 `LICENSE`。公開 Repository 前，請依預期的再利用方式選擇程式碼與原創內容的授權；原始文獻的著作權仍屬各出版者或權利人，且不隨本專案散布。
