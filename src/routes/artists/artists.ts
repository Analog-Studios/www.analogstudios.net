import { html, LitElement, TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { navigate } from 'lit-redux-router';
import { getArtists } from '../../services/artists/artists-service.ts';
import { modelArtist } from '../../components/card/card.model.ts';
import { Artist } from '../../services/artists/artist.model.ts';
import store from '../../store.ts';
import artistSheet from './artists.css' with { type: 'css' };
import themeSheet from '../../theme.css' with { type: 'css' };
import stylesSheet from '../../styles.css' with { type: 'css' };
import '../../components/card/card.ts';

@customElement('as-route-artists')
export class ArtistsRouteComponent extends LitElement {
  static styles = [themeSheet, stylesSheet, artistSheet];

  private ANALOG_ID = 1;
  private displayArtists: Array<Artist> = [];
  private analog: Artist;

  @property()
  accessor artists: Array<Artist> = [];

  async connectedCallback() {
    super.connectedCallback();

    this.artists = await getArtists();

    // make sure "newer" artists are at the top
    // and keep Analog at the top of the list
    this.displayArtists = this.artists.reverse().filter((artist: Artist) => artist.id !== this.ANALOG_ID);
    this.analog = this.artists.filter((artist: Artist) => artist.id === this.ANALOG_ID)[0];

    ga('set', 'page', '/artists');
    ga('send', 'pageview');
  }

  private onArtistSelected(): void {
    const selectedArtistId = this.shadowRoot.querySelector('select').value;

    store.dispatch(navigate(`/artists/${selectedArtistId}`));
  }

  protected render(): TemplateResult {
    const { displayArtists = [], analog = {} } = this;

    return html`
      <div class="container-flex as-route-artists">
        <div class="row">

          <div class="hidden-sm-down col-xs-3">

            <p>Quick Links</p>

            <select class="hidden-sm-down" @change="${this.onArtistSelected}">
              <option .value="Select Artist">Select Artist</option>
              ${[analog, ...displayArtists].map((artist: Artist) => {
                return html`
                  <option .value="${artist.id}">${artist.name}</option>
                `;
              })}
              <!-- <option *ngFor="let artist of getArtists()" value="artist.id">{{artist.name | ellipsis: 15}}</option> -->
            </select>

          </div>

          <div class="col-xs-7">
            <div class="artist-cards-list">
              <app-card .details="${modelArtist(this.analog)}"></app-card>

              ${displayArtists.map((artist: Artist) => {
                return html`
                  <app-card .details="${modelArtist(artist)}"></app-card>
                `;
              })};
            </div>
          </div>

        </div>
      </div>
    `;
  }
}