var request = require('request');
var config = require('./public/config');
var Messenger = require('./MessengerMethods.js');
var mongoose = require('mongoose');

module.exports = {

    setSender : function(messageData,senderId){
        messageData.recipient = {};
        messageData.recipient.id = senderId;
    },
    setText : function(messageData,text){
        messageData.message = {};
        messageData.message.text = text;
    },
    initMessage : function(messageData) {
        messageData.message = {};
    },
    initAttachmentMessage : function(messageData) {
        messageData.message = {};
        messageData.message.attachment = {};
    },
    initAttachmentPayload : function(messageData) {
        messageData.message.attachment.payload = {};
    },
    initAttachmentPayloadButtons : function(messageData) {
        messageData.message.attachment.payload.buttons = [];
    },

    setAttachmentType : function(messageData,attachmentType) {
        messageData.message.attachment.type = attachmentType;
    },
    setAttachmentPayloadType : function(messageData,attachmentPayloadType) {
        messageData.message.attachment.payload.template_type = attachmentPayloadType;
    },
    initAttchmentPayloadElement : function(messageData) {
        messageData.message.attachment.payload.elements = [];
    },
    // initAttchmentElement : function(messageData) {
    //     messageData.message.attachment.payload.elements = [];
    // },
    
    pushAttchmentPayloadElement : function(messageData,title,subtitle,payload) {
        var element ={};
        element.title = title;
        element.subtitle = subtitle;
        element.buttons = [];
        var picMeButton = {};
        picMeButton.type = "postback"
        picMeButton.title = "Pic Me"
        picMeButton.payload = payload;
        element.buttons.push(picMeButton)
        console.log(element)
        messageData.message.attachment.payload.elements.push(element);
    },
    pushAttchmentPayloadElement_Select : function(messageData,title,subtitle,payload) {
        var element ={};
        element.title = title;
        element.subtitle = subtitle;
        element.buttons = [];
        var picMeButton = {};
        picMeButton.type = "postback"
        picMeButton.title = "Select"
        picMeButton.payload = payload;
        element.buttons.push(picMeButton)
        console.log(element)
        messageData.message.attachment.payload.elements.push(element);
    },
    pushAttchmentPayloadElement_Deploy : function(messageData,title,subtitle,payload) {
        var element ={};
        element.title = title;
        element.subtitle = subtitle;
        element.buttons = [];
        var picMeButton = {};
        picMeButton.type = "postback"
        picMeButton.title = "Create Droplet"
        picMeButton.payload = payload;
        element.buttons.push(picMeButton)
        console.log(element)
        messageData.message.attachment.payload.elements.push(element);
    },
    pushAttchmentPayloadElement_Droplet : function(messageData,title,subtitle,payloadInfo,payloadOperation,payloadDelete) {
        console.log("pushAttchmentPayloadElement_Droplet METHOD")
        console.log(payloadInfo);console.log(payloadOperation);console.log(payloadDelete)
        var element ={};
        element.title = title;
        element.subtitle = subtitle;
        element.buttons = [];
        var moreinfo = {};
        moreinfo.type = "postback";
        moreinfo.title = "More Info"
        moreinfo.payload = payloadInfo;
        element.buttons.push(moreinfo)

        var deleteButton = {};
        deleteButton.type = "postback"
        deleteButton.title = "Delete Droplet"
        deleteButton.payload = payloadDelete;
        element.buttons.push(deleteButton)

        console.log(element)
        messageData.message.attachment.payload.elements.push(element);

    },
    pushAttchmentPayloadElement_OperationDroplet : function(messageData,title,subtitle,payloadInfo,payloadOperation,payloadDelete) {
        console.log("pushAttchmentPayloadElement_Droplet METHOD")
        console.log(payloadInfo);console.log(payloadOperation);console.log(payloadDelete)
        var element ={};
        element.title = title;
        element.subtitle = subtitle;
        element.buttons = [];

        var operationButton = {};
        operationButton.type = "postback"
        operationButton.title = "Show Actions"
        operationButton.payload = payloadOperation;
        element.buttons.push(operationButton)

        console.log(element)
        messageData.message.attachment.payload.elements.push(element);

    },

    setAttachmentPayloadText : function(messageData,attachmentPayloadText) {
        messageData.message.attachment.payload.text = attachmentPayloadText;
    },
    pushAttachmentPayloadButton : function(messageData,button) {
        messageData.message.attachment.payload.buttons.push(button);
    },
    setQuickReplyText : function(messageData,text) {
        messageData.message = {};
        messageData.message.text = text;        
    },
    initQuickReplyElement : function(messageData){
        messageData.message.quick_replies = []
    },
    pushQuickReplyElement : function(messageData,element) {
        messageData.message.quick_replies.push(element)
    },
    setQuickReplyElement : function(title, payload, callback) {
        var element = {};
        element.content_type = "text";
        element.title = title;
        element.payload = payload;
        callback(element);
    },
    askTypeOfImage : function(senderId) {
        var messageData = {};
        var show = { "content_type":"text","title":"Snapshot","payload":"droplet_imagetype_snapshot" };
        var create = { "content_type":"text","title":"Distributions","payload":"droplet_imagetype_distribution" };
        var delet = { "content_type":"text","title":"One-click App","payload":"droplet_imagetype_oneclick" };
        this.setSender(messageData,parseInt(senderId));
        this.setQuickReplyText(messageData,"Select Image type");
        this.initQuickReplyElement(messageData);
        this.pushQuickReplyElement(messageData,show);
        this.pushQuickReplyElement(messageData,create);
        this.pushQuickReplyElement(messageData,delet);
        console.log(messageData)
        this.callSendAPI(messageData)
    },
    askDistribution : function(senderId) {
        var messageData = {};
        var Ubuntu = { "content_type":"text","title":"Ubuntu","payload":"droplet_image_ubuntu" };
        var Fedora = { "content_type":"text","title":"Fedora","payload":"droplet_image_fedora" };
        var Debian = { "content_type":"text","title":"Debian","payload":"droplet_image_debian" };
        var Centos = { "content_type":"text","title":"CentOS","payload":"droplet_image_centos" };
        this.setSender(messageData,parseInt(senderId));
        this.setQuickReplyText(messageData,"Select Distribution");
        this.initQuickReplyElement(messageData);
        this.pushQuickReplyElement(messageData,Ubuntu);
        this.pushQuickReplyElement(messageData,Fedora);
        this.pushQuickReplyElement(messageData,Debian);
        this.pushQuickReplyElement(messageData,Centos);
        console.log(messageData)
        this.callSendAPI(messageData)
    }, 
    askDistributionVersion : function(senderId, payload,DistributionModel,Messenger) {
        // console.log(Messenger)
        DistributionModel.find({distribution:payload},'name slug',function(err,data){
            if(err)
            console.log(err);
            else {
            // console.log(data);
            var messageData = {};
            Messenger.setSender(messageData,parseInt(senderId));
            Messenger.setQuickReplyText(messageData,"Select Distribution Version");
            Messenger.initQuickReplyElement(messageData);
            console.log(data.length)
            if(data && data.length < 12) {
                data.forEach(function(element) {
                Messenger.setQuickReplyElement(element.name,element.slug,function(data){
                    console.log(data);
                    Messenger.pushQuickReplyElement(messageData,data);    
                })                
                }, this);                
            }
            console.log(messageData)
            console.log(messageData.message.quick_replies)
            Messenger.callSendAPI(messageData)
            }
        })
    },    askRegion : function(senderId,slug, SizeModel, Messenger) {
            SizeModel.find({$and:[{slug:slug},{}]},'slug regions',function(err,data){
                if(err)
                console.log(err);
                else {
                    var messageData = {};
                    Messenger.setSender(messageData,parseInt(senderId));
                    Messenger.setQuickReplyText(messageData,"Choose a datacenter region");
                    Messenger.initQuickReplyElement(messageData);
                    // console.log(data)
                    // console.log(data[0].region)
                    var count = 0;
                    data[0].regions.forEach(function(element) {
                        ++count;
                        if(count < 12) {
                        Messenger.setQuickReplyElement(element,element,function(data){
                            console.log(data);
                            Messenger.pushQuickReplyElement(messageData,data);    
                        });                            
                        }
                    }, this);

                    Messenger.callSendAPI(messageData)
                }
            })
    },
    askSizeType : function(senderId) {
        var messageData = {};
        var standard = { "content_type":"text","title":"Stardard ","payload":"size_standard" };
        var high = { "content_type":"text","title":"High Memory","payload":"size_high" };
        this.setSender(messageData,parseInt(senderId));
        this.setQuickReplyText(messageData,"Choose the Type of size");
        this.initQuickReplyElement(messageData);
        this.pushQuickReplyElement(messageData,standard);
        this.pushQuickReplyElement(messageData,high);
        console.log(messageData)
        this.callSendAPI(messageData)
        
    },
    askDropletName : function(senderId) {
        var messageData = {};
        this.setSender(messageData,senderId);
        this.setText(messageData, "That's it now enter you DropletName by # prefix")
        this.callSendAPI(messageData);  
    },
    askStandardSize : function(senderId) {
        var messageData = {};
        var _512mb_title = "512Mb RAM/1 CPU \n\n 20GB SSD disk 1TB Transfer\n";
        var _512mb_subtitle = "$5/mo \n $0.007/hour"
        var _512mb = "512mb"

        var _1_title = "1GB RAM/1 CPU \n\n 30GB SSD disk 2TB Transfer\n"
        var _1_subtitle = "$10/mo \n $0.015/hour "
        var _1gb = "1gb"

        var _2_title = "2GB RAM/2 CPU \n\n 40GB SSD disk 3TB Transfer\n"
        var _2_subtitle = "$20/mo \n $0.030/hour "
        var _2gb = "2gb"

        var _4_title = "4GB RAM/2 CPU \n\n 60GB SSD disk 4TB Transfer\n"
        var _4_subtitle = "$40/mo \n $0.060/hour "
        var _4gb = "4gb"

        var _8_title = "8GB RAM/4 CPU \n\n 80GB SSD disk 5TB Transfer\n"
        var _8_subtitle = "$80/mo \n $0.119/hour "
        var _8gb = "8gb"

        var _16_title = "16GB RAM/8 CPU \n\n 160GB SSD disk 6TB Transfer\n"
        var _16_subtitle = "$160/mo \n $0.238/hour "
        var _16gb = "16gb"

        var _32_title = "32GB RAM/12 CPU \n\n 320GB SSD disk 7TB Transfer\n"
        var _32_subtitle = "$320/mo \n $0.476/hour "
        var _32gb = "32gb"

        var _48_title = "48GB RAM/16 CPU \n\n 480GB SSD disk 8TB Transfer\n"
        var _48_subtitle = "$480/mo \n $0.714/hour "
        var _48gb = "48gb"

        var _64_title = "64GB RAM/20 CPU \n\n 640GB SSD disk 9TB Transfer\n"
        var _64_subtitle = "$640/mo \n $0.952/hour "
        var _64gb = "64gb"

        this.setSender(messageData,parseInt(senderId));
        this.initAttachmentMessage(messageData);
        this.initAttachmentPayload(messageData)
        this.setAttachmentType(messageData, "template");
        this.setAttachmentPayloadType(messageData, "generic");
        this.initAttchmentPayloadElement(messageData);
        this.pushAttchmentPayloadElement(messageData,_512mb_title,_512mb_subtitle,_512mb)
        this.pushAttchmentPayloadElement(messageData,_1_title,_1_subtitle,_1gb)
        this.pushAttchmentPayloadElement(messageData,_2_title,_2_subtitle,_2gb)
        this.pushAttchmentPayloadElement(messageData,_4_title,_4_subtitle,_4gb)
        this.pushAttchmentPayloadElement(messageData,_8_title,_8_subtitle,_8gb)
        this.pushAttchmentPayloadElement(messageData,_16_title,_16_subtitle,_16gb)
        this.pushAttchmentPayloadElement(messageData,_32_title,_32_subtitle,_32gb)
        this.pushAttchmentPayloadElement(messageData,_48_title,_48_subtitle,_48gb)
        this.pushAttchmentPayloadElement(messageData,_64_title,_64_subtitle,_64gb)
        this.callSendAPI(messageData);
    },

    askHighSize : function(senderId) {
        var messageData = {};
        var _16_title = "16GB RAM/2 CPU \n\n 30GB SSD disk 6TB Transfer\n"
        var _16_subtitle = "$120/mo \n $0.179/hour "
        var _16gb = "m-16gb"

        var _32_title = "32GB RAM/4 CPU \n\n 90GB SSD disk 7TB Transfer\n"
        var _32_subtitle = "$160/mo \n $0.357/hour "
        var _32gb = "m-32gb"

        var _64_title = "64GB RAM/8 CPU \n\n 200GB SSD disk 8TB Transfer\n"
        var _64_subtitle = "$320/mo \n $0.714/hour "
        var _64gb = "m-64gb"

        var _128_title = "128GB RAM/16 CPU \n\n 340GB SSD disk 9TB Transfer\n"
        var _128_subtitle = "$480/mo \n $1.429/hour "
        var _128gb = "m-128gb"

        var _224_title = "224GB RAM/32 CPU \n\n 500GB SSD disk 10TB Transfer\n"
        var _224_subtitle = "$640/mo \n $2.500/hour "
        var _224gb = "m-224gb"
        this.setSender(messageData,parseInt(senderId));
        this.initAttachmentMessage(messageData);
        this.initAttachmentPayload(messageData)
        this.setAttachmentType(messageData, "template");
        this.setAttachmentPayloadType(messageData, "generic");
        this.initAttchmentPayloadElement(messageData);
        this.pushAttchmentPayloadElement(messageData,_16_title,_16_subtitle,_16gb)
        this.pushAttchmentPayloadElement(messageData,_32_title,_32_subtitle,_32gb)
        this.pushAttchmentPayloadElement(messageData,_64_title,_64_subtitle,_64gb)
        this.pushAttchmentPayloadElement(messageData,_128_title,_128_subtitle,_128gb)
        this.pushAttchmentPayloadElement(messageData,_224_title,_224_subtitle,_224gb)
        this.callSendAPI(messageData);
    },
    askMenu : function (senderId){
        var messageData = {};
        var _16_title = "Droplet\n"
        var _16_subtitle = "create/Delete/Display your Droplets \n "
        var _16gb = "droplet_menu"
        var _32_title = "Manage Droplet Actions\n"
        var _32_subtitle = "Enable/Disable/Reboot/Power Cycle\n\n Power Off/Power On/Resize/Rename Droplets "
        var _32gb = "droplet_menu_action"
        var _64_title = "Acccount"
        var _64_subtitle = "get basic information og you account "
        var _64gb = "droplet_menu_account"
        var _128_title = "Manage your Domains\n"
        var _128_subtitle = "Add/Update/Delete Doamins  "
        var _128gb = "droplet_menu_domains"

        this.setSender(messageData,parseInt(senderId));
        this.initAttachmentMessage(messageData);
        this.initAttachmentPayload(messageData)
        this.setAttachmentType(messageData, "template");
        this.setAttachmentPayloadType(messageData, "generic");
        this.initAttchmentPayloadElement(messageData);
        this.pushAttchmentPayloadElement_Select(messageData,_16_title,_16_subtitle,_16gb)
        this.pushAttchmentPayloadElement_Select(messageData,_32_title,_32_subtitle,_32gb)
        this.pushAttchmentPayloadElement_Select(messageData,_128_title,_128_subtitle,_128gb)
        this.pushAttchmentPayloadElement_Select(messageData,_64_title,_64_subtitle,_64gb)
        this.callSendAPI(messageData);
    },
    showCreateDropletReview(senderId, userDropletData,access_token) {
        var messageData = {};
        console.log("yooyo")
        console.log(userDropletData)
        var _16_title = userDropletData.name+"  "+userDropletData.image;
        var _16_subtitle = userDropletData.size+" \n\n "+userDropletData.region+"\n\n"
        var _16gb = "create_droplet_review"

        this.setSender(messageData,parseInt(senderId));
        this.initAttachmentMessage(messageData);
        this.initAttachmentPayload(messageData)
        this.setAttachmentType(messageData, "template");
        this.setAttachmentPayloadType(messageData, "generic");
        this.initAttchmentPayloadElement(messageData);
        this.pushAttchmentPayloadElement_Deploy(messageData,_16_title,_16_subtitle,_16gb)
        this.callSendAPI(messageData);

    },
    ShowUserDroplets(senderId, response) {
        var count = 0 ;
        var messageData = {};
        if(response.meta.total > 0 ) {
        console.log(response.meta.total)    
        this.setSender(messageData,parseInt(senderId));
        this.initAttachmentMessage(messageData);
        this.initAttachmentPayload(messageData)
        this.setAttachmentType(messageData, "template");
        this.setAttachmentPayloadType(messageData, "generic");
        this.initAttchmentPayloadElement(messageData);
        response.droplets.forEach(function(element) {
            ++count;
            console.log(element.name)
            // console.log(element.image.distribution+element.image.name)
            // console.log(element.size.memory+element.size.vcpus+element.size.disk+element.size.transfer+element.size.price_monthly)
            if(count < 10) {
                var droplet_id = "droplet_id_"
                var title =  element.name+"   "+element.image.distribution+"  "+element.image.name
                var subtitle = +"\n\n"+element.size.memory/1024+" GB Memory  "+element.size.vcpus+" CPU  "+element.size.disk+"GB Disk  "+"\n\n"+element.size.transfer+"TB Transfer  "+element.size.price_monthly+"$ Monthly"
                console.log(subtitle)
            this.pushAttchmentPayloadElement_Droplet(messageData,title,subtitle,droplet_id+"info_"+element.id,droplet_id+"operation_"+element.id,droplet_id+"delete_"+element.id)
            }
        }, this);
        this.callSendAPI(messageData);
        } else {
            console.log("no droplet found");
            var messageData = { recipient: { id: senderId }, message: { text: "No Drplet found, type menu for main menu" } };
            callSendAPI(messageData)
        }
        

    },
    dropletAction(senderId,droplet_id) {
        var messageData = {};
        var PowerOff = { "content_type":"text","title":"PowerOff","payload":"poweroff_"+droplet_id };
        var PowerOn = { "content_type":"text","title":"PowerOn","payload":"poweron_"+droplet_id };
        this.setSender(messageData,parseInt(senderId));
        this.setQuickReplyText(messageData,"Choose Droplet Action");
        this.initQuickReplyElement(messageData);
        this.pushQuickReplyElement(messageData,PowerOff);
        this.pushQuickReplyElement(messageData,PowerOn);
        console.log(messageData)
        this.callSendAPI(messageData)

    },
    ShowUserOperationDroplets(senderId, response) {
        var count = 0 ;
        var messageData = {};
        if(response.meta.total > 0 ) {
        console.log(response.meta.total)    
        this.setSender(messageData,parseInt(senderId));
        this.initAttachmentMessage(messageData);
        this.initAttachmentPayload(messageData)
        this.setAttachmentType(messageData, "template");
        this.setAttachmentPayloadType(messageData, "generic");
        this.initAttchmentPayloadElement(messageData);
        response.droplets.forEach(function(element) {
            ++count;
            console.log(element.name)
            // console.log(element.image.distribution+element.image.name)
            // console.log(element.size.memory+element.size.vcpus+element.size.disk+element.size.transfer+element.size.price_monthly)
            if(count < 10) {
                var droplet_id = "droplet_id_"
                var title =  element.name+"   "+element.image.distribution+"  "+element.image.name
                var subtitle = +"\n\n"+element.size.memory/1024+" GB Memory  "+element.size.vcpus+" CPU  "+element.size.disk+"GB Disk  "+"\n\n"+element.size.transfer+"TB Transfer  "+element.size.price_monthly+"$ Monthly"
                console.log(subtitle)
            this.pushAttchmentPayloadElement_OperationDroplet(messageData,title,subtitle,droplet_id+"info_"+element.id,droplet_id+"operation_"+element.id,droplet_id+"delete_"+element.id)
            }
        }, this);
        this.callSendAPI(messageData);
        } else {
            console.log("no droplet found");
            var messageData = { recipient: { id: senderId }, message: { text: "No Drplet found, type menu for main menu" } };
            callSendAPI(messageData)
        }
        

    },

    callSendAPI : function(messageData) {
        request({
            uri: 'https://graph.facebook.com/v2.6/me/messages',
            qs: { access_token: config.pageAccessToken },
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

}