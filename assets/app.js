(() => {
  'use strict';
  const slides = [...document.querySelectorAll('.slide')];
  const total = slides.length;
  const stage = document.getElementById('slide-stage');
  const progressBar = document.getElementById('progress-bar');
  const progressLabel = document.getElementById('progress-label');
  const prev = document.getElementById('prev-slide');
  const next = document.getElementById('next-slide');
  const dotNav = document.getElementById('dot-nav');
  const menu = document.getElementById('slide-menu');
  const menuButton = document.getElementById('open-menu');
  let current = 1;

  slides.forEach((_, index) => {
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.dataset.go = String(index + 1);
    dot.setAttribute('aria-label', `前往第 ${index + 1} 頁`);
    dotNav.append(dot);
  });

  function hashSlide() {
    const match = location.hash.match(/^#slide-(\d+)$/);
    const number = match ? Number(match[1]) : 1;
    return Math.min(total, Math.max(1, number || 1));
  }

  function showSlide(number, updateHash = true) {
    current = Math.min(total, Math.max(1, Number(number)));
    slides.forEach((slide, index) => {
      const active = index === current - 1;
      slide.classList.toggle('active', active);
      slide.setAttribute('aria-hidden', String(!active));
    });
    [...dotNav.children].forEach((dot, index) => {
      const active = index === current - 1;
      dot.classList.toggle('active', active);
      dot.setAttribute('aria-current', active ? 'page' : 'false');
    });
    progressBar.style.width = `${(current / total) * 100}%`;
    progressLabel.textContent = `第 ${current} 頁，共 ${total} 頁`;
    prev.disabled = current === 1;
    next.innerHTML = current === total ? '回到首頁 <span aria-hidden="true">↺</span>' : '下一頁 <span aria-hidden="true">→</span>';
    if (updateHash) history.replaceState(null, '', `#slide-${current}`);
    menu.hidden = true;
    menuButton.setAttribute('aria-expanded', 'false');
    stage.scrollTop = 0;
    slides[current - 1].scrollTop = 0;
    document.title = `${slides[current - 1].querySelector('h1,h2').textContent.trim()}｜拖延百寶袋`;
  }

  document.addEventListener('click', event => {
    const target = event.target.closest('[data-go]');
    if (target) showSlide(Number(target.dataset.go));
  });
  prev.addEventListener('click', () => showSlide(current - 1));
  next.addEventListener('click', () => showSlide(current === total ? 1 : current + 1));
  window.addEventListener('hashchange', () => showSlide(hashSlide(), false));
  document.addEventListener('keydown', event => {
    const editing = event.target.matches('input, textarea, select, [contenteditable="true"]');
    if (editing) return;
    if (event.key === 'ArrowRight' || event.key === 'PageDown') { event.preventDefault(); showSlide(current + 1); }
    if (event.key === 'ArrowLeft' || event.key === 'PageUp') { event.preventDefault(); showSlide(current - 1); }
    if (event.key === 'Escape' && !menu.hidden) { menu.hidden = true; menuButton.setAttribute('aria-expanded', 'false'); menuButton.focus(); }
  });
  menuButton.addEventListener('click', () => {
    menu.hidden = !menu.hidden;
    menuButton.setAttribute('aria-expanded', String(!menu.hidden));
  });

  const scenarioData = {
    delay: { title: '可能符合拖延定義', text: '原本打算今晚開始，也知道延後可能讓明天更趕，卻仍自願轉去做別的事。', checks: [['有原本意圖','yes'],['自願延後','yes'],['預期代價','yes']] },
    wait: { title: '不一定是拖延', text: '如果格式是完成任務的必要資訊，等待可能是合理安排；仍要看是否違反原本意圖，以及是否預期會因此更糟。', checks: [['有原本意圖','unclear'],['自願延後','unclear'],['預期代價','unclear']] },
    priority: { title: '較像策略性排序', text: '先處理更急迫的工作，不等於拖延；單看「晚一點做」不足以判斷。', checks: [['有原本意圖','yes'],['自願延後','unclear'],['預期代價','unclear']] }
  };
  const scenarioResult = document.getElementById('scenario-result');
  document.querySelectorAll('[data-scenario]').forEach(button => button.addEventListener('click', () => {
    document.querySelectorAll('[data-scenario]').forEach(item => item.classList.toggle('selected', item === button));
    const data = scenarioData[button.dataset.scenario];
    scenarioResult.innerHTML = `<strong>${data.title}</strong><p>${data.text}</p><div class="condition-list">${data.checks.map(([label, type]) => `<span class="${type}">${label}</span>`).join('')}</div>`;
  }));

  const cycleData = [
    ['任務不舒服','報告可能令人無聊、困難，或引發「我做不好」的自我評價。','任務厭惡與拖延呈相關；不能單獨判定因果。'],
    ['逃開任務','小芸轉去整理信箱，暫時不用面對報告。','逃避可能服務於情緒調節，但不能從表面行為確認動機。'],
    ['短期舒緩','現在的自己可能先避開不舒服的感受。','短期情緒修復是理論解釋；改善了多久仍缺完整測量。'],
    ['留給未來','任務沒有消失，只是交給時間更少的未來自己。','現在／未來自我是跨時間框架，不是兩個人格。'],
    ['壓力與自責','延後之後，壓力、自責或負面自我評價可能增加。','拖延與壓力呈相關；統計間接效果不是因果中介。'],
    ['再次逃避？','新的不適可能增加再次逃開任務的風險。','整條循環尚未被單一研究完整驗證，情緒逃避也不是唯一途徑。']
  ];
  const cycleDetail = document.getElementById('cycle-detail');
  function showCycle(index) {
    const [title, example, caution] = cycleData[index];
    cycleDetail.innerHTML = `<span class="badge theory">理論解釋</span><h3>${title}</h3><p>${example}</p><small>${caution}</small>`;
    document.querySelectorAll('[data-cycle]').forEach((node, i) => node.classList.toggle('active', i === index));
  }
  document.querySelectorAll('[data-cycle]').forEach(button => button.addEventListener('click', () => showCycle(Number(button.dataset.cycle))));
  showCycle(0);

  const storageKey = 'procrastinationWikiIfThenPlan';
  const planForm = document.getElementById('plan-form');
  const ifInput = document.getElementById('if-input');
  const thenInput = document.getElementById('then-input');
  const planCard = document.getElementById('plan-card');
  const finalPlan = document.getElementById('final-plan');
  function getPlan() { try { return JSON.parse(localStorage.getItem(storageKey) || 'null'); } catch { return null; } }
  function renderPlan(plan) {
    if (!plan) { planCard.hidden = true; finalPlan.textContent = '如果＿＿＿＿出現，那麼我就＿＿＿＿。'; return; }
    const sentence = `如果${plan.ifPart}，那麼我就${plan.thenPart}。`;
    planCard.hidden = false;
    planCard.innerHTML = `<span class="badge try">可以試試</span><blockquote>${sentence}</blockquote><button class="secondary" type="button" id="copy-plan">複製行動卡</button>`;
    finalPlan.textContent = sentence;
    document.getElementById('copy-plan').addEventListener('click', () => copyText(sentence));
  }
  planForm.addEventListener('submit', event => {
    event.preventDefault();
    const ifPart = ifInput.value.trim(); const thenPart = thenInput.value.trim();
    if (!ifPart || !thenPart) { planCard.hidden = false; planCard.innerHTML = '<strong>還差一小步：</strong>請把「如果」和「那麼我就」兩欄都填完整。'; return; }
    const plan = { ifPart, thenPart };
    localStorage.setItem(storageKey, JSON.stringify(plan)); renderPlan(plan);
  });
  async function copyText(text) {
    try { await navigator.clipboard.writeText(text); document.getElementById('copy-status').textContent = '已複製行動卡。'; }
    catch { document.getElementById('copy-status').textContent = '無法自動複製，請選取文字後手動複製。'; }
  }
  document.getElementById('copy-final').addEventListener('click', () => copyText(finalPlan.textContent));
  document.getElementById('clear-plan').addEventListener('click', () => { localStorage.removeItem(storageKey); ifInput.value = ''; thenInput.value = ''; renderPlan(null); document.getElementById('copy-status').textContent = '行動卡已清除。'; });
  const existingPlan = getPlan();
  if (existingPlan) { ifInput.value = existingPlan.ifPart; thenInput.value = existingPlan.thenPart; }
  renderPlan(existingPlan);

  const breakData = {
    self: ['自主休息','自行決定何時休息，也自行決定休息多久。'],
    pomo: ['Pomodoro','研究中的操作是四個 25 分鐘學習區段，每段後休息 5 分鐘。'],
    flow: ['Flowtime','自行決定何時休息；休息長度依前一學習段設定為 5、8 或 10 分鐘。']
  };
  const breakDetail = document.getElementById('break-detail');
  function showBreak(key) { const [title, text] = breakData[key]; breakDetail.innerHTML = `<h3>${title}</h3><p>${text}</p>`; document.querySelectorAll('[data-break]').forEach(button => button.setAttribute('aria-selected', String(button.dataset.break === key))); }
  document.querySelectorAll('[data-break]').forEach(button => button.addEventListener('click', () => showBreak(button.dataset.break)));
  showBreak('self');

  const relationData = {
    a: '<strong>拖延—自我同情：ρ = −.31</strong><p>拖延較高時，自我同情通常較低。這是相關，不能決定方向。</p>',
    b: '<strong>自我同情—知覺壓力：ρ = −.61</strong><p>自我同情較高時，知覺壓力通常較低；不能直接解讀成介入療效。</p>',
    c: '<strong>拖延—知覺壓力：ρ = .34</strong><p>拖延較高時，知覺壓力通常較高；不能斷言壓力只由拖延造成。</p>'
  };
  document.querySelectorAll('[data-relation]').forEach(button => button.addEventListener('click', () => { document.getElementById('relation-detail').innerHTML = relationData[button.dataset.relation]; }));

  const toolData = {
    observe: ['先畫出自己的卡點','記錄任務感受、轉開的行為，以及短期與長期結果。這是自我觀察框架，不是治療。','theory','理論解釋'],
    start: ['試做 If–Then plan','把明確線索連到具體可行的第一個行動。一般目標研究有支持，但不是拖延專屬療效。','try','可以試試'],
    focus: ['比較不同休息安排','Pomodoro、Flowtime 或自主休息目前沒有明確優勝者；可觀察感受與實際完成內容。','evidence','研究發現'],
    kind: ['換成較平衡的自我回應','自我同情與壓力、拖延有觀察性關聯，但尚未證實自我同情介入能減少拖延。','try','可以試試']
  };
  document.querySelectorAll('[data-tool]').forEach(button => button.addEventListener('click', () => {
    document.querySelectorAll('[data-tool]').forEach(item => item.classList.toggle('selected', item === button));
    const [title, text, badgeClass, badgeText] = toolData[button.dataset.tool];
    document.getElementById('tool-result').innerHTML = `<span class="badge ${badgeClass}">${badgeText}</span><h3>${title}</h3><p>${text}</p>`;
  }));

  showSlide(hashSlide(), false);
})();
