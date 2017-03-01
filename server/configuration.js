// INSTRUCTIONS =====  YOU NEED TO MARK ONE OF THE CONFIGURATION ==== ONLY ONE CAN BE ACTIVE!!!
// THE appId AND secret KEYS ARE FROM MY FACEBOOK DEV. ACCOUNT PLACED TO EASY DEBUGING OF THE APP. AFTER FINISH OF THE GEEK I WILL CHENGE THEM!!!

// paiak.meteor.com

// ServiceConfiguration.configurations.remove({
// 	service: 'facebook'
// });

// ServiceConfiguration.configurations.insert({
// 	service: 'facebook',
// 	appId: '1684656365104031' ,
// 	secret: '62a77c0f3905e052db9a3365a4840fe3' ,
// 	 loginStyle: 'redirect'
// });



//LOCAL HOST

ServiceConfiguration.configurations.remove({
	service: 'facebook'
});

ServiceConfiguration.configurations.insert({
	service: 'facebook',
	appId: '1018842964833747' ,
	secret: '0db23a93bac0ae19de030480e86e0d19' ,
	loginStyle: 'redirect'
});



// paiak.herokuapp.com

// ServiceConfiguration.configurations.remove({
// 	service: 'facebook'
// });

// ServiceConfiguration.configurations.insert({
// 	service: 'facebook',
// 	appId: '1684656365104031' ,
// 	secret: '62a77c0f3905e052db9a3365a4840fe3' ,
// 	 loginStyle: 'redirect'
// });