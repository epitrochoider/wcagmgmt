define([
        'ssb/ssb'
],
    function () {

        var data = {
            // Assumes each item has value of "item_id" and "parent_id", 
            // and properly nests in new "children" object.
            nestFlatList: function (items, parent_id) {
                var nestedList = [];
                
                for (var i = 0; i < items.length; i++) {
                    if(items[i].parent_id == parent_id) {
                        //Reference self in recursion.
                        var children = data.nestFlatList(items, items[i].item_id);

                        if(children.length) {
                            items[i].children = children;
                        }
                        nestedList.push(items[i]);
                    }
                }

                return nestedList;
            },

            // Find how deep an item is nested, 
            // which is key to change template loops structure.
            // Assumes each item has value of "item_id" and "parent_id"
            findHowDeep: function (item, items) {
                var layers = 0;
                //var recursed = false;

                for (var i = 0; i < items.length; i++) {
                    //Reference self in recursion.
                    if(items[i].item_id == item.parent_id) {
                        layers++;
                    } else {
                        if(items[i].children) {
                            //recursed = true;
                            var innerLayers = data.findHowDeep(item, items[i].children);
                            layers += innerLayers ? (innerLayers + 1) : 0;
                        }
                    }
                }

                return layers;
            }
        };

        ssb.ns('util');
        ssb.util.data = data;

        return ssb.util.data;
    });
