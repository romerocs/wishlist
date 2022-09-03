import { LitElement, html } from 'lit';

const tagName = 'list-item';

class ListItem extends LitElement {
  static properties = {
    title: { type: String },
    notes: { type: String },
    priority: { type: String },
    needs: { type: Number },
    url: { type: String },
    image: { type: String }
  }

  render() {
    return html`
    <div class="list-view__item l-sidebar" style="--sb-align: center;">
      <div class="item-image is-sidebar">
        <img
          width="160"
          src=${this.image}
          alt=""
        />
      </div>
      <div class="l-cluster" style="--cl-justify: space-between;">
        <div>
          <h3>${this.title}</h3>
          <div class="item-notes">
            <i>${this.notes}</i>
          </div>
          <div><small>Priority: ${this.priority} | Needs: ${this.needs}</small></div>
        </div>

        <a href=${this.url}>Shop</a>
      </div>
    </div>
    `;
  }
}

customElements.define(tagName, ListItem);