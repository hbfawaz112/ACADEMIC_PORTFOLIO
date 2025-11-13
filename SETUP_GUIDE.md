# Complete Setup Guide

**Welcome!** This guide will help you set up your own academic portfolio website from scratch. No prior coding experience needed – just follow these steps carefully.

---

## 📋 Table of Contents

1. [Prerequisites](#prerequisites)
2. [Step 1: Get the Code](#step-1-get-the-code)
3. [Step 2: Customize Your Content](#step-2-customize-your-content)
4. [Step 3: Enable GitHub Pages](#step-3-enable-github-pages)
5. [Step 4: Verify Your Site is Live](#step-4-verify-your-site-is-live)
6. [Step 5: Create Your First Blog Post](#step-5-create-your-first-blog-post)
7. [Step 6: Use the Admin Panel Locally](#step-6-use-the-admin-panel-locally)
8. [Daily Workflow](#daily-workflow)
9. [Troubleshooting](#troubleshooting)

---

## Prerequisites

Before you begin, you'll need:

- ✅ A **GitHub account** (free) - [Sign up here](https://github.com/join)
- ✅ A **web browser** (Chrome, Firefox, Edge, Safari)
- ✅ A **text editor** (optional but helpful):
  - Windows: Notepad, VS Code, or Notepad++
  - Mac: TextEdit, VS Code, or Atom
  - Any OS: Use GitHub's web editor

**That's it!** No installation required.

---

## Step 1: Get the Code

### Option A: Fork the Repository (Recommended)

1. **Go to the original repository** on GitHub
2. Click the **"Fork"** button in the top-right corner
3. GitHub will create a copy in your account
4. Your repository will be at: `https://github.com/YOUR-USERNAME/ACADEMIC_PORTFOLIO`

### Option B: Create a New Repository

1. **Download the code** as a ZIP file (or get it from the original source)
2. Go to [github.com/new](https://github.com/new)
3. Name your repository (e.g., `my-portfolio` or `YOUR-NAME-portfolio`)
4. Choose **Public** (required for free GitHub Pages)
5. **DO NOT** initialize with README
6. Click **"Create repository"**
7. Upload the files:
   - Click **"uploading an existing file"**
   - Drag all project files into the browser
   - Commit the changes

### Option C: Use Git (Advanced)

```bash
# Clone the repository
git clone https://github.com/original-username/ACADEMIC_PORTFOLIO.git my-portfolio
cd my-portfolio

# Remove old git history and start fresh
rm -rf .git
git init
git add .
git commit -m "Initial commit: My portfolio"

# Create new repo on GitHub, then:
git remote add origin https://github.com/YOUR-USERNAME/my-portfolio.git
git branch -M main
git push -u origin main
```

---

## Step 2: Customize Your Content

Now let's make this portfolio **yours**!

### 2.1 Update About Page

1. Go to your repository on GitHub
2. Navigate to `about/about.md`
3. Click the **pencil icon** (✏️) to edit
4. Replace the content with your information:

```markdown
---
title: About Your Name
tags: [your, keywords]
date: 2025-11-13
---

Your introduction paragraph here.

- Email: [your.email@example.com](mailto:your.email@example.com)
- LinkedIn: [linkedin.com/in/your-profile](https://linkedin.com/in/your-profile)
- GitHub: [github.com/your-username](https://github.com/your-username)

## Professional Summary

Write about your background and expertise...

## Education

- Degree, Institution (Year)
- Another Degree, Another Institution (Year)

## Skills

List your skills here...
```

5. Scroll down and click **"Commit changes"**
6. Add a commit message like "Update about page with my information"
7. Click **"Commit changes"** again

### 2.2 Update Publications Page

1. Navigate to `publications/publications.md`
2. Click the **pencil icon** (✏️)
3. Replace with your publications:

```markdown
---
title: Publications and Projects
tags: [research, publications]
date: 2025-11-13
---

# Publications

## Conference Papers

1. **Your Paper Title.** Conference Name, Year.
2. **Another Paper.** Journal Name, Volume(Issue), Pages, Year.

## Projects

### Project Name (Year)

Brief description of your project and its impact.

### Another Project (Year)

Description here...
```

4. Commit the changes

### 2.3 Update Site Title and Navigation

The site header shows "YOUR NAME" by default. Let's change it:

**For index.html:**
1. Open `index.html`
2. Click edit (✏️)
3. Find line 48: `<h1>YOUR NAME</h1>`
4. Replace with: `<h1>Your ACTUELLE Name</h1>`
5. Find line 6: `<title>Academic Portfolio | About</title>`
6. Change to: `<title>Your ACTULLE Name | About</title>`
7. Commit changes

**Repeat for these files:**
- `publications.html` - Change header and title
- `blog.html` - Change header and title
- `admin.html` - Change header (this file stays local)

### 2.4 Update Footer (Optional)

In each HTML file, find the footer:
```html
<p>&copy; <span id="year"></span> YOUR NAME. All rights reserved.</p>
```

Change to:
```html
<p>&copy; <span id="year"></span> Your Name. All rights reserved.</p>
```

---

## Step 3: Enable GitHub Pages

Now let's make your site live on the internet!

### 3.1 Initial Setup

1. Go to your repository on GitHub
2. Click **"Settings"** (top menu, far right)
3. Scroll down the left sidebar and click **"Pages"**
4. Under **"Source"**, you'll see:
   - Branch: `None`
   - Click the dropdown and select **`gh-pages`**
   - ⚠️ **WAIT!** If you don't see `gh-pages` yet, that's normal

### 3.2 Trigger the First Deployment

The `gh-pages` branch is created automatically by the first workflow run:

1. Go to the **"Actions"** tab in your repository
2. You should see a workflow run called "Deploy static site"
3. If you don't see any workflows:
   - Make a small change (edit any file)
   - Commit it
   - This triggers the workflow

4. Wait for the workflow to complete (1-2 minutes)
   - Green checkmark ✅ = Success
   - Red X ❌ = Failed (see Troubleshooting)

### 3.3 Configure GitHub Pages (After First Deploy)

1. Go back to **Settings → Pages**
2. Now you should see `gh-pages` in the branch dropdown
3. Select:
   - **Branch:** `gh-pages`
   - **Folder:** `/ (root)`
4. Click **"Save"**

### 3.4 Find Your Site URL

After a few minutes, return to **Settings → Pages** and you'll see:

```
Your site is live at https://YOUR-USERNAME.github.io/REPO-NAME/
```

🎉 **Your portfolio is now online!**

---

## Step 4: Verify Your Site is Live

### 4.1 Test the Pages

Visit your site and check:

- ✅ **Homepage** (`/index.html` or just `/`) - Shows your about page
- ✅ **Publications** (`/publications.html`) - Shows your publications
- ✅ **Blog** (`/blog.html`) - Shows blog listing (may be empty)

### 4.2 Check Theme Toggle

- Click the **☀️/🌙 button** in the navigation
- Site should switch between light and dark themes
- Your preference should persist on reload

### 4.3 Verify Sample Post

If you kept the sample post (`welcome-to-my-blog.md`):
- Go to the Blog page
- You should see "Welcome to My Blog"
- Click it to read the full post
- Math equations should render properly

---

## Step 5: Create Your First Blog Post

You can create posts in two ways: **manually on GitHub** or **using the admin panel locally**.

### Method 1: Create Post Directly on GitHub

#### 5.1 Create the Post File

1. In your GitHub repository, navigate to the **`posts/`** folder
2. Click **"Add file"** → **"Create new file"**
3. Name your file: `my-first-post.md`
   - ⚠️ Use lowercase and hyphens
   - ⚠️ Must end with `.md`
   - Good: `compiler-optimization.md`
   - Bad: `My Post.md`

#### 5.2 Write Your Post

Copy this template:

```markdown
---
title: My First Blog Post
tags: [tutorial, getting-started]
date: 2025-11-13
summary: This is my very first blog post on my new portfolio site!
---

## Welcome to My Blog

This is the beginning of my blogging journey. 

### What I'll Write About

- Topic 1
- Topic 2
- Topic 3

### A Code Example

```python
def hello_world():
    print("Hello from my blog!")
```

### Math Support

Inline math: The equation $E = mc^2$ is famous.

Display math:

$$
\int_{0}^{\infty} e^{-x^2} dx = \frac{\sqrt{\pi}}{2}
$$

That's all for now!
```

#### 5.3 Commit the Post

1. Scroll to bottom of the page
2. Commit message: `Add my first blog post`
3. Click **"Commit new file"**

#### 5.4 Wait for Deployment

1. Go to **"Actions"** tab
2. Watch the "Deploy static site" workflow run
3. Wait for green checkmark ✅ (1-2 minutes)
4. Visit your blog page - your new post appears!

---

## Step 6: Use the Admin Panel Locally

The admin panel gives you a better writing experience with live preview.

### 6.1 Download the Repository

You need the files on your computer:

**Option A: Download ZIP**
1. Go to your repository on GitHub
2. Click the green **"Code"** button
3. Select **"Download ZIP"**
4. Extract the ZIP file to a folder (e.g., `Documents/my-portfolio`)

**Option B: Clone with Git**
```bash
git clone https://github.com/YOUR-USERNAME/REPO-NAME.git
cd REPO-NAME
```

### 6.2 Open Admin Panel

1. Navigate to the extracted folder
2. Find `admin.html`
3. **Double-click** to open in your browser
   - Or right-click → Open with → Your Browser

### 6.3 First-Time Setup

When you first use Edit, Delete, or Create:

1. You'll see a prompt: **"GitHub username for the post?"**
   - Enter: `YOUR-USERNAME`
2. Next prompt: **"Repository name?"**
   - Enter: `my-portfolio` (or whatever you named it)
3. Click OK

These are saved in your browser and won't be asked again.

### 6.4 View Your Existing Posts

The admin panel automatically fetches posts from your **live site**:

- You'll see a table with all published posts
- Shows: Title, Date, Tags, Actions
- Status message shows where posts are loaded from

### 6.5 Create a Post with Live Preview

1. Scroll to **"Create New Post"** section
2. Fill in:
   - **Title:** My Second Post
   - **Tags:** blogging, tutorial
   - **Summary:** Learning to use the admin panel
   - **Markdown body:** Your content

3. **Watch the Live Preview** (👁️ tab)
   - As you type, you see formatted output
   - Math equations render in real-time
   - Switch tabs to see metadata (📋 tab)

4. When ready, click **"Create Post on GitHub"**
   - GitHub's editor opens with your content
   - **Review it one more time**
   - Click **"Commit new file"**

5. Wait 1-2 minutes for deployment
6. Click the **🔄 Refresh** button in admin panel
7. Your new post appears in the list!

### 6.6 Edit a Post

1. In the posts table, find the post
2. Click **"Edit"** button
3. GitHub's editor opens with the file
4. Make your changes
5. Scroll down and commit
6. Wait for deployment
7. Refresh admin panel to see changes

### 6.7 Delete a Post

1. Click **"Delete"** button next to a post
2. Confirm in the dialog
3. GitHub's delete page opens
4. **Confirm deletion** on GitHub
5. Wait for deployment
6. Refresh admin panel - post is gone

---

## Daily Workflow

Once everything is set up, here's your typical workflow:

### Scenario 1: Quick Post Creation

```
1. Open admin.html locally
2. Write post with live preview
3. Click "Create Post on GitHub"
4. Review and commit
5. Wait 1-2 minutes
6. Post is live!
```

### Scenario 2: Edit Existing Content

```
1. Go to GitHub repository
2. Navigate to the file
3. Click edit (✏️)
4. Make changes
5. Commit
6. Wait for auto-deployment
```

### Scenario 3: Update About/Publications

```
1. GitHub → about/about.md (or publications)
2. Edit directly
3. Commit changes
4. Auto-deploys to live site
```

### Scenario 4: Mobile Post Creation

```
1. Open GitHub on mobile
2. Navigate to posts/
3. Create new file
4. Write in mobile browser
5. Commit
6. Auto-deploys!
```

---

## Troubleshooting

### ❌ GitHub Actions Fails

**Symptoms:** Red X in Actions tab

**Solutions:**

1. **Check the error message:**
   - Click on the failed workflow
   - Click on the "deploy" job
   - Read the error logs

2. **Common issues:**
   - **Missing `posts/` folder:** Create it with a dummy file
   - **Broken frontmatter:** Check YAML syntax in `.md` files
   - **Node.js error:** Usually auto-fixes on retry

3. **Quick fix:**
   - Make a small change (add a space somewhere)
   - Commit
   - Re-triggers the workflow

### ❌ Site Not Showing Up

**Symptoms:** 404 error when visiting site URL

**Solutions:**

1. **Check Settings → Pages:**
   - Is `gh-pages` branch selected?
   - Is deployment status "Active"?

2. **Wait longer:**
   - First deployment can take 5-10 minutes
   - Try hard refresh: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)

3. **Check repository visibility:**
   - Go to Settings → General
   - Must be **Public** for free GitHub Pages

### ❌ Admin Panel Shows No Posts

**Symptoms:** "No posts found" even though posts exist

**Solutions:**

1. **Check GitHub/repo info:**
   - Open browser console (F12)
   - Look for errors
   - Re-enter GitHub username/repo in localStorage

2. **Clear browser cache:**
   - Press Ctrl+Shift+Delete
   - Clear cached images and files
   - Reload admin.html

3. **Verify posts are deployed:**
   - Visit: `https://YOUR-USERNAME.github.io/REPO/posts/index.json`
   - Should show JSON with your posts

4. **Click Refresh button:**
   - The 🔄 Refresh button in admin panel
   - Manually reloads from live site

### ❌ Math Equations Not Rendering

**Symptoms:** Seeing `$x^2$` instead of formatted equation

**Solutions:**

1. **Wait for MathJax to load:**
   - Takes 1-2 seconds on first page load
   - Try refreshing the page

2. **Check syntax:**
   - Inline: `$equation$` or `\\(equation\\)`
   - Display: `$$equation$$` or `\\[equation\\]`

3. **Escape special characters:**
   - Use `\\` for backslashes in equations

### ❌ CSS/Styling Broken

**Symptoms:** Plain HTML with no styling

**Solutions:**

1. **Check internet connection:**
   - Site uses CDN for CSS/JS
   - Must be online to see styling

2. **CDN might be down:**
   - Wait a few minutes
   - Try different browser

### ❌ Can't Push Changes (Git Users)

**Symptoms:** `git push` fails with authentication error

**Solutions:**

1. **Use Personal Access Token:**
   - Go to GitHub Settings → Developer settings → Personal access tokens
   - Generate new token (classic)
   - Select `repo` scope
   - Use token instead of password

2. **Use GitHub Desktop:**
   - Download GitHub Desktop app
   - Easier than command line

---

## Advanced Tips

### Custom Domain

Want to use `www.yourname.com` instead of `github.io`?

1. Buy a domain (Namecheap, Google Domains, etc.)
2. Create a file named `CNAME` in repository root
3. Contents: just your domain (e.g., `www.yourname.com`)
4. In domain registrar, add DNS records:
   ```
   Type: CNAME
   Host: www
   Value: YOUR-USERNAME.github.io
   ```
5. In GitHub Settings → Pages, enter custom domain
6. Wait 24 hours for DNS propagation

### Adding Images

**Method 1: External hosting (recommended)**
```markdown
![Alt text](https://i.imgur.com/yourimage.png)
```

**Method 2: In repository**
1. Create `images/` folder
2. Upload images
3. Reference: `![Alt text](../images/yourimage.png)`

### Analytics

Add Google Analytics:

1. Get tracking code from Google Analytics
2. Add to each HTML file before `</head>`:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

### Backup Your Content

**Recommended:**
1. Keep important posts in Google Docs or Notion
2. Occasionally download your repository as backup
3. Or clone to multiple computers

---

## Getting Help

- **GitHub Issues:** If this is a template, check the original repository's Issues
- **GitHub Docs:** [docs.github.com/pages](https://docs.github.com/pages)
- **Markdown Guide:** [markdownguide.org](https://www.markdownguide.org)
- **MathJax Docs:** [docs.mathjax.org](https://docs.mathjax.org)

---

## Summary Checklist

Before you consider setup complete:

- [ ] Repository created and code uploaded
- [ ] About page customized with your info
- [ ] Publications page updated (or removed if not applicable)
- [ ] Site header changed from "YOUR NAME" to your actuelle name
- [ ] GitHub Pages enabled and site is live
- [ ] At least one blog post created and visible
- [ ] Admin panel tested locally
- [ ] GitHub username/repo saved in admin panel
- [ ] All links in navigation work
- [ ] Theme toggle works
- [ ] Math equations render properly

---

🎉 **Congratulations!** Your portfolio is live and ready to showcase your work!

**Next steps:**
- Write regularly on your blog
- Share your portfolio URL on LinkedIn, Twitter, etc.
- Update publications as you publish
- Keep your about page current

Happy blogging! 🚀

