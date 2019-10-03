const styles = `
    :host {
        --ew-background: rgba(0, 0, 0, .5);
        --ew-color: #fff;
        --ew-font-size: 20px;
    }

    .card {
        display: grid;
        grid-template-columns: 1fr;
        grid-template-rows: 1fr auto;
        box-shadow: 0px 1.6px 3.6px rgba(0,0,0,0.13), 0px 0.3px 0.9px rgba(0,0,0,0.11);
        width: 300px;
        height: 250px;
        background: var(--ew-background);
        color: var(--ew-color);
    }
    .card--large {
        width: 620px;
        height: 350px;
    }

    .card-image {
        grid-column: 1;
        grid-row: 1 / span 2;
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .card-text {
        grid-column: 1;
        grid-row: 2;
        padding: 8px 16px 8px 16px;
        background: var(--ew-background);
    }
    .card-text p {
        font-size: var(--ew-font-size);
        line-height: calc(var(--ew-font-size) + 8px);
        max-height: 84px;
        overflow: hidden;
    }
    .card--large .card-text p {
        max-height: 58px;
    }

    .card-link {
        grid-column: 1 / span 2;
        grid-row: 1 / span 2;
        z-index: 2;
    }

    .u-hidden {
        display: none;
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