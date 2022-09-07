import { html, css } from 'lit';
import { RootElement } from './RootElement.js';

import "./ListViewFilterSort.js";
import "./ListItem.js";
import "./LayoutStack";

export const tagName = "list-view";

export class ListView extends RootElement {

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

  static styles = [
    RootElement.styles,
    css`
    .list-view__items {
      border-width: 1px 0 1px 0;
      border-color: var(--light-gray);
    }
  `];
  
  render() {
    return html`
      <div class="list-view">
        <layout-stack gap="var(--s6)">
          <h1>${this.title}</h1>
  
          <list-view-filter-sort></list-view-filter-sort>
  
          <div class="list-view__items">
            ${JSON.parse(this.data).map((data, index) => html`
            <list-item index=${index} title=${data.title} notes=${data.notes} priority=${data.priority} needs=${data.needs} url=${data.url} image=${data.image}></list-item>
          `)}
          </div>
        </layout-stack>
      </div>`;
  }
}

customElements.define(tagName, ListView);