// INSTRUCTIONS =====  YOU NEED TO MARK ONE OF THE CONFIGURATION ==== ONLY ONE CAN BE ACTIVE!!!
// THE appId AND secret KEYS ARE FROM MY FACEBOOK DEV. ACCOUNT PLACED TO EASY DEBUGING OF THE APP. AFTER FINISH OF THE GEEK I WILL CHENGE THEM!!!

// paiak.meteor.com

// ServiceConfiguration.configurations.remove({
// 	service: 'facebook'
// });

// ServiceConfiguration.configurations.insert({
// 	service: 'facebook',
// 	appId: 'YOUR_APPID' ,
// 	secret: 'YOUR_APP_SECRET' ,
// 	 loginStyle: 'redirect'
// });



//LOCAL HOST

ServiceConfiguration.configurations.remove({
	service: 'facebook'
});

ServiceConfiguration.configurations.insert({
	service: 'facebook',
	appId: 'YOUR_APPID' ,
	secret: 'YOUR_APP_SECRET' ,
	loginStyle: 'redirect'
});