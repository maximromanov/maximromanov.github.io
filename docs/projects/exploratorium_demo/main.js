/**
 * Created by rostam on 15.03.17.
 */
var ret = init_map();
var proj  = ret[0];
var onom_item_id = {};
var year = [], topo = [];
//load_csv_data(function (onom, topo, year, geoNW, netwo, rawData, jsonFile) {
load_data(function (datauni, jsonFile, places) {
    d3.select("#freqFilter").property("value", 3);
    d3.select("#freqFilter").on("input", function () {
        d3.select("#freqFilter-value").text(+this.value);
        d3.select("#freqFilter").property("value", +this.value);
    });

    var arabic_topURI = {};
    var topURI_arabic = {};
    var topURI_place = {};
    var regionCenter_coord = {};
    var arabicName_place = {};
    places['features'].forEach(function (feature) {
        if (feature['properties']["cornuData"]["cornu_URI"].indexOf("ROUT") == -1) {
            arabic_topURI[feature['properties']["cornuData"]["toponym_arabic"]] =
                feature['properties']["cornuData"]["cornu_URI"];
            topURI_arabic[feature['properties']["cornuData"]["cornu_URI"]] =
                feature['properties']["cornuData"]["toponym_arabic"];
            topURI_place[feature["properties"]["cornuData"]["cornu_URI"]] = feature;
            arabicName_place[feature["properties"]["cornuData"]["toponym_arabic"]] = feature;
            if (feature["properties"]["althurayyaData"]["visual_center"] == "yes") {
                regionCenter_coord[feature["properties"]["cornuData"]["region_code"]] =
                    {
                        "lat": feature["properties"]["cornuData"]["coord_lat"],
                        "lon": feature["properties"]["cornuData"]["coord_lon"],
                        "freq": 0,
                        "freq_resident": 0,
                        "region_code": feature["properties"]["cornuData"]["region_code"]
                    };
            }
        }
    });


    var onom_id_item = {};

    // ID - URI_PLACE - URI_REG - Resident/Visitor
    var table_id_place_reg_rv = [];
    var map_id_all = {};
    var min_yede = 1000;
    var max_yede = 0;
    var map_id_yede = {};
    var map_yede_id = {};
    datauni.forEach(function (on) {
        if(map_id_all[on['ID']] == undefined) map_id_all[on['ID']] = [];
        //map_id_all[on['ID']].push({'item':on['ITEM'],'cat':on['CAT']});
        if (on['CAT'] == "yede") {
            year.push({'id': on['ID'], 'item': on['ITEM']});
            var yede = parseInt(on['ITEM']);
            if (min_yede > yede) min_yede = yede;
            if (max_yede < yede) max_yede = yede;
            map_id_yede[on['ID']] = on['ITEM'];
            map_yede_id[on['ITEM']] = on['ID'];
            // for graph node titles
            map_id_all[on['ID']].push({'item':on['ITEM'],'cat':on['CAT'], 'translit': on['ITEM']});
        } else if (on['CAT'] == "desc") {
            if (onom_item_id[on['ITEM']] == undefined)
                onom_item_id[on['ITEM']] = {};
            onom_item_id[on['ITEM']][on['ID']] = 0;
            if (onom_id_item[on['ID']] == undefined)
                onom_id_item[on['ID']] = [];
            onom_id_item[on['ID']].push(on['ITEM']);

            if (jsonFile[on['ITEM']] != undefined) {
                // for graph node titles
                map_id_all[on['ID']].push({'item':on['ITEM'],'cat':on['CAT'], 'translit': jsonFile[on['ITEM']]['TRANSLIT']});
                if (topURI_place[jsonFile[on['ITEM']]['TOP_URI']] != undefined) {
                    table_id_place_reg_rv.push({
                        id: on['ID'],
                        uri_place: jsonFile[on['ITEM']]['TOP_URI'],
                        uri_region: topURI_place[jsonFile[on['ITEM']]['TOP_URI']]["properties"]["cornuData"]["region_code"],
                        rv: "R"
                    });
                }
            }
        } else if (on['CAT'] == "topo") {
            topo.push({'id': on['ID'], 'item': on['ITEM']});
            if (topURI_place[arabic_topURI[on['ITEM']]] != undefined) {
                // for graph node titles
                map_id_all[on['ID']].push({
                    'item': on['ITEM'],
                    'cat': on['CAT'],
                    'translit': topURI_place[arabic_topURI[on['ITEM']]]["properties"]["cornuData"]["toponym_translit"]
                });
                table_id_place_reg_rv.push({
                    id: on['ID'],
                    uri_place: arabic_topURI[on['ITEM']],
                    uri_region: topURI_place[arabic_topURI[on['ITEM']]]["properties"]["cornuData"]["region_code"],
                    rv: "V"
                });
            }
        }
    });
    document.getElementById("min_yede").innerHTML = min_yede + " AH";
    document.getElementById("max_yede").innerHTML = max_yede + " AH";

    var onom_temp_id_obj = {};
    var edge_size_sttls;
    var map_translit_arabic = {};
    function onom_ids(descriptor) {
        return onom_item_id[map_translit_arabic[descriptor]];
    }
    init_regions(proj, table_id_place_reg_rv, regionCenter_coord);
    init_sttls(proj, table_id_place_reg_rv, topURI_place);

    function onchange() {
        d3.select("#list_ids").html("");
        //d3.select("#details_header").style("display", "none");
        d3.select("#items_list").html("");
        d3.select("#details_area").html("");
        //d3.select("#details_area").style("height", "0px");
        var val = d3.select('#people').property('value');
        onom_temp_id_obj = onom_item_id[map_translit_arabic[val]];

        var item_count = [];
        // Create the object of item and count of the occurance (item, count).
        // This is used for relevant descriptors of the selector descriptor and the most relevant one
        // will be used in the second line chart. The other item will also be used for this chart.
        Object.keys(onom_temp_id_obj).forEach(function (otio) {
           onom_id_item[otio].forEach(function (oid) {
               if(item_count[oid] == undefined)
                   item_count[oid] = 0;
               item_count[oid]++;
           });
        });

        // List of related item
        var items = Object.keys(item_count).filter(function(d) { return item_count[d] > 1 });

        // Sort the items by using the keys to lookup the count values in the original item_count object:
        items.sort(function(a, b) { return item_count[b] - item_count[a] });
        var translit_items = [];
        var str="";
        var chart_str= Object.keys(onom_temp_id_obj).length + " — " + "("+ map_translit_arabic[val]+") "
            + jsonFile[map_translit_arabic[val]]["TRANSLIT"];
        items.forEach(function (i) {
            var newitem;
            var jsontranslit = "";
            if (jsonFile[i] !== undefined && i != val) {
                if (jsonFile[i]["TRANSLIT"] != val) {
                    newitem = jsonFile[i]["TRANSLIT"] + " (" + item_count[i] + ")";
                    translit_items.push(newitem);
                    jsontranslit = jsonFile[i]["TRANSLIT"];
                    str += '<span ' +
                        'onclick="click_freqDesc_of_timeGraph(\'' + i + '\',\'' + jsontranslit
                        + '\',\'' + map_translit_arabic[val]+ '\',\''+ chart_str + '\',\''+ item_count[i] + '\')">'
                        + newitem + '</span>, ';
                }
            }
            // else {
            //     newitem = i + "(" + item_count[i] + ")";
            //     translit_items.push(newitem);
            // }
        });
        //remove extra comma
        str=str.substr(0,str.length-2);

        d3.select("#items_list")
            .html(str);

        create_table_ids(onom_temp_id_obj, map_id_yede,min_yede,max_yede);
        d3.select("#scholar_name").html("Patterns of " + val);

        init_slider(year,onom_temp_id_obj, proj,regionCenter_coord,
            topURI_place,table_id_place_reg_rv,ret[1],min_yede,max_yede);

        var freq_onom_temp_id_obj = onom_item_id[items[1]];
        var freq_str= Object.keys(freq_onom_temp_id_obj).length
            + "-" + " ("+ items[1]+")"
            + jsonFile[items[1]]["TRANSLIT"];
        var freq_str= item_count[items[1]]
            + " — " + "("+ items[1]+") "
            + jsonFile[items[1]]["TRANSLIT"];
        prepare_time_graph(chart_str, freq_str, year, onom_temp_id_obj, freq_onom_temp_id_obj, "dual");
        // prepare_time_graph(str, year, onom_temp_id_obj, freq_onom_temp_id_obj, "dual");

        // prepare_time_graph(freq_str, year, freq_onom_temp_id_obj, "single");
        d3.select("#bottom-explain-text")
            .html(chart_str);
        d3.select("#fromto").html(min_yede + "-" + max_yede + " AH/"
            + AHToCE(min_yede)+"-"+AHToCE(max_yede)+" CE");
        edge_size_sttls = init_topo(proj,onom_temp_id_obj,regionCenter_coord,
            topURI_place,table_id_place_reg_rv,ret[1]);//ret[1] switch _reg

        gen_netw(onom_temp_id_obj,map_id_all,3);
    }



    var select_and_map = init_select_scholars(jsonFile);
    select_and_map[0].on("change", onchange);
    map_translit_arabic = select_and_map[1];
    onchange();

    function onchange_freq() {
        if (this.value == undefined)
            gen_netw(onom_temp_id_obj,map_id_all,3);
        else
            gen_netw(onom_temp_id_obj,map_id_all,this.value);
    }

    d3.select("#freqFilter").on("change", onchange_freq);

    return;

    // Boundaries for the Islamic world
    var latIW = [5, 45], lonIW = [-12, 83];
    // Boundaries for the Taʾrīḫ al-islām
    var latTI = [10, 48], lonTI = [-12, 75];
    // Boundaries to use
    var latLim = latTI, lonLim = lonTI;
    // Colors
    var waterCol = "grey90", landCol = "white";
});

function click_freqDesc_of_timeGraph(freq_item, freq_item_translit, descriptor, str, freq_item_count) {

    freq_item = freq_item.trim();
    var freq_onom_temp_id_obj = onom_item_id[freq_item];
    var freq_str= freq_item_count + " — " + "("+ freq_item +") " + freq_item_translit;
    var onom_temp_id_obj = onom_item_id[descriptor];


    prepare_time_graph(str, freq_str, year, onom_temp_id_obj, freq_onom_temp_id_obj);
}