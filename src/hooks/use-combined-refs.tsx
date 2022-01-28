import { useCallback, Ref } from 'react';

/**
 * Combines many refs into one. Useful for combining many ref hooks
 */
const useCombinedRefs = <T,>(...refs: Array<Ref<T>>): Ref<T> =>
  useCallback(
    (element: T) =>
      refs.forEach((ref) => {
        if (!ref) {
          return;
        }

        // Ref can have two types - a function or an object. We treat each case.
        if (typeof ref === 'function') {
          // eslint-disable-next-line consistent-return
          return ref(element);
        }

        // As per https://github.com/facebook/react/issues/13029
        // it should be fine to set current this way.
        // eslint-disable-next-line no-param-reassign
        (ref as any).current = element;
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    refs,
  );

export default useCombinedRefs;