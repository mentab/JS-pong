class Consts {
  constructor() {
  	//if(!Consts.consts) {
      this.scale = 20;
  	  this.width = window.innerWidth / this.scale;
  	  this.height = window.innerHeight / this.scale;
  	  this.margin = 1;

  	  Consts.consts = this;
  	//}

  	return Consts.consts;
  }
}

const consts = new Consts();
//Object.freeze(size);

export default consts;