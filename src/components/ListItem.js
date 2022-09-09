import { html, css } from 'lit';
import { RootElement } from './RootElement.js';
import './LayoutCluster';
import './LayoutSidebar';
import './ButtonLink';

const tagName = 'list-item';

class ListItem extends RootElement {
  static properties = {
    title: { type: String },
    notes: { type: String },
    priority: { type: String },
    needs: { type: Number },
    url: { type: String },
    image: { type: String },
    index: { type: Number }
  }


  static styles = [
    RootElement.styles,
    css`
      .item-image {
        aspect-ratio: 16 / 9;
        position: relative;
        overflow: hidden;
        border-radius: var(--border-radius-2x);
        max-width: calc((160 / 16) * 1rem);
      }

      .item-image img {
        object-fit: cover;
        width: 100%;
        height: 100%;
      }
    `,
  ]

  render() {
    const border_width = this.index > 0 ? '1px' : '0px';
    const style = JSON.stringify({ padding: "var(--s3) 0", borderTop: `${border_width} solid var(--light-gray)` });
    
    return html`
    <layout-sidebar styles=${style} align="center" gap="var(--s3)">
      <div slot="sidebar">
        <div class='item-image'>
          <img width="160" src=${this.image} alt="" />
        </div>
      </div>

      <div slot="notsidebar">
          <layout-cluster justify="space-between">
            <div>
              <h3>${this.title}</h3>
              <div class="item-notes">
                <i>${this.notes}</i>
              </div>
              <div><small>Priority: ${this.priority} | Needs: ${this.needs}</small></div>
            </div>

            <button-link href=${this.url}>Shop</button-link>
          </layout-cluster>
      </div>
    </layout-sidebar>
    `;
  }
}

customElements.define(tagName, ListItem);