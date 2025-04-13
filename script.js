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
  
  // Ping sound
  const pingSound = new Audio("ping.mp3");
  
  // Browser tab title flashing
  let originalTitle = document.title;
  let flashInterval = null;
  let windowFocused = true;
  
  window.addEventListener("focus", () => {
    windowFocused = true;
    document.title = originalTitle;
    clearInterval(flashInterval);
    flashInterval = null;
  });
  
  window.addEventListener("blur", () => {
    windowFocused = false;
  });
  
  // Pull username from URL
  function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
  }
  
  const usernameFromURL = getQueryParam("user");
  if (usernameFromURL) {
    document.getElementById("username").value = usernameFromURL;
  }
  
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
    const currentUser = document.getElementById("username").value.trim();
  
    if (msg.name === currentUser) {
      messageEl.classList.add("my-message"); // green default
    } else {
      messageEl.classList.add("other-message"); // amber
    }
  
    messagesContainer.appendChild(messageEl);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  
    pingSound.play().catch(e => console.log("Audio play blocked until user interaction"));
  
    if (!windowFocused && !flashInterval) {
      flashInterval = setInterval(() => {
        document.title = document.title === "💬 New Message!" ? originalTitle : "💬 New Message!";
      }, 1000);
    }
  });
    messageEl.textContent = `${msg.name}: ${msg.text}`;
    const messagesContainer = document.getElementById("messages");
    messagesContainer.appendChild(messageEl);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  
    // Play ping sound
    pingSound.play().catch(e => console.log("Audio play blocked until user interaction"));
  
    // Flash browser tab title if user is away
    if (!windowFocused && !flashInterval) {
      flashInterval = setInterval(() => {
        document.title = document.title === "💬 New Message!" ? originalTitle : "💬 New Message!";
      }, 1000);
    }
  ;
  
  // Enter key triggers message send
  document.getElementById("message").addEventListener("keydown", function(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      sendMessage();
    }
  });