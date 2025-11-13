# Admin Panel Guide

The enhanced admin panel provides a complete blog management system through GitHub's web interface.

## Overview

Open `admin.html` locally to access the blog management interface. The admin page has two main sections:

## 🎯 Smart Post Loading

**The admin panel automatically fetches posts from your LIVE site**, not your local files! This means:

✅ **Always up-to-date** - See posts immediately after they're deployed  
✅ **No manual sync needed** - No need to pull changes or run scripts locally  
✅ **Edit/Delete any post** - Even posts created by others or on other machines  
✅ **Refresh button** - Manually reload posts if needed  

The first time you use the admin panel, you'll be prompted for your GitHub username and repository name. This info is saved locally and used to fetch posts from `https://username.github.io/repo-name/posts/index.json`.

### 1. Manage Existing Posts

A table displaying all your published blog posts with:
- **Title** - The post's title
- **Date** - Publication date
- **Tags** - All tags associated with the post
- **Actions** - Edit and Delete buttons

#### Edit a Post

1. Click the **Edit** button next to any post
2. Confirm the action in the dialog
3. GitHub's editor opens with the post content loaded
4. Make your changes in the GitHub editor
5. Commit the changes
6. GitHub Actions automatically rebuilds the site

**Behind the scenes:** Opens `https://github.com/username/repo/edit/main/posts/slug.md`

#### Delete a Post

1. Click the **Delete** button next to any post
2. Confirm the deletion in the dialog
3. GitHub's delete page opens
4. Confirm deletion on GitHub
5. GitHub Actions automatically rebuilds the site

**Behind the scenes:** Opens `https://github.com/username/repo/delete/main/posts/slug.md`

### 2. Create New Post

A form for creating new blog posts with:

#### Input Fields
- **Title** - The post title (required)
- **Tags** - Comma-separated tags (optional)
- **Summary** - Brief description shown in post listings (optional)
- **Markdown body** - The main content (required)

#### Live Preview Feature ✨

The admin panel includes a **real-time markdown preview** that shows exactly how your post will look:

- **Live rendering** - Updates as you type (300ms debounce)
- **Math support** - LaTeX formulas render using MathJax
- **Title & tags preview** - See the full post presentation
- **Tab interface** - Switch between "Live Preview" and "Metadata" tabs

**Example:**
- Type: `## Hello $x^2$`
- See: Rendered heading with formatted math equation

#### Workflow

1. Fill in the title, tags, summary, and content
2. **Watch the live preview** as you type (👁️ Live Preview tab)
3. Review the generated filename and frontmatter (📋 Metadata tab)
4. Click **Create Post on GitHub**
5. GitHub's new file editor opens with content pre-filled
6. Review and commit the file
7. GitHub Actions automatically rebuilds the site

## First-Time Setup

On your first action (Edit, Delete, or Create), you'll be prompted for:

1. **GitHub username** - Your GitHub username
2. **Repository name** - The name of this repository

These are saved in localStorage for future use.

## Workflow Diagram

```
┌─────────────────────────┐
│   Open admin.html       │
│   (local development)   │
└───────────┬─────────────┘
            │
            ▼
┌─────────────────────────┐
│  View existing posts    │
│  in management table    │
└───────────┬─────────────┘
            │
     ┌──────┴──────┐
     │             │
     ▼             ▼
┌─────────┐   ┌─────────┐   ┌─────────────┐
│  Edit   │   │ Delete  │   │ Create New  │
└────┬────┘   └────┬────┘   └──────┬──────┘
     │             │               │
     └─────────────┴───────────────┘
                   │
                   ▼
      ┌────────────────────────┐
      │  GitHub web interface  │
      │  opens in new tab      │
      └───────────┬────────────┘
                  │
                  ▼
      ┌────────────────────────┐
      │   Review & commit      │
      │   changes on GitHub    │
      └───────────┬────────────┘
                  │
                  ▼
      ┌────────────────────────┐
      │  GitHub Actions        │
      │  automatically runs:   │
      │  - generate-index.js   │
      │  - deploy to gh-pages  │
      └───────────┬────────────┘
                  │
                  ▼
      ┌────────────────────────┐
      │  Site updated with     │
      │  your changes!         │
      └────────────────────────┘
```

## Benefits

✅ **Git-based workflow** - All changes are versioned  
✅ **GitHub's editor** - Familiar interface with syntax highlighting  
✅ **Review before commit** - Always see changes before they go live  
✅ **Automatic deployment** - No manual build steps  
✅ **Secure** - Admin panel never deployed to production  
✅ **No backend needed** - Pure static site with GitHub as CMS  

## Tips

- **Use descriptive commit messages** when editing/creating posts
- **Tags are searchable** on the blog page, so use consistent naming
- **Add summaries** to make your blog listing more informative
- **Preview math notation** - Use tools like https://www.mathjax.org/ to test LaTeX
- **Markdown tips** - GitHub's editor has a preview tab to check formatting

## Troubleshooting

### "No posts found" message
- This is normal if you haven't created any posts yet
- Create your first post using the form below

### GitHub prompts for repo info every time
- Check your browser's localStorage settings
- Make sure cookies/local storage is enabled for the admin page

### Post doesn't appear after creation
- Wait for GitHub Actions to complete (usually 1-2 minutes)
- Check the Actions tab in your GitHub repository
- Ensure your post has a `title` in the frontmatter

### Changes not reflecting
- Clear your browser cache
- Check that the deployment succeeded in GitHub Actions
- Verify the file was committed to the `main` branch

