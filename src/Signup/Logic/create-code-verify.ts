export function createCodeVerify() {
  let codeVerify = '';
  while (codeVerify.length < 6) {
    let i = Math.round(Math.random() * 10);
    if (i === 10) {
      i = 0;
    }
    codeVerify += i;
  }
  return codeVerify;
}
