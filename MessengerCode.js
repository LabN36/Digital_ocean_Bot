  // var qtest = require('./test');
  // qtest.printMsg();
  // console.log(typeof module.exports)
  // console.log(typeof module)
  // module.test = "hello";
  // console.log(Const);
  // console.log(qtest[1]);
// var language = [{ "content_type":"text","title":language[0],"payload":language_postback[0] },
// { "content_type":"text","title":language[1],"payload":language_postback[1] }];

var messageData = {
  // "recipient":{
  //   "id" : senderID
  // },
  // "message":{
  //   "text":"",
  //   "quick_replies":[ ]
  // }
}
// messageData.recipient = {};
// messageData.message = {};
// console.log(messageData)
// setTextData(messageData);
// console.log(messageData)
// messageData.message.text="Please Select LanguageA";
// console.log(messageData);
  // messageData.message.quick_replies.push(language[0]);
// messageData.message.quick_replies.push(language[1]);
// messageData.message.quick_replies.push(language[2]);
// messageData.message.quick_replies.push(language[3]);
// messageData.message.quick_replies.push(language[4]);
// callSendAPI(messageData);




function setTextData(messageData) {
// console.log(messageData)
// messageData.message.text="Please Select LanguageA";
// console.log(messageData);

}




// var dt =    { 
//      recipient: { id: '938355996293359' },
//      message: { text: 'f11' } 
//     }

//     console.log("calling setup");
//     console.log(typeof dt);
//     console.log(dt);
// request({ 
//     uri: 'https://graph.facebook.com/v2.6/me/messages',
//     qs: { access_token: PAGE_ACCESS_TOKEN },
//     method: 'POST',
//     headers : { 'content-type': 'application/json'  }, 
//     json: true,
//     body: dt,
// }
// , function (error, response, body) {
//   if (error) throw new Error(error);
//   console.log(body);
// });

  // headers: 
  //  { 'postman-token': '6f0a0f48-56c8-da38-7848-adece1e01f9f',
  //    'cache-control': 'no-cache',
  //    'content-type': 'application/json' },

// var a = '{ "recipient": {"id":"dede"} }'

function sendCTopics(senderId) {
  console.log("sendCTopics Method")
  var messageData = {};
  var random = { "content_type":"text","title":Const.cTopics[0],"payload":Const.cTopics_Payload[0] };
  var Data_Type = { "content_type":"text","title":Const.cTopics[1],"payload":Const.cTopics_Payload[1] };
  var Operators = { "content_type":"text","title":Const.cTopics[2],"payload":Const.cTopics_Payload[2] };
  var Expression = { "content_type":"text","title":Const.cTopics[3],"payload":Const.cTopics_Payload[3] };
  var More = { "content_type":"text","title":Const.cTopics[4],"payload":Const.cTopics_Payload[4] };
  Messenger.setSender(messageData,parseInt(senderId));
  Messenger.setQuickReplyText(messageData,Const.selectLanguage);
  Messenger.initQuickReplyElement(messageData);
  Messenger.pushQuickReplyElement(messageData,random);
  Messenger.pushQuickReplyElement(messageData,Data_Type);
  Messenger.pushQuickReplyElement(messageData,Operators);
  Messenger.pushQuickReplyElement(messageData,Expression);
  Messenger.pushQuickReplyElement(messageData,More);
  console.log(messageData);
  callSendAPI(messageData)
}
