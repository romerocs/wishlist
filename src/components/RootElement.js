import { LitElement, css, unsafeCSS } from 'lit';
import globalCSS from "../styles/global.css?raw";

export class RootElement extends LitElement {

  static get styles() {
    return [
      css`${unsafeCSS(globalCSS)}`
    ];
  }
}