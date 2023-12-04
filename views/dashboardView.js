import { html, render } from "../node_modules/lit-html/lit-html.js";
import { get } from "../services/api.js";

const root = document.querySelector("main");

function dashboardTemplate(data) {
  return html`  
    <section id="dashboard">
    <h2>Collectibles</h2>
    <ul class="card-wrapper">
    ${data.length !== 0 ? html`
        ${data.map(item => cardTemplate(item))}
        </ul>
        `
      :
      html`<h2>There are no items added yet.</h2>`}
    </section>
 `
};

function cardTemplate(item) {
  return html`
         <li class="card">
              <img src=${item.imageUrl} alt="eminem" />
              <p>
                <strong>Brand: </strong><span class="brand">${item.brand}</span>
              </p>
              <p>
                <strong>Model: </strong
                ><span class="model">${item.model}</span>
              </p>
              <p><strong>Value:</strong><span class="value">${item.value}</span>$</p>
              <a class="details-btn" href="/details/${item._id}">Details</a>
            </li>
    `
};

export async function dashboardView() {
  const data = await get("data/shoes?sortBy=_createdOn%20desc");
  render(dashboardTemplate(data), root);
};