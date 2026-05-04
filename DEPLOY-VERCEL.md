# Deploy JSP Live Preview to Vercel

**Created by: Rohan Sharma**

This guide walks you through deploying the JSP Live Preview tool to Vercel for free public hosting.

---

## 🚀 Prerequisites

1. **Vercel Account** - Sign up at [vercel.com](https://vercel.com) (free)
2. **GitHub Account** - Sign up at [github.com](https://github.com) (free)
3. **Git Installed** - Download from [git-scm.com](https://git-scm.com)

---

## 📦 Method 1: Deploy via GitHub (Recommended)

### Step 1: Create GitHub Repository

```bash
# Navigate to project directory
cd "d:\BMAD\jsp-live-preview"

# Initialize Git repository
git init

# Add all files
git add .

# Commit files
git commit -m "Initial commit - JSP Live Preview Tool by Rohan Sharma"

# Create repository on GitHub (via web interface)
# Then connect local repo to GitHub:
git remote add origin https://github.com/YOUR-USERNAME/jsp-live-preview.git
git branch -M main
git push -u origin main
```

### Step 2: Connect to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click **"Add New Project"**
3. Click **"Import Git Repository"**
4. Select your **jsp-live-preview** repository
5. Configure project:
   - **Framework Preset**: Other (static site)
   - **Root Directory**: ./
   - **Build Command**: (leave empty)
   - **Output Directory**: (leave empty)
6. Click **"Deploy"**

### Step 3: Access Your Site

- Vercel will provide a URL like: `https://jsp-live-preview-xyz.vercel.app`
- Your tool is now live and accessible worldwide! 🎉

---

## ⚡ Method 2: Deploy via Vercel CLI (Fastest)

### Step 1: Install Vercel CLI

```bash
npm install -g vercel
```

### Step 2: Deploy

```bash
# Navigate to project directory
cd "d:\BMAD\jsp-live-preview"

# Login to Vercel
vercel login

# Deploy (follow prompts)
vercel

# For production deployment
vercel --prod
```

### Step 3: Access Your Site

The CLI will display your deployment URL immediately.

---

## ⚙️ Configuration Details

The included `vercel.json` file configures:

- **Static File Serving**: All HTML, CSS, and JS files
- **Default Route**: Landing page at `/` redirects to `start.html`
- **Security Headers**: X-Content-Type-Options, X-Frame-Options, X-XSS-Protection

---

## 🔄 Updating Your Deployment

### Via GitHub (Method 1)

```bash
# Make your changes, then:
git add .
git commit -m "Update: description of changes"
git push
```

Vercel automatically redeploys on every push! ✨

### Via CLI (Method 2)

```bash
vercel --prod
```

---

## 🌐 Custom Domain (Optional)

1. Go to your Vercel project dashboard
2. Click **"Settings"** → **"Domains"**
3. Add your custom domain
4. Follow DNS configuration instructions

---

## 📊 Project Structure

```
jsp-live-preview/
├── index.html              # Full JSTL mode
├── visual-mode.html        # Quick visual mode
├── start.html             # Landing page
├── css/
│   └── app.css            # Styles
├── js/
│   ├── app.js             # Main logic
│   ├── el-evaluator.js    # EL expression engine
│   ├── jsp-parser.js      # JSTL parser
│   └── renderer.js        # HTML renderer
├── vercel.json            # Vercel configuration
├── .gitignore             # Git ignore rules
└── README.md              # Documentation
```

---

## 🛠️ Troubleshooting

### Issue: Deployment Failed

**Solution**: Check the Vercel dashboard logs for specific errors.

### Issue: 404 Errors on Routes

**Solution**: Verify all file paths in your HTML are relative (e.g., `./css/app.css` not `/css/app.css`).

### Issue: Changes Not Appearing

**Solution**: 
- Clear browser cache (Ctrl + Shift + R)
- Check Git commit was pushed successfully
- Verify deployment completed in Vercel dashboard

### Issue: Environment Variables Needed

**Solution**: Add environment variables in Vercel dashboard under **Settings → Environment Variables**.

---

## 💡 Tips

1. **Free Tier**: Vercel's free tier includes:
   - Unlimited deployments
   - Automatic HTTPS
   - Global CDN
   - 100GB bandwidth/month

2. **Preview Deployments**: Every Git branch gets a unique preview URL

3. **Analytics**: Enable Vercel Analytics for visitor insights

4. **Performance**: All static assets are automatically optimized and cached

---

## 📞 Support

- **Vercel Documentation**: [vercel.com/docs](https://vercel.com/docs)
- **GitHub Issues**: Create issues in your repository
- **Vercel Community**: [github.com/vercel/vercel/discussions](https://github.com/vercel/vercel/discussions)

---

## ✅ Post-Deployment Checklist

- [ ] Test both modes (Full JSTL & Visual-only)
- [ ] Verify all CSS/JS files load correctly
- [ ] Check mobile responsiveness
- [ ] Test with sample JSP code
- [ ] Share URL with team
- [ ] Star your GitHub repository ⭐

---

**🎉 Congratulations! Your JSP Live Preview tool is now live on Vercel!**

Created by: **Rohan Sharma**
