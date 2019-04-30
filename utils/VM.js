class VM {
  constructor( quads, memory ) {
    this.activeRecord = [];
    this.quads = quads;
    this.localMem = {};
    this.globalMem = {};
    this.constMem = memory.getTable('const');
  }

  run() {
    try {
      while (this.quads.now()) {
        let [operator, left_op, right_op, result ] = this.quads.now();
        let memory_type_left = this.getMemoryType(left_op);
        let memory_type_right= this.getMemoryType(right_op);
        let memory_type_result = this.getMemoryType(result);
        let left_value, right_value, result_value;
        switch(operator) {
          case 0: // Suma
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
          case 3:
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
          case 4:
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
                throw 'Error: Left operator is not valid in sum'
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

            result_value = left_value % right_value;
            this.localMem[result] = result_value; 
          break;
          case 5: // Assign
          let memory;
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
              memory = this.globalMem;
            break;
            case 'Li':
            case 'Lf':
            case 'Ls':
            case 'Lb':
              memory = this.localMem;
            break;
            default:
              throw 'Error: variable is not valid in assignation'
          }
          memory[result] = left_value; 
          break;
          case 6:
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
          case 7:
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
          case 8:
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
          case 9:
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
          case 10:
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
          case 11:
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
          case 12:
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
            result_value = left_value > right_value;
            this.localMem[result] = result_value; 
          break;
          case 13:
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
          case 14:
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
            result_value = left_value || right_value;
            this.localMem[result] = result_value; 
          break;
          case 16:
            this.quads.goto(result);
          break;
          case 17:
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
          case 18:
          break;
          case 51:
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
                throw 'Error: Left operator is not valid in print'              
            }
            // PRINT DONT REMOVE
            console.log(left_value);
          break;
        }
        this.quads.next();
      }
    } catch (e) {
      console.error(e, this.quads.now());
      process.exit();
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
  }
}
exports.VM = VM;
