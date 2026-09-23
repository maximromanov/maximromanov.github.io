from os.path import join, getsize
import time, re, sys, itertools
start = time.time()


def generateNetworkData(file, replaceThis, withThat):
    data = {}
    with open(file, "r",  encoding = "utf8") as f1:
        dd = f1.read().split("\n")
        for d in dd:
            d = d.split("\t")
            key = d[0]
            val = '\t'.join(d[1:])
            if key in data:
                data[key].append(val)
            else:
                data[key] = [val]
            #print(key)
            #input(data)

    edges = []
    for k,v in data.items():
        if len(v) >= 2:
            temp = list(itertools.permutations(v, 2))
            for t in temp:
                val = k+"\t"+"\t".join(sorted(t))
                edges.append(val)
    print(len(edges))
    edges = sorted(list(set(edges)))
    print(len(edges))

    with open(file.replace(replaceThis, withThat), "w", encoding="utf8") as f9:
        f9.write("\n".join(edges))
        
    

        
generateNetworkData("0748Dhahabi.TarikhIslam.JK007088-ara1.dataRaw1", ".dataRaw1", ".dataNETW")

end = time.time()
print("Processing time: {0:.2f} sec".format(end - start))
print("Tada!")


import itertools
itertools.permutations([1, 2, 3])
