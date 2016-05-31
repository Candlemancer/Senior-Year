// Jonathan Petersen
// A01236750
// Drawing Assignment
// Keyboard Manager Class

function keyboardListener(event) {
    // N - New Document
    if (event.keyCode == 78 && event.shiftKey) {
        event.preventDefault();
        newDrawing();
        return;
    }

    // D - Duplicate Selected Object
    if (event.keyCode == 68 && event.shiftKey) {
        event.preventDefault();
        duplicateObject();
        return;
    }

    // U - Undo Last Action
    if (event.keyCode == 85 && event.shiftKey) {
        event.preventDefault();
        undo();
        return;
    }

    return;
}

document.addEventListener('keyup', keyboardListener, false);
