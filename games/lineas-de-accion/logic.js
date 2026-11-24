// Lines of Action: las fichas se conectan en ocho direcciones.
const directions = [[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,-1],[1,0],[1,1]];
const inside = (r,c) => r>=0 && r<8 && c>=0 && c<8;
export function fresh(){
 const board=Array(64).fill(null);
 for(let i=1;i<7;i++){board[i]=board[56+i]=0;board[i*8]=board[i*8+7]=1;}
 return {board,turn:0,moves:0,winner:null,last:null,history:[]};
}
function key(s){return `${s.turn}:${s.board.map(v=>v===null?'.':v).join('')}`}
export function connected(board,player){
 const pieces=board.flatMap((v,i)=>v===player?[i]:[]);if(!pieces.length)return false;
 const seen=new Set([pieces[0]]),queue=[pieces[0]];
 for(let n=0;n<queue.length;n++){const at=queue[n],r=Math.floor(at/8),c=at%8;for(const [dr,dc] of directions){const x=r+dr,y=c+dc,i=x*8+y;if(inside(x,y)&&board[i]===player&&!seen.has(i)){seen.add(i);queue.push(i)}}}
 return seen.size===pieces.length;
}
export function legalMoves(s){
 if(s.winner!==null)return [];
 const out=[];
 for(let from=0;from<64;from++){
  if(s.board[from]!==s.turn)continue;
  const r=Math.floor(from/8),c=from%8;
  for(const [dr,dc] of directions){
   let count=0;
   for(let k=-7;k<=7;k++){const x=r+k*dr,y=c+k*dc;if(inside(x,y)&&s.board[x*8+y]!==null)count++}
   const x=r+dr*count,y=c+dc*count;if(!inside(x,y)||s.board[x*8+y]===s.turn)continue;
   let blocked=false;for(let k=1;k<count;k++){const v=s.board[(r+dr*k)*8+c+dc*k];if(v!==null&&v!==s.turn){blocked=true;break}}
   if(!blocked)out.push({from,to:x*8+y});
  }
 }
 return out;
}
export function play(s,move){
 if(!move||!legalMoves(s).some(m=>m.from===move.from&&m.to===move.to))return false;
 const p=s.turn;s.board[move.to]=p;s.board[move.from]=null;s.moves++;s.last={from:move.from,to:move.to};
 // Cuando ambos grupos quedan conectados a la vez, gana quien ha movido.
 if(connected(s.board,p))s.winner=p;else if(connected(s.board,1-p))s.winner=1-p;
 else {s.turn=1-p;const position=key(s);s.history.push(position);if(s.history.filter(x=>x===position).length>=3)s.winner='draw';else if(!legalMoves(s).length){s.turn=p;if(!legalMoves(s).length)s.winner='draw';}}
 return true;
}
export function chooseMove(state,difficulty='medio',random=Math.random){
 const moves=legalMoves(state);if(!moves.length)return null;
 const pick=list=>list[Math.floor(random()*list.length)];
 if(difficulty==='facil'&&random()<0.55)return pick(moves);
 const p=state.turn;let best=-Infinity,choices=[];
 for(const move of moves){
  const next=structuredClone(state),capture=next.board[move.to]!==null;play(next,move);
  let score=next.winner===p?100000:next.winner===1-p?-100000:0;
  if(capture)score+=5;
  const own=next.board.flatMap((v,i)=>v===p?[i]:[]);
  for(const i of own)for(const [dr,dc] of directions){const r=Math.floor(i/8)+dr,c=i%8+dc;if(inside(r,c)&&next.board[r*8+c]===p)score+=1;}
  score+=random()*(difficulty==='medio'?3:.01);
  if(score>best){best=score;choices=[move]}else if(score===best)choices.push(move);
 }
 return pick(choices);
}
