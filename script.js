// Replace this with YOUR Firebase config:
const firebaseConfig = {
    apiKey: "AIzaSyBuSQkpBwmggXK38mzmUxiClweWiKxD5bI",
    authDomain: "woobiedinobear.firebaseapp.com",
    projectId: "woobiedinobear",
    storageBucket: "woobiedinobear.firebasestorage.app",
    messagingSenderId: "642703845433",
    appId: "1:642703845433:web:56be57a1da63e1ecbd85e8"
  };
  
  firebase.initializeApp(firebaseConfig);
  const db = firebase.database();
  const chatRef = db.ref("chatroom");
  
  // Send a message
  function sendMessage() {
    const username = document.getElementById("username").value.trim();
    const message = document.getElementById("message").value.trim();
    if (username && message) {
      chatRef.push({ name: username, text: message });
      document.getElementById("message").value = "";
    }
  }
  
  
  // Listen for new messages
  chatRef.on("child_added", function(snapshot) {
    const msg = snapshot.val();
    const messageEl = document.createElement("div");
    messageEl.textContent = `${msg.name}: ${msg.text}`;
    const messagesContainer = document.getElementById("messages");
    messagesContainer.appendChild(messageEl);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  });
  
  // Add Enter key handler to "message" input
document.getElementById("message").addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      e.preventDefault(); // prevent accidental newlines
      sendMessage();
    }
  });
  // Helper to get query parameters from the URL
function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
  }
  
  // Set username from URL query parameter
  const usernameFromURL = getQueryParam("user");
  if (usernameFromURL) {
    const usernameInput = document.getElementById("username");
    usernameInput.value = usernameFromURL;
  }
  