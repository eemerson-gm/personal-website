const fs = require('fs');
const glob = require('glob');

const template = fs.readFileSync('./template.html').toString();
const gamesPath = './public/games/';
let gameList = [];

const files = glob
  .globSync(`${gamesPath}**/*`, { dotRelative: true })
  .filter((filePath) => filePath.includes('index.html'));

for (const index in files) {
  const filePath = files[index];
  const fileText = fs.readFileSync(filePath).toString();
  const gameJS = /src="(.*)"/.exec(fileText)[1];
  const gameName = /games\\(.*)\\index.html/
    .exec(filePath)[1]
    .replace(/-/g, ' ');
  const gameTitle = gameName.replace(/\b\w/g, (l) => l.toUpperCase());
  const gameLink = filePath
    .replace('.', '')
    .replace(/\\/g, '/')
    .replace('/public', '')
    .replace('index.html', '');
  console.log(gameLink);
  fs.writeFileSync(
    filePath,
    template.replace('$JAVASCRIPT$', gameJS).replace('$TITLE$', gameTitle)
  );
  gameList.push({
    name: gameTitle,
    link: gameLink,
  });
}

fs.writeFileSync(
  './src/Games.ts',
  `export const Games = ${JSON.stringify(gameList)}`
);
