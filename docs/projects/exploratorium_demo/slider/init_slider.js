/**
 * Created by rostam on 23.04.17.
 */

function init_slider(year,onom_temp_id_obj,proj,region_visualCentetLatLon,
                     topuri_place,table_id_place_reg_rv,switch_reg,min_yede,max_yede) {
    //var min_yede= 10000, max_yede=0;
    //year.forEach(function(y){
    //   if(onom_temp_id_obj[y['id']] == 0) {
    //       var tmp = parseInt(y['item']);
    //       if(min_yede > tmp) min_yede = tmp;
    //       if(max_yede < tmp) max_yede = tmp;
    //   }
    //});
    //document.getElementById("min_yede").innerHTML = min_yede + " AH";
    //document.getElementById("max_yede").innerHTML = max_yede + " AH";
    //document.getElementById("timeFilter-value").innerHTML = "From " + min_yede + " AH to " +max_yede +" AH";

    d3.select('#timeFilter').remove();
    d3.select("#cont_time_filter").append("div").attr("id","timeFilter");

    var slider = document.getElementById('timeFilter');

    document.getElementById('timeFilter').innerHTML = "";
    var input0 = document.getElementById('input-with-keypress-0');
    var input1 = document.getElementById('input-with-keypress-1');
    var inputs = [input0, input1];
    noUiSlider.create(slider, {
        start: [min_yede, max_yede],
        connect: true,
        range: {
            'min': min_yede,
            'max': max_yede
        },
        step:5
    });

    var updated_values;

    //d3.select("#filterbutton").select("*").remove();

    d3.select("#timeFilter_btn").on("click",function(){
        var onom_temp_id_obj_copy={};
        Object.keys(onom_temp_id_obj).forEach(function (otio) {
            onom_temp_id_obj_copy[otio] = onom_temp_id_obj[otio];
        });
        year.forEach(function (y) {
            var tmp = parseInt(y['item']);
            if(tmp > parseInt(updated_values[1]) || tmp < parseInt(updated_values[0]))
                onom_temp_id_obj_copy[y['id']] = -1;
        });
        init_topo(proj,onom_temp_id_obj_copy,region_visualCentetLatLon,
                topuri_place,table_id_place_reg_rv,switch_reg);
    });
    // create a flag controlling if the animation will continue or stop
    var continue_animating = false;
    d3.select("#anime_btn").on("click",function(){
        if (!continue_animating) {
            continue_animating = true;
            d3.select(this)
                .attr("src", "pause.jpg")//.style("width","30px");
        } else {
            continue_animating = false;
            d3.select(this).attr("src", "play.png")//.style("width","55px");
        }
        var move = parseInt(updated_values[0]); //min value;

        // var time;
        function frame() {
            // if the continue animation flag says STOP or the lower value has
            // reached the upper limit of the slider, then just return
            if (!continue_animating || parseInt(move) >= parseInt(updated_values[1])) {
                d3.select("#anime_btn").attr("src", "play.png");
                continue_animating = false;
                return;
            }
            // if the continue animation flag says STOP then just return
            // check the miliseconds from the last draw
            // var now = new Date().getTime(),
            //     dt = now - (time || now);
            //
            // time = now;
            if (move > max_yede) {

            }
            else {
                var onom_temp_id_obj_copy = {};
                Object.keys(onom_temp_id_obj).forEach(function (otio) {
                    onom_temp_id_obj_copy[otio] = onom_temp_id_obj[otio];
                });
                var cnt = 0;
                year.forEach(function (y) {
                    var tmp = parseInt(y['item']);
                    if (tmp < parseInt(move) || tmp > parseInt(updated_values[1])) {
                        onom_temp_id_obj_copy[y['id']] = -1;
                        cnt++;
                    }
                });
                init_topo(proj, onom_temp_id_obj_copy, region_visualCentetLatLon,
                    topuri_place, table_id_place_reg_rv, switch_reg);
                move += 10;
                slider.noUiSlider.set([parseInt(move), parseInt(updated_values[1])]);
                // request another frame
                requestAnimationFrame(frame);
            }
        }
        requestAnimationFrame(frame);

        // reset the slider and the map
        // slider.noUiSlider.set([min_yede, null]);
        // init_topo(proj, onom_temp_id_obj_copy, region_visualCentetLatLon,
        //     topuri_place, table_id_place_reg_rv, switch_reg);
    });
    // set the animation flag to STOP if the stop button is clicked
    d3.select("#anime_pause_btn").on("click",function(){
        continue_animating = false;
        d3.select(this).style("visibility", "hidden");
    });

    slider.noUiSlider.on('update', function (values, handle) {
        d3.select("#fromto").html(parseInt(values[0]) + "-" + parseInt(values[1]) + " AH/"
            + AHToCE(values[0])+"-"+AHToCE(values[1])+" CE");
        //document.getElementById("min_yede").innerHTML = parseInt(values[0]) + " AH";
        //document.getElementById("max_yede").innerHTML = parseInt(values[1]) + " AH";
        //document.getElementById("timeFilter-value").innerHTML = "from " + parseInt(values[0])
        //    + " AH to " + parseInt(values[1]) +" AH";
        updated_values = values;
        //inputs[handle].value = values[handle];
    });

    (function() {
        var lastTime = 0;
        var vendors = ['ms', 'moz', 'webkit', 'o'];
        for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
            window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
            window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame']
                || window[vendors[x]+'CancelRequestAnimationFrame'];
        }

        if (!window.requestAnimationFrame)
            window.requestAnimationFrame = function(callback, element) {
                var currTime = new Date().getTime();
                var timeToCall = Math.max(0, 16 - (currTime - lastTime));
                var id = window.setTimeout(function() { callback(currTime + timeToCall); },
                    timeToCall);
                lastTime = currTime + timeToCall;
                return id;
            };

        if (!window.cancelAnimationFrame)
            window.cancelAnimationFrame = function(id) {
                clearTimeout(id);
            };
    }());
}


