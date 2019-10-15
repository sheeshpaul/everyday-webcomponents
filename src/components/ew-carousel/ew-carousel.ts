import { adoptedDefaultStyleSheet, templateDefaultStyleSheet } from "./../../common";
import { adoptedStyleSheet, templateStyleSheet } from "./ew-carousel.styles";

import { template } from "./ew-carousel.template";

/** The supported attributes. */
enum Attributes {
    type = "type" // Type can have value large
}

customElements.define("ew-carousel", class extends HTMLElement {
    /** The carousel container element. */
    private container!: HTMLDivElement;

    /** The previous button element. */
    private previous!: HTMLButtonElement;

    /** The next button element. */
    private next!: HTMLButtonElement;

    /** The slot elements. */
    private slotElements: Element[] = [];

    /** The total number of slides. */
    private totalSlides = 0;

    /** The current slide number. */
    private currentSlide = 1;

    private readonly slideWidth = 620;

    /** The observed attributes. */
    static get observedAttributes() {
        return [Attributes.type];
    }

    /** Setter for type property. Keeps property in sync with attribute. */
    set type(value: string | null) {
        if (value) {
            this.setAttribute(Attributes.type, value);
        } else {
            this.removeAttribute(Attributes.type);
        }
    }

    /** Getter for type property. */
    get type(): string | null {
        let value = this.getAttribute(Attributes.type);
        if (value) {
            value = value.toLowerCase();
        }

        return value;
    }

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
        this.onNext = this.onNext.bind(this);
        this.onPrevious = this.onPrevious.bind(this);
    }

    /** Render the component. */
    public connectedCallback(): void {
        this.container = this.shadowRoot!.querySelector(".carousel-container") as HTMLDivElement;
        this.previous = this.shadowRoot!.querySelector(".carousel-prev") as HTMLButtonElement;
        this.next = this.shadowRoot!.querySelector(".carousel-next") as HTMLButtonElement;

        // shadowRoot can't have event handlers, so using the first child
        this.shadowRoot!.firstElementChild!.addEventListener("slotchange", this.onSlotChange);

        this.previous.addEventListener("click", this.onPrevious,  { passive: true });
        this.next.addEventListener("click", this.onNext, { passive: true });
    }

    /**
     * Callback for observed attribute change.
     * @param attrName - The attribute name
     * @param oldVal - The old attribute value
     * @param newVal - The new attribute value
     */
    public attributeChangedCallback(attrName: string, oldVal: string, newVal: string): void {
        if (!this.isConnected) {
            return;
        }

        switch (attrName) {
            case Attributes.type:
                this.updateType(oldVal, newVal);
                break;
            default:
        }
    }

    /** Set the correct type on slot elements. */
    private setType(): void {
        let type = this.type;

        if (type) {
            this.slotElements.forEach(element => {
                element.setAttribute(Attributes.type, type as string);
            });
        } else {
            this.slotElements.forEach(element => {
                element.removeAttribute(Attributes.type);
            });
        }
    }

    /** Update the type on slot elements. */
    private updateType(oldVal: string, newVal: string): void {
        this.setType();
    }

    /**
     * Event handler for slotchange event.
     * @param event - The event
     */
    private onSlotChange(event: Event): void {
        if (event && event.target) {
            this.slotElements = (event.target as HTMLSlotElement).assignedElements();

            this.totalSlides = this.slotElements.length;

            let containerWidth = `${this.totalSlides * this.slideWidth}px`;

            this.container.style.width = containerWidth;

            this.setType();
        }
    }

    /** The event handle for previous button click. */
    private onPrevious(): void {
        if (this.currentSlide > 1) {
            this.currentSlide--;
            this.slide();
        }
    }

    /** The event handle for next button click. */
    private onNext(): void {
        if (this.currentSlide < this.totalSlides) {
            this.currentSlide++;
            this.slide();
        }
    }

    /** Moves the container on x-axies. */
    private slide(): void {
        let x = (this.currentSlide - 1) * this.slideWidth * -1;
        this.container.style.transform = `translateX(${x}px)`;
    }
});
