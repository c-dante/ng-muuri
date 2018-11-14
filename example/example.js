import angular from 'angular';

import './example.css';
import templatePug from './example.pug';
import ngMuuri from '../src';

class ExampleCtrl {
	constructor() {
		this.itemId = 0;
		this.items = [];

		this.muuriOptions = {
			dragEnabled: true,
		};
	}

	$onInit() {
		this.addMore();
	}

	addMore() {
		for (let i = 0; i < 5; i++) {
			this.items.push(this.itemId++);
		}
	}

	removeSome() {
		for (let i = 0; i < 5 && this.items.length > 0; i++) {
			const toSplice = Math.floor(Math.random() * this.items.length);
			this.items.splice(toSplice, 1);
		}
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
