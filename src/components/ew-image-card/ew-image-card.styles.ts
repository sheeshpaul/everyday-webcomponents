import { colorGrey1, fontSize5, size2, size3 } from './../../common';

const styles = `
    :host {
        --ew-background: rgba(0, 0, 0, .5);
        --ew-color: ${colorGrey1};
        --ew-font-size: ${fontSize5};
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

    img {
        grid-column: 1;
        grid-row: 1 / span 2;
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .card div {
        grid-column: 1;
        grid-row: 2;
        padding: ${size2};
        background: var(--ew-background);
    }
    .card--large div {
        padding: ${size3};
    }
    p {
        font-size: var(--ew-font-size);
        line-height: calc(var(--ew-font-size) + 8px);
        max-height: 84px;
        overflow: hidden;
    }
    .card--large p {
        max-height: 58px;
    }

    a {
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

if ('adoptedStyleSheets' in Document.prototype && 'replace' in CSSStyleSheet.prototype) {
    adoptedStyleSheet = new CSSStyleSheet();
    adoptedStyleSheet.replace(styles);
} else {
    templateStyleSheet = document.createElement('template');
    templateStyleSheet.innerHTML = `
        <style>
            ${styles}
        </style>
    `;
}
