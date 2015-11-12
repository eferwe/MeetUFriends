
var SHOW_CONNECTION_ISSUE_KEY = 'showConnectionIssue';
Session.setDefault(SHOW_CONNECTION_ISSUE_KEY, false);

var CONNECTION_ISSUE_TIMEOUT = 5000;


Template.home.events({
    

    'click [name=done]' : function(event, template) {
            event.preventDefault();
            location.reload();
            Router.go('/');
    },

    'click #menu-toggle': function(e) {
            e.preventDefault();
            $("#wrapper").toggleClass("toggled");
    },

    'click li.wiped': function() {
          if (Meteor.isCordova) {  
             $("#wrapper").toggleClass("toggled");
          }   
          if ( Meteor.isMobile || $(window).width() < 768  ) {  
             $("#wrapper").toggleClass("toggled");
          }   
      
    }


    
});

Template.home.helpers({

        friends : function() {
            if (Meteor.userId()) {
  
            var thisclientuser = Meteor.users.findOne(Meteor.userId());          
             console.log("User FRIENDLIST:" + thisclientuser.friendslist);

             var friendid = thisclientuser.friendslist.map(function(x) { return x.id } );
             console.log(friendid);
          


             //QUERY THIS CLIENT USER + THIS CLIENT FRIENDSLIS ==== FACEBOOK  FREINDS
             // WE ALREADY BEEN FILTERED ONLY ACTIVE USERS FROM PUBLISH-SUBSCRIBE OPTIONS [ files :    ] 
             var friend1 = Meteor.users.find( {$or : [{ _id : Meteor.userId() },{"services.facebook.id": { $in: friendid }}]}).fetch();    
            
            console.log("active facebook friends1:" + friend1);

            // each loop for find and match 
             return friend1;
            }
        },
        cordova: function() {
            return Meteor.isCordova && 'cordova';
        }, 

        connected: function() {
            if (Session.get(SHOW_CONNECTION_ISSUE_KEY)) {
              return Meteor.status().connected;
            } else {
              return true;
            }
        }

    
 

});



