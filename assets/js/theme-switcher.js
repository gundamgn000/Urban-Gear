(() => {
  const key = 'urban-gear-theme';
  const root = document.documentElement;
  const options = [
    { id: 'default', label: '野戰' },
    { id: 'concrete', label: '都會' }
  ];

  const switcher = document.createElement('div');
  switcher.className = 'theme-switcher';
  switcher.setAttribute('role', 'group');
  switcher.setAttribute('aria-label', '網站色系切換');

  function apply(id, save = true) {
    const selected = id === 'concrete' ? 'concrete' : 'default';
    selected === 'concrete'
      ? root.setAttribute('data-theme', 'concrete')
      : root.removeAttribute('data-theme');

    if (save) localStorage.setItem(key, selected);

    switcher.querySelectorAll('button').forEach((button) => {
      const active = button.dataset.theme === selected;
      button.classList.toggle('is-active', active);
      button.setAttribute('aria-pressed', String(active));
    });
  }

  options.forEach(({ id, label }) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.dataset.theme = id;
    button.textContent = label;
    button.addEventListener('click', () => apply(id));
    switcher.appendChild(button);
  });

  const saved = localStorage.getItem(key) || 'default';
  apply(saved, false);

  document.addEventListener('DOMContentLoaded', () => {
    document.body.appendChild(switcher);
    apply(saved, false);
  });
})();