import { useEffect } from 'react';
import type { RefObject } from 'react';

export const useOnClickOutside = (
  ref: RefObject<HTMLElement>,
  handler: (event: MouseEvent | TouchEvent) => void,
) => {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      // Do nothing if clicking ref's element or descendants
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }

      // Call the handler function when clicked outside of the ref
      handler(event);
    };

    // Add event listener
    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    // Clean up the event listener on unmount
    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]);
};
