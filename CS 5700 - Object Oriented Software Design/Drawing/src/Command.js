// Jonathan Petersen
// A01236750
// Drawing Assignment
// Command Class

var commandHistory = [];

function commandFactory(type) {
    var surface = SurfaceSingleton.getInstance();

    // Create the command
    // Create type based on paramater name.
    var command;
    if (type == "Draw") {
        command = new DrawCommand(surface);
    }
    if (type == "Modify") {
        command = new ModifyCommand(surface);
    }
    if (type == "ChangeBackground") {
        command = new ChangeBackgroundCommand(surface);
    }
    if (type == "Delete") {
        command = new DeleteCommand(surface);
    }
    if (type == "Duplicate") {
        command = new DuplicateCommand(surface);
    }
    if (type == "ChangeColor") {
        command = new ChangeShapeColorCommand(surface);
    }

    // Error Checking
    if (command == null) {
        console.log("Unknown command type in CommandFactory!");
        return null;
    }

    return command;
};

function Command(surface) {
    this.undo = function() {
        // Empty
    };
}
Command.prototype.execute = function() {
    commandHistory.push(this);
};

function DrawCommand(surface) {
    this.itemID = null;

    this.execute = function(shapeType, position) {
        this.prototype.execute.call(this);
        var shape = shapeFactory(shapeType);
        shape.set({left: position.x, top: position.y});
        this.itemID = surface.draw(shape);
    };

    this.undo = function() { surface.removeObject(this.itemID); };
}
DrawCommand.prototype = Command;

function ModifyCommand(surface) {
    this.origState = null;
    this.itemID = null;

    this.execute = function(id, state) {
        this.prototype.execute.call(this);

        this.origState = surface.getActiveObject().saveState();
        this.itemID = id;
        surface.modify(id, state);
    };

    this.undo = function() { surface.modify(this.itemID, this.origState); };
}
ModifyCommand.prototype = Command;

function ChangeBackgroundCommand(surface) {
    this.origBack = null;
    this.origFile = null;

    this.execute = function(back, isFile) {
        this.prototype.execute.call(this);

        var result = surface.changeBackground(back, isFile);
        this.origBack = result.back;
        this.origFile = result.file;
    };

    this.undo = function() {
        surface.changeBackground(this.origBack, this.origFile);
    };
}
ChangeBackgroundCommand.prototype = Command;

function DeleteCommand(surface) {
    this.origObject = null;

    this.execute = function() {
        this.prototype.execute.call(this);
        this.origObject = surface.deleteCurrentObject();
    };

    this.undo = function() { surface.draw(this.origObject); };
}
DeleteCommand.prototype = Command;

function DuplicateCommand(surface) {
    this.itemID = null;

    this.execute = function() {
        this.itemID = surface.duplicateCurrentObject();

        if (this.itemID != null) {
            this.prototype.execute.call(this);
        }

    };

    this.undo = function() { surface.removeObject(this.itemID); };
}
DuplicateCommand.prototype = Command;

function ChangeBrushCommand(surface) {
    this.origBrush = null;

    this.execute = function(newBrush) {
        this.origBrush = surface.changeBrush(newBrush);
        this.prototype.execute.call(this);

    };

    this.undo = function() { surface.changeBrush(this.origBrush); }
}
ChangeBrushCommand.prototype = Command;

function ChangeShapeColorCommand(surface) {
    this.origColor = null;

    this.execute = function(color) {
        this.origColor = surface.changeActiveShapeColor(color);
        if (this.origColor != null) {
            this.prototype.execute.call(this);
        }
    };

    this.undo = function() { surface.changeActiveShapeColor(this.origColor); };
}
ChangeShapeColorCommand.prototype = Command;
