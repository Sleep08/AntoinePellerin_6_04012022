const mediaGallery = document.getElementById('media_gallery');

// Dropdown avec choix du filtre :
const popularity = document.getElementById("popularity");
const title = document.getElementById("title");

const filterByOption = (mediaId, tri) => {
        if (tri == "popularité") {
            return mediaId.sort((a, b) => {
				return b.likes - a.likes;
			});
        } else {
            return mediaId.sort((a, b) => a.title.localeCompare(b.title));
        }
};

// Fonction regroupant l'ensemble des modifications à apporter
// à la page selon le choix du photographe :
async function photographerPageEdit() {
    // Récupération des Data Photographers
    const { photographers, media } = await getMedia();
    // Récupération de l'Id du photographe selon celui cliqué depuis l'index
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

    const picture = 'FishEye_Photos/SamplePhotos/PhotographersIDPhotos/'+currentPhotographer.portrait;
    const img = document.createElement('img');
    img.setAttribute("src", picture);
    img.setAttribute("aria-label", currentPhotographer.name)
    photographHeader.appendChild(img);

    // Modification du nom de photographer dans la modale :
    document.getElementById('contactPhotograph').innerHTML = "Contactez-moi" + '</br>' + currentPhotographer.name + '</br>';
    
    // Footer selon prix du photographe :
    const footer = document.getElementById('footer');
    const divPrice = document.createElement('div');
    divPrice.innerHTML = currentPhotographer.price + "€/jour";
    footer.appendChild(divPrice);

    // Ecoute du dropdown selon click ou keydown :

    let arrowDropdown = document.querySelector(".arrowdown");
    let arrowDropdownUp = document.querySelector(".arrowup");
    arrowDropdown.addEventListener("click", function(){
        title.style.display = 'block';
        arrowDropdown.style.display='none';
        arrowDropdownUp.style.display='block';
        document.getElementById("dropdown").setAttribute("aria-expanded", "true");
    });

    arrowDropdown.addEventListener('keydown', function(e){
        if(e.keyCode === 13) {
            title.style.display = 'block';
            arrowDropdown.style.display='none';
            arrowDropdownUp.style.display='block';
            document.getElementById("dropdown").setAttribute("aria-expanded", "true");
        }
    });

    arrowDropdownUp.addEventListener("click", function(){
        title.style.display = 'none';
        arrowDropdown.style.display="block";
        arrowDropdownUp.style.display="none";
        document.getElementById("dropdown").setAttribute("aria-expanded", "false");
    });

    arrowDropdownUp.addEventListener('keydown', function(e){
        if(e.keyCode === 13) {
            arrowDropdown.style.display="block";
            arrowDropdownUp.style.display="none";
            document.getElementById("dropdown").setAttribute("aria-expanded", "false");
        }
    });

	popularity.addEventListener("click", function () {
		mediaGallery.innerHTML = "";
		const option = filterByOption(mediaId, "popularité");
        mediaByOption(option);
        lightBox.init();
        mediaLikes();
	});

    popularity.addEventListener('keydown', function (e) {
        if(e.keyCode === 13) {
        mediaGallery.innerHTML = "";
		const option = filterByOption(mediaId, "popularité");
        mediaByOption(option);
        lightBox.init();
        mediaLikes();
        }
	});

    title.addEventListener("click", function () {
		mediaGallery.innerHTML = "";
		const option = filterByOption(mediaId, "titre");
        mediaByOption(option);
        lightBox.init();
        mediaLikes();
	});

    title.addEventListener('keydown', function (e) {
        if(e.keyCode === 13) {
        mediaGallery.innerHTML = "";
		const option = filterByOption(mediaId, "titre");
        mediaByOption(option);
        lightBox.init();
        mediaLikes();
        }
	});

    // Média selon l'Id photographer : 
    const mediaId = media.filter((media) => media.photographerId == photographerId);
    mediaByOption(mediaId);

    //Affichage de la galerie par défaut = Popularité :
    mediaGallery.innerHTML = "";
    const option = filterByOption(mediaId, "popularité");
    mediaByOption(option);

    // Affichage du nombre de likes total :
    let totalLikes = (mediaId.reduce((n, {likes}) => n + likes, 0));
    const divLikesTotal = document.createElement('div');
    divLikesTotal.setAttribute("id", "totalLikes");
    divLikesTotal.innerHTML = totalLikes+ " ❤";
    footer.appendChild(divLikesTotal);
};

// Affichage des médias par défaut sans prise en compte du filtre :
function mediaByOption(mediaId) {
    mediaId.forEach((med) => {
        const mediaModel = new mediaFactory(med);
        mediaGallery.innerHTML += mediaModel.createHtml();
});
}

// Fonction pour incrémenter le nb de likes :
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
        });
        like.addEventListener('keydown', function(e){
            if(e.keyCode === 13) {
                let totalCompteur = parseInt(likesTotal.innerHTML);
                Compteur++;
                totalCompteur++;
                like.innerHTML = Compteur + " ❤";
                likesTotal.innerHTML = totalCompteur + " ❤"
            }
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


