import { games } from './games.js';
const container = document.querySelector('#games');
for (const game of games) {
  const link = document.createElement('a');
  link.className = `game-card game-${game.id}`;
  link.href = game.path;
  const icon = document.createElement('span'); icon.className = 'game-icon'; icon.setAttribute('aria-hidden','true'); icon.textContent = game.symbol;
  const category = document.createElement('span'); category.className = 'eyebrow'; category.textContent = game.category;
  const title = document.createElement('h3'); title.textContent = game.name;
  const description = document.createElement('p'); description.textContent = game.description;
  const players = document.createElement('span'); players.className = 'players'; players.textContent = game.players;
  const action = document.createElement('span'); action.className = 'card-action'; action.textContent = 'Jugar';
  link.append(icon, category, title, description, players, action); container.append(link);
}
if ('serviceWorker' in navigator && (location.protocol === 'https:' || ['localhost','127.0.0.1'].includes(location.hostname))) navigator.serviceWorker.register('./sw.js').catch(console.warn);

const joinDialog = document.querySelector('#join-dialog');
const joinForm = document.querySelector('#join-form');
let lookupVersion = 0;
document.querySelector('#join-open').addEventListener('click', () => {
  joinStatus.textContent = '';
  joinDialog.showModal();
  roomCode.focus();
});
document.querySelector('#join-close').addEventListener('click', () => joinDialog.close());
joinDialog.addEventListener('close', () => { lookupVersion++; joinForm.querySelector('button[type=submit]').disabled = false; });
const roomCode = document.querySelector('#room-code');
const joinStatus = document.querySelector('#join-status');
joinForm.addEventListener('submit', async event => {
  event.preventDefault();
  const lookup = ++lookupVersion;
  const code = roomCode.value.trim().toUpperCase();
  const candidates = games.filter(game => game.roomChannel && game.roomChannel(code));
  if (!candidates.length) { joinStatus.textContent = 'El formato del código no corresponde a ningún juego disponible.'; return; }
  const button = joinForm.querySelector('button');
  button.disabled = true;
  joinStatus.textContent = 'Buscando la sala…';
  let sockets = [];
  try {
    const { connect } = await import('https://esm.sh/itty-sockets');
    const client = crypto.randomUUID();
    const matches = new Set();
    await new Promise((resolve, reject) => {
      let opened = 0;
      let closed = 0;
      const timeout = setTimeout(() => opened ? resolve() : reject(new Error('connection')), 6000);
      for (const game of candidates) {
        const socket = connect(game.roomChannel(code));
        sockets.push(socket);
        socket.on('open', () => { opened++; socket.send({type:'discover', from:client}); });
        socket.on('message', ({message}) => { if (message?.type === 'discovery' && message.to === client && message.game === game.id) matches.add(game); });
        socket.on('close', () => { closed++; if (closed === candidates.length && !opened) { clearTimeout(timeout); reject(new Error('connection')); } });
      }
    });
    if (lookup !== lookupVersion) return;
    if (matches.size === 1) {
      const game = [...matches][0];
      const url = new URL(game.path, location.href);
      url.searchParams.set('sala', code);
      location.assign(url.href);
    } else if (matches.size > 1) {
      joinStatus.textContent = 'Hay varias salas con ese código. Pide otro código al anfitrión.';
    } else {
      joinStatus.textContent = 'No encontramos ninguna sala con ese código. Compruébalo e inténtalo de nuevo.';
    }
  } catch (_) {
    if (lookup === lookupVersion) joinStatus.textContent = 'No se pudo conectar. Comprueba tu conexión y vuelve a intentarlo.';
  } finally {
    sockets.forEach(socket => socket.close());
    if (lookup === lookupVersion) button.disabled = false;
  }
});
