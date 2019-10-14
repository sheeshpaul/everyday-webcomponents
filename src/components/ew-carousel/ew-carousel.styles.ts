const styles = `
    :host {
    }

    ::slotted(*) {
        float: left;
      }

    .carousel {
        width: 620px;
        height: 350px;
        background: var(--ew-background);
        position: relative;
        overflow: hidden;
    }

    .carousel-container {
        display: flow-root;
        height: 100%;
        transition: transform 250ms;
        will-change: transform;
    }

    .carousel-prev,
    .carousel-next {
        position: absolute;
        top: 160px;
        z-index: 2;
    }

    .carousel-next {
        right: 0;
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
