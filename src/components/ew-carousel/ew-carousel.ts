import { adoptedDefaultStyleSheet, templateDefaultStyleSheet } from "./../../common";
import { adoptedStyleSheet, templateStyleSheet } from "./ew-carousel.styles";

import { template } from "./ew-carousel.template";

/** The supported attributes. */
enum Attributes {
    type = "type" // Type can have value large
}

/** The supported slide width. */
enum SlideWidth {
    regular = 300,
    large = 620
}

/** The name for enabled class. */
const enabledClass = "enabled";

customElements.define("ew-carousel", class extends HTMLElement {
    /** The carousel element. */
    private carousel!: HTMLDivElement;

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

    /** The slide width based on carousel type. */
    private slideWidth = 0;

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
        this.carousel = this.shadowRoot!.querySelector(".carousel") as HTMLDivElement;
        this.container = this.shadowRoot!.querySelector(".container") as HTMLDivElement;
        this.previous = this.shadowRoot!.querySelector(".prev") as HTMLButtonElement;
        this.next = this.shadowRoot!.querySelector(".next") as HTMLButtonElement;

        // shadowRoot can't have event handlers, so using the first child
        this.shadowRoot!.firstElementChild!.addEventListener("slotchange", this.onSlotChange);

        this.previous.addEventListener("click", this.onPrevious,  { passive: true });
        this.next.addEventListener("click", this.onNext, { passive: true });

        this.setSlideWidth();
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

    /** Set slide width based on carousel type. */
    private setSlideWidth(): void {
        this.slideWidth = this.type === "large" ? SlideWidth.large : SlideWidth.regular;
    }

    /** Set the container width based on type and number of slides. */
    private setContainerWidth(): void {
        this.container.style.width = `${this.totalSlides * this.slideWidth}px`;
    }

    /** Set the correct type on slot elements. */
    private setType(): void {
        let type = this.type;

        if (type) {
            this.carousel.classList.add(`carousel--${type}`);

            this.slotElements.forEach(element => {
                element.setAttribute(Attributes.type, type as string);
            });
        } else {
            this.slotElements.forEach(element => {
                element.removeAttribute(Attributes.type);
            });
        }
    }

    /** Set the correct enabled state on navigation buttons. */
    private setNavigationButtons(): void {
        if (this.currentSlide > 1) {
            this.previous.classList.add(enabledClass);
        } else {
            this.previous.classList.remove(enabledClass);
        }

        if (this.currentSlide < this.totalSlides) {
            this.next.classList.add(enabledClass);
        } else {
            this.next.classList.remove(enabledClass);
        }
    }

    /** Update the carousel and slot elements for type change. */
    private updateType(oldVal: string, newVal: string): void {
        // Step 1: Apply correct carousel class
        if (oldVal) {
            this.carousel.classList.remove(`carousel--${oldVal.toLowerCase()}`);
        }

        if (newVal) {
            this.carousel.classList.add(`carousel--${newVal.toLowerCase()}`);
        }

        // Step 2: Update container width
        this.setSlideWidth();
        this.setContainerWidth();

        // Step 3: Update type on slot elements
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

            this.setContainerWidth();

            this.setType();

            this.setNavigationButtons();
        }
    }

    /** The event handle for previous button click. */
    private onPrevious(): void {
        if (this.currentSlide > 1) {
            this.currentSlide--;
            this.slide();
            this.setNavigationButtons();
        }
    }

    /** The event handle for next button click. */
    private onNext(): void {
        if (this.currentSlide < this.totalSlides) {
            this.currentSlide++;
            this.slide();
            this.setNavigationButtons();
        }
    }

    /** Moves the container on x-axies. */
    private slide(): void {
        let x = (this.currentSlide - 1) * this.slideWidth * -1;
        this.container.style.transform = `translateX(${x}px)`;
    }
});
