(function () {
  const state = {
    posts: [],
    searchQuery: '',
    activeTag: 'all'
  };
  const THEME_KEY = 'portfolio-theme';

  document.addEventListener('DOMContentLoaded', initSite);

  function initSite() {
    setCurrentYear();
    initTheme();
    bindThemeToggle();
    routePage();
  }

  function setCurrentYear() {
    const yearEl = document.getElementById('year');
    if (yearEl) {
      yearEl.textContent = new Date().getFullYear();
    }
  }

  function routePage() {
    const page = document.body.dataset.page || 'index';
    switch (page) {
      case 'index':
        loadPage('about/about.md');
        break;
      case 'publications':
        loadPage('publications/publications.md');
        break;
      case 'blog':
        initBlogPage();
        break;
      case 'admin':
        setupAdminPage();
        break;
      default:
        loadPage('about/about.md');
        break;
    }
  }

  async function loadPage(mdFile) {
    const content = document.getElementById('content');
    if (!content) return;
    try {
      const { html } = await loadMarkdown(mdFile);
      content.innerHTML = html;
      typesetMath();
    } catch (error) {
      content.innerHTML = createErrorMessage(error);
    }
  }

  async function loadMarkdown(path) {
    const response = await fetch(path, { cache: 'no-cache' });
    if (!response.ok) {
      throw new Error(`Unable to load ${path}`);
    }
    const raw = await response.text();
    const { frontmatter, content } = extractFrontmatter(raw);
    const html = window.marked ? window.marked.parse(content) : content;
    return { html, frontmatter, content };
  }

  function extractFrontmatter(raw) {
    const frontmatter = {};
    if (raw.startsWith('---')) {
      const match = raw.match(/^---\s*([\s\S]*?)\s*---\s*/);
      if (match) {
        const lines = match[1].split(/\r?\n/);
        lines.forEach((line) => {
          if (!line.includes(':')) return;
          const [key, ...rest] = line.split(':');
          const value = rest.join(':').trim();
          if (!key) return;
          if (value.startsWith('[') && value.endsWith(']')) {
            const list = value
              .slice(1, -1)
              .split(',')
              .map((item) => item.trim())
              .filter(Boolean);
            frontmatter[key.trim()] = list;
          } else {
            frontmatter[key.trim()] = value;
          }
        });
        const content = raw.slice(match[0].length);
        return { frontmatter, content };
      }
    }
    return { frontmatter, content: raw };
  }

  function createErrorMessage(error) {
    return `<section class="notice"><h2>Content unavailable</h2><p>${error.message}</p></section>`;
  }

  function initBlogPage() {
    const params = new URLSearchParams(window.location.search);
    const slug = params.get('post');
    if (slug) {
      loadBlogPost(slug);
    } else {
      loadBlogIndex();
    }
  }

  async function loadBlogIndex() {
    const content = document.getElementById('content');
    if (!content) return;
    content.innerHTML = `
      <section class="blog-controls">
        <label>Search posts
          <input id="blog-search" type="search" placeholder="Search by title or summary" />
        </label>
        <div id="tag-filters" style="margin-top:10px;" class="tag-filter-group"></div>
      </section>
      <section id="posts-list" class="blog-list"></section>
    `;
    try {
      const response = await fetch('posts/index.json', { cache: 'no-cache' });
      if (!response.ok) {
        throw new Error('Unable to read posts index');
      }
      const data = await response.json();
      state.posts = Array.isArray(data.posts) ? data.posts : [];
      buildTagFilters(state.posts);
      bindBlogControls();
      renderBlogList();
    } catch (error) {
      document.getElementById('posts-list').innerHTML = createErrorMessage(error);
    }
  }

  function bindBlogControls() {
    const searchInput = document.getElementById('blog-search');
    if (searchInput) {
      searchInput.addEventListener('input', (event) => {
        state.searchQuery = event.target.value.toLowerCase();
        renderBlogList();
      });
    }
  }

  function buildTagFilters(posts) {
    const container = document.getElementById('tag-filters');
    if (!container) return;
    const tagSet = new Set();
    posts.forEach((post) => {
      if (Array.isArray(post.tags)) {
        post.tags.forEach((tag) => tagSet.add(tag));
      }
    });
    const buttons = ['all', ...Array.from(tagSet.values())]
      .map(
        (tag) =>
          `<button type="button" class="tag-filter${tag === 'all' ? ' active' : ''}" data-tag="${tag}">${tag}</button>`
      )
      .join('');
    container.innerHTML = buttons;
    container.addEventListener('click', (event) => {
      if (!(event.target instanceof HTMLElement)) return;
      const tag = event.target.dataset.tag;
      if (!tag) return;
      state.activeTag = tag;
      Array.from(container.children).forEach((child) => child.classList.remove('active'));
      event.target.classList.add('active');
      renderBlogList();
    });
  }

  function renderBlogList() {
    const list = document.getElementById('posts-list');
    if (!list) return;
    const filtered = state.posts.filter((post) => {
      const tags = Array.isArray(post.tags) ? post.tags : [];
      const matchesTag = state.activeTag === 'all' || tags.includes(state.activeTag);
      const summary = post.summary ? String(post.summary) : '';
      const haystack = `${post.title} ${summary}`.toLowerCase();
      const matchesSearch = haystack.includes(state.searchQuery || '');
      return matchesTag && matchesSearch;
    });

    if (!filtered.length) {
      list.innerHTML = '<p>No posts found with the current filters.</p>';
      return;
    }

    list.innerHTML = filtered
      .map((post) => {
        const tags = Array.isArray(post.tags)
          ? post.tags.map((tag) => `<span class="tag">${tag}</span>`).join(' ')
          : '';
        return `
          <article class="post-card">
            <header>
              <h2><a href="blog.html?post=${post.slug}">${post.title}</a></h2>
              <p class="post-meta">${post.date || ''}</p>
            </header>
            <p>${post.summary || ''}</p>
            <p class="tag-row">${tags}</p>
          </article>
        `;
      })
      .join('');
  }

  async function loadBlogPost(slug) {
    const content = document.getElementById('content');
    if (!content) return;
    try {
      const safeSlug = slug.replace(/[^a-z0-9-]/gi, '').toLowerCase();
      const { html, frontmatter } = await loadMarkdown(`posts/${safeSlug}.md`);
      const tags = Array.isArray(frontmatter.tags)
        ? frontmatter.tags.map((tag) => `<span class="tag">${tag}</span>`).join(' ')
        : '';
      content.innerHTML = `
        <article class="blog-post">
          <a href="blog.html" class="back-link">&larr; Back to all posts</a>
          <h1>${frontmatter.title || 'Untitled Post'}</h1>
          <p class="post-meta">${frontmatter.date || ''}</p>
          <p class="tag-row">${tags}</p>
          <section>${html}</section>
        </article>
      `;
      typesetMath();
    } catch (error) {
      content.innerHTML = createErrorMessage(error);
    }
  }

  async function setupAdminPage() {
    // Setup refresh button
    const refreshButton = document.getElementById('refresh-posts');
    if (refreshButton) {
      refreshButton.addEventListener('click', async () => {
        refreshButton.disabled = true;
        refreshButton.textContent = '⏳ Refreshing...';
        await loadExistingPosts();
        refreshButton.disabled = false;
        refreshButton.textContent = '🔄 Refresh';
      });
    }

    // Load existing posts list
    await loadExistingPosts();

    // Setup preview tabs
    setupPreviewTabs();

    // Setup create new post form
    const titleInput = document.getElementById('post-title');
    const tagsInput = document.getElementById('post-tags');
    const summaryInput = document.getElementById('post-summary');
    const bodyInput = document.getElementById('post-body');
    const filenamePreview = document.getElementById('filename-preview');
    const frontmatterPreview = document.getElementById('frontmatter-preview');
    const githubButton = document.getElementById('github-button');
    const markdownPreview = document.getElementById('markdown-preview');

    if (!titleInput || !tagsInput || !bodyInput || !filenamePreview || !frontmatterPreview || !githubButton) {
      return;
    }

    let previewDebounceTimer = null;

    const updatePreviews = () => {
      const slug = createSlug(titleInput.value);
      const filename = `${slug || 'new-post'}.md`;
      filenamePreview.textContent = filename;
      const frontmatter = buildFrontmatter(titleInput.value, tagsInput.value, summaryInput.value);
      frontmatterPreview.textContent = frontmatter;
      return { filename, frontmatter };
    };

    const updateMarkdownPreview = () => {
      if (!markdownPreview) return;
      
      // Debounce the preview update
      clearTimeout(previewDebounceTimer);
      previewDebounceTimer = setTimeout(() => {
        const title = titleInput.value.trim();
        const body = bodyInput.value.trim();
        const tags = tagsInput.value.trim();
        
        if (!body && !title) {
          markdownPreview.innerHTML = '<div class="preview-empty">Start typing to see a live preview...</div>';
          return;
        }

        // Build the preview with title and tags
        let previewHtml = '';
        
        if (title) {
          previewHtml += `<h1>${escapeHtml(title)}</h1>`;
        }
        
        if (tags) {
          const tagList = tags.split(',').map(tag => tag.trim()).filter(Boolean);
          if (tagList.length > 0) {
            previewHtml += '<p class="tag-row">';
            tagList.forEach(tag => {
              previewHtml += `<span class="tag-pill">${escapeHtml(tag)}</span>`;
            });
            previewHtml += '</p>';
          }
        }
        
        if (body) {
          try {
            const rendered = window.marked ? window.marked.parse(body) : body;
            previewHtml += rendered;
          } catch (error) {
            previewHtml += `<div class="preview-empty" style="color: red;">Error rendering markdown: ${error.message}</div>`;
          }
        }
        
        markdownPreview.innerHTML = previewHtml;
        
        // Typeset math if MathJax is available
        if (window.MathJax && window.MathJax.typesetPromise) {
          window.MathJax.typesetPromise([markdownPreview]).catch((err) => {
            console.warn('MathJax typeset error:', err);
          });
        }
      }, 300); // 300ms debounce
    };

    ['input', 'blur'].forEach((evt) => {
      titleInput.addEventListener(evt, updatePreviews);
      tagsInput.addEventListener(evt, updatePreviews);
      summaryInput.addEventListener(evt, updatePreviews);
      
      // Update markdown preview on input
      titleInput.addEventListener(evt, updateMarkdownPreview);
      tagsInput.addEventListener(evt, updateMarkdownPreview);
      bodyInput.addEventListener(evt, updateMarkdownPreview);
    });

    githubButton.addEventListener('click', () => {
      const { filename, frontmatter } = updatePreviews();
      const markdownBody = bodyInput.value.trim();
      const payload = `${frontmatter}\n${markdownBody}\n`;
      const target = resolveGithubTarget();
      if (!target) return;
      const encodedContent = encodeURIComponent(payload);
      const encodedFilename = encodeURIComponent(filename);
      const url = `https://github.com/${target.username}/${target.repo}/new/main/posts?filename=${encodedFilename}&value=${encodedContent}`;
      window.open(url, '_blank');
    });

    updatePreviews();
    updateMarkdownPreview();
  }

  function setupPreviewTabs() {
    const tabs = document.querySelectorAll('.preview-tab');
    const previewTab = document.getElementById('preview-content-tab');
    const metadataTab = document.getElementById('metadata-content-tab');
    
    if (!tabs.length || !previewTab || !metadataTab) return;
    
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const targetTab = tab.dataset.tab;
        
        // Update active tab styling
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        
        // Show/hide content
        if (targetTab === 'preview') {
          previewTab.style.display = 'block';
          metadataTab.style.display = 'none';
        } else {
          previewTab.style.display = 'none';
          metadataTab.style.display = 'block';
        }
      });
    });
  }

  async function loadExistingPosts() {
    const loadingDiv = document.getElementById('posts-loading');
    const containerDiv = document.getElementById('posts-container');
    const postsListBody = document.getElementById('posts-list');
    const statusDiv = document.getElementById('posts-status');

    try {
      // For admin page, try to fetch from deployed site first, fall back to local
      let indexUrl = 'posts/index.json';
      let isFromLiveSite = false;
      
      // Check if we're on the admin page
      const isAdminPage = document.body.dataset.page === 'admin';
      
      if (isAdminPage) {
        const target = getGithubTargetIfExists();
        if (target && target.username && target.repo) {
          // Try fetching from GitHub Pages first
          const ghPagesUrl = `https://${target.username}.github.io/${target.repo}/posts/index.json`;
          try {
            const ghResponse = await fetch(ghPagesUrl, { cache: 'no-cache' });
            if (ghResponse.ok) {
              indexUrl = ghPagesUrl;
              isFromLiveSite = true;
              if (loadingDiv) {
                loadingDiv.innerHTML = 'Loading posts from live site...';
              }
            }
          } catch (e) {
            // Fallback to local - maybe site not deployed yet
            console.log('Could not fetch from GitHub Pages, using local index');
          }
        }
      }

      const response = await fetch(indexUrl, { cache: 'no-cache' });
      if (!response.ok) {
        throw new Error('Unable to load posts index');
      }
      const data = await response.json();
      const posts = Array.isArray(data.posts) ? data.posts : [];

      if (loadingDiv) loadingDiv.style.display = 'none';
      if (containerDiv) containerDiv.style.display = 'block';

      // Show status message
      if (statusDiv && isAdminPage) {
        if (isFromLiveSite) {
          statusDiv.innerHTML = '✅ Showing posts from your live site (always up-to-date)';
          statusDiv.className = 'status-message info';
        } else {
          statusDiv.innerHTML = '⚠️ Showing local posts only. Your site may have more posts. Click Refresh after deployment completes.';
          statusDiv.className = 'status-message info';
        }
        statusDiv.style.display = 'block';
      }

      if (!postsListBody) return;

      if (posts.length === 0) {
        postsListBody.innerHTML = '<tr><td colspan="4" class="no-posts">No posts found. Create your first post below!</td></tr>';
        return;
      }

      postsListBody.innerHTML = posts
        .map((post) => {
          const tags = Array.isArray(post.tags)
            ? post.tags.map((tag) => `<span class="tag-pill">${tag}</span>`).join('')
            : '';
          return `
            <tr>
              <td><strong>${post.title || 'Untitled'}</strong></td>
              <td>${post.date || 'No date'}</td>
              <td>${tags || '<em>No tags</em>'}</td>
              <td>
                <div class="action-buttons">
                  <button class="edit-btn" data-slug="${post.slug}" data-title="${escapeHtml(post.title)}">Edit</button>
                  <button class="delete-btn" data-slug="${post.slug}" data-title="${escapeHtml(post.title)}">Delete</button>
                </div>
              </td>
            </tr>
          `;
        })
        .join('');

      // Attach event listeners to edit and delete buttons
      postsListBody.querySelectorAll('.edit-btn').forEach((btn) => {
        btn.addEventListener('click', async (e) => {
          const slug = e.target.dataset.slug;
          const title = e.target.dataset.title;
          await handleEditPost(slug, title);
        });
      });

      postsListBody.querySelectorAll('.delete-btn').forEach((btn) => {
        btn.addEventListener('click', (e) => {
          const slug = e.target.dataset.slug;
          const title = e.target.dataset.title;
          handleDeletePost(slug, title);
        });
      });
    } catch (error) {
      if (loadingDiv) {
        loadingDiv.innerHTML = `<div class="status-message error">Error loading posts: ${error.message}</div>`;
      }
    }
  }

  async function handleEditPost(slug, title) {
    const target = resolveGithubTarget();
    if (!target) return;

    const confirmEdit = confirm(`Edit post "${title}"?\n\nThis will open GitHub's editor where you can modify the post.`);
    if (!confirmEdit) return;

    const filename = `${slug}.md`;
    const editUrl = `https://github.com/${target.username}/${target.repo}/edit/main/posts/${filename}`;
    window.open(editUrl, '_blank');
  }

  function handleDeletePost(slug, title) {
    const target = resolveGithubTarget();
    if (!target) return;

    const confirmDelete = confirm(
      `Are you sure you want to delete "${title}"?\n\nThis will open GitHub where you must confirm the deletion.`
    );
    if (!confirmDelete) return;

    const filename = `${slug}.md`;
    const deleteUrl = `https://github.com/${target.username}/${target.repo}/delete/main/posts/${filename}`;
    window.open(deleteUrl, '_blank');
  }

  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  function buildFrontmatter(title, tags, summary = '') {
    const today = new Date().toISOString().split('T')[0];
    const cleanTitle = title && title.trim() ? title.trim() : 'Untitled Post';
    const tagList = tags
      .split(',')
      .map((tag) => tag.trim())
      .filter(Boolean)
      .join(', ');
    const cleanSummary = summary && summary.trim() ? summary.trim() : '';
    return `---\ntitle: ${cleanTitle}\ntags: [${tagList}]\ndate: ${today}\nsummary: ${cleanSummary}\n---`;
  }

  function createSlug(text) {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .substring(0, 80);
  }

  function getGithubTargetIfExists() {
    const storageKey = 'githubTarget';
    try {
      const saved = localStorage.getItem(storageKey);
      return saved ? JSON.parse(saved) : null;
    } catch (error) {
      console.warn('Unable to parse GitHub target', error);
      return null;
    }
  }

  function resolveGithubTarget() {
    const storageKey = 'githubTarget';
    let target = getGithubTargetIfExists();

    if (!target || !target.username || !target.repo) {
      const username = window.prompt('GitHub username for the post?');
      const repo = window.prompt('Repository name?');
      if (!username || !repo) {
        alert('GitHub username and repository are required to create the URL.');
        return null;
      }
      target = { username: username.trim(), repo: repo.trim() };
      localStorage.setItem(storageKey, JSON.stringify(target));
    }

    return target;
  }

  function initTheme() {
    const stored = localStorage.getItem(THEME_KEY) || 'light';
    applyTheme(stored);
  }

  function bindThemeToggle() {
    const toggle = document.getElementById('theme-toggle');
    if (!toggle) return;
    toggle.addEventListener('click', () => {
      const nextTheme = document.body.classList.contains('latex-dark') ? 'light' : 'dark';
      applyTheme(nextTheme);
    });
  }

  function applyTheme(theme) {
    const body = document.body;
    body.classList.remove('latex-dark', 'latex-light');
    if (theme === 'dark') {
      body.classList.add('latex-dark');
    } else {
      body.classList.add('latex-light');
      theme = 'light';
    }
    localStorage.setItem(THEME_KEY, theme);
    updateThemeButton(theme);
  }

  function updateThemeButton(theme) {
    const toggle = document.getElementById('theme-toggle');
    if (!toggle) return;
    const isDark = theme === 'dark';
    toggle.textContent = isDark ? '\u263E' : '\u2600';
    toggle.setAttribute('aria-pressed', String(isDark));
    toggle.setAttribute('title', isDark ? 'Switch to light theme' : 'Switch to dark theme');
  }

  function typesetMath() {
    if (window.MathJax && window.MathJax.typesetPromise) {
      window.MathJax.typesetPromise();
    }
  }
})();
