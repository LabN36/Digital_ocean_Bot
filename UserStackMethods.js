module.exports = {

    updateConversationTopic : function(senderId, userStack, payload){
        if(userStack && userStack.length > 0) {
            console.log("user stack in not empty")
            userStack.forEach(function(element) {
                if(element.senderId == senderId) {
                    element.conversation = [];
                    element.conversation.push(payload)
                }
                // console.log(senderId)
            }, this);
        } else {
            console.log("user stack is empty")
            var userData = {};
            userData.senderId = senderId;
            userData.conversation = []
            userData.conversation.push(payload)
            userStack.push(userData)
        }
    },
    isSenderChoosingImageType : function(senderId, userStack,callback) {
        console.log("isSenderChoosingImageType Method")
        var choosingImage = false;
        console.log(userStack)
        if(userStack && userStack.length > 0) {
            userStack.forEach(function(element) {
                if(element.senderId == senderId) {
                    console.log("single pass")
                    if(element.conversation && element.conversation.length > 0 && element.conversation[0] == "typeofimage") {
                        console.log("KARMA-----------------------");
                        choosingImage = true;
                        callback(choosingImage)
                    }
                }
            }, this);
        } else {
            callback(choosingImage)
        }         
    }

}