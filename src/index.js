import angular from 'angular';
import Muuri from 'muuri';

class NgMuuriCtrl {
	constructor($element) {
		this.elt = $element[0];

		// For a less-thrashy add/removal
		this.toAdd = [];
		this.toRemove = [];
		this.waiting = false;
	}

	$onInit() {
		this.grid = new Muuri(this.elt, this.ngMuuriOptions);
		if (this.ngMuuriInit) {
			this.ngMuuriInit({ grid: this.grid });
		}
	}

	$onDestroy() {
		if (this.ngMuuriDestroy) {
			this.ngMuuriDestroy({ grid: this.grid });
		}
	}

	dispatch() {
		if (!this.waiting) {
			this.waiting = true;
			window.requestAnimationFrame(() => {
				// Perform add/remove
				if (this.toAdd.length) {
					const shouldLayoutAdd = this.toRemove.length <= 0;
					this.grid.add(this.toAdd, {
						layout: shouldLayoutAdd,
					});
					this.toAdd = [];
				}

				if (this.toRemove.length) {
					this.grid.remove(this.toRemove);
					this.toRemove = [];
				}

				// Reset waiting states
				this.waiting = false;
			});
		}
	}

	add(element) {
		this.toAdd.push(element);
		this.dispatch();
	}

	remove(element) {
		this.toRemove.push(element);
		this.dispatch();
	}
}

const MODULE = 'ngMuuri';
angular.module(MODULE, [])
	.directive('ngMuuri', () => ({
		restrict: 'A',
		scope: {
			ngMuuriInit: '&?', // Optional callback, passed the { grid }.
			ngMuuriDestroy: '&?', // Optional callback, passed the { grid }.
			ngMuuriOptions: '<?', // Optional binding for muui options passed into constructor
			ngMuuriSettings: '<?', // Options for this directive's behavior
		},
		bindToController: true,
		controller: ['$element', NgMuuriCtrl],
	}))
	.directive('ngMuuriItem', () => ({
		restrict: 'A',
		require: '^ngMuuri',
		link(scope, iElement, iAttrs, muuriCtrl) {
			const elt = iElement[0];
			muuriCtrl.add(elt);
			scope.$on('$destroy', () => {
				muuriCtrl.remove(elt);
			});
		}
	}));

export default MODULE;
