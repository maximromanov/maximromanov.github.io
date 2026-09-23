/**
 * Created by rostam on 24.03.17.
 */
function AHToCE(ah) {
    return parseInt((ah - ah / 33) + 622);
}

var year_range_freq = function (year, periodStep) {
    var ah_low = 100000, ah_high = 0,
        year_freq_all = {};

        year.forEach(function (y) {
        var num = parseInt(y['item']);
        var tmp = num + (periodStep - num % periodStep);
        if (tmp > ah_high) ah_high = tmp;
        if (tmp < ah_low) ah_low = tmp;
        if (year_freq_all[tmp] == undefined)
            year_freq_all[tmp] = 0;
        year_freq_all[tmp]++;
    });
        return [ah_low, ah_high, year_freq_all]
};
function prepare_chart_values (year, year_freq_all, periods, onom_temp_id_obj) {

    var max_freq = 0,
        max_freq_item;
    Object.keys(year_freq_all).forEach(function (item) {
        if(year_freq_all[item] > max_freq) {
            max_freq = year_freq_all[item];
            max_freq_item = item;
        }
    });
// TODO: How to use code below?!
    // var xlabVarAH = d3.range(0, ah_high, 100);
    // var xlabVarCE = [];
    // xlabVarAH.forEach(function (x) {
    //     xlabVarCE.push((x - x / 33) + 622);
    // });

    var year_freq = {};
    periods.forEach(function (p) {
        year_freq[p] = 0;
    });

    var year_temp = year.filter(function (y) {
        return onom_temp_id_obj[y['id']] == 0;
    });
    periods.forEach(function (p) {
        year_temp.forEach(function (yt) {
            if (yt['item'] == p) {
                year_freq[p]++;
            }
        })
    });

return year_freq;
}

var calc_freq_percent = function (year_freq, year_freq_all) {
    var year_freq_percent = [];
    Object.keys(year_freq).forEach(function (yf) {
        if (year_freq_all[yf] != undefined)
            year_freq_percent.push((year_freq[yf] / year_freq_all[yf]) * 100);
        else year_freq_percent.push(0)
    });
    return year_freq_percent;
};


function prepare_time_graph(str, freq_str, year, onom_temp_id_obj, freq_onom_temp_id_obj) {
    var periodStep = 20;
    var year_min_max_freq = year_range_freq(year, periodStep);
    var year_freq_all = year_min_max_freq[2];

    // start periods from 0 (instead of ah_low)
    // in order to give "0" values to those steps in x-axis that have not "Y" value
    var periods = d3.range(0, year_min_max_freq[1], periodStep);
    var year_freq = prepare_chart_values(year, year_freq_all, periods, onom_temp_id_obj);
    var freq_year_freq = prepare_chart_values(year, year_freq_all, periods, freq_onom_temp_id_obj);

    var year_freq_percent = calc_freq_percent(year_freq, year_freq_all);
    var freq_year_freq_percent = calc_freq_percent(freq_year_freq, year_freq_all);
    draw_chart_tippleY(str, freq_str,
        periods,
        "Years according to the Islamic Lunar (hijrī) Calendar",
        Object.keys(year_freq).map(function(key) {
            return year_freq[key];
        }),
        //Object.values(year_freq), // not supported in some browsers
        "Absolute Frequencies",
        year_freq_percent,
        "Relative Frequencies (%)",
        freq_year_freq_percent,
        "Relative Frequencies (%) - Corresponding Descriptor",
        "freqs");
}