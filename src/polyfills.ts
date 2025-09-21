/**
 * Browser compatibility polyfills for react-custom-scrollbar
 * Import this file to enable support for older browsers
 */

// ResizeObserver polyfill
export function setupResizeObserverPolyfill() {
  if (typeof window !== "undefined" && !window.ResizeObserver) {
    // This is a dynamic import to avoid bundling the polyfill by default
    // You need to install resize-observer-polyfill package
    import("resize-observer-polyfill")
      .then((module) => {
        window.ResizeObserver = module.default;
      })
      .catch((err) => {
        console.error("Failed to load ResizeObserver polyfill:", err);
      });
  }
}

// Passive event listeners detection
export const supportsPassiveEvents = () => {
  let passiveSupported = false;

  try {
    const options = {
      get passive() {
        passiveSupported = true;
        return true;
      },
    };

    // Test if passive events are supported
    window.addEventListener("test", () => {}, options as EventListenerOptions);
    window.removeEventListener(
      "test",
      () => {},
      options as EventListenerOptions
    );
  } catch (err) {
    passiveSupported = false;
  }

  return passiveSupported;
};

/**
 * Setup all polyfills needed for react-custom-scrollbar
 */
export function setupPolyfills() {
  setupResizeObserverPolyfill();
}

export default setupPolyfills;
