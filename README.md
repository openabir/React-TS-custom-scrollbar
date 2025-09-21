# React Custom Scrollbar

A customizable, accessible, and production-ready scrollbar component for React applications with TypeScript support.

## Installation

```bash
npm install react-custom-scrollbar
# or
yarn add react-custom-scrollbar
```

## Features

- Fully customizable scrollbar appearance
- Auto-hide scrollbars when not in use
- Custom rendering for all scrollbar parts
- Event callbacks for scroll actions
- Auto-height support
- TypeScript support
- Universal rendering support
- Accessibility features with keyboard navigation
- Comprehensive browser compatibility
- Fully tested with Jest and React Testing Library
- Performance benchmarking

## Usage

### Basic Usage

```tsx
import React from "react";
import Scrollbar from "react-custom-scrollbar";

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
import Scrollbar from "react-custom-scrollbar";

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
import Scrollbar from "react-custom-scrollbar";

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
import Scrollbar from "react-custom-scrollbar";
import { ScrollValues } from "react-custom-scrollbar";

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
import Scrollbar from "react-custom-scrollbar";

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

## Props

| Prop                      | Type                                                   | Default                | Description                                                          |
| ------------------------- | ------------------------------------------------------ | ---------------------- | -------------------------------------------------------------------- |
| `onScrollStart`           | `() => void`                                           | -                      | Called when scrolling starts                                         |
| `onScrollStop`            | `() => void`                                           | -                      | Called when scrolling stops                                          |
| `onScroll`                | `(values: ScrollValues) => void`                       | -                      | Called on scroll                                                     |
| `onScrollFrame`           | `(values: ScrollValues) => void`                       | -                      | Called with scroll values on each scroll frame                       |
| `onUpdate`                | `(values: ScrollValues) => void`                       | -                      | Called when scrollbar updates                                        |
| `renderView`              | `React.ComponentType<React.HTMLProps<HTMLDivElement>>` | -                      | Function to render the scrollbar view                                |
| `renderTrackHorizontal`   | `React.ComponentType<React.HTMLProps<HTMLDivElement>>` | -                      | Function to render the horizontal track                              |
| `renderTrackVertical`     | `React.ComponentType<React.HTMLProps<HTMLDivElement>>` | -                      | Function to render the vertical track                                |
| `renderThumbHorizontal`   | `React.ComponentType<React.HTMLProps<HTMLDivElement>>` | -                      | Function to render the horizontal thumb                              |
| `renderThumbVertical`     | `React.ComponentType<React.HTMLProps<HTMLDivElement>>` | -                      | Function to render the vertical thumb                                |
| `autoHide`                | `boolean`                                              | `false`                | Hide scrollbars when not scrolling                                   |
| `autoHideTimeout`         | `number`                                               | `1000`                 | Wait time before hiding scrollbars (ms)                              |
| `autoHideDuration`        | `number`                                               | `200`                  | Duration of hide animation (ms)                                      |
| `autoHeight`              | `boolean`                                              | `false`                | Enable auto-height mode                                              |
| `autoHeightMin`           | `number \| string`                                     | `0`                    | Minimum height for auto-height mode                                  |
| `autoHeightMax`           | `number \| string`                                     | `200`                  | Maximum height for auto-height mode                                  |
| `thumbMinSize`            | `number`                                               | `30`                   | Minimum size of thumb (px)                                           |
| `universal`               | `boolean`                                              | `false`                | Enable universal rendering                                           |
| `className`               | `string`                                               | -                      | Additional CSS class names                                           |
| `style`                   | `React.CSSProperties`                                  | -                      | Additional inline styles                                             |
| `hideTracksWhenNotNeeded` | `boolean`                                              | `false`                | Hide tracks when not needed                                          |
| `a11yEnabled`             | `boolean`                                              | `true`                 | Enable accessibility features (ARIA attributes, keyboard navigation) |
| `ariaLabel`               | `string`                                               | `'Scrollable content'` | ARIA label for the scrollbar                                         |
| `keyboardScrollAmount`    | `number`                                               | `40`                   | Scroll amount (px) for keyboard navigation                           |

## ScrollValues Interface

The `ScrollValues` interface is used in various callback props and contains the following properties:

```typescript
interface ScrollValues {
  left: number; // Left scroll position (0 to 1)
  top: number; // Top scroll position (0 to 1)
  clientWidth: number; // Width of scrollbar container
  clientHeight: number; // Height of scrollbar container
  scrollWidth: number; // Width of scrollable content
  scrollHeight: number; // Height of scrollable content
  scrollLeft: number; // Maximum left scroll position
  scrollTop: number; // Maximum top scroll position
}
```

## Browser Compatibility

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

The component uses modern browser APIs that might require polyfills for older browsers:

- `ResizeObserver` (Required for auto-resize functionality)
- CSS Variables (Used for styling)
- Passive Event Listeners (Used for performance optimization)

If you need to support older browsers, consider adding the following polyfills:

```bash
npm install resize-observer-polyfill
```

Then import and use the polyfill in your application entry point:

```javascript
import { setupPolyfills } from "react-custom-scrollbar";

// Setup all polyfills
setupPolyfills();
```

## Accessibility

This component includes built-in accessibility features:

- Keyboard navigation support (arrow keys, Page Up/Down, Home/End)
- ARIA attributes for screen readers
- Focus management

To use accessibility features:

```tsx
<Scrollbar
  a11yEnabled={true} // Enabled by default
  ariaLabel="Custom scrollable content"
  keyboardScrollAmount={60} // Custom scroll amount for keyboard navigation
>
  <div>Content</div>
</Scrollbar>
```

## Development

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

## License

MIT
