export function getScrollParent(node: HTMLElement | null): HTMLElement | Window {
  let current = node?.parentElement ?? null;

  while (current) {
    const { overflowY } = getComputedStyle(current);
    const isScrollable = overflowY === "auto" || overflowY === "scroll";
    if (isScrollable && current.scrollHeight > current.clientHeight) {
      return current;
    }
    current = current.parentElement;
  }

  return window;
}
