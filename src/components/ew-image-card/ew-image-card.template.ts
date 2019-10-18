export const template = document.createElement("template");
template.innerHTML = `
    <div class="default card">
        <img class="image" width="" height="" src="" alt="" />
        <div class="text">
            <p id="content"></p>
        </div>
        <a class="link" target="_blank" rel="noopener" aria-labelledby="content"></a>
    </div>
`;