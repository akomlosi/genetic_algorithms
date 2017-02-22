export default class Chromosome {
	constructor(board, initialPath) {
		this.fitness = 1;
		this.board = board;
		this.path = [initialPath];
		this.setInitialPath();
		this.collisions = 0;
	}

	setInitialPath() {
		for (let i = 0; i < this.path.length; i++) {
			this.board.setMarker(this.path[i]);
		}
	}

	generatePath() {
		for (let i = 0; i < 99; i++) {
			let fields = this.board.getPossibleFields();
			if (fields.length) {
				let ran = Math.floor(Math.random() * fields.length);
				if (this.board.setMarker(fields[ran])) {
					this.path.push(fields[ran]);
				}
				else {
					this.collisions++;
				}
			}
			else {
				return;
			}
		}
	}

	mutate(chance) {
		if (Math.random() > chance) return;
		if (this.board.removeLastSet(this.path[this.path.length-1])) {
			let lastStep = this.path.pop();
			let fields = this.board.getPossibleFields();
			if (fields.length > 1) { // otherwise no more mutation available
				let ran = Math.floor(Math.random() * fields.length);
				if (fields[ran] !== lastStep) {
					if (this.board.setMarker(fields[ran])) {
						this.path.push(fields[ran]);
					}
					else {
						this.collisions++;
					}
				}
			}
		}
	}

	calculateFitness() {
		this.fitness = 1 / (this.path.length / (this.collisions + 1));
	}
}