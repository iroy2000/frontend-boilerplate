define(['routers/AppRouter'], function(AppRouter) {
    var allowModules = ['TestModule'];
    describe("Application Router", function() {
        beforeEach(function() {
            this.router = new AppRouter({allowModules:allowModules});
            this.routerSpy = jasmine.createSpy('RouterSpy');
            Backbone.history.start();

            // Reset URL or router test will fail
            this.router.navigate('js/test/SpecRunner.html');
        });

        afterEach(function() {
            Backbone.history.stop();

            // Reset URL or router test will fail
            this.router.navigate('js/test/SpecRunner.html');

        });

        it('should have a default route', function() {
            expect(this.router.routes['']).toEqual('routeHome');
        });

        it('should by default call the default route', function() {
            this.router.on('route:routeHome', this.routerSpy, this);
            this.router.navigate('/', {trigger:true});

            expect(this.routerSpy).toHaveBeenCalled();
        });

        it('should still call default route when passing query string to home page', function() {
            this.router.on('route:routeHome', this.routerSpy, this);
            this.router.navigate('?test=123', {trigger:true});

            expect(this.routerSpy).toHaveBeenCalled();
        }); 

        it('should call the routeModule route', function() {
            this.router.on('route:routeModule', this.routerSpy, this);
            this.router.navigate('/test?test=1', {trigger:true});

            expect(this.routerSpy).toHaveBeenCalled();
        });

        it('should call the routeModuleAction route', function() {
            this.router.on('route:routeModuleAction', this.routerSpy, this);
            this.router.navigate('/test/ping', {trigger:true});
        });
    });
});
