import { LitElement, html } from 'lit';

const tagName = 'netlify-identity';

export class NetlifyIdentity extends LitElement {
  render() {
    return html`<script>
    if (window.netlifyIdentity) {
      window.netlifyIdentity.on("init", (user) => {
        if (!user) {
          window.netlifyIdentity.on("login", () => {
            document.location.href = "/";
          });
        }
      });
    }
  </script>`;
  }
}

customElements.define(tagName, NetlifyIdentity);