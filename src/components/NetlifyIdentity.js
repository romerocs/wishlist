import { LitElement, html } from 'lit';

const tagName = 'netlify-identity';

export class NetlifyIdentity extends LitElement {
  createRenderRoot() {
    return this;
  }
  
  render() {
    return html`<script>
    if (window.netlifyIdentity) {
      window.netlifyIdentity.on("init", (user) => {
        if (!user) {
          window.netlifyIdentity.on("login", () => {
            document.location.href = "/admin/index.html";
          });
        }
      });
    }
  </script>`;
  }
}

customElements.define(tagName, NetlifyIdentity);