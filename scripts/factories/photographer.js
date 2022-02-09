function photographerFactory(data) {
    // Ajout de récupération des données de la ville, la citation et le prix
    const { name, portrait, city, tagline, price, id } = data;

    // Modification du chemin vers l'image portrait du photographe :
    const picture = `FishEye_Photos/SamplePhotos/PhotographersIDPhotos/${portrait}`;

    // Fonction globale permattant la création du header pour chaque photographer :
    function getUserCardDOM() {
        const article = document.createElement( 'article' );
        const divFocusLink = document.createElement('div');
        divFocusLink.setAttribute("class", "focusLink");
        divFocusLink.setAttribute("aria-label", name);
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture);
        const h2 = document.createElement( 'h2' );
        h2.innerHTML = name;
        const lien = document.createElement('a')
        lien.setAttribute("href", "photographer.html?id="+id);
        // Création du paragraphe contenant ville - citation - tarif :
        // Création d'une /span par élément afin d'en modifier le CSS
        const paragraph = document.createElement( 'p' );
        paragraph.setAttribute("id", "legende");

        // Span avec saut de ligne contenant la ville :
        const ville = document.createElement( 'span' );
        ville.setAttribute("id", "city");
        ville.innerHTML = city + '</br>';

        // Span avec saut de ligne contenant la citation :
        const citation = document.createElement( 'span' );
        citation.setAttribute("id", "tagline");
        citation.innerHTML = tagline + '</br>';

        // Span avec saut de ligne contenant le tarif :
        const prix = document.createElement( 'span' );
        prix.setAttribute("id", "price");
        prix.textContent = price + "€/jour";

        lien.appendChild(img);
        lien.appendChild(h2);
        divFocusLink.appendChild(lien);
        article.appendChild(divFocusLink);


        //appel du nouveau paragraphe dans l'article :
        article.appendChild(paragraph);
        paragraph.appendChild(ville);
        paragraph.appendChild(citation);
        paragraph.appendChild(prix);

        return (article);
    }
    return { name, picture, city, getUserCardDOM }
}
