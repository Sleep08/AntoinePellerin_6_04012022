const photographerPageEdit = async () => {
    // Récupération des Data Photographers
    const { photographers, media } = await getMedia();
    // Récupération de l'Id du photographe selon est cliqué depuis l'index
    let params = (new URL(document.location)).searchParams;
    let photographerId = params.get('id');
    // Modification des élts de la page selon l'ID du photographe
    photographers.forEach((photographer) => {

        if (photographer.id == photographerId) {
            // récupération des éléments Header :
            const photographHeader = document.querySelector('.photograph-header');
            const headerPhotographTxt = document.querySelector('.headerPhotographTxt')
            // création du txt de l'header :
            const headerH1 = document.createElement('h1');
            headerH1.textContent = photographer.name;
            const cityPhotograph = document.createElement('p');
            cityPhotograph.textContent = photographer.city;
            const taglinePhotograph = document.createElement('p');
            taglinePhotograph.textContent = photographer.tagline;

            headerPhotographTxt.appendChild(headerH1);
            headerPhotographTxt.appendChild(cityPhotograph);
            headerPhotographTxt.appendChild(taglinePhotograph);
            // Ajout de l'img du photograph :

            const picture = '/FishEye_Photos/SamplePhotos/PhotographersIDPhotos/'+photographer.portrait;
            const img = document.createElement('img');
            img.setAttribute("src", picture);
            photographHeader.appendChild(img);

            document.getElementById('contactPhotograph').innerHTML = "Contactez-moi" + '</br>' + photographer.name;
            
        }
    });

    const mediaGallery = document.getElementById('media_gallery');

    media.forEach((med) => {
        if (med.photographerId == photographerId) {
            const mediaModel = mediaFactory(med);
            const mediaCardDOM = mediaModel.getMediaCardDOM();
            mediaGallery.appendChild(mediaCardDOM);
        }
    })
}

const getMedia = async () => {
    return await fetch("data/photographers.json")
    .then((res) => res.json());
  };
photographerPageEdit();

