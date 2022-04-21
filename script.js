const btn = document.querySelector(".main_left-button")
const title = document.querySelector(".main__left-title")
const description = document.querySelector(".main__left-description")
const image = document.querySelector(".main__right-image")

// L64yxH5mamvnJtrV2w41UgQoWHq1KegB5SU355IZ
const URL = `https://api.nasa.gov/planetary/apod?api_key=L64yxH5mamvnJtrV2w41UgQoWHq1KegB5SU355IZ&count=10`

let filteredPhotos = []
let currIndex = 0

function filterOutVideo(photo) {
    return photo.media_type === "image" 
}

function setDOMContent() {
    title.textContent = trimTitle()
    description.textContent = trimDesc()
    image.src = filteredPhotos[currIndex].url
}

function trimTitle() {
    let words = filteredPhotos[currIndex].title.split(" ")
    if (words.length > 5) {
        words.length = 5
        return `${words.join(" ")}...`
    }
    return words.join(" ")
}

function trimDesc() {
    let text = filteredPhotos[currIndex].explanation
    if (text.length > 400) {
        return `${text.substring(0, 400)}...`
    }
    return text
}

window.addEventListener("load",() => {
    fetch(URL)
    .then(res => res.json())
    .then(photos => {
        filteredPhotos = photos.filter(filterOutVideo)
        setDOMContent()
    })
    .catch(e => {
        console.log(e)
    })
})

btn.addEventListener("click", () => {
    currIndex++
    if (currIndex === filteredPhotos.length) currIndex = 0
    setDOMContent()
})