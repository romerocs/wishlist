import { LitElement, html, css } from 'lit';
import { map } from "lit/directives/map.js";
import { repeat } from "lit/directives/repeat.js";

import "./ListViewFilterSort.js";
import "./ListItem.js";

export const tagName = "list-view";

export class ListView extends LitElement {

  static get properties() {
    return {
      title: { 
        type: String
      },
      data: { 
        type: Array,
        reflect: true
      }
    };
  }

  static styles = css`
    .list-view {
      margin-top: var(--s12);
    }

    .list-view__items {
      border-width: 1px 0 1px 0;
      border-color: var(--light-gray);
    }
  `;

  constructor() {
    super();
  }
  
  render() {
    return html`
      <div class="list-view">
        <div class="l-stack" style="--st-gap: var(--s6)">
          <h1>${this.title}</h1>
  
          <list-view-filter-sort></list-view-filter-sort>
  
          <div class="list-view__items">
            ${JSON.parse(this.data).map((data) => html`
            <list-item title=${data.title} notes=${data.notes} priority=${data.priority} needs=${data.needs} url=${data.url} image=${data.image}></list-item>
          `)}
          </div>
        </div>
      </div>`;
  }
}

customElements.define(tagName, ListView);