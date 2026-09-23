/**
 * Created by rostam on 24.03.17.
 */
function init_select_scholars(jsonFile) {
    // var names = {};
    // onom.forEach(function (on) {
    //     names[on['item']] = 0;
    // });
    //
    // console.log("1 " + Object.keys(names).length);
    // var select = d3.select('#people');
    // var options = select
    //     .selectAll('option')
    //     .data(Object.keys(names)).enter()
    //     .append('option')
    //     .text(function (d) { return d; });
    var map_translit_arabic = {};
    var select = d3.select('#people');
    var options = select
        .selectAll('option')
        .data(Object.keys(jsonFile)).enter()
        .append('option')
        .text(function (d) {
            map_translit_arabic[jsonFile[d]['TRANSLIT']] = d;
            return jsonFile[d]['TRANSLIT'];
        });
    return [select,map_translit_arabic];
}