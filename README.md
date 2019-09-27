# everyday-webcomponents
everyday-webcomponents is a collection of commonly used Web UIs as Native Web Components.

## Usage
There are three different ways to use this package.

### In the Browser
The package bundle is available over the CDN. Include the following script. The script tag can be added in the head or end of the body tag.

```html
<script src='https://unpkg.com/everyday-webcomponents@0.0.1/dist/everyday-webcomponents.min.js'></script>
```

### In the Bundler as ES6 Module
Use the package manager to install the package.

```
npm install everyday-webcomponents
```

In your code import everyday-webcomponents to bundle it with your code.

```ts
import 'everyday-webcomponents';
```

### In the Bundler as CommonJS Module
Use the package manager to install the package.

```
npm install everyday-webcomponents
```

In your code require everyday-webcomponents to bundle it with your code.

```ts
require('everyday-webcomponents');
```
# Components
## ew-card
The card component shows image with text, and comes in three variations, small, regular, compact.

![enter image description here](https://shekam.azureedge.net/everyday-webcomponents/image-1.png)

Below is the markup example for rendering card in all its three variations.

```html
<ew-card type="small" text="Lorem ipsum dolor sit amet" link="https://unsplash.com"></ew-card>
<ew-card text="Lorem ipsum dolor sit amet" image="https://source.unsplash.com/random/300x174" link="https://unsplash.com"></ew-card>
<ew-card type="compact" text="Lorem ipsum dolor sit amet" image="https://source.unsplash.com/random/300x174" link="https://unsplash.com"></ew-card>
```

### Supported Attributes/Props

- **type**: By default card renders as a regular card. Use type **small** to render as a small card. Use type **compact** to render as a compact card.
- **text**: The text to show in card.
- **image**: The image to show in card.
- **link**: The link to navigate to when card is clicked.

### Supported Themeing Options
The card component exposes CSS variables, which can be used to theme the card.

- **--ew-background**: Set this CSS variable to change the background color.
- **--ew-color**: Set this CSS variable to change the font color.
- **--ew-font-family**: Set this CSS variable to change the font family.
- **--ew-font-size**: Set this CSS variable to change the font size.

This [codepen](https://codepen.io/sheeshpaul/pen/jONddNN) demonstrates the various ways to use and theme the card component.