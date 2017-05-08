define([
        'ssb/ssb'
],
    function () {

        var ajax = {
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
            postJSON: function (url, data) { // Use to CREATE new records
                return $.ajax({
                    url: url,
                    contentType: 'application/json',
                    type: 'POST',
                    data: data
                });
            }, 
            putJSON: function (url, data) { // Use to UPDATE new records
                return $.ajax({
                    url: url,
                    contentType: 'application/json',
                    type: 'PUT',
                    data: data
                });  
            },
            deleteJSON: function (url) {
                return $.ajax({
                    url: url,
                    contentType: 'application/json',
                    type: 'DELETE'
                });  
            }
        };

        ssb.ns('util');
        ssb.util.ajax = ajax;

        return ssb.util.ajax;
    });
