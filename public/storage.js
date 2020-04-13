let urlsToSave = []
let openUrls 
let getData
let curr
let curr2
let curr3

let x = () => {
    chrome.tabs.query({currentWindow: true}, tabs => {
        openUrls = tabs;
    });
}

x()

window.onload = () => {

    curr = openUrls[openUrls.length - 1]
    curr2 = openUrls[openUrls.length - 2]
    curr3 = openUrls[openUrls.length - 3]

    document.querySelector("#closeOne").onclick = () => {
        chrome.storage.sync.get("tabs", (data) => {
            getData = data.tabs
            if (getData != {} && getData != undefined) {
                    urlsToSave = [...getData, curr.url]
            } else {
                urlsToSave = [curr.url]
            }
            chrome.storage.sync.set({"tabs": urlsToSave}, () => {
                console.log("Tabs saved!")
            })
        })
        
        chrome.tabs.remove(curr.id)
    }

    document.querySelector("#closeThree").onclick = () => {
        chrome.storage.sync.get("tabs", (data) => {
            getData = data.tabs
            if (getData != {} && getData != undefined) {
                    urlsToSave = [...getData, curr.url, curr2.url, curr3.url]
            } else {
                urlsToSave = [curr.url, curr2.url, curr3.url]
            }
            chrome.storage.sync.set({"tabs": urlsToSave}, () => {
                console.log("Tabs saved!")
            })
        })
        
        chrome.tabs.remove(curr.id)
        chrome.tabs.remove(curr2.id)
        chrome.tabs.remove(curr3.id)
    }

    document.querySelector("#closeAll").onclick = () => {
        allUrls = []
        openUrls.forEach(el => {
            allUrls.push(el.url)
        })
        chrome.storage.sync.get("tabs", (data) => {
            getData = data.tabs
            if (getData != {} && getData != undefined) {
                    urlsToSave = [...getData, ...allUrls]
            } else {
                urlsToSave = [...allUrls]
            }
            chrome.storage.sync.set({"tabs": urlsToSave}, () => {
                console.log("Tabs saved!")
            })
        })
        
        openUrls.forEach(el => {
            chrome.tabs.remove(el.id)
        })
    }

    document.querySelector("#clearStorage").onclick = () => {
        chrome.storage.sync.set({"tabs": []}, () => {
            console.log("Storage cleared!")
        })
    }

    document.querySelector("#openAll").onclick = () => {
        chrome.storage.sync.get("tabs", (data) => {
            console.log(data.tabs)
            chrome.windows.create({"url": data.tabs})
        })
        chrome.storage.sync.set({"tabs": []}, () => {
            console.log("Storage cleared!")
        })
    }
}
