var ssb;

define([],
    function() {
        ssb = {
            ns: function(namespace) {
                var parts = namespace.split('.');
                var parent = this;

                if (parts[0] == "ssb") {
                    parts = parts.slice(1);
                }

                var pl = parts.length;

                for (var i = 0; i < pl; i++) {
                    if (typeof parent[parts[i]] == 'undefined') {
                        parent[parts[i]] = {};
                    }
                    parent = parent[parts[i]];
                }

                return parent;
            }
        };

        return ssb;
    });