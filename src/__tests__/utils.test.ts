import {
  getScrollValues,
  isDOMElement,
  getThumbSize,
  getThumbPosition,
} from "../utils";

describe("Utility Functions", () => {
  describe("getScrollValues", () => {
    it("should calculate scroll values correctly", () => {
      // Mock an HTMLElement with scroll properties
      const element = {
        scrollLeft: 100,
        scrollTop: 200,
        scrollWidth: 1000,
        scrollHeight: 2000,
        clientWidth: 500,
        clientHeight: 1000,
      } as unknown as HTMLElement;

      const result = getScrollValues(element);

      expect(result).toEqual({
        left: 0.2, // scrollLeft / (scrollWidth - clientWidth)
        top: 0.2, // scrollTop / (scrollHeight - clientHeight)
        scrollLeft: 100,
        scrollTop: 200,
        scrollWidth: 1000,
        scrollHeight: 2000,
        clientWidth: 500,
        clientHeight: 1000,
      });
    });

    it("should handle edge case when dimensions are equal", () => {
      // Mock an HTMLElement with equal dimensions
      const element = {
        scrollLeft: 0,
        scrollTop: 0,
        scrollWidth: 500,
        scrollHeight: 1000,
        clientWidth: 500,
        clientHeight: 1000,
      } as unknown as HTMLElement;

      const result = getScrollValues(element);

      expect(result).toEqual({
        left: 0, // No scrolling possible horizontally
        top: 0, // No scrolling possible vertically
        scrollLeft: 0,
        scrollTop: 0,
        scrollWidth: 500,
        scrollHeight: 1000,
        clientWidth: 500,
        clientHeight: 1000,
      });
    });
  });

  describe("isDOMElement", () => {
    it("should return true for a DOM element", () => {
      const element = document.createElement("div");
      expect(isDOMElement(element)).toBe(true);
    });

    it("should return false for non-DOM elements", () => {
      expect(isDOMElement(null)).toBe(false);
      expect(isDOMElement({})).toBe(false);
      expect(isDOMElement("string")).toBe(false);
      expect(isDOMElement(42)).toBe(false);
    });
  });

  describe("getThumbSize", () => {
    it("should calculate thumb size correctly", () => {
      const result = getThumbSize({
        thumbMinSize: 20,
        trackSize: 200,
        contentSize: 1000,
      });

      // (trackSize / contentSize) * trackSize, but not less than thumbMinSize
      expect(result).toBe(40); // (200/1000) * 200 = 40
    });

    it("should return minimum size when calculated size is smaller", () => {
      const result = getThumbSize({
        thumbMinSize: 30,
        trackSize: 100,
        contentSize: 2000,
      });

      // Calculated would be (100/2000) * 100 = 5, but min is 30
      expect(result).toBe(30);
    });
  });

  describe("getThumbPosition", () => {
    it("should calculate thumb position correctly", () => {
      const result = getThumbPosition({
        thumbSize: 20,
        trackSize: 100,
        contentSize: 500,
        scrollPosition: 100,
      });

      // scrollPosition * (maxThumbPosition / maxScrollPosition)
      // 100 * ((100-20) / (500-100)) = 100 * (80/400) = 100 * 0.2 = 20
      expect(result).toBe(20);
    });

    it("should handle edge case when content fits in track", () => {
      const result = getThumbPosition({
        thumbSize: 100,
        trackSize: 100,
        contentSize: 100,
        scrollPosition: 0,
      });

      // No scrolling possible
      expect(result).toBe(0);
    });
  });
});
