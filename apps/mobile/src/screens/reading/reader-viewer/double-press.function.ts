import type { FunctionType } from 'global/types';

let lastTap: number | null;
let timer: NodeJS.Timeout;
export const doublePressFunction = (handleAction: FunctionType) => {
  if (lastTap) {
    handleAction();
    clearTimeout(timer);

    lastTap = null;
  } else {
    lastTap = Date.now();
    timer = setTimeout(() => {
      lastTap = null;
      clearTimeout(timer);
    }, 300);
  }
};
