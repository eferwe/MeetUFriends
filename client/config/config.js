

// CHOSING WHAT PART OF FACEBOOK GRAPH API TO OBTAIN INTO SIGN-IN OBJECT 

Accounts.ui.config({
    requestPermissions: {
        facebook: ['email', 'user_friends', 'user_location', 'user_events', 
            
            'user_status'],
            requestPermissions: ['user_friends'] //here you are requesting the permission to get the user's friends
    }
});


// Accounts.ui.config({
//     requestPermissions: {
//         facebook: ['email', 'user_friends'],
//     }
// });


Push.Configure({
   android: {
    senderID : 583382691970,
    alert : true,
    badge : true,
    sound : true,
    vibrate : true,
    clearNotifications : true
     
   }
 });
