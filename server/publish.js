
// PUBLICATIONS FROM SERVER SIDE TO THE CLIENT  ===== CLIENT SUBSCRIBE AT THE /CLIENT/COMPONENTS/ROUTER.JS 

Meteor.publish('activeusers', function() {
  

   return Meteor.users.find({ "status.online": true });
});

Meteor.publish('usersmarker', function() {
  

   return Markers.find();
});

