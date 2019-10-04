el = document.getElementById("important");
el.addEventListener("click", set_catkey);

async function set_catkey() {
    console.log(browser);
    console.log('Got for it my catkey !');
    let tagList = await browser.messages.listTags();
    console.log(tagList);

    // Get selected messages
    let messageList = await browser.mailTabs.getSelectedMessages();
    //TODO MANGE LIST CORRECTLY although since we expect only one message that should be fine

    // More or less than one message selected -> stop there
    if (messageList.messages.length != 1) {
        console.log('Only works with one message selected');
        return;
    }

    let message = messageList.messages[0];
    console.log(message.subject);
    
    let full_message = await browser.messages.getFull(message.id);
    console.log(full_message.headers);
    full_message.headers.keywords = [tagList[0].tag];
    ['from'].push('guillaume.chanel@unige.ch')
    console.log(full_message.headers);
    console.log(full_message.headers['from']);
    console.log(full_message.headers['keywords']);
    browser.messages.archive([message.id]);


    browser.messages.update(message.id, {tags: [tagList[0].key]});
}