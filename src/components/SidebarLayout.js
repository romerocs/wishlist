import { LitElement, html, css } from 'lit';
import {classMap} from 'lit/directives/class-map.js';

const tagName = 'sidebar-layout';

export class SidebarLayout extends LitElement {
  static properties = {
    align: { 
      type: String,
    },
    gap: { 
      type: String 
    },
    classes: {
      type: Object
    }
  }

  constructor() {
    super();

  }

  static styles = css`
    .l-sidebar {
      display: flex;
      flex-wrap: wrap;
      gap: var(--sb-gap, var(--s0));
      align-items: var(--sb-align, flex-start);
    }

    .l-sidebar > .is-sidebar {
      flex-grow: 1;
    }
  
    .l-sidebar > :not(.is-sidebar) {
      flex-basis: 0;
      flex-grow: 999;
      min-width: 50%;
    }
  `

  render() {

    this.align = this.align ? `--cr-align: ${this.align};` : ``;
    this.gap = this.gap ? `--sb-gap: ${this.gap}` : ``;

    return html`
    <div class="l-sidebar ${classMap(this.classes)}" style="${this.align} ${this.gap}">
        <div class='is-sidebar'>
          <slot name="sidebar"></slot>
        </div>
        
        <div>
          <slot name="notsidebar"></slot>
        </div>
      </div>
    </div>
    `;
  }
}

customElements.define(tagName, SidebarLayout);