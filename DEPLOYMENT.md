# GitHub Pages Deployment Guide

## One-Time Setup

### 1. Enable GitHub Pages
1. Go to your repository on GitHub
2. Navigate to **Settings** > **Pages**
3. Under "Build and deployment", set **Source** to **GitHub Actions**
4. Save the settings

### 2. Verify Configuration
The deployment files are already set up:
- `.github/workflows/deploy.yml` - GitHub Actions workflow
- `frontend/vite.config.js` - Configured for `/portfolio-aggregator/` base path
- `frontend/package.json` - Build scripts ready

### 3. Deploy for the First Time
```bash
# Stage all files
git add .

# Commit the changes
git commit -m "feat: add portfolio showcase frontend with GitHub Pages deployment"

# Push to trigger deployment
git push origin main
```

### 4. Monitor Deployment
1. Go to the **Actions** tab in your GitHub repository
2. Watch the "Deploy Portfolio to GitHub Pages" workflow
3. Build takes ~60 seconds
4. Your portfolio will be live at: `https://yourusername.github.io/portfolio-aggregator/`

## Keeping Your Portfolio Fresh

### When You Add New Repositories
```bash
# Navigate to scripts directory
cd scripts

# Run the pipeline
python harvester.py
python refiner.py

# Update frontend with new data
cp portfolio_ready.json ../frontend/public/

# Commit and deploy
cd ..
git add frontend/public/portfolio_ready.json
git commit -m "chore: refresh portfolio data with new projects"
git push
```

### When You Update Repository Descriptions
```bash
# Just regenerate the refined data
cd scripts
python refiner.py
cp portfolio_ready.json ../frontend/public/
cd ..
git add frontend/public/portfolio_ready.json
git commit -m "chore: update portfolio descriptions"
git push
```

## Workflow Details

### What the GitHub Actions Workflow Does:
1. **Checkout** your repository code
2. **Set up Node.js** version 20
3. **Install dependencies** in the frontend directory
4. **Build** the React app using Vite
5. **Upload** the build artifacts to GitHub Pages
6. **Deploy** to your GitHub Pages URL

### Automatic Triggers:
- **Push to main branch** - Automatically deploys
- **Manual trigger** - Can also run manually from Actions tab

## Troubleshooting

### Build Fails
1. Check the **Actions** tab for error details
2. Common issues:
   - Missing `package-lock.json` (workflow uses `npm install` to handle this)
   - Invalid `portfolio_ready.json` format
   - Missing dependencies

### Portfolio Not Loading
1. Check that `portfolio_ready.json` exists in `frontend/public/`
2. Verify the JSON format is valid
3. Check browser console for errors

### Wrong URL Path
If your repository name is different from `portfolio-aggregator`:
1. Edit `frontend/vite.config.js`
2. Change the `base` path to match your repo name:
   ```js
   base: '/your-repo-name/',
   ```
3. Commit and push the change

## Alternative Deployment Options

### Vercel (Alternative Free Option)
```bash
# Install Vercel CLI
npm i -g vercel

# Build and deploy
cd frontend
npm run build
vercel --prod
```

### Netlify (Alternative Free Option)
```bash
# Build the project
cd frontend
npm run build

# Deploy via drag-and-drop
# Upload the `dist` folder to netlify.com
```

## Performance Notes

### Build Size
- **Total bundle**: ~150KB (gzipped: ~48KB)
- **CSS**: ~7KB (gzipped: ~2KB)
- **HTML**: ~1KB
- **Data**: Portfolio data varies by project count

### Optimization Features
- **Code splitting** - Only loads what's needed
- **Asset optimization** - Images and CSS minified
- **Caching** - Proper headers for browser caching
- **CDN** - GitHub Pages provides global CDN

## Customization

### Colors and Theme
Edit `frontend/src/index.css` CSS variables:
```css
:root {
  --bg-primary: #ffffff;      /* Main background */
  --bg-secondary: #f8f9fa;    /* Card backgrounds */
  --text-primary: #1a1a1a;    /* Main text */
  --text-secondary: #6c757d; /* Secondary text */
  --accent: #0066cc;         /* Links and highlights */
  --border: #dee2e6;          /* Card borders */
}
```

### Adding Sections
To add an "About" section or contact form:
1. Create new components in `frontend/src/components/`
2. Import and use them in `frontend/src/app.jsx`
3. Update the build and deploy

### Custom Domain
After initial deployment:
1. Go to repository **Settings** > **Pages**
2. Under "Custom domain", add your domain
3. Configure DNS records as instructed by GitHub

## Security Considerations

### API Keys and Secrets
- No API keys are stored in the frontend
- All GitHub API calls happen in the backend scripts
- Portfolio data is static JSON, safe for public hosting

### Content Security
- User-controlled content (READMEs) is processed server-side
- Frontend only displays pre-processed, safe data
- No direct API calls from the browser

## Success Metrics

Your portfolio is successfully deployed when:
- [ ] GitHub Actions workflow completes without errors
- [ ] Portfolio loads at `https://yourusername.github.io/portfolio-aggregator/`
- [ ] All project cards display correctly
- [ ] Technology filtering works
- [ ] Responsive design works on mobile
- [ ] GitHub links function properly

## Next Steps

After successful deployment:
1. **Test thoroughly** on different devices
2. **Share your portfolio** with the live URL
3. **Monitor GitHub Actions** for any build issues
4. **Update regularly** when you add new projects
5. **Consider custom domain** for professional appearance

---

**Your automated portfolio is now ready to showcase your work to the world!**
