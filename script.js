console.log('testing...');
const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

// Unsplash API
const count = 10;
const apiKey = 'CmcU9Lma0JFMvVQMBJ23Xb3AWG9SkKfIgdl4O6mgyzo';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`


// Check if all images are loaded
function imageLoaded(){
  console.log('image loaded.');
  imagesLoaded++;
  if (imagesLoaded === totalImages){
    ready = true;
    loader.hidden = true;
    console.log("ready= ", ready);
  }
}
let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

// Helper function to set attributes of DOM elements
function setAttributes(element, attributes){
  for (const key in attributes){
    element.setAttribute(key, attributes[key]);
  }
}


// Create elements for links & photos, then add to DOM
function displayPhotos(){
  imagesLoaded = 0;
  totalImages = photosArray.length;
  console.log("Total Images= ", totalImages);
  // Run function for each object in photosArray
  photosArray.forEach((photo) => {

    // Create <a> element to link to Unsplash
    const item = document.createElement('a');

    setAttributes(item, {
      href: photo.links.html,
      target: '_blank',
    });
    //Create image element
    const img = document.createElement('img');

    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });
    // Event Listener let us know when image is loaded
    img.addEventListener('load', imageLoaded);

    // Put img inside of anchor and then put both
    // inside of a imageContainer element
    item.appendChild(img);
    imageContainer.appendChild(item);

  });
}
// Get photos from Unsplash

async function getPhotos() {
  try{
    const response = await fetch(apiUrl);
    photosArray = await response.json();
    // console.log(data);
    displayPhotos();
  }catch(error){
    // Catch error here
  }
}

// Check to see if scrolling near bottom of page, Load More Photos
window.addEventListener('scroll', () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
    ready = false;
    getPhotos();
  }
});
// On Load
 getPhotos();
