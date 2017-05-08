# wcagmgmt
Progress manager for WCAG 2.0 Compliance

## Project demo on my [personal site](http://ssbbart.chaserichardson.com/).

This application was created as a tool to help developers keep track of their progress, challenges and notes for accesibility compliance in accordance with WCAG 2.0. This is a basic we application to show case interface, html structure and javascript structure. All html was based on the patterns of the bootstrap framework. All javascript was built using jquery and require for dependency management and initialization.

## Points of Development

* All libraries, utilities and modules initialized with require framework dependency, similar to node.js
* Nested lists created from flat lists, with bindings to produce different heading elements depending on level of nesting.
* Data callback completion notifications with notify.js to notify users when dom is updated.
* Media queries used for responsive transitions in html/css.
* Module javascript organized in well defined modules with clear designations to data, layout and event layers.
* Integrated & created REST json api at mockable.io
* Knockout.js used for form binding on 'requrement/detail' page.
* Detail page covers single entry review (summary), editing (saving), adding/creating, and deleting.

## Next Steps

* Implement testing framework and unit tests for all javsacript functions.
* Restructure ajax calls for Internet Explorer
** Internet Explorer does not support deferred ajax object execution: $.when().then()
*** Create new deferment handling into 'ssb.util.ajax' utility, based on feature sniffing.
** Internet Explorer does not support Cross Origin Requests using jQuery.
*** Use IE native ajax request handler for CORs, or create mock json api on same domain, apart from mockable.io service.
* Add in modal confirmation request for Delete action.
* Accessibility quality control.

##Timeframe

I've had time to do the above in the last week, and I'll tackle the next portions of develop next. I plan to get to these in the next week or two.