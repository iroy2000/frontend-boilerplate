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

var allowModules = ['TestModule'];

require(['routers/AppRouter', 'vendor/bootstrap.min'], function(AppRouter, bootstrap) {
    new AppRouter({allowModules:allowModules});
    Backbone.history.start();
});
