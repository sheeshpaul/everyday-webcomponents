# everyday-webcomponents
everyday-webcomponents is a collection of commonly used Web UIs as Native Web Components. The everyday-components are very light weight, accessible, written using vanilla web component APIs and does not use any framework.

# Quick Start Guide
- [Installation](#installation)
    - [Script Tag](#script-tag)
    - [ES Module](#es-module)
    - [CommonJS Module](#commonjs-module)
- [Components](#components)
    - [Card Component](#card-component)
    - [Image Card Component](#image-card-component)
    - [Carousel Component](#carousel-component)

# Installation
## Script Tag
The package comes in two types of bundles, available over the CDN.

For the first type, one single bundle has all the components. Include the following script. The script tag can be added in the head or end of the body tag.
```html
<script src='https://unpkg.com/everyday-webcomponents/dist/everyday-webcomponents.min.js'></script>
```
For the second type, each component has it's own bundle. This is usefull when using few components and reduces the bundle download size. Below is the listing of all the bundles. Include the script for the component that you want to use.
```html
// Card component bundle
<script src='https://unpkg.com/everyday-webcomponents/dist/everyday-ew-card-webcomponent.min.js'></script>

// Image Card component bundle
<script src='https://unpkg.com/everyday-webcomponents/dist/everyday-ew-image-card-webcomponent.min.js'></script>

// Carousel component bundle
<script src='https://unpkg.com/everyday-webcomponents/dist/everyday-ew-carousel-webcomponent.min.js'></script>
```

## ES Module
Use the package manager to install the package.

```
npm install everyday-webcomponents
```

In your code import everyday-webcomponents to bundle it with your code.

```ts
import 'everyday-webcomponents';
```

## CommonJS Module
Use the package manager to install the package.

```
npm install everyday-webcomponents
```

In your code require everyday-webcomponents to bundle it with your code.

```ts
require('everyday-webcomponents');
```
# Components
## Card Component
The card component comes in three variations, small, regular, and compact.

![Card component image](https://shekam.azureedge.net/everyday-webcomponents/image-1.png)

### HTML Markup
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
- **--ew-background**: Set this CSS variable to change the background color.
- **--ew-color**: Set this CSS variable to change the font color.
- **--ew-font-family**: Set this CSS variable to change the font family.
- **--ew-font-size**: Set this CSS variable to change the font size.

### Codepen Example
- [HTML declarative approach](https://codepen.io/sheeshpaul/pen/jONddNN)
- [Javascript approach](https://codepen.io/sheeshpaul/pen/qBWGXzO)

## Image Card Component
The image card component comes in regular and large variations.

![Image card component image](https://shekam.azureedge.net/everyday-webcomponents/image-2.png)

### HTML Markup
```html
<ew-image-card text="Lorem ipsum dolor sit amet" image="https://source.unsplash.com/random/200x150" link="https://unsplash.com"></ew-image-card>
<ew-image-card type="large" text="Lorem ipsum dolor sit amet" image="https://source.unsplash.com/random/620x350" link="https://unsplash.com"></ew-image-card>
```

### Supported Attributes/Props
- **type**: By default image card renders as a regular card. Use type **large** to render as a large image card.
- **text**: The text to show in card.
- **image**: The image to show in card.
- **link**: The link to navigate to when card is clicked.

### Supported Themeing Options
- **--ew-background**: Set this CSS variable to change the background color.
- **--ew-color**: Set this CSS variable to change the font color.
- **--ew-font-family**: Set this CSS variable to change the font family.
- **--ew-font-size**: Set this CSS variable to change the font size.

### Codepen Example
- [HTML declarative approach](https://codepen.io/sheeshpaul/pen/yLLLaMO)
- [Javascript approach](https://codepen.io/sheeshpaul/pen/ExxxgWX)

## Carousel Component
The carousel component comes in regular and large variations.

![Carousel component image](https://shekam.azureedge.net/everyday-webcomponents/image-3.png)

### HTML Markup
```html
<ew-carousel>
    <ew-carousel-slide text="Lorem ipsum dolor sit amet" image="https://source.unsplash.com/620x350/?nature,water" link="https://unsplash.com"></ew-carousel-slide>
    <ew-carousel-slide text="Lorem ipsum dolor sit amet" image="https://source.unsplash.com/620x350/?cars,audi" link="https://unsplash.com"></ew-carousel-slide>
    <ew-carousel-slide text="Lorem ipsum dolor sit amet" image="https://source.unsplash.com/620x350/?animal,dog" link="https://unsplash.com"></ew-carousel-slide>
</ew-carousel>
```

### Carousel Supported Attributes/Props
- **type**: By default carousel renders as a regular carousel. Use type **large** to render as a large carousel.

### Carousel Slide Supported Attributes/Props
- **text**: The text to show in slide.
- **image**: The image to show in slide.
- **link**: The link to navigate to when slide is clicked.

### Carousel Slide Supported Themeing Options
- **--ew-background**: Set this CSS variable to change the background color.
- **--ew-color**: Set this CSS variable to change the font color.
- **--ew-font-family**: Set this CSS variable to change the font family.
- **--ew-font-size**: Set this CSS variable to change the font size.

### Codepen Example
- [HTML declarative approach](https://codepen.io/sheeshpaul/pen/GRRyvYp)
- [Javascript approach](https://codepen.io/sheeshpaul/pen/rNNpzqr)