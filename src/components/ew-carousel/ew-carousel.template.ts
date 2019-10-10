export const template = document.createElement("template");
template.innerHTML = `
    <div class="default carousel u-outline">
        <div class="carousel-container">
            <slot></slot>
        </div>
    </div>
`;
