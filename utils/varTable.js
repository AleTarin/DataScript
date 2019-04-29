class variableTable {
  constructor()  {
    this.varTable  = {};
    this.memTable  = {};

    this.size = 0;
  }

  set({key, type, index, value, R, D1, D2}) {
    if(key) this.varTable[key] = { key, type, index, R, D1, D2, value};
    if(index) this.memTable[index] = { key, type, index, R, D1, D2, value};
    this.size++;
  }

  exists(key){
    return key && !!this.varTable[key] || !!this.memTable[key];
  }

  get(key) {
    if (this.exists(key)) return this.varTable[key] || this.memTable[key];
  }

  getByIndex(index) {
    let key = this.memTable[index]
    return this.get(key);
  }

  setResult(index, value) {
    this.memTable[index] = {...this.memTable[index], value}
  }

  errorHandler (e) {
    console.error(e);
    process.exit();
  }

  print () {
    console.log("Tabla de variables:", JSON.stringify(this.varTable))
  }

  getMemory(){
    return this.memTable;
  }

  clear () {
    this.varTable = {};
    this.memTable = {};
  }

}
exports.variableTable = variableTable;
