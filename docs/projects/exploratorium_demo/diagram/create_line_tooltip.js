/**
 * Created by rostam on 17.06.17.
 */
function create_tooltip_elem(holder, id, color) {
    var tt_g;
    // Absolute value tooltip (blue)
    tt_g = holder.append("g").attr("id", id);
    tt_g.append("rect");
    tt_g.append("text")
        // .attr("class","tooltip")
        .style("fill", color)
        // .style("visibility","hidden");
    return tt_g;
    // Percentage value tooltip (red)
    // per_tt_g = holder.append("g")
    //     .attr("id", "linetooltip2")
    //
    // per_tt_g.append("rect");
    // per_tt_g.append("text").text("")
    //     .style("font-family", "Georgia, serif")
    //     .style("fill", "red")
    //     .style("font-size","12px");
    // per_tt_g.style("visibility","hidden");
}

function show_line_tooltip (tTip, x_axis, y_axis, x_padd, y_padd, type) {
    var t = tTip.select("text")
        .text(x_axis + " AH: " + (type == "abs" ? Math.floor(y_axis) : format_number(y_axis) ))
        // .style("visibility","visible");
    tTip.style("visibility", "visible");
    var bBox = t.node().getBBox();
    tTip.select("rect").attr("x", bBox.x - 2).attr("y", bBox.y - 2)
        .attr("width", bBox.width + x_padd).attr("height", bBox.height + y_padd)
        .style("fill-opacity", ".9").attr("fill", "lightgray");
    return bBox;
}
function show_dual_toolTip(x_pix, x_axis, y1_pix, y1_axis, y2_pix, y2_axis, tTipAbs, tTipPer, x_padd, y_padd) {
    var absBox = show_line_tooltip(tTipAbs, x_axis, y1_axis, x_padd, y_padd, "abs");
    var perBox = show_line_tooltip(tTipPer, x_axis, y2_axis, x_padd, y_padd, "per");
    // transform the tooltips based on the closeness from each other
    var y_diff = Math.abs(y1_pix - y2_pix);
    // Check if two tooltip boxes overlap
    if (y_diff <= absBox.height || y_diff <= perBox.height)
        // Move the upper one a bit above and the lower one below the suposed position!
        if (y1_pix < y2_pix) {
            translate_line_tooltip(tTipAbs, x_pix + x_padd, y1_pix - y_padd);
            translate_line_tooltip(tTipPer, x_pix + x_padd, y2_pix + y_padd);
        }
        else {
            translate_line_tooltip(tTipAbs, x_pix + x_padd, y1_pix + y_padd);
            translate_line_tooltip(tTipPer, x_pix + x_padd, y2_pix - y_padd);
        }
    // if the boxed do not overlap, just translate them close to the relevant circle
    else {
        translate_line_tooltip(tTipAbs, x_pix + x_padd, y1_pix - y_padd);
        translate_line_tooltip(tTipPer, x_pix + x_padd, y2_pix - y_padd);
    }

    // translate_line_tooltip(tTipPer, x_pix, y1_pix, y2_pix, absBox, perBox, x_padd, y_padd);
}
function translate_line_tooltip(tt_elem, xVal, yVal) {//Ydiff, red_box_height, blue_box_height, xPadd, yPadd) {

    // if (y_diff <= blue_box_height || y_diff <= red_box_height) {
        // check which color is located upper in the screen and then mover the upper one upper and the lower one lower
        tt_elem.attr("transform", "translate(" + xVal + "," + yVal + ")");
        // d3.select("#linetooltip_per_left").attr("transform", "translate(" + (xVal + xPadd) + ","
        //     + (y1 < y2 ? y2 + yPadd : y2 - yPadd) + ")")
    // }
    // else {
    //     tt_elem.attr("transform", "translate(" + (xVal + xPadd) + "," + (y1 - yPadd) + ")")
        // d3.select("#linetooltip_per_left").attr("transform", "translate(" + (xVal + xPadd) + "," + (y2 - xPadd) + ")")
    // }
}


function hide_line_toolTip (tip) {
    tip.style("visibility", "hidden");
}