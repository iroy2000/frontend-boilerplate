define(function() {
    var Model, Collection;

    Model = Backbone.Model.extend({
        defaults: function() {
            return {
                name: 'no name',
                age: 0
            };
        },
        validate: function(attrs, options) {

            if(!attrs.name || _.isNull(attrs.name)) {
                return 'Name is a required field';
            } 

            if(isNaN(attrs.age) || !attrs.age) {
                return 'Age should be a number';
            } 
            
            if(attrs.age > 130) {
                return 'World Record\'s age is still less than 130 ...';
            }
        }
    });

    Collection = Backbone.Collection.extend({
        model: Model,
        localStorage: new Backbone.LocalStorage("test-framework"),
        comparator:'name'
    });

    return {
        Model:Model,
        Collection:Collection
    }
});
