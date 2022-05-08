import { Ref, MutableRefObject, useMemo } from 'react';

type ReactRef<T> = Ref<T> | MutableRefObject<T>;

export function assignRef<T = any>(ref: ReactRef<T> | undefined, value: T) {
  if (ref == null) return;

  if (typeof ref === 'function') {
    ref(value);
    return;
  }

  try {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // eslint-disable-next-line no-param-reassign
    ref.current = value;
  } catch (error) {
    throw new Error(`Cannot assign value '${value}' to ref '${ref}'`);
  }
}

/**
 * React hook that merges react refs into a single memoized function
 *
 * @example
 * const Component = React.forwardRef((props, ref) => {
 *   const internalRef = React.useRef();
 *   return <div {...props} ref={useMergeRefs(internalRef, ref)} />;
 * });
 */
function useMergeRefs<T>(...refs: (ReactRef<T> | undefined)[]) {
  return useMemo(() => {
    if (refs.every((ref) => ref == null)) {
      return null;
    }
    return (node: T) => {
      refs.forEach((ref) => {
        if (ref) assignRef(ref, node);
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, refs);
}

export default useMergeRefs;
