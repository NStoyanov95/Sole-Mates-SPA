import { render, html } from "../node_modules/lit-html/lit-html.js";
import page from "../node_modules/page/page.mjs";
import { post } from "../services/api.js";
import { setUserData } from "../services/userHelper.js";

const root = document.querySelector("main");

function loginTemplate() {
  return html`
    <section id="login">
          <div class="form">
            <h2>Login</h2>
            <form class="login-form" @submit=${onSubmit}>
              <input type="text" name="email" id="email" placeholder="email" />
              <input
                type="password"
                name="password"
                id="password"
                placeholder="password"
              />
              <button type="submit">login</button>
              <p class="message">
                Not registered? <a href="/register">Create an account</a>
              </p>
            </form>
          </div>
        </section>
    `
}
export function loginView() {
  render(loginTemplate(), root);
}
async function onSubmit(e) {
  e.preventDefault();
  const formData = new FormData(e.target);
  const { email, password } = Object.fromEntries(formData);
  if (!email || !password) {
    window.alert("incorrect email or password");
    return;
  }

  const data = await post("users/login", { email, password });
  setUserData(data);
  page.redirect("/");
}
