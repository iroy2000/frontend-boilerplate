/*
 * IndexModule is the homepage page module which is handle by a different route
 * Note:
 *    For each module 'constructor', you will have options argument which currently contains
 *    1) router instance
 *    2) a globalView ( which abstract your whole page as high level view )
 *    3) any query string that pass in
 */
define(['models/Test', 'views/test/TestListView'],function(TestData, TestListView) {
    var IndexModule = function(options) {
        // if you define in 'this' context, everything is sharable by all actions
        this.options = options;
        this.globalView = this.options.globalView;
        
        // if you define in 'this' context, everything is sharable by all actions
        this.collection = new TestData.Collection;

        this.view = new TestListView({
            el: this.globalView.getMain(),
            collection: this.collection
        });

    };

    _.extend(IndexModule.prototype, {
        _default: function() {
            this.collection.fetch(); 
        }
    });

    return IndexModule;
});
