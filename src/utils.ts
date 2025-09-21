/**
 * Get scroll values for an element
 */
export function getScrollValues(element: HTMLElement) {
  const {
    scrollLeft,
    scrollTop,
    scrollWidth,
    scrollHeight,
    clientWidth,
    clientHeight,
  } = element;

  return {
    left: scrollLeft / (scrollWidth - clientWidth) || 0,
    top: scrollTop / (scrollHeight - clientHeight) || 0,
    scrollLeft,
    scrollTop,
    scrollWidth,
    scrollHeight,
    clientWidth,
    clientHeight,
  };
}

/**
 * Check if element is a DOM element
 */
export function isDOMElement(element: any): element is HTMLElement {
  if (!element) return false;
  return (
    typeof element === "object" &&
    element.nodeType === 1 &&
    typeof element.style === "object"
  );
}

/**
 * Return false if passive events aren't supported, otherwise return an object with passive: true
 */
export const getPassiveOptions = () => {
  let passiveSupported = false;

  try {
    const options = {
      get passive() {
        passiveSupported = true;
        return true;
      },
    };

    // Use type assertion to handle the options object
    window.addEventListener(
      "test",
      () => {},
      options as AddEventListenerOptions
    );
    window.removeEventListener(
      "test",
      () => {},
      options as AddEventListenerOptions
    );
  } catch (err) {
    passiveSupported = false;
  }

  return passiveSupported ? { passive: true } : false;
};

/**
 * Calculate thumb size
 */
export function getThumbSize({
  thumbMinSize,
  trackSize,
  contentSize,
}: {
  thumbMinSize: number;
  trackSize: number;
  contentSize: number;
}) {
  const ratio = trackSize / contentSize;
  const thumbSize = Math.max(ratio * trackSize, thumbMinSize);
  return thumbSize;
}

/**
 * Calculate thumb position
 */
export function getThumbPosition({
  thumbSize,
  trackSize,
  contentSize,
  scrollPosition,
}: {
  thumbSize: number;
  trackSize: number;
  contentSize: number;
  scrollPosition: number;
}) {
  const maxScrollPosition = contentSize - trackSize;

  // If content fits or is smaller than track, return 0
  if (maxScrollPosition <= 0) {
    return 0;
  }

  const maxThumbPosition = trackSize - thumbSize;
  const ratio = maxThumbPosition / maxScrollPosition;
  return scrollPosition * ratio;
}
