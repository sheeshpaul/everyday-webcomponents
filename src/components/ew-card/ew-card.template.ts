export const template = document.createElement("template");
template.innerHTML = `
    <div class="Default ContentPreview">
        <img class="ContentPreview-image" loading="lazy" src="data:image/gif;base64,R0lGODlhAQABAIAAAMzMzAAAACH5BAAAAP8ALAAAAAABAAEAAAICRAEAOw==" />
        <div class="ContentPreview-headline">
            <p class="ContentPreview-headline-text"></p>
        </div>
        <div class="ContentPreview-provider">
            <img class="ContentPreview-provider-image" loading="lazy" />
            <div class="ContentPreview-provider-text"></div>
        </div>
        <a class="ContentPreview-link" href="https://www.msn.com" target="_blank" rel="noopener"></a>
    </div>
`;