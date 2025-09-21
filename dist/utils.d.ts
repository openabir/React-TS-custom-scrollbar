/**
 * Get scroll values for an element
 */
export declare function getScrollValues(element: HTMLElement): {
    left: number;
    top: number;
    scrollLeft: number;
    scrollTop: number;
    scrollWidth: number;
    scrollHeight: number;
    clientWidth: number;
    clientHeight: number;
};
/**
 * Check if element is a DOM element
 */
export declare function isDOMElement(element: any): element is HTMLElement;
/**
 * Return false if passive events aren't supported, otherwise return an object with passive: true
 */
export declare const getPassiveOptions: () => false | {
    passive: boolean;
};
/**
 * Calculate thumb size
 */
export declare function getThumbSize({ thumbMinSize, trackSize, contentSize }: {
    thumbMinSize: number;
    trackSize: number;
    contentSize: number;
}): number;
/**
 * Calculate thumb position
 */
export declare function getThumbPosition({ thumbSize, trackSize, contentSize, scrollPosition }: {
    thumbSize: number;
    trackSize: number;
    contentSize: number;
    scrollPosition: number;
}): number;
