import { css, html, LitElement } from 'lit';

class FooterComponent extends LitElement {
  constructor() {
    super();

    this.startingYear = 2007;
    this.currentYear = new Date().getFullYear(); 
  }

  static get styles() {
    return css`
      h5 {
        color: #020202; /* $black */
        text-decoration: underline;
      }
    `;
  }

  render() {
    const { currentYear, startingYear } = this;

    return html`
      <footer>
        <h5 class="copyright-text">&copy; ${startingYear} - ${currentYear} Analog Studios</h5>
      </footer>
    `;
  }
}

customElements.define('app-footer', FooterComponent);