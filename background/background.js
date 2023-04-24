console.log("background is running");

// Onboarding page
chrome.runtime.onInstalled.addListener(async (e) => {
  if (e.reason === chrome.runtime.OnInstalledReason.INSTALL) {
    await chrome.storage.local.set({ isOnboarded: false });

    chrome.tabs.create({
      url: "./background/onboard/onboard.html", //this path has to be relative to root directory
    });
  } else if (e.reason === "update") {
    console.log("Antauri Sprx! Gibson! Nova! Otto! REELOD!");
  }
});

// listen for messages from popup
chrome.runtime.onMessage.addListener(async (message, sender) => {
  if (message.command === "add bookmark") {
    console.log("full message is: ", message);

    chrome.storage.local.get(["ownerEmail"], async (data) => {
      const ownerEmail = data.ownerEmail;

      await PostReqToServer(message.title, message.url, message.favIconUrl, ownerEmail);
    });
  }
});
