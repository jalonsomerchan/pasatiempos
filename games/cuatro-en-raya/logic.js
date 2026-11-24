export function fresh() {
  return {board: Array(42).fill(null), turn: 0, moves: 0, winner: null, line: []};
}

export function legalMoves(state) {
  return state.winner === null ? Array.from({length: 7}, (_, c) => c).filter(c => state.board[c] === null) : [];
}

export function play(state, column) {
  if (!Number.isInteger(column) || !legalMoves(state).includes(column)) return false;
  let row = 5;
  while (state.board[row * 7 + column] !== null) row--;
  const player = state.turn;
  state.board[row * 7 + column] = player;
  state.moves++;
  for (const [dr, dc] of [[0, 1], [1, 0], [1, 1], [1, -1]]) {
    const line = [row * 7 + column];
    for (const sign of [-1, 1]) {
      let r = row + sign * dr, c = column + sign * dc;
      while (r >= 0 && r < 6 && c >= 0 && c < 7 && state.board[r * 7 + c] === player) {
        line.push(r * 7 + c); r += sign * dr; c += sign * dc;
      }
    }
    if (line.length >= 4) { state.winner = player; state.line = line; return true; }
  }
  if (state.moves === 42) state.winner = 'draw';
  else state.turn = 1 - player;
  return true;
}
