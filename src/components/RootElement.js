import { LitElement, css, unsafeCSS } from 'lit';
import globalCSS from "../styles/global.css";

export class RootElement extends LitElement {

  static get styles() {
    return [
      css`${unsafeCSS(globalCSS)}`
    ];
  }

  createRenderRoot() {
    return this;
  }
}