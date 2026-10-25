export const maxScroll = (el: HTMLElement): number =>
  Math.max(1, el.scrollHeight - el.clientHeight);

export const scrollTopForPage = (
  el: HTMLElement,
  pages: number,
  index: number
): number => (index / Math.max(1, pages - 1)) * maxScroll(el);

export const pageFromScroll = (el: HTMLElement, pages: number): number =>
  Math.round((el.scrollTop / maxScroll(el)) * (pages - 1));