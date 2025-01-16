/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/

/***
* `showPage` function
* This function will create and insert/append the elements needed to display a "page" of nine students
* @param {Array} list - The array of student objects
* @param {Int} page - The requested page number
***/
function showPage(list, page) {
  const studentsPerPage = 9;
  
  // Start and end index of list items to be displayed on the page
  const start = (page * studentsPerPage) - studentsPerPage;
  const end = page * studentsPerPage;

  // Select display area and empty it
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

showPage(data, 1);

/*
Create the `addPagination` function
This function will create and insert/append the elements needed for the pagination buttons
*/



// Call functions
