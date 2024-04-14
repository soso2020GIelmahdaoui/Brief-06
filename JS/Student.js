// Sélection du formulaire et du bouton qui ouvre le popup
const form = document.getElementById('form');
const containerForm = document.querySelector('.container-form');

// Sélection de tous les boutons d'édition
const modifierButtons = document.querySelectorAll('.modifierButton');

// Ajout d'un écouteur d'événements sur tous les boutons d'édition
modifierButtons.forEach(function(button) {
    button.addEventListener('click', function() {
        // Récupérer le formulaire associé au bouton cliqué
        const form = button.closest('tr').querySelector('.container-form form');
        
        // Ajout de la classe 'show-popup' au formulaire pour l'afficher
        form.classList.add('show-popup');
        containerForm.style.display = 'block'; // Afficher le conteneur du formulaire
    });
});


// Ajout d'un écouteur d'événements sur le formulaire pour cacher le popup lors de la soumission
form.addEventListener('submit', function(event) {
    event.preventDefault(); // Empêcher le rechargement de la page

    // Cacher le formulaire
    form.classList.remove('show-popup');
    containerForm.style.display = 'none';
});

// Récupérer les informations depuis le stockage local
var informations = JSON.parse(localStorage.getItem('informations'));

// Sélectionner le corps du tableau
var tbody = document.querySelector('tbody');

// Vérifier s'il y a des informations dans le stockage local
if (informations && informations.length > 0) {
    // Itérer sur chaque objet d'information
    informations.forEach(function(info) {
        // Créer une nouvelle ligne dans le tableau
        var row = tbody.insertRow();

        // Insérer les valeurs dans les cellules de la ligne
        var cellTitre = row.insertCell(0);
        var cellBrief = row.insertCell(1);
        var cellDateCreation = row.insertCell(2);
        var cellDifficulte = row.insertCell(3);
        var cellValide = row.insertCell(4);
        var cellActions = row.insertCell(5);

        // Remplir les cellules avec les valeurs de l'objet d'information
        cellTitre.textContent = info.titre;
        cellBrief.textContent = info.brief;
        cellDateCreation.textContent = info.dateAjout;

        // Ajouter les boutons dans la cellule Actions
        cellDifficulte.innerHTML = '<button><i class="bx bx-hide eye-icon"></i></button>';
        cellValide.innerHTML = '<button><i class="bx bxs-message-square-x"></i></button>';
        cellActions.innerHTML = '<button class="modifierButton"><i class="bx bx-edit-alt"></i></button>' +
                                '<button><i class="bx bx-trash"></i></button>';
    });
} else {
    // S'il n'y a pas d'informations, vous pouvez ajouter une ligne dans le tableau pour indiquer que la table est vide
    var emptyRow = tbody.insertRow();
    var cellEmpty = emptyRow.insertCell(0);
    cellEmpty.colSpan = "6"; // Fusionner les cellules pour couvrir toutes les colonnes
    cellEmpty.textContent = "Aucune information disponible";
}
