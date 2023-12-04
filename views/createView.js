import { html, render } from "../node_modules/lit-html/lit-html.js";
import page from "../node_modules/page/page.mjs";
import { post } from "../services/api.js";

const root = document.querySelector("main");

function createTemplate() {
  return html`
     <section id="create">
          <div class="form">
            <h2>Add item</h2>
            <form class="create-form" @submit=${onSubmit}>
              <input
                type="text"
                name="brand"
                id="shoe-brand"
                placeholder="Brand"
              />
              <input
                type="text"
                name="model"
                id="shoe-model"
                placeholder="Model"
              />
              <input
                type="text"
                name="imageUrl"
                id="shoe-img"
                placeholder="Image url"
              />
              <input
                type="text"
                name="release"
                id="shoe-release"
                placeholder="Release date"
              />
              <input
                type="text"
                name="designer"
                id="shoe-designer"
                placeholder="Designer"
              />
              <input
                type="text"
                name="value"
                id="shoe-value"
                placeholder="Value"
              />

              <button type="submit">post</button>
            </form>
          </div>
        </section>
    `
}

export function createView() {
  render(createTemplate(), root)
}

async function onSubmit(e) {
  e.preventDefault()
  const formData = new FormData(e.target);
  const { brand, model, imageUrl, release, designer, value } = Object.fromEntries(formData);
  if (!brand || !model || !imageUrl || !release || !designer || !value) {
    return;
  }

  post("data/shoes", { brand, model, imageUrl, release, designer, value });
  page.redirect("/dashboard");
}