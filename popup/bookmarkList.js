const bookmarkDiv = document.getElementById("bookmarkList");

document.addEventListener("DOMContentLoaded", () => {
  chrome.storage.local.get(["ownerEmail"], async (data) => {
    const owneremail = data.ownerEmail;

    chrome.storage.local.get(["bookmarkList"], async (data) => {
      const bookmarkList = data.bookmarkList;

      bookmarkList.forEach((bookmark) => {
        const bookmarkItem = document.createElement("li");
        const deleteBtn = document.createElement("button");

        deleteBtn.innerText = "Delete";

        deleteBtn.addEventListener("click", () => {
          const message = {
            owneremail: owneremail,
            title: bookmark.title,
            command: "delete bookmark",
          };
          chrome.runtime.sendMessage(message);
          bookmarkItem.remove();
          deleteBtn.remove();

          chrome.storage.local.get(["bookmarkList"], async (data) => {
            const bookmarkList = data.bookmarkList;
            const index = bookmarkList.findIndex((item) => item.id === bookmark.id);
            bookmarkList.splice(index, 1);
            await chrome.storage.local.set({ bookmarkList });
          });
        });

        bookmarkItem.innerText = bookmark.title;

        const dabba = document.createElement("div");
        dabba.appendChild(bookmarkItem);
        dabba.appendChild(deleteBtn);

        bookmarkDiv.appendChild(dabba);
      });
    });
  });
});
