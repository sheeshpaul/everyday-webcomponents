import { addStyleSheets, adoptedDefaultStyleSheet, templateDefaultStyleSheet } from './../../common';
import { adoptedStyleSheet, templateStyleSheet } from './ew-carousel.styles';

import { template } from './ew-carousel.template';

/** The attributes. */
enum Attributes {
    type = 'type', // Type can have value large
    ariaRole = 'role',
    ariaRoleDescription = 'aria-roledescription',
    ariaLabel = 'aria-label',
}

/** The name for disabled attribute. */
const disabledAttribute = 'disabled';

class CarouselElement extends HTMLElement {
    /** The carousel element. */
    private carousel!: HTMLDivElement;

    /** The previous button element. */
    private previous!: HTMLButtonElement;

    /** The next button element. */
    private next!: HTMLButtonElement;

    /** The slide elements. */
    private slides: HTMLElement[] = [];

    /** The total number of slides. */
    private totalSlides = 0;

    /** The current slide number. */
    private currentSlide = 1;

    /** The observed attributes. */
    static get observedAttributes(): string[] {
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

        this.attachShadow({ mode: 'open' });
        this.shadowRoot!.appendChild(template.content.cloneNode(true));

        addStyleSheets(
            this.shadowRoot!,
            adoptedDefaultStyleSheet,
            adoptedStyleSheet,
            templateDefaultStyleSheet,
            templateStyleSheet,
        );

        this.onSlotChange = this.onSlotChange.bind(this);
        this.onNext = this.onNext.bind(this);
        this.onPrevious = this.onPrevious.bind(this);
    }

    /** Render the component. */
    public connectedCallback(): void {
        this.carousel = this.shadowRoot!.querySelector('.carousel') as HTMLDivElement;
        this.previous = this.shadowRoot!.querySelector('.prev') as HTMLButtonElement;
        this.next = this.shadowRoot!.querySelector('.next') as HTMLButtonElement;

        // shadowRoot can't have event handlers, so using the first child
        this.shadowRoot!.firstElementChild!.addEventListener('slotchange', this.onSlotChange);

        this.previous.addEventListener('click', this.onPrevious, { passive: true });
        this.next.addEventListener('click', this.onNext, { passive: true });

        this.setNavigationButtons();
    }

    /**
     * Callback for observed attribute change.
     * @param attrName - The attribute name
     * @param oldVal - The old attribute value
     * @param newVal - The new attribute value
     */
    public attributeChangedCallback(attrName: string, oldVal: string, newVal: string): void {
        if (!this.carousel) {
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
        const type = this.type;

        if (type) {
            this.carousel.classList.add(`carousel--${type}`);

            this.slides.forEach((slide) => {
                slide.setAttribute(Attributes.type, type as string);
            });
        } else {
            this.slides.forEach((slide) => {
                slide.removeAttribute(Attributes.type);
            });
        }
    }

    /** Set all the needed attributes. */
    private setAttributes(): void {
        this.slides.forEach((slide, index) => {
            slide.setAttribute(Attributes.ariaRole, 'group');
            slide.setAttribute(Attributes.ariaRoleDescription, 'slide');
            slide.setAttribute(Attributes.ariaLabel, `${index + 1} of ${this.totalSlides}`);

            if (index > 0) {
                slide.style.display = 'none';
            }
        });
    }

    /** Set the correct enabled state on navigation buttons. */
    private setNavigationButtons(): void {
        if (this.currentSlide > 1) {
            this.previous.removeAttribute(disabledAttribute);
        } else {
            this.previous.setAttribute(disabledAttribute, 'true');
        }

        if (this.currentSlide < this.totalSlides) {
            this.next.removeAttribute(disabledAttribute);
        } else {
            this.next.setAttribute(disabledAttribute, 'true');
        }
    }

    /**
     * Update the carousel and slot elements for type change.
     * @param oldVal - The old value
     * @param newVal - The new value
     */
    private updateType(oldVal: string, newVal: string): void {
        if (oldVal) {
            this.carousel.classList.remove(`carousel--${oldVal.toLowerCase()}`);
        }

        if (newVal) {
            this.carousel.classList.add(`carousel--${newVal.toLowerCase()}`);
        }

        this.setType();
    }

    /**
     * Event handler for slotchange event.
     * @param event - The event
     */
    private onSlotChange(event: Event): void {
        if (event && event.target) {
            this.slides = (event.target as HTMLSlotElement).assignedElements() as HTMLElement[];
            this.totalSlides = this.slides.length;

            this.setType();

            this.setAttributes();

            this.setNavigationButtons();
        }
    }

    /** The event handle for previous button click. */
    private onPrevious(): void {
        if (this.currentSlide > 1) {
            this.hideSlide(this.currentSlide - 1);

            this.currentSlide--;

            this.showSlide(this.currentSlide - 1);

            this.setNavigationButtons();
        }
    }

    /** The event handle for next button click. */
    private onNext(): void {
        if (this.currentSlide < this.totalSlides) {
            this.hideSlide(this.currentSlide - 1);

            this.currentSlide++;

            this.showSlide(this.currentSlide - 1);

            this.setNavigationButtons();
        }
    }

    /**
     * Helper function to show slide for given slide index.
     * @param slideIndex - The slide index
     */
    private showSlide(slideIndex: number): void {
        this.slides[slideIndex].style.display = 'block';
    }

    /**
     * Helper function to hide slide for given slide index.
     * @param slideIndex  - The slide index
     */
    private hideSlide(slideIndex: number): void {
        this.slides[slideIndex].style.display = 'none';
    }
}

if (!customElements.get('ew-carousel')) {
    customElements.define('ew-carousel', CarouselElement);
}
