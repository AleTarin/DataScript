var variableTable = require('./varTable.js').variableTable;
var dirFun = require('./dirFun.js').dirFun;

class Memory {
  constructor(     
    scope = 'global',
    gi = 0,
    gf = 2500,
    gb = 5000,
    gs = 7500,

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
      local: new variableTable()
    }

    this.intList    = [];
    this.floatList  = [];
    this.stringList = [];
    this.boolList   = [];

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
    let [memory, R, S1, D1, D2] = [0,0,0,0,0];

    let scope = sc || this.scope; 

    if (dims && dims.length ) {
      if (dims.length === 1) {
        D1 = dims[0];
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
        R = dims[0] * dims[1];
        S1 = (R / dims[0]);
        D1 = dims[0];
        D2 = dims[1];
        let Dm = dims[0] * dims[2];
        switch (scope) {
          case 'global':
            switch (type) {
              case 0:
                memory = this.Gi;
                this.Gi += Dm;
                this.intCount += Dm;
              break;
              case 1:
                memory = this.Gf;
                this.Gf += Dm;
                this.floatCount += Dm;
              break;
              case 2:
                memory = this.Gs;
                this.Gs += Dm;
                this.stringCount += Dm;
              break;
              case 3:
                memory = this.Gb;
                this.Gb += Dm;
                this.boolCount += Dm;
              break;
            } 
          break;
          case 'local':
            switch (type) {
              case 0:
                memory = this.Li;
                this.Li += Dm;
                this.intCount += Dm;
              break;
              case 1:
                memory = this.Lf;
                this.Lf += Dm;
                this.floatCount += Dm;
              break;
              case 2:
                memory = this.Ls;
                this.Ls += Dm;
                this.stringCount += Dm;
              break;
              case 3:
                memory = this.Lb;
                this.Lb += Dm;
                this.boolCount += Dm;
              break;
            }
          break;
          case 'const':
            switch (type) {
              case 0:
                memory = this.Ci;
                this.Ci += Dm;
                this.intCount += Dm;
              break;
              case 1:
                memory = this.Cf;
                this.Cf += Dm;
                this.floatCount += Dm;
              break;
              case 2:
                memory = this.Cs;
                this.Cs += Dm;
                this.stringCount += Dm;
              break;
              case 3:
                memory = this.Cb;
                this.Cb += Dm;
                this.boolCount += Dm;
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

    if (key) {
      switch (type) {
        case 0:
          this.intList.push(key)
        break;
        case 1:
          this.floatList.push(key)
        break;
        case 2:
          this.stringList.push(key)
        break;
        case 3:
          this.boolList.push(key)
        break;
      } 
    }
    this.varTables[this.scope].set({key, type, index:memory, value, S1, D1, D2});
    return memory;
  }

  get(KEY) {
    return this.varTables[this.scope].get(KEY)
  }
  
  setScope(scope) {
    this.scope = scope;
  }

  getFunc(ID) {
    return this.dirFun.getFunc(ID);
  }

  addCurrFunParams(param) { this.dirFun.addCurrFunParams(param) }
  setCurrentFunc(name) {this.dirFun.setCurrentFunc(name)}
  setCurrFunType(TYPE) { this.dirFun.setCurrFunType(TYPE) }
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
    this.print()
    this.varTables['local'] = new variableTable();
    this.setScope('global');
  }

  print() {
    // console.log(this.dirFun)
    // console.log("Local:", this.varTables['local'])
    // console.log("Global:", this.varTables['global'])
  }
}
exports.Memory = Memory;
