import { html, css } from 'lit';
import { RootElement } from './RootElement.js';
import './LayoutCluster.js';
export const tagName = 'list-view-filter-sort';

export class ListViewFilterSort extends RootElement {

  static properties = {
    sortfunction: { type: Object },
    _filterEventName: { type: String },
    _sortEventName: { type: String }
  }

  constructor() {
    super();

    this._filterEventName = 'filterchange';
    this._sortEventName = 'sortchange';
  }

  static styles = [
    RootElement.styles,
    css`
      label {
        padding-right: var(--s-4);
      }
    `
  ];

  _dispatchChangeEvent(e, eventName) {
    const value = e.target.value;

    if(!!value) {
      const options = {
        detail: value,
        bubbles: true,
        composed: true
      };

      this.dispatchEvent(new CustomEvent(eventName, options));
    }
  }

  render() {
    return html`
    <layout-cluster gap="var(--s8)">
      <div class="list-view__filter">
        <label for="list-filter">Filter:</label>

        <select name="list-filter" id="list-filter" @change=${(e) => this._dispatchChangeEvent(e, this._filterEventName)}>
          <option value="all">All Items</option>
          <option value="purchased">Purchased</option>
        </select>
      </div>

      <div class="list-view__sort">
        <label for="list-sort">Sort:</label>

        <select name="list-filter" id="list-sort" @change=${(e) => this._dispatchChangeEvent(e, this._sortEventName)}>
          <option value="default">Default</option>
          <option value="high">Priority: High to Low</option>
          <option value="low">Priority: Low to High</option>
        </select>
      </div>
    </layout-cluster>
    `;
  }
}

customElements.define(tagName, ListViewFilterSort);