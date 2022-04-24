const btn = document.querySelector(".main__left-button")
const title = document.querySelector(".main__left-title")
const description = document.querySelector(".main__left-description")
const image = document.querySelector(".main__right-image")

const URL = `https://api.nasa.gov/planetary/apod?api_key=L64yxH5mamvnJtrV2w41UgQoWHq1KegB5SU355IZ&count=10`

let nasaPhotos = []
let currIndex = 0

window.addEventListener("load",() => {
    fetch(URL)
    .then(res => res.json())
    .then(photos => {
        nasaPhotos = photos.filter(filterOutVideo)
        removeLoadingSkeleton()
        setDOMContent()
    })
    .catch(e => {
        console.log(e)
    })
})

btn.addEventListener("click", () => {
    currIndex++
    if (currIndex === nasaPhotos.length) currIndex = 0
    title.innerHTML = ""
    description.innerHTML = ""
    image.src = ""

    addLoadingSkeleton()
    setTimeout(() => {
        removeLoadingSkeleton()
        setDOMContent()
    }, 1000)
})

function addLoadingSkeleton() {
    for (let i = 0; i < 4; i++) {
        let div = document.createElement("div")
        div.classList.add("p-skeleton")
        document.querySelector(".main__left").prepend(div)
    }
    for (let i = 0; i < 2; i++) {
        let div = document.createElement("div")
        div.classList.add("h1-skeleton")
        document.querySelector(".main__left").prepend(div)
    }
}

function removeLoadingSkeleton() {
    const h1Skeletons = document.getElementsByClassName("h1-skeleton")
    const pSkeletons = document.getElementsByClassName("p-skeleton")

    while (h1Skeletons.length !== 0) {
        h1Skeletons[0].parentNode.removeChild(h1Skeletons[0])
    }

    while (pSkeletons.length !== 0) {
        pSkeletons[0].parentNode.removeChild(pSkeletons[0])
    }
}

function filterOutVideo(photo) {
    return photo.media_type === "image" 
}

function setDOMContent() {
    title.textContent = trimTitle()
    description.textContent = trimDesc()
    image.src = nasaPhotos[currIndex].url
}

function trimTitle() {
    let words = nasaPhotos[currIndex].title.split(" ")
    if (words.length > 5) {
        words.length = 5
        return `${words.join(" ")}...`
    }
    return words.join(" ")
}

function trimDesc() {
    let text = nasaPhotos[currIndex].explanation
    if (text.length > 400) {
        return `${text.substring(0, 400)}...`
    }
    return text
}