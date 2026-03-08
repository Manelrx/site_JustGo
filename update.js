const fs = require('fs');
const path = require('path');
const dir = path.join(__dirname, 'src/content/blog');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.md'));

for (const file of files) {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    content = content.replace(/publishDate:/g, 'pubDate:');
    content = content.replace(/category: "Síndicos"/g, 'tags: ["Síndicos"]\ndraft: false');
    fs.writeFileSync(filePath, content);
}
console.log('Frontmatter updated');
