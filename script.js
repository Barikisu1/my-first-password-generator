// Array of special characters to be included in password
var specialCharacters = [
  '@', '%', '+', '\\', '/', "'", '!', '#', '$', '^', '?', ':', ',', ')', '(', '}', '{', ']', '[', '~', '-', '_', '.'
];

// Array of numeric characters to be included in password
var numericCharacters = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

// Array of lowercase characters to be included in password
var lowerCasedCharacters = 'abcdefghijklmnopqrstuvwxyz'.split('');

// Array of uppercase characters to be included in password
var upperCasedCharacters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

// Function to prompt user for password options
function generatePassword() {
  var length = parseInt(prompt("How many characters do you want?"));
  if (isNaN(length) || length < 8 || length > 128) {
      alert("Please enter a valid password length between 8 and 128.");
      return null;
  }

  var includeUppercase = confirm("Do you want to include uppercase characters?");
  var includeLowercase = confirm("Do you want to include lowercase characters?");
  var includeSpecialCharacters = confirm("Do you want to include special characters?");
  var includeNumbers = confirm("Do you want to include numbers?");

  if (!includeUppercase && !includeLowercase && !includeSpecialCharacters && !includeNumbers) {
      alert("At least one character type must be selected.");
      return null;
  }

  var options = {
      length: length,
      includeUppercase: includeUppercase,
      includeLowercase: includeLowercase,
      includeSpecialCharacters: includeSpecialCharacters,
      includeNumbers: includeNumbers
  };

  var possibleCharacters = [];
  var guaranteedCharacters = [];

  if (options.includeUppercase) {
      possibleCharacters = possibleCharacters.concat(upperCasedCharacters);
      guaranteedCharacters.push(getRandom(upperCasedCharacters));
  }

  if (options.includeLowercase) {
      possibleCharacters = possibleCharacters.concat(lowerCasedCharacters);
      guaranteedCharacters.push(getRandom(lowerCasedCharacters));
  }

  if (options.includeSpecialCharacters) {
      possibleCharacters = possibleCharacters.concat(specialCharacters);
      guaranteedCharacters.push(getRandom(specialCharacters));
  }

  if (options.includeNumbers) {
      possibleCharacters = possibleCharacters.concat(numericCharacters);
      guaranteedCharacters.push(getRandom(numericCharacters));
  }

  var remainingLength = options.length - guaranteedCharacters.length;

  for (var i = 0; i < remainingLength; i++) {
      var randomCharacter = getRandom(possibleCharacters);
      guaranteedCharacters.push(randomCharacter);
  }

  return guaranteedCharacters.join('');
}

// Function for getting a random element from an array
function getRandom(arr) {
  var randomIndex = Math.floor(Math.random() * arr.length);
  var randomElement = arr[randomIndex]; // Retrieve random element from array
  return randomElement;
}

// Get references to the #generate element
var generateBtn = document.querySelector('#generate');

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  if (password) {
      var passwordText = document.querySelector('#password');
      passwordText.value = password;
  }
}

// Add event listener to generate button
generateBtn.addEventListener('click', writePassword);

