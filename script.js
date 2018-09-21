class Stopwatch extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			times: {
	            minutes: 0,
	            seconds: 0,
	            miliseconds: 0
        	},
        	score: [] 
		};
		this.label = 'Start'
	}

	format(times) {
        return `${pad0(times.minutes)}:${pad0(times.seconds)}:${pad0(Math.floor(times.miliseconds))}`;
	}

	startStop() {
	    if (!this.running) {
	        this.running = true;
	        this.label = 'Stop';
	        this.watch = setInterval(() => this.step(), 10); 

	    } else {
	    	this.running = false;
	    	this.label = 'Start';
		    const score = this.state.score.slice();
		    score.push(this.format(this.state.times));
		    this.setState({ score });
		    clearInterval(this.watch);
	    }
	}

	step() {
	    if (!this.running) return;
	    this.calculate();
	}

	calculate() {
		const times = Object.assign({}, this.state.times);
	    times.miliseconds += 1;
	    if (times.miliseconds >= 100) {
	        times.seconds += 1;
	        times.miliseconds = 0;
	    }
	    if (times.seconds >= 60) {
	        times.minutes += 1;
	        times.seconds = 0;
	    }
	    this.setState({
	    	times //w ES6 "times:times" to to samo co "times"
	    })
	}


	reset() {
        this.setState({
            times: {
	            minutes: 0,
	            seconds: 0,
	            miliseconds: 0,
	        },
	        score: [],
        });
    }

	render() {
		return (
			<div>
				<div className="flex-cont">
					<div className="stopwatch animated rubberBand">{this.format(this.state.times)}</div>
					<nav>
						<div className="jumbotron">
							<a href="#" className="button start" onClick={this.startStop.bind(this)} >{this.label}</a>
							<a href="#" className="button reset" onClick={this.reset.bind(this)}>Reset</a>
						</div>
					</nav>  
				</div>
				<div className="spacer-score" id="scores">
					<p>Scores:</p>
					<ul>
						{this.state.score.map((curr, i) => <li key={i}> {curr} </li>)}
					</ul>
				</div>
			</div>
		);
	}
}

function pad0(value) {
    let result = value.toString();
    if (result.length < 2) {
        result = '0' + result;
    }
    return result;
}

ReactDOM.render(<Stopwatch />, document.getElementById('timer'));