// Après que l'utilisateur se soit connecté avec succès
function loginUser(email, password) {
 
  const users = JSON.parse(localStorage.getItem("users")) || [];

  const userIndex = users.findIndex(u => u.email === email && u.password === password);
   
  if (userIndex !== -1) { 
    localStorage.setItem("currentUserName", users[userIndex].fullName);
    window.location.href = "dashboard.html";
  } else {
    alert("Adresse e-mail ou mot de passe incorrect.");
  }
}

// Lorsque l'utilisateur soumet le formulaire
document.getElementById('form').addEventListener('submit', function(e) {
  e.preventDefault();

  // Récupérer les valeurs saisies dans le formulaire
  var formateur = document.getElementById('name').value;
  var bootcamp = document.getElementById('bootcamp').value;
  var titre = document.getElementById('titre').value;
  var brief = document.getElementById('brief').value;
  var difficulte = document.getElementById('msg').value;
  

  var username = localStorage.getItem("currentUserName") || "Utilisateur Anonyme";


  
  if (formateur && bootcamp && titre && brief && difficulte) {
    
    var infoObj = {
      formateur: formateur,
      bootcamp: bootcamp,
      titre: titre,
      brief: brief,
      difficulte: difficulte,
      dateAjout: new Date().toLocaleDateString(), // Date d'ajout formatée
      username: username
    };
    var existingInfos = JSON.parse(localStorage.getItem('informations')) || [];

   
    existingInfos.push(infoObj);


    localStorage.setItem('informations', JSON.stringify(existingInfos));

    
    alert('Informations ajoutées avec succès !');
   


    document.getElementById('form').reset();
    window.location.href = "StudentDash.html";
  } else {
   
    alert('Veuillez remplir tous les champs du formulaire.');
  }
});