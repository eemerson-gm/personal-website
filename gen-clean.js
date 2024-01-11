const fs = require('fs');
const gamesPath = './public/games/';

if (fs.existsSync(gamesPath)) {
  fs.writeFileSync('./src/Games.ts', `export const Games = [];`);
  fs.rmSync(gamesPath, { recursive: true, force: true });
}
