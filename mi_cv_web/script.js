/* Componente <mi-seccion> con Shadow DOM.
   - Atributo: titulo (texto del h2)
   - Contenido: se coloca en el <slot>
   - Inicialmente colapsado (aria-expanded=false)
*/
class MiSeccion extends HTMLElement {
  constructor(){
    super();
    this.attachShadow({mode: 'open'});
    const titulo = this.getAttribute('titulo') || '';
    this.shadowRoot.innerHTML = `
      <style>
        :host{display:block}
        .wrap{
          background: #fff;
          border-radius: 10px;
          box-shadow: 0 2px 6px rgba(0,0,0,0.08);
          overflow:hidden;
          border:1px solid rgba(0,0,0,0.04);
        }
        .head{
          display:flex;
          align-items:center;
          gap:0.8rem;
          padding:0.9rem 1rem;
          cursor:pointer;
          user-select:none;
        }
       .title{
          font-weight:700;
          font-size:1.6rem;      
          margin:0;
          letter-spacing:0.3px;
        }
        .arrow{
          display:inline-block;
          width:1rem;height:1rem;
          transform:rotate(0deg);
          transition:transform 220ms ease;
          font-size:1rem;
        }
        .content{
          padding:0 1rem 1rem 1rem;
          display:none;
        }
        :host(.open) .arrow{transform:rotate(90deg)}
        :host(.open) .content{display:block}
      </style>
      <section class="wrap" role="region">
        <div class="head" role="button" tabindex="0" aria-expanded="false" aria-controls="c">
          <span class="arrow" aria-hidden="true">▶</span>
          <h2 class="title">${titulo}</h2>
        </div>
        <div class="content" id="c"><slot></slot></div>
      </section>
    `;
    this._head = this.shadowRoot.querySelector('.head');
    this._content = this.shadowRoot.querySelector('.content');
    this._arrow = this.shadowRoot.querySelector('.arrow');
  }

  connectedCallback(){
    this.setAttribute('aria-live', 'polite');
    this._head.addEventListener('click', ()=> this.toggle());
    this._head.addEventListener('keydown', (e)=>{
      if(e.key === 'Enter' || e.key === ' '){ e.preventDefault(); this.toggle(); }
    });
  }

  toggle(){
    const open = this.classList.toggle('open');
    const btn = this.shadowRoot.querySelector('.head');
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
  }
}

customElements.define('mi-seccion', MiSeccion);

document.addEventListener('DOMContentLoaded', ()=>{
  const habilidades = document.querySelectorAll('#habilidades li');
  habilidades.forEach(hab=>{
    hab.addEventListener('mouseover', ()=> hab.style.transform = 'scale(1.05)');
    hab.addEventListener('mouseout', ()=> hab.style.transform = 'scale(1)');
  });
});
