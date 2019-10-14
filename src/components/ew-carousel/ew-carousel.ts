import { adoptedDefaultStyleSheet, templateDefaultStyleSheet } from "./../../common";
import { adoptedStyleSheet, templateStyleSheet } from "./ew-carousel.styles";

import { template } from "./ew-carousel.template";

customElements.define("ew-carousel", class extends HTMLElement {

    /** The carousel container element. */
    private container!: HTMLDivElement;

    /** The previous button element. */
    private previous!: HTMLButtonElement;

    /** The next button element. */
    private next!: HTMLButtonElement;

    /** The total number of slides. */
    private totalSlides = 0;

    /** The current slide number. */
    private currentSlide = 1;

    private readonly slideWidth = 620;

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
     * Event handler for slotchange event.
     * @param event - The event
     */
    private onSlotChange(event: Event): void {
        if (event && event.target) {
            let slotElements = (event.target as HTMLSlotElement).assignedElements();

            this.totalSlides = slotElements.length;

            let containerWidth = `${this.totalSlides * this.slideWidth}px`;

            console.log(`onSlotChange: width ${containerWidth}`);
            this.container.style.width = containerWidth;
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
