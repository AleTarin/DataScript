class HashTable {
  constructor(    
    size = 50000, 
    globals=1000,
    locals=6000,
    temporals=15000,
    constants=25000)  {

    this.dirFunc = { 
      global: {},
      local: {},
      temp: {},
      const: {}, 
      functions: {}
    };

    this.currentFunc = {};
    this.current = null;
    
    this.initialGlobal = globals;
    this.globalCount = globals;

    this.initialTemp = temporals;
    this.tempCount = temporals;

    this.initialConst = constants;
    this.constCount = constants;

    this.initialLocal = locals;
    this.localCount = locals;
    
    this.size = size;
  }

  getIndex(scope) {
    let index;
    switch (scope) {
      case 'var':
        if (this.currentFunc.name === 'global')
          index = this.globalCount++;
        else
          index = this.localCount++;
        break;
      case 'const':
        index = this.constCount++;
        break;
      case 'temp':
        index = this.tempCount++;
        break;
    }
    return index;
  }

  searchFromKey(key){
    return Object.values(this.dirFunc[this.currentFunc.name]).find(v => v.key === key);
  }
  
  set({key, type, scope='temp', value=undefined}) {
    let tableName =  scope ==='var' ? this.currentFunc.name : scope;
    let index = this.dirFunc[tableName][key];
    
    if(index === undefined){
      let obj = this.searchFromKey(key, tableName);
      index = obj && obj.index;
    }
    
    if(index === undefined) {
      index = this.getIndex(scope);
    }

    key = scope !== 'var' ? `${index}` : key;
    this.dirFunc[tableName][index] = {key, type, value, index};
    return index;
  }

  get(key) {
    return this.dirFunc[this.currentFunc.name][key] || this.searchFromKey(key);
  }

  getByIndex(index) { //?
    let data = this.dirFunc[this.currentFunc.name][index]
    if(index>initialTemp) delete this.dirFunc[this.currentFunc.name][index];
    return data;
  }

  setCurrentFuncName(name) {
    this.currentFunc.name = name;
  }

  setCurrentFuncType(type){
    this.currentFunc.type = type;
    if (this.current) this.dirFunc.functions[this.current].type = type;
  }

  setCurrentFuncParams(count) {
    if (this.current) this.dirFunc.functions[this.current].params = count;
  }

  setCurrentFuncVars(count) {
    if (this.current) this.dirFunc.functions[this.current].vars = count;
  }

  setCurrentFuncQuads(count) {
    if (this.current) this.dirFunc.functions[this.current].quad = count;
  }

  setCurrentFuncVars(count) {
    if (this.current) this.dirFunc.functions[this.current].vars = count;
  }

  getFuncParams(ID) {
    return this.dirFunc.functions[ID];
  }

  addCurrentFuncParams(param) {
    if (this.current){ 
      if (this.dirFunc.functions[this.current].paramTable)
        this.dirFunc.functions[this.current].paramTable[param.key] = param;
      else {
        this.dirFunc.functions[this.current].paramTable = {};
        this.dirFunc.functions[this.current].paramTable[param.key] = param;
      }
    }
  }

  addFunction(ID) {
    try {
      if (this.dirFunc.functions[ID]){
        throw "Error: duplicated function"
      } else {
        this.dirFunc.local = {};
        this.current = ID;
        this.dirFunc.functions[ID] = {}
        this.localCount = this.initialLocal;
        this.currentFunc.name = 'local';
      }
    } catch (e) {
      console.error(e);
      process.exit();
    }
  }

  getFunctions(){
    return this.dirFunc.functions;
  }

  deleteFunction() {
    // console.log(this.dirFunc['local'])
    delete this.dirFunc['local'];
    this.current = null;
    this.setCurrentFuncName('global');
  }
}
exports.HashTable = HashTable;
