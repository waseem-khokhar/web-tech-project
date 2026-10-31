// Wait for the web page to finish loading before running our JavaScript
document.addEventListener("DOMContentLoaded", function () {

  // Select the welcome message paragraph element under the top bar
  var welcomeElement = document.getElementById("welcome-message");

  // Read the current logged-in user data from sessionStorage
  var savedUserJson = sessionStorage.getItem("everydayEditCurrentUser");

  // Check if a user is currently logged in
  if (savedUserJson !== null) {

    // Convert the saved JSON text into a JavaScript object
    var currentUser = JSON.parse(savedUserJson);

    // Get the user's full name, checking both common property names
    var userName = "";
    if (currentUser.fullName) {
      userName = currentUser.fullName;
    } else if (currentUser.fullname) {
      userName = currentUser.fullname;
    } else {
      userName = "Member";
    }

    // Set the welcome text using textContent
    welcomeElement.textContent = "Welcome back, " + userName + " | ";

    // Create a new link element for logging out
    var logoutLink = document.createElement("a");

    // Set the link text to Logout
    logoutLink.textContent = "Logout";

    // Set href to '#' so it behaves like a clickable link
    logoutLink.href = "#";

    // Add a CSS class name so it can be styled cleanly
    logoutLink.className = "logout-link";

    // Listen for a click on the logout link
    logoutLink.addEventListener("click", function (event) {

      // Prevent the default link jump behavior
      event.preventDefault();

      // Remove the current user from sessionStorage
      sessionStorage.removeItem("everydayEditCurrentUser");

      // Reload the page to update the welcome display
      window.location.reload();

    });

    // Add the logout link inside the welcome paragraph
    welcomeElement.appendChild(logoutLink);

  }

});
