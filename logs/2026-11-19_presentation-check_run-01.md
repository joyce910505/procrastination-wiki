# Presentation Check — Run 01

- **日期：** 2026-11-19（Asia/Taipei）
- **結果：** FAIL
- **範圍：** 第一版 `index.html`、`assets/styles.css`、`assets/app.js`、`slide-source-map.md`

## 檢查方式

- **靜態程式檢查：** JavaScript 語法、10 頁結構、重複 ID、相對資源、外部依賴與本機絕對路徑。
- **實際瀏覽器測試：** 本機 HTTP 預覽；1440×900 桌機與 390×844 手機視窗；滑鼠／鍵盤互動、重新整理與 console 訊息。
- **人工視覺檢查：** 桌機第 9 頁、手機第 5 頁的截圖及水平溢出幾何值。

## 結果

| 類別 | 結果 | 實際證據 |
|---|---|---|
| Content Check | PASS | 10 頁均有來源區；來源對照表涵蓋 Slide 1–10；高風險主張保留限制措辭 |
| Evidence Check | PASS | 相關／理論／實務標籤分開；番茄鐘、統計中介、If–Then 與介入包均未過度推論 |
| Navigation | PASS | 下一頁由 `#slide-1` 到 `#slide-2`；選頁到第 5、6、8、9、10 頁；重新整理保留 `#slide-10`；鍵盤右鍵由第 6 到第 7 頁 |
| 情境選擇 | PASS | 選「先滑一下手機」後顯示三項定義條件與非診斷回饋 |
| 心理循環內容 | PASS | 點選第 5 節點後顯示壓力／自責、相關限制與非因果中介警語 |
| If–Then 行動卡 | PASS | 輸入、產卡、第 10 頁同步、重新整理後保留均成功；輸入框聚焦時右方向鍵未切頁 |
| 其他互動 | PASS | Pomodoro 分頁、壓力關聯與工具箱選擇均更新正確內容 |
| Console | PASS | 測試時沒有 error 或 warning |
| 桌機排版 | PASS | 1440×900；投影片寬 1240、scrollWidth 1238，無水平溢出 |
| 手機排版 | PASS | 390×844；文件 scrollWidth=390，投影片 scrollWidth=clientWidth=364；循環改為單欄 |
| Deployment Readiness | **FAIL** | 無外部套件、本機絕對路徑或缺失相對檔案，但伺服器紀錄顯示瀏覽器自動請求 `/favicon.ico` 並得到 404 |
| 循環鍵盤可及性 | **FAIL** | `button` 被指定 `role=listitem`，導致瀏覽器可及性樹只呈現一般項目，無法依按鈕角色取得 |

## 問題登錄

### PRES-A11Y-001

- **頁面：** Slide 5
- **類型：** 互動／無障礙語意錯誤
- **發現節點：** Interaction Check → 心理循環鍵盤語意定位
- **問題：** 六個原生 `<button>` 被覆寫為 `role="listitem"`，按鈕角色從可及性樹消失。滑鼠點擊與 CSS 定位仍能運作，但輔助科技無法把節點辨識為按鈕。
- **修正方向：** 移除容器 `role=list` 與按鈕 `role=listitem`，保留原生按鈕語意與容器 `aria-label`。
- **返回節點：** HTML 結構 → Slide 5 循環控制。

### PRES-ASSET-002

- **頁面：** 全站 `<head>`
- **類型：** 資源／部署整備
- **發現節點：** 本機伺服器請求紀錄
- **問題：** 頁面沒有宣告 favicon，瀏覽器自動請求 `/favicon.ico` 並收到 404。這不影響簡報操作，但會留下不必要的缺失資源請求。
- **修正方向：** 加入不需外部檔案的空白 data favicon 宣告。
- **返回節點：** HTML `<head>` 資源設定。

## 尚未宣稱通過的項目

- 未在真實 Safari、Firefox、實體手機或螢幕閱讀器上測試。
- 未執行 GitHub Pages 實際部署，因此只能確認靜態相容條件，不能宣稱線上部署 PASS。
- 未執行完整 WCAG 稽核或所有縮放比例的人工逐頁檢查。
