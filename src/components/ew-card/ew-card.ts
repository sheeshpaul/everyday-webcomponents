import { template } from "./ew-card.template";

customElements.define("ew-card", class extends HTMLElement {
    public constructor() {
        console.log(`ContentPreview.constructor:`);
        super();

        this.attachShadow({ mode: 'open' });

        // Use a template element to clone DOM, instead of setting the innerHTML of the shadowRoot.
        // This technique cuts down on HTML parse costs because the content of the template is only parsed once,
        // whereas calling innerHTML on the shadowRoot will parse the HTML for each instance.
        (this.shadowRoot as ShadowRoot).appendChild(template.content.cloneNode(true));
    }
});