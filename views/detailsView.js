import { html, render } from "../node_modules/lit-html/lit-html.js";
import page from "../node_modules/page/page.mjs";
import { getUserData } from "../services/userHelper.js";
import { del, get } from "../services/api.js";

const root = document.querySelector("main");

function detailsTemplate(data, isOwner) {
  return html`
     <section id="details">
          <div id="details-wrapper">
            <p id="details-title">Shoe Details</p>
            <div id="img-wrapper">
              <img src=${data.imageUrl} alt="example1" />
            </div>
            <div id="info-wrapper">
              <p>Brand: <span id="details-brand">${data.brand}</span></p>
              <p>
                Model: <span id="details-model">${data.model}</span>
              </p>
              <p>Release date: <span id="details-release">${data.release}</span></p>
              <p>Designer: <span id="details-designer">${data.designer}</span></p>
              <p>Value: <span id="details-value">${data.value}</span></p>
            </div>
              ${isOwner ? html`
              <div id="action-buttons">
              <a href="/edit/${data._id}" id="edit-btn">Edit</a>
              <a href="" id="delete-btn" @click=${onDelete}>Delete</a>
            </div>`
      : html``}
        </div>
      </section>
    `
}
let id = ""
export async function detailsView(ctx) {
  id = ctx.params.id;
  const data = await get(`data/shoes/${id}`);
  let isOwner = false
  if (getUserData()) {
    isOwner = getUserData()._id === data._ownerId;
  }
  render(detailsTemplate(data, isOwner), root);
}

async function onDelete(e) {
  e.preventDefault();
  const confirmed = confirm("Are you sure ?");
  if (confirmed) {
    await del(`data/shoes/${id}`)
    page.redirect("/dashboard");
  };
};