import { colorGrey1 } from "./../../common";

const styles = `
    :host {
        --ew-background: rgba(0, 0, 0, .5);
        --ew-color: ${colorGrey1};
    }

    .carousel {
        width: 300px;
        height: 250px;
        background: var(--ew-background);
        position: relative;
        overflow: hidden;
    }
    .carousel--large {
        width: 620px;
        height: 350px;
    }

    .prev,
    .next {
        position: absolute;
        top: 97px;
        width: 36px;
        height: 56px;
        background: var(--ew-background);
        color: var(--ew-color);
        border: 0;
        z-index: 2;
    }
    .next {
        right: 0;
    }
    .carousel--large .prev,
    .carousel--large .next {
        top: 147px;
    }

    .prev:not([disabled]):hover,
    .next:not([disabled]):hover {
        cursor: pointer;
        color: #FFE500;
    }

    .prev svg,
    .next svg {
        position: absolute;
        top: 11px;
    }
    .next svg {
        left: 4px;
    }
    .prev svg {
        left: 0px;
    }

    .container {
        will-change: transform;
    }
`;

export let templateStyleSheet: HTMLTemplateElement;
export let adoptedStyleSheet: CSSStyleSheet;

if ("adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype) {
    adoptedStyleSheet = new CSSStyleSheet();
    adoptedStyleSheet.replace(styles);
} else {
    templateStyleSheet = document.createElement("template");
    templateStyleSheet.innerHTML = `
        <style>
            ${styles}
        </style>
    `;
}
