

describe('SSB Utility Functions', function () {

	// TODO: implement testdouble.js for ajax testing
	// TODO: implement tests for ssb.util.ajax: get & post functions

	describe('ssb.util.browser', function () {

		describe('#getUrlParameter()', function () {
			it('geturns url parameter', function () {
				//Update url parameters without refreshing page --only works in modern browsers.
				window.history.pushState({}, "Updated for url param testing", "/test?hello=world");

				var paramValue = ssb.util.browser.getUrlParameter('hello');

				chai.assert(paramValue == 'world', 'parameter was retrieved');

				window.history.pushState({}, "Re-updated for subsequent tests", "/test");
			});
		});
	});

	describe('ssb.util.data', function () {
		
		// Receives flat list, returns nested list.
		// Descendant objects are returned in 'children' array per item.
		describe('#nestFlatList()', function () {
			it('should return nested list with "children" objects', function () {
				var items = [
					{
						item_id: 1,
						parent_id: null
					},
					{
						item_id: 2,
						parent_id: 1
					},
					{
						item_id: 3,
						parent_id: 2
					}
				];

				var nestedItems = ssb.util.data.nestFlatList(items, null);

				var pass = nestedItems[0].children[0].children[0].item_id == 3;

				chai.assert(pass, 'list has been nested');
			})
		});

		// Find how deep an item is nested, 
        // which is key to change template loops structure.
        // Assumes each item has value of "item_id" and "parent_id"
		describe('#findHowDeep()', function () {
			it('return depth of matched item', function () {
				// TODO implement
				var item = {
					item_id: 64,
					parent_id: 63
				};

				var items = [
					{
						item_id: 43,
						parent_id: 42,
						children: [
							{
								item_id: 53,
								parent_id: 52,
								children: [
									{
										item_id: 63, // Match: depth 3
										parent_id: 62,
										children: [
											{
												item_id: 73,
												parent_id: 72
											}
										]
									}
								]
							}
						]
					}
				];

				var depth = ssb.util.data.findHowDeep(item, items);

				chai.assert(depth == 3, "depth is matched");
			});

		});

	});

	describe('ssb.util.ko', function () {

		describe('#map()', function () {
			it('map object to knockout observable functions', function () {
				var vm = { //vm to bind to
					hello: null
				};

				var dumbData = { // data [ajax in] to be mapped to vm
					hello: 'world'
				};

				ssb.util.ko.map(vm, 'hello', dumbData.hello);
				
				chai.assert(vm.hello() == 'world', 'object is observable function with proper value');
			})
		});

		describe('#bind()', function () {
			before(function () {
				$('#mocha').append('<div id="test"><span data-bind="text: hello"></span></div>')
			});

			after(function () {
				//Unbind element, then remove.
				ko.cleanNode($('#test')[0]);
				$('#test').remove()
			});

			it('bind knockout mapped vm to document element/node', function () {
				var vm = {
					hello: ko.observable('world')
				};
				ssb.util.ko.bind(vm, $('#test')[0]);

				chai.assert($('#test span').text() == 'world', 'bound value has been verified');
			});

		})

	});

	describe('ssb.util.layout', function () {

		describe('#toggleLoadMask()', function () {

			before(function () {
				$('#mocha').append('<div id="test" style="width:200px; height:100px; background:orange;"></div>')
			});

			after(function () {
				$('#test').remove();
			});

			it('apply loadMask', function () {
				ssb.util.layout.toggleLoadMask($('#test'), true);

				var numElements = $('#test .loadmask').length + $('#test .loadmask-msg').length;

				chai.assert(numElements == 2 && $('#test').hasClass('masked'), 'load mask has been applied');

				ssb.util.layout.toggleLoadMask($('#test'), false);
			});

			it('remove loadMask', function () {
				ssb.util.layout.toggleLoadMask($('#test'), true);
				ssb.util.layout.toggleLoadMask($('#test'), false);

				chai.assert($('#test').is(':empty') && !$('#test').hasClass('masked'), 'load masked removed');
			});

			// TODO: test translucency

			// TODO: test invisibility

		});

	});

	describe('ssb.util.notify', function () {

		describe('#success()', function () {
			afterEach(function () {
				$('[data-notify=container]').remove();
			});

			it('notify user default success message', function () {
				ssb.util.notify.success();
				var message = $('[data-notify=container] [data-notify=message]').text();
				chai.assert(message == 'Success!', 'correct message was notified');
			});

			it('notify user custom success message', function () {
				ssb.util.notify.success('hello world');
				var message = $('[data-notify=container] [data-notify=message]').text();
				chai.assert(message == 'hello world', 'correct message was notified');
			});

		});
	});

	// TODO implement tests for router.
	// Use eventually, promises, testdouble.js for async loading?

});






