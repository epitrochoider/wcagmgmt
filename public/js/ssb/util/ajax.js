define([
        'ssb/ssb'
],
    function () {

        var ajax = {
            //Use to Read: cRud
            getJSON: function (url, id, data) {
                if (id)
                    url += '/' + id;
                return $.ajax({
                    url: url,
                    contentType: 'application/json',
                    type: 'GET',
                    data: data
                });
            },

            // Here, we divert from the standard REST, becuase 
            // only GET and POST actions are recognized in Internet Explorer 9.
            // Action verbs must be indicated in the url used.
            
            // Use to Create, Update, Delete: CrUD
            postJSON: function (url, data) { // Use to CREATE new records
                return $.ajax({
                    url: url,
                    contentType: 'application/json',
                    type: 'POST',
                    data: data
                });
            }
        };

        ssb.ns('util');
        ssb.util.ajax = ajax;

        return ssb.util.ajax;
    });
