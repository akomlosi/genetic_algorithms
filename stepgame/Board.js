export default class Board {
	constructor() {
		this._markedPositions = [];
		this._lastPosition = null;
		this._hasMoreSteps = true;
	}

	isEmptyField(pos) {
		return _.findIndex(this._markedPositions, pos) === -1;
	}

	getLastPosition() {
		return this._lastPosition;
	}

	hasMoreSteps() {
		return this._hasMoreSteps;
	}

	setMarker(pos) {
		if (this.isValidSet(pos)) {
			this._markedPositions.push(pos);
			this._lastPosition = pos;
			this.checkIsLastStep();
			return true;
		}
		return false;
	}

	isValidSet(pos) {
		return this.isValidPosition(pos)
			&& this.isEmptyField(pos);
	}

	removeLastSet(pos) {
		if (this._markedPositions.indexOf(pos) !== -1) {
			this._markedPositions.pop();
			this._lastPosition = this._markedPositions[this._markedPositions.length-1];
			return true;
		}
		return false;
	}

	isValidPosition(pos) {
		var x = pos[0], y = pos[1],
			lastPosition = this.getLastPosition();
		if (_.isNull(lastPosition) && this.isOnBoard(x, y)) {
			return true;
		}
		var isValid =
			this.isOnBoard(x, y) &&
			((x === lastPosition[0] - 1 &&
			y === lastPosition[1] + 2) ||
			(x === lastPosition[0] - 1 &&
			y === lastPosition[1] - 2) ||
			(x === lastPosition[0] + 1 &&
			y === lastPosition[1] - 2) ||
			(x === lastPosition[0] + 1 &&
			y === lastPosition[1] + 2) ||
			(y === lastPosition[1] - 1 &&
			x === lastPosition[0] + 2) ||
			(y === lastPosition[1] - 1 &&
			x === lastPosition[0] - 2) ||
			(y === lastPosition[1] + 1 &&
			x === lastPosition[0] - 2) ||
			(y === lastPosition[1] + 1 &&
			x === lastPosition[0] + 2));

		return isValid;
	}

	isOnBoard(x, y) {
		return x >= 1 &&
			x <= 10 &&
			y >= 1 &&
			y <= 10;
	}

	getPossibleFields() {
		var l = this.getLastPosition();
		return [
			[l[0] - 1, l[1] + 2],
			[l[0] - 1, l[1] - 2],
			[l[0] + 1, l[1] + 2],
			[l[0] + 1, l[1] - 2],
			[l[0] - 2, l[1] + 1],
			[l[0] - 2, l[1] - 1],
			[l[0] + 2, l[1] + 1],
			[l[0] + 2, l[1] - 1]
		]
	}

	checkIsLastStep() {
		if (_.isNull(this.getLastPosition())) {
			return false;
		}
		var _possibleFields = this.getPossibleFields(),
			hasField = false;
		_.each(_possibleFields, function(field) {
			if (this.isEmptyField(field) && this.isOnBoard(field[0], field[1])) {
				hasField = true;
			}
		}.bind(this));
		if (!hasField) {
			this._hasMoreSteps = false;
		}
	}
}