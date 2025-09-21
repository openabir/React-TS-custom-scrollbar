import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Scrollbar from "../../components/Scrollbar";
import { ScrollValues } from "../../types";

// Mock ResizeObserver which isn't available in jsdom
global.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
};

describe("Scrollbar Component", () => {
  it("renders without crashing", () => {
    render(
      <Scrollbar>
        <div style={{ width: 1000, height: 1000 }}>Scrollable content</div>
      </Scrollbar>
    );

    expect(screen.getByText("Scrollable content")).toBeInTheDocument();
  });

  it("renders with custom className", () => {
    const { container } = render(
      <Scrollbar className="custom-class">
        <div>Content</div>
      </Scrollbar>
    );

    expect(
      container.querySelector(".react-custom-scrollbar.custom-class")
    ).toBeInTheDocument();
  });

  it("applies auto-height styles when specified", () => {
    const { container } = render(
      <Scrollbar autoHeight autoHeightMin={100} autoHeightMax={500}>
        <div>Content</div>
      </Scrollbar>
    );

    const scrollbarContainer = container.querySelector(
      ".react-custom-scrollbar"
    );
    expect(scrollbarContainer).toHaveStyle("height: auto");
    expect(scrollbarContainer).toHaveStyle("min-height: 100px");
    expect(scrollbarContainer).toHaveStyle("max-height: 500px");
  });

  it("calls onScrollStart callback when scrolled", () => {
    const handleScrollStart = jest.fn();

    const { container } = render(
      <Scrollbar onScrollStart={handleScrollStart}>
        <div style={{ width: 1000, height: 1000 }}>Scrollable content</div>
      </Scrollbar>
    );

    const viewElement = container.querySelector(
      'div[style*="overflow: scroll"]'
    );
    if (!viewElement) throw new Error("View element not found");

    fireEvent.scroll(viewElement);

    expect(handleScrollStart).toHaveBeenCalledTimes(1);
  });

  it("calls onScroll callback with scroll values", () => {
    const handleScroll = jest.fn();

    const { container } = render(
      <Scrollbar onScroll={handleScroll}>
        <div style={{ width: 1000, height: 1000 }}>Scrollable content</div>
      </Scrollbar>
    );

    const viewElement = container.querySelector(
      'div[style*="overflow: scroll"]'
    );
    if (!viewElement) throw new Error("View element not found");

    fireEvent.scroll(viewElement);

    expect(handleScroll).toHaveBeenCalledTimes(1);
    expect(handleScroll).toHaveBeenCalledWith(
      expect.objectContaining({
        left: expect.any(Number),
        top: expect.any(Number),
        scrollLeft: expect.any(Number),
        scrollTop: expect.any(Number),
        scrollWidth: expect.any(Number),
        scrollHeight: expect.any(Number),
        clientWidth: expect.any(Number),
        clientHeight: expect.any(Number),
      })
    );
  });

  it("renders custom track components when provided", () => {
    const renderTrackVertical = jest.fn((props) => (
      <div data-testid="custom-track" {...props}>
        {props.children}
      </div>
    ));

    render(
      <Scrollbar renderTrackVertical={renderTrackVertical}>
        <div>Content</div>
      </Scrollbar>
    );

    expect(screen.getByTestId("custom-track")).toBeInTheDocument();
    // The component renders both horizontal and vertical tracks, so it might be called twice
    expect(renderTrackVertical).toHaveBeenCalled();
  });
});
