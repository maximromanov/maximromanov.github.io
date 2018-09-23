/**
 * Created by rostam on 24.03.17.
 */
function generate_network_data(geoNW,netwo,rawData,onom_temp_id_obj,freq) {
    var geoNW_temp = geoNW.filter(function (gn) {
        return onom_temp_id_obj[gn['id']] == 0;
    });

    var geoNW_arcs2 = {};
    geoNW_temp.forEach(function (tote) {
        if (geoNW_arcs2[tote['item1'] + "," + tote['lat1'] + "," + tote['lon1']
            + "," + tote['item2'] + "," + tote['lat2'] + "," + tote['lon2']] == undefined) {
            geoNW_arcs2[tote['item1'] + "," + tote['lat1'] + "," + tote['lon1']
            + "," + tote['item2'] + "," + tote['lat2'] + "," + tote['lon2']] = 0;
        }
        geoNW_arcs2[tote['item1'] + "," + tote['lat1'] + "," + tote['lon1']
        + "," + tote['item2'] + "," + tote['lat2'] + "," + tote['lon2']]++;
    });


    var geoNW_arcs = [];
    Object.keys(geoNW_arcs2).forEach(function (tp2) {
        var tmp = tp2.substr(tp2.indexOf(",") + 1);
        var tmp2 = tmp.substr(tmp.indexOf(",") + 1);
        var tmp3 = tmp2.substr(tmp2.indexOf(",") + 1);
        var tmp4 = tmp3.substr(tmp3.indexOf(",") + 1);
        var tmp5 = tmp4.substr(tmp4.indexOf(",") + 1);
        geoNW_arcs.push({
            'item1': tp2.substr(0, tp2.indexOf(",")),
            'lat1': tmp.substr(0, tmp.indexOf(",")),
            'lon1': tmp2.substr(0, tmp2.indexOf(",")),
            'item2': tmp3.substr(0, tmp3.indexOf(",")),
            'lat2': tmp4.substr(0, tmp4.indexOf(",")),
            'lon2': tmp5,
            'freq': geoNW_arcs2[tp2]
        });
    });


    function filterRE(data) {
        return data.indexOf("topo") != -1 ||
            data.indexOf("onom") != -1 ||
            data.indexOf("onto") != -1;
    }


    var netwo_temp2 = netwo.filter(function (nt) {
        return filterRE(nt['type1']) && filterRE(nt['type2']);
    });
    var netwo_temp = netwo_temp2.filter(function (nt) {
        return onom_temp_id_obj[nt['id']] == 0;
    });

    var netwo_edges2 = {};
    netwo_temp.forEach(function (ntt) {
        if (netwo_edges2[ntt['item1'] + "," + ntt['item2']] == undefined)
            netwo_edges2[ntt['item1'] + "," + ntt['item2']] = 0;
        netwo_edges2[ntt['item1'] + "," + ntt['item2']]++;
    });
    var netwo_edges = [];
    var netwo_edges_incidents = {}
    Object.keys(netwo_edges2).forEach(function (ntt) {
        if (netwo_edges2[ntt] >= freq) {
            var src = ntt.substr(0, ntt.indexOf(","));
            var tgt = ntt.substr(ntt.indexOf(",") + 1);
            netwo_edges.push({
                source: src,
                target: tgt,
                edge_freq: netwo_edges2[ntt]
            });
            netwo_edges_incidents[src] = 0;
            netwo_edges_incidents[tgt] = 0;
        }
    });

//            nodes_temp = rawData[rawData$id %in% onom_temp$id,]
//            nodes_temp = nodes_temp[nodes_temp$item %in% nodes_to_keep,]
    //nodes_temp = nodes_temp[ with(nodes_temp, grepl(filterRE,type)),]
    //            nodes_temp = subset(nodes_temp, select=-c(id))

    var rawData2 = rawData.filter(function (rd) {
        return filterRE(rd['type']);
    });
    var nodes_temp4 = rawData2.filter(function (rd2) {
        return onom_temp_id_obj[rd2['id']] == 0;
    });
    var nodes_temp2 = [];
    nodes_temp4.forEach(function (nd4) {
        nodes_temp2.push({
            item: nd4['item'],
            type: nd4['type']
        });
    });

//
//            nodes_temp = ddply(nodes_temp,.(item,type),nrow)
//            colnames(nodes_temp)  <- c("item", "type", "node_freq")
    var nodes_temp3 = {};
    nodes_temp2.forEach(function (nt2) {
        if (nodes_temp3[nt2['item'] + "," + nt2['type']] == undefined) {
            nodes_temp3[nt2['item'] + "," + nt2['type']] = 0;
        }
        nodes_temp3[nt2['item'] + "," + nt2['type']]++;
    });

    var nodes_temp = [];
    var nodes_items = {};
    var node_freq = {};
    Object.keys(nodes_temp3).forEach(function (nt3) {
        var item = nt3.substr(0, nt3.indexOf(","));
        if (netwo_edges_incidents[item] == 0) {
            var obj = {
                'item': item,
                'type': nt3.substr(nt3.indexOf(",") + 1),
                'node_freq': nodes_temp3[nt3]
            };
            nodes_temp.push(obj);
            nodes_items[nt3.substr(0, nt3.indexOf(","))] = obj;
            node_freq[item] = nodes_temp3[nt3];
        }
    });

    var nodes_items_unified = Object.keys(nodes_items);

    var netwo_edges_node = [];
    var heatmap_data = [];
    netwo_edges.forEach(function (ntt) {
        if (nodes_items_unified.indexOf(ntt['source']) != -1 &&
            nodes_items_unified.indexOf(ntt['target']) != -1)
            netwo_edges_node.push(ntt);
        if (node_freq[ntt['source']] > 3 && node_freq[ntt['target']] > 3) {
            heatmap_data.push({
                'src': ntt['source'],
                'tgt': ntt['target'],
                'freq': ntt['edge_freq']
            });
        }
    });
    //
    // var nodes1 = [
    //     {"item":"1", "node_freq": 1,'type':1},
    //     {"item":"2", "node_freq": 2,'type':2},
    //     {"item": "3", "node_freq": 1,'type':1}
    //     ];
    //
    // var links1 = [
    //     { source: "1", target: "2", value : "1" },
    //     { source: "2", target: "3", value : "1" },
    //     { source: "1", target: "3", value : "1" },
    // ];


    //console.log(Object.values(nodes_items));
    // console.log(netwo_edges);
    //netwo_edges = [];
    //netwo_edges = Object.values(nodes_items);
    //console.log(netwo_edges);
    draw_graph(Object.values(nodes_items), netwo_edges_node, "mygraph");
    //draw_graph(nodes1,links1,"mygraph");
    //draw_graph(nodes_temp,netwo_edges,"mygraph");
    draw_d3_heatmap("heatmap", heatmap_data);
}