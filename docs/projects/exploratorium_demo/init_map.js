/**
 * Created by rostam on 10.02.17.
 */
<!-- map creation -->
var zoom;
// canvas resolution
function init_map() {
    var width = 900;
    var height = 600;

// var w = d3.select("#main-svg").style("width");
// var h = d3.select("#main-svg").style("height");
// var width = parseInt(w.substr(0, w.indexOf("px")));
// var height = parseInt(h.substr(0, h.indexOf("px")));
// var width = 960;
// var height = 500;
//
// var svg = d3.select("#main-svg")
//
// var projection = d3.geoMercator()
//     .scale(width / 2 / Math.PI)
//     //.scale(100)
//     .translate([width / 2, height / 2])
//
// var path = d3.geoPath()
//     .projection(projection);
//
// var url = "http://enjalot.github.io/wwsd/data/world/world-110m.geojson";
// d3.json(url, function(err, geojson) {
//     svg.append("path")
//         .attr("d", path(geojson))
// });
//
// return;

    var center = [width / 2, height / 2];

// projection-settings for mercator
    var projection = d3.geoMercator()
    // where to center the map in degrees
        .center([35, 35])
        // zoomlevel
        .scale(700)
        // map-rotation
        .rotate([10, 0, 0]);

// defines "svg" as data type and "make canvas" command
    var svg = d3.select("#main-svg");
    d3.select("#container").style("background-color","lightgray");
    var land = d3.select("#land");
    var rivers = d3.select("#rivers");
    var lakes = d3.select("#lakes");

// defines "path" as return of geographic features
    var path1 = d3.geoPath().projection(projection);

// defines "path" as return of geographic features
    var path2 = d3.geoPath().projection(projection);

    var path = path1;

// load data and display the map on the canvas with country geometries
    d3.json("data/map/ne50m_land.json", function (error, topology) {
        land.selectAll("path")
            .data(topojson.object(topology, topology.objects.ne_50m_land).geometries)
            .enter().append("path").attr("d", path1).attr("fill","white").attr("stroke","darkgray")
            .attr("stroke-width","2").style("border","solid").attr("bordersize","2");
    });

//add rivers
    d3.json("data/map/ne50m_rivers.json", function (error, topology) {
        rivers.selectAll("path")
            .data(topojson.object(topology, topology.objects.rivers).geometries)
            .enter().append("path").attr("d", path2).attr("fill","none")
            .attr("stroke","lightgray").attr("stroke-width","1");
    });

    d3.json("data/map/ne_50m_lakes.geojson", function (error, state) {
        lakes.selectAll("path")
            .data(state.features)
            .enter().append("path").attr("d", path2).attr("fill","lightgray")
            .attr("stroke","gray").attr("stroke-width","1");
    });

    // svg.call(d3.zoom().on("zoom", function () {
    //     // svg.selectAll("g").attr("transform", "translate("
    //     //     + d3.event.translate.join(",") + ") scale(" + d3.event.scale + ")");
    //
    //     svg.attr("transform", "translate(" + d3.event.translate
    //         + ")" + " scale(" + d3.event.scale + ")");
    //     // svg.selectAll("g").selectAll("path")
    //     //     .attr("d", path.projection(projection));
    //     //
    //     // svg.selectAll("circle").attr("r", function (d) {
    //     //     return d3.select(this).attr("orig_r") / zoom.scale();
    //     // });
    // }));
    //

    zoom = d3.zoom().on("zoom", function () {
        svg.attr("transform", d3.event.transform);
        d3.select("#regions").selectAll("circle").attr("r",function(i,d){
            return d3.select(this).attr("orig_r")/d3.event.transform.k;
        });
        d3.select("#sttls").selectAll("circle").attr("r",function(i,d){
            return d3.select(this).attr("orig_r")/d3.event.transform.k;
        });
        d3.selectAll(".labelsregion").style("font-size",function(i,d){
            return d3.select(this).attr("fontsize")/d3.event.transform.k+"px";
        });
        d3.selectAll(".labelssttls").style("font-size",function(i,d){
            return d3.select(this).attr("fontsize")/d3.event.transform.k+"px";
        });
        d3.select("#regionLines_g").selectAll("path").style("stroke-width",function(i,d) {
            return d3.select(this).attr("orig_edge_scale")/d3.event.transform.k;
        });
        d3.select("#sttlLines_g").selectAll("path").style("stroke-width",function(i,d) {
            return d3.select(this).attr("orig_edge_scale")/d3.event.transform.k;
        });
        d3.select("#land").selectAll("path").style("stroke-width",function(i,d) {
            return d3.select(this).attr("bordersize")/d3.event.transform.k;
        });

    }).scaleExtent([1,10]);
    svg.call(zoom);
    var container = d3.select("#container"),
        w = container.style("width"),
        container_w = +w.substr(0,w.indexOf("px")),
        container_w_left_portion = container_w / 5,
        h = container.style("height"),
        container_h = +h.substr(0,h.indexOf("px")),
        container_box = container.node().getBBox();
    d3.select("#fromto")
        .attr("x", "2%")
        .attr("y", container_h - 60);
    var text_title = d3.select("#bottom-explain-text"),
        text_title_w = text_title.style("width");
    text_title
        .attr("x", "2%")
        .attr("y", container_h - 100)
    var g_subtopo = d3.select("#legend");
    var start_legend_range = 10,
        end_legend_range = 110,
        legend_step = 20;
    d3.range(start_legend_range, end_legend_range, legend_step).forEach(function(i){
        g_subtopo.append("circle")
            .attr("r",radiusScaling(i))
            .attr("cx", container_w-220 + i*2)
            .attr("cy",50)
            .attr("fill","gray")
            .attr("opacity","0.7");
        g_subtopo.append("text")
            .attr("x", container_w-220 + i*2)
            .attr("y",30)
            .attr("text-anchor","middle")
            .text(i);
    });
    var zoom_buttons = g_subtopo.append("g");
    // var ele = d3.select("#main-svg");
    var first_y = container_h-100;

    add_rect_label('\uf067',container_w-60,first_y,function(){zoom.scaleBy(svg,1.2);},zoom_buttons);
    add_rect_label('\uf068',container_w-60,first_y+20,function(){zoom.scaleBy(svg,1/1.2);},zoom_buttons);
    add_rect_label('\uf062',container_w-60,first_y+40,function(){zoom.translateBy(svg,0,-10);},zoom_buttons);
    add_rect_label('\uf063',container_w-60,first_y+80,function(){zoom.translateBy(svg,0,10);},zoom_buttons);
    add_rect_label('\uf111',container_w-60,first_y+60,function(){svg.transition().duration(700).call(zoom.transform, d3.zoomIdentity);},zoom_buttons);
    add_rect_label('\uf061',container_w-40,first_y+60,function(){zoom.translateBy(svg,10,0);},zoom_buttons);
    add_rect_label('\uf060',container_w-80,first_y+60,function(){zoom.translateBy(svg,-10,0);},zoom_buttons);

    d3.select("#map_time_slider").attr("x",".1%").attr("y", container_h - 50);
    // Rectangle for information on the right side pf the map
    // TODO: To which should we append the info rect
    svg.append("rect").attr("id", "popup_info")
        .attr("x",width-220 ).attr("y", 100)
        .attr("width","200").attr("height", "250")
        .style("fill","lightgray")
        .style("fill-opacity", ".5")
        .style("visibility", "hidden");

    var switch_reg = g_subtopo.append("g");
    var labels = g_subtopo.append("g");
    switch_reg.append("circle")
        .attr("r",10).attr("cx",30).attr("cy",height-550)
        .attr("fill","lightgray").style("stroke","black");
    switch_reg.append("text")
        .attr("x",42).attr("y",height-545)
        .attr("id","switchtext").style("cursor", "default")
        .attr("fill","black")
        //.attr("text-anchor","middle")
        .style("font-weight","bold").text("Regions");
    switch_reg.on("click", function () {
        if (d3.select("#switchtext").text() == "Regions") {
            labels.select("circle").attr("fill", "lightgray");
            d3.select("#switchtext").text("Settlements");
            //d3.select(this).style("visibility", "hidden");
            d3.select("#regions").style("visibility", "hidden");
            d3.select("#regionLines_g").selectAll('*').style("visibility", "hidden");
            d3.select("#sttls").style("visibility", "visible");
            d3.select("#sttlLines_g").selectAll('*').style("visibility", "visible");
            d3.selectAll(".labelsregion").attr("visibility", "hidden");
            d3.selectAll(".labelssttls").attr("visibility", "hidden");

            //region_circles[reg.region_code].forEach(function (cir) {
            //    cir.style("visibility", "visible");
            //});
        } else {
            labels.select("circle").attr("fill", "lightgray");
            d3.select("#switchtext").text("Regions");
            d3.select("#regions").style("visibility", "visible");
            d3.select("#regionLines_g").selectAll("*").style("visibility", "visible");
            d3.select("#sttls").style("visibility", "hidden");
            d3.select("#sttlLines_g").selectAll("*").style("visibility", "hidden");
            d3.selectAll(".labelsregion").attr("visibility", "hidden");
            d3.selectAll(".labelssttls").attr("visibility", "hidden");        }
    });

    labels.append("circle")
        .attr("r",10).attr("cx",30).attr("cy",height-575)
        .attr("fill","lightgray").style("stroke","black");
    labels.append("text")
        .attr("x",42).attr("y",height-570)
        .attr("id","switchtext").style("cursor", "default")
        .attr("fill","black")
        //.attr("text-anchor","middle")
        .style("font-weight","bold")
        .text("Labels");
    labels.on("click",function () {
        if(labels.select("circle").attr("fill") == "lightgray") {
            labels.select("circle").attr("fill", "black");
            if (d3.select("#switchtext").text() == "Regions") {
                d3.selectAll(".labelsregion").attr("visibility", "visible");
            } else {
                d3.selectAll(".labelssttls").attr("visibility", "visible");
            }
        } else {
            labels.select("circle").attr("fill", "lightgray");
            if (d3.select("#switchtext").text() == "Regions") {
                d3.selectAll(".labelsregion").attr("visibility", "hidden");
            } else {
                d3.selectAll(".labelssttls").attr("visibility", "hidden");
            }
        }
    });
// Add full screen control
    var fullscreen = g_subtopo.append("g");
    // fullscreen.append("circle")
    //     .attr("r",5).attr("cx",width-115).attr("cy",height-505)
    //     .attr("fill","lightgray").style("stroke","black");
    fullscreen.append("text")
        .attr("x",container_w-105).attr("y",container_h-400)
        .attr("id","switchtext").style("cursor", "default")
        .attr("fill","black")
        //.attr("text-anchor","middle")
        .style("font-weight","bold")
        .text("Maximize");

    fullscreen.on("click",function () {
        if (fullscreen.select("text").text() == "Maximize") {
            fullscreen.select("text").text("Minimize");
            d3.select("#container").attr("transform","translate(0,40)");
            d3.select("#main-svg").attr("transform","translate(0,40)");
            d3.select("#container").classed("fullscreen", !d3.select("#container").classed("fullscreen"));
            d3.select("#main-svg").classed("fullscreen", !d3.select("#main-svg").classed("fullscreen"));
            var curr_h = d3.select("#container").style("height");
            var y = parseInt(curr_h) - 80;
            var y = parseInt(curr_h) - 80;
            d3.select("#map_time_slider").attr("y",y);
            d3.select("#fromto")
                .attr("x", "2%")
                .attr("y", y - 10)
            text_title
                .attr("x", "2%")
                .attr("y", y - 50)
            zoom_buttons.selectAll("*").each(function () {
                var curr_y = d3.select(this).attr("y");
                var diff = parseInt(curr_h) - parseInt(container_h)
                tmp = parseInt(curr_y) + diff - 50;
                d3.select(this).attr("y", tmp);
            })
        }
        else {
            fullscreen.select("text").text("Maximize");
            var curr_h = d3.select("#container").style("height");
            d3.select("#container").attr("transform","translate(" + container_box.x + "," + container_box.y + ")")
            d3.select("#main-svg").attr("transform","translate(" + container_box.x + "," + container_box.y + ")")
            d3.select("#container").classed("fullscreen", !d3.select("#container").classed("fullscreen"))
            d3.select("#main-svg").classed("fullscreen", !d3.select("#main-svg").classed("fullscreen"));
            var diff = parseInt(curr_h) - parseInt(container_h);
            var time_y = d3.select("#map_time_slider").attr("y");
            var y = parseInt(time_y) - diff + 30;
            d3.select("#map_time_slider").attr("y",y);
            d3.select("#fromto")
                .attr("x", "2%")
                .attr("y", y - 10)
            text_title
                .attr("x", "2%")
                .attr("y", y - 50)
            zoom_buttons.selectAll("*").each(function () {
                var curr_y = d3.select(this).attr("y");
                tmp = parseInt(curr_y) - diff + 50;
                d3.select(this).attr("y", tmp);
            })
        }


        // if(d3.select("#container").style("height") == "100%") {
        //     d3.select("#container").style("height", "500");
        //     d3.select("#geoscatter").style("height", "550")
        //     d3.select("#main-svg").style("height", "500");
        // } else {
        //     d3.select("#geoscatter").style("height", "100%")
        //     d3.select("#container").style("height", "100%");
        //     d3.select("#main-svg").style("height", "100%");
        // }
    });
    // d3.select("#full_screen").on("click", function() {
    //     console.log(d3.select("#container").style("height"))
    //     d3.select("#container").classed("fullscreen", !d3.select("#container").classed("fullscreen"))
    //     d3.select("#main-svg").classed("fullscreen", !d3.select("#container").classed("fullscreen"))
    //
    // })
    return [projection,switch_reg];
}

function add_rect_label(text,x,y,onclick,buttons) {
    buttons.append("rect")
        .attr("x", x)
        .attr("y", y)
        .attr("width", "20")
        .attr("height", "20")
        .attr("fill", "white")
        //.style("stroke","black")
        .on("click", function () {
            onclick();
        });
    buttons.append("text")
        .attr("text-anchor", "middle")
        .attr("x", x + 10)
        .attr("y", y + 16)
        .text(text)
        //.text('\uf118')
        .attr('font-family', 'FontAwesome')
        //.style("font-weight","bold")
        .style("font-size", "18px")
        .style("cursor", "default")
        .on("click", function () {
            onclick()
        });
}

var index_region_lines = {};
var index_sttls_lines = {};
function init_regions(projection, table_id_place_reg_rv, reg_visCntr_latLon) {
    var available_regions = {};
    var allUris_reg = {};
    table_id_place_reg_rv.forEach(function (row) {
        available_regions[row['uri_region']] = 0;

        if (allUris_reg[row['id']] == undefined) allUris_reg[row['id']] = {};
        allUris_reg[row['id']][row['uri_region']] = 0;
    });

    var reg_visCenter_coords = {};
    Object.keys(available_regions).forEach(function (ar) {
        if (reg_visCenter_coords[ar] == undefined)
            reg_visCenter_coords[ar] = {
                "lat": reg_visCntr_latLon[ar].lat,
                "lon": reg_visCntr_latLon[ar].lon,
                "region_code": reg_visCntr_latLon[ar].region_code
            };
    });

    var lines_g = d3.select("#topos").append("g")
        .attr("id", "regionLines_g");
    var regions_g = d3.select("#topos").append("g")
        .attr("id", "regions");
    Object.keys(reg_visCenter_coords).forEach(function (rv) {
        var reg = reg_visCenter_coords[rv];
        var proj_sel = projection([reg['lon'], reg['lat']]);

        // Reg level circles
        var g = regions_g.append("g").attr("id", reg.region_code.replace(" ","_"));
            g.append("circle")
                .attr("cx", proj_sel[0])
                .attr("cy", proj_sel[1])
                .attr("r", 0)
                .attr("fill", "#800000")
                .attr("id", "c_out" + reg.region_code.replace(" ","_"));
            //"#862d59")// outer circle color in reg level
        //.attr("opacity", "0.7")
        //.attr("name",tp['item'])
        //.attr("freq", reg.freq)
        //.attr("orig_r", radius1);

            g.append("circle")
                .attr("cx", proj_sel[0])
                .attr("cy", proj_sel[1])
                .attr("r", 0)
                .attr("fill", "#ffd633")
                .attr("id", "c_in" + reg.region_code.replace(" ","_"));
            //"orange")
                //.attr("opacity", "0.7")
                //.attr("name",tp['item'])
                //.attr("freq", reg.freq_resident)
                //.attr("orig_r", radius2);
    });


    var keys = Object.keys(reg_visCenter_coords);
    for(var i = 0;i < keys.length;i++ ) {
        var rv1 = keys[i];
        var reg1 = reg_visCenter_coords[rv1];
        var proj1 = projection([reg1['lon'], reg1['lat']]);
        for(var j = i+1;j < keys.length;j++ ) {
            var rv2 = keys[j];
            var reg2 = reg_visCenter_coords[rv2];
            var proj2 = projection([reg2['lon'], reg2['lat']]);
            if(rv1 != rv2) {
                var coordinates = [proj1, proj2];
                var line = lines_g.append("path")
                    .attr("id", rv1.replace(" ", "_") + rv2.replace(" ", "_"))
                    .datum(coordinates)
                    .attr("d", function (c) {
                        var d = {
                            source: c[0],
                            target: c[1]
                        };
                        var dx = d.target[0] - d.source[0],
                            dy = d.target[1] - d.source[1],
                            dr = Math.sqrt(dx * dx + dy * dy);
                        return "M" + d.source[0] + "," + d.source[1] + "A" + dr + "," + dr +
                            " 0 0,1 " + d.target[0] + "," + d.target[1];
                    }).attr("opacity", "0.9")
                    //.attr("act_color", colorScale_reg(edge_size_region[esr]))
                    //.style("stroke", colorScale_reg(edge_size_region[esr]))//"green")
                    //.style("stroke-width", edgeScaling(edge_size_region[esr]))
                    //.attr("orig_edge_scale",edgeScaling(edge_size_region[esr]))
                    .style("fill", "none")
                    .style("prevEdges_changed_reg", "false")
                    .style("changed", "false");

                if (index_region_lines[rv1] == undefined) index_region_lines[rv1] = [];
                index_region_lines[rv1].push(line);
                if (index_region_lines[rv2] == undefined) index_region_lines[rv2] = [];
                index_region_lines[rv2].push(line);
            }
        }
    }
}

function init_sttls(projection, table_id_place_reg_rv, topUri_place) {
    var allUris_sttl = {};
    var all_sttl = {};
    // place(uri): number - created based on all_sttl
    var all_sttl_ = {};
    table_id_place_reg_rv.forEach(function (row) {
        all_sttl[row['id'] + "," + row['uri_place']] = 0;

        if (allUris_sttl[row['id']] == undefined) allUris_sttl[row['id']] = {};
        allUris_sttl[row['id']][row['uri_place']] = 0;
    });

    var topo_points = [];
    Object.keys(all_sttl).forEach(function (a) {
        var start = a.indexOf(',') + 1;
        var place = a.substr(start);
        if (all_sttl_[place] == undefined) all_sttl_[place] = 0;
        all_sttl_[place] += all_sttl[a];
    });
    Object.keys(all_sttl_).forEach(function (place) {
        if (topUri_place[place] != undefined)
            topo_points.push({
                "lat": topUri_place[place]["properties"]["cornuData"]["coord_lat"],
                "lon": topUri_place[place]["properties"]["cornuData"]["coord_lon"],
                "place_name": place
            });
    });

    var lines_g = d3.select("#topos").append("g").attr("id", "sttlLines_g");
    var sttls_g = d3.select("#topos").append("g").attr("id", "sttls");
    topo_points.forEach(function (tp) {
        var sttl = tp["place_name"];
        var proj_sel = projection([tp['lon'], tp['lat']]);

        // sttl level circles
        var g = sttls_g.append("g").attr("id", sttl);
        g.append("circle")
            .attr("cx", proj_sel[0])
            .attr("cy", proj_sel[1])
            .attr("r", 0)
            .attr("fill", "#7c3659") // outer circle color in sttl level
            .attr("id", "c_out" + sttl);
        //"#862d59")// outer circle color in reg level
        //.attr("opacity", "0.7")
        //.attr("name",tp['item'])
        //.attr("freq", reg.freq)
        //.attr("orig_r", radius1);

        g.append("circle")
            .attr("cx", proj_sel[0])
            .attr("cy", proj_sel[1])
            .attr("r", 0)
            .attr("fill", "#ffd633") // inner circle color in sttl level
            .attr("id", "c_in" + sttl);
        //"orange")
        //.attr("opacity", "0.7")
        //.attr("name",tp['item'])
        //.attr("freq", reg.freq_resident)
        //.attr("orig_r", radius2);
    });

    for (var i = 0; i < topo_points.length; i++) {
        var tp_s = topo_points[i];
        var proj_s = projection([tp_s['lon'], tp_s['lat']]);
        for (var j = i + 1; j < topo_points.length; j++) {
            var tp_e = topo_points[j];
            var proj_e = projection([tp_e['lon'], tp_e['lat']]);
            var coordinates = [proj_s, proj_e];
            var line = lines_g.append("path")
                .attr("id", tp_s['place_name'] + tp_e['place_name'])
                .datum(coordinates)
                .attr("d", function (c) {
                    var d = {
                        source: c[0],
                        target: c[1]
                    };
                    var dx = d.target[0] - d.source[0],
                        dy = d.target[1] - d.source[1],
                        dr = Math.sqrt(dx * dx + dy * dy);
                    return "M" + d.source[0] + "," + d.source[1] + "A" + dr + "," + dr +
                        " 0 0,1 " + d.target[0] + "," + d.target[1];
                }).attr("opacity", "0.9")
                //.attr("act_color", colorScale_reg(edge_size_region[esr]))
                //.style("stroke", colorScale_reg(edge_size_region[esr]))//"green")
                //.style("stroke-width", edgeScaling(edge_size_region[esr]))
                //.attr("orig_edge_scale",edgeScaling(edge_size_region[esr]))
                .style("fill", "none")
                .style("prevEdges_changed_reg", "false")
                .style("changed", "false");

            if (index_sttls_lines[tp_s['place_name']] == undefined)
                index_sttls_lines[tp_s['place_name']] = [];
            index_sttls_lines[tp_s['place_name']].push(line);
            if (index_sttls_lines[tp_e['place_name']] == undefined)
                index_sttls_lines[tp_e['place_name']] = [];
            index_sttls_lines[tp_e['place_name']].push(line);
        }
    }
}
function zoomreset() {
    zoom.translate([0, 0]);
    zoom.scale(1);
    svg.selectAll("g").transition().attr("transform", "translate(" + zoom.translate().join(",") + ") scale(" + zoom.scale() + ")");
    svg.selectAll("g").selectAll("path")
        .attr("d", path.projection(projection))

    svg.selectAll("circle").attr("r", function (d) {
        return d3.select(this).attr("orig_r") / zoom.scale();
    });
}