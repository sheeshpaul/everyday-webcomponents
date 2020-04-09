import { ImageCardElement } from './../ew-image-card';

if (!customElements.get('ew-carousel-slide')) {
    customElements.define('ew-carousel-slide', class extends ImageCardElement {});
}
