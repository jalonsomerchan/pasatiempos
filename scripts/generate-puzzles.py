#!/usr/bin/env python3
"""Reproducible puzzle generation. Each emitted puzzle is checked for a unique solution."""
import json, random, sys, itertools
from pathlib import Path
rng=random.Random(815773)
ROOT=Path(__file__).resolve().parents[1]
def save(name,levels):
    levels.sort(key=lambda x:x['rating'])
    for i,x in enumerate(levels):x['id']=i+1
    (ROOT/'games'/name/'levels.json').write_text(json.dumps(levels,separators=(',',':')))
    print(name,len(levels),flush=True)

def tango_rows(n):
    return [tuple(p) for p in itertools.product((0,1),repeat=n) if sum(p)==n//2 and all(not(p[i]==p[i+1]==p[i+2]) for i in range(n-2))]
def tango_solutions(n,givens,limit=2):
    rows=tango_rows(n); candidates=[[p for p in rows if all(givens[r*n+c]<0 or p[c]==givens[r*n+c] for c in range(n))] for r in range(n)]; out=[]
    def dfs(chosen):
        if len(out)>=limit:return
        r=len(chosen)
        if r==n:
            cols=list(zip(*chosen))
            if len(set(cols))==n:out.append([x for row in chosen for x in row])
            return
        for row in candidates[r]:
            if row in chosen:continue
            if any(sum(x[c] for x in chosen)+row[c]>n//2 or sum(1-x[c] for x in chosen)+1-row[c]>n//2 or r>=2 and chosen[-1][c]==chosen[-2][c]==row[c] for c in range(n)):continue
            dfs(chosen+[row])
            if len(out)>=limit:return
    dfs([]);return out

def generate_tango():
    levels=[];seen=set()
    for n,count in [(6,100),(8,100),(10,100)]:
        rows=tango_rows(n)
        while sum(1 for x in levels if x['size']==n)<count:
            chosen=[]
            def fill():
                if len(chosen)==n:return len(set(zip(*chosen)))==n
                options=rows[:];rng.shuffle(options)
                for row in options:
                    if row in chosen:continue
                    if any(sum(x[c] for x in chosen)+row[c]>n//2 or sum(1-x[c] for x in chosen)+1-row[c]>n//2 or len(chosen)>=2 and chosen[-1][c]==chosen[-2][c]==row[c] for c in range(n)):continue
                    chosen.append(row)
                    if fill():return True
                    chosen.pop()
                return False
            if not fill():continue
            solution=[v for row in chosen for v in row];givens=solution[:];order=list(range(n*n));rng.shuffle(order)
            for i in order:
                old=givens[i];givens[i]=-1
                if len(tango_solutions(n,givens))!=1:givens[i]=old
            key=(n,tuple(givens))
            if key in seen:continue
            seen.add(key);missing=givens.count(-1);levels.append({'size':n,'givens':givens,'solution':solution,'rating':n*100+missing})
            if len(levels)%25==0:print('tango',len(levels),flush=True)
    save('tango',levels)

if __name__=='__main__' and sys.argv[1]=='tango':generate_tango()

def hash_graph(n):
    return [(r*n+c,(r+1)*n+c) for r in range(n-1) for c in range(n)]+[(r*n+c,r*n+c+1) for r in range(n) for c in range(n-1)]
def hash_solutions(n,clues,limit=2):
    edges=hash_graph(n);adj=[[] for _ in clues]
    for i,(a,b) in enumerate(edges):adj[a].append(i);adj[b].append(i)
    vals=[-1]*len(edges);rem=clues[:];left=[len(a) for a in adj];out=[]
    def dfs():
        if len(out)>=limit:return
        if all(v>=0 for v in vals):
            if any(rem):return
            seen={0};stack=[0]
            while stack:
                x=stack.pop()
                for k in adj[x]:
                    if vals[k]>0:
                        a,b=edges[k];y=b if a==x else a
                        if y not in seen:seen.add(y);stack.append(y)
            if len(seen)==len(clues):out.append(vals[:])
            return
        options=[]
        for k,(a,b) in enumerate(edges):
            if vals[k]>=0:continue
            lo=max(0,rem[a]-2*(left[a]-1),rem[b]-2*(left[b]-1));hi=min(2,rem[a],rem[b]);
            if lo>hi:return
            options.append((hi-lo,k,lo,hi))
        _,k,lo,hi=min(options);a,b=edges[k];left[a]-=1;left[b]-=1
        for value in range(lo,hi+1):
            vals[k]=value;rem[a]-=value;rem[b]-=value;dfs();rem[a]+=value;rem[b]+=value
            if len(out)>=limit:break
        vals[k]=-1;left[a]+=1;left[b]+=1
    dfs();return out

def generate_hashi():
    levels=[];seen=set()
    for n,count in [(3,100),(4,100),(5,100)]:
        edges=hash_graph(n);attempt=0
        while sum(x['grid']==n for x in levels)<count:
            attempt+=1;parent=list(range(n*n))
            def find(x):
                while parent[x]!=x:parent[x]=parent[parent[x]];x=parent[x]
                return x
            order=list(range(len(edges)));rng.shuffle(order);values=[0]*len(edges)
            for i in order:
                a,b=edges[i];x,y=find(a),find(b)
                if x!=y:parent[x]=y;values[i]=rng.choice([1,1,2])
                elif rng.random()<.18:values[i]=rng.choice([1,2])
            clues=[0]*(n*n)
            for v,(a,b) in zip(values,edges):clues[a]+=v;clues[b]+=v
            key=(n,tuple(clues))
            if key in seen:continue
            solutions=hash_solutions(n,clues)
            if len(solutions)!=1:continue
            seen.add(key);v=solutions[0];levels.append({'size':2*n-1,'grid':n,'clues':clues,'edges':edges,'solution':v,'rating':n*1000+sum(x>0 for x in v)})
            if len(levels)%25==0:print('hashi',len(levels),'attempts',attempt,flush=True)
    save('hashi',levels)

if __name__=='__main__' and sys.argv[1]=='hashi':generate_hashi()

def neighbors(i,n):
    r,c=divmod(i,n)
    return [x*n+y for x,y in ((r-1,c),(r+1,c),(r,c-1),(r,c+1)) if 0<=x<n and 0<=y<n]
def components(cells,n):
    remaining=set(cells);out=[]
    while remaining:
        start=remaining.pop();group={start};stack=[start]
        while stack:
            for j in neighbors(stack.pop(),n):
                if j in remaining:remaining.remove(j);group.add(j);stack.append(j)
        out.append(group)
    return out

def nuri_solutions(n,clues,limit=2):
    allclues=set(clues);candidates=[]
    for origin,num in clues.items():
        regions={frozenset([origin])}
        for _ in range(num-1):
            nextset=set()
            for region in regions:
                for i in region:
                    for j in neighbors(i,n):
                        if j not in region and j not in allclues:nextset.add(region|{j})
            regions=nextset
            if not regions:break
        possible=[]
        for region in regions:
            boundary={j for i in region for j in neighbors(i,n) if j not in region}
            if boundary & (allclues-{origin}):continue
            possible.append((region,boundary))
        if not possible:return []
        candidates.append(possible)
    candidates.sort(key=len);out=[]
    def dfs(k,land,blocked):
        if len(out)>=limit:return
        if k==len(candidates):
            sea=set(range(n*n))-land
            if not sea or len(components(sea,n))!=1:return
            for r in range(n-1):
                for c in range(n-1):
                    if all(x in sea for x in [r*n+c,r*n+c+1,(r+1)*n+c,(r+1)*n+c+1]):return
            out.append([0 if i in sea else 1 for i in range(n*n)]);return
        for region,boundary in candidates[k]:
            if region & blocked or boundary & land:continue
            dfs(k+1,land|region,blocked|region|boundary)
            if len(out)>=limit:return
    dfs(0,set(),set());return out

def generate_nurikabe():
    levels=[];seen=set()
    for n,count in [(5,100),(6,100),(7,100)]:
        attempt=0
        while sum(x['size']==n for x in levels)<count:
            attempt+=1;land={i for i in range(n*n) if rng.random()<.55};sea=set(range(n*n))-land
            if len(sea)<4 or len(components(sea,n))!=1:continue
            if any(all(x in sea for x in (r*n+c,r*n+c+1,(r+1)*n+c,(r+1)*n+c+1)) for r in range(n-1) for c in range(n-1)):continue
            islands=components(land,n)
            if len(islands)<3 or any(len(g)>5 for g in islands):continue
            clues={rng.choice(tuple(g)):len(g) for g in islands};key=(n,tuple(sorted(clues.items())))
            if key in seen:continue
            solutions=nuri_solutions(n,clues)
            if len(solutions)!=1:continue
            seen.add(key);levels.append({'size':n,'clues':[clues.get(i,0) for i in range(n*n)],'solution':solutions[0],'rating':n*1000+(n*n-len(clues))})
            if len(levels)%25==0:print('nurikabe',len(levels),'attempts',attempt,flush=True)
    save('nurikabe',levels)

if __name__=='__main__' and sys.argv[1]=='nurikabe':generate_nurikabe()
