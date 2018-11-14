# ng-muuri
An attempt at an [AngularJS](https://github.com/angular/angular.js) directive for the [muuri](https://github.com/haltu/muuri) grid library. [Here's the demo](c-dante.github.io/ng-muuri).

```html
<!-- Minimal usage -->
<div class="grid" ng-muuri>
	<div class="item" ng-muuri-item ng-repeat="item in [1, 2, 3] track by $index">
		<div class="item-content">
			<p>Hi, I'm item#{{ $index }}</p>
		</div>
	</div>
</div>
```

This library simply manages tieing a `Murri` instance to a DOM element and adding and removing children. It provides callbacks on the grid element to allow controllers customization and event listening.

## design
An attribute to declare a grid which to attach murri.
This is the same as calling `new Muuri(elt)`.

Another attribute to place on elements that serve as items in the grid. They must be direct children of the target grid. It's up to you to follow `Murri`'s requirements and `css` styles.