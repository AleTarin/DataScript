var prompt = require('prompt-sync')();
class VM {
  constructor( quads, memory ) {
    this.activeRecord = [];    
    this.fnRecord = [];
    this.quads = quads;
    this.localMem = {};
    this.globalMem = {};
    this.constMem = memory.getTable('const');
    this.pointerMem = {};
    this.dirFunc = memory.getDirFunc();
  }

  run() {
    try {
      var auxMemory, fnName, t;


      while (this.quads.now()) {
        var memory, left_value, right_value, result_value;
        var memory_type_left, memory_type_right, memory_type_result;
        var [operator, left_op, right_op, result ] = this.quads.now();
        // var memory_type_left = this.getMemoryType(left_op);
        // var memory_type_right= this.getMemoryType(right_op);
        // var memory_type_result = this.getMemoryType(result);

        // this.checkifpointer(result);

        // console.log(this.quads.now())

        switch(operator) {
          case 0: // Suma
            left_op = this.checkifpointer(left_op);
            right_op = this.checkifpointer(right_op);

            memory_type_left = this.getMemoryType(left_op);
            memory_type_right= this.getMemoryType(right_op);

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
          case 2: // Mult
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
          case 4: // MODULE
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
            case 'Pt':
              this.pointerMem[result] = left_op;
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
          case 13:
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
          case 15:
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
          case 16:
            this.quads.goto(result);
          break;
          case 17:
            left_op = this.checkifpointer(left_op);
            memory_type_left = this.getMemoryType(left_op);
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
            if (!left_value){
              this.quads.goto(result - 1);
            } 
          break;
          case 18: // ENDPROC
            this.quads.goto(this.quads.getSaved()+1);
            this.localMem = this.activeRecord.pop();
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
            this.activeRecord.push(this.localMem)
            this.fnRecord.push(result);
            this.localMem = auxMemory;
            this.quads.save(this.quads.getCurrent());
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
            let paramTable = this.dirFunc.getFunc(result).paramTable;
            let param = paramTable[right_op];
            if (param.type !== t){
              throw `Invalid parameter #${right_op} in ${result} call, expecting type ${param.type}, got ${t}`
            }

            auxMemory[param.index] = left_value; 

          break;
          case 23: // VER (VERIFICAR RANGO DE ARRAYS)
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

            if (left_value < right_op || left_value >= result ) {
              throw 'Error: Array index out of range'
            }

          break;
          case 51:
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
            // PRINT DONT REMOVE
            console.log(left_value);
          break;
          case 52:
            left_op = this.checkifpointer(left_op);
            result = this.checkifpointer(right_op);

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
                throw 'Error: variable is not valid in print'
            }

              var ans = prompt(`>> ${left_value} `);
              memory[result] = ans;
          break;
        }
        this.quads.next();
      }
    } catch (e) {
      console.error(e);
      process.exit();
    }
  }

  checkifpointer(op) {
    if(op >= 30000 && this.pointerMem[op]) {
      return this.pointerMem[op];
    } else {
      return op;
    } 
  }

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
    if(op>=30000)               return 'Pt'
  }
}
exports.VM = VM;
