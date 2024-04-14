
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

// Fonction pour basculer l'affichage du mot de passe
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


// Fonction pour basculer entre les pages de connexion et d'inscription
loginLink.addEventListener("click", (e) => {
  e.preventDefault();
  forms.classList.remove("show-signup");
});

signupLink.addEventListener("click", (e) => {
  e.preventDefault();
  forms.classList.add("show-signup");
});

signupForm.addEventListener("submit", function(event) {
  event.preventDefault(); // Empêche le formulaire de se soumettre normalement

  // Récupérez les valeurs saisies par l'utilisateur dans les champs du formulaire
  const fullName = document.querySelector(".form.signup input[type='text']").value;
  const email = document.querySelector(".form.signup input[type='email']").value;
  const password = document.querySelector(".form.signup input[type='password']").value;

  // Récupérer les informations déjà stockées dans le local storage
  let users = JSON.parse(localStorage.getItem("users")) || [];

  // Ajouter le nouveau compte utilisateur aux informations existantes
  users.push({ fullName: fullName, email: email, password: password, role: false }); // Ajoutez le champ "role" avec la valeur initiale "false"

  // Enregistrer les informations mises à jour dans le stockage local
  localStorage.setItem("users", JSON.stringify(users));

  // Rediriger l'utilisateur vers la page definirDiff.html après l'inscription
  window.location.href = "studentDash.html";
});


const loginButton = document.querySelector(".form.login button");

loginButton.addEventListener("click", function(event) {
  event.preventDefault(); // Empêcher la soumission du formulaire

  // Récupérer l'e-mail et le mot de passe saisis par l'utilisateur
  const userEmailInput = document.querySelector(".form.login input[type='email']").value;
  const userPasswordInput = document.querySelector(".form.login input[type='password']").value;

  // Récupérer les informations d'utilisateur du local storage
  const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
  const user = storedUsers.find(u => u.email === userEmailInput && u.password === userPasswordInput);

  // Vérifier si l'utilisateur existe dans le localStorage
  if (user) {
    // Afficher un popup avec le message "Hello"
   

    // Rediriger l'utilisateur vers la page definirDiff.html après la connexion
    window.location.href = "studentDash.html";
  } else {
    // Si l'utilisateur n'est pas trouvé ou si le mot de passe est incorrect, afficher un message d'erreur
    alert("Veuillez vérifier vos informations de connexion");
  }
});

// Vérifier si l'utilisateur actuellement connecté a le rôle "true"
const currentUser = JSON.parse(localStorage.getItem("currentUser"));

if (currentUser && currentUser.role === true) {
  // Si l'utilisateur actuel a le rôle "true", afficher la liste des utilisateurs
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
