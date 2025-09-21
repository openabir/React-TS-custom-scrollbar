import React from "react";
import Scrollbar from "react-custom-scrollbar";

/**
 * Custom styling example
 * This demonstrates how to customize the appearance of scrollbars
 */
export const CustomStylingExample: React.FC = () => {
  // Custom thumb component for vertical scrollbar
  const renderThumbVertical = ({ style, ...props }: any) => {
    const thumbStyle = {
      ...style,
      backgroundColor: "#4CAF50",
      borderRadius: "6px",
      border: "2px solid #45a049",
    };
    return <div style={thumbStyle} {...props} />;
  };

  // Custom thumb component for horizontal scrollbar
  const renderThumbHorizontal = ({ style, ...props }: any) => {
    const thumbStyle = {
      ...style,
      backgroundColor: "#2196F3",
      borderRadius: "6px",
      border: "2px solid #1976D2",
    };
    return <div style={thumbStyle} {...props} />;
  };

  // Custom track component for vertical scrollbar
  const renderTrackVertical = ({ style, ...props }: any) => {
    const trackStyle = {
      ...style,
      backgroundColor: "#e0e0e0",
      borderRadius: "6px",
      right: "2px",
      bottom: "2px",
      top: "2px",
      width: "12px",
    };
    return <div style={trackStyle} {...props} />;
  };

  // Custom track component for horizontal scrollbar
  const renderTrackHorizontal = ({ style, ...props }: any) => {
    const trackStyle = {
      ...style,
      backgroundColor: "#e0e0e0",
      borderRadius: "6px",
      left: "2px",
      right: "2px",
      bottom: "2px",
      height: "12px",
    };
    return <div style={trackStyle} {...props} />;
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Custom Styling Example</h2>
      <p>
        This example shows how to customize the scrollbar appearance with custom
        components.
      </p>

      <Scrollbar
        style={{
          height: "300px",
          width: "500px",
          border: "2px solid #ddd",
          borderRadius: "8px",
        }}
        renderThumbVertical={renderThumbVertical}
        renderThumbHorizontal={renderThumbHorizontal}
        renderTrackVertical={renderTrackVertical}
        renderTrackHorizontal={renderTrackHorizontal}
      >
        <div style={{ padding: "20px" }}>
          <h3>Customized Scrollbars</h3>
          <p>
            Notice the green vertical scrollbar and blue horizontal scrollbar
            with custom styling.
          </p>

          {Array.from({ length: 15 }, (_, i) => (
            <p key={i}>
              Content line {i + 1} with custom scrollbar styling. The scrollbars
              have custom colors, borders, and increased width for better
              visibility and aesthetics.
            </p>
          ))}

          <div
            style={{
              width: "800px",
              padding: "15px",
              backgroundColor: "#f9f9f9",
              borderRadius: "4px",
              marginTop: "20px",
            }}
          >
            This wide content demonstrates the horizontal scrollbar with custom
            blue styling. Scroll horizontally to see the full content and notice
            the custom appearance.
          </div>
        </div>
      </Scrollbar>
    </div>
  );
};

export default CustomStylingExample;
