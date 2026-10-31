// Wait for the web page to finish loading before running our JavaScript
document.addEventListener("DOMContentLoaded", function () {

  // Select the login form from the page
  var loginForm = document.querySelector(".login-form");

  // Select the paragraph element where we display login messages
  var loginMessage = document.getElementById("login-message");

  // Add an event listener to handle form submission
  loginForm.addEventListener("submit", function (event) {

    // Stop the default browser action so the page does not reload
    event.preventDefault();

    // Read the email entered by the user and remove extra spaces
    var enteredEmail = document.getElementById("email").value.trim();

    // NOTE: Checking plain-text passwords in browser JavaScript is only for a classroom demo and is not secure for real applications
    var enteredPassword = document.getElementById("password").value;

    // Get the saved users data string from localStorage
    var savedUsersData = localStorage.getItem("everydayEditUsers");

    // Check if the localStorage item is missing or empty
    if (savedUsersData === null) {
      // Show an error message telling the user to register first
      loginMessage.textContent = "No accounts found. Please register first.";
      // Apply the red error styling class
      loginMessage.className = "message-error";
      // Stop the function execution
      return;
    }

    // Convert the saved JSON text string into a JavaScript array of users
    var usersList = JSON.parse(savedUsersData);

    // Check if the users array has no items inside
    if (usersList.length === 0) {
      // Show an error message telling the user to register first
      loginMessage.textContent = "No accounts found. Please register first.";
      // Apply the red error styling class
      loginMessage.className = "message-error";
      // Stop the function execution
      return;
    }

    // Variable to hold the matched user object if found
    var matchedUser = null;

    // Loop through each user in our saved users array
    for (var i = 0; i < usersList.length; i++) {
      // Get the current user from the list
      var currentUser = usersList[i];

      // Check if both the email and password match
      if (currentUser.email.toLowerCase() === enteredEmail.toLowerCase() && currentUser.password === enteredPassword) {
        // Save the matched user
        matchedUser = currentUser;
        // Break out of the loop early since we found the matching account
        break;
      }
    }

    // If no matching user was found, show an error message
    if (matchedUser === null) {
      // Display wrong credentials error
      loginMessage.textContent = "Wrong email or password";
      // Apply the red error styling class
      loginMessage.className = "message-error";
      // Stop the function
      return;
    }

    // Determine the user's name (check both fullName and fullname)
    var userName = "Member";
    if (matchedUser.fullName) {
      userName = matchedUser.fullName;
    } else if (matchedUser.fullname) {
      userName = matchedUser.fullname;
    }

    // Create an object with the logged-in user's details for the current session
    var sessionUserData = {
      fullName: userName,
      email: matchedUser.email
    };

    // Save the logged-in user in sessionStorage under "everydayEditCurrentUser"
    sessionStorage.setItem("everydayEditCurrentUser", JSON.stringify(sessionUserData));

    // Display a green success message
    loginMessage.textContent = "Login successful! Redirecting to home...";
    // Apply the green success styling class
    loginMessage.className = "message-success";

    // Wait 1 second (1000 milliseconds) before redirecting to the home page
    setTimeout(function () {
      // Navigate the browser to index.html
      window.location.href = "index.html";
    }, 1000);

  });

});
