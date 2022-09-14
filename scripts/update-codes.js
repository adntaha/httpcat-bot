import fs from 'fs';

fetch('https://raw.githubusercontent.com/httpcats/http.cat/master/src/lib/statuses.js')
    .then((res) => res.text())
    .then((res) => fs.writeFileSync('src/statuses.ts', res));
