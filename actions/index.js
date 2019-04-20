 const hashTable = require('../utils/HashTable.js').HashTable;
const constants = require('../utils/constants.js');
const { findCube, findOp, findType } = constants;

var p = {
  varTable: {},
};

let pTypes   =  [];
let pOp      =  [];
let poper    =  [];
let quads    =  [];
let pVars    =  {};
let pJumps    = [];
let varCount = 0;
let paramCount = 0;
let current;

// 1 prog
createDir = _ => {
  p = { dirFunc: new hashTable()};
}

// 6 prog
deleteDir = _ => {
  quads.forEach((q,index) => {
    console.log(index + 1 , q)
  })
  // console.log(p.dirFunc);
  // console.log(p.dirFunc.getFunctions());
  delete p;
}

// 2 prog
setName = name => {
  p = {...p, name};
  p.dirFunc.setCurrentFuncName('global');
  p.dirFunc.setCurrentFuncType('void')
}

setFunType = TYPE => {
  p.dirFunc.setCurrentFuncType(TYPE)
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
      if (p.dirFunc.get(v.name))
        throw "ERROR: Duplicated variable: " + v.name;
      p.dirFunc.set({key: v.name, scope: 'var', type: findType(TYPE)})
      p.dirFunc.addCurrentFuncParams({key: v.name, type: findType(TYPE)})
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
      if (p.dirFunc.get(v.name))
        throw "ERROR: Duplicated variable: " + v.name;
      p.dirFunc.set({key: v.name, scope: 'var', type: findType(TYPE)})
    })
    pVars = [];
  } catch (error) {
    console.error(error);
    process.exit();
  }
}

setTable = ID => {
  varCount = 0;
  p.dirFunc.addFunction(ID);
}

deleteFunction = _ => {
  p.dirFunc.deleteFunction();
  quads.push([18, null , null, null])
}

setFunParams = _ => {
  p.dirFunc.setCurrentFuncParams(paramCount);
  p.dirFunc.setCurrentFuncVars(varCount);
  p.dirFunc.setCurrentFuncQuads(quads.length);
  varCount = 0;
  paramCount = 0;
}

addQuadVar = ID => {
  try {
    const {type, index} = p.dirFunc.get(ID) || {index: -1}
    //console.log( p.dirFunc[p.currentFun].get(ID));
    if (index >= 0) {
      pTypes.push(type)
      pOp.push(index)
      //console.log("Pila Operandos:", pOp, "Pila Types:", pTypes);
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
      DATA = DATA.substr(1).slice(0, -1); break;
    case 'bool':
      DATA = DATA === 'TRUE'; break
  }
  pTypes.push(findType(TYPE))
  pOp.push(p.dirFunc.set({type: findType(TYPE), scope:'const', value: DATA}))
  //console.log("Pila Operandos:", pOp, "Pila Types:", pTypes);
}

poperPush = OP => {
  poper.push(findOp(OP));
  //console.log("Pila Operadores:", poper);
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
        let temp = p.dirFunc.set({type: result_type, scope:'temp'});
        pOp.push(temp);        
        quads.push([operator, left_op , right_op, temp])
        pTypes.push(result_type);     
        //console.log("processExp",quads)   
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
    let item = p.dirFunc.get(ID);
    if (item === undefined) throw `Undeclared Variable ${ID}`;
    if (item.type !== right_type) throw `Type mismatch trying to assing in ${ID}`;
    quads.push([5, right_op ,null, item.index])
    //console.log("processAssign",quads)
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
        let temp = p.dirFunc.set({type: result_type, scope:'temp'});
        pOp.push(temp);        
        quads.push([operator, left_op , right_op, temp])
        pTypes.push(result_type);     
        //console.log("processFactor",quads)   
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
        let temp = p.dirFunc.set({type: result_type, scope:'temp'});
        pOp.push(temp);        
        // result <- AVAIL.next() WHEN CHANGED TO MEMORY NUMBER
        quads.push([operator, left_op, right_op, temp])
        pTypes.push(result_type);     
        //console.log("processTerm",quads)   
        // if operand in temporal space return it to AVAIL 
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
        let temp = p.dirFunc.set({type: result_type, scope:'temp'});
        pOp.push(temp);        
        quads.push([operator, left_op, right_op, temp])
        pTypes.push(result_type);     
        //console.log("processHypExp",quads)   
        // if operand in temporal space return it to AVAIL 
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
      quads.push([17, temp ,null,undefined]) // ??? temp or result
      pJumps.push(quads.length - 1);
      //console.log("QUADS:",quads, "JUMP:", pJumps);
    }
  } catch (e) {
    console.error(e);
    process.exit();
  }
}

endCond = _ => {
  let end = pJumps.pop();
  fillJump(end, quads.length);
}

fillJump = (end, cont) => {
  quads[end].splice(3, 1, cont + 1); 
  //console.log(quads);
}

processElse = _ => {
  quads.push([16, null, null, undefined])
  let f = pJumps.pop();
  pJumps.push(quads.length - 1)
  fillJump(f, quads.length);
}

pushJump = _ => {
  pJumps.push(quads.length);
}

processWhile = _ => {
  processCond();
}

endWhile = _ => {
  let end = pJumps.pop();
  let ret = pJumps.pop();
  quads.push([16, null ,null, ret])
  fillJump(end, quads.length);
}

checkProcedure  = ID => {
  try {
    if(p.dirFunc.getFunctions()[ID] === undefined) throw `Undefined function ${ID} called`;
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
    let { paramTable } = p.dirFunc.getFuncParams(current);
  
    if(paramTable) {
      let params = Object.values(paramTable);
      if (params[paramCount-1].type === argType) {
        quads.push(['PARAMETER', arg, paramCount, null]);
      }
    }  
  } catch (e) {

  }

}

nextArgument   = _ => {
  paramCount++;
}

genGOSUB       = _ => {
  // Verify that last paramaeter points to null 
  quads.push(['GOSUB', current, null, null]); // Intial address ? // Add return statement
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


