import { html, LitElement } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { getEventById } from '../../services/events-service.js';
import eventsCss from './events.css?type=css';

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

class EventDetailsRouteComponent extends LitElement {

  static get properties() {
    return {
      id: String,
      event: Object
    };
  }

  async connectedCallback() {
    super.connectedCallback();

    this.event = await getEventById(this.id);
  }

  // EEEE, MMMM d, yyyy, h:mm a
  // SATURDAY, FEBRUARY 6, 2016, 9:00 PM
  formatEventTime(timestamp) {
    const dateObj = new Date(timestamp * 1000);
    const day = DAYS[dateObj.getDay()].toUpperCase();
    const month = MONTHS[dateObj.getMonth()].toUpperCase();
    const date = dateObj.getDate();
    const year = dateObj.getFullYear();
    const hours = dateObj.getHours();
    const hour = hours <= 12 ? hours : hours - 12;
    const minutes = dateObj.getMinutes();
    const minute = minutes <= 9 ? `0${minutes}` : minutes;
    const ampm = hours <= 11 ? 'AM' : 'PM';

    return `${day}, ${month} ${date}, ${year}, ${hour}:${minute} ${ampm}`;
  }

  /* eslint-disable indent */
  render() {
    const { event } = this;

    if (!event) {
      return html``;
    } else {
      return html`
        <style>
          ${eventsCss}
        </style>

        <div class="container-flex as-route-event-details">
          <div class="row">

            <div class="col-xs-4 hidden-sm-down">
              <as-social-share></as-social-share>
            </div>

            <div class="col-xs-1 hidden-sm-down">
              <i class="cal-icon fa fa-calendar-o"></i>
            </div>

            <div class="col-xs-5">
              <p>Event Title: ${event.title}</p>
              <p>Event Date: ${this.formatEventTime(event.startTime)}</p>
              <p>Event Info:</p>
              <p>${unsafeHTML(event.description)}</p>
            </div>

          </div>
        </div>
      `;
    }
  }
  /* eslint-enable indent */
}

customElements.define('as-route-event-details', EventDetailsRouteComponent);