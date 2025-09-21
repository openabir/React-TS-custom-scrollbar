import React, { useState } from "react";
import Scrollbar from "react-custom-scrollbar";

/**
 * Event handlers example
 * This demonstrates how to use scroll event callbacks
 */
export const EventHandlersExample: React.FC = () => {
  const [scrollInfo, setScrollInfo] = useState({
    isScrolling: false,
    scrollTop: 0,
    scrollLeft: 0,
    scrollHeight: 0,
    scrollWidth: 0,
    clientHeight: 0,
    clientWidth: 0,
  });

  const handleScrollStart = () => {
    setScrollInfo((prev) => ({ ...prev, isScrolling: true }));
    console.log("Scroll started");
  };

  const handleScrollStop = () => {
    setScrollInfo((prev) => ({ ...prev, isScrolling: false }));
    console.log("Scroll stopped");
  };

  const handleScrollFrame = (values: any) => {
    setScrollInfo((prev) => ({
      ...prev,
      scrollTop: values.scrollTop,
      scrollLeft: values.scrollLeft,
      scrollHeight: values.scrollHeight,
      scrollWidth: values.scrollWidth,
      clientHeight: values.clientHeight,
      clientWidth: values.clientWidth,
    }));
  };

  const handleUpdate = (values: any) => {
    console.log("Scroll values updated:", values);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Event Handlers Example</h2>
      <p>This example demonstrates various scroll event callbacks.</p>

      {/* Scroll Information Panel */}
      <div
        style={{
          marginBottom: "20px",
          padding: "15px",
          backgroundColor: "#f5f5f5",
          borderRadius: "6px",
          fontFamily: "monospace",
        }}
      >
        <h4>Scroll Information:</h4>
        <div>Is Scrolling: {scrollInfo.isScrolling ? "Yes" : "No"}</div>
        <div>Scroll Top: {Math.round(scrollInfo.scrollTop)}px</div>
        <div>Scroll Left: {Math.round(scrollInfo.scrollLeft)}px</div>
        <div>Content Height: {scrollInfo.scrollHeight}px</div>
        <div>Content Width: {scrollInfo.scrollWidth}px</div>
        <div>Visible Height: {scrollInfo.clientHeight}px</div>
        <div>Visible Width: {scrollInfo.clientWidth}px</div>
      </div>

      <Scrollbar
        style={{
          height: "250px",
          width: "400px",
          border: "1px solid #ccc",
          borderRadius: "4px",
        }}
        onScrollStart={handleScrollStart}
        onScrollStop={handleScrollStop}
        onScrollFrame={handleScrollFrame}
        onUpdate={handleUpdate}
      >
        <div style={{ padding: "20px" }}>
          <h3>Scrollable Content with Event Tracking</h3>
          <p>
            Scroll this content and watch the information panel above update in
            real-time.
          </p>

          {Array.from({ length: 20 }, (_, i) => (
            <p key={i}>
              Paragraph {i + 1}: This content generates scroll events that are
              captured and displayed in the information panel above. All scroll
              interactions are logged to the console.
            </p>
          ))}

          <div
            style={{
              width: "600px",
              padding: "10px",
              backgroundColor: "#e3f2fd",
              borderRadius: "4px",
              marginTop: "10px",
            }}
          >
            This wide content allows for horizontal scrolling. Try scrolling in
            both directions to see how the event handlers capture different
            scroll values.
          </div>

          <p>Check the browser console to see additional scroll event logs!</p>
        </div>
      </Scrollbar>
    </div>
  );
};

export default EventHandlersExample;
