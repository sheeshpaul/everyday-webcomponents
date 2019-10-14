export const template = document.createElement("template");
template.innerHTML = `
    <div class="default carousel">
        <div class="carousel-container">
            <slot></slot>
        </div>
        <button class="carousel-prev">Previous</button>
        <button class="carousel-next">Next</button>
    </div>
`;
