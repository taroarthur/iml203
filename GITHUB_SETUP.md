# GitHub Publication Guide for LA 2076

## Overview
This guide provides step-by-step instructions to publish the LA 2076 boardgame to your GitHub repository and make it accessible to other users via GitHub Pages.

## Table of Contents
1. [GitHub Repository Setup](#github-repository-setup)
2. [Git Configuration](#git-configuration)
3. [Initial Repository Push](#initial-repository-push)
4. [GitHub Pages Deployment](#github-pages-deployment)
5. [Sharing with Others](#sharing-with-others)
6. [Updating the Game](#updating-the-game)

---

## GitHub Repository Setup

### Step 1: Create a GitHub Account (if needed)
Visit [github.com](https://github.com) and create a free account if you don't have one.

### Step 2: Create a New Repository
1. Log in to your GitHub account
2. Click the **+** icon in the top-right corner
3. Select **New repository**
4. Configure your repository:
   - **Repository name**: `iml203` (or `la-2076` for a more descriptive name)
   - **Description**: "Interactive LA 2076 Mayoral Campaign Boardgame"
   - **Visibility**: Select **Public** (so others can access the game)
   - **Initialize repository options**: Leave unchecked (we'll push existing files)
5. Click **Create repository**

### Step 3: Copy Your Repository URL
After creating the repository, you'll see a URL like:
```
https://github.com/YOUR_USERNAME/iml203.git
```
Copy this URL; you'll need it in the next steps.

---

## Git Configuration

### Step 1: Initialize Git in Your Project Directory
```bash
cd /Users/taroarthur/Developer/iml203
git init
```

### Step 2: Configure Git User (One-time setup)
```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

Replace `Your Name` and `your.email@example.com` with your actual information.

### Step 3: Add Remote Repository
```bash
git remote add origin https://github.com/YOUR_USERNAME/iml203.git
```
Replace `YOUR_USERNAME` with your actual GitHub username.

### Step 4: Verify Remote Configuration
```bash
git remote -v
```
You should see output similar to:
```
origin  https://github.com/YOUR_USERNAME/iml203.git (fetch)
origin  https://github.com/YOUR_USERNAME/iml203.git (push)
```

---

## Initial Repository Push

### Step 1: Verify Your Files
Ensure all game files exist in `/Users/taroarthur/Developer/iml203`:
```bash
ls -la
```

You should see:
- `index.html` - Main game interface
- `game.js` - Game logic and mechanics
- `styles.css` - Game styling
- `p5_sketch.js` - Satellite map visualization
- `README.md` - Game documentation
- `IMPLEMENTATION.md` - Technical documentation
- `UI_REFINEMENTS.md` - UI enhancement documentation
- `GITHUB_SETUP.md` - This file

### Step 2: Create .gitignore File
Create a `.gitignore` file to exclude unnecessary files:

```bash
cat > .gitignore << 'EOF'
# OS files
.DS_Store
.DS_Store?
._*
.Spotlight-V100
.Trashes
ehthumbs.db
Thumbs.db

# Editor files
.vscode/
.idea/
*.swp
*.swo
*~

# Node modules (if using npm in the future)
node_modules/
npm-debug.log
yarn-error.log

# Python cache
__pycache__/
*.pyc
.Python

# Environment
.env
.venv
EOF
```

### Step 3: Stage All Files
```bash
git add .
```

### Step 4: Create Initial Commit
```bash
git commit -m "Initial commit: LA 2076 Mayoral Campaign Boardgame

- Complete game implementation with 68 LA board locations
- 6 unique candidate roles with special abilities
- Policy, event, and scandal card systems
- 20-minute countdown timer
- p5.js satellite map visualization
- Responsive web-based interface"
```

### Step 5: Push to GitHub
For the first push, use:
```bash
git branch -M main
git push -u origin main
```

After the first push, subsequent pushes can use:
```bash
git push origin main
```

---

## GitHub Pages Deployment

### Step 1: Enable GitHub Pages
1. Go to your repository on GitHub (e.g., `https://github.com/YOUR_USERNAME/iml203`)
2. Click **Settings** (gear icon near the top right)
3. In the left sidebar, click **Pages**
4. Under "Source", select:
   - **Branch**: `main`
   - **Folder**: `/ (root)`
5. Click **Save**

### Step 2: Wait for Deployment
GitHub will take a few seconds to deploy your site. You'll see a notification showing your site is ready.

### Step 3: Access Your Live Game
Your game will be available at:
```
https://YOUR_USERNAME.github.io/iml203
```

Or if your repository name is different:
```
https://YOUR_USERNAME.github.io/REPOSITORY_NAME
```

Test that the game loads correctly and all features work (including the p5.js satellite map).

---

## Sharing with Others

### Share the Link
Once GitHub Pages is enabled, you can share your game with anyone using the URL:
```
https://YOUR_USERNAME.github.io/iml203
```

### Create a GitHub README Badge (Optional)
Add this to your repository's `README.md` to make the link prominent:

```markdown
## 🎮 Play the Game Online

[**Play LA 2076 Now!**](https://YOUR_USERNAME.github.io/iml203) 🏛️

This is a fully playable web-based version. No installation required!
```

### Share on Social Media
Example post:
> 🎮 Just published LA 2076, an interactive mayoral campaign boardgame! Play now: https://YOUR_USERNAME.github.io/iml203 #gamedev #boardgame

### Add to Your Portfolio
You can link to your GitHub repository from your portfolio or resume as:
- **GitHub Repository**: https://github.com/YOUR_USERNAME/iml203
- **Live Demo**: https://YOUR_USERNAME.github.io/iml203

---

## Updating the Game

### Making Changes
1. Edit files as needed (e.g., `game.js`, `styles.css`)
2. Stage your changes:
   ```bash
   git add .
   ```
3. Commit your changes:
   ```bash
   git commit -m "Description of changes made"
   ```
4. Push to GitHub:
   ```bash
   git push origin main
   ```

### Examples of Useful Commit Messages
```bash
git commit -m "Add new scandal cards and improve event balance"
git commit -m "Fix SVG rendering on mobile devices"
git commit -m "Enhance p5.js satellite map with more terrain details"
git commit -m "Optimize game performance and reduce load time"
```

### View Changes History
To see all your commits and changes:
```bash
git log --oneline -10
```

This shows the last 10 commits. Remove `-10` to see all commits.

---

## Troubleshooting

### "fatal: not a git repository"
**Solution**: Make sure you're in the correct directory:
```bash
cd /Users/taroarthur/Developer/iml203
```

### "Permission denied (publickey)" when pushing
**Solution**: You may need to set up SSH keys. Follow [GitHub's SSH key guide](https://docs.github.com/en/authentication/connecting-to-github-with-ssh).
Alternatively, use HTTPS with a personal access token instead of your password.

### Game files not loading on GitHub Pages
**Solution**: Ensure all file paths in your HTML are relative (not absolute paths). Check that:
- `<link rel="stylesheet" href="styles.css">` (not `/styles.css`)
- `<script src="p5_sketch.js"></script>` (not `/p5_sketch.js`)

### p5.js CDN not loading
**Solution**: Check your internet connection and ensure the p5.js CDN URL is correct in `index.html`:
```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.7.0/p5.min.js"></script>
```

### Changes not reflecting on GitHub Pages
**Solution**: 
1. Wait 1-2 minutes for GitHub Pages to rebuild
2. Clear your browser cache (Cmd+Shift+Delete on Mac)
3. Try opening the page in an incognito/private window

---

## Advanced Options

### Custom Domain (Optional)
If you want to use a custom domain (e.g., `la2076.com`):
1. Purchase a domain from a registrar
2. Go to your repository **Settings > Pages**
3. Under "Custom domain", enter your domain name
4. Update your domain registrar's DNS records (instructions will be provided)

### Continuous Updates
For ongoing development:
```bash
# Pull latest changes (if working on multiple machines)
git pull origin main

# Make changes and push
git add .
git commit -m "Your commit message"
git push origin main
```

---

## Quick Reference: Essential Git Commands

```bash
# View repository status
git status

# Add changes
git add .

# Commit changes
git commit -m "Your message"

# Push to GitHub
git push origin main

# Pull latest changes
git pull origin main

# View commit history
git log --oneline

# Check remote configuration
git remote -v
```

---

## Questions or Issues?

If you encounter problems:
1. Check the [GitHub Docs](https://docs.github.com)
2. Review the [Git Book](https://git-scm.com/book)
3. Search for your specific error message on Stack Overflow

---

**Happy sharing! Your LA 2076 game is now ready to be played by the world!** 🌍🎮
