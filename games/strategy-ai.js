// El motor recibe las funciones del juego para mantener sus reglas independientes.
export function chooseMove(state, engine, difficulty = 'medio', random = Math.random) {
  const candidates = position => {
    const legal = engine.legalMoves(position);
    if (!position.size || position.board.length <= 100 || position.moves === 0) return legal;
    const n = position.size;
    return legal.filter(i => {
      const row = Math.floor(i / n), col = i % n;
      for (let dr = -2; dr <= 2; dr++) for (let dc = -2; dc <= 2; dc++) {
        const r = row + dr, c = col + dc;
        if (r >= 0 && r < n && c >= 0 && c < n && position.board[r * n + c] !== null) return true;
      }
      return false;
    });
  };
  const moves = candidates(state);
  if (!moves.length) return null;
  const pick = choices => choices[Math.floor(random() * choices.length)];
  if (difficulty === 'facil' && random() < 0.55) return pick(moves);

  const player = state.turn;
  const largeBoard = state.size && state.board.length > 100;
  // Las amenazas del rival se calculan una vez; repetir la búsqueda completa
  // para cada casilla bloqueaba la interfaz en tableros grandes.
  const threats = new Set();
  if (largeBoard && state.moves) {
    const probe = structuredClone(state);
    probe.turn = 1 - player;
    for (const reply of candidates(probe)) {
      const after = structuredClone(probe);
      if (engine.play(after, reply) && after.winner === probe.turn) threats.add(reply);
    }
  }
  let best = -Infinity, choices = [];
  for (const move of moves) {
    const next = structuredClone(state);
    if (!engine.play(next, move)) continue;
    let score = next.winner === player ? 100000 : 0;
    if (largeBoard) {
      if (threats.has(move)) score += 20000;
      if (next.turn !== player && threats.size > (threats.has(move) ? 1 : 0)) score -= 50000;
      const n = state.size, r = Math.floor(move / n), c = move % n;
      for (const [dr, dc] of [[1,0],[0,1],[1,1],[1,-1]]) for (const sign of [-1,1]) {
        for (let k = 1; k <= 4; k++) {
          const y = r + sign * dr * k, x = c + sign * dc * k;
          if (y < 0 || y >= n || x < 0 || x >= n || state.board[y*n+x] !== player) break;
          score += 5 / k;
        }
      }
    } else if (next.winner === null && next.turn !== player) {
      // Bloquear una victoria inmediata importa más que cualquier ventaja posicional.
      for (const reply of candidates(next)) {
        const after = structuredClone(next);
        engine.play(after, reply);
        if (after.winner === next.turn) { score -= 50000; break; }
      }
    }
    if (state.board.length === 64 && engine.captures) {
      score += engine.captures(state, move).length;
      if ([0, 7, 56, 63].includes(move)) score += 30;
      if ([1, 6, 8, 9, 14, 15, 48, 49, 54, 55, 57, 62].includes(move)) score -= 8;
    } else {
      const width = state.size || 7;
      const column = state.board.length === 42 ? move : move % width;
      score += width / 2 - Math.abs(column - (width - 1) / 2);
    }
    score += random() * (difficulty === 'medio' ? 2 : 0.01);
    if (score > best) { best = score; choices = [move]; }
    else if (score === best) choices.push(move);
  }
  return choices.length ? pick(choices) : null;
}
