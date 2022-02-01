class mediaFactory {
    constructor(data) {
        if (data.image) {
            return new imgConstructor(data);
        } else {
            return new videoConstructor(data);
        }
    }
}

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
            <img src="FishEye_Photos/SamplePhotos/Photographies/${this._imgSrc}"/>
            <figcaption id="photoLegend">
                <p id="titre">${this._imgTitle}</p>
                <p class="nbLikes">${this._imgLikes} ❤</p>
            </figcaption>
        </figure> `;
    }
}

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
            <iframe src="FishEye_Photos/SamplePhotos/Photographies/${this._videoSrc}"/>
            </iframe>
            <figcaption id="photoLegend">
                <p id="titre">${this._videoTitle}</p>
                <p class="nbLikes">${this._videoLikes} ❤</p>
            </figcaption>
        </figure> `;
    }
}

