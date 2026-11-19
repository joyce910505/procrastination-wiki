# Presentation Check — Run 02

- **日期：** 2026-11-19（Asia/Taipei）
- **結果：** PASS
- **返回節點：** HTML 結構與 `<head>` 資源設定
- **修正問題：** PRES-A11Y-001、PRES-ASSET-002

## 修正內容

1. 移除 Slide 5 容器的 `role=list` 及六個按鈕的 `role=listitem`，恢復原生 `<button>` 語意。
2. 在 `<head>` 加入 `data:,` favicon，避免瀏覽器自動請求不存在的 `/favicon.ico`。

## 修正後實際重檢

| 檢查 | 結果 |
|---|---|
| 循環按鈕角色 | PASS：可及性樹呈現 6 個 button，能以角色與名稱定位 |
| 循環互動 | PASS：點擊「5 壓力／自責」後顯示正確內容與非因果警語 |
| Console | PASS：沒有 error 或 warning |
| 本機資源請求 | PASS：首頁、CSS、JavaScript 均為 200／304；未再請求 `/favicon.ico` |
| JavaScript 語法 | PASS：使用 bundled Node 執行 `--check` 通過 |
| 相對連結與資源 | PASS：所有專案相對路徑存在，無 Mac 絕對路徑 |

## Run 01 其他通過項目沿用

- 10 頁 Content Check 與 Evidence Check。
- 上一頁、下一頁、選頁、hash、重新整理與鍵盤方向鍵。
- 生活情境、心理循環與 If–Then 三項核心互動。
- If–Then 輸入框聚焦時不切頁，行動卡可同步至第 10 頁並於重新整理後保留。
- 1440×900 桌機、390×844 手機及 320×720 窄螢幕檢查；10 頁均沒有水平溢出。
- 無外部框架、圖片、字型、網路服務或不適合靜態 GitHub Pages 的依賴。

## 測試資料清理

- 測試建立的 If–Then 行動卡已透過介面清除，瀏覽器恢復空白行動卡。
- 本機預覽伺服器已停止。

## 仍需人工／環境測試

- 真實 Safari、Firefox 與實體手機。
- VoiceOver 或其他螢幕閱讀器的完整操作流程。
- 200% 文字縮放的逐頁人工閱讀。
- 使用者實際點擊「複製行動卡」後確認系統剪貼簿權限行為；瀏覽器拒絕時已有手動複製提示。
- GitHub Pages 實際部署後的子路徑與 404 檢查；本輪沒有部署。
