/**
 * Created by rostam on 3/12/17.
 */
function round_any_ceiling(num, accuracy) {
    return num + ( accuracy - num % accuracy);
}
function format_number(num){
    return d3.format(".2f")(num);
}

function draw_graph(nodes, links, domElem) {
    var ww = d3.select("#" + domElem).style("width");//+svg.style("width");
    var hh = d3.select("#" + domElem).style("height");//+svg.style("height");
    //console.log(document.getElementById(domElem).clientWidth );
    //console.log(document.getElementById(domElem).clientHeight);
    var width = document.getElementById(domElem).clientWidth;
    var height = document.getElementById(domElem).clientHeight;
    d3.select("#" + domElem).select("#graph").selectAll("*").remove();
    d3.select("#" + domElem).select("svg").attr("width", width).attr("height", height);
    var svg = d3.select("#graph");
    //filterRE = "#CAT#(topo|onom|onto)"
    var type_color = {
        'topo': '#862d59',//'blue',
        'desc': 'orange',
        'yede': "#ffe6e6",//'red'
        'save': "gray"
    };

    var color = d3.scaleOrdinal(d3.schemeCategory20);
    var simulation = d3.forceSimulation()
        .force("link", d3.forceLink().id(function (d) {
            return d.item;
        }))
        .force("charge", d3.forceManyBody().strength(-180))
        .force("center", d3.forceCenter(width / 2, height / 2));

    var link = svg.append("g")
        .attr("class", "links")
        .selectAll("line")
        .data(links)
        .enter().append("line")
        .attr("stroke-width", function (d) {
            return Math.sqrt(d.freq / 10 + 1);
        });

    var node = svg.append("g")
        .attr("class", "nodes")
        .selectAll("circle")
        .data(nodes)
        .enter().append("circle").attr("r", "4")
        .attr("r", function (d) {
            return Math.sqrt(d.freq) + 6;
        })
        .attr("fill", function (d) {
            return type_color[d.type];//color(d.node_freq);
        })
        .on("mouseover",function (d) {
            d3.selectAll(".nodelabels").style("visibility","hidden");
            d3.select("#"+"nodelabel"+d.item).style("visibility","visible");
        //    console.log(d3.select(this).select("circle"));
        })
        .call(d3.drag()
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended));

    var nodelabels = svg.selectAll(".nodelabel")
        .data(nodes)
        .enter()
        .append("text")
        .text(function(d){return d.item;})
        .style("visibility","hidden")
        .style("font-family", "amiri, Georgia, serif")
        .style("font-size",16)
        .style("font-weight","bold")
        .attr("class","nodelabels")
        .attr('id',function(d){return "nodelabel"+d.item;});

    node.attr("title", function (d) {
        if (d.type != 'yede')
            return d.item + " - " + d.translit;
        else
            return d.item;
    });
    node.each(function (d) {
            d.radius = d.freq;
        });

    simulation
        .nodes(nodes)
        .on("tick", ticked);

    simulation.force("link")
        .links(links);

    //simulation.force("link", d3.forceLink().distance(2));

    function ticked() {
        //
        // var q = d3.quadtree(nodes),
        //     i = 0,
        //     n = nodes.length;
        //
        // while (++i < n) q.visit(collide(nodes[i]));

        link
            .attr("x1", function (d) {
                return d.source.x;
            })
            .attr("y1", function (d) {
                return d.source.y;
            })
            .attr("x2", function (d) {
                return d.target.x;
            })
            .attr("y2", function (d) {
                return d.target.y;
            });

        node
            .attr("cx", function (d) {
                return d.x = Math.max(15, Math.min(width - 15, d.x));
            })
            .attr("cy", function (d) {
                return d.y = Math.max(15, Math.min(height - 15, d.y));
            });

        nodelabels.attr("x", function(d) { return d.x = Math.max(15, Math.min(width - 15, d.x)); })
                  .attr("y", function(d) { return d.y = Math.max(15, Math.min(height - 15, d.y)); });

//        node.each(collide(35));
    }

    function collide(node) {
        var r = node.radius + 16,
            nx1 = node.x - r,
            nx2 = node.x + r,
            ny1 = node.y - r,
            ny2 = node.y + r;
        return function(quad, x1, y1, x2, y2) {
            if (quad.point && (quad.point !== node)) {
                var x = node.x - quad.point.x,
                    y = node.y - quad.point.y,
                    l = Math.sqrt(x * x + y * y),
                    r = node.radius + quad.point.radius;
                if (l < r) {
                    l = (l - r) / l * .5;
                    node.x -= x *= l;
                    node.y -= y *= l;
                    quad.point.x += x;
                    quad.point.y += y;
                }
            }
            return x1 > nx2 || x2 < nx1 || y1 > ny2 || y2 < ny1;
        };
    }

    function dragstarted(d) {
        if (!d3.event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
    }

    function dragged(d) {
        d.fx = d3.event.x;
        d.fy = d3.event.y;
    }

    function dragended(d) {
        if (!d3.event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
    }

    var topo_g = svg.append("g");
    topo_g.append("circle")
        .attr("r", 10).attr("cx", 50).attr("cy", height - 160)
        .attr("fill", type_color['topo']).style("stroke", "white");
    topo_g.append("text")
        .attr("x", 65).attr("y", height - 155)
        .attr("id", "switchtext").style("cursor", "default")
        .attr("fill", "black")
        //.attr("text-anchor","middle")
        .style("font-weight", "bold")
        .text("Topo");
    topo_g.on("click", function () {
        if (d3.select(this).select("circle").attr("fill") == type_color['topo']) {
            d3.select(this).select("circle").attr("fill", "lightgray");
            node.attr("fill", function (d) {
                if (d.type != 'topo')
                    return 'lightgray';
                else
                    return type_color['topo'];
            });
        } else {
            d3.select(this).select("circle").attr("fill", type_color['topo']);
            node.attr("fill", function (d) {
                return type_color[d.type];
            });
        }
    });

    var desc_g = svg.append("g");
    desc_g.append("circle")
        .attr("r", 10).attr("cx", 50).attr("cy", height - 135)
        .attr("fill", type_color['desc']).style("stroke", "white");
    desc_g.append("text")
        .attr("x", 65).attr("y", height - 130)
        .attr("id", "switchtext").style("cursor", "default")
        .attr("fill", "black")
        //.attr("text-anchor","middle")
        .style("font-weight", "bold")
        .text("Desc");
    desc_g.on("click", function () {
        if (d3.select(this).select("circle").attr("fill") == type_color['desc']) {
            d3.select(this).select("circle").attr("fill", "lightgray");
            node.attr("fill", function (d) {
                if (d.type != 'desc')
                    return 'lightgray';
                else
                    return type_color['desc'];
            });
        } else {
            d3.select(this).select("circle").attr("fill", type_color['desc']);
            node.attr("fill", function (d) {
                return type_color[d.type];
            });
        }
    });

    var yede_g = svg.append("g");
    yede_g.append("circle")
        .attr("r", 10).attr("cx", 50).attr("cy", height - 110)
        .attr("fill", type_color['yede']).style("stroke", "white");
    yede_g.append("text")
        .attr("x", 65).attr("y", height - 105)
        .attr("id", "switchtext").style("cursor", "default")
        .attr("fill", "black")
        //.attr("text-anchor","middle")
        .style("font-weight", "bold")
        .text("Yede");
    yede_g.on("click", function () {
        if (d3.select(this).select("circle").attr("fill") == type_color['yede']) {
            d3.select(this).select("circle").attr("fill", "lightgray");
            node.attr("fill", function (d) {
                if (d.type != 'yede')
                    return 'lightgray';
                else
                    return type_color['yede'];
            });
        } else {
            d3.select(this).select("circle").attr("fill", type_color['yede']);
            node.attr("fill", function (d) {
                return type_color[d.type];
            });
        }
    });

    svg.append("circle")
        .attr("r", 10).attr("cx", width - 165).attr("cy", height - 110)
        .attr("fill", type_color['save']).style("stroke", "white");
    svg.append("text")
        .attr("x", width - 150).attr("y", height - 105)
        .attr("id", "switchtext").style("cursor", "default")
        .attr("fill", "black")
        //.attr("text-anchor","middle")
        .style("font-weight", "bold")
        .text("Save as png").on("click", function () {

        d3.select("#graph_presented").selectAll("line").style("stroke", "gray");
        var svgString = getSVGString(d3.select("#graph_presented").node());
        svgString2Image(svgString, width, height, 'png', save);
        function save(dataBlob, filesize) {
            saveAs(dataBlob, 'graph.png'); // FileSaver.js function
        }
    });
}

function draw_d3_heatmap(domElem, data) {
    var ww = d3.select("#chart").style("width");//+svg.style("width");
    var hh = d3.select("#chart").style("height");//+svg.style("height");
    var w = +ww.substr(0, ww.indexOf("px"));
    var h = +hh.substr(0, hh.indexOf("px"));
    var margin = {top: 50, right: 0, bottom: 100, left: 30},
        width = w - margin.left - margin.right,
        height = h - margin.top - margin.bottom,
        gridSize = Math.floor(width / 85),
        legendElementWidth = gridSize * 2,
        buckets = 9,
        colors = ["#ffffd9", "#edf8b1", "#c7e9b4", "#7fcdbb", "#41b6c4", "#1d91c0", "#225ea8", "#253494", "#081d58"];

    var srcs = {};
    var tgts = {};
    var cnt1 = 0, cnt2 = 0;
    data.forEach(function (d) {
        if (srcs[d['src']] == undefined) {
            srcs[d['src']] = cnt1;
            cnt1++;
        }
        if (tgts[d['tgt']] == undefined) {
            tgts[d['tgt']] = cnt2;
            cnt2++;
        }
    });

    d3.select("#chart").selectAll("svg > *").remove();
    var svg = d3.select("#chart").select("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + 5 + ")");

    var dayLabels = svg.selectAll(".dayLabel")
        .data(Object.keys(tgts))
        .enter().append("text")
        .text(function (d) {
            return d;
        })
        .attr("x", margin.left)
        .attr("y", function (d, i) {
            return height - (i * gridSize) + margin.bottom - 10 - 10;
        })
        .style("text-anchor", "end")
        .attr("transform", "translate(0," + gridSize / 1.5 + ")")
        .attr("fill", "black").attr("font-size", "12px").style("font-family", "Amiri");

    var left = margin.left + 10;

    var timeLabels = svg.selectAll(".timeLabel")
        .data(Object.keys(srcs))
        .enter().append("text")
        .text(function (d) {
            return d;
        })
        .attr("transform", function (d, i) {
            return "translate(" + ( i * gridSize + left) + "," + (height + margin.top + margin.bottom - 10) + ")"
                + "translate(" + gridSize / 2 + ", -30)rotate(-90)";
        })
        .style("text-anchor", "end")
        .attr("class", "black").attr("font-size", "12px").style("font-family", "Amiri");

    // var timeLabels = svg.selectAll(".timeLabel")
    //     .data(Object.keys(srcs))
    //     .enter().append("text")
    //     .text(function (d) {
    //         return d;
    //     })
    //     .attr("x", function (d, i) {
    //         return i * gridSize;
    //     })
    //     .attr("y", 0)
    //     .attr("transform", function(d, i) {
    //         return "translate(" + ( i * gridSize) + ",0)"
    //             + "translate(" + gridSize / 2 + ", -6)rotate(-90)";
    //     } )
    //     .style("text-anchor", "middle")
    //     .attr("transform", "translate(" + gridSize / 2 + ", -6)")
    //     .attr("fill", "gray");
    //
    // timeLabels.each(function (d,i) {
    //     var x = d3.select(this).attr("x");
    //     var y = d3.select(this).attr("y");
    //     d3.select(this)
    //         .attr("transform","translate("+x +"," + y +")"+"rotate(90)");
    //     });

    var colorScale = d3.scaleQuantile()
        .domain([0, buckets - 1, d3.max(data, function (d) {
            return d.freq;
        })])
        .range(colors);

    var cards = svg.selectAll(".hour").data(data);
    // , function (d) {
    //     //console.log(data);
    //     return d.target + ':' + d.source;
    // });

    // cards.append("title");
    cards.enter().append("rect")
        .attr("x", function (d) {
            return srcs[d.src] * gridSize;
        })
        .attr("y", function (d) {
            return height - tgts[d.tgt] * gridSize + margin.bottom - 10 - 10;
        })
        .attr("rx", 4)
        .attr("ry", 4)
        .attr("class", "hour bordered")
        .attr("width", gridSize)
        .attr("height", gridSize)
        //.style("fill", colors[0])
        //.merge(cards)
        //.transition()
        //.duration(1000)
        .style("fill", function (d) {
            return colorScale(d.freq)
        }).attr("transform", "translate(" + left + ",0)");
    // cards.select("title").text(function (d) {
    //     return d.freq
    // });

    cards.exit().remove();

    var legend = svg.selectAll(".legend")
        .data([0].concat(colorScale.quantiles()), function (d) {
            return d;
        });

    var legend_g = legend.enter().append("g")
        .attr("class", "legend");

    legend_g.append("rect")
        .attr("x", function (d, i) {
            return width - 40;
        })
        .attr("y", function (d, i) {
            return legendElementWidth * i;
        })
        .attr("width", 20)
        .attr("height", legendElementWidth)
        .style("fill", function (d, i) {
            return colors[i];
        })//.attr("transform","translate("+600 + "," + margin.top + ")rotate(1)");

    // legend_g.append("text")
    //     .attr("class", "mono")
    //     .text(function (d) {
    //         return "≥ " + Math.round(d);
    //     })
    //     .attr("x", function (d, i) {
    //         return legendElementWidth * i;
    //     })
    //     .attr("y", height + gridSize);

    legend.exit().remove();
}
