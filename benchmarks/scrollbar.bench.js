/**
 * Performance benchmark for React Custom Scrollbar
 *
 * This file contains benchmarks for measuring the performance of the scrollbar component
 * with various content sizes and configurations.
 */

import React from "react";
import Benchmark from "benchmark";
import { create } from "react-test-renderer";
import Scrollbar from "../dist";

// Create a new benchmark suite
const suite = new Benchmark.Suite("React Custom Scrollbar");

/**
 * Helper function to create a large content element with many child elements
 * @param {number} itemCount - Number of items to render in the content
 * @returns {React.ReactElement} - Content element with many children
 */
const createLargeContent = (itemCount) => {
  return (
    <div style={{ width: "3000px", height: "3000px" }}>
      {Array.from({ length: itemCount }).map((_, i) => (
        <div key={i} style={{ padding: "10px" }}>
          Item {i + 1}
        </div>
      ))}
    </div>
  );
};

/**
 * Helper function to render a scrollbar with specific content and props
 * @param {React.ReactElement} content - Content to put in the scrollbar
 * @param {object} props - Props to pass to the Scrollbar component
 */
const renderScrollbar = (content, props = {}) => {
  const renderer = create(
    <div style={{ width: "300px", height: "300px" }}>
      <Scrollbar {...props}>{content}</Scrollbar>
    </div>
  );
  renderer.unmount();
};

// Benchmark rendering with small content (100 items)
suite.add("Render with small content (100 items)", () => {
  renderScrollbar(createLargeContent(100));
});

// Benchmark rendering with medium content (1000 items)
suite.add("Render with medium content (1000 items)", () => {
  renderScrollbar(createLargeContent(1000));
});

// Benchmark rendering with large content (5000 items)
suite.add("Render with large content (5000 items)", () => {
  renderScrollbar(createLargeContent(5000));
});

// Benchmark with auto-hide enabled
suite.add("Render with auto-hide enabled", () => {
  renderScrollbar(createLargeContent(1000), {
    autoHide: true,
    autoHideTimeout: 500,
    autoHideDuration: 200,
  });
});

// Benchmark with custom rendering functions
suite.add("Render with custom render functions", () => {
  renderScrollbar(createLargeContent(1000), {
    renderThumbVertical: (props) => (
      <div {...props} style={{ ...props.style, backgroundColor: "blue" }} />
    ),
    renderThumbHorizontal: (props) => (
      <div {...props} style={{ ...props.style, backgroundColor: "blue" }} />
    ),
    renderTrackVertical: (props) => (
      <div
        {...props}
        style={{ ...props.style, backgroundColor: "lightgray" }}
      />
    ),
    renderTrackHorizontal: (props) => (
      <div
        {...props}
        style={{ ...props.style, backgroundColor: "lightgray" }}
      />
    ),
  });
});

// Benchmark with accessibility features enabled
suite.add("Render with accessibility features", () => {
  renderScrollbar(createLargeContent(1000), {
    a11yEnabled: true,
    ariaLabel: "Scrollable content",
    keyboardScrollAmount: 40,
  });
});

// Benchmark with all features enabled
suite.add("Render with all features enabled", () => {
  renderScrollbar(createLargeContent(1000), {
    autoHide: true,
    autoHideTimeout: 500,
    autoHideDuration: 200,
    thumbMinSize: 40,
    universal: true,
    a11yEnabled: true,
    ariaLabel: "Scrollable content",
    keyboardScrollAmount: 40,
    renderThumbVertical: (props) => (
      <div {...props} style={{ ...props.style, backgroundColor: "blue" }} />
    ),
    renderThumbHorizontal: (props) => (
      <div {...props} style={{ ...props.style, backgroundColor: "blue" }} />
    ),
    renderTrackVertical: (props) => (
      <div
        {...props}
        style={{ ...props.style, backgroundColor: "lightgray" }}
      />
    ),
    renderTrackHorizontal: (props) => (
      <div
        {...props}
        style={{ ...props.style, backgroundColor: "lightgray" }}
      />
    ),
  });
});

// Run benchmarks
suite
  .on("cycle", (event) => {
    console.log(String(event.target));
  })
  .on("complete", function () {
    console.log("Fastest is " + this.filter("fastest").map("name"));
    console.log("Slowest is " + this.filter("slowest").map("name"));
  })
  .run({ async: true });
