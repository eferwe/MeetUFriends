//CREATING GOOGLE MAP AND ASSIGN GOOGLEMAPS() OBJECT FROM GOOGLE MAPS API 

if (Meteor.isClient) {
  // BIG MAP 16
  // ZOOMED MAP 17 - DEFFOUT NOW
  //VERY CLOSE 18
  //POSSIBLE DIFFERENCE FOR DIFFERENT MAR_ZOOM !!! NEED TO BE TESTED!! PFFFFUUUUUUUU
  //STAITMENT NEED TO BE TESTED FOR GPS SIGNAL FOA ANOMALY DEPEND OF MAR_ZOOM!!!
  //FOR WEB VERSION CHANGE OF MAP_ZOOM CREATE DIFF GEOLOCATION (VERY SMALL DIFFERENCE INDEED) 
  // STAITMENT NEED TO BE CHECKED DIFFERENT INTERNET PROVIDERS FOR MORE PRESIZE CONCLUSION ABOUT THE WEB VERSION BUGS

  var MAP_ZOOM = 17;

  Meteor.startup(function() {
    // IN CASE OF PROBLEMS WITH GOOLE MAPS API THIS IS MY KEY FOR THE APP. WILL BE CHANGED WHEN THE GEEK FINISHED 
    GoogleMaps.load({key: 'AIzaSyAvJap_s2weHceoDCGz9WIHPAj4r-2Aq7g'});
    // GoogleMaps.load();
    Hooks.init();

     // Hooks.treatCloseAsLogout = true; // THIS IS NOT WORKING WITH accounts-facebook BECAUSE OF THE WAY HOW FACEBOOK WORK
  });


  


  Template.map.onCreated(function() {

    var self = this;


    GoogleMaps.ready('map', function(map) {
        var marker;

      // // Create and move the marker when latLng changes.
      
      // var latLng = Geolocation.latLng();
      //   var markers = {};

        
        var map;
      var markers = [];
        
        //HOOK THAT CATCH LOG OUT EVENT
        Hooks.onLoggedOut = function (userId) {
        
          console.log(userId);
          console.log(markers);
          
         var thisclient =  Markers.findOne({userId: userId});
         Session.set('thisclient', thisclient.userId);
         var clientthis = Session.get('thisclient');
         console.log(thisclient);
         console.log(Session.get('thisclient'));
         console.log(clientthis);

                Markers.remove(thisclient._id);
                                                                    
                Router.go('landing');
                // return  Notifications.addNotification("Good day", "Thank you for using the MeetUFriends APP", {type:parseInt(3, 10), timeout: parseInt(3000, 10), userCloseable: true  });
      }

       Meteor.call('getFriendsData', function(err, data) {           
                    console.log(data);             
               });

             Meteor.call('getUserData', function(err, data) { console.log(data); });


        

        self.autorun(function() {

         
            


         var currentuser = Meteor.users.findOne(Meteor.userId());        
        var currentusermarker = Markers.findOne({userId: Meteor.userId()});
        console.log(currentuser);
        console.log(currentusermarker);
        console.log(markers);
        var latLng = Geolocation.latLng();
       
        
        Session.set('client' , latLng );
        console.log(Session.get('client'));

        if (! latLng)
          return;
        console.log(latLng);  
          
         
         // CHECH FOR EXISTING FRIENDS MARKRES AND ADDING THEM AS WELL 
          if (Meteor.user()){  
             var thisclientuser = Meteor.users.findOne(Meteor.userId());          
             console.log("User FRIENDLIST:" + thisclientuser.friendslist);

             var friendid = thisclientuser.friendslist.map(function(x) { return x.id } );
             console.log(friendid);
              Session.set('friendslist', friendid);
              var friendsmarkers = Markers.find( { facebook : { $in: friendid }}).fetch(); 
              console.log(friendsmarkers);

              if (friendsmarkers) {

                  friendsmarkers.forEach(function(newDocument) {
                     if (!markers[newDocument.userId]){ 
                      console.log(newDocument);
                      
                      marker = new google.maps.Marker({
                      animation: google.maps.Animation.DROP,
                      position: new google.maps.LatLng(newDocument.latLng.lat, newDocument.latLng.lng),
                      map: map.instance,
                      id: newDocument.userId,
                      icon: newDocument.icon
                      });
                        markers[newDocument.userId] = marker;
                  console.log('new friend marker added' + marker.id); 
                  console.log( marker);
                   

                     
                        }
                  }); 
                   

                      console.log( marker);
              }
          } 



          



          //HOOK TO CATCH LOG-IN EVENT 
          Hooks.onLoggedIn = function (  userId) {

               Meteor.call('getFriendsData', function(err, data) {           
                    console.log(data);             
               });

             Meteor.call('getUserData', function(err, data) { console.log(data); });

            
            console.log('on onLoggedIn triggered');
            
              var faceId = Meteor.users.findOne(Meteor.userId());
              var curuserId = faceId._id;
               console.log(faceId._id);
              var face = faceId.services.facebook.id;
              var facepic = faceId.profilepic.location;
              console.log(faceId.services.facebook.id);

              
              var existmarker = Markers.findOne({userId: Meteor.userId()});
              if (existmarker) 
                return;
               
            
            Markers.insert({ _id: Meteor.userId() ,  latLng , facebook: face , userId: Meteor.userId() , icon: facepic});
            
            // return  Notifications.addNotification("Welcome", "Welcome to the MeetUFriends APP", {type:parseInt(3, 10), timeout: parseInt(3000, 10), userCloseable: true  });
          }




       if(currentusermarker) {
             Markers.update( currentusermarker._id , { $set: { latLng }});

             //CENTER THE MAP AND GIVE SET ZOOM NOT WORKING GOOD AT INTENSIVE TRAFFIC 
               // map.instance.setCenter(currentusermarker.latLng);        
               // map.instance.setZoom(MAP_ZOOM); 

               // if(Session.get('usergeoallow')) {
               //   map.instance.setCenter(Session.get('usergeo'));
               //   map.instance.setZoom(MAP_ZOOM);
               //   Session.set('usergeoallow', false);
               // }

               if(Session.get('usergeoallow')) {
                if(Session.get('lockonuser')) {
                    map.instance.setCenter(Session.get('usergeo'));
                   map.instance.setZoom(MAP_ZOOM);
                } 
                else {
                   map.instance.setCenter(Session.get('usergeo'));
                   map.instance.setZoom(MAP_ZOOM);
                   Session.set('usergeoallow', false);
                }               
               }
              
         }


         else {
          console.log('not exist markers');
          if (Meteor.user()){
           var faceId = Meteor.users.findOne(Meteor.userId());
           
          var curuserId = faceId._id;
           console.log(faceId._id);
          var face = faceId.services.facebook.id;
          var facepic = faceId.profilepic.location;
          console.log(faceId.services.facebook.id);
          Markers.insert({ _id: Meteor.userId() , latLng , facebook: face , userId: Meteor.userId() , icon: facepic});




          }
          //CENTER THE MAP AND GIVE SET ZOOM NOT WORKING GOOD AT INTENSIVE TRAFFIC
          // map.instance.setCenter(latLng);        
          //      map.instance.setZoom(MAP_ZOOM); 
         
         if(Session.get('usergeoallow')) {
                if(Session.get('lockonuser')) {
                    map.instance.setCenter(Session.get('usergeo'));
                   map.instance.setZoom(MAP_ZOOM);
                } 
                else {
                   map.instance.setCenter(Session.get('usergeo'));
                   map.instance.setZoom(MAP_ZOOM);
                   Session.set('usergeoallow', false);
                }               
               }

         }



          //CENTER THE MAP AND GIVE SET ZOOM NOT WORKING GOOD AT INTENSIVE TRAFFIC
          // map.instance.setCenter(latLng);        
           //    map.instance.setZoom(MAP_ZOOM); 

          // Session.get('usergeoallow');
          //  Session.get('usergeo');
          //  console.log(Session.get('usergeoallow'));
          //  console.log(Session.get('usergeo'));
             // if (Session.get('usergeoallow')) {


            // if(Session.get('usergeoallow')) {
            //      map.instance.setCenter(Session.get('usergeo'));
            //      map.instance.setZoom(MAP_ZOOM);
            //      Session.set('usergeoallow', false);
            //    }

            if(Session.get('usergeoallow')) {
                if(Session.get('lockonuser')) {
                    map.instance.setCenter(Session.get('usergeo'));
                   map.instance.setZoom(MAP_ZOOM);
                } 
                else {
                   map.instance.setCenter(Session.get('usergeo'));
                   map.instance.setZoom(MAP_ZOOM);
                   Session.set('usergeoallow', false);
                }               
               }




              
             // }

         

        

         //  CHEKING FOR DISTANCE  UNDER DEVELOPMENT FEATURE 
             // if(Meteor.user()) {
             //   var me = Markers.findOne({userId: Meteor.userId()});    // TRY WITH find().fetch() if its slow
             //   var onefriend  = Markers.findOne({userId: "vNiJZ3uGeNFFcEfJy"});
             //   console.log(me.latLng.lat);
             //   console.log(onefriend.latLng);
             //  GoogleDistance.get(
             //        {

             //      origin: [me.latLng.lat, me.latLng.lng],
             //      destination: [onefriend.latLng.lat, onefriend.latLng.lng]
             //    },
             //    function(err, data) {
             //      if (err) return console.log(err); 
             //      console.log(data);  
                
             //  });
             //  } 
      

      });
          
          


          // REACTIVE OBSERVETIONS OVER MARKERS COLLECTIONS FOR LIVE UPDATES OF GOOGLE MAP MARKERS 
             Markers.find().observeChanges({
        

        added: function (id, newDocument) {

          console.log(newDocument);
          console.log(id);
         
          if (Meteor.user()){
               
                 if (Meteor.userId() == id)  {
           var mepic  = Meteor.users.findOne(Meteor.userId());
           
           marker = new google.maps.Marker({
            // draggable: true,
            animation: google.maps.Animation.DROP,
            position: new google.maps.LatLng(newDocument.latLng.lat, newDocument.latLng.lng),
            map: map.instance,
            id: id,
            icon: mepic.profilepic.location 
             

          });

           
          
          markers[id] = marker;
          console.log('new marker added' + marker.id);
          console.log(  markers[id]);
          console.log(markers);
           

             
         // CHECH FOR EXISTING FRIENDS MARKRES AND ADDING THEM AS WELL 

             var thisclientuser = Meteor.users.findOne(Meteor.userId());          
             console.log("User FRIENDLIST:" + thisclientuser.friendslist);

             var friendid = thisclientuser.friendslist.map(function(x) { return x.id } );
             console.log(friendid);
              Session.set('friendslist', friendid);
              var friendsmarkers = Markers.find( { facebook : { $in: friendid }}).fetch(); 
              console.log(friendsmarkers);
                 
              if (friendsmarkers) {

                  friendsmarkers.forEach(function(newDocument) {
                     if (!markers[newDocument.userId]){ 
                     // if (!markers[id]){    
                       var friendspic = Meteor.users.findOne({"services.facebook.id": "newDocument.facebook" });
                         console.log(friendspic);  
                      marker = new google.maps.Marker({
                      animation: google.maps.Animation.DROP,
                      position: new google.maps.LatLng(newDocument.latLng.lat, newDocument.latLng.lng),
                      map: map.instance,
                      id: id,
                      icon: newDocument.icon
                      });
                        markers[id] = marker;
                  console.log('new friend marker added' + marker.id);
                  console.log(markers); 


                        }
                  }); 
                   

                    
              }


               
            }

                
          else {
                    
                    if (!marker[id]){ 
                      marker = new google.maps.Marker({
                          animation: google.maps.Animation.DROP,
                          position: new google.maps.LatLng(newDocument.latLng.lat, newDocument.latLng.lng),
                          map: map.instance,
                          // id: newDocument.userId,
                           id: id,
                          icon: newDocument.icon
                      });
                      
                      markers[id] = marker;
                      console.log('new friend marker added' + marker.id);
                      console.log(markers[id]); 
                      console.log(markers); 
                  }      
          }  
            


          }


        },
         
           changed: function (id, newDocument) {
            console.log(id);
            console.log(newDocument);
          if (Meteor.user()) { 
           markers[id] = marker;
          markers[id].setPosition({ lat: newDocument.latLng.lat, lng: newDocument.latLng.lng });
           
                            // CHECH FOR EXISTING FRIENDS MARKRES AND ADDING THEM AS WELL TO THE GOOGLE MAP     
             //    if (Meteor.user()) {                
             // var thisclientuser = Meteor.users.findOne(Meteor.userId());          
             // console.log("User FRIENDLIST:" + thisclientuser.friendslist);

             // var friendid = thisclientuser.friendslist.map(function(x) { return x.id } );
             // console.log(friendid);

             //  var friendsmarkers = Markers.find( { facebook : { $in: friendid }}).fetch(); 
             //  console.log(friendsmarkers);

             //  if (friendsmarkers) {
             //      friendsmarkers.forEach(function(newDocument) {
             //         markers[newDocument._id] = marker;
             //         markers[newDocument._id].setPosition({ lat: newDocument.latLng.lat, lng: newDocument.latLng.lng });
             //      });    
             //  }
            }
        },
        removed: function (id) {
         
             
                console.log(markers);
                console.log(id);
               
                console.log(Session.get('thisclient'));

             





         
          markers[id].setMap(null);
          // delete markers[id];
          //    markers = [];   

          // for (id in markers ) {
          // markers[id].setMap(null);
          // }

           


       //      if (marker.id = id) {

       //    marker.setMap(null);
        
       //    //  markers.length  = 0;

       //     delete markers[id];
       //      }





           
            // OLD TRY
             // if(!Meteor.user()){
             //  console.log('no current user');
             //    if(Meteor.users.find().count()>0) {
             //      console.log('there is active users');
             //      console.log(document.userId);
             //     var b = Meteor.users.find().fetch();
             //       console.log(b);
             //       markers = []
             //    }
             // } 



        }

      });
          
                          

             

    });
  });


  // Template.map.autorun({

  // });



  Template.map.helpers({
    geolocationError: function() {
      var error = Geolocation.error();
      return error && error.message;
    },
    mapOptions: function() {
      

      var latLng = Geolocation.latLng();
      // Initialize the map once we have the latLng.
      if (GoogleMaps.loaded() && latLng) {
        return {
          center: new google.maps.LatLng(latLng.lat, latLng.lng),
          zoom: MAP_ZOOM
        };
      }



      //  var latLng1 = Session.get('usergeo');  
      // var self = Session.get('usergeoallow');
      // var latLng = Geolocation.latLng();
      // self.autorun(function() {


          
      // Initialize the map once we have the latLng.
      //  if (Session.get('usergeoallow')) {
      //   return {
      //     center: new google.maps.LatLng(latLng1.lat, latLng1.lng),
      //     zoom: MAP_ZOOM
      //   };
      // }
      // else {
        
      //Initialize the map once we have the latLng.
      // if (GoogleMaps.loaded() && latLng) {
      //   return {
      //     center: new google.maps.LatLng(latLng.lat, latLng.lng),
      //     zoom: MAP_ZOOM
      //   };
      // }
      }




      });

      





    }
    
//   });
// }











 // console.log(Session.get('usergeoallow'));
 //           console.log(Session.get('usergeo'));
 //             if (Session.get('usergeoallow')) {
 //              map.instance.setCenter(Session.get('usergeo'));
 //             }





