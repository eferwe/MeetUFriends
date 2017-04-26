var SHOW_CONNECTION_ISSUE_KEY = 'showConnectionIssue';
Session.setDefault(SHOW_CONNECTION_ISSUE_KEY, false);

var CONNECTION_ISSUE_TIMEOUT = 5000;


//REGISTER BACK BUTTON DEVICE SENSOR BUTTON EVENT === TESTED AND WORK VERY GOOD ON ANDROID
// if(Meteor.isCordova){
//   Meteor.startup(function(){
//     document.addEventListener("backbutton", function(){
//       if (history.state && history.state.initial === true) {
//         navigator.app.exitApp();
//       } else {
//         history.go(-1);
//       }
//     });
//   });
// }

if(Meteor.isCordova || Meteor.isMobile){
  Meteor.startup(function(){
    document.addEventListener("backbutton", function(){
       var message = "Did you want to exit?";
       if (confirm(message)) {
        navigator.app.exitApp();
      }
    });
  });
}


Template.landing.onCreated(function() {
//HOOK TO CATCH LOG-IN EVENT 
          // Hooks.onLoggedIn = function (  userId) {

               Meteor.call('getFriendsData', function(err, data) {           
                    console.log(data);             
               });

             Meteor.call('getUserData', function(err, data) { console.log(data); });

            
            console.log('on onLoggedIn triggered');
            
            //   var faceId = Meteor.users.findOne(Meteor.userId());
            //   var curuserId = faceId._id;
            //    console.log(faceId._id);
            //   var face = faceId.services.facebook.id;
            //   var facepic = faceId.profilepic.location;
            //   console.log(faceId.services.facebook.id);

              
            //   var existmarker = Markers.findOne({userId: Meteor.userId()});
            //   if (existmarker) 
            //     return;
               
            
            // Markers.insert({ _id: Meteor.userId() ,  latLng , facebook: face , userId: Meteor.userId() , icon: facepic});
            
            // return  Notifications.addNotification("Welcome", "Welcome to the MeetUFriends APP", {type:parseInt(3, 10), timeout: parseInt(3000, 10), userCloseable: true  });
          // }
});

Template.landing.helpers({

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
          
         // if ( Meteor.users.find({"services.facebook.id": { $in: friendid }}).count() > 0 ) {
           // if ( Meteor.users.find({}).count() > 0 ) {
            if ( Meteor.users.find({  _id : { $ne : "LGFjM2x4jNXpdi6Ay" }}).count() > 0 ) {
          console.log("Notifications called");
           Meteor.call('userNotification','friend(s) online','friend(s) online', "LGFjM2x4jNXpdi6Ay");
         } 


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


Template.landing.events({

	'click [name=done]' : function(event, template) {
			event.preventDefault();
		Router.go('/map');
	},

    'click #btn-user-friends': function(e) {
        if(Meteor.user()){
        console.log(Meteor.user().services.facebook.id);
          }
    var users = Meteor.users.find({}).fetch();
    console.log(users);
        users.forEach(function(u) {
                console.log("signed for the app users:" + u.profile.name);
                
               }); 



        Meteor.call('getFriendsData', function(err, data) {
             $('#result1').text(JSON.stringify(data, undefined, 4));
              var i;
             for (i in data) {
                console.log("active facebook friends ID: [ARRAY]" + data[i].id + data[i].name);
                
            }
        var users = Meteor.users.find({}).fetch();
        var friendid = data.map(function(x) { return x.id } );
        console.log('Mapping just the IDs of friendslist --- friends IDS:' + friendid);
          
        var friend = Meteor.users.find({"serices.facebook.id": { $in: friendid }}).fetch();
        console.log("active facebook friends try1:" + friend);   

        var friend1 = Meteor.users.find({"serices.facebook.id": { $in: [friendid] }});
        console.log("active facebook friends try2:" + friend1); 
        friend1.forEach(function(i) {
            console.log("active facebook friends try3:" + i);  
        });
        
      
              
         });



        Meteor.call('getUserData', function(err, data) { console.log(data); });

    },

    'click #menu-toggle': function(e) {
        e.preventDefault();
        $("#wrapper").toggleClass("toggled");
    },

    'click li.wiped': function() {
      if (Meteor.isCordova) {  
         $("#wrapper").toggleClass("toggled");
      }   
      // if ( Meteor.isMobile || $(window).width() < 768  ) {  
      //    $("#wrapper").toggleClass("toggled");
      // }   
      
    }


});

