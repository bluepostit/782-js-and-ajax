// 1. get the element
// 2. choose the event type
// 3. define a function ("callback") to
//    get called when the event is triggered


// Review: button + click event
const button = document.querySelector('#click-me');
button.addEventListener('click', (e) => {
  const clickedButton = e.currentTarget;
  console.log(clickedButton);
  clickedButton.innerText = 'Please hold...';
  clickedButton.disabled = true;
  clickedButton.classList.add('disabled-gray');
});


// fetch - OMDBApi

const movieSearch = (searchTerm) => {
  const url = `https://omdbapi.com/?s=${searchTerm}&apikey=adf1f2d7`;
  fetch(url)
    .then(response => response.json())
    .then((json) => {
      // print the JSON response
      console.log(json);

      // break into the JSON to find the pieces we need
      const results = json.Search;
      results.forEach((result) => {
        console.log(result.Title);
        console.log(result.Poster);
        // build a little HTML snippet using the info we found
        const html = `
          <li class="list-inline-item">
            <img src="${result.Poster}" alt="poster">
            <p>${result.Title}</p>
          </li>
        `;

        const list = document.querySelector('#movie-results');
        // insert the snippet into the existing DOM on the page
        list.insertAdjacentHTML('beforeend', html);
      });
    });
};

// Setup the form's event listener
const searchForm = document.querySelector('#search-form');
searchForm.addEventListener('submit', (event) => {
  // Stop the default behavior: reload the page/navigate!
  event.preventDefault();
  // get the input from the form
  const searchInput = document.querySelector('#search-input');
  const searchTerm = searchInput.value;
  // search for that input with the API

  // clear the current contents!
  const list = document.querySelector('#movie-results');
  list.innerHTML = '';

  movieSearch(searchTerm);
});


// Register form: POST example

const register = () => {
  // get email
  // get password
  const emailValue = document.querySelector('#email').value;
  const passwordValue = document.querySelector('#password').value;

  // build a BODY for my request
  const bodyJSON = JSON.stringify({
    email: emailValue,
    password: passwordValue
  });
  // send the request, log the response
  const url = 'https://reqres.in/api/register';

  fetch(url, {
    method: 'POST',
    // "server: expect the body of data I'm sending to be in JSON format"
    headers: { "Content-Type": "application/json" },
    body: bodyJSON
  }).then(response => response.json())
    .then((json) => {
      console.log(json);
    });
};

const registerForm = document.querySelector('#register-form');
registerForm.addEventListener('submit', (event) => {
  event.preventDefault();
  register();
});


// Examples: arrow functions
const arrowFunction = (param) => {
  const newValue = param + 5;
  return newValue;
};

// implicit `return`!
const shortArrowFunction = param => param + 5;
