/**
 * Created by rostam on 30.04.17.
 */
function gen_netw(onom_temp_id_obj,map_id_all,freq) {
    var nodes = {};
    var netwo_edges = [];
    var edge_size = {};

    Object.keys(onom_temp_id_obj).forEach(function (id) {
        var mia = map_id_all[id];
        //console.log("mia")
        //console.log(mia)
        for (var i = 0; i < mia.length - 1; i++) {
            for (var j = i + 1; j < mia.length; j++) {
                if (nodes[mia[i].item] == undefined) nodes[mia[i].item] = {freq: 0,type:mia[i].cat, translit:mia[i].translit };
                if (nodes[mia[j].item] == undefined) nodes[mia[j].item] = {freq: 0,type:mia[j].cat, translit:mia[j].translit};
                nodes[mia[i].item]['freq']++;
                nodes[mia[j].item]['freq']++;
                if (edge_size[mia[i].item + "," + mia[j].item] == undefined)
                    edge_size[mia[i] .item+ "," + mia[j].item] = 0;
                edge_size[mia[i].item + "," + mia[j].item]++;
            }
        }
    });


    Object.keys(edge_size).forEach(function (est) {
        var sttl1 = est.substr(0, est.indexOf(","));
        var sttl2 = est.substr(est.indexOf(",") + 1);
        if (edge_size[est] >= freq) {
            netwo_edges.push({
                source: sttl1,
                target: sttl2,
                freq: edge_size[est]
            });
        }
    });

    var filtered_nodes = {};
    netwo_edges.forEach(function (e) {
        filtered_nodes[e['source']] = nodes[e['source']];
        filtered_nodes[e['target']] = nodes[e['target']];
    });

    var nodes_objs = [];
    Object.keys(filtered_nodes).forEach(function (n) {
        var obj = {
            'item': n,
            'type': nodes[n].type,
            'freq': nodes[n].freq,
            'radius': nodes[n].freq,
            'translit': nodes[n].translit//(nodes[n].type == 'yede')? "" : nodes[n].translit
        };
        nodes_objs.push(obj);
    });

    draw_graph(nodes_objs, netwo_edges, "mygraph");
}