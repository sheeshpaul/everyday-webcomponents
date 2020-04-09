/**
 * Use constructable stylesheet when the feature is present. This ensures single instance of stylesheet is used across all the instances of this component.
 * Otherwise insert the style node.
 * @param shadowRoot - The shadowRoot
 * @param adoptedStyleSheet1 - First constructable stylesheet
 * @param adoptedStyleSheet2 - Second constructable stylesheet
 * @param templateStyleSheet1 - First templated stylesheet
 * @param templateStyleSheet2 - Second templated stylesheet
 */
export function addStyleSheets(
    shadowRoot: ShadowRoot,
    adoptedStyleSheet1: CSSStyleSheet,
    adoptedStyleSheet2: CSSStyleSheet,
    templateStyleSheet1: HTMLTemplateElement,
    templateStyleSheet2: HTMLTemplateElement,
): void {
    if (adoptedStyleSheet1) {
        shadowRoot.adoptedStyleSheets = [adoptedStyleSheet1, adoptedStyleSheet2];
    } else {
        shadowRoot.appendChild(templateStyleSheet1.content.cloneNode(true));
        shadowRoot.appendChild(templateStyleSheet2.content.cloneNode(true));
    }
}
