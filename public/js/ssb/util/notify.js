define([
        'ssb/ssb'
],
    function () {
        var util = {
            success: function(message) {
                $.notify({
                    icon: "fa fa-check",
                    message: "<strong>" + (message || "Success!") + "</strong>"
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
        ssb.util.notify = util;

        return ssb.util.notify;
    });
