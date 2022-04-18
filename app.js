// ----------------DARKMODE-----------------
let darkMode = localStorage.getItem("darkMode")
const darkModeToggle = document.querySelector(".dark__mood")


const enableDarkMode = () => {
    document.body.classList.add("darkmode")
    localStorage.setItem("darkMode", "enabled")
}

const disableDarkMode = () => {
    document.body.classList.remove("darkmode")
    localStorage.setItem("darkMode", null)
}

darkModeToggle.addEventListener('click', () => {
    darkMode = localStorage.getItem("darkMode")
    if (darkMode !== "enabled") {
        enableDarkMode();

    }else {
        disableDarkMode();
    }
})



//declare variables
const input = document.querySelector('#inputNameBook')
const btn = document.querySelector('#btnNameBook')

btn.addEventListener('click', () => searchBooks(input.value))

$( "#headerSearch" ).submit(function( event ) {
    searchBooks(input.value)
});


//render function
function searchBooks(bookname) {
    $(".aClassName").remove()
    fetch(`https://www.googleapis.com/books/v1/volumes?q=${bookname}`)
        .then(response => response.json())
        .then(javob => {
            javob.items.forEach(book => {
                let card = `
        <div class="card" style="width: 18rem;">
                        <img src="${book.volumeInfo.imageLinks.smallThumbnail}" class="card-img-top w-100" alt="...">
                        <div class="card-body">
                            <h5 class="card-title">${book.volumeInfo.title}</h5>
                            <p class="card-text m-0">${book.volumeInfo.authors}</p>
                            <p class="card-text">${book.volumeInfo.publishedDate}</p>
                            <div class="card-btn d-flex justify-content-between align-items-center flex-column">
                                <div class="d-flex justify-content-between w-100">
                                    <button type="button" id="bookmark${book.id}" onclick="bookmark('${book.volumeInfo.title}', '${book.volumeInfo.authors}', '${book.volumeInfo.previewLink}')" class="bookmark btn btn-warning col-5">Bookmark</button>
                                    <button data-bs-toggle="modal" data-bs-target="#exampleModal${book.id}" class="btn btn-primary col-5">More Info</button>
                                </div>
                                <a href="${book.volumeInfo.previewLink}" target="blank" class="btn btn-secondary col-12 mt-2">Read</a>
                            </div>

                            <div class="modal fade" id="exampleModal${book.id}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div class="modal-dialog">
                                  <div class="modal-content">
                                    <div class="modal-header">
                                      <h5 class="modal-title" id="exampleModalLabel">${book.volumeInfo.title}</h5>
                                      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div class="modal-body">
                                    <img src="${book.volumeInfo.imageLinks.smallThumbnail}" class="card-img-top w-100" alt="...">
                                    <p class="card-text">${book.volumeInfo.description}</p>

                                    <p class="card-text">AUTHOR: ${book.volumeInfo.authors}</p>
                                    <p class="card-text">PUBLISHED: ${book.volumeInfo.publishedDate}</p>
                                    <p class="card-text">PUBLISHERS: ${book.volumeInfo.publisher}</p>
                                    <p class="card-text">CATEGORIES: ${book.volumeInfo.categories}</p>
                                    <p class="card-text">PAGES COUNT: ${book.volumeInfo.pageCount}</p>

                                    
                                    </div>
                                    <div class="modal-footer">
                                      <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                      <button type="button" class="btn btn-primary">Save changes</button>
                                    </div>
                                  </div>
                                </div>
                            </div>
                        </div>
                    </div>



        `
                let div = document.createElement('div')
                div.innerHTML = card
                document.querySelector('.body-card').append(div)
                div.className = "aClassName";
            })
        })
}

function bookmark(title, author, link) {
    let mark = `
                        <div class="btn btn-secondary btn-lg d-flex align-items-center justify-content-between">
                            <div class="btn-left d-flex flex-column align-items-start">
                                <span>${title}</span>
                                <span>${author}</span>
                            </div>

                            <div class="btn-right">
                                <a href="${link}">
                                    <img src="./book-open 1.png" alt="">
                                </a>

                                <button class="btndeleteMark btn" onclick="dasda()" type="button">
                                    <img src="./delete 1.png" alt="">
                                </button>
                            </div>
                        </div>
    `

    let div = document.createElement('div')
    div.innerHTML = mark
    document.querySelector('.bookmark-body').append(div)
    div.className = "bClassName";
}
