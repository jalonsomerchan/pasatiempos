import {legal} from './logic.js';

// La selección es visual y solo se confirma al elegir una casilla de destino.
export function renderBoard(state, player, enabled, selected = null, target = null) {
  const options = enabled ? legal(state) : [];
  const destinations = new Set(options.filter(move => state.phase !== 'move' || move.from === selected).map(move => move.to));
  const sources = new Set(state.phase === 'move' ? options.map(move => move.from) : []);
  return `<div class="santorini-board" role="group" aria-label="Tablero de Santorini">${state.heights.map((height, i) => {
    const owner = state.workers.findIndex(group => group.includes(i));
    const actionable = sources.has(i) || destinations.has(i);
    const label = `Fila ${Math.floor(i / 5) + 1}, columna ${i % 5 + 1}, ${height === 4 ? 'cúpula' : `nivel ${height}`}${owner < 0 ? '' : owner === player ? ', tu constructor' : ', constructor rival'}`;
    return `<button type="button" class="santorini-cell level-${height} ${selected === i ? 'selected' : ''} ${destinations.has(i) ? 'destination' : ''} ${target === i ? 'guide-target' : ''}" data-santorini-cell="${i}" aria-label="${label}" ${actionable ? '' : 'disabled'}><span class="tower" aria-hidden="true">${height === 4 ? '◒' : height || ''}</span>${owner < 0 ? '' : `<span class="worker worker-${owner} ${state.last?.to===i&&state.last?.phase==='move'?'new-game-arrival':''}" aria-hidden="true">${owner === player ? '●' : '◆'}</span>`}</button>`;
  }).join('')}</div>`;
}
