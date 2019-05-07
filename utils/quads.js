class Quads {
  constructor(  ) {
    this.quads = [[16, null, null, undefined]];
    this.current = 0;
    this.saved = [];
    this.begin = undefined;
  }

  push(quad) {
    this.quads.push(quad);
  }

  getCurrent() {
    return this.current;
  }

  save(index) {
    index = index ? index : this.current;
    this.saved.push(index || this.current);
  }

  getSaved() {
    return this.saved.pop();
  }

  goto(index){
    this.current = index - 1;
    return this.quads[index];
  }
  
  next() {
    this.current++;
  }

  main(){
    this.quads[0].splice(3, 1, this.length());
  }

  gotoMain() {
    this.current = this.begin;
  }

  now() {
    return this.quads[this.current];
  }

  length() {
    return this.quads.length
  }

  endProcedure () {
    // this.quads.push([18, null , null, null])
  }

  fill(end, count){
    this.quads[end].splice(3, 1, count)
  } 

  print() {
    this.quads.forEach((quad,index) => {
      console.log(index + 1 , quad)
    })
  }

}
exports.Quads = Quads;
