const styles = `
    :host {
        --background: #fff;
        --color: #000;
        --fontFamily: Georgia;
        --fontSize: 16px;
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
        font-family: var(--fontFamily);
        font-size: var(--fontSize);
        font-weight: 400;
        line-height: normal;
    }
    .u-outline,
    .u-outline * {
        outline: 1px solid black;
    }
`;

export let adoptedDefaultStyleSheet: CSSStyleSheet;
export let templateDefaultStyleSheet: HTMLTemplateElement;

if ("adoptedStyleSheets" in Document.prototype && "replaceSync" in CSSStyleSheet.prototype) {
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