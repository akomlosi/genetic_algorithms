import Chromosome from './Chromosome';
import Board from './Board';


export default class Population {
	
	constructor(startPoint, size) {
		this.chromosomes = [];
		this.generationNumber = 0;
		while (size--) {
			var chromosome = new Chromosome(new Board(), startPoint);
			chromosome.generatePath(startPoint);
			this.chromosomes.push(chromosome);
		}
	}
	
	display() {
		//document.body.innerHTML = '';
		document.body.innerHTML += ("<h2>Generation: " + this.generationNumber + "</h2>");
		document.body.innerHTML += ("<ul>");
		for (var i = 0; i < this.chromosomes.length; i++) {
			document.body.innerHTML += ("<li>" + this.chromosomes[i].path.length + " (" + this.chromosomes[i].fitness + ")");
		}
		document.body.innerHTML += ("</ul>");
	}
	
	sort() {
		this.chromosomes.sort(function(a, b) {
			return b.fitness - a.fitness;
		});
	}
	
	generation() {
		for (let i = 0; i < this.chromosomes.length; i++) {
			this.chromosomes[i].calculateFitness();
		}
		
		this.sort();
		this.display();
		var children = this.crossover(this.chromosomes[0], this.chromosomes[1]);
		if (children.length) {
			this.chromosomes.splice(this.chromosomes.length - 2, 2, children[0], children[1]);
			console.log(this.chromosomes)
		}

		for (let i = 0; i < this.chromosomes.length; i++) {
			this.chromosomes[i].mutate(0.5);
			this.chromosomes[i].calculateFitness();
			if (this.chromosomes[i].path.length == 100 || this.generationNumber === 2) {
				this.sort();
				this.display();
				return true;
			}
		}
		this.generationNumber++;
		setTimeout(() => {
			this.generation();
		}, 20);
	}

	crossover(chromosome1, chromosome2) {
		let pivot = Math.round(chromosome1.path.length / 2) -1;
		let path1;
		let path2;

		for (let i = 1; i < chromosome1.path.length; i++){
			if (_.findIndex(chromosome2.path, chromosome1.path[i]) >= pivot) {
				let similarItemIndex = _.findIndex(chromosome2.path, chromosome1.path[i]);
				path1 =
					chromosome1.path.slice(0, similarItemIndex)
					.concat(chromosome2.path.slice(similarItemIndex));
				path2 = chromosome2.path.slice(0, similarItemIndex).concat(similarItemIndex);
			}
		}

		if (path1 && path2) {
			return [new Chromosome(new Board(), path1), new Chromosome(new Board(), path2)];
		}

		return [];

	}
	
};