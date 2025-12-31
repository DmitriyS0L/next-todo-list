import { RefObject, useEffect } from 'react';

export const useAutoFocus = <T extends HTMLElement>(ref: RefObject<T | null>, active: boolean) => {
  useEffect(() => {
    if (active && ref.current) {
      ref.current.focus();
    }
  }, [active]);
};
