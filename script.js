const addBtn = document.querySelector(".addBtn")
const modalOveraly = document.querySelector(".modal-blocker")
const modal = document.querySelector(".modal-form")
const form = document.querySelector('form')
const main = document.querySelector('main')
const submitBtn = document.querySelector('.modal-form form button')
const editModal = document.querySelector('.modal-edit')
const editBtn = document.querySelector('.edit-book')
const removeBtn = document.querySelector(".remove-book")

let myLibrary = []

function book(title,author,pages,readStatus) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.readStatus = readStatus;
}


addBtn.addEventListener('click',revealModal);
modalOveraly.addEventListener('click',hideModal);
document.addEventListener('keydown', e =>{
    if (e.key === 'Escape' && modalOveraly.style.visibility == 'visible')hideModal()
    if (e.key === '+' && modalOveraly.style.visibility == "hidden")revealModal()
});
submitBtn.addEventListener('click',(e)=>{
    e.preventDefault()//stopping form from submitting
    hideModal()
    const title = document.getElementById("title").value
    const author = document.getElementById("author").value
    const pages = document.getElementById("pages").value
    const readStatus = document.getElementById("has-read").checked
    
    addBookTolibrary(title,author,pages,readStatus)

    const bookElement = createHTMLbook(myLibrary[myLibrary.length - 1])
    const editButton = bookElement.lastElementChild.lastChild

    bookElement.setAttribute('book-index', `${myLibrary.length -1}`)
    editButton.addEventListener('click',()=>{
        editBtn.removeEventListener('click',window.editBook)
        removeBtn.removeEventListener("click",window.removeBook)

        removeButtonFunctionality(bookElement.getAttribute("book-index"))
        editButtonFunctionality(bookElement,myLibrary[parseInt(bookElement.getAttribute(`book-index`))])
    })
    
    main.appendChild(bookElement)

})

function createHTMLbook (bookObj) {
    const book = document.createElement('div')
    book.classList.add("book")

    book.appendChild(createBookElement(`${bookObj.title}`,'title'))
    book.appendChild(createBookElement(`${bookObj.pages} pages`,"pages"))
    book.appendChild(createBookElement(`by ${bookObj.author}`,"author"))

    const readStatusText = bookObj.readStatus ? "is read": "isn't read"
    const readStatus = (createBookElement(`${readStatusText}`,"read-status"))    
    if(bookObj.readStatus) readStatus.classList.add("read")
    else readStatus.classList.add("unread")
    
    const editButton = document.createElement("div")
    editButton.innerHTML = `<i class="fa-regular fa-pen-to-square"></i>`

    book.appendChild(readStatus)
    book.append(editButton)

    return book
}

function revealModal () {
    modalOveraly.style.visibility = "visible"
    modal.classList.add('open')
}

function hideModal() {
    modalOveraly.style.visibility = "hidden"
    modal.classList.remove('open')
    editModal.classList.remove('open')
    setTimeout(()=>{//so youi cant see it reset 
        resetForm()
    },1000)
}

function revealEditModal(bookObj) {
    modalOveraly.style.visibility = "visible"
    editModal.classList.add('open')

    document.getElementById("title-edit").value = bookObj.title
    document.getElementById("author-edit").value = bookObj.author
    document.getElementById("pages-edit").value = bookObj.pages
    document.getElementById("has-read-edit").checked = bookObj.readStatus
}

function resetForm() {
    form.reset()
}

function addBookTolibrary (title,author,pages,readStatus) {
    const newBook = new book(title,author,pages,readStatus)
    myLibrary.push(newBook)
}

function createBookElement (text,className) {
    let newElement = document.createElement('div')
    newElement.textContent = text
    newElement.classList.add(className)
    return newElement
}

function editButtonFunctionality (bookElement,bookObj) {
    revealEditModal(bookObj)

    window.editBook = function() {
        let bookIndex = bookElement.getAttribute('book-index')
        myLibrary[parseInt(bookIndex)].title =
            document.getElementById("title-edit").value
        myLibrary[parseInt(bookIndex)].author =
            document.getElementById("author-edit").value
        myLibrary[parseInt(bookIndex)].pages =
            document.getElementById("pages-edit").value
        myLibrary[parseInt(bookIndex)].readStatus =
            document.getElementById("has-read-edit").checked

        const bookElementchilden = document.querySelector(`[book-index="${bookIndex}"]`).childNodes

        bookElementchilden[0].textContent = myLibrary[parseInt(bookIndex)].title
        bookElementchilden[1].textContent = `${myLibrary[parseInt(bookIndex)].pages} pages`
        bookElementchilden[2].textContent = `by ${myLibrary[parseInt(bookIndex)].author}`

        if (myLibrary[parseInt(bookIndex)].readStatus) {
            bookElementchilden[3].textContent = "is read"
            bookElementchilden[3].classList.remove('unread')
            bookElementchilden[3].classList.add('read')
        } else {
            bookElementchilden[3].textContent = "isn't read"
            bookElementchilden[3].classList.remove('read')
            bookElementchilden[3].classList.add('unread')
        }
        hideModal()
    } 
    editBtn.addEventListener('click',window.editBook)
}

function removeButtonFunctionality (bookIndex) {
    const bookElement = document.querySelector(`[book-index="${bookIndex}"]`)
    window.removeBook = function () {
        main.removeChild(bookElement)
        myLibrary.splice(parseInt(bookElement),1)

        if (main.childElementCount > 0){
            main.childNodes.forEach(book =>{
            if (parseInt(book.getAttribute('book-index') 
                < parseInt(bookIndex))) return;
            console.log(book)
            book.setAttribute("book-index", 
            `${parseInt(book.getAttribute("book-index")) -1}`)
        });
    };

        hideModal()
    }

    removeBtn.addEventListener("click",window.removeBook)
}
