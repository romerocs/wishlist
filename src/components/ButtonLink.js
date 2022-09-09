import { html, css } from 'lit';
import { RootElement } from './RootElement.js';

const tagName = 'button-link';

export class ButtonLink extends RootElement {
  static properties = {
    href: {
      type: String
    }
  }

  static styles = [
    RootElement.styles,
    css`
    .button {
      border-radius: var(--border-radius-3x);
      text-decoration: none;
      background: var(--light-gray);
      display: inline-block;
      padding: 6px 24px;
    }
  `]

  render() {
    return html`
    <a class="button" href=${this.href}>
      <slot />
    </div>
    `;
  }
}

customElements.define(tagName, ButtonLink);