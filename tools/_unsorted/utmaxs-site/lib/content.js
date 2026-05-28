import fs from "node:fs";
import path from "node:path";

const postsDirectory = path.join(process.cwd(), "content", "posts");

export function getAllPosts() {
  const files = fs.readdirSync(postsDirectory).filter((file) => file.endsWith(".md"));
  return files
    .map((file) => {
      const slug = file.replace(/\.md$/, "");
      const post = getPostBySlug(slug);
      return {
        slug,
        title: post.title,
        date: post.date,
        description: post.description,
        tags: post.tags
      };
    })
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getPostBySlug(slug) {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  const file = fs.readFileSync(fullPath, "utf8");
  const { data, body } = parseFrontmatter(file);
  return {
    slug,
    title: data.title || "TODO：未命名文章",
    date: data.date || "TODO：补充日期",
    description: data.description || "TODO：补充文章摘要",
    tags: data.tags ? data.tags.split(",").map((tag) => tag.trim()) : [],
    html: renderMarkdown(body)
  };
}

function parseFrontmatter(file) {
  if (!file.startsWith("---")) {
    return { data: {}, body: file };
  }

  const end = file.indexOf("\n---", 3);
  if (end === -1) {
    return { data: {}, body: file };
  }

  const raw = file.slice(3, end).trim();
  const body = file.slice(end + 4).trim();
  const data = {};
  raw.split("\n").forEach((line) => {
    const index = line.indexOf(":");
    if (index > -1) {
      data[line.slice(0, index).trim()] = line.slice(index + 1).trim();
    }
  });

  return { data, body };
}

function renderMarkdown(markdown) {
  const lines = markdown.split(/\r?\n/);
  let html = "";
  let inList = false;
  let inCode = false;
  let code = [];
  let table = [];

  const closeList = () => {
    if (inList) {
      html += "</ul>";
      inList = false;
    }
  };

  const closeTable = () => {
    if (!table.length) return;
    const rows = table
      .map((line) =>
        line
          .trim()
          .replace(/^\|/, "")
          .replace(/\|$/, "")
          .split("|")
          .map((cell) => inline(cell.trim()))
      )
      .filter((row) => !row.every((cell) => /^:?-{3,}:?$/.test(cell)));

    if (rows.length) {
      const [head, ...body] = rows;
      html += "<div class=\"table-scroll\"><table><thead><tr>";
      html += head.map((cell) => `<th>${cell}</th>`).join("");
      html += "</tr></thead><tbody>";
      html += body
        .map((row) => `<tr>${row.map((cell) => `<td>${cell}</td>`).join("")}</tr>`)
        .join("");
      html += "</tbody></table></div>";
    }
    table = [];
  };

  for (const line of lines) {
    if (line.trim().startsWith("```")) {
      if (inCode) {
        html += `<pre><code>${escapeHtml(code.join("\n"))}</code></pre>`;
        code = [];
        inCode = false;
      } else {
        closeList();
        inCode = true;
      }
      continue;
    }

    if (inCode) {
      code.push(line);
      continue;
    }

    if (line.trim().startsWith("|") && line.trim().endsWith("|")) {
      closeList();
      table.push(line);
      continue;
    }

    closeTable();

    if (!line.trim()) {
      closeList();
      continue;
    }

    if (line.startsWith("### ")) {
      closeList();
      html += `<h3>${inline(line.slice(4))}</h3>`;
    } else if (line.startsWith("## ")) {
      closeList();
      html += `<h2>${inline(line.slice(3))}</h2>`;
    } else if (line.startsWith("# ")) {
      closeList();
      html += `<h1>${inline(line.slice(2))}</h1>`;
    } else if (line.startsWith("- ")) {
      if (!inList) {
        html += "<ul>";
        inList = true;
      }
      html += `<li>${inline(line.slice(2))}</li>`;
    } else {
      closeList();
      html += `<p>${inline(line)}</p>`;
    }
  }

  closeList();
  closeTable();
  return html;
}

function inline(text) {
  return escapeHtml(text)
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
}

function escapeHtml(value) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
