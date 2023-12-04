import { html, render } from "../node_modules/lit-html/lit-html.js";
import { post } from "../services/api.js";
import { setUserData } from "../services/userHelper.js";
import page from "../node_modules/page/page.mjs"

const root = document.querySelector("main");

function registerTemplate() {
  return html`
    <section id="register">
          <div class="form">
            <h2>Register</h2>
            <form class="login-form" @submit=${onSubmit}>
              <input
                type="text"
                name="email"
                id="register-email"
                placeholder="email"
              />
              <input
                type="password"
                name="password"
                id="register-password"
                placeholder="password"
              />
              <input
                type="password"
                name="re-password"
                id="repeat-password"
                placeholder="repeat password"
              />
              <button type="submit">login</button>
              <p class="message">Already registered? <a href="/login">Login</a></p>
            </form>
          </div>
        </section>
    `
}

export function registerView() {
  render(registerTemplate(), root);
}

async function onSubmit(e) {
  e.preventDefault()
  const formData = new FormData(e.target);
  const { email, password, ["re-password"]: rePassword } = Object.fromEntries(formData);

  if (!email || !password || !rePassword || password !== rePassword) {
    alert("incorrect input");
    return
  }

  const data = await post("users/register", { email, password });
  setUserData(data);
  page.redirect("/")

}