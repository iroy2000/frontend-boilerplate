requirejs.config({
    baseUrl: '/js/',
    paths: {
        text:'vendor/text',
        modules: 'app/modules',
        models: 'app/models',
        views: 'app/views',
        routers: 'app/routers',
        templates: '../templates',
        localstorage: 'vendor/backbone.localStorage',
        backbone: 'vendor/amd/backbone',
        underscore: 'vendor/amd/underscore',
        jasmine: 'test/lib/jasmine-1.3.1/jasmine',
        'jasmine-html': 'test/lib/jasmine-1.3.1/jasmine-html',
        spec: 'test/spec'
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
        },
        jasmine: {
            exports: 'jasmine'
        },
        'jasmine-html': {
            deps:['jasmine'],
            exports: 'jasmine'
        }
    }
});


require(['jasmine-html'], function(jasmine) {
    var jasmineEnv = jasmine.getEnv();
    jasmineEnv.updateInterval = 1000;

    var htmlReporter = new jasmine.HtmlReporter();

    jasmineEnv.addReporter(htmlReporter);

    jasmineEnv.specFilter = function(spec) {
        return htmlReporter.specFilter(spec);
    };
 
    var specs = [];
    
    specs.push('spec/ApplicationRouteSpec');

    $(function() {
        require(specs, function() {
            jasmineEnv.execute();
        });
    });
});
