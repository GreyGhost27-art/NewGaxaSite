# Images

Place your image files here (backgrounds, textures, screenshots, etc.)

## Recommended Image Formats

### For Photos/Backgrounds
- **WebP** - Best compression and quality (recommended)
- **JPG** - Good for photos, smaller file size
- **PNG** - For images with transparency

### For Icons/Graphics
- **SVG** - Vector graphics (scales perfectly)
- **PNG** - For raster graphics with transparency

## Optimization Tips

1. **Compress images** before uploading
   - Use [TinyPNG](https://tinypng.com)
   - Use [Squoosh](https://squoosh.app)
   - Use ImageOptim (Mac)

2. **Use appropriate dimensions**
   - Hero images: 1920x1080px max
   - Thumbnails: 400x400px max
   - Icons: 64x64px or SVG

3. **Lazy loading** (already implemented in JS)
   ```html
   <img data-src="assets/images/photo.jpg" alt="Description">
   ```

## Free Image Resources

### Photos
- **Unsplash** - https://unsplash.com
- **Pexels** - https://pexels.com
- **Pixabay** - https://pixabay.com

### Textures
- **Poly Haven** - https://polyhaven.com/textures
- **Texture Haven** - https://texturehaven.com
- **CC0 Textures** - https://cc0textures.com

### Icons
- **Font Awesome** - Already included in project
- **Hero Icons** - https://heroicons.com
- **Iconify** - https://iconify.design

## Current Project

This landing page currently uses:
- ✅ Font Awesome icons (via CDN)
- ✅ Google Fonts (via CDN)
- ✅ Spline 3D scenes (hosted by Spline)

Add images here if you want to:
- Add background textures
- Include screenshots
- Add Open Graph images
- Include favicon

## Example Usage

```html
<!-- In index.html -->
<img src="assets/images/background.jpg" alt="Background">

<!-- For lazy loading -->
<img data-src="assets/images/photo.jpg" 
     alt="Description" 
     class="lazy-load">
```

```css
/* In style.css */
.hero-section {
    background-image: url('../assets/images/hero-bg.jpg');
}
```

---

**Note:** The current landing page doesn't require local images to function, but you can add them for additional customization.

