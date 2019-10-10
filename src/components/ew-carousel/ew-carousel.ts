import { adoptedDefaultStyleSheet, templateDefaultStyleSheet } from "./../../common";
import { adoptedStyleSheet, templateStyleSheet } from "./ew-carousel.styles";

import { template } from "./ew-carousel.template";

customElements.define("ew-carousel", class extends HTMLElement {

    /** The carousel element. */
    private carouselElement!: HTMLDivElement;

    /** The carousel container element. */
    private carouselContainerElement!: HTMLDivElement;

    /** An instance of the element is created or upgraded. */
    public constructor() {
        super();

        this.attachShadow({ mode: "open" });
        this.shadowRoot!.appendChild(template.content.cloneNode(true));

        // Use constructable stylesheet when the feature is present.
        // This ensures single instance of stylesheet is used across all the instances of this component.
        if (adoptedStyleSheet) {
            this.shadowRoot!.adoptedStyleSheets = [adoptedDefaultStyleSheet, adoptedStyleSheet];
        } else {
            this.shadowRoot!.appendChild(templateDefaultStyleSheet.content.cloneNode(true));
            this.shadowRoot!.appendChild(templateStyleSheet.content.cloneNode(true));
        }

        this.onSlotChange = this.onSlotChange.bind(this);
    }

    /** Render the component. */
    public connectedCallback(): void {
        this.carouselElement = this.shadowRoot!.querySelector(".carousel") as HTMLDivElement;
        this.carouselContainerElement = this.shadowRoot!.querySelector(".carousel-container") as HTMLDivElement;

        // shadowRoot can't have event handlers, so using the first child
        this.shadowRoot!.firstElementChild!.addEventListener("slotchange", this.onSlotChange);
    }

    /**
     * Event handler for slotchange event.
     * @param event - The event
     */
    private onSlotChange(event: Event): void {
        if (event && event.target) {
            let slotElements = (event.target as HTMLSlotElement).assignedElements();
            let containerWidth = `${slotElements.length * 620}px`;

            console.log(`onSlotChange: width ${containerWidth}`);
            this.carouselContainerElement.style.width = containerWidth;
        }
    }
});
