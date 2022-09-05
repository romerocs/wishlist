import { LitElement, html, css } from 'lit';
import { SidebarLayout } from './SidebarLayout';

const tagName = 'app-sidebar';

export class AppSidebar extends SidebarLayout {

  constructor() {
    super();
  }

  static styles = [
    SidebarLayout.styles,
    css`
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
}

customElements.define(tagName, AppSidebar);