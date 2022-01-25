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

const contactForm = document.getElementById("contact");
const firstname = document.getElementById("firstname");
const lastname = document.getElementById("lastname");
const email = document.getElementById("email");
const message = document.getElementById("message");
const elementForm = document.querySelectorAll(".elementForm");

console.log(elementForm);

contactForm.addEventListener("submit", function(e) {
    e.preventDefault();

    let firstnameOk = true;
    let lastnameOk = true;
    let emailOk = true;
    let messageOk = true;

    let envoiContactOk = true;

    if(firstname.value.length<2) {
        firstnameOk = false;
        envoiContactOk = false;
        const erreurPrenom = document.getElementById("erreurPrenom")
        erreurPrenom.style.display = "block"
        erreurPrenom.textContent = "Merci de renseigner au moins deux caractères."
        erreurPrenom.style.color = "red";
        erreurPrenom.style.fontSize = "1.5em";
        firstname.style.border = "2px solid red"
        }
    
    if(lastname.value.length<2) {
        lastnameOk = false;
        envoiContactOk = false;
        const erreurNom = document.getElementById("erreurNom")
        erreurNom.style.display = "block"
        erreurNom.textContent = "Merci de renseigner au moins deux caractères."
        erreurNom.style.color = "red";
        erreurNom.style.fontSize = "1.5em";
        lastname.style.border = "2px solid red"
        }
    
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!email.value.trim().match(re)){
        emailOk = false;
        envoiContactOk = false;
        const erreurEmail = document.getElementById("erreurEmail")
        erreurEmail.style.display = "block"
        erreurEmail.textContent = "Merci de renseigner une adresse mail valide."
        erreurEmail.style.color = "red";
        erreurEmail.style.fontSize = "1.5em";
        email.style.border = "2px solid red"
    }

    if(message.value.length == "") {
        messageOk = false;
        envoiContactOk = false;
        const erreurMessage = document.getElementById("erreurMessage")
        erreurMessage.style.display = "block"
        erreurMessage.textContent = "Merci de compléter votre message."
        erreurMessage.style.color = "red";
        erreurMessage.style.fontSize = "1.5em";
        message.style.border = "2px solid red"
        }
    
    if (firstnameOk) {
        firstname.style.border = "2px solid green"
        erreurPrenom.style.display = "none"
    }
    if (lastnameOk) {
        lastname.style.border = "2px solid green"
        erreurNom.style.display = "none";
    }
    if (emailOk) {
        email.style.border = "2px solid green"
        erreurEmail.style.display = "none";
    }
    if (messageOk) {
        message.style.border = "2px solid green"
        erreurMessage.style.display = "none";
    }
    if(envoiContactOk) {
        console.log(firstname.value);
        console.log(lastname.value);
        console.log(email.value);
        console.log(message.value);
        document.getElementById("contact_modal").style.display = "none";
    } else {
        alert("Nope !")
    }
})