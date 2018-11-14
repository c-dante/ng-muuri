import angular from 'angular';
import Muuri from 'muuri';

class NgMuuriCtrl {
	constructor($element) {
		this.elt = $element[0];
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

	add(element) {
		if (this.grid) {
			this.grid.add([element]);
		}
	}

	remove(element) {
		if (this.grid) {
			this.grid.remove([element]);
		}
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