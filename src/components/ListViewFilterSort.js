import { html, css } from 'lit';
import { RootElement } from './RootElement.js';
import './LayoutCluster.js';
export const tagName = 'list-view-filter-sort';

export class ListViewFilterSort extends RootElement {

  static properties = {
    sortfunction: { type: Object }
  }
  static styles = [
    RootElement.styles,
    css`
      label {
        padding-right: var(--s-4);
      }
    `
  ];

  _dispatchSortChange(e) {
    const value = e.target.value;

    if(!!value) {
      const options = {
        detail: value,
        bubbles: true,
        composed: true
      };
      
      this.dispatchEvent(new CustomEvent('sortchange', options));
    }
  }

  render() {
    return html`
    <layout-cluster gap="var(--s8)">
      <div class="list-view__filter">
        <label for="list-filter">Filter:</label>

        <select name="" id="list-filter">
          <option value="">All Items</option>
          <option value="">Purchased</option>
        </select>
      </div>

      <div class="list-view__sort">
        <label for="list-sort">Sort:</label>

        <select name="" @change=${this._dispatchSortChange} id="list-sort">
          <option value="">Default</option>
          <option value="high">Priority: High to Low</option>
          <option value="low">Priority: Low to High</option>
        </select>
      </div>
    </layout-cluster>
    `;
  }
}

customElements.define(tagName, ListViewFilterSort);