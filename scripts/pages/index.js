   // Fonction afin d'afficher l'ensemble des photographes :
    async function displayData(photographers) {
        const photographersSection = document.querySelector(".photographer_section");

        photographers.forEach((photographer) => {
            const photographerModel = photographerFactory(photographer);
            const userCardDOM = photographerModel.getUserCardDOM();
            photographersSection.appendChild(userCardDOM);
            console.log(photographer);
        } ); 
    };

    // Appel de l'API fetch :
    const getMedia = async () => {
        return await fetch("data/photographers.json")
        .then((res) => res.json());
      };
    
    // Appel des fonctions :
    async function init() {
        const { photographers } = await getMedia();
        displayData(photographers);
    };
    
    // Déclenchement de la fonction init par défaut :
    init();
    