define(
    function () {
        var widget = function () {
            var list = {
                pageSize: 50,
                totalSize: 0,

                callbacks: {
                    nextPage: null,
                    bindListItem: null,
                    updated: null
                },

                options: {
                    emptyMessage: 'No records found'
                },

                init: function (el, callbacks, options) {
                    list.layout.container = el;
                    list.layout.bodyContainer = el.find(".ssb-util-widget-list-body");

                    if (callbacks) {
                        list.callbacks.bindListItem = callbacks.bindListItem;
                        list.callbacks.updated = callbacks.updated;
                    }

                    if (options) {
                        if (options.emptyMessage)
                            list.options.emptyMessage = options.emptyMessage
                    }

                    list.layout.init();
                },

                update: function (items) {
                    list.totalSize = items.totalSize;
                    list.layout.update(items);
                },

                reset: function () {
                    list.totalSize = 0;

                    list.layout.container.find('div.ssb-util-widget-list-body-container').scrollTop(0);
                },

                layout: {
                    container: null,
                    bodyContainer: null,
                    noRecordContainer: null,

                    init: function () {
                        list.layout.initNoRecordsContainer();
                        list.layout.initBody();
                    },
                    initNoRecordsContainer: function () {
                        list.layout.container.append('<div class="ssb-util-widget-list-norecord-container alert alert-info hide">' + list.options.emptyMessage || 'No records found.' + '</div>');
                        list.layout.noRecordContainer = list.layout.container.find('div.ssb-util-widget-list-norecord-container');
                    },
                    initBody: function () {
                        list.layout.bodyContainer.wrap('<div class="ssb-util-widget-list-body-container"></div>');

                        list.layout.bodyContainer.find('li').first().addClass('hide');
                    },
                    update: function (items) {
                        list.totalSize = items.length;

                        list.layout.reset();

                        var container = list.layout.bodyContainer.find('.list-group')
                        var template = list.layout.bodyContainer.find("li:first");

                        for (var i = 0; i < list.totalSize; i++) {
                            list.layout.renderItem(container, template, items, i);
                        }

                        if (list.callbacks.updated)
                            list.callbacks.updated();

                        ssb.util.layout.toggleLoadMask(list.layout.bodyContainer.closest('.ssb-util-widget-list'), false);
                    },
                    reset: function () {
                        list.layout.bodyContainer.find('li:not(:first)').remove();

                        if (list.totalSize) {
                            list.layout.noRecordContainer.addClass('hide');

                            list.layout.bodyContainer.removeClass('hide');
                        } else {
                            list.layout.bodyContainer.addClass('hide');

                            list.layout.noRecordContainer.removeClass('hide');
                        }

                    },
                    renderItem: function (container, template, items, i) { //Must pass in 'items' (which is heavy) because of recursion below.
                        if (i < list.totalSize) {
                            var li = template.clone();
                            li.removeClass('hide');

                            var item = items[i];

                            if (list.callbacks.bindListItem)
                                list.callbacks.bindListItem(li, item, i);

                            if (item.children && item.children.length) {
                                for (var j = 0; j < item.children.length; j++) 
                                    list.layout.renderItem(li.find('.children').first(), template, item.children, j);
                            }

                            li.appendTo(container);
                        }
                    },
                    getListItem: function (i) {
                        i += 1;

                        return list.layout.bodyContainer.find('li:eq(' + i + ')');
                    }
                }
            }

            return list;
        };

        return widget;
    });