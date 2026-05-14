type Tab = HTMLElement;

function activateTab(tab: Tab, allTabs: Tab[], focus = true) {
  for (const t of allTabs) {
    t.classList.remove('active');
    t.setAttribute('aria-selected', 'false');
    t.setAttribute('tabindex', '-1');
  }
  tab.classList.add('active');
  tab.setAttribute('aria-selected', 'true');
  tab.setAttribute('tabindex', '0');
  if (focus) tab.focus();
}

function bindKeyboard(allTabs: Tab[], onActivate: (t: Tab) => void) {
  for (const tab of allTabs) {
    tab.addEventListener('keydown', (e) => {
      const idx = allTabs.indexOf(tab);
      let next: Tab | null = null;
      switch (e.key) {
        case 'ArrowRight':
        case 'ArrowDown':
          next = allTabs[(idx + 1) % allTabs.length];
          break;
        case 'ArrowLeft':
        case 'ArrowUp':
          next = allTabs[(idx - 1 + allTabs.length) % allTabs.length];
          break;
        case 'Home':
          next = allTabs[0];
          break;
        case 'End':
          next = allTabs[allTabs.length - 1];
          break;
        default:
          return;
      }
      e.preventDefault();
      if (next) {
        activateTab(next, allTabs);
        onActivate(next);
      }
    });
  }
}

export function initScheduleTabs() {
  const viewTabs = Array.from(document.querySelectorAll<HTMLElement>('.view-tab'));
  const viewPanels = Array.from(document.querySelectorAll<HTMLElement>('.view-panel'));

  const showView = (tab: HTMLElement) => {
    const view = tab.getAttribute('data-view');
    for (const p of viewPanels) p.classList.remove('active');
    const panel = view ? document.getElementById('view-' + view) : null;
    if (panel) panel.classList.add('active');
  };

  for (const tab of viewTabs) {
    tab.addEventListener('click', () => {
      activateTab(tab, viewTabs, false);
      showView(tab);
    });
  }
  bindKeyboard(viewTabs, showView);

  // Day tabs are scoped per view-panel — each view has its own roving group.
  for (const vp of viewPanels) {
    const dayTabs = Array.from(vp.querySelectorAll<HTMLElement>(':scope > [role="tablist"] .day-tab'));
    if (dayTabs.length === 0) continue;

    const viewTarget = dayTabs[0].getAttribute('data-view-target') || '';
    const dayPanels = Array.from(document.querySelectorAll<HTMLElement>('[id^="' + viewTarget + '-"]'));

    const showDay = (tab: HTMLElement) => {
      const day = tab.getAttribute('data-day');
      for (const p of dayPanels) p.classList.remove('active');
      const panel = day ? document.getElementById(viewTarget + '-' + day) : null;
      if (panel) panel.classList.add('active');
    };

    for (const tab of dayTabs) {
      tab.addEventListener('click', () => {
        activateTab(tab, dayTabs, false);
        showDay(tab);
      });
    }
    bindKeyboard(dayTabs, showDay);
  }
}
