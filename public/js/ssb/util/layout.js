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
            },

            notifySuccess: function (customMessage) {
                var message = customMessage ? customMessage : "<strong>Successfully saved!</strong>";
                $.notify({
                    icon: "fa fa-check",
                    message: message
                }, {
                    type: 'success',
                    delay: 2000,
                    offset: {
                        x: 20,
                        y: 50
                    },
                    z_index: 10000,
                    animate: {
                        enter: 'animated fadeInDown',
                        exit: 'animated fadeOut'
                    },
                    placement: {
                        from: "top",
                        align: "center"
                    }
                });
            }
        };

        ssb.ns('util');
        ssb.util.layout = layout;

        return ssb.util.layout;
    });
