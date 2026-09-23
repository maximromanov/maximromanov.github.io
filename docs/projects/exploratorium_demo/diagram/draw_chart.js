/**
 * Created by rostam on 17.06.17.
 */

var transXPadd = 5,
    transYPadd = 10;

// function draw_line_dual(str, xdata, xname, y1data, y1name, y2data, y2name, domElem) {
//     d3.select("#" + domElem).selectAll("svg > *").remove();
//     var svg = d3.select("#" + domElem).select("svg");
//     d3.select("#dual_time_label")
//         .attr("class", "bilingual-excerpt")
//         // .attr("x", "300").attr("y", "1")
//         .attr("width", "100").attr("height", "100")
//         .style("fill", "black")
//         .style("font-size", "25px")
//         .style("font-family", "Amiri, Georgia, serif")
//         //.style("position","relative")
//         .style("left", "-270px")
//         .style("top", "50px")
//         .text(str);
//
//     var all_data = [];
//     all_data.push({"x": 0, "y1": 0, "y2": 0});
//     for (var i = 0; i < xdata.length; i++) {
//         all_data.push({"x": xdata[i], "y1": y1data[i], "y2": y2data[i]});
//     }
//
// // set the dimensions and margins of the graph
//     var w = document.getElementById(domElem).clientWidth;
//     var h = document.getElementById(domElem).clientHeight;
//     var margin = {top: 30, right: 40, bottom: 50, left: 80},
//         width = w - margin.left - margin.right,
//         height = h - margin.top - margin.bottom;
//
//     svg.attr("width", width + margin.left + margin.right)
//         .attr("height", height + margin.top + margin.bottom)
//         .append("g")
//         .attr("transform", "translate(" + margin.left + 20 + "," + margin.top + ")");
//     // svg.attr("transform", "translate(20,20)"); // move the svg
// //
// // set the ranges
//     var x = d3.scaleLinear().range([0, width]);
//     var y0 = d3.scaleLinear().range([height, 0]);
//     var y1 = d3.scaleLinear().range([height, 0]);
//
// // define the 1st line
//     var valueline = d3.line()
//         .curve(d3.curveMonotoneX)
//         .x(function (d) {
//             return x(d.x);
//         })
//         .y(function (d) {
//             return y0(d.y1);
//         });
//
// // define the 2nd line
//     var valueline2 = d3.line()
//         .curve(d3.curveMonotoneX)
//         .x(function (d) {
//             return x(d.x);
//         })
//         .y(function (d) {
//             return y1(d.y2);
//         });
//
// // append the svg object to the body of the page
// // appends a 'group' element to 'svg'
// // moves the 'group' element to the top left margin
//
//
//     // // format the data
//     // all_data.forEach(function (d) {
//     //     d.x = +d.x;
//     //     d.y1 = +d.y1;
//     //     d.y2 = +d.y2;
//     // });
//
//
//     // Scale the range of the data
//     x.domain([0, d3.max(all_data, function (d) {
//         return Math.max(d.x);
//     })]);
//     y0.domain([0, d3.max(all_data, function (d) {
//         return Math.max(d.y1);
//     })]);
//     y1.domain([0, d3.max(all_data, function (d) {
//         return Math.max(d.y2);
//     })]);
//
//     // Add the valueline path.
//     svg.append("g").attr("id", "holder").attr("transform", "translate(40,0)");
//     var holder = svg.select("#holder");
//     holder.append("path")
//         .data([all_data])
//         .attr("class", "axis line")
//         .style("stroke", "steelblue")
//         .attr("d", valueline);
//
//     // Add the valueline2 path.
//     holder.append("path")
//         .data([all_data])
//         .attr("class", "axis line")
//         .style("stroke", "red")
//         .attr("d", valueline2)
//     var transXPadd = 5,
//         transYPadd = 10;
//
// // Add dots to lines
//     all_data.forEach(function (d) {
//         var x_pix = x(d.x),
//             y_abs = y0(d.y1),
//             y_per = y1(d.y2);
//         holder.append("circle")
//             .attr("r", 3)
//             .attr("cx", x(d.x))
//             .attr("cy", y0(d.y1)).attr("fill", "steelblue").attr("stroke", "steelblue")
//             .on("mouseover", function () {
//                 show_dual_toolTip(x_pix, d.x, y_abs, d.y1, y_per, d.y2,
//                     abs_tt_g, per_tt_g, transXPadd, transYPadd);
//             }).on("mouseout", function () {
//             hide_line_toolTip(abs_tt_g);
//             hide_line_toolTip(per_tt_g);
//         });
//         holder.append("circle")
//             .attr("r", 3)
//             .attr("cx", x(d.x))
//             .attr("cy", y1(d.y2)).attr("fill", "red").attr("stroke", "red")
//             .on("mouseover", function () {
//                 // var x_val = x(d.x),
//                 //     y_abs = y0(d.y1),
//                 //     y_per = y1(d.y2);
//                 show_dual_toolTip(x_pix, d.x, y_abs, d.y1, y_per, d.y2,
//                     abs_tt_g, per_tt_g, transXPadd, transYPadd);
//             }).on("mouseout", function () {
//             hide_line_toolTip(abs_tt_g);
//             hide_line_toolTip(per_tt_g);
//         });
//     });
//
//     //var setTM = (element, m) -> element.transform.baseVal.initialize(element.ownerSVGElement.createSVGTransformFromMatrix(m))
//
//     // AH = (CE − 622) × 33 ÷ 32
//     // CE = AH + 622 − (AH ÷ 32)
//     // Add the X Axis
//     draw_ticks(holder,x,height);
//
//     svg.append("text").attr("text-anchor", "middle").style("font-weight","bold")
//         .attr("transform","translate("+width/2+","+(height+margin.top+25)+")").text(xname);
//
//     // Add the Y0 Axis
//     svg.append("text").attr("class", "Yaxix_numbers")
//         .attr("transform", "translate(" + 10 + "," + height / 2 + ")" + "rotate(-90)").text(y1name)
//         .style("fill", "steelblue");
//     svg.select("#holder").append("g").attr("class", "axisSteelBlue")//.style("fill", "axisSteelBlue")
//         .call(d3.axisLeft(y0)).append("text");
//
//     // Add the Y1 Axis
//     svg.select("#holder").append("g")
//         .attr("class", "axisRed")
//         .attr("transform", "translate( " + width + ", 0 )")
//         .call(d3.axisRight(y1));
//     svg.append("text").attr("class", "Yaxix_numbers")
//         .attr("transform", "translate(" + (width + 80) + "," + height / 2 + ")" + "rotate(-90)").text(y2name)
//         .style("fill", "red");
//     // create tooltip groups at the very end to be in front of other elements
//     var abs_tt_g = create_tooltip_elem(holder, "linetooltip_abs_left", "steelblue");
//     var per_tt_g = create_tooltip_elem(holder, "linetooltip_per_left", "red");
//
// }
//
// function draw_line_single(str, xdata, xname, y1data, y1name, domElem) {
//     // console.log(xdata)
//     // console.log(y1data)
//     // console.log(y1name)
//     d3.select("#" + domElem).selectAll("svg > *").remove();
//     var svg = d3.select("#" + domElem).select("svg");
//     d3.select("#single_time_label")
//         .attr("class", "bilingual-excerpt")
//         // .attr("x", "300").attr("y", "1")
//         .attr("width", "100").attr("height", "100")
//         .style("fill", "black")
//         .style("font-size", "25px")
//         .style("font-family", "Amiri, Georgia, serif")
//         //.style("position","relative")
//         .style("left", "-200px")
//         .style("top", "50px")
//         .text(str);
//
//     var all_data = [];
//     all_data.push({"x": 0, "y1": 0, "y2": 0});
//     for (var i = 0; i < xdata.length; i++) {
//         all_data.push({"x": xdata[i], "y1": y1data[i]});
//     }
//
// // set the dimensions and margins of the graph
//     var ww = d3.select("#" + domElem).style("width");//+svg.style("width");
//     var hh = d3.select("#" + domElem).style("height");//+svg.style("height");
//     //var w = +ww.substr(0, ww.indexOf("px"));
//     //var h = +hh.substr(0, hh.indexOf("px"));
//     var w = document.getElementById(domElem).clientWidth;
//     var h = document.getElementById(domElem).clientHeight;
//     var margin = {top: 30, right: 40, bottom: 50, left: 80},
//         width = w - margin.left - margin.right,
//         height = h - margin.top - margin.bottom;
//
//     svg.attr("width", width + margin.left + margin.right)
//         .attr("height", height + margin.top + margin.bottom)
//         .append("g")
//         .attr("transform", "translate(" + margin.left + 20 + "," + margin.top + ")");
//     svg.attr("transform", "translate(20,20)"); // move the svg
//
// // set the ranges
//     var x = d3.scaleLinear().range([0, width]);
//     var y0 = d3.scaleLinear().range([height, 0]);
//     // var y1 = d3.scaleLinear().range([height, 0]);
//
// // define the line
//     var valueline = d3.line()
//         .curve(d3.curveMonotoneX)
//         .x(function (d) {
//             return x(d.x);
//         })
//         .y(function (d) {
//             return y0(d.y1);
//         });
//
//     // format the data
//     // all_data.forEach(function (d) {
//     //     d.x = +d.x;
//     //     d.y1 = +d.y1;
//     //     d.y2 = +d.y2;
//     // });
//
//
//     // Scale the range of the data
//     x.domain([0, d3.max(all_data, function (d) {
//         return Math.max(d.x);
//     })]);
//     y0.domain([0, d3.max(all_data, function (d) {
//         return Math.max(d.y1);
//     })]);
//     // y1.domain([0, d3.max(all_data, function (d) {
//     //     return Math.max(d.y2);
//     // })]);
//
//     // Add the valueline path.
//     svg.append("g").attr("id", "holder").attr("transform", "translate(40,0)");
//     var holder = svg.select("#holder");
//     holder.append("path")
//         .data([all_data])
//         .attr("class", "line")
//         .style("stroke", "red")
//         .attr("d", valueline)
//
//     // Add the valueline2 path.
//     // holder.append("path")
//     //     .data([all_data])
//     //     .attr("class", "line")
//     //     .style("stroke", "red")
//     //     .attr("d", valueline2)
//     var transXPadd = 5,
//         transYPadd = 10;
//
// // Add dots to lines
//     all_data.forEach(function (d) {
//         var x_pix = x(d.x),
//             y_per = y0(d.y1);
//         holder.append("circle")
//             .attr("r", 3)
//             .attr("cx", x(d.x))
//             .attr("cy", y0(d.y1)).attr("fill", "red").attr("stroke", "red")
//         .on("mouseover", function () {
//             show_line_tooltip(per_tt_g, d.x, d.y1, transXPadd, transYPadd, "per");
//             translate_line_tooltip(per_tt_g, x_pix + transXPadd, y_per - transYPadd);//, 0, red_box, blue_box, xPadd, yPadd)
//         }).on("mouseout", function () {
//             hide_line_toolTip(per_tt_g);
//         });
//     });
//
//     // Absolute value tooltip (blue)
//     // var abs_tt_g = holder.append("g").attr("id", "linetooltip");
//     // abs_tt_g.append("rect")
//     // abs_tt_g.append("text").style("font-family", "Georgia, serif").style("fill", "steelblue");
//     // abs_tt_g.style("visibility","hidden");
//     // Percentage value tooltip (red)
//     // var per_tt_g = holder.append("g").attr("id", "linetooltip");
//     // per_tt_g.append("rect");
//     // per_tt_g.append("text").text("")
//     //     .style("font-family", "Georgia, serif")
//     //     .style("fill", "red");
//     // per_tt_g.style("visibility","hidden");
//     //var setTM = (element, m) -> element.transform.baseVal.initialize(element.ownerSVGElement.createSVGTransformFromMatrix(m))
//
//     // AH = (CE − 622) × 33 ÷ 32
//     // CE = AH + 622 − (AH ÷ 32)
//     // Add the X Axis
//     draw_ticks(holder,x,height);
//     // svg.append("text").attr("text-anchor", "middle").style("font-weight","bold")
//     //     .attr("transform","translate("+width/2+","+(height+margin.top+25)+")").text(xname);
//
//     // Add the Y Axis
//     svg.append("text").attr("class", "Yaxix_numbers")
//         .attr("transform", "translate(" + 10 + "," + height / 2 + ")" + "rotate(-90)").text(y1name)
//         .style("fill", "red");
//     holder.append("g").attr("class", "axisRed")//.style("fill", "axisSteelBlue")
//         .call(d3.axisLeft(y0)).append("text");
//
//
//     // create tooltip group at the very end to be in front of other elements
//     var per_tt_g = create_tooltip_elem(holder, "linetooltip_per_right", "red");
//
// }
//
// function draw_line_tripleY(str, xdata, xname, y1data, y1name, y2data, y2name,
//                         y3data, y3name, domElem) {
//
//     var svg = d3.select("#filter_dual")// + domElem).select("svg");
//     svg.html("")// + domElem).selectAll("svg > *").remove();
//     d3.select("#dual_time_label")
//         .attr("class", "bilingual-excerpt")
//         // .attr("x", "300").attr("y", "1")
//         .attr("width", "100").attr("height", "100")
//         .style("fill", "black")
//         .style("font-size", "25px")
//         .style("font-family", "Amiri, Georgia, serif")
//         //.style("position","relative")
//         .style("left", "-270px")
//         .style("top", "50px")
//         .text(str);
//
//     var all_data = [];
//     all_data.push({"x": 0, "y1": 0, "y2": 0, "y3": 0});
//     for (var i = 0; i < xdata.length; i++) {
//         all_data.push({"x": xdata[i], "y1": y1data[i], "y2": y2data[i], "y3": y3data[i]});
//     }
//
// // set the dimensions and margins of the graph
//     var w = document.getElementById(domElem).clientWidth;
//     var h = document.getElementById(domElem).clientHeight;
//     var margin = {top: 30, right: 100, bottom: 50, left: 100},
//         width = w - margin.left - margin.right,
//         height = h - margin.top - margin.bottom;
//
//     svg.attr("width", width + margin.left + margin.right)
//         .attr("height", height + margin.top + margin.bottom)
//         .append("g")
//         .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
//     //svg.attr("transform", "translate(20,20)"); // move the svg
//
// // set the ranges
//     var x = d3.scaleLinear().range([0, width]);
//     var y0 = d3.scaleLinear().range([height, 0]);
//     var y1 = d3.scaleLinear().range([height, 0]);
//     var y2 = d3.scaleLinear().range([height, 0]);
//
// // define the 1st line
//     var valueline = d3.line()
//         .curve(d3.curveMonotoneX)
//         .x(function (d) {
//             return x(d.x);
//         })
//         .y(function (d) {
//             return y0(d.y1);
//         });
//
// // define the 2nd line
//     var valueline2 = d3.line()
//         .curve(d3.curveMonotoneX)
//         .x(function (d) {
//             return x(d.x);
//         })
//         .y(function (d) {
//             return y1(d.y2);
//         });
//
//     // define the 3rd line
//     var valueline3 = d3.line()
//         .curve(d3.curveMonotoneX)
//         .x(function (d) {
//             return x(d.x);
//         })
//         .y(function (d) {
//             return y2(d.y3);
//         });
//
// // append the svg object to the body of the page
// // appends a 'group' element to 'svg'
// // moves the 'group' element to the top left margin
//
//
//     // // format the data
//     // all_data.forEach(function (d) {
//     //     d.x = +d.x;
//     //     d.y1 = +d.y1;
//     //     d.y2 = +d.y2;
//     // });
//
//
//     // Scale the range of the data
//     x.domain([0, d3.max(all_data, function (d) {
//         return Math.max(d.x);
//     })]);
//     y0.domain([0, d3.max(all_data, function (d) {
//         return Math.max(d.y1);
//     })]);
//     y1.domain([0, d3.max(all_data, function (d) {
//         return Math.max(d.y2);
//     })]);
//     y2.domain([0, d3.max(all_data, function (d) {
//         return Math.max(d.y3);
//     })]);
//
//     // Add the valueline path.
//     svg.append("g").attr("id", "holder")//.attr("transform", "translate(40,0)");
//     var holder = svg.select("#holder")//.attr("transform", "translate(40,0)");
//     holder.append("path")
//         .data([all_data])
//         .attr("class", "axis line")
//         //.attr("transform", "translate(70,0)")
//         .style("stroke", "steelblue")
//         .attr("d", valueline);
//
//     // Add the valueline2 path.
//     holder.append("path")
//         .data([all_data])
//         .attr("class", "axis line")
//         //.attr("transform", "translate(70,0)")
//         .style("stroke", "red")
//         .attr("d", valueline2);
//
//     // Add the valueline3 path.
//     holder.append("path")
//         .data([all_data])
//         .attr("class", "axis line")
//         //.attr("transform", "translate(70,0)")
//         .style("stroke", "green")
//         .attr("d", valueline3);
//
//     var transXPadd = 5,
//         transYPadd = 10;
//
// // Add dots to lines
//     all_data.forEach(function (d) {
//         var x_pix = x(d.x),
//             y_abs = y0(d.y1),
//             y_per = y1(d.y2);
//             y_freq = y2(d.y3);
//         holder.append("circle")
//             .attr("r", 3)
//             .attr("cx", x(d.x))
//             .attr("cy", y0(d.y1)).attr("fill", "steelblue").attr("stroke", "steelblue")
//             .on("mouseover", function () {
//                 show_dual_toolTip(x_pix, d.x, y_abs, d.y1, y_per, d.y2,
//                     abs_tt_g, per_tt_g, transXPadd, transYPadd);
//             }).on("mouseout", function () {
//             hide_line_toolTip(abs_tt_g);
//             hide_line_toolTip(per_tt_g);
//         });
//         holder.append("circle")
//             .attr("r", 3)
//             .attr("cx", x(d.x))
//             .attr("cy", y1(d.y2)).attr("fill", "red").attr("stroke", "red")
//             .on("mouseover", function () {
//                 // var x_val = x(d.x),
//                 //     y_abs = y0(d.y1),
//                 //     y_per = y1(d.y2);
//                 show_dual_toolTip(x_pix, d.x, y_abs, d.y1, y_per, d.y2,
//                     abs_tt_g, per_tt_g, transXPadd, transYPadd);
//             }).on("mouseout", function () {
//             hide_line_toolTip(abs_tt_g);
//             hide_line_toolTip(per_tt_g);
//         });
//         holder.append("circle")
//             .attr("r", 3)
//             .attr("cx", x(d.x))
//             .attr("cy", y2(d.y3)).attr("fill", "green").attr("stroke", "green")
//         //     .on("mouseover", function () {
//         //         // var x_val = x(d.x),
//         //         //     y_abs = y0(d.y1),
//         //         //     y_per = y1(d.y2);
//         //         show_dual_toolTip(x_pix, d.x, y_abs, d.y1, y_per, d.y2,
//         //             abs_tt_g, per_tt_g, transXPadd, transYPadd);
//         //     }).on("mouseout", function () {
//         //     hide_line_toolTip(abs_tt_g);
//         //     hide_line_toolTip(per_tt_g);
//         // });
//     });
//
//     //var setTM = (element, m) -> element.transform.baseVal.initialize(element.ownerSVGElement.createSVGTransformFromMatrix(m))
//
//     // AH = (CE − 622) × 33 ÷ 32
//     // CE = AH + 622 − (AH ÷ 32)
//     // Add the X Axis
//     draw_ticks(holder,x,height);
//
//     svg.append("text").attr("text-anchor", "middle").style("font-weight","bold")
//         .attr("transform","translate("+width/2+","+(height - margin.bottom)+")").text(xname);
//
//     // Add the Y0 Axis
//     holder.append("text").attr("class", "Yaxix_numbers")
//         .attr("transform", "translate(" + 8 + "," + height / 2 + ")" + "rotate(-90)").text(y1name)
//         .style("fill", "steelblue");
//     svg.select("#holder").append("g").attr("class", "axisSteelBlue")//.style("fill", "axisSteelBlue")
//         .call(d3.axisLeft(y0)).append("text");
//
//     // Add the Y1 Axis
//     holder.append("g")
//         .attr("class", "axisRed")
//         //.attr("transform", "translate( " + 70 + ", 0 )")
//         .call(d3.axisLeft(y1));
//     svg.append("text").attr("class", "Yaxix_numbers")
//         .attr("transform", "translate(" +  65 + "," + height / 2 + ")" + "rotate(-90)").text(y2name)
//         .style("fill", "red");
//
//
//     // Add the Y2 Axis
//     holder.append("g")
//         // .attr("class", "axisRed")
//         //.attr("transform", "translate( " + (width + 50) + ", 0 )")
//         .call(d3.axisRight(y2));
//     svg.append("text").attr("class", "Yaxix_numbers")
//         .attr("transform", "translate(" + (width + 100) + "," + height / 2 + ")" + "rotate(-90)").text(y3name)
//         .style("fill", "green");
//     // create tooltip groups at the very end to be in front of other elements
//     var abs_tt_g = create_tooltip_elem(holder, "linetooltip_abs_left", "steelblue");
//     var per_tt_g = create_tooltip_elem(holder, "linetooltip_per_left", "red");
//
// }

function update_chart_freq (xdata, xname, ydata, yname, old_elem, domElem) {
    d3.select("#" + old_elem).remove();

}

var create_valueLine_obj = function (x, dx, dy, y) {
    return d3.line()
        .curve(d3.curveMonotoneX)
        .x(function (d) {
            return x(dx);
        })
        .y(function (d) {
            return y(dy);
        });
};
var add_valueLine = function (holder, all_data, valueLine_obj, valueLine_id, color) {
    holder.append("path")
        .data([all_data])
        .attr("class", "axis line " + color)
        .attr("id", valueLine_id)
        // .style("stroke", color)
        .attr("d", valueLine_obj);
};
var add_circles = function (holder, x, dx, y, dy, x_pix, y_abs, y_per, abs_tt_g, per_tt_g, transXPadd, transYPadd, color) {
    holder.append("circle")
        .attr("r", 3)
        .attr("cx", x(dx))
        .attr("cy", y(dy)).attr("fill", color).attr("stroke", color)
        .on("mouseover", function () {
            var abs_tt_obj = {"pix_x": x_pix, "data_x": d.x, "y1_pix": y_abs, "data_y1": d.y1,
                "g_obj": abs_tt_g, "type": "abs"};
            var per_tt_obj = {"pix_x": x_pix, "data_x": d.x, "y1_pix": y_per, "data_y1": d.y2,
                "g_obj": per_tt_g, "type": "per"};
            var tt_objs = [abs_tt_obj, per_tt_obj];
            show_dual_toolTip(tt_objs, transXPadd, transYPadd);
        }).on("mouseout", function () {
        hide_line_toolTip(abs_tt_g);
        hide_line_toolTip(per_tt_g);
    });
};
function draw_chart_tippleY (str, freq_str, xdata, xname, y1data, y1name, y2data, y2name,
                             y3data, y3name, domElem) {
    var svg = d3.select("#" + domElem).select("svg");
    svg.html("")// + domElem).selectAll("svg > *").remove();
    d3.select("#dual_time_label")
        .text(str);

    d3.select("#freq_time_label")
        .text(freq_str);
    var all_data = [];
    all_data.push({"x": 0, "y1": 0, "y2": 0, "y3" : 0});
    for (var i = 0; i < xdata.length; i++) {
        all_data.push({"x": xdata[i], "y1": y1data[i], "y2": y2data[i], "y3": y3data[i]});
    }
    var w = document.getElementById(domElem).clientWidth,
        h = document.getElementById(domElem).clientHeight,
        margin = {top: 70, right: 100, bottom: 40, left: 200},
        width = w - margin.left - margin.right,
        height = h - margin.top - margin.bottom;

    svg.attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        // .append("g")
        // .attr("transform", "translate(" + margin.left + 20 + "," + margin.top + ")");
        // relocate the chart in the main holing svg to prevent getting cut
        .attr("transform", "translate(20,30)");

    var x = d3.scaleLinear().range([0, width]),
        y0 = d3.scaleLinear().range([height, 0]),
        y1 = d3.scaleLinear().range([height, 0]),
        y2 = d3.scaleLinear().range([height, 0]);

    // var abs_line_obj = create_valueLine_obj(x, d.x, y0, d.y1);
    // var per_line_obj = create_valueLine_obj(x, d.x, y1, d.y2);
    var abs_line_obj = d3.line()
        .curve(d3.curveMonotoneX)
        .x(function (d) {
            return x(d.x);
        })
        .y(function (d) {
            return y0(d.y1);
        });
    var per_line_obj = d3.line()
        .curve(d3.curveMonotoneX)
        .x(function (d) {
            return x(d.x);
        })
        .y(function (d) {
            return y1(d.y2);
        });
    // var freq_line_obj = create_valueLine_obj(x, d.x, d,y3, y2)
    var freq_line_obj = d3.line()
        .curve(d3.curveMonotoneX)
        .x(function (d) {
            return x(d.x);
        })
        .y(function (d) {
            return y2(d.y3);
        });

        x.domain([0, d3.max(all_data, function (d) {
        return Math.max(d.x);
    })]);
    y0.domain([0, d3.max(all_data, function (d) {
        return Math.max(d.y1);
    })]);
    y1.domain([0, d3.max(all_data, function (d) {
        return Math.max(d.y2);
    })]);
    y2.domain([0, d3.max(all_data, function (d) {
        return Math.max(d.y3);
    })]);
    svg.append("g").attr("id", "holder").attr("transform", "translate(40,40)");
    var holder = svg.select("#holder");

    // Add the abs_line path.
    add_valueLine(holder, all_data, abs_line_obj, "abs_line", "axis_path_blue");

    // Add the per_line path.
    add_valueLine(holder, all_data, per_line_obj, "per_line", "axis_path_red");
    // Add the freq_line path.
    add_valueLine(holder, all_data, freq_line_obj, "freq_line", "axis_path_green");


    // holder.append("path")
    //     .data([all_data])
    //     .attr("class", "axis line")
    //     .attr("id", "freq_line")
    //     .style("stroke", "green")
    //     .attr("d", freq_line);

    var transXPadd = 5,
        transYPadd = 10;

    all_data.forEach(function (d) {
        var x_pix = x(d.x),
            y_abs = y0(d.y1),
            y_per = y1(d.y2),
            y_freq = y2(d.y3);
        holder.append("circle")
            .attr("r", 3)
            .attr("cx", x(d.x))
            .attr("cy", y0(d.y1)).attr("class", "chart_circle blue_circle")
            .on("mouseover", function () {
                show_dual_toolTip(x_pix, d.x, y_abs, d.y1, y_per, d.y2,
                    abs_tt_g, per_tt_g, transXPadd, transYPadd);
            }).on("mouseout", function () {
            hide_line_toolTip(abs_tt_g);
            hide_line_toolTip(per_tt_g);
        });
        holder.append("circle")
            .attr("r", 3)
            .attr("cx", x(d.x))
            .attr("cy", y1(d.y2)).attr("class", "chart_circle red_circle")
            .on("mouseover", function () {
                show_dual_toolTip(x_pix, d.x, y_abs, d.y1, y_per, d.y2,
                  abs_tt_g, per_tt_g, transXPadd, transYPadd);
            }).on("mouseout", function () {
            hide_line_toolTip(abs_tt_g);
            hide_line_toolTip(per_tt_g);
        });
        // add_circles(holder, x, d.x, y2, d.y3, x_pix, y_abs, y_per, abs_tt_g, per_tt_g, transXPadd, transYPadd, "red");
        holder.append("circle")
            .attr("r", 3)
            .attr("cx", x(d.x))
            .attr("cy", y2(d.y3)).attr("class", "chart_circle green_circle")
            .on("mouseover", function () {
                show_line_tooltip(freq_tt_g, d.x, d.y3, transXPadd, transYPadd, "per");
                translate_line_tooltip(freq_tt_g, x_pix + transXPadd, y_freq - transYPadd);//, 0, red_box, blue_box, xPadd, yPadd)
            }).on("mouseout", function () {
            hide_line_toolTip(freq_tt_g);
        });
    });

    //var setTM = (element, m) -> element.transform.baseVal.initialize(element.ownerSVGElement.createSVGTransformFromMatrix(m))

    // AH = (CE − 622) × 33 ÷ 32
    // CE = AH + 622 − (AH ÷ 32)
    // Add the X Axis
    draw_ticks(holder,x,height);
    svg.append("text").attr("text-anchor", "middle").style("font-weight","bold")
        .attr("transform","translate("+ (width/2 + margin.left - margin.right) +","+
            (height + margin.top)+")").text(xname);

    // Add the Y0 Axis
    holder.append("text").attr("class", "Yaxix_numbers")
        .attr("transform", "translate(" + -35 + "," + height / 2 + ")" + "rotate(-90)")
        .text(y1name)
        .style("fill", "steelblue");
    holder.append("g").attr("class", "axis_blue")
        .call(d3.axisLeft(y0)).append("text");

    // Add the Y1 Axis
    holder.append("g")
        .attr("class", "axis_red")
        .attr("transform", "translate( " + -60  + ", 0 )")
        .call(d3.axisLeft(y1));
    svg.append("text").attr("class", "Yaxix_numbers")
        .attr("transform", "translate(0 ," + height / 2 + ")" + "rotate(-90)")
        .text(y2name)
        .style("fill", "red");

    svg.select("#holder").attr("transform","translate(100,0)");

    svg.append("g")
        .attr("class", "axis_green")
        .attr("transform", "translate( " + (width + 100) + ", 0 )")
        .call(d3.axisRight(y2));
    svg.append("text").attr("class", "Yaxix_numbers")
        .attr("transform", "translate(" + (width + 150) + "," + height / 2 + ")" + "rotate(-90)")
        .text(y3name)
        .style("fill", "green");

    var abs_tt_g = create_tooltip_elem(holder, "linetooltip_abs", "steelblue");
    var per_tt_g = create_tooltip_elem(holder, "linetooltip_per", "red");
    // create tooltip group at the very end to be in front of other elements
    var freq_tt_g = create_tooltip_elem(holder, "linetooltip_freq", "green");


    var per_line = d3.select("#per_line"),
        abs_line = d3.select("#abs_line"),
        freq_line = d3.select("#freq_line"),
        per_circles = d3.selectAll(".red_circle"),
        abs_circles = d3.selectAll(".blue_circle"),
        freq_circles = d3.selectAll(".green_circle"),
        chart_circles = d3.selectAll(".chart_circle"),
        axis_paths = d3.selectAll(".axis.line");
    per_line.on("click", function () {
        console.log("per")
        var per_class = per_line.attr("class");
        if ((per_class.indexOf("pale") == -1 && per_class.indexOf("bold") == -1)
            || per_class.indexOf("pale") != -1) {
            set_highlight(per_line, "bold");
            set_highlight(axis_paths.filter(".axis_path_blue, .axis_path_green"), "pale");
            set_highlight(chart_circles.filter(".blue_circle, .green_circle"), "pale");
            set_highlight(per_circles, "bold");
        }
        else if (per_class.indexOf("bold") != -1) {
            set_highlight(axis_paths.filter(".pale, .bold"), "default");
            set_highlight(chart_circles.filter(".pale, .bold"), "default");
        }
    });
    abs_line.on("click", function () {
        var abs_class = abs_line.attr("class");
        if ((abs_class.indexOf("pale") == -1 && abs_class.indexOf("bold") == -1)
            || abs_class.indexOf("pale") != -1) {
            set_highlight(abs_line, "bold");
            set_highlight(axis_paths.filter(".axis_path_red, .axis_path_green"), "pale");
            set_highlight(chart_circles.filter(".red_circle, .green_circle"), "pale");
            set_highlight(abs_circles, "bold");
        }
        else if (abs_class.indexOf("bold") != -1) {
            set_highlight(axis_paths.filter(".pale, .bold"), "default");
            set_highlight(chart_circles.filter(".pale, .bold"), "default");
        }
    });
    freq_line.on("click", function () {
        var freq_class = freq_line.attr("class");
        if ((freq_class.indexOf("pale") == -1 && freq_class.indexOf("bold") == -1)
            || freq_class.indexOf("pale") != -1) {
            set_highlight(freq_line, "bold");
            set_highlight(axis_paths.filter(".axis_path_red, .axis_path_blue"), "pale");
            set_highlight(chart_circles.filter(".red_circle, .blue_circle"), "pale");
            set_highlight(freq_circles, "bold");
        }
        else if (freq_class.indexOf("bold") != -1) {
            set_highlight(axis_paths.filter(".pale, .bold"), "default");
            set_highlight(chart_circles.filter(".pale, .bold"), "default");
        }
    });

}
function draw_ticks(holder, x, height) {
    var xtickg = holder.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x)
            .tickFormat(function (d) {
                var ce = parseInt(d + 622 - (d / 32));
                return d+"AH";
            }));
    var xtick2 = holder.append("g")
        .attr("transform", "translate(0," + (height + 15) + ")")
        .call(d3.axisBottom(x)
            .tickFormat(function (d) {
                var ce = parseInt(d + 622 - (d / 32));
                return ce+"CE";
            }));

    xtick2.selectAll("line").remove();
    xtick2.selectAll("path").remove();
}

function set_highlight(elem, highlight_type) {
    elem.attr("class", function(d) {
            var c = d3.select(this).attr("class");
            if (highlight_type == "pale") {
                    c = c.replace(" bold", "");
                if (c.indexOf("pale") == -1)
                    c += " pale";
                return c;
            }
            else if (highlight_type == "bold"){
                c = c.replace(" pale", "");
                if (c.indexOf("pale") == -1)
                    c += " bold";
                return c;
            }
            else if (highlight_type == "default"){
                c = c.replace(" pale", "");
                c = c.replace(" bold", "");
                return c;
            }
        });
}