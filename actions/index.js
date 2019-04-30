const memory = require('../utils/memory.js').Memory;
const Quads = require('../utils/quads.js').Quads;
const VM = require('../utils/VM.js').VM;

const constants = require('../utils/constants.js');
const { findCube, findOp, findType } = constants;


var p = {};

let pTypes   =  [];
let pOp      =  [];
let poper    =  [];
let pVars    =  {};
let pJumps    = [];

let varCount = 0;
let paramCount = 0;
let current;

let quads =  new Quads();
let mm = new memory();


createDir = _ => {
  p = { };
}

deleteDir = _ => {
  mm.print()
  quads.print()
  let vm = new VM(quads, mm);
  vm.run();

  delete mm;
  delete quads;
  delete p;
}

setName = name => {
  p = {...p, name};
  mm.setScope('global');
  mm.setCurrFunType('void')
}

setFunType = TYPE => {
  mm.setCurrFunType(TYPE)
}

// 
setVars = ID => {
  try {
    if (pVars[ID]) {
      throw "ERROR: Duplicated variable: " + ID;
    } else {
      pVars[ID] = { name: ID };
      varCount++;
    }
  } catch (error) {
    console.error(error);
    process.exit();
  }
}

setParams = ID => {
  try {
    if (pVars[ID]) {
      throw "ERROR: Duplicated variable: " + ID;
    } else {
      pVars[ID] = { name: ID };
      paramCount++;
    }
  } catch (error) {
    console.error(error);
    process.exit();
  }
}

setParamsType = TYPE => {
  try {
    Object.values(pVars).forEach( v => {
      if (mm.get(v.name))
        throw "ERROR: Duplicated variable: " + v.name;
      mm.set({key: v.name, type: findType(TYPE)})
      mm.addCurrFunParams({key: v.name, type: findType(TYPE)})
    })
    pVars = [];
  } catch (error) {
    console.error(error);
    process.exit();
  }
}


setArr = (ID, D1) => {
  try {
    if (pVars[ID]) {
      throw "ERROR: Duplicated variable: " + ID;
    } else {
      pVars[ID] = { name: ID, dims:[parseInt(D1)] };
      varCount+=D1;
    }
  } catch (error) {
    console.error(error);
    process.exit();
  }
}

setMat = (ID, D1, D2) => {
  try {
    if (pVars[ID]) {
      throw "ERROR: Duplicated variable: " + ID;
    } else {
      pVars[ID] = { name: ID, dims:[parseInt(D1), parseInt(D2)] };
      varCount+=D1;
    }
  } catch (error) {
    console.error(error);
    process.exit();
  }
}

setType = TYPE => {
  try {
    Object.values(pVars).forEach( v => {
      if (mm.get(v.name))
        throw "ERROR: Duplicated variable: " + v.name;
      mm.set({key: v.name, type: findType(TYPE), dims: v.dims})
    })
    pVars = [];
  } catch (error) {
    console.error(error);
    process.exit();
  }
}

setTable = ID => {
  varCount = 0;
  mm.addFunction(ID);
}

deleteFunction = _ => {
  mm.deleteFunction();
  quads.endProcedure();
}

processReturn = _ => {
  quads.push(['RETURN', pOp[0], null, null]);
}

setFunParams = _ => {
  mm.setCurrFunParams(paramCount);
  mm.setCurrFunVars(varCount);
  mm.setCurrFunQuads(quads.length());
  varCount = 0;
  paramCount = 0;
}

addQuadVar = ID => {
  try {
    const {type, index} = mm.get(ID) || {index: -1}
    if (index >= 0) {
      pTypes.push(type)
      pOp.push(index)
    } else {
      throw `Undefined variable ${ID}`
    }
  } catch (e){
    console.error(e);
    process.exit();
  }

}

addQuadConst = (DATA, TYPE) => {
  switch(TYPE){
    case 'int':
      DATA = parseInt(DATA); break;
    case 'float':
      DATA = parseFloat(DATA); break;
    case 'string':
      DATA = DATA.substr(1).slice(0, -1);
      break;
    case 'bool':
      DATA = DATA === 'true'; break
  }
  pTypes.push(findType(TYPE))
  pOp.push(mm.set({type: findType(TYPE), sc:'const', value: DATA}))
}

poperPush = OP => {
  poper.push(findOp(OP));
}

processExp = _ => {
  try {
    if (poper[0] >= 6 && poper[0] <= 13){
      let right_op = pOp.pop();
      let right_type = pTypes.pop();
      let left_op = pOp.pop();
      let left_type = pTypes.pop();
      let operator = poper.pop();
      let result_type = findCube(left_type, right_type, operator);
      if (result_type == 6) {
        throw "Type mismatch in cond"
      } else {
        let temp = mm.set({type: result_type, sc:'local'});
        pOp.push(temp);        
        quads.push([operator, left_op , right_op, temp])
        pTypes.push(result_type);     
      }
    }
  } catch (error) {
    console.error(error);
    process.exit();
  }  
}

processAssign = ID => {
  try {
    let right_op = pOp.pop();
    let right_type = pTypes.pop();
    let item = mm.get(ID);
    if (item === undefined) throw `Undeclared Variable ${ID}`;
    let result_type = findCube(item.type, right_type, 5);
    if (result_type === 6) throw `Type mismatch trying to assing in ${ID}`;
    quads.push([5, right_op ,null, item.index])
  } catch (e) {
    console.error(e);
    process.exit();
  }
}

processFactor = _ => {
  try {
    if (poper[0] === 2 || poper[0] === 3 || poper[0] === 4){
      let right_op = pOp.pop();
      let right_type = pTypes.pop();
      let left_op = pOp.pop();
      let left_type = pTypes.pop();
      let operator = poper.pop();
      let result_type = findCube(left_type, right_type, operator);

      if (result_type == 6) {
        throw "Type mismatch in */%"
      } else {        
        let temp = mm.set({type: result_type, sc: 'local'});
        pOp.push(temp);        
        quads.push([operator, left_op , right_op, temp])
        pTypes.push(result_type);     
      }
    }
  } catch (error) {
    console.error(error);
    process.exit();
  }  
}

processTerm = _ => {
  try {
    if (poper[0] === 0 || poper[0] === 1){
      let right_op = pOp.pop();
      let right_type = pTypes.pop();
      let left_op = pOp.pop();
      let left_type = pTypes.pop();
      let operator = poper.pop();
      let result_type = findCube(left_type, right_type, operator);

      if (result_type == 6) {
        throw "Type mismatc in sum/res"
      } else {
        let temp = mm.set({type: result_type, sc: 'local'});
        pOp.push(temp);        
        quads.push([operator, left_op, right_op, temp])
        pTypes.push(result_type);     
      }
    }
  } catch (error) {
    console.error(error);
    process.exit();
  }
}

processHypExp = _ => {
  try {
    if (poper[0] === 14 || poper[0] === 15){
      let right_op = pOp.pop();
      let right_type = pTypes.pop();
      let left_op = pOp.pop();
      let left_type = pTypes.pop();
      let operator = poper.pop();
      let result_type = findCube(left_type, right_type, operator);
      if (result_type == 6) {
        throw `Type mismatch in and/or ${left_type}+${right_type} => ${result_type}`
      } else {
        let temp = mm.set({type: result_type, sc: 'local'});
        pOp.push(temp);        
        quads.push([operator, left_op, right_op, temp])
        pTypes.push(result_type);     
      }
    }
  } catch (error) {
    console.error(error);
    process.exit();
  }
}

processCond = _ => {
  try {
    if(pTypes.pop() !== 3 ) throw "Type mismatch, boolean expected in condition"
    else {
      let temp = pOp.pop();
      quads.push([17, temp ,null,undefined])
      pJumps.push(quads.length() - 1);
    }
  } catch (e) {
    console.error(e);
    process.exit();
  }
}

endCond = _ => {
  let end = pJumps.pop();
  fillJump(end, quads.length());
}

fillJump = (end, cont) => {
  quads.fill(end, cont)
}

processElse = _ => {
  quads.push([16, null, null, undefined])
  let f = pJumps.pop();
  pJumps.push(quads.length() - 1)
  fillJump(f, quads.length());
}

pushJump = _ => {
  pJumps.push(quads.length());
}

processWhile = _ => {
  processCond();
}

endWhile = _ => {
  let end = pJumps.pop();
  let ret = pJumps.pop();
  quads.push([16, null ,null, ret])
  fillJump(end, quads.length());
}

checkProcedure  = ID => {
  try {
    if(mm.getFunc(ID) === undefined) throw `Undefined function ${ID} called`;
    current = ID;
  } catch (error) {
    console.error(error);
    process.exit();
  }
}

genERA         = _ => {
  quads.push(['ERA', current ,null, null]);
  paramCount = 1;
}

getArgument    = _ => {
  try {
    let arg = pOp.pop();
    let argType = pTypes.pop();
    let { paramTable } = mm.getFunc(current);
    if(paramTable) {
      let params = Object.values(paramTable);
      if (params[paramCount-1].type === argType) {
        quads.push(['PARAMETER', arg, paramCount, null]);
      }
    }  
  } catch (e) {
    console.error(e);
    process.exit();
  }
}

nextArgument   = _ => {
  paramCount++;
}

genGOSUB       = _ => {
  quads.push(['GOSUB', current, null, null]);
}

processPrint  = _ => {
  let arg = pOp.pop();
  let argType = pTypes.pop();
  quads.push([51, arg, null, null]);
}

processReadLine = ID => {
  let arg = pOp.pop();
  let argType = pTypes.pop();
  let obj = mm.get(ID);
  if (obj) {
    quads.push([52, arg, null,  obj.index]);
  }
}

setMain = _ => {
  quads.main();
}


exports.createDir      = createDir;
exports.deleteDir      = deleteDir;
exports.setName        = setName;
exports.setType        = setType;
exports.setVars        = setVars;
exports.setTable       = setTable;
exports.addQuadVar     = addQuadVar;
exports.addQuadConst   = addQuadConst;
exports.poperPush      = poperPush;
exports.processTerm    = processTerm;
exports.processFactor  = processFactor;
exports.processAssign  = processAssign;
exports.processExp     = processExp;
exports.processHypExp  = processHypExp;
exports.processCond    = processCond;
exports.endCond        = endCond;
exports.processElse    = processElse;
exports.pushJump       = pushJump;
exports.processWhile   = processWhile;
exports.endWhile       = endWhile;
exports.setFunType     = setFunType;
exports.deleteFunction = deleteFunction;
exports.setFunParams   = setFunParams;
exports.setParams      = setParams;
exports.setParamsType  = setParamsType;
exports.checkProcedure = checkProcedure;
exports.genERA         = genERA;
exports.getArgument    = getArgument;
exports.nextArgument   = nextArgument;
exports.genGOSUB       = genGOSUB;
exports.processReadLine= processReadLine;
exports.processPrint   = processPrint;
exports.setMain        = setMain;
exports.setArr         = setArr;
exports.setMat         = setMat;
exports.processReturn  = processReturn;

