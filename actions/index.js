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

/**
 * Crea el objeto del programa
 */
createDir = _ => {
  p = { };
}

/**
 * Corre la máquina virtual con los cuadruplos y la memoria de compilación
 * Elimina las estructuras usadas en compilación. 
 */
deleteDir = _ => {
  quads.push(["end", null, null, null]);
  // mm.print();
  // quads.print();

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

/**
 * Funcion para guardar los nombres de variables 
 * Params: ID de variable a guardar
 */
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

/**
 * Funcion para guardar los nombres de variables de parametros
 * Params: ID de variable a guardar
 */
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

/**
 * Funcion que mete a memoria las variables en memoria junto con su tipo
 * Params: Tipo de las variables a guardar 
 */
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

/**
 * Funcion que mete a memoria los parametros en memoria junto con su tipo
 * Params: Tipo de las variables a guardar 
 */
setParamsType = TYPE => {
  try {
    Object.values(pVars).forEach( v => {
      if (mm.getLocal(v.name))
        throw "ERROR: Duplicated variable: " + v.name;
      let index = mm.set({key: v.name, type: findType(TYPE)});
      mm.addCurrFunParams({key: v.name, type: findType(TYPE), index})
    })
    pVars = [];
  } catch (error) {
    console.error(error);
    process.exit();
  }
}


/**
 * Funcion que guarda un arreglo con sus dimensiones en la pila de memoria.
 * Primero valida que la variable no haya sido definida en el scope.
 */
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

/**
 * Funcion que guarda una  matriz con sus dimensiones en la pila de memoria.
 * Primero valida que la variable no haya sido definida en el scope.
 */
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


/**
 * Añade la función al directorio de variables. Reinicia el contador de variables.
 */
setTable = ID => {
  varCount = 0;
  mm.addFunction(ID);
}

/**
 * Funcion que reestablece la memoria local y añade el cuadruplo ENDPROC
 */
deleteFunction = _ => {
  mm.deleteFunction();
  quads.push([18, null , null, null])
}

/**
 * Añade el cuadruplo de return a la pila de cuadruplos
 */
processReturn = _ => {
  quads.push([19, null, null, pOp[0]]);
}

/**
 * Establece guarda el contador de parametros, variables 
 * y el cuadruplo de la función en el directorío de funciones
 */
setFunParams = _ => {
  mm.setCurrFunParams(paramCount);
  mm.setCurrFunVars(varCount);
  mm.setCurrFunQuads(quads.length());
  varCount = 0;
  paramCount = 0;
}

/** 
 * Valida que la variable exista, si existe lo mete a stack de tipos y operadores
  */
pushVar = ID => {
  try {
    const {type, index} = mm.get(ID) || {index: -1};
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

/**
 * Función que valida que la variable exista y que sea dimensionado, 
 * si existe crea los cuádruplos para calcular la dirección 
 * del arreglo y mete el pointer a la pila de operadores con su tipo.
 */
pushArr = ID => {
  try {
    let S1_type = pTypes.pop();
    let S1 = pOp.pop();

    // Validar que la dimensión sea un integer
    if(S1_type !== 0) {
      throw `ERROR ARRAY: ${ID} invalid dimension type ${S1_type}`
    }

    // Validar que la variable exista y traer sus datos.
    const {type, index, D1} = mm.get(ID) || {index: -1}
    if (index >= 0) {
      //Validar que sea una variable dimensionada
      if (D1 === 1) {
        throw `ERROR ARRAY: ${ID} is not an array`
      }

      // Crear memoria para la temporal del array  y la base constante
      let pointer = mm.set({type, sc:'local'});
      let base    = mm.set({type: 0, sc:'const', value: index});
      // VER la dimension S1, si esta en el rango 0 al limite Superior
      quads.push([23   , S1, 0, D1 ]);
      // Sumar la dimension S1 a la base y guardarlo en un temporal
      quads.push([0, S1, base, pointer]);
      // Push del temporal y su tipo
      pTypes.push(type);
      pOp.push(`(${pointer})`);
    } else {
      throw `ERROR ARRAY: Undefined variable ${ID}`
    }
  } catch (e){
    console.error(e);
    process.exit();
  }
}

/**
 * Valida que la variable exista y que sea dimensionado, 
 * si existe crea los cuádruplos para calcular la dirección de la matriz y 
 * mete el pointer a la pila de operadores con su tipo.
 */
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

      // Crear dos temporales para operaciones y un temporal para el resultado
      let temp    = mm.set({type: 0, sc:'local'});
      let temp2   = mm.set({type: 0, sc:'local'});
      let pointer = mm.set({type, sc:'local'});

      // Crear direcciones para la dimensión D2 y la base
      let dim2    = mm.set({type: 0, sc:'const', value: D2});
      let base    = mm.set({type: 0, sc:'const', value: index});
      // Validar el rango para S1
      quads.push([23   , S1   , 0    , D1     ]);
      // S1 * d2
      quads.push([2    , S1   ,  dim2, temp   ]);
      // Validar el rango para S2
      quads.push([23   , S2   , 0    , D2     ]);
      // S1 * d2 + S2
      quads.push([0    , temp , S2   , temp2  ]);
      // S1 * d2 + S2 + Base
      quads.push([0    , temp2, base , pointer]);
      pTypes.push(type);
      pOp.push(`(${pointer})`);
    } else {
      throw `ERROR ARR: Undefined variable ${ID}`
    }
  } catch (e){
    console.error(e);
    process.exit();
  }
}

/** 
 * Función que mete a memoria 
 * y la pila de operadores una constante con su valor 
 */
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

/**
 * Funcion que mete el codigo de operacion de un operador a la pila de operadores
 */
poperPush = OP => {
  poper.push(findOp(OP));
}

/**
 * processExp:
 * Función que procesa una expresion 
 * si llega una operación lógica o aritmética que no sea AND o OR 
 * Genera el cuadruplo con el codigo del operador
 */
processExp = _ => {
  try {
    if (poper[0] >= 0 && poper[0] <= 13){
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

/**
 * Función que crea el el cuadruplo de asignación, 
 * validando previamente los tipos de las expresiones. 
 */
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

/**
 * processFactor:
 * Funcion que evalua las operaciones multiplicación, división o módulo
 * Genera el nuevo cuadruplo y mete el temporal con el resultado
 * en la pila de operadores y tipos.
 */
processFactor = _ => {
  try {
    if (poper[0] >= 2 && poper[0] <= 4){
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

/**
 * processTerm: Función que procesa un temino en una expresión
 * Si llega una suma, resta, división, multiplicación o modulo
 * Genera el nuevo cuadruplo y mete el temporal con el resultado
 * en la pila de operadores y tipos
 */
processTerm = _ => {
  try {
    if (poper[0] >= 0 && poper[0] <= 4){
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

/**
 * processHypExp: 
 * Función que procesa una expresión con AND ,OR,
 * Si llega AND, OR, o cualquier otra expresión lógica o aritmética
 * Valida los tipos, genera el cuadruplo y mete el resultado en
 * la pila de operadores y tipos
 */
processHypExp = _ => {
  try {
    if (poper[0] >= 0 && poper[0] <= 15){
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

/**
 * processCond
 * Función que procesa una condición a partir de una expresión
 * La expresión debe de ser de tipo booleano
 * De ser así, genera el cuadruplo con el resultado y mete el salto en la pila
 */
processCond = _ => {
  try {
    // Verificar que el tipo sea booleano, sino lanzar error
    if(pTypes.pop() !== 3 ) throw "Type mismatch, boolean expected in condition"
    else {
      // De ser booleano
      let temp = pOp.pop();
      // Crear cuadruplo con la temporal que se evalua e indefinido para el salto
      quads.push([17, temp ,null, undefined]);
      // Guardar el contador de quadruplos - 1
      pJumps.push(quads.length() - 1);
    }
  } catch (e) {
    console.error(e);
    process.exit();
  }
}

/**
 * Función que al termino de una condición, rellena el cuadruplo de salto
 */
endCond = _ => {
  let end = pJumps.pop();
  quads.fill(end, quads.length());
}

/**
 * processElse: 
 * Función que genera el cuadruplo de salto para un else
 * A la vez, mete el indice de cuadruplo actual a la pila de saltos
 * y rellena el cuadruplo del If anterior
 */
processElse = _ => {
  quads.push([16, null, null, undefined])
  let f = pJumps.pop();
  pJumps.push(quads.length() - 1);
  quads.fill(f, quads.length());
}

/**
 * Función que guarda el cuadruplo actual en la pila de saltos
 */
pushJump = _ => {
  pJumps.push(quads.length());
}

/**
 * Al principio del while, hacer lo mismo que la condición
 */
processWhile = _ => {
  processCond();
}
/**
 * Función que al final del while genera el GOTO de retorno al principio del ciclo
 * Y rellena a su vez el cuadruplo de salto al que se metio al principio del ciclo
 */
endWhile = _ => {
  let end = pJumps.pop();
  let ret = pJumps.pop();
  quads.push([16, null ,null, ret])
  quads.fill(end, quads.length());
}

/** Función que valida si una función ya existe al llamarla. 
 * Si existe, la pone como el procedimiento actual 
 * */
checkProcedure  = ID => {
  try {
    if(mm.getFunc(ID) === undefined) throw `Undefined function ${ID} called`;
    currentProcedure = ID;
  } catch (error) {
    console.error(error);
    process.exit();
  }
}

/**
 * Función que genera el código de operación ERA para el procedimiento actual
 */
pushERA         = _ => {
  quads.push([20, null ,null, currentProcedure]);
  paramCount = 0;
}

/**
 * Función que obtiene de un call un argumento, 
 * lo valida con la tabla de procedimientos y 
 * genera el cuadruplo de parametro 
 */
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

/**
 * Aumenta el paramCount
 */
nextArgument   = _ => {
  paramCount++;
}

/** Genera el cuadruplo de GOSUB para el procedimiento actual */
pushGOSUB       = _ => {
  quads.push([21,null, null, currentProcedure]);
}

/** Genera el cuadruplo de print para la expresión contenida */
pushPrint  = _ => {
  let arg = pOp.pop();
  pTypes.pop();
  quads.push([51, arg, null, null]);
}

/**
 * Función que genera el cuadruplo de lectura
 * Valida si la función destinada existe.
 */
pushReadLine = ID => {
  let arg = pOp.pop();
  pTypes.pop();
  let obj = mm.get(ID);
  if (obj) {
    quads.push([52, arg, null,  obj.index]);
  }
}

/** Función que establece el cuadruplo del main */
setMain = _ => {
  quads.main();
}

/**  
 * Funcion general para las funciones estadisticas basicas,
 * Las funciones estadisticas basicas son (Mean, Max, Min, Variance, Range, StDev)
 * Tiene los mismos parametros, por tanto se uso esta formula general
 * Params: ID: vector(numerico), nombre de la funcion, Operador
 * Usos:
 * pushStdDev  
 * pushMax      
 * pushMin      
 * pushRange    
 * pushVariance  
 * pushMean     
**/
pushStadistics   = (ID, fnName, Op) => {
  try {
    // Obtener de la memoria virtual el ID
    let memory = mm.get(ID);
    // Verificar que existe (undefined es considerado falso)
    if (memory){
      // Crear un nuevo temporal
      let temp = mm.set({type: 1, sc: 'local'});
      
      // Verificar que el ID 
      if (memory.type !== 0 && memory.type !== 1) 
        throw `Error ${fnName} only accepts an integer or float as parameter`;

      // Cuadruplo para guardar un vector como parametro: [SetVector, ID = index, tamaño = R, null] 
      quads.push([40, memory.index, memory.R, null])
      
      // Crear cuadruplo de operacion
      // [Codigo de operacion, ID = index , null, temporal a guardar] 
      quads.push([Op, memory.index, null    , temp]);
      
      // Guardar el indice de memoria y el tipo (todas las funciones estadisticas son float = 1)
      pOp.push(temp);        
      pTypes.push(1);
         
    } else { // Sino existe marcar un error y terminar el programa
      throw `Error ${fnName}: ${ID} is not defined`
    }
  } catch (e) {
    console.error(e);
    process.exit();
  }
}

/** Funcion general para las distribuciones normales PDF y CDF.
 * Params: ID: vector(numerico), nombre de funcion, Operador
 * Params indirectos: right_op (numerico)
 * Usos: 
 * pushNormPDF
 * pushNormCDF
*/
pushNormalDistributions = (ID, Op, fnName) => {
  try {
    // Obtener los valores de la variable de memoria
    let memory = mm.get(ID);
    if (memory){
      // Obtener la expresion a evaluar
      let right_op = pOp.pop();
      let right_type = pTypes.pop();

      // Evaluar los tipos de los parametros de la funcion, tienen que ser numbericos
      // Sino lanzar un error 
      if (right_type !== 0 && right_type !== 1) {
        throw `Error ${fnName}: primer parametro debe de ser un valor numerico`;
      }
      if (memory.type !== 0 && memory.type !== 1 || memory.R <= 1) {
        throw `Error ${fnName}: segundo parametro debe ser un vector de numeros`;
      }      
      // Crear variable temporal
      let temp = mm.set({type: 1, sc: 'local'});
      
      // Generar cuadruplo para guardar un vector como parametro: [SetVector, ID = index, tamaño = R, null] 
      quads.push([40, memory.index, memory.R, null]);
      // Generar cuadruplo propio de la operacion pasando el valor restante
      quads.push([Op, memory.index, right_op, temp]);

      // Meter el resultado a la pila de operandos y a la pila de tipos 1 = float
      pOp.push(temp);        
      pTypes.push(1);   
    } else {
      // Si el vecto no existe, marcar error
      throw `Error ${fnName}: ${ID} is not defined`
    }
  } catch (e) {
    console.error(e);
    process.exit();
  }
}

/** Funcion general para las distribuciones uniformes y binomiales.
 * Params: nombre de funcion, Operador
 * Params indirectos: tres expresiones (numericas)
 * Usos:
 * pushUniformPDF 
 * pushUniformCDF 
 * pushBinomialPDF
 * pushBinomialCDF
*/
pushDistributions = (Op, fnName) => {
  try {
    // Obtener las expresiones a evaluar
    let first_op = pOp.pop();
    let first_type = pTypes.pop();
    let second_op = pOp.pop();
    let second_type = pTypes.pop();
    let third_op = pOp.pop();
    let third_type = pTypes.pop();    

    // Evaluar los tipos de los parametros de la funcion, tienen que ser numbericos
    // Sino lanzar un error 
    if (first_type !== 0 && first_type !== 1) {
      throw `Error ${fnName} only accepts an integer or float at first parameter`
    }
    if (second_type !== 0 && second_type !== 1) {
      throw `Error ${fnName} only accepts an integer or float at second parameter`
    }
    if (third_type !== 0 && third_type !== 1) {
      throw `Error ${fnName} only accepts an integer or float at third parameter`
    }

    let temp = mm.set({type: 1, sc: 'local'});

    // Meter todos los parametros a memoria Op:39 => guarda parametros
    quads.push([39, null, null, first_op]);
    quads.push([39, null, null, second_op]);
    quads.push([39, null, null, third_op]);

    // Cuadruplo especifico de la distribucion con el temporal donde se guarda el resultado
    quads.push([Op, null, null, temp]);
    
    // Meter a la pila el resultado y su tipo (flotante)
    pOp.push(temp);        
    pTypes.push(1);   

  } catch (e) {
    console.error(e);
    process.exit();
  }
}

pushStdDev   = ID => pushStadistics(ID, "STDEV", 30);
pushMax      = ID => pushStadistics(ID, "MAX", 31);
pushMin      = ID => pushStadistics(ID, "MIN", 32);
pushRange    = ID => pushStadistics(ID, "RANGE", 33);
pushVariance = ID => pushStadistics(ID, "VARIANCE", 34);
pushMean     = ID => pushStadistics(ID, "MEAN", 35);

pushNormPDF  = ID => pushNormalDistributions(ID, 41, "dNormPdf");
pushNormCDF  = ID => pushNormalDistributions(ID, 42, "dNormCdf");
pushUniformPDF = _ => pushDistributions( 43, "dUniformPdf");
pushUniformCDF = _ => pushDistributions( 44, "dUniformCdf");
pushBinomialPDF = _ => pushDistributions( 45, "dBinomialPdf");
pushBinomialCDF = _ => pushDistributions( 46, "dBinomialCdf");

/** Funcion general para las distribuciones uniformes y binomiales.
 * Params: Series: Vector<number>, Label: Vector<number>, nombre de funcion
 * Params indirectos: expresion numerica
 * Usos:
 * pushLinePlot
 * pushBarPlot 
*/
Plot = (X,Y, fnName) => {
  try {
    // Obtener los vectores para series y labels
    let series = mm.get(X);
    let labels = mm.get(Y);

    // Evaluar si los dos existen
    if (series && labels){
    // Obtener la expresion a evaluar
    let third_op = pOp.pop();
    let third_type = pTypes.pop();   
    let four_op = pOp.pop();
    let four_type = pTypes.pop();    
    let five_op = pOp.pop();
    let five_type = pTypes.pop();     

    //  Evaluar las dos variables que deben de ser vectores (R > 1) y numericos 
    //  Y evaluar la tercera expresion que sea string, contiene el nombre del archivo 
    if (series.type !== 0 && series.type !== 1 || series.R <= 1) {
      throw `Error ${fnName} only accepts an integer or float at first parameter`
    }
    if (labels.type !== 0 && labels.type !== 1 && labels.type !== 2 || labels.R <= 1) {
      throw `Error ${fnName} only accepts an integer or float at second parameter`
    }
    if (third_type !== 2) {
      throw `Error ${fnName} only accepts an integer or float at third parameter`
    }

    if (four_type !== 2) {
      throw `Error ${fnName} only accepts an integer or float at third parameter`
    }

    if (five_type !== 2) {
      throw `Error ${fnName} only accepts an integer or float at third parameter`
    }

    // Crear un temporal
    let temp = mm.set({type: 1, sc: 'local'});

    // Cuadruplos para meter los dos vectores como parametros

    quads.push([40, series.index, series.R, null]);
    quads.push([40, labels.index, labels.R, null]);

    // Cuadruplo para meter el tercer parametro
    quads.push([39, null, null, third_op]);
    quads.push([39, null, null, four_op]);
    quads.push([39, null, null, five_op]);

    // Cuadruplo para graficas
    quads.push([47, null, null, fnName]);

    // Meter a la pila el resultado y su tipo (flotante)
    pOp.push(temp);        
    pTypes.push(1);   

    } else { // Sino marcar error
      throw `Error ${fnName}: ${X} or ${Y} is not defined`
    }
  } catch (e) {
    console.error(e);
    process.exit();
  }
}
pushLinePlot = (series,labels) => Plot(series, labels, 'line');
pushBarPlot = (series,labels) => Plot(series, labels, 'bar');

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
exports.pushNormPDF    = pushNormPDF ;
exports.pushUniformPDF = pushUniformPDF;