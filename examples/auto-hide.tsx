import React from "react";
import Scrollbar from "react-custom-scrollbar";

/**
 * Auto-hide functionality example
 * This demonstrates the auto-hide feature for scrollbars
 */
export const AutoHideExample: React.FC = () => {
  return (
    <div style={{ padding: "20px" }}>
      <h2>Auto-Hide Scrollbars Example</h2>
      <p>The scrollbars will automatically hide when not in use.</p>

      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
        {/* Default auto-hide (1 second) */}
        <div>
          <h4>Default Auto-Hide (1s)</h4>
          <Scrollbar
            style={{
              height: "200px",
              width: "300px",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
            autoHide={true}
          >
            <div style={{ padding: "15px" }}>
              <p>Scrollbars hide after 1 second of inactivity (default).</p>
              {Array.from({ length: 10 }, (_, i) => (
                <p key={i}>Content line {i + 1}</p>
              ))}
            </div>
          </Scrollbar>
        </div>

        {/* Custom auto-hide timeout */}
        <div>
          <h4>Custom Auto-Hide (3s)</h4>
          <Scrollbar
            style={{
              height: "200px",
              width: "300px",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
            autoHide={true}
            autoHideTimeout={3000}
          >
            <div style={{ padding: "15px" }}>
              <p>Scrollbars hide after 3 seconds of inactivity.</p>
              {Array.from({ length: 10 }, (_, i) => (
                <p key={i}>Content line {i + 1}</p>
              ))}
            </div>
          </Scrollbar>
        </div>

        {/* Always visible scrollbars */}
        <div>
          <h4>Always Visible</h4>
          <Scrollbar
            style={{
              height: "200px",
              width: "300px",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
            autoHide={false}
          >
            <div style={{ padding: "15px" }}>
              <p>Scrollbars are always visible (autoHide=false).</p>
              {Array.from({ length: 10 }, (_, i) => (
                <p key={i}>Content line {i + 1}</p>
              ))}
            </div>
          </Scrollbar>
        </div>
      </div>

      <div
        style={{
          marginTop: "20px",
          padding: "15px",
          backgroundColor: "#f0f8ff",
          borderRadius: "4px",
        }}
      >
        <h4>💡 Tips:</h4>
        <ul>
          <li>Hover over the scrollable areas to see the scrollbars appear</li>
          <li>Stop scrolling and wait to see them disappear</li>
          <li>
            The timeout can be customized using the <code>autoHideTimeout</code>{" "}
            prop
          </li>
          <li>
            Set <code>autoHide=false</code> to keep scrollbars always visible
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AutoHideExample;
