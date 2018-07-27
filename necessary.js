











function launch_toast() {
    var x = document.getElementById("toast")
    x.className = "show";
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 5000);
}












//LOGIN AND SIGNUP BELO


var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;



//Login SignUp
function signup(){

    
    
    e_address = document.getElementById("modalLRInput12").value;
    
    namebox = document.getElementById("name").value;
    
    pass=document.getElementById("modalLRInput13").value;
    pass_cnfrm=document.getElementById("modalLRInput14").value;
    
    
    if(namebox.length > 12){
        
        alert("Name Should Be Shorter Than 11 Characters");
        return false;
    }
    else if(namebox.length < 3){
        
        alert("Name Should Be Atleast 3 Characters Long"); 
         return false;
    }
    else if(/^[a-zA-Z ]+$/.test(namebox) !== true){
        
        alert("Invalid Name, Only Alphabets Allowed (A-z)"); 
         return false;
    }
    else if(e_address.length<6){
        alert("Please Write Valid Email Address."); 
         return false;
    }
    else if(pass<6 ){
        alert("Password Needs To Be 6 Characters Long.."); 
    }
    
    else if(pass==pass_cnfrm ){
   
     
    
    //FireBase SignUp
    var signup= firebase.auth().createUserWithEmailAndPassword(e_address, pass);
    signup.catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      
      
      alert(errorMessage+", "+errorCode)
      // ...
    });
    
    signup.then(function() {
      // Handle Errors here.
      
      
    // console.log('%c'+firebase.auth().currentUser, 'font-weight: bold; font-size: 20px;color: red; text-shadow: 0px 0px 10px black; border: 2px Solid black; padding:6px; border-radius:10px; display:block;');
    
    
    var user = firebase.auth().currentUser;
    
    user.updateProfile({
      displayName:  namebox,
      photoURL: "/defaultuser.png"
    }).then(function() {
      // console.log(user.displayName)


      
    }).catch(function(error) {
      // An error happened.
      shownotif("Error",error,"danger","1")
    });
        
    
      // ...
    });
    
   
 
    
    //firebase signup above
    
    
    
    
    }
    else{
       alert("Password didn't matched, try again")
    
    }
    }



    document.getElementById("signup-btn").addEventListener("click", signup);


    document.getElementById("modalLRInput12").addEventListener("keydown",function(event){

        if (event.keyCode == 13) { // console.log('only enter pressed') 
        signup()
               }

    });
    
    document.getElementById("name").addEventListener("keydown",function(event){

        if (event.keyCode == 13) { // console.log('only enter pressed') 
        signup()
               }

    });
    
    document.getElementById("modalLRInput13").addEventListener("keydown", function(event){

        if (event.keyCode == 13) { // console.log('only enter pressed') 
        signup()
               }

    });
    document.getElementById("modalLRInput14").addEventListener("keydown", function(event){

        if (event.keyCode == 13) { // console.log('only enter pressed') 
        signup()
               }

    });
     
   
   



function login(){
	

	
    var email = document.getElementById('modalLRInput10').value;
	var pass = document.getElementById('modalLRInput11').value;
	
	 var n = localStorage.getItem("email_address");
   	var p =localStorage.getItem("password");
	
		if(re.test(email) === true && pass.length > 5){
		    
		    alert("Please Wait While We Are Logging You In..!")
		
		var signin =firebase.auth().signInWithEmailAndPassword(email, pass);
		signin.catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  
  alert(errorMessage+", "+errorCode)
  // ...
});
signin.then(function(user) {
  // Handle Errors here.

  
  alert(user.uid+" Logged in as "+user.email)
  

 location.reload();
  // ...
});

	}
	
	else{
	    
	    if (email == "" || email == null || email == " "){
	        alert(" Email Is Missing, Please write email to login.")
	    }
	    
	     else if (pass == "" || pass == null || pass == " "){
	        alert("Password Box Is Empty, Please write Password to login.")
        }
        else if(re.test(email)=== false){
            alert("Invalid Email")
        }
        else if(pass.length < 6){
            alert("Password incorrect. ")
        }
     
	    else{
 alert(" Email or Password is invalid, Please write a valid email & password")}
	}
    
    
}//login function ends here	













document.getElementById("modalLRInput10").addEventListener("keydown", function(event){ if (event.keyCode == 13) { console.log('only enter pressed') 
       login()
              }});
              
              
              
    document.getElementById("modalLRInput11").addEventListener("keydown", function(event){
        
         if (event.keyCode == 13) { console.log('only enter pressed') 
       login()
              }
        
    });
    document.getElementById("btn-login").addEventListener("click", login);






    function onPAGEnotification(name,msg,img){
        document.getElementById("desc").innerHTML = `<strong style="font-weight:999">${name}</strong>: ${msg}`;
        document.getElementById("ToastImg").src = img;
        setTimeout(function(){

            document.getElementById("desc").innerHTML = `Notification Has Been Sent..!!!`;
            document.getElementById("ToastImg").src = "icon.png"
        },5500)
        launch_toast()
    }





















    //Service Worker

    

if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
      navigator.serviceWorker.register('sw.js').then(function(registration) {
        // Registration was successful
        
        firebase.messaging().useServiceWorker(registration);
        
        
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        
            function saveMessagingDeviceToken(){
      
       firebase.messaging().getToken().then(function(currentToken) {
      if (currentToken) {
        console.log('Got FCM device token:', currentToken);
        // Saving the Device Token to the datastore.
        firebase.database().ref('/fcmTokens').child(currentToken)
            .set(firebase.auth().currentUser.uid);
      } else {
        // Need to request permissions to show notifications.
        requestforpermision()
      }
    }).catch(function(error){
      console.error('Unable to get messaging token.', error);
    });
      }//Savetoken ends here
      
      
       function requestforpermision(){
       firebase.messaging().requestPermission().then(function() {
      // Notification permission granted.
      saveMessagingDeviceToken();
    }).catch(function(error) {
      console.error('Unable to get permission to notify.', error);
      
      
      alert("Your Notifications Are Disabled")
    });
      
      }//Req Permisison ends here
      requestforpermision()
    } });
      
      
      
      
      
      
      
      
      
      
        console.log('ServiceWorker registration successful with scope: ', registration.scope);
      }, function(err) {
        // registration failed :(
        console.log('ServiceWorker registration failed: ', err);
      });
    });
  }
  