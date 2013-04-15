// define application main container view which will share by all modules
// Note: This is abstracting the 'high level' page as one global view
//       and you can also create individual view for each module if you need.
// Note: This is a stub at this point, please define in the way that fits your need.
//       You can define your own events in global veiw, a good candidate would be login logout button.
//       But there could be many other use cases as well.
define(['backbone'],function(Backbone) {
    // -- important! -- Below is an example, please define to your own need
    return Backbone.View.extend({
        el: '.container',
        // accessor for main section in template
        getMain: function() {
            this.$mainContent = this.$mainContent || this.$el.find('.main');
            return this.$mainContent;
        },
        getSideBar: function() {
        },
        getHeader: function() {
        },
        getFooter: function() {
        },
        getNav: function() {
        }
    });
});
