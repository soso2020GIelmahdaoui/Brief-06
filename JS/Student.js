const formup = document.getElementById("form");
const titre = document.getElementById("titre");
const brief = document.getElementById("brief");
const difficulte = document.getElementById("difficulte");
const submitBtn = document.getElementById("submitBtn"); // Définir submitBtn
const modalTitle = document.getElementById("modalTitle"); 

const informations = JSON.parse(localStorage.getItem('informations')) || [];
const getData = informations || []; 

let isEdit = false;
let editId;

let tableau = `
<table>
    <thead>
        <tr class="heading">
            <th>Titre</th>
            <th>Brief</th>
            <th>Date de création</th>
            <th>Difficulté</th>
            <th>Validé</th>
            <th>Actions</th>
        </tr>
    </thead>
<tbody>
`;
informations.forEach(info => {
    tableau += `
    <tr id="${info.id}">
        <td>${info.titre}</td>
        <td>${info.brief}</td>
        <td>${info.dateAjout}</td>
        <td><button class="ReadButton" id="read" onclick="showInfoForm('${info.formateur}', '${info.bootcamp}', '${info.titre}', '${info.brief}', '${info.difficulte}')"><i class='bx bx-hide eye-icon'></i></button></td>
        <td><button><i class='bx bxs-message-square-x'></i></button></td>
        <td>
            <button class="modifierButton" onclick="editInfo('${info.id}', '${info.titre}', '${info.brief}', '${info.difficulte}')"><i class='bx bx-edit-alt'></i></button>
            <button class="deleteButton"><i class='bx bx-trash'></i></button>
        </td>
    </tr>`;
});

tableau += `</tbody></table>`;

const containerHeader = document.querySelector('.container-header');
containerHeader.insertAdjacentHTML('beforeend', tableau);

function showInfoForm(formateur, bootcamp, titre, brief, difficulte) {
    document.getElementById("showname").value = formateur;
    document.getElementById("showbootcamp").value = bootcamp;
    document.getElementById("showtitre").value = titre;
    document.getElementById("showbrief").value = brief;
    document.getElementById("showmsg").value = difficulte;
    document.querySelector(".container-form").style.display = "block";
    document.getElementById("showform").style.display = "block";
}

function editInfo(index, Titre, Brief, Difficulte) {
    console.log("Edit button clicked."); // Ajout de la console pour débogage
    isEdit = true;
    editId = index;
  
    titre.value = Titre;
    brief.value = Brief;
    difficulte.value = Difficulte;
  
    if(submitBtn) {
        submitBtn.innerText = "Close";
    }
    if(modalTitle) {
        modalTitle.innerText = "Update The Form";
    }
    
    submitBtn.removeEventListener('click', submitForm);
    submitBtn.addEventListener('click', updateInfo);
    document.querySelector(".container-form1").style.display = "block";
    document.getElementById("form").style.display = "block";
}


function updateInfo() {
    const titreValue = titre.value;
    const briefValue = brief.value;
    const difficulteValue = difficulte.value;
  
    const information = {
      titre: titreValue,
      brief: briefValue,
      difficulte: difficulteValue
    };
  
    getData[editId] = information;
    localStorage.setItem('informations', JSON.stringify(getData));
    formup.reset();
  
    isEdit = false;
    
    if(submitBtn) {
        submitBtn.innerText = "Submit";
    }
    if(modalTitle) {
        modalTitle.innerText = "Fill the Form";
    }
    
    submitBtn.removeEventListener('click', updateInfo);
    window.location.reload();
}

function submitForm(event) {
    event.preventDefault();
  
    const titreValue = titre.value;
    const briefValue = brief.value;
    const difficulteValue = difficulte.value;
  
    const newDetail = {
      titre: titreValue,
      brief: briefValue,
      difficulte: difficulteValue
    };
  
    getData.push(newDetail);
    
    localStorage.setItem('informations', JSON.stringify(getData));
    
    formup.reset();
}


const boutonsModifier = document.querySelectorAll('.modifierButton');
boutonsModifier.forEach(bouton => {
    bouton.addEventListener('click', function() {
        const index = this.parentElement.parentElement.id;
        const info = getData.find(item => item.id === index);
        editInfo(info.id, info.titre, info.brief, info.difficulte);
    });
});


const boutonAfficherFormulaire = document.getElementById('read');
const formulaireContainer = document.querySelector('.container-form');
boutonAfficherFormulaire.addEventListener('click', function() {
    formulaireContainer.style.display = "block";
});

const deleteButtons = document.querySelectorAll('.deleteButton');
deleteButtons.forEach(function(button) {
    button.addEventListener('click', function() {
        const confirmation = confirm("Voulez-vous vraiment supprimer cet élément ?");
        if (confirmation) {
            const rowId = button.closest('tr').id;
            button.closest('tr').remove();
            informations = informations.filter(info => info.parentId !== rowId);
            localStorage.setItem('informations', JSON.stringify(informations));
        }
    });
});
