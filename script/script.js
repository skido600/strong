class Viewafrom {
  constructor() {
    // Element references
    this.username = document.getElementById("username");
    this.lastname = document.getElementById("lastname");
    this.email = document.getElementById("email");
    this.phone = document.getElementById("phone");

    // Form reference
    this.form = document.querySelector("form");
    console.log(this.form);

    // Error message elements
    this.usernameError = this.username.nextElementSibling;
    this.lastnameError = this.lastname.nextElementSibling;
    this.emailError = this.email.nextElementSibling;
    this.phoneError = this.phone.nextElementSibling;

    // Event listeners for real-time validation
    this.username.addEventListener("input", () => this.validateUsername());
    this.lastname.addEventListener("input", () => this.validateLastname());
    this.email.addEventListener("input", () => this.validateemail());
    this.phone.addEventListener("input", () => this.validatenumber());

    // Form submission handler
    this.form.addEventListener("submit", (e) => {
      e.preventDefault();
      this.validateUsername();
      this.validateLastname();
      this.validateemail();
      this.validatenumber();

      if (this.isvalide()) {
        // Example of sending data to a backend
        fetch("http://localhost:5000/submit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: this.username.value,
            lastname: this.lastname.value,
            email: this.email.value,
            phone: this.phone.value,
          }),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log("Success:", data);
            window.location = "page.html";
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      }
    });
  }

  validateUsername() {
    const usernameInput = this.username.value;
    const nameRegex = /^[A-Za-zÀ-ÖØ-Ýà-öø-ÿ\s'-]{2,50}$/;
    let message = "";

    if (usernameInput.length < 4) {
      message = "Name must be greater than three characters.";
    } else if (!nameRegex.test(usernameInput)) {
      message =
        "Invalid name. Only letters, spaces, and certain punctuation are allowed.";
    }

    this.usernameError.textContent = message;
  }

  validateLastname() {
    const lastnameInput = this.lastname.value;
    const nameRegex = /^[A-Za-zÀ-ÖØ-Ýà-öø-ÿ\s'-]{2,50}$/;
    let message = "";

    if (lastnameInput.length < 4) {
      message = "Name must be greater than three characters.";
    } else if (!nameRegex.test(lastnameInput)) {
      message =
        "Invalid name. Only letters, spaces, and certain punctuation are allowed.";
    }

    this.lastnameError.textContent = message;
  }

  validateemail() {
    const emailRegex = /^(?!.*\.\.)[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    const emailInput = this.email.value;
    let message = "";

    if (!emailRegex.test(emailInput)) {
      message = "Invalid email.";
    }

    this.emailError.textContent = message;
  }

  validatenumber() {
    const phoneNumberRegex =
      /^(\+?\d{1,4}[\s-]?)?(\(?\d{1,4}\)?[\s-]?)\d{1,4}[\s-]?\d{1,4}[\s-]?\d{1,9}$/;
    const numberInput = this.phone.value;
    let message = "";

    if (!phoneNumberRegex.test(numberInput)) {
      message = "Invalid number.";
    }

    this.phoneError.textContent = message;
  }
  isvalide() {
    return !(
      this.usernameError.textContent ||
      this.lastnameError.textContent ||
      this.emailError.textContent ||
      this.phoneError.textContent
    );
  }
}

// Create an instance of the Viewafrom class
const fullstackform = new Viewafrom();
