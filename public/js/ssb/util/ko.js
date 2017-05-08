define([
        'ssb/ssb'
],
    function () {
        var util = {
            map: function(vm, to, from) {
                if (vm[to]) {
                    ko.mapping.fromJS(from, vm[to]);
                } else {
                    vm[to] = ko.mapping.fromJS(from);
                }
            },

            bind: function(data, el) {
                if (!(!!ko.dataFor(el))) {                    
                    ko.applyBindings(data, el);
                }
            }
        };

        ssb.ns('util');
        ssb.util.ko = util;

        return ssb.util.ko;
    });
