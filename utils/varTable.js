class variableTable {
  constructor()  {
    this.varTable  = {};
    this.memTable  = {};

    this.size = 0;
  }

  /**
   * Función que guarda en memoria una variable con sus valores
   * Maneja dos arreglos asociativos, uno cuya llave es el nombre de la variable 
   * y otra donde la llave es la dirección de memoria para facilitar la busqueda.
   * @param {string} key
   * @param {int} type
   * @param {any} value
   * @param {int} R
   * @param {int} D1
   * @param {int} D2  
   */
  set({key, type, index, value, R, D1, D2}) {
    if(key !== undefined) this.varTable[key] = { key, type, index, R, D1, D2, value};
    if(index !== undefined) this.memTable[index] = { key, type, index, R, D1, D2, value};
    this.size++;
  }

  /**
   * Busca si existe una variable a partir de su llave
   * @param {string} key 
   * @returns bool
   */
  exists(key){
    return key && !!this.varTable[key] || !!this.memTable[key];
  }

  /**
   * Si existe una variable, devuelve el valor de la misma
   * @param {string} key
   * @returns object 
   */
  get(key) {
    if (this.exists(key)) return this.varTable[key] || this.memTable[key];
  }

  /**
   * Retorna la tabla de memoria
   * @returns object
   */
  getMemory(){
    return this.memTable;
  }

  /**
   * Limpia la tabla de variables y de memoria
   */
  clear () {
    this.varTable = {};
    this.memTable = {};
  }

}
exports.variableTable = variableTable;
