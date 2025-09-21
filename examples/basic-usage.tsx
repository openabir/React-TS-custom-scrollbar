import React from "react";
import Scrollbar from "react-custom-scrollbar";

/**
 * Basic usage example of React Custom Scrollbar
 * This demonstrates the simplest way to use the scrollbar component
 */
export const BasicUsageExample: React.FC = () => {
  return (
    <div style={{ padding: "20px" }}>
      <h2>Basic Scrollbar Example</h2>

      <Scrollbar
        style={{ height: "300px", width: "400px", border: "1px solid #ccc" }}
      >
        <div style={{ padding: "20px" }}>
          <h3>Scrollable Content</h3>
          <p>
            This is a basic example of the React Custom Scrollbar component.
          </p>
          <p>
            The content inside this container is scrollable both vertically and
            horizontally if needed.
          </p>

          {/* Generate some content to make it scrollable */}
          {Array.from({ length: 20 }, (_, i) => (
            <p key={i}>
              This is paragraph {i + 1}. Lorem ipsum dolor sit amet, consectetur
              adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris nisi ut aliquip ex ea commodo
              consequat.
            </p>
          ))}

          <div
            style={{
              width: "800px",
              padding: "10px",
              backgroundColor: "#f0f0f0",
            }}
          >
            This div is wider than the container to demonstrate horizontal
            scrolling. You can scroll horizontally to see this entire content.
          </div>
        </div>
      </Scrollbar>
    </div>
  );
};

export default BasicUsageExample;
