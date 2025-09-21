// This file extends Jest's expect with Testing Library matchers
import "@testing-library/jest-dom";

declare global {
  namespace jest {
    interface Matchers<R> {
      toBeInTheDocument(): R;
      toHaveStyle(css: string): R;
    }
  }
}
