// La apertura consta de una ficha; después se colocan dos por turno.
export function fresh(size = 19) {
  return {size, board: Array(size * size).fill(null), turn: 0, moves: 0, remaining: 1, winner: null, line: []};
}

export function legalMoves(state) {
  if (state.winner !== null) return [];
  return state.board.flatMap((piece, index) => piece === null ? [index] : []);
}

export function play(state, index) {
  if (state.winner !== null || !Number.isInteger(index) || index < 0 || index >= state.board.length || state.board[index] !== null) return false;
  const player = state.turn, n = state.size, row = Math.floor(index / n), col = index % n;
  state.board[index] = player;
  state.moves++;
  for (const [dr, dc] of [[0, 1], [1, 0], [1, 1], [1, -1]]) {
    const line = [index];
    for (const sign of [-1, 1]) {
      let r = row + sign * dr, c = col + sign * dc;
      while (r >= 0 && r < n && c >= 0 && c < n && state.board[r * n + c] === player) {
        line.push(r * n + c); r += sign * dr; c += sign * dc;
      }
    }
    if (line.length >= 6) { state.winner = player; state.line = line; return true; }
  }
  if (state.moves === state.board.length) state.winner = 'draw';
  else if (--state.remaining === 0) { state.turn = 1 - player; state.remaining = 2; }
  return true;
}
