// Opciones visibles y accesibles, compartidas por todos los juegos con IA.
export function difficultyOptions(includeImpossible = true) {
  const options = [
    ['tutorial', 'Tutorial', 'Aprende a tu ritmo'],
    ['facil', 'Fácil', 'Para empezar a jugar'],
    ['medio', 'Medio', 'Un reto equilibrado'],
    ['dificil', 'Difícil', 'Piensa cada jugada'],
    ...(includeImpossible ? [['imposible', 'Imposible', 'Tu rival más exigente']] : [])
  ];
  return `<fieldset class="difficulty-options"><legend>Elige tu nivel</legend><div class="difficulty-options-list">${options.map(([value, name, description]) => `<label class="difficulty-option"><input type="radio" name="difficulty" value="${value}" ${value === 'medio' ? 'checked' : ''}><span class="difficulty-option-copy"><strong>${name}</strong><small>${description}</small></span><span class="difficulty-option-mark" aria-hidden="true"></span></label>`).join('')}</div></fieldset>`;
}
