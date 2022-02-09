class lightBox {

    static init () {
            const gallerieMedias = document.getElementById("media_gallery") 
            const links = Array.from(gallerieMedias.querySelectorAll('img[src$=".jpg"],iframe[src$=".mp4"]'));
            console.log(links)
            const gallery = links.map((link) => link.getAttribute("src"));
            links.forEach((link) => {
            link.addEventListener("click", (e) => {
                e.preventDefault()
                new lightBox(e.currentTarget.getAttribute("src"), gallery);
        })
        link.addEventListener('keyup', (e) => {
            if (e.keyCode === 13) {
                e.preventDefault()
                new lightBox(e.currentTarget.getAttribute("src"), gallery);
            } else {
                return;
            }
        })     
    })
} 

constructor (url, gallery, alt) {
    this.element = this.buildDOM(url, alt);
    this.gallery = gallery;
    this.actualMedia(url, alt, gallery);
    this.formatMedia(url);
    document.body.appendChild(this.element);
    // Accessibilité clavier :
    this.keyUp = this.keyUp.bind(this);
    document.addEventListener("keyup", this.keyUp);
}

formatMedia(src) {
    let mediaLink = src.split("/");
    mediaLink.splice(4, 0);
    const fLightboxMediaLink = mediaLink.join("/");
    return fLightboxMediaLink;
}

actualMedia(url, alt) {
    this.url = url;
    this.alt = alt;
    if (url.endsWith(".mp4")) {
        const video = document.createElement("iframe");
        const container = this.element.querySelector(".lightbox__container");
        const legend = document.createElement("p");
        legend.innerHTML += this.getFormatedTitle(url);
        container.innerHTML = "";
        container.appendChild(video);
        container.appendChild(legend);
        video.setAttribute("controls", "");
        video.setAttribute("class", "videoLightbox");
        video.src = url;
        console.log(video.src);
    } else if (url.endsWith(".jpg")) {
        const image = new Image();
        const container = this.element.querySelector(".lightbox__container");
        const legend = document.createElement("p");
        legend.innerHTML += this.getFormatedTitle(url);
        container.innerHTML = "";
        container.appendChild(image);
        container.appendChild(legend);
        image.alt = this.getFormatedTitle(url);
        image.src = this.formatMedia(url);
        image.classList.add("lightbox__container__img");
    }
}

getFormatedTitle(path) {
    const splitedPath = path.split("/");
    const string = splitedPath[splitedPath.length - 1].split(".")[0];
    const formatedTitle = string.replaceAll("_", " ");
    return formatedTitle;
}

suivant() {
    let i = this.gallery.findIndex((image) => image === this.url);
    if ( i === this.gallery.length - 1) {
        i = -1;
    }
    this.actualMedia(this.gallery[i + 1]);
}

precedent() {
    let i = this.gallery.findIndex((image) => image === this.url);
    if ( i === 0) {
        i = this.gallery.length;
    }
    this.actualMedia(this.gallery[i + -1]);
}

keyUp(e) {
    if (e.key === "Escape") {
        let lightBoxs = document.querySelectorAll(".lightBox");
        lightBoxs.forEach((lightbox) => {
            lightbox.style.display = "none";
        })        
    } else if (e.key === "ArrowLeft") {
        this.precedent(e)
    } else if (e.key === "ArrowRight") {
        this.suivant(e);
    }
}

buildDOM() {
    const dom = document.createElement('div');
    dom.classList.add('lightBox');
    dom.setAttribute("class", "lightBox");
    dom.innerHTML = `        
    <button class="lightBox_close"><i class="fa-solid fa-xmark"></i></button>
    <button class="lightBox_precedent"><i class="fa-solid fa-chevron-left"></i></button>
    <button class="lightBox_suivant"><i class="fa-solid fa-chevron-right"></i></button>
    <div class="lightbox__container" role="dialog" aria-label="">
    <p class="lightbox__container__img-title"></p>
    </div> `;

    let btnClose = dom.querySelector(".lightBox_close");
    btnClose.addEventListener("click", function(){
        dom.style.display = "none";
    })

    let btnSuivant = dom.querySelector(".lightBox_suivant");
    btnSuivant.addEventListener("click", this.suivant.bind(this));

    let btnPrecedent = dom.querySelector(".lightBox_precedent");
    btnPrecedent.addEventListener("click", this.precedent.bind(this));
    return dom
}
}