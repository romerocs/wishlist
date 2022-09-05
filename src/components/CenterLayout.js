import { LitElement, html, css } from 'lit';

const tagName = 'center-layout';

export class CenterLayout extends LitElement {
  static properties = {
    maxWidth: { 
      type: String, 
      reflect: true,
      attribute: "max-width"
    },
    padding: { 
      type: String 
    }
  }

  constructor() {
    super();
  }

  static styles = css`
    :host {
      --cr-max-width: var(--bp-64);
    
      box-sizing: content-box;
      margin-left: auto;
      margin-right: auto;
      max-width: var(--cr-max-width);
      display: flex;
      flex-direction: column;
      padding-right: var(--cr-padding, 0);
      padding-left: var(--cr-padding, 0);
    }
  `

  render() {
    this.maxWidth = this.maxWidth ? `--cr-max-width: ${this.maxWidth};` : ``;
    this.padding = this.padding ? `--padding: ${this.padding}` : ``;

    return html`
    <div class="l-center" style="${this.maxWidth} ${this.padding}">
      <slot />
    </div>
    `;
  }
}

customElements.define(tagName, CenterLayout);