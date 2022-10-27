import { html, css } from 'lit';
import { RootElement } from './RootElement.js';

const tagName = 'icon-shopping-cart';

export class IconShoppingCart extends RootElement {

  static styles = [
    RootElement.styles
  ]

  render() {
    return html`
    <svg width="24" viewBox="0 0 24 24" fill="none" stroke="var(--white)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="8" cy="21" r="1"></circle>
      <circle cx="19" cy="21" r="1"></circle>
      <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"></path>
    </svg>
    `;
  }
}

customElements.define(tagName, IconShoppingCart);