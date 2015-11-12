function Facebook(accessToken) {
    this.fb = Meteor.require('fbgraph');
    this.accessToken = accessToken;
    this.fb.setAccessToken(this.accessToken);
    this.options = {
        timeout: 3000,
        pool: {maxSockets: Infinity},
        headers: {connection: "keep-alive"}
    }
    this.fb.setOptions(this.options);
}




Facebook.prototype.query = function(query, method) {
    var self = this;
    var method = (typeof method === 'undefined') ? 'get' : method;
    var data = Meteor.sync(function(done) {
        self.fb[method](query, function(err, res) {
            done(null, res);
        });
    });
    return data.result;
}



Facebook.prototype.getUserData = function() {
    return this.query('me/picture');
    // return this.query('10206744452681879/picture');
}

Facebook.prototype.getFriendsData = function() {
    return this.query('/me/friends');
}


Meteor.methods({
    //SHOWS CURRENT USER
    getUserData: function() {
        var fb = new Facebook(Meteor.user().services.facebook.accessToken);
        var data = fb.getUserData();
        // Markers.update(this.userId, {$set: {profilepic: data}});   //POSSIBLE FIRST NEED TO BE CHECKED IF MARKER EXISTS!!!
        Meteor.users.update(this.userId, {$set: {profilepic: data}});
        return data;
    },

    // SHOWS USER FRIENDS LIST AND ASSIGN IT INTO USERS COLLECTION 
    // TASK TO DO TO ASSIGN THIS METHOD TO FUNCTION ON LOGGING IN PROVIDED FROM THE USER-STATUS PACKAGE - MORE INFO https://github.com/mizzao/meteor-user-status  
    getFriendsData: function() {   
    var fb = new Facebook(Meteor.user().services.facebook.accessToken);
    var data = fb.getFriendsData();
     Meteor.users.update(this.userId, {$set: {friendslist: data.data}});
    return data.data;

    }


});



