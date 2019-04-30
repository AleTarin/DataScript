class Quads {
  constructor(  ) {
    this.quads = [];
    this.current = 0;
    this.saved = null;
    this.begin = 0;
  }

  push(quad) {
    this.quads.push(quad);
  }

  save() {
    this.saved = this.current;
  }

  goto(index){
    this.current = index - 1;
    return this.quads[index];
  }
  
  next() {
    this.current++;
  }

  main(){
    this.begin = this.current;
  }

  now() {
    return this.quads[this.current];
  }

  length() {
    return this.quads.length
  }

  endProcedure () {
    this.quads.push([18, this.saved , null, null])
  }

  fill(end, count){
    this.quads[end].splice(3, 1, count + 1)
  } 

  print() {
    this.quads.forEach((quad,index) => {
      console.log(index + 1 , quad)
    })
  }

}
exports.Quads = Quads;
