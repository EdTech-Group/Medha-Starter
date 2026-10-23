// Ported from the Medha theme by medha-starter. Regenerated from the theme; build new screens from these components.

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="row g-4">
          <div className="col-md-4">
            <h4>About us</h4>
            <p>
              Nam libero tempore cum vulputate id est id, pretium semper enim. Morbi viverra congue
              nisi vel pulvinar posuere sapien eros.
            </p>
          </div>
          <div className="col-md-4">
            <h4>Latest news</h4>
            <ul className="news-list">
              <li>
                <a href="#">Lorem ipsum neque vulputate</a>
                <small>Dolor amet sed quam vitae</small>
              </li>
              <li>
                <a href="#">Lorem ipsum neque, vulputate</a>
                <small>Dolor amet sed quam vitae</small>
              </li>
              <li>
                <a href="#">Lorem ipsum neque, vulputate</a>
                <small>Dolor amet sed quam vitae</small>
              </li>
            </ul>
          </div>
          <div className="col-md-4">
            <h4>Contact info</h4>
            <p>
              <svg className="icon ">
                <use href="#i-pin" />
              </svg>{" "}
              8088 USA, Honey block, New York City.
            </p>
            <p>
              <svg className="icon ">
                <use href="#i-mail" />
              </svg>{" "}
              info@example.com
            </p>
            <p>
              <svg className="icon ">
                <use href="#i-phone" />
              </svg>{" "}
              +00 0000 000 000
            </p>
            <form
              className="newsletter needs-validation"
              noValidate
              onSubmit={(event) => event.preventDefault()}
            >
              <label className="visually-hidden" htmlFor="nl">
                Email
              </label>
              <div className="input-group">
                <input
                  id="nl"
                  type="email"
                  className="form-control"
                  placeholder="Sign up for our newsletter"
                  required
                />
                <button className="btn btn-primary" type="submit">
                  <svg className="icon ">
                    <use href="#i-send" />
                  </svg>
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="site-copy">
          © 2026 Medha Techno Research LLP <span>•</span> Demo content
        </div>
      </div>
    </footer>
  );
}
