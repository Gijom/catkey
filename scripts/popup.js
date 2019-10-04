el = document.getElementById("important");
el.addEventListener("click", set_catkey);

async function set_catkey() {
    console.log('Got for it my catkey !');
    let tagList = await browser.messages.listTags();
    for (let tag of tagList) {
        console.log(tag.tag);
    }

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

    browser.messages.update(message.id, {tags: [tagList[0].key]});
}