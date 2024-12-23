// content.js
// Author:
// Author URI: https://
// Author Github URI: https://www.github.com/
// Project Repository URI: https://github.com/
// Description: Handles all the webpage level activities (e.g. manipulating page data, etc.)
// License: MIT

const bookmarkImageURL = chrome.runtime.getURL("assets/bookmark.png");
const AZ_PROBLEM_KEY = "AZ_PROBLEM_KEY";


// window.addEventListener('load', addBookmarkButton);

const observer = new MutationObserver(() => {
    addBookmarkButton();
})

observer.observe(document.body,{childList: true, subtree: true});

addBookmarkButton();

function onProblemsPage(){
    return window.location.pathname.startsWith("/problems/");
}

function addBookmarkButton() {
    console.log("Trigerring ! ");
    if(!onProblemsPage() || document.getElementById("add-bookmark-button")) return ;

    const bookmarkButton = document.createElement('img');
    bookmarkButton.id = "add-bookmark-button";
    bookmarkButton.src = bookmarkImageURL;
    bookmarkButton.style.height = "30px";
    bookmarkButton.style.width = "30px";

    const askdoubtbutton = document.getElementsByClassName("coding_ask_doubt_button__FjwXJ")[0]

    askdoubtbutton.parentNode.insertAdjacentElement("afterend",bookmarkButton);

    bookmarkButton.addEventListener("click", addNewBookmarkHandler);

}

async function addNewBookmarkHandler() {
    const getCurrentBookmarks = await getCurrentBookmark();

    const azProblemUrl = window.location.href;
    const uniqueId = extractUniqueId(azProblemUrl);
    const problemName = document.getElementsByClassName("Header_resource_heading__cpRp1")[0].innerHTML;
    
    if(getCurrentBookmarks.some((bookmark) => bookmark.id === uniqueId)) return;


    const BookmarkObj = {
        id: uniqueId,
        name: problemName,
        url: azProblemUrl
    }

    const updatedBookmarks = [...getCurrentBookmarks,BookmarkObj];

    chrome.storage.sync.set({AZ_PROBLEM_KEY: updatedBookmarks}, () => {
        console.log("Updated the bookmarks correctly to ",updatedBookmarks);
    })

}

function extractUniqueId(url) {
    const start = url.indexOf("problems/") + "problems/".length;
    const end = url.indexOf("?",start);
    return end == -1 ? url.substring(start) : url.substring(start,end);
}


function getCurrentBookmark() {
    return new Promise((resolve,reject) => {
        chrome.storage.sync.get([AZ_PROBLEM_KEY],(results) => {
            resolve(results[AZ_PROBLEM_KEY] || []);
        });
    })
    
}
