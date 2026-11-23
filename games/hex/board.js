// Pointy hexagons on an axial grid: the six shared edges match the rules engine.
export function renderHexBoard(game, mine, allowed) {
  const n=game.size, radius=20, halfWidth=Math.sqrt(3)*radius/2, dx=2*halfWidth, dy=1.5*radius, margin=35;
  const center=(r,c)=>[margin+halfWidth+dx*(c+r/2),margin+radius+dy*r];
  const width=2*margin+2*halfWidth+dx*(n-1)*1.5, height=2*margin+2*radius+dy*(n-1);
  const [tlx,tly]=center(0,0),[trx,try_]=center(0,n-1),[blx,bly]=center(n-1,0),[brx,bry]=center(n-1,n-1);
  const horizontal=mine===0?'mine':'rival',vertical=mine===1?'mine':'rival';
  const rails=`<path class="hex-rail hex-rail-${horizontal}" d="M ${tlx-halfWidth-8} ${tly} L ${blx-halfWidth-8} ${bly} M ${trx+halfWidth+8} ${try_} L ${brx+halfWidth+8} ${bry}"/><path class="hex-rail hex-rail-${vertical}" d="M ${tlx} ${tly-radius-9} L ${trx} ${try_-radius-9} M ${blx} ${bly+radius+9} L ${brx} ${bry+radius+9}"/>`;
  const cells=game.cells.map((owner,index)=>{
    const row=Math.floor(index/n),col=index%n,[x,y]=center(row,col);
    const points=Array.from({length:6},(_,i)=>{const angle=(-90+i*60)*Math.PI/180;return `${(x+radius*.96*Math.cos(angle)).toFixed(2)},${(y+radius*.96*Math.sin(angle)).toFixed(2)}`;}).join(' ');
    const who=owner?(owner-1===mine?'mine':'rival'):'empty';
    const interactive=allowed&&!owner;
    const label=`Fila ${row+1}, columna ${col+1}${owner?(who==='mine'?', tu ficha':', ficha rival'):', vacía'}`;
    return `<g class="hex-tile hex-tile-${who} ${game.last.includes(index)?'hex-tile-last':''}" ${interactive?`role="button" tabindex="0" data-index="${index}" aria-label="Colocar ficha en ${label.toLowerCase()}"`:`role="img" aria-label="${label}"`}><polygon points="${points}"/>${owner?`<circle class="hex-stone" cx="${x}" cy="${y}" r="6"/>`:''}</g>`;
  }).join('');
  return `<div class="hex-board-frame"><div class="hex-board-heading"><div><span class="hex-overline">EL TABLERO</span><h2>Conecta tus lados<span>.</span></h2></div><span class="hex-board-size">${n} × ${n}</span></div><svg class="hex-board-svg" viewBox="0 0 ${width} ${height}" role="group" aria-label="Tablero de Hex, ${n} por ${n} casillas">${rails}${cells}</svg><div class="hex-legend"><span><i class="hex-legend-dot mine"></i>Tú · ${mine===0?'izquierda a derecha':'arriba a abajo'}</span><span><i class="hex-legend-dot rival"></i>Rival · ${mine===0?'arriba a abajo':'izquierda a derecha'}</span></div></div>`;
}
