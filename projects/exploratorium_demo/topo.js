/**
 * Created by rostam on 10.02.17.
 */
var radiusScaling = d3.scaleLog()
    .domain([1, 60])
    .range([2, 20]);

var prevEdges_changed_reg = [];
var prevEdges_changed_sttl = [];

function init_topo(projection, onom_temp_id_obj, reg_visCntr_latLon,
                   topuri_place, table_id_place_reg_rv, switch_reg) {
    var reg_visCenter_info = {};
    var all = {};
    // id, place: number
    var all_sttl = {};
    var R = {};
    var R_sttl = {};
    var available_regions = {};
    var allUris_reg = {};
    var allUris_sttls = {};

    table_id_place_reg_rv.forEach(function (row) {
        available_regions[row['uri_region']] = 0;
        all[row['id'] + "," + row['uri_region']] = 0;
        all_sttl[row['id'] + "," + row['uri_place']] = 0;
        R[row['id'] + "," + row['uri_region'] + "," + row['rv']] = 0;
        R_sttl[row['id'] + "," + row['uri_place'] + "," + row['rv']] = 0;
        if (onom_temp_id_obj[row['id']] == 0) {
            all[row['id'] + "," + row['uri_region']] = 1;
            all_sttl[row['id'] + "," + row['uri_place']] = 1;

            if (row['rv'] == 'R') {
                R[row['id'] + "," + row['uri_region'] + "," + row['rv']] = 1;
                R_sttl[row['id'] + "," + row['uri_place'] + "," + row['rv']] = 1;
            }
            if (allUris_reg[row['id']] == undefined) allUris_reg[row['id']] = {};
            allUris_reg[row['id']][row['uri_region']] = 0;

            if (allUris_sttls[row['id']] == undefined) allUris_sttls[row['id']] = {};
            allUris_sttls[row['id']][row['uri_place']] = 0;
        }
    });

    var edge_size_region = {};
    Object.keys(allUris_reg).forEach(function (aur) {
        var uris = Object.keys(allUris_reg[aur]);
        if (uris.length != 1) {
            for (var i = 0; i < uris.length; i++) {
                for (var j = i + 1; j < uris.length; j++) {
                    if (uris[i] != uris[j]) {
                        if (edge_size_region[uris[i] + "," + uris[j]] == undefined &&
                            edge_size_region[uris[j] + "," + uris[i]] == undefined) {
                            edge_size_region[uris[i] + "," + uris[j]] = 0;
                        }
                        if (edge_size_region[uris[i] + "," + uris[j]] !== undefined)
                            edge_size_region[uris[i] + "," + uris[j]]++;
                        if (edge_size_region[uris[j] + "," + uris[i]] !== undefined)
                            edge_size_region[uris[j] + "," + uris[i]]++;
                    }
                }
            }
        }
    });

    var edge_size_sttls = {};
    Object.keys(allUris_sttls).forEach(function (aur) {
        var uris = Object.keys(allUris_sttls[aur]);
        if (uris.length != 1) {
            for (var i = 0; i < uris.length; i++) {
                for (var j = i + 1; j < uris.length; j++) {
                    if (uris[i] != uris[j]) {
                        if (edge_size_sttls[uris[i] + "," + uris[j]] == undefined &&
                            edge_size_sttls[uris[j] + "," + uris[i]] == undefined) {
                            edge_size_sttls[uris[i] + "," + uris[j]] = 0;
                        }
                        if (edge_size_sttls[uris[i] + "," + uris[j]] !== undefined)
                            edge_size_sttls[uris[i] + "," + uris[j]]++;
                        if (edge_size_sttls[uris[j] + "," + uris[i]] !== undefined)
                            edge_size_sttls[uris[j] + "," + uris[i]]++;
                    }
                }
            }
        }
    });

    var residents = {};
    var residents_sttl = {};
    var all_ = {};
    // place(uri): number - created based on all_sttl
    var all_sttl_ = {};
    Object.keys(available_regions).forEach(function (ar) {
        residents[ar] = 0;
        all_[ar] = 0;
    });
    Object.keys(R).forEach(function (r) {
        var start = r.indexOf(',') + 1;
        var length = r.lastIndexOf(',') - start;
        var region = r.substr(start, length);
        residents[region] += R[r];
    });

    Object.keys(R_sttl).forEach(function (r) {
        var start = r.indexOf(',') + 1;
        var length = r.lastIndexOf(',') - start;
        var place = r.substr(start, length);
        if (residents_sttl[place] == undefined) residents_sttl[place] = 0;
        residents_sttl[place] += R_sttl[r];
    });

    Object.keys(all).forEach(function (a) {
        var start = a.indexOf(',') + 1;
        var region = a.substr(start);
        all_[region] += all[a];
    });

    Object.keys(all_sttl).forEach(function (a) {
        var start = a.indexOf(',') + 1;
        var place = a.substr(start);
        if (all_sttl_[place] == undefined) all_sttl_[place] = 0;
        all_sttl_[place] += all_sttl[a];
    });

    //d3.select("#topos").selectAll("*").remove();

    var topo_points = [];
    Object.keys(all_sttl_).forEach(function (place) {
        if (topuri_place[place] != undefined)
            topo_points.push({
                "freq_resident": residents_sttl[place],
                "freq": all_sttl_[place],
                "lat": topuri_place[place]["properties"]["cornuData"]["coord_lat"],
                "lon": topuri_place[place]["properties"]["cornuData"]["coord_lon"],
                "place_name": place,
                "region_code": topuri_place[place]["properties"]["cornuData"]['region_code'],
                "arabic_name": topuri_place[place]["properties"]["cornuData"]['toponym_arabic'],
                "english_name": topuri_place[place]["properties"]["cornuData"]['toponym_translit']
            });
    });


    Object.keys(available_regions).forEach(function (ar) {
        if (reg_visCenter_info[ar] == undefined)
            reg_visCenter_info[ar] = {
                "freq_resident": 0,
                "freq": 0,
                "lat": reg_visCntr_latLon[ar].lat,
                "lon": reg_visCntr_latLon[ar].lon,
                "region_code": reg_visCntr_latLon[ar].region_code
            };
        var v = all_[ar] - residents[ar];
        var r = residents[ar];
        reg_visCenter_info[ar].freq = all_[ar];
        reg_visCenter_info[ar].freq_resident = r;
    });
    // topo_points.forEach(function (tp) {
    //     var region_code = topuri_place[arabic_topuri[tp['item']]]['properties']['cornuData']['region_code'];
    //     if (reg_visCenter_info[region_code] == undefined)
    //         reg_visCenter_info[region_code] = {
    //             "freq_resident": 0,
    //             "freq": 0,
    //             "lat": reg_visCntr_latLon[region_code].lat,
    //             "lon": reg_visCntr_latLon[region_code].lon,
    //             "region_code": reg_visCntr_latLon[region_code].region_code
    //         };
    //     reg_visCenter_info[region_code].freq += tp.freq + tp.freq_diff;
    //     reg_visCenter_info[region_code].freq_resident += tp.freq_diff;
    // });


    // Define the div for the tooltip
    var div = d3.select("body").append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);

    var regLines_g = d3.select("#regionLines_g");

    var region_circles = {};
    //var regionsg = d3.select("#topos").append("g").attr("id", "regions");
    Object.keys(reg_visCenter_info).forEach(function (rv) {
        var reg = reg_visCenter_info[rv];
        var proj_sel = projection([reg['lon'], reg['lat']]);
        var radius1 = radiusScaling(reg.freq);
        var radius2 = radiusScaling(reg.freq_resident);
        if (reg.freq == 0)
            radius1 = 0;
        if (reg.freq_resident == 0)
            radius2 = 0;
        // Reg level circles
        var g_reg = d3.select("#" + reg.region_code.replace(" ","_"));
        //if (radius1 != 0)
            g_reg.select("#c_out"+reg.region_code.replace(" ","_"))
                .attr("r", radius1)
                //.attr("fill", "#800000")//"#862d59")// outer circle color in reg level
                //.attr("opacity", "0.7")
                //.attr("name",tp['item'])
                .attr("freq", reg.freq)
                .attr("orig_r", radius1);

        //if (radius2 != 0)
            g_reg.select("#c_in"+reg.region_code.replace(" ","_"))
                //.attr("cx", proj_sel[0])
                //.attr("cy", proj_sel[1])
                .attr("r", radius2)
                //.attr("fill", "#ffd633")//"orange")
                //.attr("opacity", "0.7")
                //.attr("name",tp['item'])
                .attr("freq", reg.freq_resident)
                .attr("orig_r", radius2);

        if (radius1 != 0 || radius2 != 0) {
            var rect = g_reg.append("g").append("rect")
                .attr("class", "labelsregion").attr("visibility", "hidden");
            var t = g_reg.append("g").append("text")
                .attr("x", proj_sel[0])
                .attr("y", proj_sel[1]).attr("class", "labelsregion")
                .attr("visibility", "hidden")
                .style("font-weight", "bold").style("font-size","15px").attr("fontsize","15")
                .text(reg.region_code + ": " + reg.freq + "/" + reg.freq_resident);
            var bBox = t.node().getBBox();
            rect.attr("x", bBox.x - 2).attr("y", bBox.y - 2)
                .attr("width", bBox.width + 5).attr("height", bBox.height + 5)
                .style("fill-opacity", ".4").attr("fill", "lightgray");
        }
        g_reg.on("mouseover", function (d) {
            div.style("opacity", .9);
            div.html(reg.region_code + "<br/>" + reg.freq + "/" + reg.freq_resident)
                .style("left", (d3.event.pageX) + "px")
                .style("top", (d3.event.pageY - 28) + "px");

            d3.select("#regionLines_g").selectAll("*").style("visibility", "hidden");
            index_region_lines[reg.region_code].forEach(function (irl) {
                irl.style("visibility", "visible");
            });
        }).on("mouseout", function (d) {
            div.style("opacity", 0);
            d3.select("#regionLines_g")
                .selectAll("*")
                .style("visibility", "visible");
        });
    });

    var max_edge_size = 0;
    Object.keys(edge_size_region).forEach(function (esr) {
        if (max_edge_size < edge_size_region[esr]) max_edge_size = edge_size_region[esr];
    });
    var edgeScaling = d3.scaleLog()
        .domain([1, max_edge_size])
        .range([3, 30]);
    //var colorscale = d3.interpolateGreens(0.5);
    //var colorScale = d3.scaleOrdinal(d3["schemeCategory20c"]);

    // color scale for arcs connecting regional level circles
    var colorScale_reg = d3.scaleLog()
        .domain([1, max_edge_size])
        .range(["#ffcccc", "#800000"]);

    // color scale for arcs connecting sttl level circles
    var colorScale_sttl = d3.scaleLog()
        .domain([1, max_edge_size])
        .range(["#d8a6bf", "#7c3659"]);

    var keysSorted = Object.keys(edge_size_region).sort(function(a,b)
    {return edge_size_region[a]-edge_size_region[b]});

    var regEdges_changed = [];
    var sttlEdges_changed = [];
    keysSorted.forEach(function (esr) {
        var region1 = esr.substr(0, esr.indexOf(","));
        var region2 = esr.substr(esr.indexOf(",") + 1);
        var reg1 = reg_visCenter_info[region1];
        var reg2 = reg_visCenter_info[region2];

        var proj1 = projection([reg1['lon'], reg1['lat']]);
        var proj2 = projection([reg2['lon'], reg2['lat']]);
        var coordinates = [proj1, proj2];

        region1 = region1.replace(" ","_");
        region2 = region2.replace(" ","_");

        regEdges_changed.push("#"+region1+region2);

        d3.select("#"+region1+region2)
            .attr("act_color", colorScale_reg(edge_size_region[esr]))
            .style("stroke", colorScale_reg(edge_size_region[esr]))//"green")
            .style("stroke-width", edgeScaling(edge_size_region[esr]))
            .attr("orig_edge_scale",edgeScaling(edge_size_region[esr]));
    });

    var reg_difference = prevEdges_changed_reg.filter(function (pc) {
        return regEdges_changed.indexOf(pc) == -1;
    });

    reg_difference.forEach(function (d) {
        d3.select(d).style("stroke-width", 0);
    });

    prevEdges_changed_reg = regEdges_changed;
//////////////////////////////////////////////////////////////////////////////////
    // return;

    var sttlLines_g = d3.select("#sttlLines_g");
    var sttls = d3.select("#sttls");

    // sttl level circles
    topo_points.forEach(function (tp) {
        var proj_sel = projection([tp.lon, tp.lat]);
        var radius = radiusScaling(tp.freq);
        if (tp.freq == 0)
            radius = 0;
        var g_sttl = d3.select("#" + tp['place_name']);

        g_sttl.select("#c_out" + tp['place_name'])
            .attr("r", radius)
            .attr("freq", tp.freq)
            .attr("orig_r", radius);
        // if (radius != 0)
        //     g.append("circle")
        //         .attr("cx", proj_sel[0])
        //         .attr("cy", proj_sel[1])
        //         .attr("r", radius)
        //         .attr("fill", "#7c3659")//"#800000") // outer circle color in sttl level
        //         //.attr("opacity", "0.7")
        //         .attr("name", tp['place_name'])
        //         .attr("freq", tp.freq)
        //         .attr("orig_r", radius);

        var radius2 = radiusScaling(tp.freq_resident);
        if (tp.freq_resident == 0)
            radius2 = 0;
        // if (radius2 != 0)
        //     g.append("circle")
        g_sttl.select("#c_in" + tp['place_name'])
                .attr("r", radius2)
                .attr("freq", tp.freq_resident)
                .attr("orig_r", radius2);
        //g.append("text").text(tp.freq+ "/" + tp.freq_diff).attr("x",proj_sel[0]).attr("y",proj_sel[1]);
        //g.style("visibility", "hidden");

        if (radius != 0 || radius2 != 0) {
            var rect = g_sttl.append("g").append("rect").attr("class", "labelssttls").attr("visibility", "hidden");
            var t = g_sttl.append("g").append("text")
                .attr("x", proj_sel[0])
                .attr("y", proj_sel[1]).attr("class", "labelssttls").attr("visibility", "hidden")
                .style("font-size", "10px").style("font-size","15px").attr("fontsize","15")
                .text(tp.english_name + ": " + tp.freq + "/" + tp.freq_resident).style("background", "lightgray");
            var bBox = t.node().getBBox();
            rect.attr("x", bBox.x - 2).attr("y", bBox.y - 2)
                .attr("width", bBox.width + 5).attr("height", bBox.height + 5)
                .style("fill-opacity", ".3").attr("fill", "lightgray");

        }
        g_sttl.attr("region_code", tp.region_code);
        if (region_circles[tp.region_code] == undefined)
            region_circles[tp.region_code] = [];
        region_circles[tp.region_code].push(g_sttl);

        g_sttl.on("mouseover", function (d) {
            div.style("opacity", .9);
            div.html(tp.english_name + "<br/>" + tp.freq + "/" + tp.freq_resident)
                .style("left", (d3.event.pageX) + "px")
                .style("top", (d3.event.pageY - 28) + "px");
            sttlLines_g.selectAll("*").style("visibility", "hidden");
            index_sttls_lines[tp['place_name']].forEach(function (irl) {
                irl.style("stroke", irl.attr("act_color"));
                irl.style("visibility", "visible");
            });
        }).on("mouseout", function (d) {
            div.style("opacity", 0);
            sttlLines_g.selectAll("*").style("visibility", "visible");
        });
    });
    var keysSorted_sttl = Object.keys(edge_size_sttls).sort(function(a,b) {
        return edge_size_sttls[a]-edge_size_sttls[b]});
    keysSorted_sttl.forEach(function (esr) {

        var sttl1 = esr.substr(0, esr.indexOf(","));
        var sttl2 = esr.substr(esr.indexOf(",") + 1);
        var feature1 = topuri_place[sttl1];
        var feature2 = topuri_place[sttl2];

        var proj1 = projection([feature1["properties"]["cornuData"]["coord_lon"],
            feature1["properties"]["cornuData"]["coord_lat"]]);

        var proj2 = projection([feature2["properties"]["cornuData"]["coord_lon"],
            feature2["properties"]["cornuData"]["coord_lat"]]);
        var coordinates = [proj1, proj2];

        regEdges_changed.push("#"+sttl1+sttl2);

        d3.select("#"+sttl1+sttl2)
            .attr("act_color", colorScale_sttl(edge_size_sttls[esr]))
            .style("stroke", colorScale_sttl(edge_size_sttls[esr]))//"green")
            .style("stroke-width", edgeScaling(edge_size_sttls[esr]))
            .attr("orig_edge_scale",edgeScaling(edge_size_sttls[esr]));
        var line = sttlLines_g.select("path")
        // var line = sttlLines_g.select("path")
        //     .datum(coordinates)
        //     .attr("d", function (c) {
        //         var d = {
        //             source: c[0],
        //             target: c[1]
        //         };
        //         var dx = d.target[0] - d.source[0],
        //             dy = d.target[1] - d.source[1],
        //             dr = Math.sqrt(dx * dx + dy * dy);
        //         return "M" + d.source[0] + "," + d.source[1] + "A" + dr + "," + dr +
        //             " 0 0,1 " + d.target[0] + "," + d.target[1];
        //     })
        //     .attr("opacity", "0.9").attr("act_color", colorScale_sttl(edge_size_sttls[esr]))
        //     .style("stroke", colorScale_sttl(edge_size_sttls[esr]))//"green")
        //     .style("stroke-width", edgeScaling(edge_size_sttls[esr]))
        //     .attr("orig_edge_scale",edgeScaling(edge_size_sttls[esr]))
        //     .style("fill", "none");
        // if (index_sttls_lines[sttl1] == undefined) index_sttls_lines[sttl1] = [];
        // index_sttls_lines[sttl1].push(line);
        // if (index_sttls_lines[sttl2] == undefined) index_sttls_lines[sttl2] = [];
        // index_sttls_lines[sttl2].push(line);
        });

    var sttl_difference = prevEdges_changed_sttl.filter(function (pc) {
        return sttlEdges_changed.indexOf(pc) == -1;
    });

    sttl_difference.forEach(function (d) {
        d3.select(d)
            .style("stroke-width", 0);
    });

    prevEdges_changed_sttl = sttlEdges_changed;


    if (d3.select("#switchtext").text() == "Settlements") {
        d3.select("#regions").style("visibility", "hidden");
        d3.select("#regionLines_g").selectAll('*').style("visibility", "hidden");
        d3.select("#sttls").style("visibility", "visible");
        d3.select("#sttlLines_g").selectAll("*").style("visibility", "visible");
    } else {
        d3.select("#regions").style("visibility", "visible");
        d3.select("#regionLines_g").selectAll('*').style("visibility", "visible");
        d3.select("#sttls").style("visibility", "hidden");
        d3.select("#sttlLines_g").selectAll("*").style("visibility", "hidden");
    }

    return edge_size_sttls;
}