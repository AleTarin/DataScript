var prompt = require('prompt-sync')();
var jStat = require('jStat').jStat;
var http = require('http');
var fs = require('fs');
var generate = require('node-chartist');
const co = require('co');
const path = require('path');
 
class VM {
  constructor( quads, memory ) {
    this.activeRecord = [];    
    this.fnRecord     = [];
    this.paramStack   = [];
    this.localMem     = {};
    this.globalMem    = {};
    this.pointerMem   = {};
    this.quads        = quads;
    this.constMem     = memory.getTable('const');
    this.dirFunc      = memory.getDirFunc();
  }

  /**
   * Funcion que recorre los cuadruplos y ejecuta los codigos de operacion
   */
  run() {
    try {
      var auxMemory, fnName, t;

      // Mientras el cuadruplo sea "truthy", es decir, no sea indefinido
      while (this.quads.now()) {
        var memory, left_value, right_value, result_value;
        var memory_type_left, memory_type_right, memory_type_result;
        var vector;
        var x,a,b, series, labels, fileName;

        // Obtener los datos dentro del cuadruplo en cada iteración
        var [operator, left_op, right_op, result ] = this.quads.now();
        switch(operator) {
          case 0: // Suma
            // Si el operador izquierdo o el operador derecho son apuntadores, obtener la direccion dentro del apuntador
            left_op = this.checkifpointer(left_op);
            right_op = this.checkifpointer(right_op);

            // Obtener el tipo de memoria de cada elemento del cuadruplo
            memory_type_left = this.getMemoryType(left_op);
            memory_type_right= this.getMemoryType(right_op);
            memory_type_result = this.getMemoryType(result);

            switch(memory_type_left){
              case 'Gi':
              case 'Gf':
              case 'Gs':
                left_value = this.globalMem[left_op];
              break;
              case 'Li':
              case 'Lf': 
              case 'Ls':
                left_value = this.localMem[left_op];
              break;
              case 'Ci':
              case 'Cf': 
              case 'Cs':
                left_value = this.constMem[left_op].value;
              break;
              default:
                throw 'Error: Left operator is not valid in sum'
            }
            switch(memory_type_right){
              case 'Gi':
              case 'Gf':
              case 'Gs':
                right_value = this.globalMem[right_op];
              break;
              case 'Li':
              case 'Lf': 
              case 'Ls':
                right_value = this.localMem[right_op];
              break;
              case 'Ci':
              case 'Cf':
              case 'Cs':
                right_value = this.constMem[right_op].value;
              break;
              default:
                throw 'Error: Right operator is not valid in sum'
              }
            result_value = left_value + right_value;
            this.localMem[result] = result_value; 
            
            
          break;
          case 1: // Resta
            left_op = this.checkifpointer(left_op);
            right_op = this.checkifpointer(right_op);

            memory_type_left = this.getMemoryType(left_op);
            memory_type_right= this.getMemoryType(right_op);
            switch(memory_type_left){
              case 'Gi':
              case 'Gf':
                left_value = this.globalMem[left_op];
              break;
              case 'Li':
              case 'Lf': 
                left_value = this.localMem[left_op];
              break;
              case 'Ci':
              case 'Cf': 
                left_value = this.constMem[left_op].value;
              break;
              default:
                throw 'Error: Left operator is not valid in substraction'
            }
            switch(memory_type_right){
              case 'Gi':
              case 'Gf':
                right_value = this.globalMem[right_op];
              break;
              case 'Li':
              case 'Lf': 
                right_value = this.localMem[right_op];
              break;
              case 'Ci':
              case 'Cf':
                right_value = this.constMem[right_op].value;
              break;
              default:
                throw 'Error: Right operator is not valid in substration'
            }
            result_value = left_value - right_value;
            this.localMem[result] = result_value; 
          break;
          case 2: // Multiplicación
            left_op = this.checkifpointer(left_op);
            right_op = this.checkifpointer(right_op);
            
            memory_type_left = this.getMemoryType(left_op);
            memory_type_right= this.getMemoryType(right_op);
            switch(memory_type_left){
              case 'Gi':
              case 'Gf':
                left_value = this.globalMem[left_op];
              break;
              case 'Li':
              case 'Lf': 
                left_value = this.localMem[left_op];
              break;
              case 'Ci':
              case 'Cf': 
                left_value = this.constMem[left_op].value;
              break;
              default:
                throw 'Error: Left operator is not valid in multiplication'
            }
            switch(memory_type_right){
              case 'Gi':
              case 'Gf':
                right_value = this.globalMem[right_op];
              break;
              case 'Li':
              case 'Lf': 
                right_value = this.localMem[right_op];
              break;
              case 'Ci':
              case 'Cf':
                right_value = this.constMem[right_op].value;
              break;
              default:
                throw 'Error: Right operator is not valid in multiplication'
            }

            result_value = left_value * right_value;
            this.localMem[result] = result_value; 
          break;
          case 3: // Division
            left_op = this.checkifpointer(left_op);
            right_op = this.checkifpointer(right_op);

            memory_type_left = this.getMemoryType(left_op);
            memory_type_right= this.getMemoryType(right_op);
            switch(memory_type_left){
              case 'Gi':
              case 'Gf':
                left_value = this.globalMem[left_op];
              break;
              case 'Li':
              case 'Lf': 
                left_value = this.localMem[left_op];
              break;
              case 'Ci':
              case 'Cf': 
                left_value = this.constMem[left_op].value;
              break;
              default:
                throw 'Error: Left operator is not valid in division'
            }
            switch(memory_type_right){
              case 'Gi':
              case 'Gf':
                right_value = this.globalMem[right_op];
              break;
              case 'Li':
              case 'Lf': 
                right_value = this.localMem[right_op];
              break;
              case 'Ci':
              case 'Cf':
                right_value = this.constMem[right_op].value;
              break;
              default:
                throw 'Error: Right operator is not valid in division'
            }
            result_value = left_value / right_value;
            this.localMem[result] = result_value; 
          break;
          case 4: // Modulo
            left_op = this.checkifpointer(left_op);
            right_op = this.checkifpointer(right_op);

            memory_type_left = this.getMemoryType(left_op);
            memory_type_right= this.getMemoryType(right_op);
            switch(memory_type_left){
              case 'Gi':
              case 'Gf':
                left_value = this.globalMem[left_op];
              break;
              case 'Li':
              case 'Lf': 
                left_value = this.localMem[left_op];
              break;
              case 'Ci':
              case 'Cf': 
                left_value = this.constMem[left_op].value;
              break;
              default:
                throw 'Error: Left operator is not valid in module'
            }
            switch(memory_type_right){
              case 'Gi':
              case 'Gf':
                right_value = this.globalMem[right_op];
              break;
              case 'Li':
              case 'Lf': 
                right_value = this.localMem[right_op];
              break;
              case 'Ci':
              case 'Cf':
                right_value = this.constMem[right_op].value;
              break;
              default:
                throw 'Error: Right operator is not valid in module'
            }

            result_value = left_value % right_value;
            this.localMem[result] = result_value; 
          break;
          case 5: // Assign
          left_op = this.checkifpointer(left_op);
          result = this.checkifpointer(result);

          memory_type_left = this.getMemoryType(left_op);
          memory_type_result = this.getMemoryType(result);

          switch(memory_type_left){
            case 'Gi':
            case 'Gf':
            case 'Gs':
            case 'Gb':
              left_value = this.globalMem[left_op];
            break;
            case 'Li':
            case 'Lf':
            case 'Ls':
            case 'Lb':
              left_value = this.localMem[left_op];
            break;
            case 'Ci':
            case 'Cf':
            case 'Cs':
            case 'Cb':
              left_value = this.constMem[left_op].value;
            break;
            default:
              throw 'Error: operator is not valid in assignation'
          }

          // Dependiendo del resultado, asignar se asigna en cada tabla de memoria el valor izquierdo
          switch(memory_type_result){
            case 'Gi':
            case 'Gf':
            case 'Gs':
            case 'Gb':
              this.globalMem[result] = left_value;
            break;
            case 'Li':
            case 'Lf':
            case 'Ls':
            case 'Lb':
              this.localMem[result] = left_value;
            break;
            default:
              throw 'Error: variable is not valid in assignation'
          }
          break;
          case 6: // Deep Equal ===
            left_op = this.checkifpointer(left_op);
            right_op = this.checkifpointer(right_op);

            memory_type_left = this.getMemoryType(left_op);
            memory_type_right= this.getMemoryType(right_op);
            switch(memory_type_left){
              case 'Gi':
              case 'Gf':
              case 'Gs':
              case 'Gb':
                left_value = this.globalMem[left_op];
              break;
              case 'Li':
              case 'Lf': 
              case 'Ls':
              case 'Lb':
                left_value = this.localMem[left_op];
              break;
              case 'Ci':
              case 'Cf':
              case 'Cs':
              case 'Cb':
                left_value = this.constMem[left_op].value;
              break;
              default:
                throw 'Error: Left operator is not valid in ==='
            }
            switch(memory_type_right){
              case 'Gi':
              case 'Gf':
              case 'Gs':
              case 'Gb':
                right_value = this.globalMem[right_op];
              break;
              case 'Li':
              case 'Lf':
              case 'Ls':
              case 'Lb':
                right_value = this.localMem[right_op];
              break;
              case 'Ci':
              case 'Cf':
              case 'Cs':
              case 'Cb':
                right_value = this.constMem[right_op].value;
              break;
              default:
                throw 'Error: Right operator is not valid in ==='
            }

            result_value = left_value === right_value;
            this.localMem[result] = result_value; 
          break;
          case 7: // Equal
            left_op = this.checkifpointer(left_op);
            right_op = this.checkifpointer(right_op);

            memory_type_left = this.getMemoryType(left_op);
            memory_type_right= this.getMemoryType(right_op);
            switch(memory_type_left){
              case 'Gi':
              case 'Gf':
              case 'Gs':
              case 'Gb':
                left_value = this.globalMem[left_op];
              break;
              case 'Li':
              case 'Lf': 
              case 'Ls':
              case 'Lb':
                left_value = this.localMem[left_op];
              break;
              case 'Ci':
              case 'Cf':
              case 'Cs':
              case 'Cb':
                left_value = this.constMem[left_op].value;
              break;
              default:
                throw 'Error: Left operator is not valid in =='
            }
            switch(memory_type_right){
              case 'Gi':
              case 'Gf':
              case 'Gs':
              case 'Gb':
                right_value = this.globalMem[right_op];
              break;
              case 'Li':
              case 'Lf':
              case 'Ls':
              case 'Lb':
                right_value = this.localMem[right_op];
              break;
              case 'Ci':
              case 'Cf':
              case 'Cs':
              case 'Cb':
                right_value = this.constMem[right_op].value;
              break;
              default:
                throw 'Error: Right operator is not valid in =='
            }

            result_value = left_value == right_value;
            this.localMem[result] = result_value; 
          break;
          case 8: // Deep difference
            left_op = this.checkifpointer(left_op);
            right_op = this.checkifpointer(right_op);

            memory_type_left = this.getMemoryType(left_op);
            memory_type_right= this.getMemoryType(right_op);
            switch(memory_type_left){
              case 'Gi':
              case 'Gf':
              case 'Gs':
              case 'Gb':
                left_value = this.globalMem[left_op];
              break;
              case 'Li':
              case 'Lf': 
              case 'Ls':
              case 'Lb':
                left_value = this.localMem[left_op];
              break;
              case 'Ci':
              case 'Cf':
              case 'Cs':
              case 'Cb':
                left_value = this.constMem[left_op].value;
              break;
              default:
                throw 'Error: Left operator is not valid in !=='
            }
            switch(memory_type_right){
              case 'Gi':
              case 'Gf':
              case 'Gs':
              case 'Gb':
                right_value = this.globalMem[right_op];
              break;
              case 'Li':
              case 'Lf':
              case 'Ls':
              case 'Lb':
                right_value = this.localMem[right_op];
              break;
              case 'Ci':
              case 'Cf':
              case 'Cs':
              case 'Cb':
                right_value = this.constMem[right_op].value;
              break;
              default:
                throw 'Error: Right operator is not valid in !=='
            }
            result_value = left_value !== right_value;
            this.localMem[result] = result_value; 
          break;
          case 9: // Diference
            switch(memory_type_left){
              case 'Gi':
              case 'Gf':
              case 'Gs':
              case 'Gb':
                left_value = this.globalMem[left_op];
              break;
              case 'Li':
              case 'Lf': 
              case 'Ls':
              case 'Lb':
                left_value = this.localMem[left_op];
              break;
              case 'Ci':
              case 'Cf':
              case 'Cs':
              case 'Cb':
                left_value = this.constMem[left_op].value;
              break;
              default:
                throw 'Error: Left operator is not valid in !='
            }
            switch(memory_type_right){
              case 'Gi':
              case 'Gf':
              case 'Gs':
              case 'Gb':
                right_value = this.globalMem[right_op];
              break;
              case 'Li':
              case 'Lf':
              case 'Ls':
              case 'Lb':
                right_value = this.localMem[right_op];
              break;
              case 'Ci':
              case 'Cf':
              case 'Cs':
              case 'Cb':
                right_value = this.constMem[right_op].value;
              break;
              default:
                throw 'Error: Right operator is not valid in !='
            }
            result_value = left_value != right_value;
            this.localMem[result] = result_value; 
          break;
          case 10: // >
            left_op = this.checkifpointer(left_op);
            right_op = this.checkifpointer(right_op);

            memory_type_left = this.getMemoryType(left_op);
            memory_type_right= this.getMemoryType(right_op);
            switch(memory_type_left){
              case 'Gi':
              case 'Gf':
                left_value = this.globalMem[left_op];
              break;
              case 'Li':
              case 'Lf': 
                left_value = this.localMem[left_op];
              break;
              case 'Ci':
              case 'Cf':
                left_value = this.constMem[left_op].value;
              break;
              default:
                throw 'Error: Left operator is not valid in >'
            }
            switch(memory_type_right){
              case 'Gi':
              case 'Gf':
                right_value = this.globalMem[right_op];
              break;
              case 'Li':
              case 'Lf':
                right_value = this.localMem[right_op];
              break;
              case 'Ci':
              case 'Cf':
                right_value = this.constMem[right_op].value;
              break;
              default:
                throw 'Error: Right operator is not valid in >'
            }
            result_value = left_value > right_value;
            this.localMem[result] = result_value; 
          break;
          case 11: // >=
            left_op = this.checkifpointer(left_op);
            right_op = this.checkifpointer(right_op);

            memory_type_left = this.getMemoryType(left_op);
            memory_type_right= this.getMemoryType(right_op);
            switch(memory_type_left){
              case 'Gi':
              case 'Gf':
                left_value = this.globalMem[left_op];
              break;
              case 'Li':
              case 'Lf': 
                left_value = this.localMem[left_op];
              break;
              case 'Ci':
              case 'Cf':
                left_value = this.constMem[left_op].value;
              break;
              default:
                throw 'Error: Left operator is not valid in >='
            }
            switch(memory_type_right){
              case 'Gi':
              case 'Gf':
                right_value = this.globalMem[right_op];
              break;
              case 'Li':
              case 'Lf':
                right_value = this.localMem[right_op];
              break;
              case 'Ci':
              case 'Cf':
                right_value = this.constMem[right_op].value;
              break;
              default:
                throw 'Error: Right operator is not valid in >='
            }
            result_value = left_value >= right_value;
            this.localMem[result] = result_value; 
          break;
          case 12: // <
            left_op = this.checkifpointer(left_op);
            right_op = this.checkifpointer(right_op);

            memory_type_left = this.getMemoryType(left_op);
            memory_type_right= this.getMemoryType(right_op);
            switch(memory_type_left){
              case 'Gi':
              case 'Gf':
                left_value = this.globalMem[left_op];
              break;
              case 'Li':
              case 'Lf': 
                left_value = this.localMem[left_op];
              break;
              case 'Ci':
              case 'Cf':
                left_value = this.constMem[left_op].value;
              break;
              default:
                throw 'Error: Left operator is not valid in <'
            }
            switch(memory_type_right){
              case 'Gi':
              case 'Gf':
                right_value = this.globalMem[right_op];
              break;
              case 'Li':
              case 'Lf':
                right_value = this.localMem[right_op];
              break;
              case 'Ci':
              case 'Cf':
                right_value = this.constMem[right_op].value;
              break;
              default:
                throw 'Error: Right operator is not valid in <'
            }
            result_value = left_value < right_value;
            this.localMem[result] = result_value; 
          break;
          case 13: // <=
            left_op = this.checkifpointer(left_op);
            right_op = this.checkifpointer(right_op);

            memory_type_left = this.getMemoryType(left_op);
            memory_type_right= this.getMemoryType(right_op);
            switch(memory_type_left){
              case 'Gi':
              case 'Gf':
                left_value = this.globalMem[left_op];
              break;
              case 'Li':
              case 'Lf': 
                left_value = this.localMem[left_op];
              break;
              case 'Ci':
              case 'Cf':
                left_value = this.constMem[left_op].value;
              break;
              default:
                throw 'Error: Left operator is not valid in <='
            }
            switch(memory_type_right){
              case 'Gi':
              case 'Gf':
                right_value = this.globalMem[right_op];
              break;
              case 'Li':
              case 'Lf':
                right_value = this.localMem[right_op];
              break;
              case 'Ci':
              case 'Cf':
                right_value = this.constMem[right_op].value;
              break;
              default:
                throw 'Error: Right operator is not valid in <='
            }
            result_value = left_value <= right_value;
            this.localMem[result] = result_value; 
          break;
          case 14: // AND
            left_op = this.checkifpointer(left_op);
            right_op = this.checkifpointer(right_op);

            memory_type_left = this.getMemoryType(left_op);
            memory_type_right= this.getMemoryType(right_op);
            switch(memory_type_left){
              case 'Gb':
                left_value = this.globalMem[left_op];
              break;
              case 'Lb':
                left_value = this.localMem[left_op];
              break;
              case 'Cb':
                left_value = this.constMem[left_op].value;
              break;
              default:
                throw 'Error: Left operator is not valid in &&'
            }
            switch(memory_type_right){
              case 'Gb':
                right_value = this.globalMem[right_op];
              break;
              case 'Lb':
                right_value = this.localMem[right_op];
              break;
              case 'Cb':
                right_value = this.constMem[right_op].value;
              break;
              default:
                throw 'Error: Right operator is not valid in &&'
            }
            result_value = left_value && right_value;
            this.localMem[result] = result_value; 
          break;
          case 15: // || 
            left_op = this.checkifpointer(left_op);
            right_op = this.checkifpointer(right_op);

            memory_type_left = this.getMemoryType(left_op);
            memory_type_right= this.getMemoryType(right_op);
            switch(memory_type_left){
              case 'Gb':
                left_value = this.globalMem[left_op];
              break;
              case 'Lb':
                left_value = this.localMem[left_op];
              break;
              case 'Cb':
                left_value = this.constMem[left_op].value;
              break;
              default:
                throw 'Error: Left operator is not valid in ||'
            }
            switch(memory_type_right){
              case 'Gb':
                right_value = this.globalMem[right_op];
              break;
              case 'Lb':
                right_value = this.localMem[right_op];
              break;
              case 'Cb':
                right_value = this.constMem[right_op].value;
              break;
              default:
                throw 'Error: Right operator is not valid in ||'
            }
            result_value = left_value || right_value;
            this.localMem[result] = result_value; 
          break;
          case 16: // GOTO
            // Ir al indice del cuadruplo marcado por resultado
            this.quads.goto(result);
          break;
          case 17: // GOTOF
            // Obtener el quadruplo izquierdo y su tipo
            left_op = this.checkifpointer(left_op);
            memory_type_left = this.getMemoryType(left_op);

            // Dependiendo del tipo de memoria, sacar el valor de la pila correspondiente
            
            switch(memory_type_left){
              case 'Gb':
                left_value = this.globalMem[left_op];
              break;
              case 'Lb':
                left_value = this.localMem[left_op];
              break;
              case 'Cb':
                left_value = this.constMem[left_op].value;
              break;
              default:
                throw 'Error: Left operator is not valid in GOTO'
            }
            // Si es falso, ir al indice anterior del marcado en el cuadruplo 
            if (!left_value){
              this.quads.goto(result);
            } 
          break;
          case 18: // ENDPROC
            // Ir al siguiente quadruplo del guardado
            this.quads.goto(this.quads.getSaved()+1);
            // Sacar del active record la ultima memoria local alojada (regresar a función)
            this.localMem = this.activeRecord.pop();
            // Sacar el nombre de la función a la que se regresó
            fnName = this.fnRecord.pop();
          break;
          case 19: // RETURN
          result = this.checkifpointer(result);
          memory_type_result= this.getMemoryType(result);
          switch(memory_type_result){
            case 'Gi':
            case 'Gf':
            case 'Gs':
            case 'Gb':
              result_value = this.globalMem[result];
            break;
            case 'Li':
            case 'Lf': 
            case 'Ls':
            case 'Lb':
              result_value = this.localMem[result];
            break;
            case 'Ci':
            case 'Cf':
            case 'Cs':
            case 'Cb':
              result_value = this.constMem[result].value;
            break;
            default:
              throw 'Error: Invalid return expression'
          }
          var t;
          switch(memory_type_left[1]){
            case 'i':
              t = 0;
            break;
            case 'f':
              t = 1;
            break;
            case 's':
             t = 2;
            break;
            case 'b':
             t = 3
            break;
          }

          fnName = this.fnRecord.pop();
          let {type} = this.dirFunc.getFunc(fnName);
          
          if(type !== 7 && type !== t) {
            throw `Error different return type in ${fnName}, expecting type ${type} got ${t}`
          }

          this.quads.goto(this.quads.getSaved()+1);
          this.localMem = this.activeRecord.pop();
          this.localMem[fnName] = result_value;

          break;
          case 20: // ERA
            fnName = result;
            auxMemory = {};
          break;
          case 21: // GOSUB
            // Meter a memoria el nombre y memoria local
            this.activeRecord.push(this.localMem)
            this.fnRecord.push(result);
            this.localMem = auxMemory;

            // Guardar el cuadruplo de donde se esta llamando la función para regresar
            this.quads.save(this.quads.getCurrent());

            // Ir al cuadruplo donde empieza la función
            this.quads.goto(this.dirFunc.getFunc(result).quad);

          break;
          case 22: // PARAMETER
            left_op = this.checkifpointer(left_op);
            memory_type_left = this.getMemoryType(left_op);
            switch(memory_type_left){
              case 'Gi':
              case 'Gf':
              case 'Gs':
              case 'Gb':
                left_value = this.globalMem[left_op];
              break;
              case 'Li':
              case 'Lf':
              case 'Ls':
              case 'Lb':
                left_value = this.localMem[left_op];
              break;
              case 'Ci':
              case 'Cf':
              case 'Cs':
              case 'Cb':
                left_value = this.constMem[left_op].value;
              break;
              default:
                throw 'Error: operator is not valid in assignation'
            }

            switch(memory_type_left[1]){
              case 'i':
                t = 0;
              break;
              case 'f':
                t = 1;
              break;
              case 's':
               t = 2;
              break;
              case 'b':
               t = 3
              break;
            }
            // Obtener el parametro de la tabla de parametros
            let paramTable = this.dirFunc.getFunc(result).paramTable;
            let param = paramTable[right_op];
            
            // Si son de diferente tipo, marcar error
            if (param.type !== t){
              throw `Invalid parameter #${right_op} in ${result} call, expecting type ${param.type}, got ${t}`
            }

            // Sino meterlo a memoria local 
            auxMemory[param.index] = left_value; 

          break;
          case 23: // VER 
            memory_type_left = this.getMemoryType(left_op);
            switch(memory_type_left){
              case 'Gi':
                left_value = this.globalMem[left_op];
              break;
              case 'Li':
                left_value = this.localMem[left_op];
              break;
              case 'Ci':
                left_value = this.constMem[left_op].value;
              break;
              default:
                throw 'Error: dimensions should be integer'
            }
            // VERIFICAR RANGO DE ARRAYS
            if (left_value < right_op || left_value >= result ) {
              throw 'Error in array: index out of range'
            }

          break;
          case 30: //STDEV
            memory_type_result = this.getMemoryType(result);
            switch(memory_type_result){
              case 'Gi':
              case 'Gf':
              case 'Gs':
              case 'Gb':
                memory = this.globalMem;
              break;
              case 'Li':
              case 'Lf':
              case 'Ls':
              case 'Lb':
                memory = this.localMem;
              break;
            }
            // Obtener vector de datos
            vector = this.paramStack.pop();
            // Calcular la desviacion estandar y guardarla en memoria
            memory[result] = jStat.stdev(vector);
          break;
          case 31: // MAX
            memory_type_result = this.getMemoryType(result);
            switch(memory_type_result){
              case 'Gi':
              case 'Gf':
              case 'Gs':
              case 'Gb':
                memory = this.globalMem;
              break;
              case 'Li':
              case 'Lf':
              case 'Ls':
              case 'Lb':
                memory = this.localMem;
              break;
            }
            // Obtener vector de datos
            vector = this.paramStack.pop();
            // Buscar el maximo y guardarlo en memoria
            memory[result] = jStat.max(vector);
          break;
          case 32: // MIN
            memory_type_result = this.getMemoryType(result);
            switch(memory_type_result){
              case 'Gi':
              case 'Gf':
              case 'Gs':
              case 'Gb':
                memory = this.globalMem;
              break;
              case 'Li':
              case 'Lf':
              case 'Ls':
              case 'Lb':
                memory = this.localMem;
              break;
            }
            // Obtener vector de datos
            vector = this.paramStack.pop();
            // Buscar el minimo y guardarlo en memoria
            memory[result] = jStat.min(vector);
          break;
          case 33: //RANGE
            memory_type_result = this.getMemoryType(result);

            switch(memory_type_result){
              case 'Gi':
              case 'Gf':
              case 'Gs':
              case 'Gb':
                memory = this.globalMem;
              break;
              case 'Li':
              case 'Lf':
              case 'Ls':
              case 'Lb':
                memory = this.localMem;
              break;
            }
            vector = this.paramStack.pop();
            memory[result] = jStat.range(vector);
        break;
        case 34: //VARIANCE
          memory_type_result = this.getMemoryType(result);
          switch(memory_type_result){
            case 'Gi':
            case 'Gf':
            case 'Gs':
            case 'Gb':
              memory = this.globalMem;
            break;
            case 'Li':
            case 'Lf':
            case 'Ls':
            case 'Lb':
              memory = this.localMem;
            break;
          }
          vector = this.paramStack.pop();
          memory[result] = jStat.variance(vector);
        break;
        case 35: //MEAN
          memory_type_result = this.getMemoryType(result);
          switch(memory_type_result){
            case 'Gi':
            case 'Gf':
            case 'Gs':
            case 'Gb':
              memory = this.globalMem;
            break;
            case 'Li':
            case 'Lf':
            case 'Ls':
            case 'Lb':
              memory = this.localMem;
            break;
          }
          vector = this.paramStack.pop();
          memory[result] = jStat.mean(vector);
        break;
        case 39: //SETPARAM
          memory_type_result = this.getMemoryType(result);
          // Obtener valor de memoria
          switch(memory_type_result){
            case 'Gi':
            case 'Gf':
            case 'Gs':
            case 'Gb':
              result_value = this.globalMem[result];
            break;
            case 'Li':
            case 'Lf':
            case 'Ls':
            case 'Lb':
              result_value = this.localMem[result];
            break;
            case 'Ci':
            case 'Cf':
            case 'Cs':
            case 'Cb':
              result_value = this.constMem[result].value;
            break;
            default:
              throw 'Error: operator is not valid in param'
          }
          // Guardarlo en el stack de parametros
          this.paramStack.push(result_value);
        break;
        case 40: //SETVECTOR
          memory_type_left = this.getMemoryType(left_op);
          switch(memory_type_left){
            case 'Gi':
            case 'Gf':
            case 'Gs':
            case 'Gb':
              memory = this.globalMem
            break;
            case 'Li':
            case 'Lf':
            case 'Ls':
            case 'Lb':
              memory = this.localMem;
            break;
          }
          vector = [];

          //A partir de la direccion base y el tamaño de una variable dimensionada, 
          // obtener todos los datos y guardarlo en array
          for (let i = left_op; i < (right_op + left_op); i++) {
            let value = memory[i];
  
            value && vector.push(value);
          }
          // Meter el array en el vector de parametros
          this.paramStack.push(vector);
        break;
        case 41: //DNORMPDF
          memory_type_right = this.getMemoryType(right_op);
          memory_type_result = this.getMemoryType(result);
          switch(memory_type_right){
            case 'Gi':
            case 'Gf':
              right_value = this.globalMem[right_op];
            break;
            case 'Li':
            case 'Lf':
              right_value = this.localMem[right_op];
            break;
            case 'Ci':
            case 'Cf':
              right_value = this.constMem[right_op].value;
            break;
            default:
              throw 'Error: Function only accepts vectors of integers or floats'
          }

          switch(memory_type_result){
            case 'Gi':
            case 'Gf':
            case 'Gs':
            case 'Gb':
              memory = this.globalMem;
            break;
            case 'Li':
            case 'Lf':
            case 'Ls':
            case 'Lb':
              memory = this.localMem;
            break;
          }
          // Obtener el vector guardado en la pila
          vector = this.paramStack.pop();
          // Calcular la distribucion normal de ese vector
          memory[result] = jStat.normal.pdf(right_value, jStat.mean(vector), jStat.stdev(vector));
        break;
        case 42: // DNORMCDF
          memory_type_right = this.getMemoryType(right_op);
          memory_type_result = this.getMemoryType(result);
          switch(memory_type_right){
            case 'Gi':
            case 'Gf':
              right_value = this.globalMem[right_op];
            break;
            case 'Li':
            case 'Lf':
              right_value = this.localMem[right_op];
            break;
            case 'Ci':
            case 'Cf':
              right_value = this.constMem[right_op].value;
            break;
            default:
              throw 'Error: Function only accepts vectors of integers or floats'
          }

          switch(memory_type_result){
            case 'Gi':
            case 'Gf':
            case 'Gs':
            case 'Gb':
              memory = this.globalMem;
            break;
            case 'Li':
            case 'Lf':
            case 'Ls':
            case 'Lb':
              memory = this.localMem;
            break;
          }
          // Obtener el vector guardado en la pila
          vector = this.paramStack.pop();
          // Calcular la distribucion normal acumulada de ese vector
          memory[result] = jStat.normal.cdf(right_value, jStat.mean(vector), jStat.stdev(vector));
        break;
        case 43: // UNIFORM PDF
          //Obtenre los tres parametros de la pila
          x = this.paramStack.pop();
          a = this.paramStack.pop();
          b = this.paramStack.pop();
          memory_type_result = this.getMemoryType(result);

          switch(memory_type_result){
            case 'Gi':
            case 'Gf':
            case 'Gs':
            case 'Gb':
              memory = this.globalMem;
            break;
            case 'Li':
            case 'Lf':
            case 'Ls':
            case 'Lb':
              memory = this.localMem;
            break;
          }
          // Calcular la funcion de probabilidad uniforme
          memory[result] = jStat.uniform.pdf(x,a,b);
        break;
        case 44:
          x = this.paramStack.pop();
          a = this.paramStack.pop();
          b = this.paramStack.pop();
          memory_type_result = this.getMemoryType(result);

          switch(memory_type_result){
            case 'Gi':
            case 'Gf':
            case 'Gs':
            case 'Gb':
              memory = this.globalMem;
            break;
            case 'Li':
            case 'Lf':
            case 'Ls':
            case 'Lb':
              memory = this.localMem;
            break;
          }
          // Calcular la funcion de probabilidad uniforme acumulada
          memory[result] = jStat.uniform.cdf(x,a,b);
        break;
        case 45:
          x = this.paramStack.pop();
          a = this.paramStack.pop();
          b = this.paramStack.pop();
          memory_type_result = this.getMemoryType(result);

          switch(memory_type_result){
            case 'Gi':
            case 'Gf':
            case 'Gs':
            case 'Gb':
              memory = this.globalMem;
            break;
            case 'Li':
            case 'Lf':
            case 'Ls':
            case 'Lb':
              memory = this.localMem;
            break;
          }
          // Calcular la funcion de probabilidad binomial
          memory[result] = jStat.binomial.pdf(x,a,b);
        break;
        case 46:
          x = this.paramStack.pop();
          a = this.paramStack.pop();
          b = this.paramStack.pop();
          memory_type_result = this.getMemoryType(result);

          switch(memory_type_result){
            case 'Gi':
            case 'Gf':
            case 'Gs':
            case 'Gb':
              memory = this.globalMem;
            break;
            case 'Li':
            case 'Lf':
            case 'Ls':
            case 'Lb':
              memory = this.localMem;
            break;
          }
          // Calcular la funcion de probabilidad binomial acumulada
          memory[result] = jStat.binomial.cdf(x,a,b);
        break;
        case 47:
        // Obtener el archivo HTML, el vector de tags y los datos de los parametros
        fileName = this.paramStack.pop();
        labels = this.paramStack.pop();
        series = this.paramStack.pop();

        co(function * () {
          // Definir las opciones
          const options = {
            width: 1000,
            height: 500,
            axisX: { title: 'X Axis (units)' },
            axisY: { title: 'Y Axis (units)' }
          };
         
          // Definir los datos de la grafica
          const bar = yield generate(result, options, {
            labels,
            series: [{value: series}]
          });

          // Obtener los estilos de la grafica
          var css1 = fs.readFileSync(path.resolve(__dirname, '../node_modules/node-chartist/dist/main.css'), 'utf8');
          let css = `<style> ${css1} </style>`;
          let head = `<head>${css}</head> `;

          // Escribir en el archivo HTML el codigo de la grafica
          let handleRequest = (request, response) => {
            fs.readFile(fileName, null, function (error, data) {
                if (error) {
                    response.writeHead(404);
                    respone.write('File not found');
                } else {
                    response.write(head+bar);
                }
                response.end();
            });
          };
          //Correr el servidor con el archivo
          http.createServer(handleRequest).listen(8081);
          console.log("Chart runing on port 8081...");
        })
        break;
        case 51:
          // Verificar si es un pointer
          left_op = this.checkifpointer(left_op);
          memory_type_left = this.getMemoryType(left_op);
          switch(memory_type_left){
              case 'Gi':
              case 'Gf':
              case 'Gs':
              case 'Gb':
                left_value = this.globalMem[left_op];
              break;
              case 'Li':
              case 'Lf': 
              case 'Ls':
              case 'Lb':
                left_value = this.localMem[left_op];
              break;
              case 'Ci':
              case 'Cf':
              case 'Cs':
              case 'Cb':
                left_value = this.constMem[left_op].value;
              break;
              default:
                throw 'Error: operator is not valid in print'              
            }
            // PRINT, no remover
            console.log(left_value);
          break;
          case 52:
            left_op = this.checkifpointer(left_op);
            result = this.checkifpointer(result);

            memory_type_left = this.getMemoryType(left_op);
            memory_type_result = this.getMemoryType(result);

            switch(memory_type_left){
              case 'Gi':
              case 'Gf':
              case 'Gs':
              case 'Gb':
                left_value = this.globalMem[left_op];
              break;
              case 'Li':
              case 'Lf':
              case 'Ls':
              case 'Lb':
                left_value = this.localMem[left_op];
              break;
              case 'Ci':
              case 'Cf':
              case 'Cs':
              case 'Cb':
                left_value = this.constMem[left_op].value;
              break;
              default:
                throw 'Error: operator is not valid in input'
            }
            switch(memory_type_result){
              case 'Gi':
              case 'Gf':
              case 'Gs':
              case 'Gb':
                memory = this.globalMem;
              break;
              case 'Li':
              case 'Lf':
              case 'Ls':
              case 'Lb':
                memory = this.localMem;
              break;
              default:
                throw 'Error: variable is not valid in input'
            }

              // Llamar a la interfaz de entrada y guardar el resultado en memoria
              memory[result] =  prompt(`>> ${left_value} `);
          break;
        }
        // Pasar al siguiente cuadruplo
        this.quads.next();
      }
    } catch (e) {
      // En caso de error o que se acaben los cuadruplos, terminar el programa
      console.error(e);
      process.exit();
    }
  }

  /**
   * Funcion que determina una direccion de memoria es un apuntador, 
   * de ser asi, regresa la direccion de memoria a la que apunta
   * @param {int} op 
   * @returns Direccion de memoria
   */
  checkifpointer(op) {
    if(op[0] === '(') {
      return this.localMem[parseInt(op.slice(1,-1))];
    } else {
      return op;
    } 
  }

  /**
   * Obtener tipo de memoria a partir de los rangos de memoria 
   * @param {int} op 
   * @returns String con tipo de memoria
   */
  getMemoryType(op) {
    if(op>=0    && op < 2500)   return 'Gi'
    if(op>=2500 && op < 5000)   return 'Gf'
    if(op>=5000 && op < 7500)   return 'Gs'
    if(op>=7500 && op < 10000)  return 'Gb'

    if(op>=10000 && op < 12500) return 'Li'
    if(op>=12500 && op < 15000) return 'Lf'
    if(op>=15000 && op < 17500) return 'Ls'
    if(op>=17500 && op < 20000) return 'Lb'

    if(op>=20000 && op < 22500) return 'Ci'
    if(op>=22500 && op < 25000) return 'Cf'
    if(op>=25000 && op < 27500) return 'Cs'
    if(op>=27500 && op < 30000) return 'Cb'
  }
}
exports.VM = VM;
