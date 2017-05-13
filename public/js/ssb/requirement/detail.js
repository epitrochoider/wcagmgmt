define([
    'ssb/util/widget/list'
    ],
    function(list) {
        var module = {
        	item_id: 0,
            mode: 'edit',
            ns: 'ssb.requirement.detail',

            init: function () {
            	// If id is 0, indicates add mode, if not, edit/review mode.
            	module.item_id = ssb.util.browser.getUrlParameter('id');
                
                if (module.item_id != 0) // For mock json purposes, to be removed.
                    module.item_id = 3;
                else
                    module.mode = 'add';

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
                    requirement: null,
                    requirementsFlat: [],
                    requirementsNested: []
                },

                load: function () {
                    // With when().then() promise, callback fires 
                    // after both required functions are complete.
                    $.when(
                            module.data.getRequirement(),
                            module.data.getRequirements())
                        .then(module.data.loaded);
                },

                loaded: function (resultRequirement, resultRequirements) {
                    var vm = module.data.vm;

                    vm.requirementsFlat = resultRequirements[0].requirements;

                    var nestedList = 
                    	ssb.util.data.nestFlatList(resultRequirements[0].requirements, null);
                    
                    vm.requirementsNested = nestedList;
                    
                    // Knockout binding, for simple view-model binding/templating.
                    ssb.util.ko.map(vm, 'requirement', resultRequirement[0].requirement);

                    vm.requirement.parentLabel = ko.computed(function () {
                        var label;
                        $.each(vm.requirementsFlat, function (i,o) {
                            if (o.item_id == vm.requirement.parent_id())
                                label = o.article_number + ' ' + o.name;
                        });
                        return label;
                    }, this);

                    ssb.util.ko.bind(module.data.vm.requirement, $('#' + module.layout.id)[0]);

                    module.layout.list.update(module.data.vm.requirementsNested);

                    module.loaded();
                },

                // AJAX CALLS

                getRequirement: function () {
                    return ssb.util.ajax.getJSON("http://demo1555654.mockable.io/getrequirement/" + module.item_id);
                },

                getRequirements: function () {
                    return ssb.util.ajax.getJSON("http://demo1555654.mockable.io/getrequirements");
                },

                createRequirement: function () {
                    var requirement = module.data.vm.requirement;

                    return ssb.util.ajax.postJSON("http://demo1555654.mockable.io/createrequirement",
                        JSON.stringify({
                            'requirement': ko.mapping.toJS(requirement)
                        }));
                },

                updateRequirement: function () {
                    var requirement = module.data.vm.requirement;

                    return ssb.util.ajax.postJSON("http://demo1555654.mockable.io/updaterequirement/" + module.item_id,
                        JSON.stringify({
                            'requirement': ko.mapping.toJS(requirement)
                        }));
                },

                removeRequirement: function () {
                    return ssb.util.ajax.postJSON("http://demo1555654.mockable.io/removerequirement/" + module.item_id,
                        "{}");
                },

                createdRequirement: function (result) {
                    var id = 3; // Would get from result
                    window.location.href = '/requirement/detail/?id=' + id;
                },

                updatedRequirement: function () {
                    window.location.href = '/requirement/detail/?id=' + module.item_id;
                },

                removedRequirement: function () {
                    window.location.href = '/requirement';
                },

                // DATA UTILITY

                setParentItem: function (id) {
                    module.data.vm.requirement.parent_id(id);
                }
            },

            layout: {
            	id: "ssbRequirementDetail",
                list: null,

                init: function() {
                    module.layout.initBindings();
                    module.layout.initList();

                    module.layout.initMode();
                },

                initBindings: function () {
                    var container = $('#' + module.layout.id);

                    container.on('click', '[data-action=showSummaryView],[data-action=showEditView]', module.events.toggleViewType)

                    container.on('click', '[data-action=save]', module.events.updateRequirement);
                    container.on('click', '[data-action=add]', module.events.createRequirement);
                    container.on('click', '[data-action=cancel]', module.events.cancelRequirement);
                    container.on('click', '[data-action=remove]', module.events.removeRequirement);
                },

                initList: function() {
                    module.layout.list = new list();

                    module.layout.list.init($("#" + module.layout.id + 'List'), {
                        bindListItem: module.layout.bindListItem
                    });
                },

                initMode: function () {
                    if (module.mode == 'add') {
                        $('#' + module.layout.id + ' [data-view=add]').removeClass('hide');
                        $('#' + module.layout.id + ' [data-view=not-add]').addClass('hide');

                        module.layout.toggleViewType('edit');                        
                    } else {
                        $('#' + module.layout.id + ' [data-view=not-add]').removeClass('hide');
                        $('#' + module.layout.id + ' [data-view=add]').addClass('hide');
                    }
                },

                bindListItem: function (li, item) {
                    if (item) {
                    	// Remove attribute for real items to be injected, for accessibility.
                    	li.removeAttr("aria-hidden"); 

                        li.attr('data-id', item.item_id);
                        li.find('[data-bind=number]').text(item.article_number);
                        li.find('[data-bind=name]').text(item.name);

                        var nested = ssb.util.data.findHowDeep(item, module.data.vm.requirementsFlat);
                        if (nested > 0) {
                        	li.css({'padding-left': (nested * 15) + 'px'});
                        }

                        li.find('a').click(function (e) {
                            module.events.setParentItem(item.item_id, e);
                        });
                    }
                },

                load: function () {
                    $('#' + module.layout.id).removeClass('hide');
                    module.layout.toggleLoadMask(true);
                },
                loaded: function () {
                    module.layout.toggleLoadMask(false);
                    
                    if (module.mode == 'add')
                        ssb.util.notify.success("Blank requirement loaded, ready to create.");
                    else
                        ssb.util.notify.success("Requirement loaded, ready to edit.");
                },

                toggleLoadMask: function (state) {
                    ssb.util.layout.toggleLoadMask($('#' + module.layout.id), state, true);
                },

                toggleViewType: function (view) {
                    var container = $('#' + module.layout.id);
                    if (view == 'summary') {
                        container.find('[data-view=edit]').addClass('hide');
                        container.find('[data-view=summary]').removeClass('hide');

                        container.find('[data-action=showEditView]').removeClass('active');
                        container.find('[data-action=showSummaryView]').addClass('active');

                    } else {
                        container.find('[data-view=summary]').addClass('hide');
                        container.find('[data-view=edit]').removeClass('hide');

                        container.find('[data-action=showSummaryView]').removeClass('active');
                        container.find('[data-action=showEditView]').addClass('active');
                    }
                },

                updatedRequirement: function () {
                    ssb.util.notify.success("Requirement updated successfully.");
                }
            },

            events: {
                updateRequirement: function () {
                    module.layout.toggleLoadMask(true);

                    $.when(
                            module.data.updateRequirement())
                        .then(module.data.updatedRequirement);
                },

                createRequirement: function () {
                    module.layout.toggleLoadMask(true);

                    $.when(
                            module.data.createRequirement())
                        .then(module.data.createdRequirement);
                },

                cancelRequirement: function () {
                    module.load();
                },

                removeRequirement: function () {
                    module.layout.toggleLoadMask(true);

                    $.when(
                            module.data.removeRequirement())
                        .then(module.data.removedRequirement);
                },

                setParentItem: function (id, e) {
                    module.data.setParentItem(id);
                    $('#' + module.layout.id + 'List').find('a').removeClass('active');
                    
                    if ($(e.target).is('a'))
                        $(e.target).addClass('active');
                    else
                        $(e.target).parent().addClass('active');
                },

                toggleViewType: function (e) {
                    var target;
                    if ($(e.target).is('button'))
                        target = $(e.target);
                    else
                        target = $(e.target).parent();
                    if (target.attr('data-action') == 'showSummaryView')
                        module.layout.toggleViewType('summary');
                    else
                        module.layout.toggleViewType('edit');
                }
            }
        };

        module.init();

        ssb.ns('requirement');
        ssb.requirement.detail = module;

        return ssb.requirement.detail;
    });