import { LitElement, html } from 'lit';

export const tagName = 'list-view-filter-sort';

export class ListViewFilterSort extends LitElement {
  render() {
    return html`
    <div class="list-view__filter-sort l-cluster" style="--cl-gap: var(--s8)">
      <div class="list-view__filter">
        <label for="list-filter">Filter:</label>
    
        <select name="" id="list-filter">
          <option value="">All Items</option>
          <option value="">Purchased</option>
        </select>
      </div>
    
      <div class="list-view__sort">
        <label for="list-sort">Sort:</label>
    
        <select name="" id="list-sort">
          <option value="">Default</option>
          <option value="">Priority: High</option>
        </select>
      </div>
    </div>`;
  }
}

customElements.define(tagName, ListViewFilterSort);