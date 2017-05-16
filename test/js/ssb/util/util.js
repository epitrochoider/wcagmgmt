

		describe('SSB Utility Functions', function () {

			beforeEach(function () {
				console.log('setup');
			});

			afterEach(function () {
				console.log('teardown');
			});

			before(function () {
				console.log('before');
			});

			after(function () {
				console.log('after');
			});

			describe('ssb.util.data', function () {
				
				// Receives flat list, returns nested list.
				// Descendant objects are returned in 'children' array per item.
				describe('#nestFlatList()', function () {

					
					it('should start with flat list', function () {
						// TODO implement
					});

					it('should return nested list with "children" objects', function () {
						// TODO implement
					})
				});

				// Find how deep an item is nested, 
		        // which is key to change template loops structure.
		        // Assumes each item has value of "item_id" and "parent_id"
				describe('#findHowDeep()', function () {

					it('return depth of matched item', function () {
						// TODO implement
					});

				});

			});

		});






