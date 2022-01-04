    async function displayData(photographers) {
        const photographersSection = document.querySelector(".photographer_section");

        photographers.forEach((photographer) => {
            const photographerModel = photographerFactory(photographer);
            const userCardDOM = photographerModel.getUserCardDOM();
            photographersSection.appendChild(userCardDOM);
            console.log(photographer);
        } ); 
    };
    const getMedia = async () => {
        return await fetch("data/photographers.json")
        .then((res) => res.json());
      };
    async function init() {
        const { photographers } = await getMedia();
        console.log(photographers)
        displayData(photographers);
    };
    
    init();
    