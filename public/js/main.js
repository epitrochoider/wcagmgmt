requirejs.config({
    baseUrl: '/public/js',
    waitSeconds: 60,
    shim: {
        'jquery-ui': {
            deps: ['jquery']
        },
        'jquery.loadmask': {
            deps: ['jquery-ui']
        },
        'jquery.select2': {
            deps: ['jquery']
        },
        'jquery.changeElementType': {
            deps: ['jquery']
        },
        'knockout.mapping': {
            deps: ['knockout']
        },        
        'bootstrap': {
            deps: ['jquery']
        },
        'bootstrap-notify': {
            deps: ['bootstrap']
        }
    },
    paths: {
        'underscore': '/public/lib/underscore/underscore',
        'jquery': '/public/lib/jquery/jquery-3.1.1',
        'jquery-ui': '/public/lib/jquery/jquery-ui',
        'jquery.loadmask': '/public/lib/jquery/jquery.loadmask',
        'domReady': '/public/lib/require/domReady',
        'text': '/public/lib/require/text',
        'crossroads': '/public/lib/crossroads/crossroads',
        'knockout': '/public/lib/knockout/knockout-3.4.0',
        'knockout.mapping': '/public/lib/knockout/knockout-mapping',
        'bootstrap': '/public/lib/bootstrap/js/bootstrap.min',
        'bootstrap-notify': '/public/lib/bootstrap/js/bootstrap-notify',
        'jquery.select2': '/public/lib/jquery/jquery.select2.min',
        'jquery.changeElementType': '/public/lib/jquery/jquery.changeElementType',
    }
});


require([
    'require',
    'jquery',
    'underscore',
    'knockout',
    'knockout.mapping',
    'domReady',
    'bootstrap',
    'jquery.loadmask',
    'jquery.select2',
    'jquery.changeElementType',
    'bootstrap-notify',
], function(require, $, _, ko, koMapping) {
    //manually set the global ko property
    window.ko = ko;
    window.ko.mapping = koMapping;

    require([
            'ssb/ssb',
            'ssb/util/ajax',
            'ssb/util/bind',
            'ssb/util/browser',
            'ssb/util/data',
            'ssb/util/json',
            'ssb/util/ko',
            'ssb/util/layout',
            'ssb/util/notify',
            'ssb/util/router',
            'ssb/util/select'
        ],
        function() {
            ssb.util.router.route($('#Route').val());
        });
});



