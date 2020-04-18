class Control {
  // Hard DOM functions
  constructor(parentNode, tagName, className, textContent) {
    const classNameV = className || '';
    const textContentV = textContent || '';
    const tagNameV = tagName || 'div';
    this.node = document.createElement(tagNameV);
    this.render(classNameV, textContentV);
    parentNode.appendChild(this.node);
  }

  destroy() {
    this.node.remove();
  }

  clear() {
    this.node.innerHTML = '';
  }

  // style and content functions
  render(className, textContent) {
    this.node.className = className;
    this.node.textContent = textContent;
  }

  setClass(className) {
    this.node.className = className;
  }

  hide() {
    this.node.style = 'display:none';
    //this.node.style = 'transform: translateX(-2000px)';
  }

  show() {
    this.node.style = '';
  }
  // own props functions
}



class ButtonEx extends Control{
  constructor(parentNode, className, textContent, togle, click){
    super(parentNode, 'div', className, textContent);
    this.state = false;
    this.disabled = false;
    this.checkClicked = false;
    this.togle = togle;
    this.basicClass = className;

    this.setClick(click);
  }

  setClick(click) {
    if (click) {
      this.click = click;

      this.node.addEventListener('mousedown', (e) => {
        e.preventDefault();
        if (!this.disabled && (e.buttons == 1)) {
          this.checkClicked = true;
          this.setClass(this.basicClass+' '+this.basicClass+'__down');
        }
      });
 
      this.node.addEventListener('mouseout', (e) => {
        if (!this.disabled) {
          this.checkClicked = false;
          if (this.state){
            this.setClass(this.basicClass+' '+this.basicClass+'__toggled');
          } else {
            this.setClass(this.basicClass);
          }
        }
      });

      this.node.addEventListener('mouseover', (e) => {
        if (!this.disabled) {
          if (!this.state){
            this.setClass(this.basicClass+' '+this.basicClass+'__hover');
          } else {
            this.setClass(this.basicClass+' '+this.basicClass+'__dover');
          }
        }
      });

      this.node.addEventListener('mouseup', (e) => {
        e.preventDefault();
        if (!this.disabled) {
          if (this.checkClicked){
            this.changeState();
            this.click();
          }
          this.checkClicked = false;
          if (!this.state){
            this.setClass(this.basicClass+' '+this.basicClass+'__hover');
          } else {
            this.setClass(this.basicClass+' '+this.basicClass+'__dover');
          }
        }
      });

    }
  }

  disable() {
    this.disabled = true;
  }

  changeState() {
    if (this.togle){
     this.state = !this.state;
    }
  }

}