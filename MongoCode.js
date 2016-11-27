// mongoose.connect('mongodb://localhost/rishabh');
var Schema = mongoose.Schema;
var DigitalOceanRegionSchema = new Schema({
  name:{type:String},
  slug:{type:String},
  available:{type:Boolean},
  sizes:{type:Array},
  features:{type:Array}
})

var schema  = new Schema({ name: { type: String, required: true } });
 var Cat = mongoose.model('Cat', schema);
    // This cat has no name :(
    var cat = new Cat();
    var cc = {};
    // Cat.collection.insert(cat,function(error,data) {
    //   if(error)console.log(error)
    //    else console.log(data)});

var question1 = new mongoose.Schema({
  question : {type:String,required:true},
  optionA : {type:String,required:true},
  optionB : {type:String,required:true},
  optionC : {type:String,required:true},
  optionAnswer : {type:String,required:true},
  explanation : {type:String},
  language : {type:String,required:true},
  questionId : {type:String,required:true},
  level :{type:Number},
  users :{type:[Number],unique:true},
  topics :{type:[Number],unique:true},  
  
});
var questionModel1 = mongoose.model('questionModel1',question1);
// var q = new questionModel1();
// q.question = "What is the output of the below code considering size of short int is 2, char is 1 and int is 4 bytes? \n\n#include <stdio.h> \nint main() \n{\n  short int i = 20;\n  char c = 97;\n  printf(\"%d, %d, %d\\n\", sizeof(i), sizeof(c), sizeof(c + i));\n  -turn 0;\n}\n";
// q.optionA = "2, 1, 2",q.optionB = "2, 1, 1",q.optionC = "2, 1, 4",q.optionAnswer = "2, 2, 8",
// q.language = "C",q.questionId = "C_13",q.users.push(343410),q.topics.push(12);
// q.save(function(err,data){
//   if(err)
//     console.log(err)
//   else 
//     console.log(data);  
// });
// questionModel1.findOne({questionId:'C_13'},function(err,data){
//   if(err) 
//     console.log(err)
//   else 
//     console.log(data)
// })
// questionModel1.findOne({users:{$ne:2}},function(err,data){
//   if(err)
//     console.log(err);
//   else 
//     console.log(data);  
// })
// var question1array = [
//   {question:"this is test 1 question"},
//   {question:"this is test 2 question"}  
// ];
// var question1array = {question:"this is test 2 question"};

// questionModel1.collection.insert(question1array,function(err,data){
//   if(err)
//   console.log(err);
//   else
//   console.log(data);  
// })
// var kittySchema = new schema({name:String,ans:String,cat:String});
// var kittyModel = mongoose.model('kittyModel',kittySchema);
// var q = [
//   {'name':'test1','ans':'A','cat':'mongo1'},
//   {'name':'test2','ans':'B','cat':'mongo2'},
//   {'name':'test3','ans':'C','cat':'mongo3'}
// ];
// kittyModel.collection.insertMany(q,function(err,data){
//   if(err)
//   console.log(err);
//   else
//   console.log(data);
// })
//fetch question(new question everytime) from db set the options in quickrepy and add post as a questionID_right or questionID_wrong
//question id should be like C1, Mongo2,Java4, Javascript8 first will be the language and the second will be the question no 
//you have to make a data base (array) of user answered question and user passed question then fetch the question 
//ask user for topic and also give him random option for a topic show him topicwise new or fetch a ramdom question
//right, wrong, passed, total 
// total:['C1', 'C2', 'C3', 'C7', 'C9', 'C11']
//select question where questionId != this array
//select question where topic is C and user should not '1223878783'




// var RegionSchema = mongoose.model('RegionSchema',DigitalOceanRegionSchema)
// RegionSchema.insertMany(bodyMain.regions, function(err,data){
//   if(err)
//   console.log(err);
//   else
//   console.log(data);
// })
    // console.log(response.status)






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


// var blah = [
//   {senderId:'238473847',
// conversation:['droplet_create']}]
// console.log(typeof blah)
// // console.log(blah.conversation);
// blah.forEach(function(element) {
//   console.log(element)
//   if(element.senderId == '238473847') {
//     console.log("sender match")
//     console.log(element.conversation.length);
//   }else {
//     console.log("no sender found")
//   }
// }, this);
// if(blah.Conversation && blah.conversation.length > 0 && blah.conversation[0] == "droplet_create") {
//   console.log("Intrupted in typeofImage")
//   // Messenger.askTypeOfImage(senderId);
// }
// else {
//   console.log("fuck yeah")
// }

// Messenger.askHighSize(rishabh);
// Messenger.askStandardSize(rishabh)
