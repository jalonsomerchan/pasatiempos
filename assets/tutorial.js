const definitions = {
  quoridor: {
    name: 'Quoridor',
    steps: [
      {title:'Tu objetivo', text:'Lleva tu ficha verde a cualquier casilla del borde opuesto antes que tu rival. Los colores identifican a cada jugador.', board:['META','META','META','·','·','·','·','●','·']},
      {title:'Mover la ficha', text:'Toca una casilla vecina libre. Puedes avanzar una casilla en horizontal o vertical, pero no atravesar muros. Prueba a tocar la casilla marcada.', board:['·','·','·','·','○','·','·','●','·'], target:4, after:'●'},
      {title:'Confirmar el movimiento', text:'En móviles, después de elegir una casilla, pulsa Confirmar. Puedes cancelar si cambias de idea antes de confirmar.', board:['·','·','·','·','●','·','·','·','·'], button:'Confirmar', after:'Confirmado'},
      {title:'Colocar un muro', text:'En lugar de mover puedes colocar uno de tus diez muros para dificultar el camino rival. Toca el cruce señalado para preparar un muro.', board:['·','·','·','·','＋','·','·','·','·'], target:4, after:'━'},
      {title:'Girar y cancelar', text:'Toca de nuevo el mismo cruce para girar el muro; una tercera vez lo cancela. No gastas el turno hasta confirmarlo. Prueba a girarlo.', board:['·','·','·','·','━','·','·','·','·'], target:4, after:'┃'},
      {title:'Muros válidos', text:'Un muro ocupa dos espacios. No puede cruzar ni solaparse con otro, ni dejar a ningún jugador sin camino hacia su meta.'},
      {title:'Saltar al rival', text:'Si las fichas están juntas, puedes saltar por encima del rival. Si hay un muro detrás de él, puedes saltar en diagonal.'},
      {title:'A jugar', text:'Alterna movimientos y muros. El primero en alcanzar el borde opuesto gana. Desde la portada puedes elegir Tutorial para practicar en una partida guiada.'}
    ]
  },
  hamdoku:{name:'Hamdoku',steps:[
    {title:'El objetivo',text:'Coloca un hámster en cada fila, cada columna y cada región de color. Los hámsteres no pueden tocarse, tampoco en diagonal.',board:['🟩','🟩','🟨','🟩','🟨','🟨','🟦','🟦','🟨']},
    {title:'Colocar un hámster',text:'Toca una casilla vacía para colocar un hámster. Prueba en la casilla señalada.',board:['·','·','·','·','○','·','·','·','·'],target:4,after:'🐹'},
    {title:'Marcar una casilla',text:'Toca de nuevo una casilla ocupada para cambiar el hámster por una cruz. La cruz te ayuda a recordar que ahí no quieres colocar uno.',board:['·','·','·','·','🐹','·','·','·','·'],target:4,after:'×'},
    {title:'Vaciar una casilla',text:'Una tercera pulsación quita la cruz y deja la casilla vacía. Prueba a tocarla.',board:['·','·','·','·','×','·','·','·','·'],target:4,after:'·'},
    {title:'Filas, columnas y regiones',text:'En cada fila, columna y región debe haber exactamente un hámster, aunque la región tenga una forma irregular.'},
    {title:'No pueden tocarse',text:'Dos hámsteres no pueden ocupar casillas vecinas, ni siquiera en diagonal. Algunos niveles tienen hámsteres fijos que no se pueden mover.'},
    {title:'Pistas y ajustes',text:'Cada nivel dispone de tres pistas. También puedes reiniciar y activar el contraste o la ayuda para posiciones inválidas desde Ajustes.'},
    {title:'A jugar',text:'Completa un nivel para desbloquear el siguiente. El progreso se guarda en este navegador.'}
  ]},
  slitherlink:{name:'Slitherlink',steps:[
    {title:'El objetivo',text:'Dibuja un único bucle cerrado siguiendo los números. No puede haber ramificaciones, cruces ni líneas sueltas.',board:['•','—','•','|','2','|','•','—','•']},
    {title:'Dibujar una línea',text:'Toca el espacio entre dos puntos para dibujar un lado. Prueba en el lado señalado.',board:['•','○','•','·','2','·','•','·','•'],target:1,after:'━'},
    {title:'Marcar con una cruz',text:'Toca una línea por segunda vez para marcar con una cruz que no pertenece al bucle.',board:['•','━','•','·','2','·','•','·','•'],target:1,after:'×'},
    {title:'Borrar una marca',text:'Un tercer toque quita la cruz y deja el lado vacío.',board:['•','×','•','·','2','·','•','·','•'],target:1,after:'·'},
    {title:'Sigue los números',text:'Cada número indica cuántos de los cuatro lados de su casilla forman parte del bucle. Las casillas vacías no exigen una cantidad concreta.'},
    {title:'Un solo camino',text:'Cada punto del recorrido tiene exactamente dos líneas. Todas deben formar un único bucle cerrado: no valen varios círculos ni extremos sueltos.'},
    {title:'Pistas y tablero',text:'Tienes hasta tres pistas por nivel. Puedes reiniciar; pellizca para ampliar y arrastra para moverte por los tableros grandes.'},
    {title:'A jugar',text:'El primer nivel incluye además una práctica guiada sobre el tablero real. Resuelve niveles para desbloquear los siguientes.'}
  ]},
  'dots-boxes':{name:'Dots and Boxes',steps:[
    {title:'El objetivo',text:'Completa más casillas que tu rival. Cada jugador dibuja líneas de su color entre puntos adyacentes.',board:['•','━','•','┃','T','┃','•','━','•']},
    {title:'Dibuja una línea',text:'En tu turno, toca un espacio entre dos puntos para trazar una línea. Prueba en el lugar señalado.',board:['•','○','•','·','·','·','•','·','•'],target:1,after:'━'},
    {title:'Turnos',text:'Si tu línea no completa una casilla, juega el rival. Tus líneas son verdes y las del rival, coral.'},
    {title:'Cierra una casilla',text:'Al dibujar el cuarto lado de una casilla, ganas un punto. Toca el lado que falta.',board:['•','━','•','┃','·','┃','•','○','•'],target:7,after:'━'},
    {title:'Juega otra vez',text:'Cada vez que completas una o más casillas conservas el turno. Una sola línea puede cerrar dos casillas a la vez.'},
    {title:'El marcador',text:'Las casillas cerradas muestran a quién pertenecen y suman puntos en el marcador. Evita dejar tres lados a tu rival.'},
    {title:'A jugar',text:'Cuando todas las casillas estén cerradas, gana quien tenga más. Puede haber empate. Antes de empezar puedes elegir el tamaño del tablero.'}
  ]},
  tak:{name:'Tak',steps:[
    {title:'El objetivo',text:'Conecta dos bordes opuestos mediante un camino de tus piedras planas o coronadas. No es necesario que el camino sea recto.'},
    {title:'La apertura',text:'En las dos primeras jugadas, cada jugador coloca una piedra plana del color contrario en una casilla vacía.'},
    {title:'Coloca una piedra',text:'Después puedes colocar una piedra plana, un muro o tu piedra coronada en una casilla vacía.',board:['·','·','·','·','○','·','·','·','·'],target:4,after:'●'},
    {title:'Mueve una pila',text:'Puedes mover una o más piedras de una pila que controles en línea recta, dejando al menos una en cada casilla recorrida. El límite de piedras transportadas es el ancho del tablero.'},
    {title:'Muros y coronada',text:'Los muros no forman camino y no pueden cubrirse. Una coronada forma camino y puede aplanar un muro si es la única pieza depositada en la última casilla.'},
    {title:'Final de partida',text:'Gana quien complete un camino. Si el tablero se llena o un jugador agota su reserva sin camino, gana quien tenga más piedras planas visibles; puede haber empate.'}
  ]},
  flota:{name:'Hundir la flota',steps:[
    {title:'El objetivo',text:'Hunde los cinco barcos rivales antes de que hundan los tuyos.'},
    {title:'Prepara tu flota',text:'Coloca tus barcos en tu tablero sin superponerlos. Puedes cambiar la orientación, deshacer o generar una disposición aleatoria.'},
    {title:'Confirma la flota',text:'Cuando tengas los cinco barcos, confirma y espera a que el rival prepare los suyos.'},
    {title:'Dispara',text:'En tu turno toca una casilla del tablero rival. La respuesta indicará agua, tocado o hundido.',board:['·','·','·','·','○','·','·','·','·'],target:4,after:'×'},
    {title:'Victoria',text:'Cada jugador dispara una vez por turno. Gana quien hunda todos los barcos del rival.'}
  ]},
  blokus:{name:'Blokus',steps:[
    {title:'El objetivo',text:'Coloca más casillas que tu rival. Cada jugador dispone de 21 piezas de diferentes formas.'},
    {title:'Tu primera pieza',text:'Elige una pieza de tu colección y colócala cubriendo tu marca inicial. Puedes girarla o reflejarla.'},
    {title:'Crece por las esquinas',text:'Cada pieza nueva debe tocar al menos una esquina de una pieza de tu color. Nunca puede tocar sus lados.'},
    {title:'Girar y reflejar',text:'Usa los controles para cambiar la orientación y toca una posición marcada para colocar la pieza.',board:['·','○','·','·','·','·','·','·','·'],target:1,after:'■'},
    {title:'Final de partida',text:'Si no puedes colocar ninguna pieza, pasa. Cuando ninguno puede jugar, gana quien tenga más casillas colocadas.'}
  ]},
  quarto:{name:'Quarto',steps:[
    {title:'El objetivo',text:'Alinea cuatro piezas que compartan al menos un rasgo: color, altura, forma o si están huecas.'},
    {title:'Elige para tu rival',text:'En cada turno escoges una pieza disponible que tu rival tendrá que colocar. No eliges la pieza que colocas tú.',board:['·','·','·','·','○','·','·','·','·'],target:4,after:'●'},
    {title:'Coloca la pieza',text:'Cuando el rival te entregue una pieza, colócala en una casilla vacía. Luego elige otra para él.'},
    {title:'Cuatro en línea',text:'Ganas al alinear cuatro piezas en horizontal, vertical o diagonal si comparten un rasgo. Si se llena el tablero sin línea ganadora, hay empate.'}
  ]},
  colores:{name:'Guerra de colores',steps:[
    {title:'El objetivo',text:'Conquista más casillas que tu rival. Cada jugador empieza en una esquina opuesta del tablero.'},
    {title:'Elige un color',text:'En tu turno elige un color distinto al de tu territorio y al de tu rival.',board:['🟩','🟩','🟨','🟩','○','🟨','🟦','🟦','🟨'],target:4,after:'🟨'},
    {title:'Expansión',text:'Tu territorio cambia al color elegido y captura todas las casillas libres conectadas de ese color, también en cadena. Solo se conectan horizontal o verticalmente.'},
    {title:'El resultado',text:'Las casillas conquistadas no pueden arrebatarse. Cuando no quedan casillas libres, gana quien tenga más; si tienen las mismas, hay empate.'}
  ]},
  isolation:{name:'Isolation',steps:[
    {title:'El objetivo',text:'Deja a tu rival sin ninguna casilla a la que moverse.'},
    {title:'Mueve tu ficha',text:'Toca una casilla vecina libre: puedes mover en horizontal, vertical o diagonal.',board:['·','○','·','·','●','·','·','·','·'],target:1,after:'●'},
    {title:'Elimina una casilla',text:'Después de mover, retira cualquier casilla libre. Ya nadie podrá pasar por ella.',board:['·','●','·','·','○','·','·','·','·'],target:4,after:'×'},
    {title:'Gana la partida',text:'Alterna movimiento y retirada. Si tu rival no puede moverse al comenzar su turno, ganas.'}
  ]},
  domineering:{name:'Domineering',steps:[
    {title:'El objetivo',text:'Cada jugador coloca dominós de dos casillas. Pierde quien no tenga una colocación legal.'},
    {title:'Tu orientación',text:'Un jugador coloca todas sus fichas en vertical y el otro en horizontal. Toca una casilla inicial para colocar la ficha.',board:['○','·','·','·','·','·','·','·','·'],target:0,after:'▰'},
    {title:'El espacio',text:'Las dos casillas deben estar libres, ser adyacentes y estar dentro del tablero. Las fichas no se mueven una vez colocadas.'},
    {title:'A jugar',text:'Intenta reservar posiciones para tus dominós y reducir las opciones del rival.'}
  ]},
  hex:{name:'Hex',steps:[
    {title:'El objetivo',text:'Conecta tus dos bordes opuestos con una cadena continua antes que el rival. Tus lados se indican bajo el tablero.'},
    {title:'Coloca una ficha',text:'Toca una casilla libre para colocar tu ficha. Las seis casillas que comparten un lado son vecinas.',board:['·','·','·','·','○','·','·','·','·'],target:4,after:'●'},
    {title:'Construye tu camino',text:'Tus fichas no necesitan estar juntas al colocarlas: puedes unir grupos más adelante. Tus fichas se muestran en verde y las rivales en coral.'},
    {title:'La victoria',text:'El primero en unir sus bordes gana. Una partida de Hex no puede terminar en empate.'}
  ]},
  sos:{name:'SOS',steps:[
    {title:'El objetivo',text:'Forma más secuencias SOS que el rival, en horizontal, vertical o diagonal.'},
    {title:'Elige una letra',text:'Toca una casilla libre una vez para elegir S.',board:['·','○','·','·','·','·','·','·','·'],target:1,after:'S'},
    {title:'Cambia o borra',text:'Toca de nuevo la misma casilla para cambiar S por O. Un tercer toque la deja vacía.',board:['·','S','·','·','·','·','·','·','·'],target:1,after:'O'},
    {title:'Confirma la jugada',text:'Pulsa Confirmar bajo la casilla para colocar definitivamente la letra y terminar la jugada.',button:'Confirmar O',after:'Confirmado'},
    {title:'Puntos y turno extra',text:'Cada SOS completo suma un punto. Si formas uno o varios con una jugada, vuelves a jugar; si no, pasa el turno.'},
    {title:'El resultado',text:'Cuando se llena el tablero gana quien haya formado más secuencias. Si las puntuaciones son iguales hay empate.'}
  ]},
  nim:{name:'Nim',steps:[
    {title:'El objetivo',text:'Retira la última ficha del tablero. Hay cuatro filas de una, tres, cinco y siete fichas.'},
    {title:'Quita fichas',text:'En tu turno elige una fila y retira una o más fichas solo de esa fila. Toca una ficha para elegir cuántas retirar y pulsa Retirar fichas para confirmar.',board:['·','·','·','·','3','·','·','○','·'],target:7,after:'2'},
    {title:'Última ficha',text:'Después juega el rival. Gana quien retire la última ficha; puedes quitar una fila completa si lo deseas.'}
  ]},
  gomoku:{name:'Gomoku',steps:[
    {title:'El objetivo',text:'Alinea cinco o más fichas de tu color antes que tu rival. La línea puede ser horizontal, vertical o diagonal.',board:['●','·','○','·','●','·','○','·','●']},
    {title:'Coloca una ficha',text:'En tu turno toca una intersección libre del tablero para colocar una ficha. Prueba en la intersección señalada.',board:['·','·','·','·','○','·','·','·','·'],target:4,after:'●'},
    {title:'Los turnos',text:'Las fichas oscuras empiezan y después se alternan los turnos. Una ficha colocada no se mueve ni se retira.'},
    {title:'Cinco en línea',text:'Forma una línea continua de cinco o más fichas en horizontal, vertical o diagonal. La partida termina al completar la línea.'},
    {title:'Bloquea al rival',text:'Observa las líneas de tu rival y coloca una ficha para impedir que complete cinco. Una jugada también puede crear varias amenazas a la vez.'},
    {title:'A jugar',text:'Si el tablero se llena sin que nadie consiga cinco, la partida termina en empate. Puedes jugar contra el ordenador o crear una sala.'}
  ]},
  'bridg-it':{name:'Bridg-It',steps:[
    {title:'El objetivo',text:'Conecta tus dos lados verdes con una cadena continua antes de que tu rival conecte los suyos.',board:['·','🔴','·','🟢','·','🟢','·','🔴','·']},
    {title:'Tus lados',text:'Las líneas verdes de los bordes ya conectan entre sí los puntos de ese lado. El texto bajo el tablero indica qué lados debes unir.'},
    {title:'Tiende un puente',text:'En tu turno, toca un círculo claro entre dos puntos verdes para unirlos. Prueba en el círculo señalado.',board:['·','🔴','·','🟢','○','🟢','·','🔴','·'],target:4,after:'━'},
    {title:'Bloquea al rival',text:'Un puente no puede cruzar otro. Al ocupar un cruce también impides que el rival coloque ahí su puente perpendicular.'},
    {title:'Construye tu camino',text:'Une puntos vecinos en horizontal o vertical. Tus puentes no necesitan estar conectados al principio: puedes unir grupos más adelante.'},
    {title:'Turnos y victoria',text:'Después de cada puente juega el rival. Gana quien conecte primero sus dos bordes; en Bridg-It no hay empate.'},
    {title:'A jugar',text:'Sigue tu color en el marcador y combina avanzar con bloquear. En salas, cada jugador ve su propio camino en verde.'}
  ]}
};

const gameId=document.body.dataset.tutorialGame;
const definition=definitions[gameId];
if(definition){
 let current=0, completed=false, previousFocus=null;
 const dialog=document.createElement('dialog');dialog.className='suite-tutorial';dialog.setAttribute('aria-labelledby','suite-tutorial-title');document.body.append(dialog);
 function draw(){const step=definition.steps[current], last=current===definition.steps.length-1;const board=step.board?`<div class="suite-tutorial-board" aria-label="Ejemplo de ${definition.name}">${step.board.map((cell,i)=>i===step.target?`<button class="suite-tutorial-cell suite-tutorial-target" data-practice="${i}" aria-label="Practicar: casilla señalada">${completed?step.after:cell}</button>`:`<span class="suite-tutorial-cell">${cell}</span>`).join('')}</div>`:'';
 dialog.innerHTML=`<div class="suite-tutorial-top"><span>APRENDE A JUGAR · ${current+1} / ${definition.steps.length}</span><button class="suite-tutorial-close" aria-label="Cerrar tutorial">×</button></div>${board}<div class="suite-tutorial-guide ${step.target!==undefined?'has-target':''}" role="status" aria-live="polite"><h2 id="suite-tutorial-title">${step.title}</h2><p>${step.text}</p>${step.button?`<button class="suite-tutorial-practice" data-practice="button">${completed?step.after:step.button}</button>`:''}${(step.target!==undefined||step.button)&&!completed?'<small>Practica en el elemento señalado para continuar.</small>':''}<div class="suite-tutorial-actions">${current?'<button class="suite-tutorial-back">Anterior</button>':''}<button class="suite-tutorial-next" ${(step.target!==undefined||step.button)&&!completed?'disabled':''}>${last?'¡A jugar!':'Siguiente'}</button></div></div>`;
 dialog.querySelector('.suite-tutorial-close').onclick=()=>dialog.close();const back=dialog.querySelector('.suite-tutorial-back');if(back)back.onclick=()=>{current--;completed=false;draw();};dialog.querySelector('.suite-tutorial-next').onclick=()=>{if(last){dialog.close();return;}current++;completed=false;draw();};const practice=dialog.querySelector('[data-practice]');if(practice)practice.onclick=()=>{completed=true;draw();dialog.querySelector('.suite-tutorial-next').focus();};}
 document.addEventListener('click',e=>{const button=e.target.closest('[data-suite-tutorial]');if(!button)return;previousFocus=button;current=0;completed=false;draw();dialog.showModal();});dialog.addEventListener('close',()=>previousFocus?.focus());
}
