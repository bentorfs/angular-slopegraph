# AngularJS slopegraphs

An AngularJS directive to easily create slopegraphs (for more info on slopegraphs: http://charliepark.org/slopegraphs/)

The rendering code is based on an implementation by Kevin Marks, found here: https://github.com/kevinmarks/slopegraph. It depends on the Raphael SVG library

## Example rendering
![Alt text](/img/angular-slopegraph.png)

## Example usage

Import the necessary JS. angular-slopegraph.js depends on Raphael (http://raphaeljs.com/)
```
<script src="raphael.js"></script>
<script src="angular-slopegraph.js"></script>
```

Create a slopegraph as follows
```
<slopegraph slopedata="slopeData" leftlabel="1970" rightlabel="1979" width="500" height="900"></slopegraph>
```
slopeData refers to a scope variable that contains the data. The data must be a 2-dimensional array, where each element is a list of 4 elements: 
- The left label
- The value behind the left label
- The right label
- The value behind the right label

Higher values will be displayed lower on the graph. For example, the example rendering above is backed by this data:

```javascript
angular.module('myApp', ['ngSlopeGraph']).
    controller('MyController', ['$scope', function ($scope) {

        $scope.slopeData = [
            ['Sweden', 46.9, 'Sweden', 57.4],
            ['Netherlands', 44.0, 'Netherlands', 55.8],
            ['Britain', 40.7, 'Britain', 39.0],
            ['Belgium', 35.2, 'Belgium', 43.2]
        ];

    }]);
```
