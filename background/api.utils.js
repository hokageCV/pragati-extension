// const extensionServerUrl = "https://fastify-extension.up.railway.app";
import { extensionServerUrl } from "../constants.mjs";

export const PostReqToServer = async (title, url, favIconUrl, ownerEmail) => {
  try {
    const response = await fetch(`${extensionServerUrl}/pragati`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, url, favIconUrl, ownerEmail }),
    });
    const data = await response.json();

    return { message: "done" };
  } catch (err) {
    console.log(err);
  }
};

// const requestGET = async (ownerEmail) => {
//   try {
//     const response = await fetch(`${extensionServerUrl}/pragati?owneremail=${ownerEmail}`, {
//       method: "GET",
//     });
//     const data = await response.json();

//     return { message: "done" };
//   } catch (err) {
//     console.log(err);
//   }
// };
