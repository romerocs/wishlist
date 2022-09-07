import { html, css } from 'lit';
import { RootElement } from './RootElement.js';

const tagName = 'layout-stack';

export class LayoutStack extends RootElement {
  static properties = {
    gap: {
      type: String
    }
  }

  static styles = css`
    .l-stack {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      gap: var(--st-gap, var(--s0));
    }
  `

  render() {
    this.gap = this.gap ? `--st-gap: ${this.gap};` : ``;

    return html`
    <div class="l-stack" style="${this.gap}">
      <slot />
    </div>
    `;
  }
}

customElements.define(tagName, LayoutStack);