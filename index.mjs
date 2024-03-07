import fs from 'fs';
console.log('hello world');
const table = fs.readFileSync('./errors.txt', 'utf-8');


const lines = table.trim().split('\n');
const result = [];
const json = lines.map(line => {
    const [code, ...messageParts] = line.split(': ');
    const message = messageParts.join(': ');
    result.push(`${JSON.stringify(code.substring(2))}, ${JSON.stringify(message)}`);
});
fs.writeFileSync('./errors.json', '[\n' + result.join(',\n') + '\n]', 'utf-8');