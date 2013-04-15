/**
 *  AppRouter ( Default )
 *  This is the default App Router will handle generic case
 *  And you can also built on top or create your own Router
 *  If you choose to use your own router, make sure to change path in main.js
 */
define(['backbone','underscore', 'localstorage', 'views/AppGlobalView'],function(Backbone,_,localstorage, AppGlobalView) {
    var modules = {}, // this is for caching modules when instantiate
        appGlobalView; // this is the AppGlobalView instance


    // utility function using by Router and mixin to underscore
    _.mixin({
        capitalize: function(str) {
            return str.charAt(0).toUpperCase() + str.substring(1).toLowerCase();
        },
        parseQueryString: function(queryString) {
            var params = {};
            if(queryString){
                _.each(
                    _.map(decodeURI(queryString).split(/&/g),function(el,i){
                        var aux = el.split('='), o = {};
                        if(aux.length >= 1){
                            var val = undefined;
                            if(aux.length == 2)
                            val = aux[1];
                            o[aux[0]] = val;
                        }
                        return o;
                    }),
                    function(o){
                        _.extend(params,o);
                    }
                );
            }
            return params;
        }
    });
     
    appGlobalView = new AppGlobalView;

    // defining application router
    return Backbone.Router.extend({
        routes: {
            "": "routeHome",
            "?*querystring": "routeHome",
            ":module/:action?*querystring": "routeModuleAction",
            ":module/:action": "routeModuleAction",
            ":module?*queryString": "routeModule",
            ":module": "routeModule"            
        },
        initialize: function(options) {
            this.allowModules = options.allowModules;
        },
        routeHome: function(queryString) {
            var self = this;
            // we dynamically pull in module when we need it
            require(['modules/IndexModule'], function(Module) {
                modules['index'] = modules['index'] || new Module({router:self, globalView:appGlobalView});
                self._callModuleAction('index', '_default', queryString);
            });
        },
        routeModuleAction: function(module, action, querystring) {
            // we will pass router instance to all page module
            var self = this,
                moduleName = _(module).capitalize() + 'Module',
            // we convert the information into require string
                moduleToFetch = 'modules/' + moduleName;
          
            if(_.indexOf(this.allowModules, moduleName) >= 0) {

                // if the module has not seen before, we will fetch, instantiate and cache
                require([moduleToFetch], function(Module) {
                    // We instantiate the page module, calling the module action
                    // and if there is query string, we convert it into object
                    // and then pass it to the action
                    
                    // we dynamically pull in module when we need it
                    // we cache the instance
                    modules[module] = modules[module] || new Module({router:self, globalView:appGlobalView});
                    
                    // call the module action if existed or fall to _default    
                    self._callModuleAction(module, action, querystring);
                });
            } else {
                self.routeHome();
            }
        },
        routeModule: function(module, queryString) {
            this.routeModuleAction(module, '_default', queryString);
        },
        // this is a helper function for calling module action
        _callModuleAction: function(module, action, querystring) {
            module = modules[module];
 
            // if module action existed 
            if(module[action]) {
                module[action](_(querystring).parseQueryString());
            } else {
                if(module['_default']) {
                    module['_default'](_(querystring).parseQueryString());
                } else {
                    throw Error("Please define _default action  where requested action is not existed");
                }
            } 
        }
    });
});
