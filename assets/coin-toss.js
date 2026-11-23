// The host chooses the starting player and sends it with the game state.
export const randomStarter=()=>crypto.getRandomValues(new Uint32Array(1))[0]%2;
let timer=null,interval=null,overlay=null,blockedApp=null;
export function cancelToss(){clearTimeout(timer);clearInterval(interval);overlay?.remove();overlay=null;if(blockedApp){blockedApp.inert=false;blockedApp=null;}}
export function showToss(starter,mine,done){
 cancelToss();
 overlay=document.createElement('div');overlay.className='suite-toss-overlay';overlay.innerHTML='<section class="suite-toss-card" role="status" aria-live="polite"><span class="suite-toss-label">CARA O CRUZ</span><h2>¿Quién empieza?</h2><div class="suite-toss-coin" aria-hidden="true"><span>✳</span><small>CARA</small></div><p>La suerte está echada…</p></section>';
 document.body.append(overlay);blockedApp=document.querySelector('#app');if(blockedApp)blockedApp.inert=true;const coin=overlay.querySelector('.suite-toss-coin'),title=overlay.querySelector('h2'),text=overlay.querySelector('p');
 function face(n){coin.classList.toggle('cross',n===1);coin.querySelector('span').textContent=n?'☾':'✳';coin.querySelector('small').textContent=n?'CRUZ':'CARA';}
 let n=0;face(0);if(!matchMedia('(prefers-reduced-motion: reduce)').matches)interval=setInterval(()=>face(n=1-n),120);
 timer=setTimeout(()=>{clearInterval(interval);face(starter);title.textContent=starter===mine?'¡Empiezas tú!':'Empieza tu rival';text.textContent=`Ha salido ${starter?'cruz':'cara'}.`;timer=setTimeout(()=>{cancelToss();done?.();},800);},matchMedia('(prefers-reduced-motion: reduce)').matches?100:1200);
}
