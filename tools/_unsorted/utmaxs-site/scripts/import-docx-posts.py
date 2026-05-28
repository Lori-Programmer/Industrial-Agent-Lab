from pathlib import Path
import re
import shutil
from docx import Document
from docx.document import Document as DocxDocument
from docx.table import Table
from docx.text.paragraph import Paragraph

POST_DIR = Path("content/posts")

DOCS = [
    {
        "path": Path(r"C:\Users\刘\Downloads\00_总目录与阅读顺序.docx"),
        "slug": "00-reading-order",
        "date": "2026-05-27",
        "tags": "总目录,阅读顺序,工程学习",
    },
    {
        "path": Path(r"C:\Users\刘\Downloads\01_从迷茫到产出_大学生问题导向执行系统.docx"),
        "slug": "01-problem-driven-output",
        "date": "2026-05-26",
        "tags": "大学生,执行系统,作品产出",
    },
    {
        "path": Path(r"C:\Users\刘\Downloads\02_AI时代学习法_英语读书与知识资产.docx"),
        "slug": "02-ai-learning-method",
        "date": "2026-05-25",
        "tags": "AI学习法,英语,知识资产",
    },
    {
        "path": Path(r"C:\Users\刘\Downloads\03_工业智能工程路线_从PLC到MARL.docx"),
        "slug": "03-industrial-intelligence-roadmap",
        "date": "2026-05-24",
        "tags": "PLC,工业通信,仿真,MARL",
    },
    {
        "path": Path(r"C:\Users\刘\Downloads\04_从项目到作品集_产品化与现金闭环.docx"),
        "slug": "04-project-portfolio-productization",
        "date": "2026-05-23",
        "tags": "作品集,产品化,现金闭环",
    },
    {
        "path": Path(r"C:\Users\刘\Downloads\05_工程师AI工具链_网站工程库与工具学习计划.docx"),
        "slug": "05-engineer-ai-toolchain",
        "date": "2026-05-22",
        "tags": "AI工具链,工程库,学习计划",
    },
    {
        "path": Path(r"C:\Users\刘\Downloads\06_高能叙事安全手册_架构式弥赛亚主义形成与警告.docx"),
        "slug": "06-narrative-safety-handbook",
        "date": "2026-05-21",
        "tags": "安全手册,叙事,工程化成长",
    },
]


def clean_text(value: str) -> str:
    return re.sub(r"\s+", " ", value).strip()


def as_heading(text: str) -> bool:
    if re.match(r"^[一二三四五六七八九十]+、", text):
        return True
    if re.match(r"^\d+[.、]\s*", text):
        return True
    return False


def escape_frontmatter(value: str) -> str:
    return value.replace('"', '\\"')


def iter_blocks(parent):
    if isinstance(parent, DocxDocument):
        parent_elm = parent.element.body
    else:
        parent_elm = parent._element

    for child in parent_elm.iterchildren():
        if child.tag.endswith("}p"):
            yield Paragraph(child, parent)
        elif child.tag.endswith("}tbl"):
            yield Table(child, parent)


def table_to_markdown(table: Table) -> str:
    rows = []
    for row in table.rows:
        values = []
        for cell in row.cells:
            text = clean_text(cell.text).replace("|", "\\|")
            values.append(text or " ")
        rows.append(values)

    if not rows:
        return ""

    width = max(len(row) for row in rows)
    rows = [row + [" "] * (width - len(row)) for row in rows]
    header = rows[0]
    separator = ["---"] * width
    body = rows[1:]
    lines = [
        "| " + " | ".join(header) + " |",
        "| " + " | ".join(separator) + " |",
    ]
    lines.extend("| " + " | ".join(row) + " |" for row in body)
    return "\n".join(lines)


def convert_doc(item: dict) -> str:
    doc = Document(str(item["path"]))
    blocks = []
    paragraphs = []
    for block in iter_blocks(doc):
        if isinstance(block, Paragraph):
            text = clean_text(block.text)
            if text:
                blocks.append(("paragraph", text))
                paragraphs.append(text)
        elif isinstance(block, Table):
            md = table_to_markdown(block)
            if md:
                blocks.append(("table", md))

    if len(paragraphs) < 5:
        raise ValueError(f"Document has too few paragraphs: {item['path']}")

    title = paragraphs[0]
    subtitle = paragraphs[1]
    description = next((p for p in paragraphs[4:] if not as_heading(p)), subtitle)
    description = description[:120]

    body_lines = [
        "---",
        f'title: "{escape_frontmatter(title)}"',
        f"date: {item['date']}",
        f'description: "{escape_frontmatter(description)}"',
        f"tags: {item['tags']}",
        "---",
        "",
        f"## {subtitle}",
        "",
    ]

    skipped_paragraphs = 0
    for kind, value in blocks:
        if kind == "table":
            body_lines.append(value)
            body_lines.append("")
            continue

        text = value
        if skipped_paragraphs < 2:
            skipped_paragraphs += 1
            continue

        if text == paragraphs[3] and text.isdigit():
            body_lines.append(f"> 文档编号：{text}")
            body_lines.append("")
        elif as_heading(text):
            body_lines.append(f"## {text}")
            body_lines.append("")
        elif text.endswith("：") and len(text) <= 28:
            body_lines.append(f"### {text}")
            body_lines.append("")
        else:
            body_lines.append(text)
            body_lines.append("")

    return "\n".join(body_lines).strip() + "\n"


def main() -> None:
    POST_DIR.mkdir(parents=True, exist_ok=True)
    for old in POST_DIR.glob("*.md"):
        old.unlink()

    for item in DOCS:
        if not item["path"].exists():
            raise FileNotFoundError(item["path"])
        output = POST_DIR / f"{item['slug']}.md"
        output.write_text(convert_doc(item), encoding="utf-8")

    image_source = Path(
        r"D:\微信\win\xwechat_files\wxid_qqsrfh2c0b2f12_a069\temp\RWTemp\2026-05\9e20f478899dc29eb19741386f9343c8\b8c59b01ac43877a7541996446e0dcf2.jpg"
    )
    image_dir = Path("public/images")
    image_dir.mkdir(parents=True, exist_ok=True)
    if image_source.exists():
        shutil.copyfile(image_source, image_dir / "utmaxs-logo.jpg")


if __name__ == "__main__":
    main()
