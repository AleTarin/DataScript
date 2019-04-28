class variableTable {
  constructor()  {
    this.varTable  = {};
    this.memTable  = {};

    this.size = 0;
  }

  set({key, type, index, value, S1, LS1, LS2}) {
    if(key)
      this.varTable[key] = { key, type, index, S1, LS1, LS2, value};
    this.memTable[index] = {key, value};
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

  errorHandler (e) {
    console.error(e);
    process.exit();
  }

  print () {
    console.log("Tabla de variables:", JSON.stringify(this.varTable))
  }

  clear () {
    this.varTable = {};
    this.memTable = {};
  }

}
exports.variableTable = variableTable;
