var YourName = document.getElementById("YourName");
var YourID =  document.getElementById("YourID");
var RecieverID = document.getElementById("RecieverID");
var msg = document.getElementById("Message");
var sendbtn = document.getElementById("sendmsg");


function sendmsg(){
if(YourName.value.length <= 2){
alert("Write Name before submitting notification")
return false;
}
else if(RecieverID.value ==""){
    alert("Please Select Reciever's ID")
    return false;
}else if(msg.value.length <5 ){
    alert("Please Write message with atleast 5 characters")
    return false;
}

else{
//When all validation true,then push msg/notif
sendbtn.className ="btn btn-info animated zoomOut"
sendbtn.setAttribute("onclick","")
firebase.database().ref('Messages').push({

    Name: YourName.value,
    RecieverID: RecieverID.value,//Here we are giving reciever id so that we can send notifcations to all the tokens registered with this user's id
    SenderID: firebase.auth().currentUser.uid, 
    msg:msg.value.slice(0,80)

}).then(function(){
    sendbtn.className ="btn btn-info animated zoomIn"
msg.value = '';

    setTimeout(function(){
        msg.value = ''; //Making sure that value of msg is empty
    sendbtn.setAttribute("onclick","sendmsg()")//Idhar humne 1second ka time out k bad send message wala function wapis lagadia, takay aik sath 2 message nahi jae agar user ne 2-33 bar click kia to bhe single message jaega kio k udhar se hum onclick ka function hatadia tha or values empty karne k 1second bad wapis lagadia..!
},500)
    launch_toast()
}).catch(function(){
    sendbtn.className ="btn btn-info animated zoomIn"
    sendbtn.setAttribute("onclick","sendmsg()")
})

}
}




















///CHECKING FOR USER LOGIN:= 
 

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.

      sendbtn.setAttribute("onclick","sendmsg()")
document.getElementById("sendnotifdiv").className ="";

$("#modalLRForm").modal('hide');

YourName.value = user.displayName;

YourID.value = user.uid;
firebase.database().ref(`USERS/${user.uid}`).set({Name:user.displayName});

setTimeout(function(){
firebase.database().ref(`USERS/`).on('child_added',function(users){


    

console.log(users.val())

    
    RecieverID.innerHTML +=  ` <option value="${users.key}" >${users.child("Name").val() +": " + users.key} </option>`;

})

},300)
      // ...
    } else {
      // User is signed out.
      document.getElementById("sendnotifdiv").className ="fade";

      $("#modalLRForm").modal({backdrop: 'static', keyboard: false})  

      // ...
    }
  });







  firebase.messaging().onMessage(function(payload) {
 
    //console.log(payload)
  
       var notifsound = new Audio('/notification.m4a');
    notifsound.play()
  
      


      onPAGEnotification(payload.notification.title.substring(13),payload.notification.body,payload.notification.icon)


      //onPAGEnotification(name,msg)

      //function pushnotif(title,msg,type,time,url,imglink)
    
      
      
      console.log(payload)
     
      // ...
    });