/**
 * Created by rostam on 29.04.17.
 */
function create_table_ids(onom_temp_id_obj, map_id_yede, min_yede,max_yede) {
    //var table = d3.select("#list_ids");
    var table = d3.select("#list_ids");
    var row_size = 8;
    //var data = Object.keys(onom_temp_id_obj);
    var map_id_header = {};
    var map_header_id = {};

    d3.select('#source_timeFilter').remove();
    d3.select("#source_time_filter").append("div").attr("id","source_timeFilter");

    var slider = document.getElementById('source_timeFilter');
    d3.select("#min_yede_source").html(min_yede+" AH");
    d3.select("#max_yede_source").html(max_yede+" AH");
    noUiSlider.create(slider, {
        start: [min_yede, max_yede],
        connect: true,
        range: {
            'min': min_yede,
            'max': max_yede
        },
        step: 5
    });

    var updated_values;
    slider.noUiSlider.on('update', function (values, handle) {
        d3.select("#timeframeselected").html("  ("+parseInt(values[0]) + "-" + parseInt(values[1]) + " AH/"
        + AHToCE(values[0]) + "-" + AHToCE(values[1]) + " CE)");

        updated_values = values;
    });

    d3.json("sources/0748Dhahabi.TarikhIslam.JK007088/id_header_map.json", function (data) {
        Object.keys(data).forEach(function (id) {
            map_id_header[id] = data[id];
            map_header_id[data[id]] = id;
        });
        var table_data = Object.keys(onom_temp_id_obj);
        for (var i = 0; i < table_data.length; i += 3) {
            var curr_yede = map_id_yede[table_data[i]];
            table.append("li")
                .style("margin-right", "40px")
                .style("direction", "rtl")
                .text(curr_yede + " - " + map_id_header[table_data[i]]).on("click", function () {
                    var this_text = d3.select(this).text();
                    var this_name = this_text.split(" - ")[1];
                    //var this_yede = this_text.split(" - ")[0];

                    var name = "sources/0748Dhahabi.TarikhIslam.JK007088/"
                        + map_header_id[this_name] + ".json";
                    d3.json(name, function (data) {
                        var details_table = d3.select("#details_area");
                        details_table.html("");
                        //details_table.append("h2")
                        //    .html(this_yede + " - " +data['header'])
                        //    .append("hr");
                        details_table.append("div").append("p")
                            .style("margin-right", "20px")
                            //.style("margin", "0")// moved to index.css as a css fr any p element
                            //.style("padding", "0")
                            .style("line-height", "200%")
                            .html(data['text'])
                        //.style("white-space","pre-line");
                        details_table.append("p")
                            .style("margin", "20px").html(data['source'])
                    });
                });
        }
    });

    d3.select("#sourceFilter_btn").on("click", function () {
        table.selectAll("*").remove();
        d3.json("sources/0748Dhahabi.TarikhIslam.JK007088/id_header_map.json", function (data) {
            Object.keys(data).forEach(function (id) {
                map_id_header[id] = data[id];
                map_header_id[data[id]] = id;
            });
            var table_data = Object.keys(onom_temp_id_obj);
            for (var i = 0; i < table_data.length; i += 3) {
                var curr_yede = map_id_yede[table_data[i]];
                if(curr_yede < updated_values[1] && curr_yede > updated_values[0]) {
                    table.append("li")
                        .style("margin-right", "40px")
                        .style("direction", "rtl")
                        .text(curr_yede + " - " + map_id_header[table_data[i]]).on("click", function () {
                            var this_text = d3.select(this).text();
                            var this_name = this_text.split(" - ")[1];
                            //var this_yede = this_text.split(" - ")[0];

                            var name = "sources/0748Dhahabi.TarikhIslam.JK007088/"
                                + map_header_id[this_name] + ".json";
                            d3.json(name, function (data) {
                                var details_table = d3.select("#details_area");
                                details_table.html("");
                                //details_table.append("h2")
                                //    .html(this_yede + " - " +data['header'])
                                //    .append("hr");
                                details_table.append("div").append("p")
                                    .style("margin-right", "20px").html(data['text'])
                                    .style("margin", "0")
                                    .style("padding", "0")
                                    .style("line-height", "100%")
                                //.style("white-space","pre-line");
                            });
                        });
                }
            }
        });
    });

    //
    // for (var i = 0; i < row_size; i++) {
    //     var tr = table.append("tr");
    //     for (var j = i * row_size; j < (i + 1) * row_size; j++)
    //         if (j < data.length)
    //             tr.append("td").text(data[j]).on("click", function () {
    //                 var name = "sources/0748Dhahabi.TarikhIslam.JK007088/" + d3.select(this).text() + ".json";
    //                 d3.json(name, function (data) {
    //                     var table = d3.select("#details");
    //                     table.selectAll("*").remove();
    //
    //                     data.split("\n").forEach(function (d) {
    //                         var tr = table.append("tr");
    //                         td.append("td").text(k)
    //                         var tmp = d.split(" ");
    //                         var key = tmp[1];
    //                         var value = tmp[3];
    //                         var spl_vals = [];
    //                         if (key != undefined) {
    //                             if (key.indexOf("LOCATIONS") != -1) {
    //                                 spl_vals = value.split(",")
    //                             }
    //                             if (key.indexOf("NISBAS") != -1) {
    //                                 spl_vals = d.substr(d.indexOf("NISBAS #") + 9).split(";");
    //                             }
    //                         }
    //                         tr.append("td").text(key);
    //                         if (spl_vals.length == 0)
    //                             tr.append("td").text(value);
    //                         else {
    //                             var tarea = tr.append("textarea")
    //                                 .style("width", "90%").style("font-family", "Georgia, serif")
    //                                 .style("height", "50px");
    //
    //                             var buildstr = "";
    //                             spl_vals.forEach(function (val) {
    //                                 buildstr += val + "\n";
    //                                 //sel.append("option").html(val);
    //                             });
    //                             tarea.html(buildstr);
    //                         }
    //                     });
    //                 });
    //             });
    // }
}
