
const defaultAdmin = {
  fullName: "Admin",
  email: "souad@gmail.com",
  password: "souad123",
  role: true 
};

if (!localStorage.getItem("users")) {

  localStorage.setItem("users", JSON.stringify([defaultAdmin]));
}




const eyeIcons = document.querySelectorAll(".eye-icon");
const loginLink = document.querySelector(".login-link");
const signupLink = document.querySelector(".signup-link");
const forms = document.querySelector(".forms");
const signupForm = document.querySelector(".form.signup form");

eyeIcons.forEach(eyeIcon => {
  eyeIcon.addEventListener("click", () => {
    let pwFields = eyeIcon.parentElement.parentElement.querySelectorAll(".password");
    pwFields.forEach(password => {
      if (password.type === "password") {
        password.type = "text";
        eyeIcon.classList.replace("bx-show", "bx-hide");
      } else {
        password.type = "password";
        eyeIcon.classList.replace("bx-hide", "bx-show");
      }
    });
  });
});


loginLink.addEventListener("click", (e) => {
  e.preventDefault();
  forms.classList.remove("show-signup");
});

signupLink.addEventListener("click", (e) => {
  e.preventDefault();
  forms.classList.add("show-signup");
});

signupForm.addEventListener("submit", function(event) {
  event.preventDefault(); e
  const fullName = document.querySelector(".form.signup input[type='text']").value;
  const email = document.querySelector(".form.signup input[type='email']").value;
  const password = document.querySelector(".form.signup input[type='password']").value;

  let users = JSON.parse(localStorage.getItem("users")) || [];

  users.push({ fullName: fullName, email: email, password: password, role: false });
  localStorage.setItem("users", JSON.stringify(users));

 
  window.location.href = "studentDash.html";
});


const loginButton = document.querySelector(".form.login button");

loginButton.addEventListener("click", function(event) {
  event.preventDefault(); 
  const userEmailInput = document.querySelector(".form.login input[type='email']").value;
  const userPasswordInput = document.querySelector(".form.login input[type='password']").value;

  const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
  const user = storedUsers.find(u => u.email === userEmailInput && u.password === userPasswordInput);

  if (user) {
    

    window.location.href = "studentDash.html";
  } else {
  
    alert("Veuillez vérifier vos informations de connexion");
  }
});
const currentUser = JSON.parse(localStorage.getItem("currentUser"));

if (currentUser && currentUser.role === true) {

  const storedUsers = JSON.parse(localStorage.getItem("users")) || [];

  storedUsers.forEach(user => {
    console.log("Full Name: " + user.fullName);
    console.log("Email: " + user.email);
    console.log("Password: " + user.password);
    console.log("Role: " + user.role);
    console.log("--------------");
  });
} else {
  
  console.log("Accès refusé. Vous n'êtes pas autorisé à afficher cette liste.");
}
