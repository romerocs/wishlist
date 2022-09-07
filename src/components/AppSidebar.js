import { css } from 'lit';
import { LayoutSidebar } from './LayoutSidebar';

const tagName = 'app-sidebar';

export class AppSidebar extends LayoutSidebar {

  static styles = [
    LayoutSidebar.styles,
    css`
      :host {
        width: 100%;
      }
      
      .app-sidebar {
        height: 100%;
      }
      
      .app-sidebar > *:first-child {
        height: 100%;
        color: var(--white);
        background-color: var(--black);
      }

      .app-sidebar__button {
        font-size: var(--s6);
        text-align: center;
        padding: var(--s0);
        width: 100%;
      }
    `,
  ];

  createRenderRoot() {
    return this;
  }
}

customElements.define(tagName, AppSidebar);