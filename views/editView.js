import { html, render } from "../node_modules/lit-html/lit-html.js";
import page from "../node_modules/page/page.mjs";
import { get, put } from "../services/api.js";

const root = document.querySelector("main");

function editTemplate(item) {
  return html`
    <section id="edit">
          <div class="form">
            <h2>Edit item</h2>
            <form class="edit-form" @submit=${onSubmit}>
              <input
                type="text"
                name="brand"
                id="shoe-brand"
                placeholder="Brand"
                value=${item.brand}
              />
              <input
                type="text"
                name="model"
                id="shoe-model"
                placeholder="Model"
                value=${item.model}
              />
              <input
                type="text"
                name="imageUrl"
                id="shoe-img"
                placeholder="Image url"
                value=${item.imageUrl}
              />
              <input
                type="text"
                name="release"
                id="shoe-release"
                placeholder="Release date"
                value=${item.release}
              />
              <input
                type="text"
                name="designer"
                id="shoe-designer"
                placeholder="Designer"
                value=${item.designer}
              />
              <input
                type="text"
                name="value"
                id="shoe-value"
                placeholder="Value"
                value=${item.value}
              />

              <button type="submit">post</button>
            </form>
          </div>
        </section>
    `
}

let id = ""
export async function editView(ctx) {
  id = ctx.params.id;
  const data = await get(`data/shoes/${id}`)
  render(editTemplate(data), root);
}

async function onSubmit(e) {
  e.preventDefault()
  const formData = new FormData(e.target);
  const { brand, model, imageUrl, release, designer, value } = Object.fromEntries(formData);
  if (!brand || !model || !imageUrl || !release || !designer || !value) {
    return;
  }

  put(`data/shoes/${id}`, { brand, model, imageUrl, release, designer, value });
  page.redirect(`/details/${id}`);
}