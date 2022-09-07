const yaml = require('js-yaml');
const fs = require('fs');

function convert() {
  try {
    const json = yaml.load(fs.readFileSync('./data.yml', 'utf8'));
    fs.writeFileSync('./src/data.json', JSON.stringify(json));
  } catch (e) {
    console.log(e);
  }
}

convert();
