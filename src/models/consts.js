class Consts {
  constructor() {
  	//if(!Consts.consts) {
      this.width = 30; // TODO it's a real const now
      this.height = 20;
      this.scaleX = window.innerWidth / this.width;
      this.scaleY = window.innerHeight / this.height;
  	  this.margin = 1;

  	  Consts.consts = this;
  	//}

  	return Consts.consts;
  }
}

const consts = new Consts();
//Object.freeze(size);

export default consts;