/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/

// Element selectors
const studentsContainer = document.querySelector('.student-list');
const paginationContainer = document.querySelector('.link-list');
let searchInput;

const studentsPerPage = 9;

/***
* `showPage` function
* This function will create and insert/append the elements needed to display a "page" of nine students
* @param {Array} list - The array of student objects
* @param {Int} page - The requested page number
***/
function showPage(list, page) {
  // Start and end index of list items to be displayed on the page
  const start = (page * studentsPerPage) - studentsPerPage;
  const end = page * studentsPerPage;

  // Select student display area and empty it
  studentsContainer.innerHTML = "";

  // Create and insert student elements to be displayed
  for (let i = 0; i < list.length; i++) {
    if (i >= start && i < end) {
      const html = `
        <li class="student-item cf">
          <div class="student-details">
            <img class="avatar" src="${list[i].picture.large}" alt="Profile Picture of ${list[i].name.first} ${list[i].name.last}">
            <h3>${list[i].name.first} ${list[i].name.last}</h3>
            <span class="email">${list[i].email}</span>
          </div>
          <div class="joined-details">
            <span class="date">Joined ${list[i].registered.date}</span>
          </div>
        </li>
      `;

      studentsContainer.insertAdjacentHTML('beforeend', html);
    }
  }
}

/*** 
* `addPagination` function
* This function will create and insert/append the elements needed for the pagination buttons
* @param {Array} list - The array of student objects
***/
function addPagination(list) {
  const nbOfPages = Math.ceil(list.length / studentsPerPage);

  // Select pagination buttons area and empty it
  paginationContainer.innerHTML = "";

  // Create and display pagination buttons
  for (let i = 0; i < nbOfPages; i++) {
    const html = `
      <li>
        <button type="button">${i + 1}</button>
      </li>
    `;

    paginationContainer.insertAdjacentHTML('beforeend', html);
  }

  // Display active page button
  paginationContainer.querySelector('button').classList.add('active');

  // Display the selected page when clicked
  paginationContainer.addEventListener('click', (e) => {
    const activeButton = paginationContainer.querySelector('.active');
    const buttonClicked = e.target.closest('button');

    if (buttonClicked) {
      activeButton.classList.remove('active');
      buttonClicked.classList.add('active');
      showPage(list, buttonClicked.textContent);
    }
  });
}

/***
 * `addSearchBar` function
 * This function will create and insert the elements needed for the search bar
 ***/
function addSearchBar() {
  // Create search bar
  const html = `
    <label for="search" class="student-search">
      <span>Search by name</span>
      <input id="search" placeholder="Search by name...">
      <button type="button"><img src="img/icn-search.svg" alt="Search icon"></button>
    </label>
  `;

  // Insert search bar
  document.querySelector('.header').insertAdjacentHTML('beforeend', html);

  // Add search function when user types in the search bar
  searchInput = document.querySelector('#search');
  searchInput.addEventListener('keyup', search);

  // Add search function when user clicks the search button
  document.querySelector('.student-search button').addEventListener('click', search);  
}

/*** 
 * `search` function
 * The function filters the student data so that only students whose name include the search value are shown.
 * The search is case-insensitive and work for partial matches.
 ***/
function search() {
  const matchingData = [];
  const userInput = searchInput.value.toLowerCase();

  // Find matching data
  for (let i = 0; i < data.length; i++) {
    const studentFirstname = data[i].name.first.toLowerCase();
    const studentLastname = data[i].name.last.toLowerCase();

    if (studentFirstname.includes(userInput) || studentLastname.includes(userInput)) {
      matchingData.push(data[i])
    }
  }

  // Show results
  if (matchingData.length > 0) {
    showPage(matchingData, 1);
    addPagination(matchingData);
  } else {
    html = `<p>No results found...</p>`;
    studentsContainer.innerHTML = html;
    paginationContainer.innerHTML = "";
  }
}

// Call functions
showPage(data, 1);
addPagination(data);
addSearchBar();