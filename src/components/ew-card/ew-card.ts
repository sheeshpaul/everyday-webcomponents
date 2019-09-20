import { adoptedDefaultStyleSheet, templateDefaultStyleSheet } from "./../../common";
import { adoptedStyleSheet, templateStyleSheet } from "./ew-card.styles";

import { template } from "./ew-card.template";

/** The supported attributes. */
enum Attributes {
    type = "type", // Type can have value small, medium, compact
    image = "image",
    text = "text",
    link = "link"
}

customElements.define("ew-card", class extends HTMLElement {

    /** The shadow root. */
    private root: ShadowRoot;

    /** The card element. */
    private cardElement!: HTMLDivElement;;

    /** The image element. */
    private imageElement!: HTMLImageElement;

    /** The text element. */
    private textElement!: HTMLParagraphElement;

    /** The anchor element. */
    private linkElement!: HTMLAnchorElement;

    /** The fallback image. */
    private fallbackImage: string;

    /** The observed attributes. */
    static get observedAttributes() {
        return [Attributes.type, Attributes.image, Attributes.text, Attributes.link];
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

    /** Setter for image property. Keeps property in synce with attribute */
    set image(value: string | null) {
        if (value) {
            this.setAttribute(Attributes.image, value);
        } else {
            this.removeAttribute(Attributes.image);
        }
    }

    /** Getter for image property. */
    get image(): string | null {
        return this.getAttribute(Attributes.image);
    }

    /** Setter for text property. Keeps property in synce with attribute */
    set text(value: string | null) {
        if (value) {
            this.setAttribute(Attributes.text, value);
        } else {
            this.removeAttribute(Attributes.text);
        }
    }

    /** Getter for text property. */
    get text(): string | null {
        return this.getAttribute(Attributes.text);
    }

    /** Setter for link property. Keeps property in synce with attribute */
    set link(value: string | null) {
        if (value) {
            this.setAttribute(Attributes.link, value);
        } else {
            this.removeAttribute(Attributes.link);
        }
    }

    /** Getter for link property. */
    get link(): string | null {
        return this.getAttribute(Attributes.link);
    }

    /** An instance of the element is created or upgraded. */
    public constructor() {
        console.log(`ew-card.constructor:`);
        super();

        this.fallbackImage = "data:image/gif;base64,R0lGODlhAQABAIAAAMzMzAAAACH5BAAAAP8ALAAAAAABAAEAAAICRAEAOw==";

        this.root = this.attachShadow({ mode: "open" });
        this.root.appendChild(template.content.cloneNode(true));

        // Use constructable stylesheet when the feature is present.
        // This ensures single instance of stylesheet is used across all the instances of this component.
        if (adoptedStyleSheet) {
            this.root.adoptedStyleSheets = [adoptedDefaultStyleSheet, adoptedStyleSheet];
        } else {
            this.root.appendChild(templateDefaultStyleSheet.content.cloneNode(true));
            this.root.appendChild(templateStyleSheet.content.cloneNode(true));
        }
    }

    /** Render the component. */
    public connectedCallback(): void {
        console.log(`ew-card.connectedCallback:`);

        this.cardElement = this.root.querySelector(".card") as HTMLDivElement;
        this.imageElement = this.root.querySelector(".card-image") as HTMLImageElement;
        this.textElement = this.root.querySelector(".card-text p") as HTMLParagraphElement;
        this.linkElement = this.root.querySelector(".card-link") as HTMLAnchorElement;

        this.setType();
        this.setImage();
        this.setText();
        this.setLink();
    }

    /**
     * Callback for observed attribute change.
     * @param attrName - The attribute name
     * @param oldVal - The old attribute value
     * @param newVal - The new attribute value
     */
    public attributeChangedCallback(attrName: string, oldVal: string, newVal: string): void {
        console.log(`ew-card.attributeChangedCallback: attrName:${attrName} oldVal:${oldVal} newVal:${newVal}`);

        if (!this.isConnected) {
            return;
        }

        switch (attrName) {
            case Attributes.type:
                this.updateType(oldVal, newVal);
                break;
            case Attributes.image:
                this.updateImage(oldVal, newVal);
                break;
            case Attributes.text:
                this.updateText(oldVal, newVal);
                break;
            case Attributes.link:
                this.updateLink(oldVal, newVal);
                break;
            default:
        }
    }

    /** Set card type class on the card element. */
    private setType(): void {
        let type = this.type;
        if (type) {
            this.cardElement.classList.add(`card--${type}`);
        }
    }

    /** Set image element's width, height, and src attributes. */
    private setImage(): void {
        let image = this.image;
        if (!image) {
            image = this.fallbackImage;
        }

        let imageWidth = 300;
        let imageHeight = 174;

        let type = this.type;
        if (type === "compact") {
            imageWidth = 140;
            imageHeight = 84;
        }

        this.imageElement.width = imageWidth;
        this.imageElement.height = imageHeight;
        this.imageElement.src = image;
    }

    /** Set text on the text element. */
    private setText(): void {
        let text = this.text;
        if (text) {
            this.textElement.innerText = text;
        }
    }

    /** Set link element's href attribute. */
    private setLink(): void {
        let link = this.link;
        if (link) {
            this.linkElement.href = link;
        }
    }

    /**
     * Update type class on card element.
     * @param oldVal - The old value for type attribute
     * @param newVal - The new value for type attribute
     */
    private updateType(oldVal: string, newVal: string): void {
        if (oldVal) {
            this.cardElement.classList.remove(`card--${oldVal.toLowerCase()}`);
        }

        if (newVal) {
            this.cardElement.classList.add(`card--${newVal.toLowerCase()}`);
        }
    }

    /**
     * Update src attribute on image element.
     * @param oldVal - The old value for image attribute
     * @param newVal - The new value for image attribute
     */
    private updateImage(oldVal: string, newVal: string): void {
        if (newVal) {
            this.imageElement.src = newVal;
        } else {
            this.imageElement.src = this.fallbackImage;
        }
    }

    /**
     * Update text on text element.
     * @param oldVal - The old value for text attribute
     * @param newVal - The new value for text attribute
     */
    private updateText(oldVal: string, newVal: string): void {
        this.textElement.innerText = newVal;
    }

    /**
     * Update href attribute on link element.
     * @param oldVal - The old value for link attribute
     * @param newVal - The new value for link attribute
     */
    private updateLink(oldVal: string, newVal: string): void {
        if (newVal) {
            this.linkElement.href = newVal;
        } else {
            this.linkElement.removeAttribute("href");
        }
    }
});