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
let currentProcedure;

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
  mm.setCurrFunType(7);
}

setFunType = TYPE => {
  mm.setCurrFunType(findType(TYPE))
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
      throw "PARAMS ERROR SET: Duplicated variable: " + ID;
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
      if (mm.getLocal(v.name))
        throw "ERROR: Duplicated variable: " + v.name;
      let index = mm.set({key: v.name, type: findType(TYPE)})
      mm.addCurrFunParams({key: v.name, type: findType(TYPE), index})
    })
    pVars = [];
  } catch (error) {
    console.error(error);
    process.exit();
  }
}

setType = TYPE => {
  try {
    Object.values(pVars).forEach( v => {
      mm.set({key: v.name, type: findType(TYPE), dims: v.dims})
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
      throw "ERROR: Duplicated variable: " + ID + pVars[ID];
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


setTable = ID => {
  varCount = 0;
  mm.addFunction(ID);
}

deleteFunction = _ => {
  mm.deleteFunction();
  mm.print();
  quads.push([18, null , null, null])
  // quads.endProcedure();
}

processReturn = _ => {
  quads.push([19, null, null, pOp[0]]);
}

setFunParams = _ => {
  mm.setCurrFunParams(paramCount);
  mm.setCurrFunVars(varCount);
  mm.setCurrFunQuads(quads.length());
  varCount = 0;
  paramCount = 0;
}

pushVar = ID => {
  try {
    const {type, index} = mm.get(ID) || {index: -1}
    if (index >= 0) {
      pTypes.push(type)
      pOp.push(index)
    } else {
      throw `ERROR VAR: Undefined variable ${ID}`
    }
  } catch (e){
    console.error(e);
    process.exit();
  }
}

pushArr = ID => {
  try {
    let S1_type = pTypes.pop();
    let S1 = pOp.pop();

    if(S1_type !== 0) {
      throw `ERROR ARRAY: ${ID} invalid dimension type`
    }
    const {type, index, D1} = mm.get(ID) || {index: -1}
    if (index >= 0) {

      if (D1 === 1) {
        throw `ERROR ARRAY: ${ID} is not an array`
      }

      let s1_val = mm.exists(S1).value;
      let key = `${ID}[${s1_val}]`;

      let pointer = mm.exists(key); 
      if (pointer === undefined) {
        pointer = mm.set({key,type, sc:'pointer'});
      } else {
        pointer = pointer.index;
      }

      let base    = mm.set({type: 0, sc:'const', value: index});
      quads.push([23   , S1, 0, D1 ]);
      quads.push([0, S1, base, pointer]);
      pTypes.push(type);
      pOp.push(pointer);
    } else {
      throw `ERROR ARRAY: Undefined variable ${ID}`
    }
  } catch (e){
    console.error(e);
    process.exit();
  }
}

pushMat = ID => {
  try {
    let S2_type = pTypes.pop();
    let S2 = pOp.pop();
    let S1_type = pTypes.pop();
    let S1 = pOp.pop();

    if(S1_type !== 0 || S2_type !== 0) {
      throw `ERROR MATRIX ${ID}, invalid dimension type`
    }
    const {type, index, D1, D2} = mm.get(ID) || {index: -1}
    if (index >= 0) {

      if (D1 === 1 && D2 === 1) {
        throw `ERROR MATRIX: ${ID} is not a matrix`
      }

      let s1_val = mm.exists(S1).value;
      let s2_val = mm.exists(S2).value;
      let key = `${ID}[${s1_val}][${s2_val}]`;

      let pointer = mm.exists(key); 
      if (pointer === undefined) {
        pointer = mm.set({key,type, sc:'pointer'});
      } else {
        pointer = pointer.index;
      }

      let temp    = mm.set({type: 0, sc:'local'});
      let temp2   = mm.set({type: 0, sc:'local'});
      let dim2    = mm.set({type: 0, sc:'const', value: D2});
      let base    = mm.set({type: 0, sc:'const', value: index});
      quads.push([23   , S1   , 0    , D1     ]);
      quads.push([2    , S2   ,  dim2, temp   ]);
      quads.push([23   , S2   , 0    , D2     ]);
      quads.push([0    , temp , S2   , temp2  ]);
      quads.push([0    , temp2, base , pointer]);
      pTypes.push(type)
      pOp.push(pointer)
    } else {
      throw `ERROR ARR: Undefined variable ${ID}`
    }
  } catch (e){
    console.error(e);
    process.exit();
  }
}

pushConst = (DATA, TYPE) => {
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
    let left_op = pOp.pop();
    let left_type = pTypes.pop();
    let result_type = findCube(left_type, right_type, 5);
    if (result_type === 6) throw `Type mismatch trying to assing in ${ID}`;
    quads.push([5, right_op ,null, left_op])
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
  pJumps.push(quads.length() - 1);
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
    currentProcedure = ID;
  } catch (error) {
    console.error(error);
    process.exit();
  }
}

pushERA         = _ => {
  quads.push([20, null ,null, currentProcedure]);
  paramCount = 0;
}

getArgument    = _ => {
  try {
    let arg = pOp.pop();
    pTypes.pop();
    let { paramTable } = mm.getFunc(currentProcedure);
    if(paramTable) {
      quads.push([22, arg, paramCount, currentProcedure]);
    }  
  } catch (e) {
    console.error(e);
    process.exit();
  }
}

nextArgument   = _ => {
  paramCount++;
}

pushGOSUB       = _ => {
  quads.push([21,null, null, currentProcedure]);
  // let { type } = mm.getFunc(currentProcedure)
  // let temp = mm.set({key:current, type, sc: 'local'});
  // pOp.push(temp);      
  // pTypes.push(type);
  // quads.push([5, current, null,temp])
}

pushPrint  = _ => {
  let arg = pOp.pop();
  pTypes.pop();
  quads.push([51, arg, null, null]);
}

pushReadLine = ID => {
  let arg = pOp.pop();
  pTypes.pop();
  let obj = mm.get(ID);
  if (obj) {
    quads.push([52, arg, null,  obj.index]);
  }
}

setMain = _ => {
  quads.main();
}

pushNative   = (ID, fnName, Op) => {
  try {
    let memory = mm.get(ID);
    if (memory){
      let temp = mm.set({type: 1, sc: 'local'});
      
      quads.push([Op,memory.index,memory.R,temp]);
      pOp.push(temp);        
      pTypes.push(1);   
    } else {
      throw `Error ${fnName}: ${ID} is not defined`
    }
  } catch (e) {
    console.error(e);
    process.exit();
  }
}


pushStdDev   = ID => {
  pushNative(ID, "STDEV", 30)
}
pushMax      = ID => {
  pushNative(ID, "MAX", 31);
}
pushMin      = ID => {
  pushNative(ID, "MIN", 32);
}
pushRange    = ID => {
  pushNative(ID, "RANGE", 33);
}
pushVariance = ID => {
  pushNative(ID, "VARIANCE", 34);
}
pushMean = ID => {
  pushNative(ID, "MEAN", 35);
}

exports.createDir      = createDir;
exports.deleteDir      = deleteDir;
exports.setName        = setName;
exports.setType        = setType;
exports.setVars        = setVars;
exports.setTable       = setTable;
exports.pushVar        = pushVar;
exports.pushArr        = pushArr;
exports.pushMat        = pushMat;
exports.pushConst      = pushConst;
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
exports.pushERA        = pushERA;
exports.getArgument    = getArgument;
exports.nextArgument   = nextArgument;
exports.pushGOSUB      = pushGOSUB;
exports.pushReadLine   = pushReadLine;
exports.pushPrint      = pushPrint;
exports.setMain        = setMain;
exports.setArr         = setArr;
exports.setMat         = setMat;
exports.processReturn  = processReturn;
exports.pushStdDev     = pushStdDev  ;
exports.pushMax        = pushMax     ;
exports.pushMin        = pushMin     ;
exports.pushRange      = pushRange   ;
exports.pushVariance   = pushVariance;
