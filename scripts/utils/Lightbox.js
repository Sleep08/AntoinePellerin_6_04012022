class LightboxMedia{
    static initi() {
    const gallerySection = document.getElementById(#media_gallery);
    const mediaSelection = Array.from(gallerySection.querySelectorAll('img[src$=".jpg"],source[src$=".mp4"]'));
    console.log(mediaSelection)
    }
}
LightboxMedia;