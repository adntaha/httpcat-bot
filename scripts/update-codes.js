import fs from 'fs';

fetch('https://api.github.com/repos/httpcats/http.cat/contents/public/images')
    .then((res) => res.json())
    .then((res) => res.map((e) => '"' + e.name.replace('.jpg', '"')))
    .then((res) =>
        fs.writeFileSync(
            '../src/constants.ts',
            'export const statuses = [' + res + '];\n'
        )
    );
