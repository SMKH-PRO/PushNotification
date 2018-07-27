const functions = require('firebase-functions');

const admin = require('firebase-admin');

admin.initializeApp();


exports.PushNotif = functions.database.ref('/Messages/{pushId}').onCreate((snapshot)=>{

const Reciever = snapshot.val().RecieverID
const payload = {
 notification: {
    title: `New Msg from ${snapshot.val().Name}`,
    body: snapshot.val().msg,
    icon: `icon.png`,
    click_action: 'https://YourDomain.com'

 }

}

console.log(Reciever)
let Tokens = []

return admin.database().ref('fcmTokens').orderByValue().equalTo(Reciever).once('value',(Token)=>{

    

if(Token.val()){


    
    Tokens =   Object.keys(Token.val())
    

    return admin.messaging().sendToDevice(Tokens, payload)

}

})

});