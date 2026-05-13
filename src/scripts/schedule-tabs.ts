export function initScheduleTabs() {
  document.querySelectorAll('.view-tab').forEach(function (tab) {
    tab.addEventListener('click', function () {
      const view = (this as HTMLElement).getAttribute('data-view');
      document.querySelectorAll('.view-tab').forEach(function (t) {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      document.querySelectorAll('.view-panel').forEach(function (p) {
        p.classList.remove('active');
      });
      (this as HTMLElement).classList.add('active');
      (this as HTMLElement).setAttribute('aria-selected', 'true');
      const panel = document.getElementById('view-' + view);
      if (panel) panel.classList.add('active');
    });
  });

  document.querySelectorAll('.day-tab').forEach(function (tab) {
    tab.addEventListener('click', function () {
      const day = (this as HTMLElement).getAttribute('data-day');
      const viewTarget = (this as HTMLElement).getAttribute('data-view-target');
      const vp = (this as HTMLElement).closest('.view-panel');
      if (vp) {
        vp.querySelectorAll('.day-tab').forEach(function (t) {
          t.classList.remove('active');
          t.setAttribute('aria-selected', 'false');
        });
      }
      document.querySelectorAll('[id^="' + viewTarget + '-"]').forEach(function (p) {
        p.classList.remove('active');
      });
      (this as HTMLElement).classList.add('active');
      (this as HTMLElement).setAttribute('aria-selected', 'true');
      const panel = document.getElementById(viewTarget + '-' + day);
      if (panel) panel.classList.add('active');
    });
  });
}
