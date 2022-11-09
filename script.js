const addBtn = document.querySelector(".addBtn")
const modalOveraly = document.querySelector(".modal-blocker")
const modal = document.querySelector(".modal-form")
const form = document.querySelector('form')

let myLibrary = []

function book(title,author,pages,readStatus) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.readStatus = readStatus;
}

addBtn.addEventListener('click',revealModal)
modalOveraly.addEventListener('click',hideModal)

function revealModal () {
    modalOveraly.style.visibility = "visible"
    modal.classList.add('open')
}

function hideModal() {
    modalOveraly.style.visibility = "hidden"
    modal.classList.remove('open')
    resetForm()
}

function resetForm() {
    form.reset()
}

