var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var FB = require('fb');
var options = { server: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } }, 
                replset: { socketOptions: { keepAlive: 300000, connectTimeoutMS : 30000 } } };
var request = require('request');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var config = require('./public/config');
var Messenger = require('./MessengerMethods.js');
var DoMethod = require('./DoMethods.js')
var Const = require('./Constant.js');
var Conversation = require('./UserStackMethods.js');
FB.options({version:'v2.6'})



app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json({}));
app.use(bodyParser.urlencoded({extended:true}));
app.use('/bower_components',  express.static(__dirname + '/bower_components'));
const APP_SECRET = (process.env.MESSENGER_APP_SECRET) ? process.env.MESSENGER_APP_SECRET :config.appSecret;
const VALIDATION_TOKEN = (process.env.MESSENGER_VALIDATION_TOKEN) ?(process.env.MESSENGER_VALIDATION_TOKEN) :config.validationToken;
const PAGE_ACCESS_TOKEN = (process.env.MESSENGER_PAGE_ACCESS_TOKEN) ?(process.env.MESSENGER_PAGE_ACCESS_TOKEN) :config.pageAccessToken;
if (!(APP_SECRET && VALIDATION_TOKEN && PAGE_ACCESS_TOKEN)) {console.error("Missing config values");process.exit(1);}
const rishabh = 938355996293359;
// var serverUrl = "mongodb://198.199.103.93:11588/messengerbotdb -u messengerbotdb -p 4cd4048d35e8c48c94b7fad660a4c9ab"
var serverURL = "mongodb://messengerbotdb:4cd4048d35e8c48c94b7fad660a4c9ab@198.199.103.93:11588/messengerbotdb"
mongoose.connect(serverURL)
// 'mongodb://localhost:27017/rishabh'

var db = mongoose.connection;
db.on('error', console.error);
db.once('open', function() {
  // Create your schemas and models here.
console.log("connected successfully");
});

function checkPageSubscription(data){ // Make sure this is a page subscription
  if(data.object == 'page')  return true;
  else  return false;
}
    var DistributionSchema = new Schema({
        id :  {type:Number},
        name : {type:String},
        distribution : {type:String},
        slug : {type:String},
        public: {type:Boolean},
        regions : {type:Array},
        created_at : {type:String},
        min_disk_size :  {type:Number},
        type: {type:String},
        size_gigabytes : {type:Number},   
    });
    var DistributionModel = mongoose.model('DistributionModel',DistributionSchema);
//------------------------------------------------------------------------------------------------------------------------------------------------
   var SizeSchema = new Schema({
        slug : {type:String},
        memory :  {type:Number},
        vcpus :  {type:Number},
        disk :  {type:Number},
        transfer :  {type:Number},
        price_monthly :  {type:Number},
        price_hourly :  {type:Number},
        regions : {type:Array},
        available: {type:Boolean},
    });
    var SizeModel = mongoose.model('SizeModel',SizeSchema);
//------------------------------------------------------------------------------------------------------------------------------------------------
var userSchema = new Schema({
    auth : {type:Object,required:true},
    senderId : {type:String,unique:true,required:true},
    conversation : {type:Array},
});
var userModel = mongoose.model('userModel',userSchema);
//------------------------------------------------------------------------------------------------------------------------------------------------

// DoMethod.droplet(rishabh)//ask create/delete/show droplet quick reply


var userStack = [];
var userDropletData = new Array();
//------------------------------------------------------------------------------------------------------------------------------------------------
// var test = new Array();
// test[12] = {}
// test[12].name = "Exmaple"
// test[12].size = "512Mb"
// test[12].image = "ubuntu-14-04-x64"
// test[12].region = "nyc3"
// console.log(test[12])

// userModel.remove(function(err,data){
//   if(err)
//   console.log(err)
//   else
//   console.log(data)
  
// })

// userModel.find({},function(err,data){
//   if(err)
//   console.log(err)
//   else
//   console.log(data)
// })

// DoMethod.dropletOperation(rishabh,15861654,'5b0806a552b893f3a18527687571ba88baf96cab63c9246a8a74c5a02a641bf3');
//  DoMethod.dropletDelete(rishabh,33110816,'5b0806a552b893f3a18527687571ba88baf96cab63c9246a8a74c5a02a641bf3')
// userDropletData[rishabh] = {}
// userDropletData[rishabh].name = "testAPI";
// userDropletData[rishabh].region = "nyc2";
// userDropletData[rishabh].size = "512mb";
// userDropletData[rishabh].image = "ubuntu-14-04-x64"
// console.log(userDropletData[rishabh])

// userModel.findOne({senderId:rishabh},function(err,data){
//   console.log("OYOYO")
//     if(err)
//       console.log(err);
//     else  {
//       var token = JSON.parse(data.auth)
//       console.log(token.access_token)
//       DoMethod.ListAllDroplets(rishabh,token.access_token)
//     }
// })

// var pp = "payload_info_1233"
// console.log(pp.substr(13))


// var userData = {};
// userData.senderId = rishabh;
// userData.conversation = []
// userData.conversation.push("typeofimage")
// userStack.push(userData)

// textReply(rishabh,"cjdhfhdj")


// SizeModel.find({$and:[{slug:'512mb'},{}]},'slug regions',function(err,data){
//   if(err)
//   console.log(err)
//   else
//   console.log(typeof data[0].regions);
// console.log(data[0].regions)
// })

// Messenger.askRegion(rishabh, '512mb',SizeModel,Messenger);
// Messenger.askDropletName(rishabh)

// if(userStack.length != 0) {
//   console.log("if")
// } else {
//   console.log("else");
// }
// console.log(userStack)
// Conversation.start(rishabh)
// Conversation.start(rishabh, userStack, "test")
// console.log(userStack)
// quickReplyPayload(rishabh,"droplet_create")
// quickReplyPayload(rishabh,"droplet_create")
// var distributions =

// DoMethod.getSize(SizeModel,function(data){
//   console.log("callback hell")
//   // console.log(data);
// });

// DoMethod.dropletInfo(rishabh,33106325,'5b0806a552b893f3a18527687571ba88baf96cab63c9246a8a74c5a02a641bf3');
// DoMethod.powerOff(rishabh,33120472,'5b0806a552b893f3a18527687571ba88baf96cab63c9246a8a74c5a02a641bf3');
// console.log(distributions.images)
// Messenger.askDistribution(rishabh);

//-----------------------------------------------------------------------------------------------------------------------------------------------------

function showRandomQuestion(senderId,language) {
  //fetch ramdon/sequential question from question collection where language is C and user array should not contain senderID
  // questionModel.find({}) 
}
//-----------------------------------------------------------------------------------------------------------------------------------------------------
function receivedMessage(event) {
  var senderId = event.sender.id;//where message come from
  var timeOfMessage = event .timestamp;
  var message = event.message; var messageId = message.mid;
  var messageText = message.text; var messageAttachments = message.attachments;

  if (event.message.text && event.message.quick_reply && event.message.quick_reply.payload ) {
    console.log(event.message);
    quickReplyPayload(senderId,event.message.quick_reply.payload)
  } else if(event.message.text ) {
    console.log(event.message);
    textReply(senderId,event.message.text)
  } else if (event.message.attachments) {
    sendTextMessage(senderID, "Message with attachment received");
  }
}//end of function receivedMessage  sent message with id mid.1480101092734:76f0dc8597 to recipient 938355996293359
//-----------------------------------------------------------------------------------------------------------------------------------------------------

function parseUsertextMessage(userID, userTextMessage) {
  methodLog("parseUsertextMessage");
  //check if entered text is  a PNR no(ie. 10 digit neumeric no)
  if( userTextMessage.lenght ==10 && !isNaN(userTextMessage) ) {
    callPNRAPI(userID, userTextMessage);
  } else {
    sendTextMessage(userID, "Sorry we didn't understand your message please try again")
  }
}

//-----------------------------------------------------------------------------------------------------------------------------------------------------


function callcustomMethod(customCode){
  console.log("calling custom method")
  callSendAPI(customCode)   
}

function sendTextMessage(recipientId, messageText) {
  var messageData = { recipient: { id: recipientId }, message: { text: messageText } };
  setup(messageData);
  // callSendAPI(messageData);
}

function setup(messageData) {
  console.log("calling setup ");
  console.log(messageData);
  callSendAPI(messageData);
}
// askLanguage(938355996293359);
// sendCTopics(938355996293359)

// var token = 0daf00e6b3a57a49d872c5ad3f3e5e47eaa0460e873d140168b1427022799df4;
// ListAllDroplets()
// DigitalOceanRegion()




function DigitalOceanRegion() {
  console.log("DigitalOcean Region List");
  var endPoint = "https://api.digitalocean.com/v2/regions";
  request({
    uri : endPoint,
    method:'GET',
    headers : { 'content-type': 'application/json'  }, 
    auth:{'bearer':'0daf00e6b3a57a49d872c5ad3f3e5e47eaa0460e873d140168b1427022799df4'},
  },function(error, response, body) {
    console.log(typeof body);
    var bodyMain = JSON.parse(body)
    console.log(bodyMain);
  console.log(typeof bodyMain)
    if(error) {
      console.log(error)
    }
  })
  
}

// function
function createDroplet(token) {
  console.log("Creating Droplet")
  var endPoint = "https://api.digitalocean.com/v2/droplets";
  var createDropletBody = {};
  request({
    uri : endPoint,
    method:'POST',
    auth:{'bearer':'0daf00e6b3a57a49d872c5ad3f3e5e47eaa0460e873d140168b1427022799df4'},
    headers : { 'content-type': 'application/json'  }, 
    body : createDropletBody
  },function(error, response, body) {
    console.log(typeof body);
    var bodyMain = JSON.parse(body)
    console.log(bodyMain.droplets[0]);
    // console.log(response.status)
    if(error) {
      console.log(error)
    }
  })
  
}
function askDigitalOceanLogin(senderId) {
  var messageData = {};
  var authorizeEndPoint = "https://cloud.digitalocean.com/v1/oauth/authorize";
  var clientId = "a1f0ba1ea9b7802d515082a2fdd3e42d746dbf9e7a62edf1e4740054c0acb3ae";
  var clientSecret
  // var redirectURI = "http://localhost:5000/docallback";
  var redirectURI = "https://do.whoisrishabh.in/docallback";
  var responseType = "code";
  var scope = "read write"; 
  var buttonWebLogin = {            
    "type":"web_url",
    "title":"Login 　",
	  "webview_height_ratio": "tall",
	  "messenger_extensions":true,
    "url":authorizeEndPoint+"?client_id="+clientId+"&redirect_uri="+redirectURI+"&response_type="+responseType+"&scope="+scope+"&state="+senderId,
	  "fallback_url": authorizeEndPoint+"?client_id="+clientId+"&redirect_uri="+redirectURI+"&response_type="+responseType+"&scope="+scope+"&state="+senderId          
}
  Messenger.setSender(messageData,parseInt(senderId));
  Messenger.initAttachmentMessage(messageData);
  Messenger.setAttachmentType(messageData,"template");
  Messenger.initAttachmentPayload(messageData);
  Messenger.setAttachmentPayloadType(messageData,"button");
  Messenger.setAttachmentPayloadText(messageData,"Welcome to DigitalOcean Bot");
  Messenger.initAttachmentPayloadButtons(messageData)
    Messenger.pushAttachmentPayloadButton(messageData,buttonWebLogin)
  // console.log(messageData);
  // console.log(messageData.message.attachment.payload);
  callSendAPI(messageData)
}

app.get('/docallback',function(req,res){
    res.sendFile(__dirname + '/public/docallback.html')
  if(isValidSenderId(req.query.state)) {
    // res.send("you are successfully LoggedIn now you can close this window");
    requestUserDigitalOceanAccessToken(req.query.code,req.query.state) 
  }
})
function isValidSenderId(senderId) {
  return true;
}
function requestUserDigitalOceanAccessToken(authCode, senderId) {
  console.log("requestUserDigitalOceanAccessToken METHOD")
  request({
    uri :'https://cloud.digitalocean.com/v1/oauth/token',
    qs : { grant_type:'authorization_code',
           code:authCode,
           state:senderId,
           client_id:'a1f0ba1ea9b7802d515082a2fdd3e42d746dbf9e7a62edf1e4740054c0acb3ae',
           client_secret:'250236621c296e2d72a4d634479d080b0046cf7c159972ed64209b592f9d37c0',
           redirect_uri:'https://do.whoisrishabh.in/docallback'
          },
    method: 'POST',
  },function(error, response, body){
     if(error) {
        console.log(error)
      } else {
        var bodyMain = JSON.parse(body)
        console.log(typeof body)
        console.log(typeof bodyMain)
        console.log(bodyMain)
        var User = new userModel();
        User.auth = bodyMain;
        User.senderId = senderId;
        console.log(User);
        console.log(typeof User.senderId)
        console.log(typeof User.auth)
        User.save(User,function(err,data){
          if(err)
          console.log(err)
          else
          console.log(data);
        })
        successLoginShowMenu(senderId)
      }
  })
}
function successLoginShowMenu(senderId) {

  var messageData = {};
  var buttonWebLogin = {            
    "type":"postback",
    "title":"Show Menus",
    "payload":"show_menu"
}
  Messenger.setSender(messageData,parseInt(senderId));
  Messenger.initAttachmentMessage(messageData);
  Messenger.setAttachmentType(messageData,"template");
  Messenger.initAttachmentPayload(messageData);
  Messenger.setAttachmentPayloadType(messageData,"button");
  Messenger.setAttachmentPayloadText(messageData,"Thanks for Login, tap menu to explore");
  Messenger.initAttachmentPayloadButtons(messageData)
  Messenger.pushAttachmentPayloadButton(messageData,buttonWebLogin)
  console.log(messageData);
  console.log(messageData.message.attachment.payload);
  callSendAPI(messageData)
}


function askLanguage(senderId) {
  var messageData = {};
var C = { "content_type":"text","title":Const.language[0],"payload":Const.language_Payload[0] };
var CPP = { "content_type":"text","title":Const.language[1],"payload":Const.language_Payload[1] };
var JAVA = { "content_type":"text","title":Const.language[2],"payload":Const.language_Payload[2] };
var MONGODB = { "content_type":"text","title":Const.language[4],"payload":Const.language_Payload[4] };
  Messenger.setSender(messageData,parseInt(senderId));
  Messenger.setQuickReplyText(messageData,Const.selectLanguage);
  Messenger.initQuickReplyElement(messageData);
  Messenger.pushQuickReplyElement(messageData,C);
  Messenger.pushQuickReplyElement(messageData,CPP);
  Messenger.pushQuickReplyElement(messageData,JAVA);
  Messenger.pushQuickReplyElement(messageData,MONGODB);
  console.log(messageData)
  callSendAPI(messageData)

}

function callSendAPI(messageData) {
  request({
    uri: 'https://graph.facebook.com/v2.6/me/messages',
    qs: { access_token: PAGE_ACCESS_TOKEN },
    method: 'POST',
    body : messageData,
    headers : { 'content-type': 'application/json'  }, 
    json: true

  }, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var recipientId = body.recipient_id;
      var messageId = body.message_id;

      console.log("Successfully sent message with id %s to recipient %s",messageId, recipientId);
    } else {
      console.error("Unable to send message.");
        console.log(error);
      console.log(body)
    }
  });  
}

app.post('/webhook', function (req, res) {
  var data = req.body;
  if(checkPageSubscription(data)) {
    // Iterate over each entry
    // There may be multiple if batched
    data.entry.forEach(function(pageEntry) {
      var pageID = pageEntry.id;
      var timeOfEvent = pageEntry.time;
      // Iterate over each messaging event
      pageEntry.messaging.forEach(function(messagingEvent) {

        if (messagingEvent.message) {//Either QUICK_REPLY or Message (text,image,video,location)
            console.log("Event: message");
          receivedMessage(messagingEvent);
        } else if (messagingEvent.postback) {
          receivedPostback(messagingEvent);
        }
         else {
            console.log("Event: unhandled", messagingEvent);
        }
      });
    });

    // Assume all went well.
    // You must send back a 200, within 20 seconds, to let us know you've 
    // successfully received the callback. Otherwise, the request will time out.
    res.sendStatus(200);
  }
});


app.get('/', function(req, res) {
    res.json({"name":"dimitri","password":"dimitri"})
});

app.get('/webhook', function(req, res) {
  if (req.query['hub.mode'] === 'subscribe' &&
      req.query['hub.verify_token'] === VALIDATION_TOKEN) {
    console.log("Validating webhook");
    res.status(200).send(req.query['hub.challenge']);
  } else {
    console.error("Failed validation. Make sure the validation tokens match.");
    res.sendStatus(403);          
  }  
});


app.post('/add',function(req,res){
    console.log(req.body);
// sendTextMessage(req.body.productData.product_code,req.body.productData.product_name);
// callcustomMethod(req.body.productData.product_code);
var jd = JSON.parse(req.body.productData.product_code)
// console.log(jd)
callSendAPI(jd)
})
app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

//------------------------------------------------------------------------------------------------------------------------------------------------

function quickReplyPayload(senderId, payload) {
  console.log("quickReplyPayload Method ")
if(payload.substr(0,9) == "poweroff_") {
      userModel.findOne({senderId:senderId},function(err,data){
        console.log("POWERING OFF  ")
        if(err)
          console.log(err);
          else  {
            // var token = JSON.parse(data.auth);
          console.log(data.auth.access_token)
          var bodyData = {type:"power_off"};
          DoMethod.powerOff(senderId,payload.substr(9),data.auth.access_token,bodyData)
          }
      })      

} else if(payload.substr(0,8) == "poweron_") {
      userModel.findOne({senderId:senderId},function(err,data){
        console.log("POWERING ON  ")
        if(err)
          console.log(err);
          else  {
            // var token = JSON.parse(data.auth)
          console.log(data.auth.access_token)
          var bodyData = {type:"power_on"};
          DoMethod.powerOff(senderId,payload.substr(8),data.auth.access_token,bodyData)
          }
      })      


}
else{
  switch(payload) {

//Droplet Action    
    case "droplet_show":
      // sendTextMessage(senderId,"displaying list of droplet")
      userModel.findOne({senderId:senderId},function(err,data){
        console.log("SHOW DROPLOET LIST ")
        if(err)
          console.log(err);
          else  {
            // var token = JSON.parse(data.auth)
          console.log(data.auth.access_token)
          DoMethod.ListAllDroplets(senderId,data.auth.access_token)
          }
      })      
      Conversation.updateConversationTopic(senderId, userStack, payload)
      console.log(userStack);
      break;
    case "droplet_create" :
      Messenger.askTypeOfImage(senderId);
      userDropletData[senderId] = {};//initial create droplet array for user
      Conversation.updateConversationTopic(senderId, userStack, payload)
      console.log(userStack)
      break;
    // case "droplet_delete" :
    //   sendTextMessage(senderId,"deleting droplet")
    //   Conversation.updateConversationTopic(senderId, userStack, payload)
    //   console.log(userStack)
    //   break;

//Type of Images 
     case "droplet_imagetype_snapshot" : 
      Messenger.askSnapshot(senderId)
      Conversation.updateConversationTopic(senderId, userStack, "typeofimage")
      break;
      case "droplet_imagetype_distribution":
        Messenger.askDistribution(senderId);
      Conversation.updateConversationTopic(senderId, userStack, "typeofimage")
        // Conversation.start(senderId, userStack, payload);
        console.log(userStack);
        break;
      case "droplet_imagetype_oneclick":
        Messenger.askOneClickApps(senderId)
      Conversation.updateConversationTopic(senderId, userStack, "typeofimage")
        break;

//NON ssh Distribution
      case "droplet_image_ubuntu":
        // console.log(Messenger);
        Messenger.askDistributionVersion(senderId,"Ubuntu",DistributionModel,Messenger);
      Conversation.updateConversationTopic(senderId, userStack, payload)
        break;
      case "droplet_image_fedora":
        Messenger.askDistributionVersion(senderId,"Fedora",DistributionModel,Messenger);
      Conversation.updateConversationTopic(senderId, userStack, payload)
        break;
      case "droplet_image_debian":
        Messenger.askDistributionVersion(senderId,"Debian",DistributionModel,Messenger);
      Conversation.updateConversationTopic(senderId, userStack, payload)
        break;
      case "droplet_image_centos":        
        Messenger.askDistributionVersion(senderId,"CentOS",DistributionModel,Messenger);
      Conversation.updateConversationTopic(senderId, userStack, payload)
        break;
// Distribution Version

//TODO: need to save this image slug
  case  "debian-8-x64":
    Messenger.askSizeType(senderId)
    userDropletData[senderId].image = payload;
    Conversation.updateConversationTopic(senderId, userStack, payload)    
    break;
  case  "debian-8-x32":
    Messenger.askSizeType(senderId)
    userDropletData[senderId].image = payload;
    Conversation.updateConversationTopic(senderId, userStack, payload)    
    break;
  case  "debian-7-x64":
    Messenger.askSizeType(senderId)
    userDropletData[senderId].image = payload;
    Conversation.updateConversationTopic(senderId, userStack, payload)    
    break;
  case  "debian-7-x32":
    Messenger.askSizeType(senderId)
    userDropletData[senderId].image = payload;
    Conversation.updateConversationTopic(senderId, userStack, payload)    
    break;  
  case  "centos-7-x64":
    Messenger.askSizeType(senderId)
    userDropletData[senderId].image = payload;
    Conversation.updateConversationTopic(senderId, userStack, payload)    
    break;
  case  "centos-6-x64":
    Messenger.askSizeType(senderId)
    userDropletData[senderId].image = payload;
    Conversation.updateConversationTopic(senderId, userStack, payload)    
    break;
  case  "centos-6-x32":
    Messenger.askSizeType(senderId)
    userDropletData[senderId].image = payload;
    Conversation.updateConversationTopic(senderId, userStack, payload)    
    break;
  case  "centos-5-x64":
    Messenger.askSizeType(senderId)
    userDropletData[senderId].image = payload;
    Conversation.updateConversationTopic(senderId, userStack, payload)    
    break;
  case  "centos-5-x32":
    Messenger.askSizeType(senderId)
    userDropletData[senderId].image = payload;
    Conversation.updateConversationTopic(senderId, userStack, payload)    
    break;  
  case  "ubuntu-16-10-x32":
    Messenger.askSizeType(senderId)
    userDropletData[senderId].image = payload;
    Conversation.updateConversationTopic(senderId, userStack, payload)    
    break;
  case  "ubuntu-16-10-x64":
    Messenger.askSizeType(senderId)
    userDropletData[senderId].image = payload;
    Conversation.updateConversationTopic(senderId, userStack, payload)    
    break;
  case  "ubuntu-14-04-x32":
    Messenger.askSizeType(senderId)
    userDropletData[senderId].image = payload;
    Conversation.updateConversationTopic(senderId, userStack, payload)    
    break;
  case  "ubuntu-14-04-x64":
    Messenger.askSizeType(senderId)
    userDropletData[senderId].image = payload;
    Conversation.updateConversationTopic(senderId, userStack, payload)    
    break;
  case  "ubuntu-12-04-x64":
    Messenger.askSizeType(senderId)
    userDropletData[senderId].image = payload;
    Conversation.updateConversationTopic(senderId, userStack, payload)    
    break;
  case  "ubuntu-12-04-x32":
    Messenger.askSizeType(senderId)
    userDropletData[senderId].image = payload;
    Conversation.updateConversationTopic(senderId, userStack, payload)    
    break;
  case  "ubuntu-16-04-x64":
    Messenger.askSizeType(senderId)
    userDropletData[senderId].image = payload;
    Conversation.updateConversationTopic(senderId, userStack, payload)    
    break;
  case  "ubuntu-16-04-x32":
    Messenger.askSizeType(senderId)
    userDropletData[senderId].image = payload;
    Conversation.updateConversationTopic(senderId, userStack, payload)    
    break;
  case "fedora-23-x64" :
    Messenger.askSizeType(senderId)
    userDropletData[senderId].image = payload;
    Conversation.updateConversationTopic(senderId, userStack, payload)    
    break;
  case "fedora-24-x64":
    Messenger.askSizeType(senderId)
    userDropletData[senderId].image = payload;
    Conversation.updateConversationTopic(senderId, userStack, payload)    
      break;

  case "size_standard":
      Messenger.askStandardSize(senderId);
    Conversation.updateConversationTopic(senderId, userStack, payload)    
        break;
  case "high_memory":
  Messenger.askHighSize(senderId);
    Conversation.updateConversationTopic(senderId, userStack, payload)    
        break;

//Size 
//TODO: need to save size slug


//Region
// need to save region slug

// "ams1",

case "nyc1":
  Messenger.askDropletName(senderId);
  userDropletData[senderId].region = payload;
  Conversation.updateConversationTopic(senderId, userStack, payload)    
  break;
case "nyc2":
  Messenger.askDropletName(senderId);
  userDropletData[senderId].region = payload;
  Conversation.updateConversationTopic(senderId, userStack, payload)    
  break;
case "nyc3":
  Messenger.askDropletName(senderId);
  userDropletData[senderId].region = payload;
  Conversation.updateConversationTopic(senderId, userStack, payload)    
  break;
case "ams2":
  Messenger.askDropletName(senderId);
  userDropletData[senderId].region = payload;
  Conversation.updateConversationTopic(senderId, userStack, payload)    
  break;
case "ams3":
  Messenger.askDropletName(senderId);
  userDropletData[senderId].region = payload;
  Conversation.updateConversationTopic(senderId, userStack, payload)    
  break;
case "sfo1":
  Messenger.askDropletName(senderId);
  userDropletData[senderId].region = payload;
  Conversation.updateConversationTopic(senderId, userStack, payload)    
  break;
case "sfo2":
  Messenger.askDropletName(senderId);
  userDropletData[senderId].region = payload;
  Conversation.updateConversationTopic(senderId, userStack, payload)    
  break;
case "blr1":
  Messenger.askDropletName(senderId);
  userDropletData[senderId].region = payload;
  Conversation.updateConversationTopic(senderId, userStack, payload)    
  break;
case "fra1":
  Messenger.askDropletName(senderId);
  userDropletData[senderId].region = payload;
  Conversation.updateConversationTopic(senderId, userStack, payload)    
  break;
case "lon1":
  Messenger.askDropletName(senderId);
  userDropletData[senderId].region = payload;
  Conversation.updateConversationTopic(senderId, userStack, payload)    
  break;
case "sgp1":
  Messenger.askDropletName(senderId);
  userDropletData[senderId].region = payload;
  Conversation.updateConversationTopic(senderId, userStack, payload)    
  break;
case "tor1":
  Messenger.askDropletName(senderId);
  userDropletData[senderId].region = payload;
  Conversation.updateConversationTopic(senderId, userStack, payload)    
  break;
case "menu_scope":
Messenger.askMenu(senderId);
Conversation.updateConversationTopic(senderId, userStack, "menu_scope")    
break;


  }//end of switch case
}//end of else
}//end of quick reply pauload method
//------------------------------------------------------------------------------------------------------------------------------------------------

function textReply(senderId, text) {
  console.log("Text REPLY METHOD---------------------->")
  console.log(userStack);
  if(userStack && userStack.length > 0) {
    console.log("stack length is larger")
    if(text == "menu") {
      console.log("Menu pressed by user")
      Messenger.askMenu(senderId);
      Conversation.updateConversationTopic(senderId, userStack, "menu_scope")    

    } else {
    userStack.forEach(function(element) {
      if(element.senderId == senderId && element.conversation[0] && element.conversation.length > 0) {
        console.log("sende entry match on userStack && conversation is non empty")
        console.log(element)
        if(element.conversation[0] == "droplet_create") {
          console.log("Intrupted in droplet_create")
          Messenger.askTypeOfImage(senderId);
        } else if( element.conversation[0] == "droplet_show") {
            //display list again 
            console.log("Intrupted in droplet_show")
            //need to implement
        } else if( element.conversation[0] == "droplet_delete") {
            console.log("Intrupted in droplet_delete")
            //TODO: need to implement
        } else if( element.conversation[0] == "typeofimage") {
            console.log("Intrupted in typeofImage")
            Messenger.askDistribution(senderId);
        } else if( element.conversation[0] == "droplet_image_ubuntu"){
            console.log("Intrupted in ubuntuversion")
            Messenger.askDistributionVersion(senderId,"Ubuntu",DistributionModel,Messenger);         
        } else if( element.conversation[0] == "droplet_image_fedora"){
            console.log("Intrupted in fedora version")
            Messenger.askDistributionVersion(senderId,"Fedora",DistributionModel,Messenger);
        } else if( element.conversation[0] == "droplet_image_debian"){
            console.log("Intrupted in debian version")
            Messenger.askDistributionVersion(senderId,"Debian",DistributionModel,Messenger);         
        } else if(element.conversation[0] == "droplet_image_centos"){
            console.log("Intrupted in centos version")
            Messenger.askDistributionVersion(senderId,"CentOS",DistributionModel,Messenger);
        } else if(element.conversation[0] == "droplet_menu"){
            console.log("Intrupted in showing droplet options like create droplet delete droplet")
            DoMethod.droplet(senderId)
        } else if(element.conversation[0] == "menu_scope"){
            console.log("Intrupted in menu scope")
            sendTextMessage(senderId, "Sorry I didn't understand please use menu ");
        } 
        
        else if(text == 'login') {
          console.log("login pressed by user")
          askDigitalOceanLogin(senderId)
        } else if(text == "menu") {
          console.log("Menu pressed by user")
          Messenger.askMenu(senderId);
          Conversation.updateConversationTopic(senderId, userStack, "menu_scope")    
        } else if(text[0] == "#") {
          console.log("inital Text id HASH")
          userDropletData[senderId].name = text.substr(1);
          console.log(userDropletData[senderId])
            Messenger.showCreateDropletReview(senderId,userDropletData[senderId])


        }

      // }// end of sender == sende
      }//end of serderid if
    }, this);      
    }//end of else
    
  }//end of stacklength if 
 
  else {
        console.log("stack length is 0")
        console.log(text);
        if(text == "login") {
          askDigitalOceanLogin(senderId)
        } else if(text == "menu") {
          Messenger.askMenu(senderId);
      Conversation.updateConversationTopic(senderId, userStack, "menu_scope")    
          
        } 
        else {
        sendTextMessage(senderId, "Sorry I didn't understand please choose above option");
        }
  }


}
//-----------------------------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------------------
function receivedPostback(event) {
  var senderId = event.sender.id;//where message come from
  var timeOfMessage = event .timestamp;
  var postback = event.postback;
  var payload = postback.payload;
  console.log("ReceivedPOstBAck Methos")
  console.log(payload);
if(payload.substr(0,16) == "droplet_id_info_") {
console.log("DRPOLET INFO POSTBACK RECEIVED")
  userModel.findOne({senderId:senderId},function(err,data){
    console.log("Custome Generic postback")
    if(err)
      console.log(err);
      else  {
        // var token = JSON.parse(data.auth)
      console.log(data.auth.access_token)
    DoMethod.dropletInfo(senderId,payload.substr(16),data.auth.access_token)
      }
  })

} else if(payload.substr(0,21) == "droplet_id_operation_") {
console.log("DRPOLET OPERATION POSTBACK RECEIVED")
  userModel.findOne({senderId:senderId},function(err,data){
    console.log("Custome Generic postback")
    if(err)
      console.log(err);
      else  {
        // var token = JSON.parse(data.auth)
      console.log(data.auth.access_token)
      DoMethod.dropletOperation(senderId,payload.substr(21),data.auth.access_token)
      }
  })

} else if(payload.substr(0,18) == "droplet_id_delete_") {
console.log("DRPOLET DELETE POSTBACK RECEIVED")
  userModel.findOne({senderId:senderId},function(err,data){
    console.log("Custome Generic postback")
    if(err)
      console.log(err);
      else  {
        // var token = JSON.parse(data.auth)
      console.log(data.auth.access_token)
      DoMethod.dropletDelete(senderId,payload.substr(18),data.auth.access_token)
      }
  })

}

else{
  switch(payload) {

case "512mb" :
Messenger.askRegion(senderId,payload,SizeModel, Messenger);
userDropletData[senderId].size = payload;
Conversation.updateConversationTopic(senderId, userStack, payload);
  break;
case "1gb":
Messenger.askRegion(senderId,payload,SizeModel, Messenger);
userDropletData[senderId].size = payload;
Conversation.updateConversationTopic(senderId, userStack, payload);
  break;
case "2gb":
  Messenger.askRegion(senderId,payload,SizeModel, Messenger);
userDropletData[senderId].size = payload;
Conversation.updateConversationTopic(senderId, userStack, payload);
  break;
case "4gb":
  Messenger.askRegion(senderId,payload,SizeModel, Messenger);
userDropletData[senderId].size = payload;
Conversation.updateConversationTopic(senderId, userStack, payload);
  break;
case "8gb":
  Messenger.askRegion(senderId,payload,SizeModel, Messenger);
userDropletData[senderId].size = payload;
Conversation.updateConversationTopic(senderId, userStack, payload);
  break;
case "16gb":
  Messenger.askRegion(senderId,payload,SizeModel, Messenger);
userDropletData[senderId].size = payload;
Conversation.updateConversationTopic(senderId, userStack, payload);
  break;
case "32gb":
    Messenger.askRegion(senderId,payload,SizeModel, Messenger);
userDropletData[senderId].size = payload;
Conversation.updateConversationTopic(senderId, userStack, payload);
  break;
case "48gb":
  Messenger.askRegion(senderId,payload,SizeModel, Messenger);
userDropletData[senderId].size = payload;
Conversation.updateConversationTopic(senderId, userStack, payload);
  break;
case "64gb":
  Messenger.askRegion(senderId,payload,SizeModel, Messenger);
userDropletData[senderId].size = payload;
Conversation.updateConversationTopic(senderId, userStack, payload);
  break;
case "m-16gb":
  Messenger.askRegion(senderId,payload,SizeModel, Messenger);
userDropletData[senderId].size = payload;
Conversation.updateConversationTopic(senderId, userStack, payload);
  break;
case "m-32gb":
  Messenger.askRegion(senderId,payload,SizeModel, Messenger);
userDropletData[senderId].size = payload;
Conversation.updateConversationTopic(senderId, userStack, payload);
  break;
case "m-64gb":
  Messenger.askRegion(senderId,payload,SizeModel, Messenger);
userDropletData[senderId].size = payload;
Conversation.updateConversationTopic(senderId, userStack, payload);
  break;
case "m-128gb":
  Messenger.askRegion(senderId,payload,SizeModel, Messenger);
userDropletData[senderId].size = payload;
Conversation.updateConversationTopic(senderId, userStack, payload);
  break;
case "m-224gb":
  Messenger.askRegion(senderId,payload,SizeModel, Messenger);
userDropletData[senderId].size = payload;
Conversation.updateConversationTopic(senderId, userStack, payload);
  break;


case "show_menu":
Messenger.askMenu(senderId);
Conversation.updateConversationTopic(senderId, userStack, "menu_scope")    

  break;
case "droplet_menu":
  DoMethod.droplet(senderId)
  Conversation.updateConversationTopic(senderId, userStack, payload);
  break;
case  "droplet_menu_action":
      userModel.findOne({senderId:senderId},function(err,data){
        console.log("SHOW DROPLOET LIST and and then Operations")
        if(err)
          console.log(err);
          else  {
            // var token = JSON.parse(data.auth)
          console.log(data.auth.access_token)
          DoMethod.ListAllDropletsOperation(senderId,data.auth.access_token)
          }
      })      
  Conversation.updateConversationTopic(senderId, userStack, payload);
  console.log(userStack);

  break;
case  "droplet_menu_account":
  Conversation.updateConversationTopic(senderId, userStack, payload);
  break;
case "droplet_menu_domains":
  Conversation.updateConversationTopic(senderId, userStack, payload);
  break;
case "create_droplet_review":
  userModel.findOne({senderId:senderId},function(err,data){
    console.log("FINDING user for review step ")
    if(err)
      console.log(err);
      else  {
        // var token = JSON.parse(data.auth)
      console.log(data.auth.access_token)
      DoMethod.CreateDroplet(senderId,userDropletData[senderId],data.auth.access_token)
      }
      })
  break;

case "user_login":
askDigitalOceanLogin(senderId);
break;
  }//end of switch`
}//end of else
}
//-----------------------------------------------------------------------------------------------------------------------------------------------------







//they required ssh
// "freebsd-10-1-x64":
//   "freebsd-10-3-x64-zfs":
//   "freebsd-10-2-x64":
//   "freebsd-10-3-x64":
//   "freebsd-11-0-x64-zfs":
//   "freebsd-11-0-x64":
//   "coreos-stable":
//   "coreos-alpha":
//   "coreos-beta":
