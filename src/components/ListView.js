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
        type: String,
        reflect: true
      },
      data: { 
        type: Array,
        reflect: true
      },
      _items: {
        type: Array,
        state: true
      },
      _dataloaded: {
        type: Boolean,
        state: true
      }
    };
  }

  constructor() {
    super();

    this._dataloaded = false;
  }

  static styles = [
    RootElement.styles,
    css`
    .list-view__items {
      border-width: 1px 0 1px 0;
      border-color: var(--light-gray);
    }
  `];

  _sortlistener(e) {
    const reversed = this._items.reverse();

    this._items = [...reversed];

  }

  _setData() {
    this._items = JSON.parse(this.data);
    this._dataloaded = true;

    this.requestUpdate();
  }
  
  render() {
    if(!this._dataloaded) {
      this._setData();
    }

    return this._dataloaded ? html`
      <div class="list-view">
        <layout-stack gap="var(--s6)">
          <h1>${this.title}</h1>
  
          <list-view-filter-sort @sortchange=${this._sortlistener}></list-view-filter-sort>
  
          <div class="list-view__items">
          ${this._items.map((data, index) => html`
          <list-item index=${index} title=${data.title} notes=${data.notes} priority=${data.priority} needs=${data.needs} url=${data.url} image=${data.image}></list-item>
        `)}
          </div>
        </layout-stack>
      </div>` : html`<div>loading</div>`;
  }
}

customElements.define(tagName, ListView);