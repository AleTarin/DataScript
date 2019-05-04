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
      const: new variableTable()
    }

    this.intCount    = 0;
    this.floatCount  = 0;
    this.boolCount   = 0;
    this.stringCount = 0;

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

  set({key, type, sc, value, dims = []}) {
    let [memory, R, D1, D2] = [0,null,null,null];

    let scope = sc || this.scope; 

    if (dims && dims.length ) {
      if (dims.length === 1) {
        D1 = dims[0];
        R = D1;
        switch (scope) {
          case 'global':
            switch (type) {
              case 0:
                memory = this.Gi;
                this.Gi += D1;
                this.intCount += D1;
              break;
              case 1:
                memory = this.Gf;
                this.Gf += D1;
                this.floatCount += D1;
              break;
              case 2:
                memory = this.Gs;
                this.Gs += D1;
                this.stringCount += D1;
              break;
              case 3:
                memory = this.Gb;
                this.Gb += D1;
                this.boolCount += D1;
              break;
            } 
          break;
          case 'local':
            switch (type) {
              case 0:
                memory = this.Li;
                this.Li += D1;
                this.intCount += D1;
              break;
              case 1:
                memory = this.Lf;
                this.Lf += D1;
                this.floatCount += D1;
              break;
              case 2:
                memory = this.Ls;
                this.Ls += D1;
                this.stringCount += D1;
              break;
              case 3:
                memory = this.Lb;
                this.Lb += dims[0];
                this.boolCount += D1;
              break;
            }
          break;
          case 'const':
            switch (type) {
              case 0:
                memory = this.Ci;
                this.Ci += D1;
                this.intCount += D1;
              break;
              case 1:
                memory = this.Cf;
                this.Cf += D1;
                this.floatCount += D1;
              break;
              case 2:
                memory = this.Cs;
                this.Cs += D1;
                this.stringCount += D1;
              break;
              case 3:
                memory = this.Cb;
                this.Cb += D1;
                this.boolCount += D1;
              break;
            }
          break;
        }
      } 
      if (dims.length === 2) {
        R = (dims[0] * dims[1]);
        D1 = dims[0];
        D2 = dims[1];
        switch (scope) {
          case 'global':
            switch (type) {
              case 0:
                memory = this.Gi;
                this.Gi += R;
                this.intCount += R;
              break;
              case 1:
                memory = this.Gf;
                this.Gf += R;
                this.floatCount += R;
              break;
              case 2:
                memory = this.Gs;
                this.Gs += R;
                this.stringCount += R;
              break;
              case 3:
                memory = this.Gb;
                this.Gb += R;
                this.boolCount += R;
              break;
            } 
          break;
          case 'local':
            switch (type) {
              case 0:
                memory = this.Li;
                this.Li += R;
                this.intCount += R;
              break;
              case 1:
                memory = this.Lf;
                this.Lf += R;
                this.floatCount += R;
              break;
              case 2:
                memory = this.Ls;
                this.Ls += R;
                this.stringCount += R;
              break;
              case 3:
                memory = this.Lb;
                this.Lb += R;
                this.boolCount += R;
              break;
            }
          break;
          case 'const':
            switch (type) {
              case 0:
                memory = this.Ci;
                this.Ci += R;
                this.intCount += R;
              break;
              case 1:
                memory = this.Cf;
                this.Cf += R;
                this.floatCount += R;
              break;
              case 2:
                memory = this.Cs;
                this.Cs += R;
                this.stringCount += R;
              break;
              case 3:
                memory = this.Cb;
                this.Cb += R;
                this.boolCount += R;
              break;
            }
          break;
        }
      }
    } else {
      switch (scope) {
        case 'global':
          switch (type) {
            case 0:
              memory = this.Gi;
              this.Gi++;
              this.intCount++;
            break;
            case 1:
              memory = this.Gf;
              this.Gf++;
              this.floatCount++;
            break;
            case 2:
              memory = this.Gs;
              this.Gs++;
              this.stringCount++;
            break;
            case 3:
              memory = this.Gb;
              this.Gb++;
              this.boolCount++;
            break;
          } 
        break;
        case 'local':
          switch (type) {
            case 0:
              memory = this.Li;
              this.Li++;
              this.intCount++;
            break;
            case 1:
              memory = this.Lf;
              this.Lf++;
              this.floatCount++;
            break;
            case 2:
              memory = this.Ls;
              this.Ls++;
              this.stringCount++;
            break;
            case 3:
              memory = this.Lb;
              this.Lb++;
              this.boolCount++;
            break;
          }
        break;
        case 'const':
          switch (type) {
            case 0:
              memory = this.Ci;
              this.Ci++;
              this.intCount++;
            break;
            case 1:
              memory = this.Cf;
              this.Cf++;
              this.floatCount++;
            break;
            case 2:
              memory = this.Cs;
              this.Cs++;
              this.stringCount++;
            break;
            case 3:
              memory = this.Cb;
              this.Cb++;
              this.boolCount++;
            break;
          }
        break;
      }
    }
    this.varTables[scope].set({key, type, index:memory, value, R, D1, D2});
    return memory;
  }

  get(KEY) {
    return this.varTables[this.scope].get(KEY) || this.varTables.global.get(KEY)
  }

  getLocal(KEY) {
    return this.varTables.local.get(KEY)
  }
  
  setScope(scope) {
    this.scope = scope;
  }

  getFunc(ID) {
    return this.dirFun.getFunc(ID);
  }

  addCurrFunParams(param) { this.dirFun.addCurrFunParams(param) }
  setCurrentFunc(name) {this.dirFun.setCurrentFunc(name)}
  setCurrFunType(TYPE) {
    this.dirFun.setCurrFunType(TYPE); 
    if(TYPE != 'void') {
      var memory;
      switch (TYPE) {
        case 'int':
          memory = this.Gi;
          this.Gi++;
          this.intCount++;
        break;
        case 'float':
          memory = this.Gf;
          this.Gf++;
          this.floatCount++;
        break;
        case 'string':
          memory = this.Gs;
          this.Gs++;
          this.stringCount++;
        break;
        case 'bool':
          memory = this.Gb;
          this.Gb++;
          this.boolCount++;
        break;
      } 
      this.varTables['global'].set({key: 'return', type: TYPE, index: memory}); 
    }
  }
  setCurrFunParams(paramCount) { this.dirFun.setCurrFunParams(paramCount) }
  setCurrFunVars(varCount){ this.dirFun.setCurrFunVars(varCount) }
  setCurrFunQuads(quadsCount){   this.dirFun.setCurrFunQuads(quadsCount) }

  addFunction(ID) {
    if(this.dirFun.addFunction(ID)) {
      this.setScope('local');
      this.varTables['local'].clear();
    }
  }

  deleteFunction() {
    this.varTables['local'] = new variableTable();
    this.setScope('global');

    this.Li = 10000;
    this.Lf = 12500;
    this.Ls = 15000;
    this.Lb = 17500;
  }

  getTable(scope){
    return this.varTables[scope].getMemory();
  }

  getDirFunc(){
    return this.dirFun;
  }

  print() {
    console.log(this.dirFun)
    // console.log("Local:", this.varTables['local'])
    // console.log("Global:", this.varTables['global'])
    // console.log("Global:", this.varTables['const'])
  }
}
exports.Memory = Memory;
