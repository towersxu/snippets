class User extends HTMLElement {
  static get observedAttributes() {
    return ['src'];
  }
  constructor () {
    super();
    const shadow = this.attachShadow({ mode: 'open'});

    const wrapper = document.createElement('div');
    wrapper.classList.add('wrapper');
    
    const img = document.createElement('img');
    img.setAttribute('src', this.getAttribute('src'));
    this.img = img;
    wrapper.appendChild(img);

    const slot = document.createElement('slot');
    slot.setAttribute('name', 'location')
    wrapper.appendChild(slot);
    
    const span = document.createElement('span');
    span.setAttribute('id', 'name');
    wrapper.appendChild(span);

    
  
    const style = document.createElement('style');
  
    style.textContent = `
      .wrapper {
        position: relative;
        width: 100px;
        padding:  10px;
        height: 130px;
        background: #efefef;
      }
      img {
        width: 100px;
        height: 100px;
      }
    `;
    shadow.appendChild(style);
    
    shadow.appendChild(wrapper);
  }
  connectedCallback () {
    console.log('connectedCallback')
  }
  disconnectedCallback () {
    console.log(1);
  }
  adoptedCallback () {
    console.log(2);
  }
  attributeChangedCallback(name, oldValue, newValue) {
    this.img.setAttribute('src', newValue)
  }
}

customElements.define('shadow-user', User);