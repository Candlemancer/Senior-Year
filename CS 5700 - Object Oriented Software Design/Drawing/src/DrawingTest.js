// Jonathan Petersen
// A01236750
// Drawing Assignment
// Unit Test Cases

function runTests() {
    if (testCreateShape()) {
        console.log("Test 1 PASS");
    } else {
        console.log("Test 1 FAIL");
    }
    if (testDeleteShape()) {
        console.log("Test 2 PASS");
    } else {
        console.log("Test 2 FAIL");
    }
}

function testCreateShape() {
    var canvas = SurfaceSingleton.getInstance().canvas;
    var command = commandFactory("Draw");
    command.execute(document.getElementById("brush").value, {x: 100, y: 100});
    canvas.setActiveObject(canvas.item(0));

    if (command.itemID) {
        commandHistory.pop().undo();
        return true;
    }

    return false;
}

function testDeleteShape() {
    var canvas = SurfaceSingleton.getInstance().canvas;
    var setupCommand = commandFactory("Draw");
    setupCommand.execute(document.getElementById("brush").value,
                         {x: 100, y: 100});

    if (setupCommand.itemID) {
        canvas.setActiveObject(canvas.item(setupCommand.itemID - 1));
        var command = commandFactory("Delete");
        command.execute();

        if (command.origObject == null) {
            return false;
        }
        commandHistory.pop().undo();
        canvas.setActiveObject(canvas.item(0));
        commandHistory.pop().undo();
        return true;
    }

    return false;
}
