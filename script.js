const imageContainer = document.getElementById('image-container')
const loader = document.getElementById('loader')

let ready = false
let imagesLoaded = 0
let totalImages = 0

let photosArray = []

// unsplash api
const apiKey = config.access_key
// to improve performance, load 5 photos first and then make count=30 for more
let count = 5
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`

// helper function to set attributes
function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key])
  }
}

// check if all images have loaded
function imageLoaded() {
  imagesLoaded++
  if (imagesLoaded === totalImages) {
    ready = true
    loader.hidden = true
    count = 30
  }
}

function displayPhotos() {
  imagesLoaded = 0
  totalImages = photosArray.length
  // for each object in photosArray
  photosArray.forEach((photo) => {
    const item = document.createElement('a')
    setAttributes(item, {
      href: photo.links.html,
      target: '_blank',
    })
    const img = document.createElement('img')
    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    })
    // check when each has finished loading
    img.addEventListener('load', imageLoaded)
    item.appendChild(img)
    imageContainer.appendChild(item)
  })
}

// get photos from unsplash api
async function getPhotos() {
  try {
    const response = await fetch(apiUrl)
    photosArray = await response.json()
    displayPhotos()
  } catch (error) {
    // catch error here
  }
}

// check to see if scroll is at bottom of page, load more photos
window.addEventListener('scroll', () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    ready = false
    getPhotos()
  }
})

// on load
getPhotos()
