
class dirFun {
  constructor()  {
    this.funcs = {};
    this.currFun = undefined;
  }

  setCurrentFunc(name) {
    this.currFun = name;
  }

  setCurrFunType(type){
    if (this.currFun) this.funcs[this.currFun].type = type;
  }

  setCurrFunParams(count) {
    if (this.currFun) this.funcs[this.currFun].params = count;
  }

  setCurrFunQuads(count) {
    if (this.currFun) this.funcs[this.currFun].quad = count;
  }

  setCurrFunVars(count) {
    if (this.currFun) this.funcs[this.currFun].vars = count;
  }

  getFunc(ID) {
    return this.funcs[ID];
  }

  addCurrFunParams(param) {
    if (this.currFun){ 
      if (this.funcs[this.currFun].paramTable)
        this.funcs[this.currFun].paramTable.push(param);
      else {
        this.funcs[this.currFun].paramTable = [];
        this.funcs[this.currFun].paramTable.push(param);
      }
    }
  }

  addFunction(ID) {
    try {
      if (this.funcs[ID]){
        throw "Error: duplicated function"
      } else {
        this.currFun = ID;
        this.funcs[ID] = {};
        return true;
      }
    } catch (e) {
      console.error(e);
      process.exit();
    }
  }
}
exports.dirFun = dirFun;
