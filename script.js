const imageContainer = document.getElementById('image-container')
const loader = document.getElementById('loader')

let photosArray = []

// unsplash api
const count = 10
const apiKey = config.access_key
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`

// helper function to set attributes
function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key])
  }
}

function displayPhotos() {
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

// on load
getPhotos()
