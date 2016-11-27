// questionModel1.findOne({questionId:'C_13'},function(err,data){
//   if(err) 
//     console.log(err)
//   else {
//     console.log(data)
// sendTextMessage(938355996293359,data.question);}
// })


function callPNRAPI(userID, userTextMessage) {

}
// function sendUnableToParseMessage() {
//   //Sorry we didn't understand your message please try again'
//   sendTextMessage();
// }


function methodLog(methodName) {
  console.log("Method: "+methodName);
}

function Log(logMessage) {
  console.log(logMessage);
}

function fixed() {
  var messageData = { recipient : { id:'938355996293359' },message:{ text:'generic reply'} }
  setup(messageData);
}

// request({
//   uri : "http://api.railwayapi.com/pnr_status/pnr/2123266407/apikey/rxpbp1586/",
//   json : true,
//   method : 'GET',
//   headers : {'content-type' : 'application/json'}
// }, function(error, response, body ){
//   if(error)
//     console.log(error)
//   if(response)
//     console.log(response)
//   if(body)
//   console.log(body);    
// })


app.post('/add',function(req,res){
    // console.log(req.body);
// sendTextMessage(req.body.productData.product_code,req.body.productData.product_name);
// callcustomMethod(req.body.productData.product_code);
// setup(req.body.productData.product_code);
// { 
//      "recipient": { "id": 938355996293359 },
//      "message": { "text": f11 } 
//     }

// console.log(typeof req.body.productData.product_code);
var k = JSON.parse(req.body.productData.product_code);
// console.log(typeof k);
// console.log(k)
// console.log(k.message)
setup(k)
})








 else if(payload == "droplet_show") {
  } else if(payload == "droplet_create") {
    //batch this request
    // sendTextMessage(senderId,"create your droplet by following these simple steps")      
  } else if(payload == "droplet_delete") {
    
  } else if(checkImageType(payload)) {

  }




  //check image type
    else if(payload == "droplet_imagetype_snapshot") {
     //fetch snapshot and pass to messageData
      // Messenger.askSnapshot(senderId)
  } else if(payload == "droplet_imagetype_distribution") {
      Messenger.askDistribution(senderId)
  } else if(payload == "droplet_imagetype_oneclick") {
      // Messenger.askOneClickApps(senderId)
  }


  
  else {
    sendTextMessage(senderId,"currently we only have C questions")
  }