
class dirFun {
  constructor()  {
    this.dirFun = {};
    this.currFun = undefined;
  }

  setCurrentFunc(name) {
    this.currFun = name;
  }

  setCurrFunType(type){
    if (this.currFun) this.dirFun[this.currFun].type = type;
  }

  setCurrFunParams(count) {
    if (this.currFun) this.dirFun[this.currFun].params = count;
  }

  setCurrFunQuads(count) {
    if (this.currFun) this.dirFun[this.currFun].quad = count;
  }

  setCurrFunVars(count) {
    if (this.currFun) this.dirFun[this.currFun].vars = count;
  }

  getFunc(ID) {
    return this.dirFun[ID];
  }

  addCurrFunParams(param) {
    if (this.currFun){ 
      if (this.dirFun[this.currFun].paramTable)
        this.dirFun[this.currFun].paramTable[param.key] = param;
      else {
        this.dirFun[this.currFun].paramTable = {};
        this.dirFun[this.currFun].paramTable[param.key] = param;
      }
    }
  }

  addFunction(ID) {
    try {
      if (this.dirFun[ID]){
        throw "Error: duplicated function"
      } else {
        this.currFun = ID;
        this.dirFun[ID] = {};
        return true;
      }
    } catch (e) {
      console.error(e);
      process.exit();
    }
  }
}
exports.dirFun = dirFun;
