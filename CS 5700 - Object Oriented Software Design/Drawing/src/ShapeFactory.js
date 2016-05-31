// Jonathan Petersen
// A01236750
// Drawing Assignment
// Shape Factory Class

function shapeFactory(type) {
    var shapeObject;

    if (type == "Rectangle") {
        shapeObject = new fabric.Rect(
            {left: 0, top: 0, fill: 'black', width: 50, height: 50});
    }
    if (type == "Circle") {
        shapeObject =
            new fabric.Circle({left: 0, top: 0, fill: 'black', radius: 50});
    }
    if (type == "Triangle") {
        shapeObject = new fabric.Triangle(
            {left: 0, top: 0, fill: 'black', width: 50, height: 50});
    }
    if (type == "Ellipse") {
        shapeObject = new fabric.Ellipse(
            {left: 0, top: 0, fill: 'black', rx: 50, ry: 30});
    }
    if (type == "Line") {
        shapeObject = new fabric.Line(
            {left: 0, top: 0, fill: 'black', x1: 5, y1: 5, x2: 40, y2: 40});
    }
    if (type == "Polygon") {
        var points = [
            {x: 75, y: 7},
            {x: 25, y: 7},
            {x: 0, y: 50},
            {x: 25, y: 93},
            {x: 75, y: 93},
            {x: 100, y: 50}
        ];
        shapeObject =
            new fabric.Polygon(points, {left: 0, top: 0, fill: 'black'});
    }

    if (shapeObject == null) {
        console.log("Unknown shape type in Shape Factory!");
        return null;
    }

    return shapeObject;
}
