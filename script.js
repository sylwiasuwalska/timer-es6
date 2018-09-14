class Stopwatch {
    constructor(display) {
        this.running = false;
        this.display = display;
        this.reset();
        this.print(this.times);
    }

    reset() {
        this.times = {
            minutes: 0,
            seconds: 0,
            miliseconds: 0
        }
    }

    print() {
        this.display.innerText = this.format(this.times);
	}

	format(times) {
        return `${pad0(times.minutes)}:${pad0(times.seconds)}:${pad0(Math.floor(times.miliseconds))}`;
	}

	start() {
	    if (!this.running) {
	        this.running = true;
	        this.watch = setInterval(() => this.step(), 10);
	        
	    }
	}

	step() {
	    if (!this.running) return;
	    this.calculate();
	    this.print();
	}

	calculate() {
	    this.times.miliseconds += 1;
	    if (this.times.miliseconds >= 100) {
	        this.times.seconds += 1;
	        this.times.miliseconds = 0;
	    }
	    if (this.times.seconds >= 60) {
	        this.times.minutes += 1;
	        this.times.seconds = 0;
	    }
	}

	stop() {
	    this.running = false;
	    clearInterval(this.watch);
	}
}

function pad0(value) {
    let result = value.toString();
    if (result.length < 2) {
        result = '0' + result;
    }
    return result;
}

let timer = document.getElementById('timer');
let scores = document.getElementById('scores');
let clickCounter = 0;

let startStopButton = document.getElementById('start');
startStopButton.addEventListener('click', () => {

	timer.classList.toggle('rubberBand')

	if (startStopButton.classList.contains('start')) {

		stopwatch.start()
		startStopButton.classList.remove('start')
		startStopButton.innerHTML = 'Stop'

	} else {

		var scoresDisplay = document.createElement('div');
		clickCounter ++;
		scoresDisplay.innerHTML = clickCounter +'. ' + stopwatch.format(stopwatch.times)
		scores.appendChild(scoresDisplay)
		
		stopwatch.stop()
		startStopButton.classList.add('start')
		startStopButton.innerHTML = 'Start'		
	}
	
});


let resetButton = document.getElementById('reset');
resetButton.addEventListener('click', () => {
	clickCounter = 0;
	stopwatch.reset()
	stopwatch.print()
	scores.innerHTML = '<p> Scores: </p>'
	}
);


const stopwatch = new Stopwatch(
document.querySelector('.stopwatch'));