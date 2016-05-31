// Jonathan Petersen
// A01236750
// Drawing Assignment
// UI Functions

function newDrawing() {
    SurfaceSingleton.getInstance().canvas.clear();
    SurfaceSingleton.getInstance().changeBackground("#FFFFFF", false);
}

function undo() {
    if (commandHistory.length > 0) {
        commandHistory.pop().undo();
    }
}

function deleteObject() {
    commandFactory("Delete").execute();
}

function duplicateObject() {
    commandFactory("Duplicate").execute();
}

function changeShapeColor() {
    var color = "rgb(" +
                Math.min(document.getElementById("shapeR").value, 255) + ", " +
                Math.min(document.getElementById("shapeG").value, 255) + ", " +
                Math.min(document.getElementById("shapeB").value, 255) + ")";
    commandFactory("ChangeColor").execute(color);
}

function changeBackgroundColor() {
    var color = "rgb(" + Math.min(document.getElementById("backR").value, 255) +
                ", " + Math.min(document.getElementById("backG").value, 255) +
                ", " + Math.min(document.getElementById("backB").value, 255) +
                ")";
    commandFactory("ChangeBackground").execute(color, false);
}

function changeBackgroundImage() {
    commandFactory("ChangeBackground")
        .execute(document.getElementById("BackgroundImageText").value, true);
}

function saveImageAsJSON() {
    _download("picture.json",
              JSON.stringify(SurfaceSingleton.getInstance().canvas));
}

function saveImageAsPNG() {
    _download(image.png, SurfaceSingleton.getInstance().canvas.toDataURL());
}

function _download(filename, data) {
    var element = document.createElement('a');
    element.setAttribute('href', data);
    element.setAttribute('download', filename);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}

function _getHistory() {
    for (var i = commandHistory.length - 1; i >= 0; i--) {
        console.log(commandHistory[i]);
    };
}
