// Factory pour les médias de la page photographer :

class mediaFactory {
    constructor(data) {
        if (data.image) {
            return new imgConstructor(data);
        } else {
            return new videoConstructor(data);
        }
    }
}

// Constructor pour chaque média Image :

class imgConstructor {
    constructor(data) {
        this._imgSrc = data.image;
        this._imgTitle = data.title;
        this._imgPhotographerId = data.photographerId;
        this._imgLikes = data.likes; 
    }
    createHtml() {
        return `
        <figure>
            <img src="FishEye_Photos/SamplePhotos/Photographies/${this._imgSrc}" tabindex="5" alt="${this._imgTitle}"/>
            <figcaption id="photoLegend">
                <p id="titre">${this._imgTitle}</p>
                <p class="nbLikes" title="j'aime" tabindex="5" aria-label="Ajouter un like">${this._imgLikes} ❤</p>
            </figcaption>
        </figure> `;
    }
}

// Constructor pour chaque média vidéo :

class videoConstructor {
    constructor(data) {
        this._videoSrc = data.video;
        this._videoTitle = data.title;
        this._videoPhotographerId = data.photographerId;
        this._videoLikes = data.likes; 
    }
    createHtml() {
        return `
        <figure>
            <iframe src="FishEye_Photos/SamplePhotos/Photographies/${this._videoSrc}" tabindex="5"/>
            </iframe>
            <figcaption id="photoLegend">
                <p id="titre">${this._videoTitle}</p>
                <p class="nbLikes" tabindex="5" title="like" aria-label="Ajouter un like">${this._videoLikes} ❤</p>
            </figcaption>
        </figure> `;
    }
}

