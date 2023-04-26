import { getCurrentTabData } from "./getCurrentTabData.js";

const bookmarkBtn = document.getElementById("bookmarkBtn");

bookmarkBtn.addEventListener("click", async () => {
  const data = await getCurrentTabData();

  const message = { ...data, command: "add bookmark" };
  chrome.runtime.sendMessage(message);
});
