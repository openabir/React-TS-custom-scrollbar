import React, { useState, useRef, useEffect, useCallback } from "react";
import { ScrollbarProps, ScrollValues } from "../types";
import {
  getScrollValues,
  isDOMElement,
  getPassiveOptions,
  getThumbSize,
  getThumbPosition,
} from "../utils";

// Default component styles
const containerStyle: React.CSSProperties = {
  position: "relative",
  overflow: "hidden",
  width: "100%",
  height: "100%",
};

const viewStyle: React.CSSProperties = {
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  overflow: "scroll",
  WebkitOverflowScrolling: "touch",
};

const trackHorizontalStyle: React.CSSProperties = {
  position: "absolute",
  height: 6,
  right: 2,
  bottom: 2,
  left: 2,
  borderRadius: 3,
};

const trackVerticalStyle: React.CSSProperties = {
  position: "absolute",
  width: 6,
  right: 2,
  bottom: 2,
  top: 2,
  borderRadius: 3,
};

const thumbHorizontalStyle: React.CSSProperties = {
  position: "absolute",
  height: "100%",
  cursor: "pointer",
  borderRadius: "inherit",
  backgroundColor: "rgba(0, 0, 0, 0.2)",
};

const thumbVerticalStyle: React.CSSProperties = {
  position: "absolute",
  width: "100%",
  cursor: "pointer",
  borderRadius: "inherit",
  backgroundColor: "rgba(0, 0, 0, 0.2)",
};

// Default props
const defaultProps: Partial<ScrollbarProps> = {
  autoHide: false,
  autoHideTimeout: 1000,
  autoHideDuration: 200,
  autoHeight: false,
  autoHeightMin: 0,
  autoHeightMax: 200,
  thumbMinSize: 30,
  universal: false,
  hideTracksWhenNotNeeded: false,
  a11yEnabled: true,
  ariaLabel: "Scrollable content",
  keyboardScrollAmount: 40,
};

const Scrollbar: React.FC<ScrollbarProps> = (props) => {
  // Merge default props with provided props
  const {
    onScrollStart,
    onScrollStop,
    onScroll,
    onScrollFrame,
    onUpdate,
    renderView,
    renderTrackHorizontal,
    renderTrackVertical,
    renderThumbHorizontal,
    renderThumbVertical,
    autoHide,
    autoHideTimeout,
    autoHideDuration,
    autoHeight,
    autoHeightMin,
    autoHeightMax,
    thumbMinSize,
    universal,
    className,
    style,
    hideTracksWhenNotNeeded,
    a11yEnabled,
    ariaLabel,
    keyboardScrollAmount,
    children,
  } = { ...defaultProps, ...props };

  // Component state
  const [scrollValues, setScrollValues] = useState<ScrollValues>({
    left: 0,
    top: 0,
    scrollLeft: 0,
    scrollTop: 0,
    scrollWidth: 0,
    scrollHeight: 0,
    clientWidth: 0,
    clientHeight: 0,
  });
  const [isDragging, setIsDragging] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const [isTrackMouseOver, setIsTrackMouseOver] = useState(false);
  const [showTracks, setShowTracks] = useState(!autoHide);

  // Refs
  const containerRef = useRef<HTMLDivElement>(null);
  const viewRef = useRef<HTMLDivElement>(null);
  const trackHorizontalRef = useRef<HTMLDivElement>(null);
  const trackVerticalRef = useRef<HTMLDivElement>(null);
  const thumbHorizontalRef = useRef<HTMLDivElement>(null);
  const thumbVerticalRef = useRef<HTMLDivElement>(null);
  const scrollingRef = useRef<boolean>(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const hideTracksTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const dragStartRef = useRef<{
    x: number;
    y: number;
    left: number;
    top: number;
  } | null>(null);

  // Calculate if tracks should be visible
  const hasHorizontalTrack =
    scrollValues.scrollWidth > scrollValues.clientWidth;
  const hasVerticalTrack =
    scrollValues.scrollHeight > scrollValues.clientHeight;
  const showHorizontalTrack = !hideTracksWhenNotNeeded || hasHorizontalTrack;
  const showVerticalTrack = !hideTracksWhenNotNeeded || hasVerticalTrack;

  // Update scroll values
  const handleUpdate = useCallback(() => {
    if (!viewRef.current) return;

    const values = getScrollValues(viewRef.current);
    setScrollValues(values);

    if (onUpdate) {
      onUpdate(values);
    }
  }, [onUpdate]);

  // Handle scroll events
  const handleScroll = useCallback(() => {
    if (!viewRef.current) return;

    const values = getScrollValues(viewRef.current);
    setScrollValues(values);

    if (onScroll) {
      onScroll(values);
    }

    // Handle scroll start/stop events
    if (!scrollingRef.current) {
      scrollingRef.current = true;
      setIsScrolling(true);
      if (onScrollStart) {
        onScrollStart();
      }
    }

    // Handle scroll frame
    if (onScrollFrame) {
      onScrollFrame(values);
    }

    // Reset scroll timeout
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }

    scrollTimeoutRef.current = setTimeout(() => {
      scrollingRef.current = false;
      setIsScrolling(false);
      if (onScrollStop) {
        onScrollStop();
      }
    }, 100);
  }, [onScroll, onScrollFrame, onScrollStart, onScrollStop]);

  // Handle auto-hide behavior
  const handleTrackMouseEnter = useCallback(() => {
    setIsTrackMouseOver(true);
    setShowTracks(true);
  }, []);

  const handleTrackMouseLeave = useCallback(() => {
    setIsTrackMouseOver(false);
    if (!isDragging && !isScrolling && autoHide) {
      if (hideTracksTimeoutRef.current) {
        clearTimeout(hideTracksTimeoutRef.current);
      }
      hideTracksTimeoutRef.current = setTimeout(() => {
        setShowTracks(false);
      }, autoHideTimeout);
    }
  }, [autoHide, autoHideTimeout, isDragging, isScrolling]);

  // Handle thumb dragging
  const handleDragStart = useCallback(
    (event: React.MouseEvent | MouseEvent, axis: "x" | "y") => {
      event.preventDefault();
      event.stopPropagation();

      if (!viewRef.current) return;

      const { clientX, clientY } = event;
      const { scrollLeft, scrollTop } = viewRef.current;

      setIsDragging(true);
      dragStartRef.current = {
        x: clientX,
        y: clientY,
        left: scrollLeft,
        top: scrollTop,
      };

      // Add event listeners for drag
      document.addEventListener("mousemove", handleDrag);
      document.addEventListener("mouseup", handleDragEnd);
      document.body.style.cursor = "grabbing";
    },
    []
  );

  const handleDrag = useCallback((event: MouseEvent) => {
    if (!viewRef.current || !dragStartRef.current) return;

    const { clientX, clientY } = event;
    const { x, y, left, top } = dragStartRef.current;
    const { clientWidth, clientHeight, scrollWidth, scrollHeight } =
      viewRef.current;

    // Calculate new scroll position
    if (thumbHorizontalRef.current && clientWidth < scrollWidth) {
      const deltaX = clientX - x;
      const thumbSize = thumbHorizontalRef.current.clientWidth;
      const trackSize = trackHorizontalRef.current?.clientWidth || 0;
      const scrollRatio = (scrollWidth - clientWidth) / (trackSize - thumbSize);
      const newScrollLeft = left + deltaX * scrollRatio;

      viewRef.current.scrollLeft = newScrollLeft;
    }

    if (thumbVerticalRef.current && clientHeight < scrollHeight) {
      const deltaY = clientY - y;
      const thumbSize = thumbVerticalRef.current.clientHeight;
      const trackSize = trackVerticalRef.current?.clientHeight || 0;
      const scrollRatio =
        (scrollHeight - clientHeight) / (trackSize - thumbSize);
      const newScrollTop = top + deltaY * scrollRatio;

      viewRef.current.scrollTop = newScrollTop;
    }
  }, []);

  const handleDragEnd = useCallback(() => {
    setIsDragging(false);
    dragStartRef.current = null;

    // Remove event listeners
    document.removeEventListener("mousemove", handleDrag);
    document.removeEventListener("mouseup", handleDragEnd);
    document.body.style.cursor = "";

    // Handle auto-hide
    if (autoHide && !isTrackMouseOver && !isScrolling) {
      if (hideTracksTimeoutRef.current) {
        clearTimeout(hideTracksTimeoutRef.current);
      }
      hideTracksTimeoutRef.current = setTimeout(() => {
        setShowTracks(false);
      }, autoHideTimeout);
    }
  }, [autoHide, autoHideTimeout, isScrolling, isTrackMouseOver]);

  // Handle track click
  const handleTrackClick = useCallback(
    (event: React.MouseEvent, axis: "x" | "y") => {
      if (!viewRef.current) return;

      const { clientX, clientY } = event;
      const {
        scrollLeft,
        scrollTop,
        clientWidth,
        clientHeight,
        scrollWidth,
        scrollHeight,
      } = viewRef.current;

      if (
        axis === "x" &&
        trackHorizontalRef.current &&
        thumbHorizontalRef.current
      ) {
        const { left } = trackHorizontalRef.current.getBoundingClientRect();
        const thumbSize = thumbHorizontalRef.current.clientWidth;
        const clickPosition = clientX - left;
        const trackSize = trackHorizontalRef.current.clientWidth;
        const scrollRatio =
          (scrollWidth - clientWidth) / (trackSize - thumbSize);
        const thumbPosition = getThumbPosition({
          thumbSize,
          trackSize,
          contentSize: scrollWidth,
          scrollPosition: scrollLeft,
        });

        // Calculate new scroll position
        const newScrollLeft = (clickPosition - thumbSize / 2) * scrollRatio;
        viewRef.current.scrollLeft = newScrollLeft;
      }

      if (
        axis === "y" &&
        trackVerticalRef.current &&
        thumbVerticalRef.current
      ) {
        const { top } = trackVerticalRef.current.getBoundingClientRect();
        const thumbSize = thumbVerticalRef.current.clientHeight;
        const clickPosition = clientY - top;
        const trackSize = trackVerticalRef.current.clientHeight;
        const scrollRatio =
          (scrollHeight - clientHeight) / (trackSize - thumbSize);
        const thumbPosition = getThumbPosition({
          thumbSize,
          trackSize,
          contentSize: scrollHeight,
          scrollPosition: scrollTop,
        });

        // Calculate new scroll position
        const newScrollTop = (clickPosition - thumbSize / 2) * scrollRatio;
        viewRef.current.scrollTop = newScrollTop;
      }
    },
    []
  );

  // Handle keyboard navigation
  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (!viewRef.current || !a11yEnabled) return;

      const {
        scrollLeft,
        scrollTop,
        scrollHeight,
        scrollWidth,
        clientHeight,
        clientWidth,
      } = viewRef.current;
      const scrollStep = keyboardScrollAmount || 40;

      switch (event.key) {
        case "ArrowUp":
          event.preventDefault();
          viewRef.current.scrollTop = Math.max(0, scrollTop - scrollStep);
          break;
        case "ArrowDown":
          event.preventDefault();
          viewRef.current.scrollTop = Math.min(
            scrollHeight - clientHeight,
            scrollTop + scrollStep
          );
          break;
        case "ArrowLeft":
          event.preventDefault();
          viewRef.current.scrollLeft = Math.max(0, scrollLeft - scrollStep);
          break;
        case "ArrowRight":
          event.preventDefault();
          viewRef.current.scrollLeft = Math.min(
            scrollWidth - clientWidth,
            scrollLeft + scrollStep
          );
          break;
        case "Home":
          event.preventDefault();
          viewRef.current.scrollTop = 0;
          break;
        case "End":
          event.preventDefault();
          viewRef.current.scrollTop = scrollHeight - clientHeight;
          break;
        case "PageUp":
          event.preventDefault();
          viewRef.current.scrollTop = Math.max(0, scrollTop - clientHeight);
          break;
        case "PageDown":
          event.preventDefault();
          viewRef.current.scrollTop = Math.min(
            scrollHeight - clientHeight,
            scrollTop + clientHeight
          );
          break;
        default:
          return;
      }
    },
    [a11yEnabled, keyboardScrollAmount]
  );

  // Initialize and cleanup
  useEffect(() => {
    // Initial update
    handleUpdate();

    // Add resize observer
    const resizeObserver = new ResizeObserver(() => {
      handleUpdate();
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    if (viewRef.current) {
      resizeObserver.observe(viewRef.current);
    }

    // Add keyboard navigation if a11y is enabled
    if (a11yEnabled && containerRef.current) {
      containerRef.current.tabIndex = 0;
    }

    // Cleanup
    return () => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }

      if (hideTracksTimeoutRef.current) {
        clearTimeout(hideTracksTimeoutRef.current);
      }

      resizeObserver.disconnect();

      document.removeEventListener("mousemove", handleDrag);
      document.removeEventListener("mouseup", handleDragEnd);
    };
  }, [handleDrag, handleDragEnd, handleUpdate]);

  // Calculate styles
  const containerStyles: React.CSSProperties = {
    ...containerStyle,
    ...(autoHeight && {
      height: "auto",
      minHeight:
        typeof autoHeightMin === "number"
          ? `${autoHeightMin}px`
          : autoHeightMin,
      maxHeight:
        typeof autoHeightMax === "number"
          ? `${autoHeightMax}px`
          : autoHeightMax,
    }),
    ...style,
  };

  const thumbHorizontalWidth =
    hasHorizontalTrack && thumbHorizontalRef.current
      ? getThumbSize({
          thumbMinSize: thumbMinSize || 0,
          trackSize: scrollValues.clientWidth,
          contentSize: scrollValues.scrollWidth,
        })
      : 0;

  const thumbHorizontalX =
    hasHorizontalTrack && thumbHorizontalWidth
      ? getThumbPosition({
          thumbSize: thumbHorizontalWidth,
          trackSize: scrollValues.clientWidth,
          contentSize: scrollValues.scrollWidth,
          scrollPosition: scrollValues.scrollLeft,
        })
      : 0;

  const thumbVerticalHeight =
    hasVerticalTrack && thumbVerticalRef.current
      ? getThumbSize({
          thumbMinSize: thumbMinSize || 0,
          trackSize: scrollValues.clientHeight,
          contentSize: scrollValues.scrollHeight,
        })
      : 0;

  const thumbVerticalY =
    hasVerticalTrack && thumbVerticalHeight
      ? getThumbPosition({
          thumbSize: thumbVerticalHeight,
          trackSize: scrollValues.clientHeight,
          contentSize: scrollValues.scrollHeight,
          scrollPosition: scrollValues.scrollTop,
        })
      : 0;

  // Render custom components or default ones
  const customViewStyle = renderView ? {} : viewStyle;
  const customTrackHorizontalStyle = renderTrackHorizontal
    ? {}
    : trackHorizontalStyle;
  const customTrackVerticalStyle = renderTrackVertical
    ? {}
    : trackVerticalStyle;
  const customThumbHorizontalStyle = renderThumbHorizontal
    ? {}
    : thumbHorizontalStyle;
  const customThumbVerticalStyle = renderThumbVertical
    ? {}
    : thumbVerticalStyle;

  // Prepare track visibility styles
  const trackAutoHeightStyle = autoHeight
    ? { opacity: 1 }
    : {
        opacity: showTracks ? 1 : 0,
        transition: `opacity ${autoHideDuration}ms`,
      };

  const trackHorizontalVisibilityStyle = showHorizontalTrack
    ? { display: "block" }
    : { display: "none" };
  const trackVerticalVisibilityStyle = showVerticalTrack
    ? { display: "block" }
    : { display: "none" };

  // Render the component
  return (
    <div
      ref={containerRef}
      className={`react-custom-scrollbar ${className || ""}`}
      style={containerStyles}
      onKeyDown={handleKeyDown}
      tabIndex={a11yEnabled ? 0 : -1}
      role={a11yEnabled ? "region" : undefined}
      aria-label={a11yEnabled ? ariaLabel : undefined}
    >
      {/* Scrollable view */}
      {renderView ? (
        React.createElement(renderView, {
          ref: viewRef,
          style: customViewStyle,
          onScroll: handleScroll,
          children,
        })
      ) : (
        <div
          ref={viewRef}
          style={customViewStyle}
          onScroll={handleScroll}
          id="scrollable-content"
        >
          {children}
        </div>
      )}

      {/* Horizontal track */}
      {renderTrackHorizontal ? (
        React.createElement(renderTrackHorizontal, {
          ref: trackHorizontalRef,
          style: {
            ...customTrackHorizontalStyle,
            ...trackAutoHeightStyle,
            ...trackHorizontalVisibilityStyle,
          },
          onMouseEnter: handleTrackMouseEnter,
          onMouseLeave: handleTrackMouseLeave,
          onClick: (e: React.MouseEvent) => handleTrackClick(e, "x"),
        })
      ) : (
        <div
          ref={trackHorizontalRef}
          style={{
            ...customTrackHorizontalStyle,
            ...trackAutoHeightStyle,
            ...trackHorizontalVisibilityStyle,
          }}
          onMouseEnter={handleTrackMouseEnter}
          onMouseLeave={handleTrackMouseLeave}
          onClick={(e) => handleTrackClick(e, "x")}
          role={a11yEnabled ? "scrollbar" : undefined}
          aria-orientation={a11yEnabled ? "horizontal" : undefined}
          aria-controls="scrollable-content"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(scrollValues.left * 100)}
        >
          {/* Horizontal thumb */}
          {renderThumbHorizontal ? (
            React.createElement(renderThumbHorizontal, {
              ref: thumbHorizontalRef,
              style: {
                ...customThumbHorizontalStyle,
                width: `${thumbHorizontalWidth}px`,
                transform: `translateX(${thumbHorizontalX}px)`,
              },
              onMouseDown: (e: React.MouseEvent) => handleDragStart(e, "x"),
            })
          ) : (
            <div
              ref={thumbHorizontalRef}
              style={{
                ...customThumbHorizontalStyle,
                width: `${thumbHorizontalWidth}px`,
                transform: `translateX(${thumbHorizontalX}px)`,
              }}
              onMouseDown={(e) => handleDragStart(e, "x")}
            />
          )}
        </div>
      )}

      {/* Vertical track */}
      {renderTrackVertical ? (
        React.createElement(renderTrackVertical, {
          ref: trackVerticalRef,
          style: {
            ...customTrackVerticalStyle,
            ...trackAutoHeightStyle,
            ...trackVerticalVisibilityStyle,
          },
          onMouseEnter: handleTrackMouseEnter,
          onMouseLeave: handleTrackMouseLeave,
          onClick: (e: React.MouseEvent) => handleTrackClick(e, "y"),
        })
      ) : (
        <div
          ref={trackVerticalRef}
          style={{
            ...customTrackVerticalStyle,
            ...trackAutoHeightStyle,
            ...trackVerticalVisibilityStyle,
          }}
          onMouseEnter={handleTrackMouseEnter}
          onMouseLeave={handleTrackMouseLeave}
          onClick={(e) => handleTrackClick(e, "y")}
          role={a11yEnabled ? "scrollbar" : undefined}
          aria-orientation={a11yEnabled ? "vertical" : undefined}
          aria-controls="scrollable-content"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(scrollValues.top * 100)}
        >
          {/* Vertical thumb */}
          {renderThumbVertical ? (
            React.createElement(renderThumbVertical, {
              ref: thumbVerticalRef,
              style: {
                ...customThumbVerticalStyle,
                height: `${thumbVerticalHeight}px`,
                transform: `translateY(${thumbVerticalY}px)`,
              },
              onMouseDown: (e: React.MouseEvent) => handleDragStart(e, "y"),
            })
          ) : (
            <div
              ref={thumbVerticalRef}
              style={{
                ...customThumbVerticalStyle,
                height: `${thumbVerticalHeight}px`,
                transform: `translateY(${thumbVerticalY}px)`,
              }}
              onMouseDown={(e) => handleDragStart(e, "y")}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default Scrollbar;
