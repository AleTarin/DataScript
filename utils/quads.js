class Quads {
  constructor(  ) {
    this.quads = [];
    this.current = 0;
  }

  push(quad) {
    this.quads.push(quad);
  }

  goto(index){
    this.current = index;
    return this.quads[index];
  }

  length() {
    return this.quads.length
  }

  fillJump(end, count){
    this.quads[end].splice(3, 1, count + 1)
  } 

  print() {
    this.quads.forEach((quad,index) => {
      console.log(index + 1 , quad)
    })
  }

}
exports.Quads = Quads;
