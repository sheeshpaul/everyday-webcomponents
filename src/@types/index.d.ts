// Need this empty export to prevent the following TS compile error:
//  TS2669: Augmentations for the global scope can only be directly nested in external modules or ambient module declarations.
export { };

declare global {
    /** Extending CSSStyleSheet interface. */
    interface CSSStyleSheet {
        /**
         * Add styles to the stylesheet.
         * @param content - The CSS content
         */
        replace(content: string): Promise<void>;
    }

    /** Extending Document interface. */
    interface Document {
        /** The adopted style sheet property. */
        adoptedStyleSheets: CSSStyleSheet[];
    }

    /** Extending ShadowRoot interface. */
    interface ShadowRoot {
        /** The adopted style sheet property. */
        adoptedStyleSheets: CSSStyleSheet[];
    }
}