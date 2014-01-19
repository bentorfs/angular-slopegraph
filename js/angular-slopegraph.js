angular.module('ngSlopeGraph', [])
    .directive('slopegraph', function () {

        function drawSlopeGraph(container, data, leftLabel, rightLabel, width, height) {

            container.html(""); // Clear current slopegraph
            var seenBoundingBoxes = [];

            var r = Raphael(container[0], width, height),
                leftLabelCss = { 'text-anchor': 'end', fill: "#000", 'font-size': "12px"},
                rightLabelCss = { 'text-anchor': 'start', fill: "#000", 'font-size': "12px"},
                leftHeaderCss = { 'text-anchor': 'end', fill: "#000", 'font-size': "12px", 'font-weight': 'bold'},
                rightHeaderCss = { 'text-anchor': 'start', fill: "#000", 'font-size': "12px", 'font-weight': 'bold'},
                labelWidth = 120,
                headerHeight = 50,
                footerHeight = 100,
                contentHeight = height - headerHeight - footerHeight,
                max = getMaxValue(data),
                min = getMinValue(data),
                scale = (contentHeight / (max - min));
            r.text(labelWidth, 10, leftLabel).attr(leftHeaderCss);
            r.text(width - labelWidth, 10, rightLabel).attr(rightHeaderCss);
            for (var i = 0; i < data.length; i++) {
                var leftKey = data[i] [0],
                    leftVal = data[i] [1],
                    rightKey = data[i] [2],
                    rightVal = data[i] [3];
                var startY = headerHeight + scale * (leftVal - min);
                var endY = headerHeight + scale * (rightVal - min);
                while (collides({x: 0, y: startY, w: labelWidth, h: 12}, seenBoundingBoxes)) startY++;
                while (collides({x: width - labelWidth, y: endY, w: labelWidth, h: 12}, seenBoundingBoxes)) endY++;
                if (leftKey) {
                    r.text(labelWidth, startY, leftKey).attr(leftLabelCss);
                }
                if (rightKey) {
                    r.text(width - labelWidth, endY, rightKey).attr(rightLabelCss);
                }
                if (leftVal && rightVal) {
                    var line = ["M", labelWidth + 5, " ", startY, "L", width - labelWidth - 5, " ", endY].join("");
                }
                var p = r.path(line);
            }
        };

        function collides(box, seenBoundingBoxes) {
            for (var i = 0, il = seenBoundingBoxes.length; i < il; i++) {
                var seen = seenBoundingBoxes[i];
                if (!(box.x > seen.x + seen.w || box.y > seen.y + seen.h || box.x + box.w < seen.x || box.y + box.h < seen.y)) return true;
            }
            seenBoundingBoxes.push(box);
            return false;
        }

        function getMinValue(data) {
            var result = Number.MAX_VALUE;
            for (var i = 0; i < data.length; i++) {
                if (data[i][1] && data[i][1] < result) {
                    result = data[i][1];
                }
                if (data[i][3] && data[i][3] < result) {
                    result = data[i][3];
                }
            }
            return result;
        }


        function getMaxValue(data) {
            var result = Number.MIN_VALUE;
            for (var i = 0; i < data.length; i++) {
                if (data[i][1] && data[i][1] > result) {
                    result = data[i][1];
                }
                if (data[i][3] && data[i][3] > result) {
                    result = data[i][3];
                }
            }
            return result;
        }

        return {
            restrict: 'E',
            replace: true,
            link: function compile(scope, element, attrs, controller) {
                var scopeVarWithData = attrs['slopedata'];
                scope.$watch(scopeVarWithData, function () {
                        var dataSet = scope.$eval(attrs['slopedata']);
                        if (dataSet) {
                            var leftLabel = attrs['leftlabel'];
                            var rightLabel = attrs['rightlabel'];
                            var width = attrs['width'];
                            var height = attrs['height'];
                            drawSlopeGraph(element, dataSet, leftLabel, rightLabel, width, height);
                        }
                    }
                );
            }
        }
            ;
    })
;
