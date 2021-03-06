
var SHOW_CONNECTION_ISSUE_KEY = 'showConnectionIssue';
Session.setDefault(SHOW_CONNECTION_ISSUE_KEY, false);

var CONNECTION_ISSUE_TIMEOUT = 5000;
var usergeo;


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



Template.home.events({
    

    'click [name=done]' : function(event, template) {
            event.preventDefault();
            location.reload();
            Router.go('/');
    },

    'click [name=lock]' : function(event, template) {
            event.preventDefault();
            if(Session.get('lockonuser'))  {
              Session.set('lockonuser', false);
            }
            else {
                Session.set('lockonuser', true);
                Session.set('usergeoallow', true);
                Session.set('usergeo', usergeo.latLng);
            }
          
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
      
    },
    
    'click a.hashroot': function() {
           // var usergeo = Meteor.users.findOne(this._id);
            usergeo = Markers.findOne(this._id);
           var userName = Meteor.users.findOne(this._id);
           console.log(usergeo.latLng);
           Session.set('usergeoallow', true);
           Session.set('usergeo', usergeo.latLng);
           Session.set('userName', userName.profile.name);
           Session.set('userPic', usergeo.icon);
           // console.log(Session.get('userName'));
           // console.log(Session.get('userPic'));
      
    },

    'click a.hashrootnav': function() {
           // var usergeo = Meteor.users.findOne(this._id);
           // var usergeo = Markers.findOne(this._id);
           // var userName = Meteor.users.findOne(this._id);
           // console.log(usergeo.latLng);
       
            Session.set('usergeoallow', true);
           Session.set('usergeo', usergeo.latLng);

         
           
           // Session.set('userName', userName.profile.name);
           // Session.set('userPic', usergeo.icon);
           // console.log(Session.get('userName'));
           // console.log(Session.get('userPic'));
      
    },

    
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
        userPic: function() {
            return Session.get('userPic');
        }, 

        userName: function() {
            return Session.get('userName');
        },

        userlock : function()  {
          return Session.get('lockonuser');
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



