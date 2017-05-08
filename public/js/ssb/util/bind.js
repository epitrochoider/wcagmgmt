define(['ssb/ssb'],
    function () {
        var bind = {
            change: function (el, callback, selector) {
                bind.event(el, 'change', callback, selector);
            },
            click: function (el, callback, selector) {
                bind.event(el, 'click', callback, selector);
            },
            resize: function (el, callback, selector) {
                var throttled = _.throttle(callback, 300);

                //having issues with resize in delegate for some reason
                if (selector)
                    el = el.find(selector);

                bind.event(el, 'resize', throttled);
            },
            submit: function (el, callback, selector) {
                bind.event(el, 'submit', callback, selector);
            },

            event: function (el, event, callback, selector) {
                el.off(event, selector, callback);
                el.on(event, selector, callback);
            }
        };

        ssb.ns('util');
        ssb.util.bind = bind;

        return ssb.util.bind;
    });
