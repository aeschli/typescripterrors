import fs from 'fs';
import https from 'https';

https.get('https://raw.githubusercontent.com/microsoft/TypeScript/main/src/compiler/diagnosticMessages.json', (res) => {
    let data = '';

    res.on('data', (chunk) => {
        data += chunk.toString();
    });

    res.on('end', () => {
        const table = JSON.parse(data);
        let result = [];
        for (let key in table) {
            const code = table[key].code.toString();
            result.push(`${JSON.stringify(code)}, ${JSON.stringify(key)}`);
        }
        fs.writeFileSync('./errors.json', '[\n' + result.join(',\n') + '\n]', 'utf-8');
    });

}).on('error', (err) => {
    console.log('Error: ' + err.message);
});