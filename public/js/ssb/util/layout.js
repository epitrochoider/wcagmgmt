define([
        'ssb/ssb'
],
    function () {
        var layout = {

            toggleLoadMask: function (el, state, translucent, invisible) {
                if (state) {
                    el.mask('');
                    if (translucent)
                        el.addClass('loadmask-translucent');
                    if (invisible)
                        el.addClass('loadmask-invisible');
                } else {
                    el.unmask();
                }
            }
        };

        ssb.ns('util');
        ssb.util.layout = layout;

        return ssb.util.layout;
    });
