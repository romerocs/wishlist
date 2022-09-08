import { html, css } from 'lit';
import {classMap } from 'lit/directives/class-map.js';
import { styleMap } from 'lit/directives/style-map.js';
import { RootElement } from './RootElement.js';

const tagName = 'layout-sidebar';

export class LayoutSidebar extends RootElement {
  static properties = {
    align: { 
      type: String,
    },
    gap: { 
      type: String 
    },
    classes: {
      type: Object
    },
    styles: {
      type: Object,
      reflect: true
    }
  }

  static get styles() {

    console.log(RootElement.styles);
    return [
      RootElement.styles,
      css`
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
  `]
  }

  render() {
    this.align = this.align ? {'--sb-align' : `${this.align}`} : ``;
    this.gap = this.gap ? { '--sb-gap' : `${this.gap}`} : ``;
    this.classes = this.classes ? classMap(this.classes) : ``;
    this.styles = this.styles ? this.styles : ``;

    const inlinestyles = styleMap(Object.assign(this.styles, this.align, this.gap));

    return html`
    <div class="l-sidebar ${this.classes}" style=${inlinestyles}>
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

customElements.define(tagName, LayoutSidebar);