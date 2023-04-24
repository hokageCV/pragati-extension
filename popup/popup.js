const bookmarkBtn = document.getElementById("bookmarkBtn");

bookmarkBtn.addEventListener("click", async () => {
  const data = await getCurrentTabData();

  const message = {
    ...data,
    command: "add bookmark",
  };
  chrome.runtime.sendMessage(message);
});

// ==================

const getCurrentTabData = async () => {
  const tabs = await chrome.tabs.query({ active: true, currentWindow: true });

  const requiredData = {
    title: tabs[0].title,
    url: tabs[0].url,
    favIconUrl: tabs[0].favIconUrl,
  };

  return requiredData;
};
