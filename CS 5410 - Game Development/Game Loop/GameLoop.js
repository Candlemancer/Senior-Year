// Jonathan Petersen
// A01236750
// Game Loop Assignment

var gameLoop = (function() {

	this.eventQueue = [];
	this.toRender = [];

	function gatherInput(event) {
		this.eventQueue.push(event);
		update();
	}

	function update(timestamp) {
		var currentTime = performance.now();

		if (this.eventQueue.length < 1) {
			return;
		}

		for (i = 0; i < this.eventQueue.length; ++i) {
			if (this.eventQueue[i].t < currentTime) {
				this.toRender.push(this.eventQueue[i]);
				if (this.eventQueue[i].remaining > 0) {
					this.eventQueue.push({
						t: (currentTime + this.eventQueue[i].delay),
						name: this.eventQueue[i].name,
						delay: this.eventQueue[i].delay,
						remaining: this.eventQueue[i].remaining - 1
					});
				}	
				this.eventQueue.splice(i, 1);			
			}
		}
		render()
	}

	function render() {
		while (this.toRender.length > 0) {
			var currentEvent = this.toRender.shift();
			// console.log("Event: " + currentEvent.name + " (" +
			// 	currentEvent.remaining + " remaining)");
			var textArea = document.getElementById("eventLog");
			textArea.value += "Event: " + currentEvent.name + " (" +
				currentEvent.remaining + " remaining)\n";
			textArea.scrollTop = textArea.scrollHeight;
		}
		window.requestAnimationFrame(update);
	}

	return gatherInput;
})();

function addEvent(docInputs) {
	var eventName = docInputs.name.value;
	var eventInterval = parseInt(docInputs.interval.value);
	var eventReps = parseInt(docInputs.multiplicity.value);

	gameLoop({
		t: performance.now(),
		name: eventName,
		delay: eventInterval,
		remaining: eventReps - 1
	});
}
