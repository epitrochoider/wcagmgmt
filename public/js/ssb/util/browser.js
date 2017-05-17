define([
        'ssb/ssb'
],
    function () {

        var browser = {
            //Source: http://stackoverflow.com/questions/19491336/get-url-parameter-jquery-or-how-to-get-query-string-values-in-js
            getUrlParameter: function getUrlParameter(param) {
                var url = decodeURIComponent(window.location.search.substring(1));
                var urlVars = url.split('&');
                var paramName;

                for (var i = 0; i < urlVars.length; i++) {
                    paramName = urlVars[i].split('=');

                    if (paramName[0] === param) {
                        return paramName[1] === undefined ? true : paramName[1];
                    }
                }
            }
        };

        ssb.ns('util');
        ssb.util.browser = browser;

        return ssb.util.browser;
    });
