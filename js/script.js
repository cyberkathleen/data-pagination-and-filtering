/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/

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
  const ul = document.querySelector('.student-list');
  ul.innerHTML = "";

  // Create and insert student elements to be displayed
  for (let i = 0; i < list.length; i++) {
    if (i >= start && i < end) {
      const html = `
        <li class="student-item cf">
          <div class="student-details">
            <img class="avatar" src="${list[i].picture.thumbnail}" alt="Profile Picture of ${list[i].name.first} ${list[i].name.last}">
            <h3>${list[i].name.first} ${list[i].name.last}</h3>
            <span class="email">${list[i].email}</span>
          </div>
          <div class="joined-details">
            <span class="date">Joined ${list[i].registered.date}</span>
          </div>
        </li>
      `;

      ul.insertAdjacentHTML('beforeend', html);
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
  const ul = document.querySelector('.link-list');
  ul.innerHTML = "";

  // Create and display pagination buttons
  for (let i = 0; i < nbOfPages; i++) {
    const html = `
      <li>
        <button type="button">${i + 1}</button>
      </li>
    `;

    ul.insertAdjacentHTML('beforeend', html);
  }

  // Display active page button
  ul.querySelector('button').classList.add('active');

  // Display the selected page when clicked
  ul.addEventListener('click', (e) => {
    const activeButton = ul.querySelector('.active');
    const buttonClicked = e.target.closest('button');

    if (buttonClicked) {
      activeButton.classList.remove('active');
      buttonClicked.classList.add('active');
      showPage(data, buttonClicked.textContent);
    }
  });
}

// Call functions
showPage(data, 1);
addPagination(data);