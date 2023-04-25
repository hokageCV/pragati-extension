// const AUTH_URL = "http://localhost:4000";
import { AUTH_URL } from "../../constants.mjs";
import { initParticleAnimation } from "./onboard.animate.js";

const form = document.getElementById("form");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const errorDisplay = document.getElementById("error-display");

form.addEventListener("submit", (e) => submitForm(e));

const submitForm = async (e) => {
  e.preventDefault();

  const email = emailInput.value;
  const password = passwordInput.value;
  form.reset();

  try {
    const response = await fetch(`${AUTH_URL}/user/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message);
    }
    if (response.ok) {
      await chrome.storage.local.set({ ownerEmail: email });
      await chrome.storage.local.set({ token: data.token });
      await chrome.storage.local.set({ isOnboarded: true });
      window.close();
    }
  } catch (err) {
    console.log(err);
    errorDisplay.textContent = err.message;
  }
};

// =================================================
initParticleAnimation();

// =================================================
