define(function() {
    var TestModule = function(options) {
        this.options = options;
        this.globalView = this.options.globalView;
    };

    _.extend(TestModule.prototype, {
        ping: function() {
            this.globalView.getMain().html('Thank you for pinging me');
        },
        message: function() {
            this.globalView.getMain().html('This is message action of TestModule');
        },
        _default: function() {
            this.globalView.getMain().html('This is default action of TestModule');   
        }
    });
    
    return TestModule;
});
