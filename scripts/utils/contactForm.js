// Script d'ouverture de la modale :

let modal = document.getElementById('contact_modal');
let btnOuvertureModal = document.getElementById('openModal');

// Fonction d'ouverture de la modale :

btnOuvertureModal.addEventListener("click", function(){
    modal.style.display = 'block';
});

// Fonction de fermeture de la modale :

function closeModal() {
    modal.style.display = 'none';
}

// Ecoute du formulaire & validation des éléments :

