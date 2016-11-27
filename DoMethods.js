var request = require('request');
var Messenger = require('./MessengerMethods.js');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
module.exports =  {

CreateDroplet : function(senderId,userDropletData,access_token){
  console.log("Create DROPLET Method------------------------------")
  var endPoint = "https://api.digitalocean.com/v2/droplets";
  request({
    uri : endPoint,
    method:'POST',
    auth:{'bearer':access_token},
    headers : { 'content-type': 'application/json'  }, 
    body : userDropletData,
    json : true
  },function(error, response, body) {
    if(error) {
      console.log(error)
      var messageData = { recipient: { id: senderId }, message: { text: "unable to create a droplet" } };
      Messenger.callSendAPI(messageData)
    } else {
      // var bodyMain = JSON.parse(body)
      // console.log(bodyMain);
      var messageData = { recipient: { id: senderId }, message: { text: "Successfully created a droplet",quick_replies:[ {
        "content_type":"text",
        "title":"Back to Menu",
        "payload":"menu_scope"
      }]
    
   } };
      Messenger.callSendAPI(messageData)
    }
  })


},

dropletDelete : function(senderId,dropletId,access_token){
  console.log("Create DROPLET Method")
  var endPoint = "https://api.digitalocean.com/v2/droplets/"+dropletId;
  request({
    uri : endPoint,
    method:'DELETE',
    auth:{'bearer':access_token},
    headers : { 'content-type': 'application/json'  }, 
  },function(error, response, body) {
    console.log(response.statusCode)
    if(error) {
      console.log(error)
      var messageData = { recipient: { id: senderId }, message: { text: "unable to delete Droplet" } };
      Messenger.callSendAPI(messageData)
    } else {
      // console.log(typeof body)
      // var bodyMain = JSON.parse(body)
      // console.log(bodyMain);
      var messageData = { recipient: { id: senderId }, message: { text: " Droplet deleted Successfully" } };
      Messenger.callSendAPI(messageData)
    }
  })
},


dropletInfo : function(senderId,dropletId,token){
  console.log("Droplet Info Method")
  var endPoint = "https://api.digitalocean.com/v2/droplets/"+dropletId;
  request({
    uri : endPoint,
    method:'GET',
    auth:{'bearer':token},
    headers : { 'content-type': 'application/json'  } 
    
  },function(error, response, body) {
    if(error) {
      console.log(error)
    } else {
      var bodyMain = JSON.parse(body)
      var droplet = bodyMain.droplet;
      console.log(bodyMain)
      var dropletDetail = "Droplet Name: "+droplet.name+"\n"+"Distribution: "+droplet.image.distribution+"  "+droplet.image.name+"\n"+"Memory: "+droplet.size.memory/1024+" GB"+"\n"+"CPUs: "+droplet.size.vcpus+"\n"+"Disk: "+droplet.size.disk+" GB\n"+"Transfer: "+droplet.size.transfer+" TB\n"+"Monthly Price: "+droplet.size.price_monthly+"$\n"+"DataCenter: "+droplet.region.name+"\nStatus: "+droplet.status+"\n\n";
      var messageData = { recipient: { id: senderId }, message: { text: dropletDetail  } };
      Messenger.callSendAPI(messageData);

    }
  })

}, dropletOperation: function(senderId,dropletId,token){
  console.log("Droplet Info Method")
  var endPoint = "https://api.digitalocean.com/v2/droplets/"+dropletId;
  request({
    uri : endPoint,
    method:'GET',
    auth:{'bearer':token},
    headers : { 'content-type': 'application/json'  } 
    
  },function(error, response, body) {
    if(error) {
      console.log(error)
    } else {
      var bodyMain = JSON.parse(body)
      var droplet = bodyMain.droplet;
      // console.log(bodyMain)
      console.log(bodyMain.droplet.id)
      Messenger.dropletAction(senderId,bodyMain.droplet.id)

    }
  })

},
powerOff : function(senderId,dropletId,access_token,bodyData){
  console.log("POWER OFF METHOD");
  console.log(dropletId);
  var endPoint = "https://api.digitalocean.com/v2/droplets/"+dropletId+"/actions";
  request({
    uri : endPoint,
    method:'POST',
    auth:{'bearer':access_token},
    headers : { 'content-type': 'application/json'  }, 
    body : bodyData,
    json : true
  },function(error, response, body) {
    if(error) {
      console.log(error)
      var messageData = { recipient: { id: senderId }, message: { text: "unable to Power Off a Droplet" } };
      Messenger.callSendAPI(messageData)
    } else {
      console.log(body);
      var messageData = { recipient: { id: senderId }, message: { text: "Droplet Successfully Powered Off  ",quick_replies:[ {
        "content_type":"text",
        "title":"Back to Menu",
        "payload":"menu_scope"
      }]    
   } };
      Messenger.callSendAPI(messageData)
    }
  })


}
// ,powerOn : function(senderId,dropletId,access_token){
//   console.log("POWER ON METHOD");
//   console.log(dropletId);
//   var endPoint = "https://api.digitalocean.com/v2/droplets/"+dropletId+"/actions";
//   request({
//     uri : endPoint,
//     method:'POST',
//     auth:{'bearer':access_token},
//     headers : { 'content-type': 'application/json'  }, 
//     body : {type:"power_on"},
//     json : true
//   },function(error, response, body) {
//     if(error) {
//       console.log(error)
//       var messageData = { recipient: { id: senderId }, message: { text: "unable to Power On a Droplet" } };
//       Messenger.callSendAPI(messageData)
//     } else {
//       // var bodyMain = JSON.parse(body)
//       // console.log(bodyMain);
//       var messageData = { recipient: { id: senderId }, message: { text: "Droplet Successfully Powered ON  ",quick_replies:[ {
//         "content_type":"text",
//         "title":"Back to Menu",
//         "payload":"menu_scope"
//       }]
    
//    } };
//       Messenger.callSendAPI(messageData)
//     }
//   })

// }
,
 droplet: function(senderId) {
  var messageData = {};
  var create = { "content_type":"text","title":"create droplet","payload":"droplet_create" };
  var show = { "content_type":"text","title":"show/delete droplets","payload":"droplet_show" };
  // var delet = { "content_type":"text","title":"delete droplet","payload":"droplet_delete" };
  Messenger.setSender(messageData,parseInt(senderId));
  Messenger.setQuickReplyText(messageData,"Please select droplet options");
  Messenger.initQuickReplyElement(messageData);
  Messenger.pushQuickReplyElement(messageData,create);
  Messenger.pushQuickReplyElement(messageData,show);
  // Messenger.pushQuickReplyElement(messageData,delet);
  console.log(messageData)
  Messenger.callSendAPI(messageData)
  
},

ListAllDroplets : function (senderId,token) {
  console.log("List droplet Method")
  var endPoint = "https://api.digitalocean.com/v2/droplets";
  request({
    uri : endPoint,
    method:'GET',
    auth:{'bearer':token},
    headers : { 'content-type': 'application/json'  } 
    
  },function(error, response, body) {
    if(error) {
      console.log(error)
    } else {
      var bodyMain = JSON.parse(body)
      console.log(bodyMain.droplets)
      // console.log(response.status)
      Messenger.ShowUserDroplets(senderId, bodyMain)
    }
  })

},

ListAllDropletsOperation : function (senderId,token) {
  console.log("List droplet Method")
  var endPoint = "https://api.digitalocean.com/v2/droplets";
  request({
    uri : endPoint,
    method:'GET',
    auth:{'bearer':token},
    headers : { 'content-type': 'application/json'  } 
    
  },function(error, response, body) {
    if(error) {
      console.log(error)
    } else {
      var bodyMain = JSON.parse(body)
      console.log(bodyMain.droplets)
      // console.log(response.status)
      Messenger.ShowUserOperationDroplets(senderId, bodyMain)
    }
  })

},

getSize : function(SizeModel, callback){
  console.log("Get Size method")
  var endPoint = "https://api.digitalocean.com/v2/sizes";
  request({
    uri : endPoint,
    method:'GET',
    auth:{'bearer':'5b0806a552b893f3a18527687571ba88baf96cab63c9246a8a74c5a02a641bf3'},
    headers : { 'content-type': 'application/json'  } 
    
  },function(error, response, body) {
    if(error) {
      console.log(error);
      return null;
    }
    // console.log(response)
    console.log(response.statusCode)
    // var bodyMain = JSON.parse(body)
    // SizeModel.insertMany(bodyMain.sizes,function(err,data){
    //     if(err)
    //     console.log(err);
    //     else {
    //     console.log(data);
    //   callback(bodyMain);
    //     }
    // })

    // return bodyMain.images;
  })

},

getDistributionImages : function (DistributionModel, callback) {
  console.log("List droplet Method")
  // var endPoint = "https://api.digitalocean.com/v2/images?type=distribution";
    var endPoint = "http://api.digitalocean.com/v2/images?page=2&type=distribution"; 
  request({
    uri : endPoint,
    method:'GET',
    auth:{'bearer':'5b0806a552b893f3a18527687571ba88baf96cab63c9246a8a74c5a02a641bf3'},
    headers : { 'content-type': 'application/json'  } 
    
  },function(error, response, body) {
    if(error) {
      console.log(error);
      return null;
    }
    var bodyMain = JSON.parse(body)
    callback(bodyMain);
    // console.log(bodyMain.images)
    // var DistributionSchema = new Schema({
    //     id :  {type:Number},
    //     name : {type:String},
    //     distribution : {type:String},
    //     slug : {type:String},
    //     public: {type:Boolean},
    //     regions : {type:Array},
    //     created_at : {type:String},
    //     min_disk_size :  {type:Number},
    //     type: {type:String},
    //     size_gigabytes : {type:Number},   
    // });
    // var DistributionModel = mongoose.model('DistributionModel',DistributionSchema);
    DistributionModel.insertMany(bodyMain.images,function(err,data){
        if(err)
        console.log(err);
        else
        console.log(data);
    })

    return bodyMain.images;
  })

},


}

