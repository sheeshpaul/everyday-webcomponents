export const template = document.createElement("template");
template.innerHTML = `
    <section class="default carousel" aria-roledescription="carousel" aria-label="The carousel to show content">
        <button class="prev" aria-label="Previous Slide" aria-controls="container">
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M15 18l-6-6 6-6" />
            </svg>
        </button>
        <button class="next" aria-label="Next Slide" aria-controls="container">
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M9 18l6-6-6-6"/>
            </svg>
        </button>
        <div id="container" class="container" aria-live="polite">
            <slot></slot>
        </div>
    </section>
`;
