function mediaFactory(data) {
    // Ajout de récupération des données de la ville, la citation et le prix
    const { title, image, video, photographerId, likes, price, id } = data;

    // Modification du chemin vers l'image portrait du photographe :
    const mediaImage = `FishEye_Photos/SamplePhotos/Photographies/${image}`;
    const mediaVideo = `FishEye_Photos/SamplePhotos/Photographies/${video}`;

    function getMediaCardDOM() {
        const gallery = document.createElement('article');
        const img = document.createElement('img');
        img.setAttribute("src", mediaImage);
        const vd = document.createElement('iframe');
        vd.setAttribute("width", 320);
        vd.setAttribute("height", 320);
        vd.setAttribute("src", mediaVideo);
        const photoLegend = document.createElement('div');
        photoLegend.setAttribute("id", "photoLegend");
        const titre = document.createElement('p');
        titre.textContent = title;

        let likesCompteur = parseInt(likes);
        const nbLike = document.createElement('p');
        nbLike.setAttribute("id", "nbLike");
        nbLike.innerHTML = likesCompteur + " ❤";

        if (mediaImage.endsWith(".jpg")) {
        gallery.appendChild(img)}
        else { 
        gallery.appendChild(vd)};
        gallery.appendChild(photoLegend);
        photoLegend.appendChild(titre);
        photoLegend.appendChild(nbLike);

        nbLike.addEventListener('click', function(){
            likesCompteur++;
            nbLike.innerHTML = likesCompteur + " ❤";
        })
        return(gallery);
    }
    return { title, image, photographerId, likes, price, id, getMediaCardDOM }
}
