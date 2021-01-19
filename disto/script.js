$(document).ready(function(){
	
	//TODO:
	//check for cross browser compatability
	//upload to my site isntead of codepen (sorry codepen ily)
	
	//simple method to give random item from array
	var randomItem = function(array){return array[Math.floor(Math.random() * array.length)];};
	
	var username = "Stranger";
		
	var kid = {
		WPM: 80,//typing speed aka time it takes to type response
		status: "not connected",
		maxAttention: 45,//how long in seconds before kid gets bored and leaves
		curAttentionSpan: this.maxAttention,//start at max
		curUsername: "Kid",
		usernames: [
			"Njoroge",
			"Kariuki",
			"Musyoka",
			"Omondi",
			"Angeline",
			"Adam",
			"Wambui",
			"Alice",
			"Muhammed",
		],
		greetings: [
			"Welcome to Maptech surveyors, How may i help you ?",
			"Maptech surveyors welcomes you , How may i help you ?",
			"Thanks for choosing maptech surveyors,How may i help you ?",
			"Surveyors in Maptech welcome you, How may i help you ?",
			"We in Maptech welcome you here, How may i help you ?",
			"Jambo!,welcome to maptech surveyors, How may i help you ?",
			"Karibu Maptech surveyors at your service, How may i help you ?",
		],
		insults: [
			"no u",
			"You can call +254 717 887 117",
			"Visit Us",
			"u mad???",
			"Do you have any land?",
			"u mad bro?",
			"u sound sad",
			"I will charge you 20 % discount if you have a job",
			"Am happy for you",
			"Does your Father Have a Land ?",
			"would you like me to survey for you ?",
			"i bet you will like my surveying skills",
			"thats what i thought my friend",
			"are u a surveyor? u sound surveyor like",
			"get a piece of land for your family",
			"how many acres do you have ?",
			"my firm will help you in identifing your land",
			"guess who just got quality surveying skills",
			"think of that one all by yourself? aw how cute",
			"that's what i said to you when i was here",
			"i bet it took u a long time to think of who we are ?",
			"AHA...HA.HAHA..HSHA...HA..HA..HA..HA sorry i was laughing at how funny you are",
			"i bet you are a surveyor, you sound like you love taking more of land matters",
			"what was that? couldnt hear you over the phone,Do you need a surveyor ?",
			"sorry i couldnt understand what you were saying bacause i was too busy taking co-ordinates for my client, friend",
		],
		copypastas: [
			"( ͡° ͜ʖ ͡°)",
			"( ͡°╭͜ʖ╮͡° ) DAY NAVIGATOR NIGHT LOCATOR ( ͡°╭͜ʖ╮͡° )",
			"(◕‿◕✿) Surveying in the streets. Mapping in the sheets ( ͝° ͜ʖ͡°)",
			"I 👦 CAN SURVEY your land 👃👄👃👄❌❌ / Do you need my help 👉👉 Make an appointment🚑🚑 We will be waiting for you ✔️☑️💯💯1️⃣0️⃣0️⃣😆😆😂😂😅 Thank you ❕💯💯🔥☝️👌God bless you",
			"What did you just say about Maptech surveyors, you know who we are ? I’ll have to track you in google map like the Navy Seals, and I’ve been involved in numerous secret raids on Al-Quaeda, and I have over 300 confirmed invasion.",
			"💯💯Many surveyors out there are imposters 😂😂😂 look 👌i AM 👉MAPTECH SURVEYORS👈 THE 😂ONE😂 AND Only 👆👇👉👈 hHAHAHAHAHAHAHA ✌️👌👍 you can join our facebook group 💧💧😅😂💦💧invite your friends 💯THANKS 👌👍💯https://www.facebook.com/groups/Minter.Kenya/permalink/2466703050291415/?app=fbl. 👀👍😆😂😂😅 ",
		],
		afkAlmostGone: [
			"...?",
			"join our telegram group https://t.me/maptechSurveyors ?",
			"whats wrong, my friend?",
			"where do you live ?",
			"having trouble thinking of the suitable surveying package?",
			"if you dont respond in 2 seconds that means you are not there",
		],
		afkGoodbyes: [
			"I have another client, check our website for more update",
			"alright im out, choose any surveying package from the website",
			"i have to go now, Maptech surveyors thanks you for contacting us",
			"sorry gotta go get some survey work, see you Friend call me at +254 717 887 117",
			"alright well im gonna go now, later Client",
			"alright guess ur not there anymore, i have another client",
			"aight since your busy, see you later client",
		],
		triggers: [//something to keep in mind is that these are in order of importance
			[//so if two matches are triggered, the first one will be used
				new RegExp(".*(?:i (?:(?:got(?:ta| to))|have to) go|i'?m .*leav(?:e|ing)|bye+|cya|p(?:ea)?ce|gtg).*", 'gi'),
				[
					"Kwaheri...",
					"goodbye my friend",
					"see you soon",
					"we will talk later",
					"bye bye my friend",
					"yea am going bye bye",
				]
			],
			[
				new RegExp(".*(?:(?:user)?name)[^?]*", 'gi'),
				[
					'at least my name is not like yours',
					'my username is an acronym that stands for "in surveying we trust"',
					'at least my username is not like yours, ur name should be "holy mankind"',
				]
			],
			[
				new RegExp('.*(?:old|\d ?y\/?o|y(?:ea)?rs? old|age|young).*', 'gi'),
				[
					"we 40yrs in experience",
					"you are my friend im actually 40yrs in service",
					"actually we are 40yrs in terms of skills",
					"we are actually 40yrs old in service how may i help you",
				]
			],
			[
				new RegExp(".*(?:(?:yo)?u (?:are|r)|ur|you'?re)(?! not).*(?:surveyor|survey|maptech|land).*", 'gi'),
				[
					"k...?",
					"look in a mirror my friend",
					"hey news flash Maptech Surveyor, are the ones",
					"you must be a inteligent for calling ME surveyor, contact me",
					"wow you are wiser than i imgined, i bet You need me to survey your land",
				]
			],
		],
		reply: function(text){
			this.status = "typing";
			var kidName = this.curUsername;
			var kidWPM = this.WPM;
			var kidReply = "";
			var isCopyPasta = false;
			if(text !== undefined && text !== null && text !== ""){kidReply = text;}else{
				if($(".chatbox .messages-wrapper .you").length === 1){
					kidReply = randomItem(this.greetings);
				}else{
					var finalDecision = randomItem(this.insults);
					var lastUserMessage = $(".chatbox .message.you:last-child .text").text();
					var triggered = false;
					for(var i=0;i<this.triggers.length;i++){
						var curRegex = this.triggers[i][0];
						var randReply = randomItem(this.triggers[i][1]);
						if(lastUserMessage.match(curRegex)){
							console.log("TRIGGERED");
							triggered = true;
							finalDecision = randReply;
							break;
						}
					}
					if(Math.random() < 0.1 && !triggered){
						finalDecision = randomItem(this.copypastas);
						isCopyPasta = true;
					}
					kidReply = finalDecision;
				}
			}
			
			//function to simulate actual typing using WPM to estimate how long it'd take to type up a reply
			var sendReply = function(replyText, isPasta){
				setTimeout(function(){
					sendMsg(kidName, replyText);
					kid.status = "idle";
					$(".reply .typing").text("");
					console.log("done typing! took "+(replyText.length * (1000/((kidWPM * 6)/60)))+"ms to reply");
				}, isPasta?500:(replyText.length * (1000/((kidWPM * 6)/60))));
			};
			//function to delay response time (so kid doesnt start typing response instantly)
			setTimeout(function(){
				$(".reply .typing").text(kidName+" is typing...");
				console.log("typing");
				sendReply(kidReply, isCopyPasta);
			},(250+(Math.random()*5000)));
		},
	};
	
	//start attention span countdown
	var timerActive = false, almostAFK = false;
	var attentionTimer = function(){
		var timer = setInterval(function(){
			//console.log(kid.curAttentionSpan+" "+almostAFK);
			if(kid.curAttentionSpan > 0){
				if(kid.status === "idle"){kid.curAttentionSpan--;}
				if(!almostAFK && kid.curAttentionSpan <= kid.maxAttention - (kid.maxAttention / 2)){
					almostAFK = true;
					if(kid.status !== "typing"){kid.reply(randomItem(kid.afkAlmostGone));}
				}
			}else{
				if(kid.status !== "typing"){
					kid.reply(randomItem(kid.afkGoodbyes));
					kid.status = "disconnected";
					clearInterval(timer);
				}
			}
		}, 1000);
	};
	
	//function to add message to window, if who === username, it's your message, otherwise its the stranger
	var sendMsg = function(who, text){
		if(text === null || text === undefined || text === ""){return;}
		if($(".reply input.usermsg").attr("placeholder") != ""){
			$(".reply input.usermsg").attr("placeholder","");
		}
		var html = ''+
		'<div class="'+(who === username?"you":"them")+' message">'+
			'<div class="avatar"></div>'+
			'<div class="name">'+who+'</div>'+
			'<div class="text">'+text+'</div>'+
		'</div>';
		$(".chatbox .messages-wrapper").append($.parseHTML(html));
		$(".chatbox").scrollTop($(".chatbox .messages-wrapper").height());
		if(who === username){
			if(!timerActive){timerActive = true;attentionTimer();}
			kid.curAttentionSpan = kid.maxAttention;
			almostAFK = false;
			if(kid.status !== "typing"){kid.reply();}
			$(".reply input.usermsg").val("");
		}
	};
		
	//function to set initial username
	$(".setuser button").click(function(){
		var desiredName = $(".setuser .username").val();
		if(desiredName !== "" && desiredName !== null && desiredName !== undefined){
			username = desiredName;
			$(".setuser, .dim").fadeOut(100);
			setTimeout(function(){
				$(".messages-wrapper .status").text("Connected, say hello!");
				$(".reply input.usermsg").prop('disabled', false);
				kid.status = "idle";
				kid.curUsername = randomItem(kid.usernames);
			},(500+(Math.random()*1000)));
		}else{
			alert("Please enter a username.");
			$(".setuser input.username").focus();
		}
	});
	
	//send user's typed message when send button or enter key is pressed
	$(".reply input.usermsg").keydown(function(e){if(e.which === 13){sendMsg(username, $(this).val());}});
	$(".reply button.send").click(function(){sendMsg(username, $(".reply input.usermsg").val());$(".reply input.usermsg").focus();});
	
});