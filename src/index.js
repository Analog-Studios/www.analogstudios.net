import { html, LitElement } from 'lit';
import { connectRouter } from 'lit-redux-router';
import store from './store.js';

connectRouter(store);

class App extends LitElement {

  render() {
    return html`
      <div>
        <main class="cc-page app-content">
          <lit-route
            path="/albums/:id"
            component="as-route-album-details"
            .resolve="${() => import('/routes/albums/album-details.js')}">
          </lit-route>
          <lit-route
            path="/albums"
            component="as-route-albums"
            .resolve="${() => import('/routes/albums/albums.js')}">
          </lit-route>
          <lit-route
            path="/artists/:id"
            component="as-route-artist-details"
            .resolve="${() => import('/routes/artists/artist-details.js')}">
          </lit-route>
          <lit-route
            path="/artists"
            component="as-route-artists"
            .resolve="${() => import('/routes/artists/artists.js')}">
          </lit-route>
          <lit-route
            path="/events/:id"
            component="as-route-event-details"
            .resolve="${() => import('/routes/events/event-details.js')}">
          </lit-route>
          <lit-route
            path="/events"
            component="as-route-events"
            .resolve="${() => import('/routes/events/events.js')}">
          </lit-route>
          <lit-route
            path="/"
            component="as-route-home"
            .resolve="${() => import('/routes/home/home.js')}">
          </lit-route>
          <lit-route><h1>Not Found (404) Page - TODO</h1></lit-route>
        </main>
      </div>
    `;
  }
}

customElements.define('app-router-outlet', App);