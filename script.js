const addBtn = document.querySelector(".addBtn")
const modalOveraly = document.querySelector(".modal-blocker")
const modal = document.querySelector(".modal-form")
const form = document.querySelector('form')
const main = document.querySelector('main')
const submitBtn = document.querySelector('form button')

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
        console.log(bookElement)
    })
    
    main.appendChild(bookElement)

})

function createHTMLbook (bookObj) {
    const book = document.createElement('div')
    book.classList.add("class","book")

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
    setTimeout(()=>{//so youi cant see it reset 
        resetForm()
    },1000)
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

