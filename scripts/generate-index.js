const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const POSTS_DIR = path.join(ROOT, 'posts');
const INDEX_FILE = path.join(POSTS_DIR, 'index.json');

function main() {
  const files = fs
    .readdirSync(POSTS_DIR)
    .filter((file) => file.endsWith('.md'));

  const posts = files
    .map((file) => {
      const slug = path.basename(file, '.md');
      const raw = fs.readFileSync(path.join(POSTS_DIR, file), 'utf8');
      const { frontmatter } = extractFrontmatter(raw);
      if (!frontmatter.title) {
        console.warn(`Skipping ${file} because title is missing in frontmatter.`);
        return null;
      }
      return {
        slug,
        title: frontmatter.title,
        date: frontmatter.date || '',
        tags: parseTags(frontmatter.tags),
        summary: frontmatter.summary || '',
      };
    })
    .filter(Boolean)
    .sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0));

  const payload = JSON.stringify({ posts }, null, 2) + '\n';
  fs.writeFileSync(INDEX_FILE, payload, 'utf8');
  console.log(`Updated ${INDEX_FILE} with ${posts.length} posts.`);
}

function extractFrontmatter(raw) {
  if (!raw.startsWith('---')) {
    return { frontmatter: {}, content: raw };
  }
  const match = raw.match(/^---\s*([\s\S]*?)\s*---\s*/);
  if (!match) {
    return { frontmatter: {}, content: raw };
  }

  const frontmatter = {};
  match[1]
    .split(/\r?\n/)
    .filter(Boolean)
    .forEach((line) => {
      const [key, ...rest] = line.split(':');
      if (!key) return;
      frontmatter[key.trim()] = rest.join(':').trim();
    });

  const content = raw.slice(match[0].length);
  return { frontmatter, content };
}

function parseTags(value) {
  if (!value) return [];
  if (Array.isArray(value)) return value;
  if (typeof value === 'string' && value.startsWith('[') && value.endsWith(']')) {
    return value
      .slice(1, -1)
      .split(',')
      .map((tag) => tag.trim())
      .filter(Boolean);
  }
  return String(value)
    .split(',')
    .map((tag) => tag.trim())
    .filter(Boolean);
}

main();
