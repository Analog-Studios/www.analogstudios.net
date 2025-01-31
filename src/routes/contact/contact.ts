import { html, LitElement, TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import contactSheet from './contact.css' with { type: 'css' };
import themeSheet from '../../theme.css' with { type: 'css' };

@customElement('as-route-contact')
export class ContactRouteComponent extends LitElement {
  static styles = [themeSheet, contactSheet];

  connectedCallback(): void {
    super.connectedCallback();

    ga('set', 'page', '/contact');
    ga('send', 'pageview');
  }

  protected render(): TemplateResult {

    return html`
      <div class="as-route-contact">    
        <h2 class="header">Contact Us</h2>
        <p>Analog Studios is located in Newport RI and run by Owen Buckley and Dave Flamand.  Please use the contact form below to send us a message!</p>
        
        <form name="contact" method="post">

          <label for="subject">Subject</label>
          <input name="subject" type="text" required/>

          <label for="email">Email</label>
          <input name="email" type="email" required/>

          <label for="message">Message:</label>
          <textarea name="message" required></textarea>

          <!-- Netlify hidden form for the contact page -->
          <input type="hidden" name="form-name" value="contact" />

          <button class="btn" type="submit">Send</button>
        </form>

      </div>
    `;
  }
}