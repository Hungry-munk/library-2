const addBtn = document.querySelector(".addBtn")
const modalOveraly = document.querySelector(".modal-blocker")
const modal = document.querySelector(".modal-form")
const form = document.querySelector('form')
const main = document.querySelector('main')

let myLibrary = []

function book(title,author,pages,readStatus) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.readStatus = readStatus;
}

function createHTMLbook (bookObj) {
    const book = document.createElement('div')
    const pages = document.createElement('div')
    const author = document.createElement('div')
    const title = document.createElement('div')
    const readStatus = document.createElement('div')
    const editButton = document.createElement("div")

    book.classList.add("book")
    pages.classList.add("pages")
    author.classList.add("author")
    title.classList.add('title')
    readStatus.classList.add("read-status")

    title.textContent = `${bookObj.title}`
    pages.textContent = `${bookObj.pages} pages`
    author.textContent = `by ${bookObj.author}`
    readStatus.textContent = bookObj.readStatus ? "is read": "isn't read"
    editButton.innerHTML = `<i class="fa-regular fa-pen-to-square"></i>`

    book.appendChild(title)
    book.appendChild(pages)
    book.appendChild(author)
    book.appendChild(readStatus)
    book.append(editButton)
    return book
}

addBtn.addEventListener('click',revealModal)
modalOveraly.addEventListener('click',hideModal)
document.addEventListener('keydown', e =>{
    if (e.key === 'Escape' && modalOveraly.style.visibility == 'visible')hideModal()
    if (e.key === '+' && modalOveraly.style.visibility == "hidden")revealModal()
});


function revealModal () {
    modalOveraly.style.visibility = "visible"
    modal.classList.add('open')
}

function hideModal() {
    modalOveraly.style.visibility = "hidden"
    modal.classList.remove('open')
    setTimeout(()=>{//so youi cant see it reset 
        resetForm()
    },1000)
}

function resetForm() {
    form.reset()
}

function displayBooks() {
    main.innerHTML=""
    for (let book of myLibrary) {
        main.appendChild(book)
    }
}

function addBookTolibrary (title,author,pages,readStatus) {
    const newBook = new book(title,author,pages,readStatus)
    myLibrary.push(newBook)
}
