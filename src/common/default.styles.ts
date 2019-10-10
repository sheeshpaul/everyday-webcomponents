const styles = `
    :host {
        --ew-background: #fff;
        --ew-color: #000;
        --ew-font-family: Georgia;
        --ew-font-size: 16px;
        all: initial; /* 1st rule so subsequent properties are reset. */
        display: block; /* By default, custom elements are display: inline */
    }
    :host([hidden]) {
        display: none;
    }
    *,
    *:before,
    *:after
    {
        box-sizing: border-box;
        margin-top: 0;
        margin-bottom: 0;
    }
    .default {
        font-family: var(--ew-font-family);
        font-size: var(--ew-font-size);
        font-weight: 400;
        line-height: normal;
    }
    .u-outline,
    .u-outline * {
        outline: 1px solid red;
    }
`;

export let adoptedDefaultStyleSheet: CSSStyleSheet;
export let templateDefaultStyleSheet: HTMLTemplateElement;

if ("adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype) {
    adoptedDefaultStyleSheet = new CSSStyleSheet();
    adoptedDefaultStyleSheet.replace(styles);
} else {
    templateDefaultStyleSheet = document.createElement("template");
    templateDefaultStyleSheet.innerHTML = `
        <style>
            ${styles}
        </style>
    `;
}
