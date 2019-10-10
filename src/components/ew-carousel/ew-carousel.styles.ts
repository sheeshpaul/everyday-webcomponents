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
    }

    .carousel-container {
        display: flow-root;
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
