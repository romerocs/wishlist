import { html, css } from 'lit';
import { RootElement } from './RootElement.js';

const tagName = 'layout-cluster';

export class LayoutCluster extends RootElement {

  static properties = {
    justify: { 
      type: String
    },
    padding: { 
      type: String 
    },
    gap: { 
      type: String 
    }
  }

  static styles = css`
    .l-cluster {
      display: flex;
      flex-wrap: wrap;
      justify-content: var(--cl-justify, flex-start);
      align-items: var(--cl-align, center);
      gap: var(--cl-gap, var(--s0));
    }
  `

  render() {
    this.justify = this.justify ? `--cl-justify: ${this.justify};` : ``;
    this.align = this.align ? `--cl-align: ${this.align};` : ``;
    this.gap = this.gap ? `--cl-gap: ${this.gap};` : ``;

    return html`
    <div class='l-cluster' style="${this.justify} ${this.align} ${this.gap}">
      <slot />
    </div>
    `;
  }
}

customElements.define(tagName, LayoutCluster);