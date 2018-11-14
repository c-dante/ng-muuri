import angular from 'angular';

import './example.css';
import templatePug from './example.pug';
import ngMuuri from '../src';

class ExampleCtrl {
	constructor() {
		this.items = [
			'A', 'B', 'C',
		];

		this.muuriOptions = {
			dragEnabled: true,
		};
	}
}

// Declare the module + define the component
const ExampleModule = 'exampleModule'
angular.module(ExampleModule, [
	ngMuuri
]).component('example', {
	template: templatePug(),
	controller: [ExampleCtrl],
});

// Bootstrap the document + append our controller to the body
angular.element(document).ready(() => {
	const exampleElt = document.createElement('example');
	document.body.appendChild(exampleElt);
	angular.bootstrap(document, [ExampleModule])
});
