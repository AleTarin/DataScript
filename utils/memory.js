var variableTable = require('./varTable.js').variableTable;
var dirFun = require('./dirFun.js').dirFun;

class Memory {
  constructor(     
    scope = 'global',
    gi = 0,
    gf = 2500,
    gs = 5000,
    gb = 7500,

    li = 10000,
    lf = 12500,
    ls = 15000,
    lb = 17500,

    ci = 20000,
    cf = 22500,
    cs = 25000,
    cb = 27500)  {
    this.scope =  scope;

    this.varTables = {
      global: new variableTable(),
      local: new variableTable(),
      const: new variableTable(),
      pointer: new variableTable()
    }

    this.Gi = gi;
    this.Gf = gf;
    this.Gs = gs;
    this.Gb = gb;

    this.Li = li;
    this.Lf = lf;
    this.Ls = ls;
    this.Lb = lb;
    
    this.Ci = ci;
    this.Cf = cf;
    this.Cs = cs;
    this.Cb = cb;

    this.size = cs + gf;

    this.dirFun = new dirFun();
  }

  /**
   * Funcion que añade una variable con sus datos a memoria virtual
   * Calcula sus parametros para variables dimensionadas
   * @param {string} key Nombre de la variable
   * @param {int}   type Código del tipo de variable
   * @param {string} sc  Scope de memoria donde alocar la variable
   * @param {any} value Valor de la variable
   * @param {array} dims Array de dimensiones, default de 1   
   * @returns {int} Retorna el indice de la variable en memoria  
   */
  set({key, type, sc, value, dims: [D1 = 1, D2 = 1] = []}) {
    let scope = sc || this.scope; 
    let memory = 0;
    let R = D1 * D2;
    switch (scope) {
      case 'global':
        switch (type) {
          case 0:
            memory = this.Gi;
            this.Gi += R;
          break;
          case 1:
            memory = this.Gf;
            this.Gf += R;
          break;
          case 2:
            memory = this.Gs;
            this.Gs += R;
          break;
          case 3:
            memory = this.Gb;
            this.Gb += R;
          break;
        } 
      break;
      case 'local':
        switch (type) {
          case 0:
            memory = this.Li;
            this.Li += R;
          break;
          case 1:
            memory = this.Lf;
            this.Lf += R;
          break;
          case 2:
            memory = this.Ls;
            this.Ls += R;
          break;
          case 3:
            memory = this.Lb;
            this.Lb += R;
          break;
        }
      break;
      case 'const':
        switch (type) {
          case 0:
            memory = this.Ci;
            this.Ci += R;
          break;
          case 1:
            memory = this.Cf;
            this.Cf += R;
          break;
          case 2:
            memory = this.Cs;
            this.Cs += R;
          break;
          case 3:
            memory = this.Cb;
            this.Cb += R;
          break;
        }
      break;
    }
      
    this.varTables[scope].set({key, type, scope, index:memory, value, R, D1, D2});
    return memory;
  }

  /**
   * Funcion que retorna las variables en memoria de existir
   * @param {string} KEY 
   * @returns {object} Variable
   */
  get(KEY) {
    return this.varTables[this.scope].get(KEY) || this.varTables.global.get(KEY)
  }
  
    /**
   * Funcion que retorna las variables en memoria de existir, solo para memoria local
   * @param {string} KEY 
   * @returns {object} Variable
   */
  getLocal(KEY) {
    return this.varTables.local.get(KEY)
  }

    /**
   * Funcion que retorna las variables en memoria de existir, puedes pasar un scope especifico, sino busca en todas las tablas de variable.
   * @param {string} KEY 
   * @param {string} scope
   * @returns {object} Variable
   */
  exists(KEY, scope){
    if (scope){
      return this.varTables[scope].get(KEY);
    } else {
      return this.varTables.global.get(KEY) || this.varTables.local.get(KEY) || this.varTables.const.get(KEY);
    }
  }
  
  /**
   * Funcion para establecer el scope de la memoria
   * @param {string} scope 
   */
  setScope(scope) {
    this.scope = scope;
  }

/**
 * Funciones de acceso para el directorio de funciones
 */
  getFunc(ID) { return this.dirFun.getFunc(ID);}
  addCurrFunParams(param) { this.dirFun.addCurrFunParams(param) }
  setCurrentFunc(name) {this.dirFun.setCurrentFunc(name)}
  setCurrFunType(TYPE) { this.dirFun.setCurrFunType(TYPE);}
  setCurrFunParams(paramCount) { this.dirFun.setCurrFunParams(paramCount) }
  setCurrFunVars(varCount){ this.dirFun.setCurrFunVars(varCount) }
  setCurrFunQuads(quadsCount){   this.dirFun.setCurrFunQuads(quadsCount) }

  /**
   * Funcion que añade una nueva funcion al directorio de memoria, de hacerlo cambia el scope a local y renueva la memoria local
   * @param {string} ID 
   */
  addFunction(ID) {
    if(this.dirFun.addFunction(ID)) {
      this.setScope('local');
      this.varTables['local'].clear();
    }
  }

  /**
   * Funcion que al terminar una función, renueva la memoria local y cambia a memoria global.
   */
  deleteFunction() {
    this.varTables['local'] = new variableTable();
    this.setScope('global');

    this.Li = 10000;
    this.Lf = 12500;
    this.Ls = 15000;
    this.Lb = 17500;
  }

  /**
   * Funcion de acceso a varTable de un scope especifico
   * @param {string} scope 
   */
  getTable(scope){
    return this.varTables[scope].getMemory();
  }

  /**
   * Funcion de acceso a dirFun
   */
  getDirFunc(){
    return this.dirFun;
  }

 /**
 * Función para imprimir la memoria, usada para pruebas 
 */
  print() {
    // console.log(this.dirFun)
    // console.log("Local:", this.varTables['local'])
    // console.log("Global:", this.varTables['global'])
    // console.log("Constants:", this.varTables['const'])
  }
}
exports.Memory = Memory;
