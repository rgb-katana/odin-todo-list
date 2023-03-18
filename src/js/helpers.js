'use strict';

export function createEl(type, classList = [], textContent = '') {
  const el = document.createElement(type);
  if (classList.length !== 0) classList.map(cl => el.classList.add(cl));
  if (textContent.length !== 0) el.innerText = textContent;

  return el;
}
