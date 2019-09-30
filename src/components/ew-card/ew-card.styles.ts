const styles = `
    :host {
        --ew-font-size: 20px;
    }

    .card {
        display: grid;
        grid-template-areas: "image"
                             "text";
        grid-template-columns: 1fr;
        grid-template-rows: 174px 176px;
        box-shadow: 0px 1.6px 3.6px rgba(0,0,0,0.13), 0px 0.3px 0.9px rgba(0,0,0,0.11);
        width: 300px;
        height: 350px;
        background: var(--ew-background);
        color: var(--ew-color);
    }
    .card--small {
        grid-template-areas: "text";
        grid-template-rows: 176px;
        height: 176px;
    }
    .card--compact {
        grid-template-areas: "image text";
        grid-template-columns: 140px 1fr;
        grid-template-rows: 84px;
        height: 84px;
        width: 100%;
    }

    .card-image {
        grid-area: image;
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
    .card--small .card-image {
        display: none;
    }

    .card-text {
        grid-area: text;
        padding: 8px 16px;
    }
    .card-text p {
        font-size: var(--ew-font-size);
        line-height: calc(var(--ew-font-size) + 8px);
        max-height: 160px;
        overflow: hidden;
    }
    .card--compact .card-text p {
        max-height: 68px;
    }

    .card-link {
        grid-column: 1 / span 2;
        grid-row: 1 / span 2;
        z-index: 2;
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