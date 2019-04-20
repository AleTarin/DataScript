 class symbolTable {
  constructor() {
    this.table = new Map();
  }

  free(){
    this.table.clear();
  }

  insert(key, value, scope, type){
    this.table.set(key, {key, value, scope, type})
  }

  lookup(key){
    return this.table.get(key)
  }
}

exports.symbolTable = symbolTable;
