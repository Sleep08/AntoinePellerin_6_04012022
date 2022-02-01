const mediaGallery = document.getElementById('media_gallery');

const popularity = document.getElementById("popularity");
const title = document.getElementById("title");

/*title.addEventListener("click", function(mediaId){
    return mediaId.sort((a, b) => a.title.localeCompare(b.title));
});*/

const filterByOption = (mediaId, option) => {
	switch (option) {
		case "popularity":
			return mediaId.sort((a, b) => {
				return b.likes - a.likes;
			});
		case "title":
			return mediaId.sort((a, b) => a.title.localeCompare(b.title));
		default:
			return mediaId.sort((a, b) => {
				return b.likes - a.likes;
			});
	}
};

async function photographerPageEdit() {
    // Récupération des Data Photographers
    const { photographers, media } = await getMedia();
    // Récupération de l'Id du photographe selon est cliqué depuis l'index
    let params = (new URL(document.location)).searchParams;
    let photographerId = params.get('id');
    const currentPhotographer = photographers.find((photographer) => photographer.id == photographerId);
    // Modification des élts de la page selon l'ID du photographe

    // récupération des éléments Header :
    const photographHeader = document.querySelector('.photograph-header');
    const headerPhotographTxt = document.querySelector('.headerPhotographTxt');
    headerPhotographTxt.setAttribute("id", "headerTxt");
    
    // création du txt de l'header :
    const headerH1 = document.createElement('h1');
    headerH1.textContent = currentPhotographer.name;
    const cityPhotograph = document.createElement('p');
    cityPhotograph.textContent = currentPhotographer.city;
    cityPhotograph.setAttribute("id", "cityPhotograph");
    const taglinePhotograph = document.createElement('p');
    taglinePhotograph.textContent = currentPhotographer.tagline;
    taglinePhotograph.setAttribute("id", "taglinePhotograph");

    headerPhotographTxt.appendChild(headerH1);
    headerPhotographTxt.appendChild(cityPhotograph);
    headerPhotographTxt.appendChild(taglinePhotograph);
    // Ajout de l'img du photograph :

    const picture = '/FishEye_Photos/SamplePhotos/PhotographersIDPhotos/'+currentPhotographer.portrait;
    const img = document.createElement('img');
    img.setAttribute("src", picture);
    img.setAttribute("aria-label", currentPhotographer.name)
    photographHeader.appendChild(img);

    document.getElementById('contactPhotograph').innerHTML = "Contactez-moi" + '</br>' + currentPhotographer.name + '</br>';
    const footer = document.getElementById('footer');
    const divPrice = document.createElement('div');
    divPrice.innerHTML = currentPhotographer.price + "€/jour";
    footer.appendChild(divPrice);

	document.addEventListener("change", function (event) {
		mediaGallery.innerHTML = "";
		const option = filterByOption(mediaId, event.target.value);
		mediaByOption(option);
        lightBox.init();
	});

    const mediaId = media.filter((media) => media.photographerId == photographerId);

    mediaByOption(mediaId);

    let totalLikes = (mediaId.reduce((n, {likes}) => n + likes, 0));
    const divLikesTotal = document.createElement('div');
    divLikesTotal.setAttribute("id", "totalLikes");
    divLikesTotal.innerHTML = totalLikes+ " ❤";
    footer.appendChild(divLikesTotal);
};

function mediaByOption(mediaId) {
    mediaId.forEach((med) => {
        const mediaModel = new mediaFactory(med);
        mediaGallery.innerHTML += mediaModel.createHtml();
});
}

// Création d'une fonction pour incrémenter le nb de likes :
function mediaLikes() {
    let nbLikes = document.querySelectorAll('.nbLikes');
    let likesTotal = document.getElementById("totalLikes");
    nbLikes.forEach(function (like) {
        let Compteur = parseInt(like.innerHTML);
        like.addEventListener('click', function(){
            let totalCompteur = parseInt(likesTotal.innerHTML);
            Compteur++;
            totalCompteur++;
            like.innerHTML = Compteur + " ❤";
            likesTotal.innerHTML = totalCompteur + " ❤"
        }) 
    })            
} 

// Récupération JSON - API Fetch
const getMedia = async () => {
    return await fetch("data/photographers.json")
    .then((res) => res.json());
};

// Lancement des fonctions de la page :
const init = async () => {
    await photographerPageEdit();
    mediaLikes();
    lightBox.init();
}
init();


