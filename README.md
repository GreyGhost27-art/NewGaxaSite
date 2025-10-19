# Gaxa Tech Interactive Website

A stunning, modern, and highly interactive landing page for Gaxa Tech - The Brand Makers. Built with cutting-edge web technologies and inspired by top-tier design studios.

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)

## 🚀 Live Preview

The website is currently running at: **http://localhost:8000**

Open this URL in your browser to see the interactive website in action!

## ✨ Features

### 🎨 Visual Effects
- **Custom Cursor** - Magnetic cursor that follows mouse movements with smooth animations
- **3D Particle System** - Interactive canvas-based particle animation in hero section
- **3D Card Tilt** - Cards tilt in 3D space based on mouse position
- **Glassmorphism** - Modern frosted glass effect on cards and navigation
- **Gradient Animations** - Smooth gradient backgrounds with animated meshes
- **Scroll Animations** - Elements animate into view as you scroll

### 🎯 Interactive Elements
- **Magnetic Elements** - Buttons and links follow cursor on hover
- **Animated Counters** - Stats count up when scrolled into view
- **Auto-rotating Carousel** - Smooth testimonials carousel with drag support
- **FAQ Accordion** - Expandable FAQ section with smooth animations
- **Smooth Scroll** - Buttery smooth scrolling with progress indicator
- **Loading Screen** - Beautiful loading animation with progress bar

### 📱 Responsive Design
- **Mobile-First** - Optimized for all screen sizes
- **Touch Gestures** - Full touch support for mobile devices
- **Hamburger Menu** - Smooth mobile navigation
- **Adaptive Layouts** - Bento grid system that adapts to screen size

### ⚡ Performance
- **Optimized Assets** - Efficient loading and rendering
- **Lazy Loading** - Content loads as needed
- **Smooth 60fps** - Optimized animations for performance
- **Minimal Dependencies** - Only GSAP for advanced animations

## 🎨 Design Inspiration

This website draws inspiration from leading design studios:
- [The Internet Company](https://www.theinternetcompany.one) - Minimalist design & magnetic effects
- [Bhuma Cast Factory](https://bhumacastfactory.com) - Professional layout & structure
- [Zapp Energy](https://zappenergy.in) - Interactive elements & animations

## 🛠️ Tech Stack

### Core Technologies
- **HTML5** - Semantic structure
- **CSS3** - Custom properties, Grid, Flexbox, animations
- **Vanilla JavaScript** - Pure JS, no frameworks

### Libraries
- **GSAP 3.12+** - Professional-grade animations
- **ScrollTrigger** - Scroll-based animations
- **Font Awesome 6** - Icons

### Fonts
- **Outfit** - Headers and bold elements (Variable font)
- **Urbanist** - Body text (Variable font)

## 📦 Project Structure

```
Website/
├── index.html              # Main HTML file
├── css/
│   └── style.css          # All styles and animations
├── js/
│   └── main.js            # All JavaScript functionality
├── assets/
│   ├── fonts/             # Outfit & Urbanist fonts
│   ├── images/            # Logo and images
│   └── models/            # 3D car model (optional)
└── README.md              # This file
```

## 🚀 Quick Start

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- Python 3 (for local server) or any other HTTP server

### Running Locally

#### Option 1: Python (Recommended)
```bash
cd /Users/grey/Desktop/Projects/Website
python3 -m http.server 8000
```
Then open: **http://localhost:8000**

#### Option 2: Python 2
```bash
python -m SimpleHTTPServer 8000
```

#### Option 3: Node.js
```bash
npx http-server
```

#### Option 4: PHP
```bash
php -S localhost:8000
```

### Stop the Server
Press `Ctrl + C` in the terminal to stop the server.

## 📋 Content Sections

### 1. Hero Section
- Full-screen hero with animated gradient background
- 3D particle system (canvas-based)
- Animated headline with text reveal effect
- Dual CTA buttons with magnetic effect

### 2. Services Section
- 6 service cards in bento grid layout
- 3D tilt effect on hover
- Glassmorphism design
- Service tags for technologies

**Services:**
1. Customized Web Solutions
2. Mobile App Development
3. Digital Marketing
4. SEO Optimization
5. Landing Page Optimization
6. No Hidden Fees Promise

### 3. Stats Section
- Animated counters
- Parallax background effect
- Achievement highlights

**Statistics:**
- 100+ Happy Clients
- 250+ Projects Completed
- 25 Team Members
- 5 Years Experience

### 4. About Section
- Split-screen layout
- Animated bullet points
- Floating cards with tech highlights
- Technology stack showcase

### 5. Testimonials Section
- Auto-rotating carousel (5s intervals)
- 3 client testimonials
- Star ratings
- Navigation controls with keyboard support

**Featured Clients:**
- MD Haarish (Haw-Tees)
- Sowbarnika (Linecornn)
- Susee Group of Companies

### 6. Contact Section
- Bento grid layout
- 2 phone numbers
- Email address
- 2 office locations (Bangalore & Coimbatore)
- Large CTA card

### 7. FAQ Section
- Interactive accordion
- 6 common questions
- Smooth expand/collapse animations

### 8. Footer
- Multi-column layout
- Quick links
- Social media icons
- Copyright information

## 🎨 Customization

### Colors
Edit CSS variables in `css/style.css`:
```css
:root {
    --primary-color: #6366f1;
    --secondary-color: #8b5cf6;
    --accent-color: #ec4899;
    /* Modify these to match your brand */
}
```

### Content
Edit `index.html` to change:
- Text content
- Images (update paths in `assets/images/`)
- Contact information
- Service descriptions

### Animations
Adjust timing in `js/main.js`:
```javascript
const CONFIG = {
    ANIMATION_DURATION: 300,
    COUNTER_DURATION: 2000,
    CAROUSEL_AUTO_PLAY: 5000,
    // Modify these values
};
```

## 🎯 Key Features Breakdown

### Custom Cursor
- Follows mouse with smooth interpolation
- Changes on hover over magnetic elements
- Hidden on touch devices

### Magnetic Elements
- Elements slightly follow cursor
- Configurable strength (default: 0.3)
- Smooth return animation

### 3D Tilt Effect
- Cards tilt based on mouse position
- Perspective: 1000px
- Max tilt: 15 degrees

### Particle System
- Canvas-based animation
- Mouse interaction (particles avoid cursor)
- Connection lines between nearby particles
- Responsive particle count

### Animated Counters
- Count from 0 to target
- Triggered on scroll into view
- 2-second animation duration

### Carousel
- Auto-play with 5s intervals
- Smooth transitions
- Keyboard navigation (arrow keys)
- Pause on hover
- Touch/drag support

## 📱 Responsive Breakpoints

- **Mobile**: 320px - 768px
- **Tablet**: 768px - 1024px
- **Desktop**: 1024px - 1440px
- **Large Desktop**: 1440px+

## ⚡ Performance Optimization

- **Debounced Resize Events** - Prevents excessive calculations
- **Throttled Scroll Events** - Smooth scrolling performance
- **Intersection Observer** - Efficient viewport detection
- **RequestAnimationFrame** - Smooth 60fps animations
- **CSS Transforms** - Hardware-accelerated animations
- **Variable Fonts** - Reduced font file sizes

## 🌐 Browser Support

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 🔧 Troubleshooting

### Custom Cursor Not Showing
- Only visible on desktop devices with mouse
- Automatically hidden on touch devices

### Animations Not Working
- Ensure GSAP is loaded from CDN
- Check browser console for errors
- Try clearing browser cache

### Fonts Not Loading
- Verify font files exist in `assets/fonts/`
- Check file paths in CSS
- Clear browser cache

### Server Won't Start
```bash
# Kill process on port 8000
lsof -ti:8000 | xargs kill -9

# Then restart server
python3 -m http.server 8000
```

## 📞 Contact Information

**Gaxa Tech - The Brand Makers**

📱 Phone: +91 8838399688 | +91 7397687407  
📧 Email: contact@gaxatech.com

🏢 **Bangalore Office**  
SY NO 15 EPIP Industrial Area Whitefield,  
Near Ginger Hotel, Bengaluru - 560066

🏢 **Coimbatore Office**  
417, Ramani's Sri Mayuri Layout,  
Coimbatore - 641049

## 🎓 Learning Resources

### GSAP Animation
- [GSAP Documentation](https://greensock.com/docs/)
- [ScrollTrigger Guide](https://greensock.com/docs/v3/Plugins/ScrollTrigger)

### Canvas Animation
- [MDN Canvas Tutorial](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial)

### CSS Grid & Flexbox
- [CSS Grid Guide](https://css-tricks.com/snippets/css/complete-guide-grid/)
- [Flexbox Guide](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)

## 📝 Development Notes

### Animation Performance
- All animations use CSS transforms for GPU acceleration
- RequestAnimationFrame for smooth 60fps
- Throttled scroll events (16ms intervals)
- Debounced resize events (250ms)

### Accessibility
- ARIA labels on interactive elements
- Keyboard navigation support
- Semantic HTML structure
- Alt text on images

### Code Architecture
- Modular JavaScript classes
- CSS custom properties for theming
- BEM methodology for class naming
- Mobile-first responsive design

## 🚀 Deployment Options

### Option 1: Netlify (Recommended)
1. Create account at [netlify.com](https://netlify.com)
2. Drag and drop the Website folder
3. Site will be live instantly

### Option 2: Vercel
```bash
npm i -g vercel
vercel
```

### Option 3: GitHub Pages
1. Push to GitHub repository
2. Enable Pages in repository settings
3. Select main branch as source

### Option 4: Traditional Hosting
- Upload all files via FTP
- Ensure proper file permissions
- Point domain to hosting

## 📊 Performance Metrics

**Target Lighthouse Scores:**
- Performance: 90+
- Accessibility: 95+
- Best Practices: 95+
- SEO: 100

**Load Times:**
- First Contentful Paint: < 1.5s
- Time to Interactive: < 3s
- Total Page Load: < 4s

## 🎉 Credits

**Design & Development:** Created with inspiration from leading design studios  
**Fonts:** Outfit & Urbanist (Google Fonts)  
**Icons:** Font Awesome 6  
**Animation:** GSAP & ScrollTrigger  
**Content:** Gaxa Tech

## 📄 License

© 2025 Gaxa Tech. All rights reserved.

---

**Built with ❤️ using Modern Web Technologies**

For support or questions, contact: contact@gaxatech.com

