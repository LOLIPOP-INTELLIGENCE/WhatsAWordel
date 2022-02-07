exports.handler = function(context, event, callback) {
	let twiml = new Twilio.twiml.MessagingResponse();
    let incomingMessage = event.Body.toLowerCase();
    incomingMessage = incomingMessage.trim();
    var Typo = require("typo-js");
    var dictionary = new Typo("en_US");
    var is_correct_spelling = dictionary.check(incomingMessage);
    var emoji = require('node-emoji');
    let date_ob = new Date();
    let ISToffSet = 330;
    let offset= ISToffSet*60*1000;
    var ISTTime = new Date(date_ob.getTime()+offset);
    let date_num = ISTTime.getDate();    
    if(incomingMessage.length !== 5)
    {
	    twiml.message(emoji.emojify("Welcome to WhatsAWordel.\n1. Your goal is to guess a 5-letter word.\n2. Make guesses by sending them to this number.(Guesses should be valid 5-letter words)\n3. :white_large_square: - Wrong Letter\n4. :large_green_square: - Correct Letter, Correct Position\n5. :large_yellow_square: - Correct Letter, Wrong Position\n5. Do not enter STOP. It will terminate the game.\nHappy Wordelling!!\nEnter you 5-letter guess"));
    }
    else if(is_correct_spelling === false)
    {
        twiml.message("Please enter a valid 5-letter word");
    }
    else
    {
        const words = ["minus", "ready", "image", "earth", "pouch", "space", "jazzy", "stone", "cable", "dated", "eagle", "early", "false", "gamer", "halls", "jeans", "minus"];

        let ch_words = words[date_num].split("");
        let ch_msg = incomingMessage.split("");
        let output = [":white_large_square:", ":white_large_square:", ":white_large_square:", ":white_large_square:", ":white_large_square:"];
        for(let i = 0; i<5; i++)
        {
            if(ch_words[i] === ch_msg[i])
            {
                output[i] = ":large_green_square:";
                ch_words[i] = "#";
                ch_msg[i] = "*";
            }
        }
        for(let i = 0; i<5; i++)
        {
            for(let j = 0; j<5; j++)
            {
                if(ch_msg[i] === ch_words[j])
                {
                    output[i] = ":large_yellow_square:";
                    ch_words[j] = "#";
                    ch_msg[i] = "*";
                }
            }
        }
        let final_output = "";
        let cnt = 0;
        for(let i = 0; i<5; i++)
        {
            final_output += emoji.emojify(output[i]);
            if(output[i] === ":large_green_square:")
            {
                cnt = cnt + 1;
            }
        }
        if(cnt !== 5)
        {
    	    twiml.message(final_output);
        }
        else
        {
            const img_links = ["","","","","https://www.linkpicture.com/q/I-got-today-s-wardel-1.png", "https://www.linkpicture.com/q/I-got-today-s-wardel-2_1.png", "https://www.linkpicture.com/q/Copy-of-I-got-today-s-wardel-1.png","https://www.linkpicture.com/q/Copy-of-Copy-of-I-got-today-s-wardel-1_1.png"];
            let message0 = twiml.message();
    	    message0.body(final_output + "\nCongratulations!! See you tomorrow for another Wordel challenge.\nCreated by www.manasbam.com");
    	    //let message1 = twiml.message();
    	    message0.media(img_links[date_num]);
    	    let message2 = twiml.message();
    	    message2.body("Share your results and invite your friends to play by forwarding this message:\n\nI got today's WhatsAWordel!! To play, message\n \"Join tongue-around\" \nto +1 (415) 523-8886 and then say hi.\nNow enjoy playing your favourite game right here, on WhatsApp!");
    	            }
    }
	callback(null, twiml);
};
