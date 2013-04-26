// requireJS configuration
// models, views, modules, routers, templates are predefined for using with this micro framework
requirejs.config({
    baseUrl: 'js/',
    paths: {
        text:'vendor/text',
        modules: 'app/modules',
        models: 'app/models',
        views: 'app/views',
        routers: 'app/routers',
        templates: '../templates',
        localstorage: 'vendor/backbone.localStorage',
        backbone: 'vendor/amd/backbone',
        underscore: 'vendor/amd/underscore'
    },
    shim: {
        underscore: {
            exports: '_'
        },
        backbone: {
            deps: ['underscore'],
            exports: 'Backbone'
        },
        localstorage: {
            deps: ['backbone'],
            exports: 'Backbone'
        }
    }
});

// This is a module whitelist, module not defined in here will not be public accessed. 
var allowModules = ['TestModule'];

// Running the main entry require statement
require(['routers/AppRouter', 'vendor/bootstrap.min'], function(AppRouter, bootstrap) {
    new AppRouter({allowModules:allowModules});

    // Feel free to fill in the arguemnts whenever you need
    Backbone.history.start();
});
