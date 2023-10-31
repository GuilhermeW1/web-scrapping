export function getDataFromLine(line ,numOfElements) {
        //i dont need the right cause the right is the index
      let counterElements = 0;
      let limiter = 0; 
      let start = 0;
      

      for(let i = 0; i < line.length; i++){
        if(line.charAt(i) == '>' ){
          counterElements += 1;
        }

        if(line.charAt(i) == '<'){
          limiter += 1;
        }
        
        if(counterElements === numOfElements && start === 0){
          start = i;
        }

        if(counterElements === numOfElements && limiter === numOfElements + 1){ // +1 to get the next open tag <> '<' />
          const res = line.toString().slice(start + 1, i);
          return res;
        }
      }
}