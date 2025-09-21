import Scrollbar from "./components/Scrollbar";
import { ScrollbarProps, ScrollValues } from "./types";
import setupPolyfills, {
  setupResizeObserverPolyfill,
  supportsPassiveEvents,
} from "./polyfills";

export {
  ScrollbarProps,
  ScrollValues,
  setupPolyfills,
  setupResizeObserverPolyfill,
  supportsPassiveEvents,
};
export default Scrollbar;
