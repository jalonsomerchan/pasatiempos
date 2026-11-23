export const edgeKey = (type, row, col) => `${type}-${row}-${col}`;
export function fresh(size) { return {size, edges:{}, boxes:{}, turn:0, moves:0}; }
export function allEdges(size) {
  const edges=[];
  for(let r=0;r<=size;r++) for(let c=0;c<size;c++) edges.push(edgeKey('h',r,c));
  for(let r=0;r<size;r++) for(let c=0;c<=size;c++) edges.push(edgeKey('v',r,c));
  return edges;
}
export function sides(r,c) { return [edgeKey('h',r,c),edgeKey('h',r+1,c),edgeKey('v',r,c),edgeKey('v',r,c+1)]; }
export function play(state, edge) {
  if (!allEdges(state.size).includes(edge) || state.edges[edge] || Object.keys(state.boxes).length === state.size ** 2) return false;
  state.edges[edge]=state.turn + 1; state.moves++;
  let completed=0;
  for(let r=0;r<state.size;r++) for(let c=0;c<state.size;c++) {
    const key=`${r}-${c}`;
    if (!(key in state.boxes) && sides(r,c).every(side=>state.edges[side])) { state.boxes[key]=state.turn; completed++; }
  }
  if (!completed) state.turn=1-state.turn;
  return true;
}
export function scores(state) { return [0,1].map(p=>Object.values(state.boxes).filter(owner=>owner===p).length); }
export function chooseMove(state, difficulty, random=Math.random) {
  const available=allEdges(state.size).filter(edge=>!state.edges[edge]);
  if (!available.length) return null;
  const choices=available.map(edge=>{
    let completed=0, danger=0;
    for(let r=0;r<state.size;r++) for(let c=0;c<state.size;c++) {
      const box=sides(r,c); if (!box.includes(edge)) continue;
      const count=box.filter(side=>state.edges[side]).length;
      if(count===3) completed++; else if(count===2) danger++;
    }
    return {edge,completed,danger};
  });
  const pick=list=>list[Math.floor(random()*list.length)].edge;
  if(difficulty==='facil' && random()<0.55) return pick(choices);
  const scoring=choices.filter(x=>x.completed);
  if(scoring.length) { const max=Math.max(...scoring.map(x=>x.completed)); return pick(scoring.filter(x=>x.completed===max)); }
  const safe=choices.filter(x=>!x.danger);
  if(safe.length) {
    if(difficulty!=='imposible') return pick(safe);
    // Preserve options: prefer moves that leave the opponent fewer safe edges.
    const nextSafe = choice => {
      const copy=structuredClone(state); play(copy,choice.edge);
      return allEdges(copy.size).filter(edge=>!copy.edges[edge] && !Array.from({length:copy.size**2},(_,i)=>sides(Math.floor(i/copy.size),i%copy.size)).some(box=>box.includes(edge)&&box.filter(side=>copy.edges[side]).length===2)).length;
    };
    const ranked=safe.map(choice=>({...choice,cost:nextSafe(choice)}));
    const minimum=Math.min(...ranked.map(choice=>choice.cost));
    return pick(ranked.filter(choice=>choice.cost===minimum));
  }
  if(difficulty==='medio') return pick(choices);
  // Simulate the forced chain handed to the opponent; prefer the smallest sacrifice.
  const sacrifice = choice => {
    const copy=structuredClone(state); play(copy,choice.edge); let given=0;
    for (;;) {
      const captures=allEdges(copy.size).filter(e=>!copy.edges[e] && Array.from({length:copy.size**2},(_,i)=>sides(Math.floor(i/copy.size),i%copy.size)).some(box=>box.includes(e)&&box.filter(side=>copy.edges[side]).length===3));
      if(!captures.length) break;
      const before=Object.keys(copy.boxes).length; play(copy,captures[0]); given+=Object.keys(copy.boxes).length-before;
    }
    return given;
  };
  const scored=choices.map(x=>({...x,cost:sacrifice(x)})); const minimum=Math.min(...scored.map(x=>x.cost));
  return pick(scored.filter(x=>x.cost===minimum));
}
