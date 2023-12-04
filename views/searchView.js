import { html, render } from "../node_modules/lit-html/lit-html.js"
import { get } from "../services/api.js";
import { getUserData } from "../services/userHelper.js";

const root = document.querySelector("main");
const userData = getUserData();
const isLogged = userData !== null;

function searchTemplate() {
  return html`
 <section id="search">
          <h2>Search by Brand</h2>
          <form class="search-wrapper cf" @submit=${onSubmit}>
            <input
              id="#search-input"
              type="text"
              name="search"
              placeholder="Search here..."
              required
            />
            <button type="submit">Search</button>
          </form>
          <h3>Results:</h3>
          <div id="search-container">
 </div>
</section>
`}

function searchResultTemplate(data) {
  return html`
        ${data.length === 0 ? html`<h2>There are no results found.</h2>` :
      html`
        <ul class="card-wrapper">
          ${data.map(item => resultCardTemplate(item))}`}
        </ul>

    `
};

function resultCardTemplate(item) {
  return html`
              <li class="card">
                <img src=${item.imageUrl} alt="travis" />
                <p>
                  <strong>Brand: </strong><span class="brand">${item.brand}</span>
                </p>
                <p>
                  <strong>Model: </strong
                  ><span class="model">${item.model}</span>
                </p>
                <p><strong>Value:</strong><span class="value">${item.value}</span>$</p>
                ${isLogged ? html`
                <a class="details-btn" href="/details/${item._id}">Details</a>
                ` : ""}
              </li>
    `
};

async function onSubmit(e) {
  e.preventDefault();
  const resultDivEl = document.querySelector("#search-container")
  const formData = new FormData(e.target);
  const { search } = Object.fromEntries(formData);
  if (!search) {
    return alert("please enter some search text")
  }
  const data = await get(`data/shoes?where=brand%20LIKE%20%22${search}%22`);
  render(searchResultTemplate(data), resultDivEl);
};

export function searchView() {
  render(searchTemplate(), root)
};
