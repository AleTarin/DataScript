 class symbolTable {
  constructor() {
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

module.exports = symbolTable;

export function free(){
  this.table.clear();
}

export function insert(key, value, scope, type){
  this.table.set(key, {key, value, scope, type})
}

export function lookup(key){
  return this.table.get(key)
}