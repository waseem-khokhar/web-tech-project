var messageBox = document.getElementById("message");

var messageCheck = document.getElementById("message-check");

messageBox.addEventListener("input", function () {
  if (messageBox.value.length < 10) {
    messageCheck.textContent = "Please write at least 10 characters.";
    messageCheck.style.color = "#9a5b45";
  } else {
    messageCheck.textContent = "Your message is ready to send.";
    messageCheck.style.color = "#55664a";
  }
});