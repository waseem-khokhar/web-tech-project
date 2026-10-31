// Wait for the web page to finish loading before running our JavaScript
document.addEventListener("DOMContentLoaded", function () {

  // Select the registration form from the HTML
  var registrationForm = document.querySelector(".signup-form");

  // Select the paragraph element where we will display success or error messages
  var formMessage = document.getElementById("form-message");

  // Add an event listener to handle form submission when the user clicks the submit button
  registrationForm.addEventListener("submit", function (event) {

    // Stop the default browser action so the page does not refresh or reload
    event.preventDefault();

    // Read the value entered in the Full Name input field
    var fullName = document.getElementById("fullname").value.trim();

    // Read the value entered in the Email input field
    var email = document.getElementById("email").value.trim();

    // Classroom demo only: saving plain passwords in browser storage is not secure in real applications
    var password = document.getElementById("password").value;

    // Read the selected Date of Birth value
    var birthday = document.getElementById("birthday").value;

    // Read the website value if an input element exists, otherwise default to an empty string
    var website = "";
    var websiteInput = document.getElementById("website");
    if (websiteInput) {
      website = websiteInput.value.trim();
    }

    // Read the chosen "Shopping for" radio button value
    var shoppingFor = "";
    var selectedRadio = document.querySelector('input[name="shopfor"]:checked');
    if (selectedRadio) {
      shoppingFor = selectedRadio.value;
    }

    // Read the selected Usual Size from the dropdown list
    var usualSize = document.getElementById("size").value;

    // Read the picked Favourite Colour code
    var favouriteColour = document.getElementById("favcolor").value;

    // Collect all checked interest checkboxes into an array
    var checkedInterests = [];
    var checkboxes = document.querySelectorAll('input[name="likes"]:checked');
    for (var i = 0; i < checkboxes.length; i++) {
      // Add each checked value to our list of interests
      checkedInterests.push(checkboxes[i].value);
    }

    // Retrieve the existing saved users text from localStorage using the key "everydayEditUsers"
    var savedUsersData = localStorage.getItem("everydayEditUsers");

    // Create an empty array to hold the list of users
    var usersList = [];

    // Check if there are already users saved in localStorage
    if (savedUsersData !== null) {
      // Convert the saved JSON text string into a real JavaScript array
      usersList = JSON.parse(savedUsersData);
    }

    // Variable to track whether the email is already registered
    var isEmailTaken = false;

    // Loop through all existing users to check if this email already exists
    for (var j = 0; j < usersList.length; j++) {
      // Compare existing email with the new email in lowercase
      if (usersList[j].email.toLowerCase() === email.toLowerCase()) {
        isEmailTaken = true;
        break; // Stop the loop early since we found a match
      }
    }

    // If the email is already in the saved users, show an error message and stop
    if (isEmailTaken === true) {
      // Set the error text inside the message element
      formMessage.textContent = "Error: An account with this email address already exists. Please use a different email.";
      // Apply the red error styling class
      formMessage.className = "message-error";
      // Stop the function execution
      return;
    }

    // Create a new user object to store all the collected form values
    var newUser = {
      fullName: fullName,
      email: email,
      password: password,
      birthday: birthday,
      website: website,
      shoppingFor: shoppingFor,
      usualSize: usualSize,
      favouriteColour: favouriteColour,
      interests: checkedInterests
    };

    // Add the new user object to the list of users
    usersList.push(newUser);

    // Convert the users array into a JSON string format
    var updatedUsersData = JSON.stringify(usersList);

    // Save the updated JSON string back into localStorage under the key "everydayEditUsers"
    localStorage.setItem("everydayEditUsers", updatedUsersData);

    // Display a friendly success message to the user
    formMessage.textContent = "Registration successful! Your style profile has been saved.";

    // Apply the green success styling class
    formMessage.className = "message-success";

    // Clear all the form input fields for the next entry
    registrationForm.reset();

  });

});
