import { LitElement, css, unsafeCSS } from 'lit';
export class RootElement extends LitElement {

  static get styles() {
    return [
      css`
        /* Box sizing rules */
        *,
        *::before,
        *::after {
          box-sizing: border-box;
        }

        * {
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          scroll-behavior: smooth;
          overflow-anchor: none;
          border-style: solid;
          border-width: 0px;
        }

        /* Remove default margin */
        body,
        h1,
        h2,
        h3,
        h4,
        p,
        figure,
        blockquote,
        dl,
        dd {
          margin: 0;
        }

        /* Remove list styles on ul, ol elements with a list role, which suggests default styling will be removed */
        ul[role="list"],
        ol[role="list"] {
          list-style: none;
        }

        /* Set core root defaults */
        html:focus-within {
          scroll-behavior: smooth;
        }

        /* Set core body defaults */
        body {
          min-height: 100vh;
          text-rendering: optimizeSpeed;
          line-height: 1.5;
        }

        :host {
          text-align: left;
        }

        //svg's nested inside buttons and links should not inherit pointer events
        button,
        a {
          svg {
            pointer-events: none;
          }
        }

        /* A elements that don't have a class get default styles */
        a:not([class]) {
          text-decoration-skip-ink: auto;
        }

        /* Make images easier to work with */
        img,
        picture {
          max-width: 100%;
          display: block;
        }

        /* Inherit fonts for inputs and buttons */
        input,
        button,
        textarea,
        select {
          font: inherit;
        }

        button {
          background: transparent;
          border: none;
          padding: 0;
          cursor: pointer;
        }

        /* Remove all animations, transitions and smooth scroll for people that prefer not to see them */
        @media (prefers-reduced-motion: reduce) {
          html:focus-within {
            scroll-behavior: auto;
        }

        *,
        *::before,
        *::after {
          animation-duration: 0.01ms !important;
          animation-iteration-count: 1 !important;
          transition-duration: 0.01ms !important;
          scroll-behavior: auto !important;
        }

        /* ELEMENT STYLES */
        html, :host {
          font-family: sans-serif;
        }
        main {
          display: flex;
          min-height: 100vh;
        }

        button {
          color: inherit;
          text-align: inherit;
          display: block;
        }

        select {
          background-color: var(--light-gray);
          border-radius: var(--border-radius-1x);
          padding: 6px 8px;
        }

        small {
          font-size: var(--s-2);
        }
     }`
    ];
  }

  createRenderRoot() {
    return this;
  }
}