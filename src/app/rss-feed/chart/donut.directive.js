(function () {
    'use strict';

    angular
        .module('app.rssFeed')
        .directive('d3Donut', d3Donut);

    d3Donut.$inject = [];

    function d3Donut() {
        return {
            restrict: 'EA',
            scope:{
                data: '=',
                label: "=",
                currentDataSet: '='
            },
            link: function (scope, element, attrs, ctrl) {              
                var labels = scope.label;
                var w = 320,                       // width and height, natch
                    h = 320,
                    donutWidth = 70,
                    r = Math.min(w, h) / 2,        // arc radius
                    dur = 750,                     // duration, in milliseconds
                    color = d3.scaleOrdinal(d3.schemeCategory20b),
                    donut = d3.pie()
                        .value(function (d) {
                            return d;
                        })
                        .sort(null),
                    arc = d3.arc()
                        .innerRadius(r - donutWidth)
                        .outerRadius(r - 20);
                
                var svg = d3.select('[' + attrs.$attr.d3Donut + ']')
                    .append("svg")
                    .attr("width", w)
                    .attr("height", h)
                    .append('g');

                function draw(data) {
                    var arc_grp = svg.append("svg:g")
                        .attr("class", "arcGrp")
                        .attr("transform", "translate(" + (w / 2) + "," + (h / 2) + ")");

                    var label_group = svg.append("svg:g")
                        .attr("class", "lblGroup")
                        .attr("transform", "translate(" + (w / 2) + "," + (h / 2) + ")");

                    // center text
                    var center_group = svg.append("svg:g")
                        .attr("class", "ctrGroup")
                        .attr("transform", "translate(" + (w / 2) + "," + (h / 2) + ")");

                    // center label
                    var pieLabel = center_group.append("svg:text")
                        .attr("dy", ".35em").attr("class", "chartLabel")
                        .attr("text-anchor", "middle")
                        .text(data.label);

                    // draw arc path
                    var arcs = arc_grp.selectAll("path")
                        .data(donut(data.pct));
                    arcs.enter().append("svg:path")
                        .attr("stroke", "white")
                        .attr("stroke-width", 0.5)
                        .attr("fill", function (d, i) { return color(i); })
                        .attr("d", arc)
                        .each(function (d) { this._current = d });

                    // draw slice label
                    var sliceLabel = label_group.selectAll("text")
                        .data(donut(data.pct));
                    sliceLabel.enter().append("svg:text")
                        .attr("class", "arcLabel")
                        .attr("transform", function (d) { return "translate(" + arc.centroid(d) + ")"; })
                        .attr("text-anchor", "middle")
                        .text(function (d, i) { return labels[i]; });
                }
                
                scope.$watch('data', function (oldVal, newVal) {
                    if (oldVal) {
                        svg.selectAll("*").remove();
                        draw(scope.data);
                    }
                });
            }
        }
    };
})();
