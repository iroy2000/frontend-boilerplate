define(function() {
    var TestModule = function(options) {
        this.options = options;
        this.globalView = this.options.globalView;
    };

    _.extend(TestModule.prototype, {
        pingAction: function() {
            this.globalView.getMain().html('Thank you for pinging me');
        },
        messageAction: function() {
            this.globalView.getMain().html('This is message action of TestModule');
        },
        indexAction: function() {
            this.globalView.getMain().html('This is default action of TestModule');   
        }
    });
    
    return TestModule;
});
