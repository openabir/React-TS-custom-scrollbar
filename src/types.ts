import React from "react";

export interface ScrollbarProps {
  /**
   * Called when scrolling starts
   */
  onScrollStart?: () => void;

  /**
   * Called when scrolling stops
   */
  onScrollStop?: () => void;

  /**
   * Called on scroll
   */
  onScroll?: (values: ScrollValues) => void;

  /**
   * Called with scroll values on each scroll frame
   */
  onScrollFrame?: (values: ScrollValues) => void;

  /**
   * Called when scrollbar updates
   */
  onUpdate?: (values: ScrollValues) => void;

  /**
   * Function to render the scrollbar view
   */
  renderView?: React.ComponentType<React.HTMLProps<HTMLDivElement>>;

  /**
   * Function to render the horizontal track
   */
  renderTrackHorizontal?: React.ComponentType<React.HTMLProps<HTMLDivElement>>;

  /**
   * Function to render the vertical track
   */
  renderTrackVertical?: React.ComponentType<React.HTMLProps<HTMLDivElement>>;

  /**
   * Function to render the horizontal thumb
   */
  renderThumbHorizontal?: React.ComponentType<React.HTMLProps<HTMLDivElement>>;

  /**
   * Function to render the vertical thumb
   */
  renderThumbVertical?: React.ComponentType<React.HTMLProps<HTMLDivElement>>;

  /**
   * Hide scrollbars when not scrolling
   */
  autoHide?: boolean;

  /**
   * Wait time before hiding scrollbars (ms)
   */
  autoHideTimeout?: number;

  /**
   * Duration of hide animation (ms)
   */
  autoHideDuration?: number;

  /**
   * Enable auto-height mode
   */
  autoHeight?: boolean;

  /**
   * Minimum height for auto-height mode
   */
  autoHeightMin?: number | string;

  /**
   * Maximum height for auto-height mode
   */
  autoHeightMax?: number | string;

  /**
   * Minimum size of thumb (px)
   */
  thumbMinSize?: number;

  /**
   * Enable universal rendering
   */
  universal?: boolean;

  /**
   * Additional CSS class names
   */
  className?: string;

  /**
   * Additional inline styles
   */
  style?: React.CSSProperties;

  /**
   * Hide horizontal scrollbar
   */
  hideTracksWhenNotNeeded?: boolean;

  /**
   * Enable accessibility features (ARIA attributes, keyboard navigation)
   */
  a11yEnabled?: boolean;

  /**
   * ARIA label for the scrollbar
   */
  ariaLabel?: string;

  /**
   * Scroll amount (in pixels) to use for keyboard navigation
   */
  keyboardScrollAmount?: number;

  /**
   * Children of the component
   */
  children?: React.ReactNode;
}

export interface ScrollValues {
  /**
   * Left scroll position
   */
  left: number;

  /**
   * Top scroll position
   */
  top: number;

  /**
   * Width of scrollbar container
   */
  clientWidth: number;

  /**
   * Height of scrollbar container
   */
  clientHeight: number;

  /**
   * Width of scrollable content
   */
  scrollWidth: number;

  /**
   * Height of scrollable content
   */
  scrollHeight: number;

  /**
   * Maximum left scroll position
   */
  scrollLeft: number;

  /**
   * Maximum top scroll position
   */
  scrollTop: number;
}
