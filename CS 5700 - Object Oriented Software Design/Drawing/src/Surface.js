// Jonathan Petersen
// A01236750
// Drawing Assignment
// Fabric Functions

var SurfaceSingleton = new Surface("myCanvas");

function Surface(id) {
    this.canvas = new fabric.Canvas(id);
    this.canvas.selection = false;
    this.lastModifiedObject = null;
    this.brush = null;
    this.brushColor = "black";

    this.changeBrush = function(newBrush) {
        var prevBrush = this.brush;
        this.brush = newBrush;
        return prevBrush;
    };

    this.getInstance = function() { return this; };

    this.draw = function(object) {
        object.set({fill: this.brushColor});
        this.canvas.add(object);
        return this.canvas.getObjects().indexOf(object);
    };

    this.removeObject = function(id) { this.canvas.item(id).remove(); };

    this.modify = function(id, state) {
        this.canvas.item(id).set(state);
        this.canvas.renderAll();
    };

    this.deleteCurrentObject = function() {
        var obj = this.canvas.getActiveObject();
        this.canvas.getActiveObject().remove();
        this.canvas.renderAll();
        return obj;
    };

    this.duplicateCurrentObject = function() {

        if (this.canvas.getActiveObject() != null) {
            var obj = new fabric.Object();
            obj.set(this.canvas.getActiveObject().saveState());
            obj.set({left: obj.get('left') + 10, top: obj.get('top') + 10});
            this.draw(obj);
            this.canvas.deactivateAll();
            this.canvas.renderAll();
            return this.canvas.getObjects().indexOf(obj);
        }
    };

    this.changeBackground = function(back, isFile) {

        // Sanity Check
        if (back == null) {
            back = "#FFFFFF";
            isFile = false;
        }

        // Get Previous Background
        var prevBack;
        var prevFile;
        if (typeof this.canvas.backgroundImage === 'object') {
            prevBack = this.canvas.backgroundImage;
            prevFile = true;
        } else {
            prevBack = this.canvas.backgroundColor;
            prefFile = false;
        }

        // Set New Background
        if (isFile) {
            console.log("Attempting to set background image!");
            this.canvas.setBackgroundColor("#FFFFFF");
            this.canvas.setBackgroundImage(
                back, this.canvas.renderAll.bind(this.canvas), {
                    width: this.canvas.width,
                    height: this.canvas.height,
                    originX: 'left',
                    originY: 'top'
                });
        } else {
            console.log("Attempting to set background color!");
            this.canvas.backgroundImage = false;
            this.canvas.setBackgroundColor(back);
        }
        this.canvas.renderAll();

        return {back: prevBack, file: prevFile};
    };

    this.canvas.on('object:modified', function(event) {
        var obj = event.target;

        var command = commandFactory("Modify");
        // @KLUDGE: Since we can only detect when a move has finished, not when
        // it starts occurring, we need to manually store the original info.
        command.origState = SurfaceSingleton.getInstance().lastModifiedObject;
        command.itemID = this.getObjects().indexOf(obj);

        SurfaceSingleton.getInstance().lastModifiedObject = obj.toObject();
    });

    this.canvas.on('object:selected', function(event) {
        SurfaceSingleton.getInstance.lastModifiedObject =
            event.target.toObject();
    });

    this.canvas.on('mouse:down', function(event) {
        if (!this.getActiveObject()) {
            commandFactory("Draw")
                .execute(document.getElementById("brush").value,
                         {x: event.e.layerX, y: event.e.layerY});
        }
    });

    this.changeActiveShapeColor = function(newColor) {
        if (this.canvas.getActiveObject() == null) {
            this.brushColor = newColor;
            return null;
        }
        console.log("Changing color of ", this.canvas.getActiveObject(), " to ",
                    newColor);
        var prevColor = this.canvas.getActiveObject().get('fill');
        this.canvas.getActiveObject().set({fill: newColor});
        this.canvas.renderAll();
        return prevColor;
    };
}
