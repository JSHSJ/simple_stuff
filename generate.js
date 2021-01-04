const fs = require('fs');

console.log('Hallo. Ich mach mal.');

const pages = fs.readdirSync('pages');
const links = pages
  .filter((p) => !p.startsWith('.'))
  .map((page) => {
    const content = fs.readFileSync(`pages/${page}/index.html`, { encoding: 'utf8' });
    const title = content.split('<title>')[1].split('</title>')[0];
    // return {
    //   target: `pages/${page}`,
    //   name: title,
    // };
    return `<li><a href="pages/${page}">${title}</a></li>`;
  });

const index = fs.readFileSync('index.template', { encoding: 'utf8' }).replace('__LINKS__', links.join('\n'));
fs.writeFileSync('index.html', index);
