import { getCurrentTabData } from "./getCurrentTabData.js";

const bookmarkBtn = document.getElementById("bookmarkBtn");

chrome.storage.local.get(["bookmarkList"], async (data) => {
  const bookmarkList = data.bookmarkList;

  const currentTabData = await getCurrentTabData();

  if (bookmarkList.some((bookmark) => bookmark.url === currentTabData.url)) {
    bookmarkBtn.disabled = true;
    bookmarkBtn.innerText = "Already Bookmarked";
  }
});

bookmarkBtn.addEventListener("click", async () => {
  const data = await getCurrentTabData();

  const message = { ...data, command: "add bookmark" };
  chrome.runtime.sendMessage(message);

  bookmarkBtn.disabled = true;
  bookmarkBtn.innerText = "Already Bookmarked";
});
