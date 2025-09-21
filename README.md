# React Custom Scrollbar

A lightweight, highly customizable React scrollbar component with TypeScript support, accessibility features, and cross-browser compatibility.

[![npm version](https://badge.fury.io/js/@openabir/react-custom-scrollbar-lite.svg)](https://badge.fury.io/js/@openabir/react-custom-scrollbar-lite)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://badges.frapsoft.com/typescript/code/typescript.svg?v=101)](https://github.com/ellerbrock/typescript-badges/)

## ✨ Features

- 🪶 **Lightweight**: Only ~5.1 KB gzipped
- 🎨 **Fully Customizable**: Style with CSS or styled-components
- ♿ **Accessible**: Built-in ARIA support and keyboard navigation
- 📱 **Cross-browser**: Works on all modern browsers
- 🔒 **TypeScript**: Full TypeScript support with type definitions
- ⚡ **Performant**: Optimized for smooth scrolling experience
- 🎯 **Zero Dependencies**: No external runtime dependencies (except React)
- 🔄 **Auto-hide**: Scrollbars can hide when not in use
- 📏 **Auto-height**: Support for automatic height adjustment
- 🌍 **Universal**: SSR/SSG compatible

## 📦 Installation

```bash
npm install @openabir/react-custom-scrollbar-lite
```

or

```bash
yarn add @openabir/react-custom-scrollbar-lite
```

## 🚀 Quick Start

```tsx
import React from "react";
import Scrollbar from "@openabir/react-custom-scrollbar-lite";

function App() {
  return (
    <Scrollbar style={{ height: "400px", width: "300px" }}>
      <div>
        {/* Your scrollable content */}
        <p>Long content that will be scrollable...</p>
        <p>More content...</p>
        <p>Even more content...</p>
      </div>
    </Scrollbar>
  );
}

export default App;
```

## 📚 API Reference

### Props

| Prop                      | Type                             | Default                | Description                                |
| ------------------------- | -------------------------------- | ---------------------- | ------------------------------------------ |
| `children`                | `ReactNode`                      | -                      | Content to be scrolled                     |
| `style`                   | `CSSProperties`                  | `{}`                   | Custom styles for the container            |
| `className`               | `string`                         | -                      | CSS class name for the container           |
| `autoHide`                | `boolean`                        | `false`                | Hide scrollbars when not scrolling         |
| `autoHideTimeout`         | `number`                         | `1000`                 | Time in ms before hiding scrollbars        |
| `autoHideDuration`        | `number`                         | `200`                  | Duration of hide animation (ms)            |
| `thumbMinSize`            | `number`                         | `30`                   | Minimum size of scroll thumb in pixels     |
| `universal`               | `boolean`                        | `false`                | Enable universal rendering (SSR)           |
| `autoHeight`              | `boolean`                        | `false`                | Automatically adjust height to content     |
| `autoHeightMin`           | `number \| string`               | `0`                    | Minimum height when autoHeight is enabled  |
| `autoHeightMax`           | `number \| string`               | `200`                  | Maximum height when autoHeight is enabled  |
| `hideTracksWhenNotNeeded` | `boolean`                        | `false`                | Hide tracks when not needed                |
| `renderThumbHorizontal`   | `(props: any) => ReactElement`   | -                      | Custom horizontal thumb component          |
| `renderThumbVertical`     | `(props: any) => ReactElement`   | -                      | Custom vertical thumb component            |
| `renderTrackHorizontal`   | `(props: any) => ReactElement`   | -                      | Custom horizontal track component          |
| `renderTrackVertical`     | `(props: any) => ReactElement`   | -                      | Custom vertical track component            |
| `renderView`              | `(props: any) => ReactElement`   | -                      | Custom view component                      |
| `onScroll`                | `(event: Event) => void`         | -                      | Scroll event handler                       |
| `onScrollFrame`           | `(values: ScrollValues) => void` | -                      | Called on each scroll frame                |
| `onScrollStart`           | `() => void`                     | -                      | Called when scrolling starts               |
| `onScrollStop`            | `() => void`                     | -                      | Called when scrolling stops                |
| `onUpdate`                | `(values: ScrollValues) => void` | -                      | Called when scroll values update           |
| `a11yEnabled`             | `boolean`                        | `true`                 | Enable accessibility features              |
| `ariaLabel`               | `string`                         | `'Scrollable content'` | ARIA label for the scrollbar               |
| `keyboardScrollAmount`    | `number`                         | `40`                   | Scroll amount (px) for keyboard navigation |

### ScrollValues Interface

```typescript
interface ScrollValues {
  top: number; // Scroll top position (0-1)
  left: number; // Scroll left position (0-1)
  clientWidth: number; // Width of the view
  clientHeight: number; // Height of the view
  scrollWidth: number; // Total scrollable width
  scrollHeight: number; // Total scrollable height
  scrollLeft: number; // Current horizontal scroll position
  scrollTop: number; // Current vertical scroll position
}
```

## 🎨 Styling

### Basic CSS Styling

```css
/* Container */
.custom-scrollbar {
  /* Your styles */
}

/* Vertical track */
.custom-scrollbar .track-vertical {
  background: rgba(0, 0, 0, 0.1);
  width: 8px;
  right: 2px;
  bottom: 2px;
  top: 2px;
  border-radius: 4px;
}

/* Vertical thumb */
.custom-scrollbar .thumb-vertical {
  background: rgba(0, 0, 0, 0.5);
  border-radius: 4px;
  cursor: pointer;
}

/* Horizontal track */
.custom-scrollbar .track-horizontal {
  background: rgba(0, 0, 0, 0.1);
  height: 8px;
  left: 2px;
  right: 2px;
  bottom: 2px;
  border-radius: 4px;
}

/* Horizontal thumb */
.custom-scrollbar .thumb-horizontal {
  background: rgba(0, 0, 0, 0.5);
  border-radius: 4px;
  cursor: pointer;
}
```

### Custom Components

```tsx
import Scrollbar from "react-custom-scrollbar";

const CustomScrollbar = () => (
  <Scrollbar
    renderThumbVertical={({ style, ...props }) => (
      <div {...props} style={{ ...style, backgroundColor: "#00f" }} />
    )}
    renderTrackVertical={({ style, ...props }) => (
      <div {...props} style={{ ...style, backgroundColor: "#f0f0f0" }} />
    )}
  >
    {/* Content */}
  </Scrollbar>
);
```

## 🔧 Advanced Usage

### Basic Usage

```tsx
import React from "react";
import Scrollbar from "@openabir/react-custom-scrollbar-lite";

const App = () => {
  return (
    <div style={{ width: 500, height: 300 }}>
      <Scrollbar>
        <div style={{ width: 1000, height: 1000 }}>
          {/* Your content here */}
          <p>Scrollable content</p>
        </div>
      </Scrollbar>
    </div>
  );
};

export default App;
```

### With Auto-Hide

```tsx
import React from "react";
import Scrollbar from "@openabir/react-custom-scrollbar-lite";

const App = () => {
  return (
    <div style={{ width: 500, height: 300 }}>
      <Scrollbar autoHide autoHideTimeout={1000} autoHideDuration={200}>
        <div style={{ width: 1000, height: 1000 }}>
          {/* Your content here */}
          <p>Scrollable content with auto-hiding scrollbars</p>
        </div>
      </Scrollbar>
    </div>
  );
};

export default App;
```

### With Custom Styling

```tsx
import React from "react";
import Scrollbar from "@openabir/react-custom-scrollbar-lite";

const App = () => {
  // Custom components for scrollbar parts
  const renderThumbVertical = ({ style, ...props }) => {
    const thumbStyle = {
      ...style,
      backgroundColor: "#6e8efb",
      borderRadius: 6,
    };
    return <div style={thumbStyle} {...props} />;
  };

  const renderTrackVertical = ({ style, ...props }) => {
    const trackStyle = {
      ...style,
      backgroundColor: "#f1f1f1",
      borderRadius: 6,
    };
    return <div style={trackStyle} {...props} />;
  };

  return (
    <div style={{ width: 500, height: 300 }}>
      <Scrollbar
        renderThumbVertical={renderThumbVertical}
        renderTrackVertical={renderTrackVertical}
        thumbMinSize={40}
      >
        <div style={{ width: 1000, height: 1000 }}>
          {/* Your content here */}
          <p>Scrollable content with custom styled scrollbars</p>
        </div>
      </Scrollbar>
    </div>
  );
};

export default App;
```

### With Event Handlers

```tsx
import React from "react";
import Scrollbar from "@openabir/react-custom-scrollbar-lite";
import { ScrollValues } from "@openabir/react-custom-scrollbar-lite";

const App = () => {
  const handleScrollStart = () => {
    console.log("Scrolling started");
  };

  const handleScrollStop = () => {
    console.log("Scrolling stopped");
  };

  const handleScroll = (values: ScrollValues) => {
    console.log("Scroll position:", values.top, values.left);
  };

  return (
    <div style={{ width: 500, height: 300 }}>
      <Scrollbar
        onScrollStart={handleScrollStart}
        onScrollStop={handleScrollStop}
        onScroll={handleScroll}
      >
        <div style={{ width: 1000, height: 1000 }}>
          {/* Your content here */}
          <p>Scrollable content with scroll event handlers</p>
        </div>
      </Scrollbar>
    </div>
  );
};

export default App;
```

### With Auto-Height

```tsx
import React from "react";
import Scrollbar from "@openabir/react-custom-scrollbar-lite";

const App = () => {
  return (
    <div style={{ width: 500 }}>
      <Scrollbar autoHeight autoHeightMin={100} autoHeightMax={500}>
        <div>
          {/* Your content here */}
          <p>Content with auto-height scrollbar</p>
          {/* More content... */}
        </div>
      </Scrollbar>
    </div>
  );
};

export default App;
```

## ♿ Accessibility

The scrollbar component includes built-in accessibility features:

- **ARIA attributes**: Proper ARIA roles and properties
- **Keyboard navigation**: Arrow keys, Page Up/Down, Home/End
- **Focus management**: Proper focus handling for screen readers
- **High contrast support**: Respects OS high contrast settings

### Keyboard Navigation

- `↑/↓` - Scroll vertically
- `←/→` - Scroll horizontally
- `Page Up/Page Down` - Scroll by page
- `Home/End` - Scroll to start/end

```tsx
<Scrollbar
  a11yEnabled={true} // Enabled by default
  ariaLabel="Custom scrollable content"
  keyboardScrollAmount={60} // Custom scroll amount for keyboard navigation
>
  <div>Content</div>
</Scrollbar>
```

## 🌐 Browser Support

This component is compatible with the following browsers:

| Browser        | Minimum Version      |
| -------------- | -------------------- |
| Chrome         | 61+                  |
| Firefox        | 60+                  |
| Safari         | 12.1+                |
| Edge           | 79+ (Chromium-based) |
| IE             | Not supported        |
| Opera          | 48+                  |
| iOS Safari     | 12.2+                |
| Android Chrome | 76+                  |

## 🔧 Polyfills

The component uses modern browser APIs that might require polyfills for older browsers:

- `ResizeObserver` (Required for auto-resize functionality)
- CSS Variables (Used for styling)
- Passive Event Listeners (Used for performance optimization)

For older browsers, you may need to include polyfills:

```bash
npm install resize-observer-polyfill
```

Then import and use the polyfill in your application entry point:

```javascript
import { setupPolyfills } from "@openabir/react-custom-scrollbar-lite";

// Setup all polyfills
setupPolyfills();
```

## 📱 Server-Side Rendering (SSR)

The component supports SSR out of the box. For Next.js:

```tsx
import dynamic from "next/dynamic";

const Scrollbar = dynamic(() => import("react-custom-scrollbar"), {
  ssr: false,
});
```

## 🎯 Performance Tips

1. **Use auto-hide**: Reduces DOM updates when not scrolling
2. **Minimize re-renders**: Use `React.memo` for content components
3. **Optimize content**: Use virtualization for large lists
4. **Throttle events**: Throttle scroll event handlers if needed

## 📖 Examples

Check out the [examples](./examples) directory for more usage examples:

- [Basic Usage](./examples/basic-usage.tsx)
- [Custom Styling](./examples/custom-styling.tsx)
- [Auto-hide Functionality](./examples/auto-hide.tsx)
- [Event Handlers](./examples/event-handlers.tsx)

## 🔬 Development

### Testing

Run the test suite:

```bash
npm test
```

Run tests with coverage:

```bash
npm run test:coverage
```

### Performance Benchmarking

Run performance benchmarks:

```bash
npm run benchmark
```

See the [benchmarks README](./benchmarks/README.md) for more information on performance testing.

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Credits

Created with ❤️ by [openabir](https://github.com/openabir)

## 📈 Changelog

See [CHANGELOG.md](CHANGELOG.md) for a list of changes and version history.

## 🐛 Issues

Found a bug? Please [open an issue](https://github.com/openabir/React-TS-custom-scrollbar/issues) on GitHub.

## 💬 Support

- 📖 [Documentation](https://github.com/openabir/React-TS-custom-scrollbar#readme)
- 🐛 [Issue Tracker](https://github.com/openabir/React-TS-custom-scrollbar/issues)
- 💡 [Feature Requests](https://github.com/openabir/React-TS-custom-scrollbar/issues/new?template=feature_request.md)

---

**Keywords**: react, scrollbar, scroll, typescript, component, ui, accessibility, cross-browser, lightweight, customizable
