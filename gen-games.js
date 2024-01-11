const fs = require('fs');
const unzip = require('unzip-stream');

const zipsPath = './public/zips/';
const gamesPath = './public/games/';

if (fs.existsSync(gamesPath)) {
  fs.rmSync(gamesPath, { recursive: true });
  fs.mkdirSync(gamesPath);
} else {
  fs.mkdirSync(gamesPath);
}

fs.readdirSync(zipsPath).forEach((fileName) => {
  fs.createReadStream(`${zipsPath}${fileName}`).pipe(
    unzip.Extract({
      path: `${gamesPath}${fileName
        .toLowerCase()
        .replace(/ /g, '-')
        .replace('.zip', '')}`,
    })
  );
});
