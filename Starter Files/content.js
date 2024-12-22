// content.js
// Author:
// Author URI: https://
// Author Github URI: https://www.github.com/
// Project Repository URI: https://github.com/
// Description: Handles all the webpage level activities (e.g. manipulating page data, etc.)
// License: MIT

const bookmarkImageURL = chrome.runtime.getURL("assets/bookmark.png");

window.addEventListener('load', addBookmarkButton);

function addBookmarkButton() {
    const bookmarkButton = document.createElement('img');
    bookmarkButton.id = "add-bookmark-button";
    bookmarkButton.src = bookmarkImageURL;
    bookmarkButton.style.height = "30px";
    bookmarkButton.style.width = "30px";

    const askdoubtbutton = document.getElementsByClassName("coding_ask_doubt_button__FjwXJ")[0]

    askdoubtbutton.parentNode.insertAdjacentElement("afterend",bookmarkButton);


}