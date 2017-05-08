define(['ssb/ssb'], function () {
    var router = {

        route: function (route) {
            
            if (route == '/requirement/index') {
                require(['ssb/requirement/index'], function (module) {
                    module.load();
                });    
            }

            if (route == '/requirement/detail') {
                require(['ssb/requirement/detail'], function (module) {
                    module.load();
                });    
            }
        }
    };

    ssb.ns('util');
    ssb.util.router = router;

    return ssb.util.router;
});