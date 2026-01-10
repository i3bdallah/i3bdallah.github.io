# About Me - Modern Static Site

A clean, modern, and responsive personal About Me page with social links and resume download.

## Features

- ✨ Modern, minimal design
- 📱 Fully responsive
- 🎨 Beautiful gradient background
- 🔗 Social media links (GitHub, LinkedIn, Twitter, Instagram, Email)
- 📄 Resume download button
- 🖼️ Profile picture with hover effects
- ⚡ Fast and lightweight (pure HTML/CSS, no frameworks)

## Setup

1. **Customize Your Information**
   - Edit `index.html`:
     - Update "Your Name" with your actual name
     - Change the tagline to match your professional title
     - Update the bio section with your description
     - Update all social media links with your profiles
     - Update the email address

2. **Add Your Assets**
   - Replace `assets/profile.jpg` with your profile photo (square, 300x300px minimum)
   - Add your resume as `assets/resume.pdf`

3. **Deploy**
   - This is a static site that can be deployed to:
     - GitHub Pages
     - Netlify
     - Vercel
     - Any static hosting service

## Customization

### Colors
Edit the CSS variables in `styles.css`:
```css
:root {
    --primary-color: #2563eb;  /* Main accent color */
    --text-primary: #1f2937;   /* Primary text */
    --text-secondary: #6b7280; /* Secondary text */
}
```

### Background Gradient
Change the gradient in `body` selector in `styles.css`:
```css
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
```

### Font
The site uses Inter font from Google Fonts. To change it, update the font link in `index.html` and the `font-family` in `styles.css`.

## Technology Stack

- HTML5
- CSS3 (with CSS Grid & Flexbox)
- Google Fonts (Inter)
- SVG Icons

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

Feel free to use this template for your personal site!
