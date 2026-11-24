const directions = [-1, 0, 1].flatMap(r => [-1, 0, 1].map(c => [r, c])).filter(([r, c]) => r || c);
const inside = (r, c) => r >= 0 && r < 8 && c >= 0 && c < 8;

export function fresh() {
  const board = Array(64).fill(null);
  board[27] = board[36] = 1;
  board[28] = board[35] = 0;
  return {board, turn: 0, moves: 0, winner: null, passed: null};
}

export function captures(state, index, player = state.turn) {
  if (!Number.isInteger(index) || index < 0 || index >= 64 || state.board[index] !== null) return [];
  const row = Math.floor(index / 8), col = index % 8, result = [];
  for (const [dr, dc] of directions) {
    let r = row + dr, c = col + dc;
    const line = [];
    while (inside(r, c) && state.board[r * 8 + c] === 1 - player) {
      line.push(r * 8 + c); r += dr; c += dc;
    }
    if (line.length && inside(r, c) && state.board[r * 8 + c] === player) result.push(...line);
  }
  return result;
}

export function legalMoves(state, player = state.turn) {
  return state.board.flatMap((_, i) => captures(state, i, player).length ? [i] : []);
}

export function play(state, index) {
  if (state.winner !== null) return false;
  const flipped = captures(state, index);
  if (!flipped.length) return false;
  const player = state.turn;
  state.board[index] = player;
  for (const i of flipped) state.board[i] = player;
  state.moves++;
  state.passed = null;
  if (legalMoves(state, 1 - player).length) state.turn = 1 - player;
  else if (legalMoves(state, player).length) state.passed = 1 - player;
  else {
    const counts = [0, 0];
    for (const piece of state.board) if (piece !== null) counts[piece]++;
    state.winner = counts[0] === counts[1] ? 'draw' : counts[0] > counts[1] ? 0 : 1;
  }
  return true;
}
