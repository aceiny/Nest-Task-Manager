f = open('l.txt','r',encoding='utf-8')
p = open('p.txt','w',encoding='utf-8')
k = f.readlines()
l = []
for i in range(0,len(k),2) : 
    l.append(k[i].strip())
p.write('\n'.join(l))