import Board from './Board';
import Population from './Population';

let startPoint = [
	Math.floor(Math.random()*10) + 1,
	Math.floor(Math.random()*10) + 1
];

const population = new Population(
	startPoint,
	20, // generate 20 chromosomes
	Board // board instance
);

population.generation();
