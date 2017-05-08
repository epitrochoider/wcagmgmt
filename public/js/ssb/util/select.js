define([
        'ssb/ssb'
    ],
    function() {
        var util = {
            bind: function (el, data, values, allowClear, placeHolder, changeEvent, ajax, templateResult, templateSelection) {
                var valuesActual = _.isFunction(values) ? values() : values;
                var valuesFunction = _.isFunction(values) ? values : null;

                el.select2({
                        allowClear: allowClear || false,
                        placeholder: placeHolder || "",
                        theme: 'default',
                        data: (data ? ssb.util.json.keysToLower(data) : null),
                        closeOnSelect: true,
                        ajax: ajax,
                        escapeMarkup: function (markup) { return markup; },
                        templateResult: templateResult,
                        templateSelection: templateSelection
                    })
                    .val(valuesActual)
                    .on('change',
                        function (e) {
                            if (valuesFunction) {
                                valuesFunction($(e.target).val());
                            }
                        })
                    .trigger('change')
                    .on('select2:unselecting',
                        function() {
                            $(this).data('unselecting', true);
                        })
                    .on('select2:opening',
                        function(e) {
                            if ($(this).data('unselecting')) {
                                $(this).removeData('unselecting');
                                e.preventDefault();
                            }
                    });

                //don't want this triggered when initialized is created
                el.on('change',
                    function () {
                        el.select2("close");

                        if (changeEvent) {
                            changeEvent();
                        }
                    });

                if (el.attr('multiple')) {
                    el.next('.select2')
                        .find('.select2-selection')
                        .append('<span class="select2-selection__arrow" role="presentation"><b role="presentation"></b></span>');
                }
            }
        };

        ssb.ns('util');
        ssb.util.select = util;

        return ssb.util.select;
    });
