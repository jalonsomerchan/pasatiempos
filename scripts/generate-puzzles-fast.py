#!/usr/bin/env python3
"""Generate verified levels with bounded, reproducible construction."""
import importlib.util, random
from pathlib import Path
spec=importlib.util.spec_from_file_location('puzzles',Path(__file__).with_name('generate-puzzles.py'))
p=importlib.util.module_from_spec(spec);spec.loader.exec_module(p)
r=random.Random(946237)

def nurikabe():
    levels=[];seen=set()
    for n in (5,6,7):
        while sum(x['size']==n for x in levels)<100:
            sea={row*n+c for row in range(n) for c in range(n) if row%2==0};anchor=r.randrange(n)
            for row in range(1,n,2):
                sea.add(row*n+anchor)
                for c in range(n):
                    if r.random()<.3 and not ((c and row*n+c-1 in sea) or (c<n-1 and row*n+c+1 in sea)):sea.add(row*n+c)
            islands=p.components(set(range(n*n))-sea,n)
            if len(islands)<3 or any(len(a)>5 for a in islands):continue
            clues={r.choice(tuple(a)):len(a) for a in islands};key=(n,tuple(sorted(clues.items())))
            if key in seen:continue
            solutions=p.nuri_solutions(n,clues)
            if len(solutions)!=1:continue
            seen.add(key);levels.append({'size':n,'clues':[clues.get(i,0) for i in range(n*n)],'solution':solutions[0],'rating':n*1000+n*n-len(clues)})
            if len(levels)%25==0:print('nurikabe fast',len(levels),flush=True)
    p.save('nurikabe',levels)

def tango():
    levels=[];seen=set()
    for n in (6,8,10):
        rows=p.tango_rows(n)
        while sum(x['size']==n for x in levels)<100:
            chosen=[]
            def fill():
                if len(chosen)==n:return len(set(zip(*chosen)))==n
                options=rows[:];r.shuffle(options)
                for row in options:
                    if row in chosen:continue
                    if any(sum(x[c] for x in chosen)+row[c]>n//2 or sum(1-x[c] for x in chosen)+1-row[c]>n//2 or len(chosen)>=2 and chosen[-1][c]==chosen[-2][c]==row[c] for c in range(n)):continue
                    chosen.append(row)
                    if fill():return True
                    chosen.pop()
                return False
            if not fill():continue
            solution=[v for row in chosen for v in row];givens=solution[:];order=list(range(n*n));r.shuffle(order)
            target=n*n//3 + r.randrange(n*n//5)
            for i in order:
                if givens.count(-1)>=target:break
                old=givens[i];givens[i]=-1
                if len(p.tango_solutions(n,givens))!=1:givens[i]=old
            key=(n,tuple(givens))
            if key in seen:continue
            seen.add(key);levels.append({'size':n,'givens':givens,'solution':solution,'rating':n*100+givens.count(-1)})
            if len(levels)%25==0:print('tango fast',len(levels),flush=True)
    p.save('tango',levels)

def hashi():
    levels=[];seen=set()
    for n in (3,4):
        edges=p.hash_graph(n)
        while sum(x['grid']==n for x in levels)<150:
            parent=list(range(n*n))
            def find(x):
                while parent[x]!=x:parent[x]=parent[parent[x]];x=parent[x]
                return x
            order=list(range(len(edges)));r.shuffle(order);values=[0]*len(edges)
            for i in order:
                a,b=edges[i];x,y=find(a),find(b)
                if x!=y:parent[x]=y;values[i]=r.choice([1,1,2])
                elif r.random()<.18:values[i]=r.choice([1,2])
            clues=[0]*(n*n)
            for v,(a,b) in zip(values,edges):clues[a]+=v;clues[b]+=v
            key=(n,tuple(clues))
            if key in seen:continue
            solutions=p.hash_solutions(n,clues)
            if len(solutions)!=1:continue
            seen.add(key);v=solutions[0]
            levels.append({'size':2*n-1,'grid':n,'clues':clues,'edges':edges,'solution':v,'rating':n*1000+sum(x>0 for x in v)})
            if len(levels)%25==0:print('hashi fast',len(levels),flush=True)
    p.save('hashi',levels)

if __name__=='__main__':
    import sys
    {'nurikabe':nurikabe,'tango':tango,'hashi':hashi}[sys.argv[1]]()
