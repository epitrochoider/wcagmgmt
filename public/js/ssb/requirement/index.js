define([
	'ssb/util/widget/list'
	],
    function(list) {
        var module = {
            ns: 'ssb.requirement.index',

            init: function () {
            	module.layout.init();
            },

            load: function () {
                module.layout.load();
                module.data.load();
            },

            loaded: function() {
                module.layout.loaded();
            },

            data: {
                vm: {
                    requirements: []
                },

                load: function () {
                    $.when(
                            module.data.getRequirements())
                        .then(module.data.loaded);
                },
                loaded: function (result) {
                    var nestedList = 
                    	ssb.util.data.nestFlatList(result.requirements, null);
                    
                    module.data.vm.requirements = nestedList;
                    
                    module.layout.list.update(module.data.vm.requirements);

                    module.loaded();
                },

                getRequirements: function () {
                    return ssb.util.ajax.getJSON("http://demo1555654.mockable.io/getrequirements");
                }
            },

            layout: {
            	id: "ssbRequirementIndex",
                list: null,

                init: function() {
                    module.layout.initList();
                },
                initList: function() {
                    module.layout.list = new list();

                    module.layout.list.init($("#" + module.layout.id + 'List'), {
                        bindListItem: module.layout.bindListItem
                    });
                },

                bindListItem: function (li, item) {
                    if (item) {
                    	// Remove attribute for real items to be injected, for accessibility.
                    	li.removeAttr("aria-hidden"); 

                        li.find('[data-bind=number]').text(item.article_number);
                        li.find('[data-bind=name]').text(item.name);
                        li.find('[data-bind=description]').text(item.description);

                        // Change heading type as nested, for accessibility.
                        var nested = ssb.util.data.findHowDeep(item, module.data.vm.requirements);
                        if (nested > 0) {
                        	var newElem  = 'h' + (3 + nested);
                        	li.find('h3').changeElementType(newElem);
                        }

                        if (!item.complete)
                        	li.find('[data-bind=completed]').remove();

                        li.find('a').attr('href', '/requirement/detail/?id=' + item.item_id);
                    }
                },

                load: function () {
                    $('#' + module.layout.id).removeClass('hide');
                    module.layout.toggleLoadMask(true);
                },
                loaded: function () {
                    module.layout.toggleLoadMask(false);
                    
                    ssb.util.notify.success("All requirements loaded.");
                },

                toggleLoadMask: function (state) {
                    ssb.util.layout.toggleLoadMask($('#' + module.layout.id), state, true);
                }
            }
        };

        module.init();

        ssb.ns('requirement');
        ssb.requirement.index = module;

        return ssb.requirement.index;
    });