function photographerFactory(data) {
    // Ajout de récupération des données de la ville, la citation et le prix
    const { name, portrait, city, tagline, price, id } = data;

    // Modification du chemin vers l'image portrait du photographe :
    const picture = `FishEye_Photos/SamplePhotos/PhotographersIDPhotos/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement( 'article' );
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture)
        const h2 = document.createElement( 'h2' );
        h2.innerHTML = "<a href='photographer.html?id="+id+"'>"+name+"</a>";
        
        // Création du paragraphe contenant ville - citation - tarif :
        // Création d'une /span par élément afin d'en modifier le CSS
        const paragraph = document.createElement( 'p' );

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

        article.appendChild(img);
        article.appendChild(h2);

        //appel du nouveau paragraphe dans l'article :
        article.appendChild(paragraph);
        paragraph.appendChild(ville);
        paragraph.appendChild(citation);
        paragraph.appendChild(prix);
        return (article);
    }
    return { name, picture, city, getUserCardDOM }
}
