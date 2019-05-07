class Quads {
  constructor(  ) {
    this.quads = [[16, null, null, undefined]];
    this.current = 0;
    this.saved = [];
  }

  /**
   * Añade un nuevo cuadruplo a la pila
   * @param {array} quad 
   */
  push(quad) {
    this.quads.push(quad);
  }

  /**
   * Obtiene el indice del arreglo presente
   */
  getCurrent() {
    return this.current;
  }

  /**
   * Guarda el indice de un arreglo en la pila de guardados
   * @param {int} index 
   */
  save(index) {
    index = index ? index : this.current;
    this.saved.push(index || this.current);
  }

  /**
   * Regresa el ultimo arreglo guardado
   */
  getSaved() {
    return this.saved.pop();
  }

  /**
   * Regresa el cuadruplo con el indice pasado, cambia el indice de los cuadruplos al nuevo indice
   * @param {int} index 
   */
  goto(index){
    this.current = index - 1;
    return this.quads[index];
  }
  
  /**
   * Aumenta la variable current, para ver el siguiente cuadruplo
   */
  next() {
    this.current++;
  }

  /** Rellena el primer cuadruplo (Main) con el valor actual de cuadruplos */
  main(){
    this.quads[0].splice(3, 1, this.length());
  }

  /**
   * Regresa el valor del cuadruplo actual
   */
  now() {
    return this.quads[this.current];
  }

  /**
   * Regresa el numero de cuadruplos
   */
  length() {
    return this.quads.length
  }

  /**
   * Usado en saltos, rellena el resultado del cuadruplo con el nuevo valor pasado
   * @param {int} end 
   * @param {int} count 
   */
  fill(end, count){
    this.quads[end].splice(3, 1, count)
  } 

  /**
   * Imprime todos los cuadruplos, usado en pruebas
   */
  print() {
    this.quads.forEach((quad,index) => {
      console.log(index + 1 , quad)
    })
  }

}
exports.Quads = Quads;
