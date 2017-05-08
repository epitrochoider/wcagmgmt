define([
        'ssb/ssb'
],
    function () {
        var util = {
            keysToLower: function(obj) {
                var newobj;

                if (Array.isArray(obj)) {
                    for (var i = 0; i < obj.length; i++) {
                        obj[i] = util.keysToLowerObject(obj[i]);
                    }

                    newobj = obj;
                } else {
                    newobj = util.keysToLower(obj);
                }

                return newobj;
            }
        };

        ssb.ns('util');
        ssb.util.json = util;

        return ssb.util.json;
    });
