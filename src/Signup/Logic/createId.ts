export function createIdUser(): string {
  let id = '';
  while (id.length <8){
    let i = Math.round(Math.random() *10)
    if(i===10){
      i=0
    }
    id += i
  }
  return id;
}
