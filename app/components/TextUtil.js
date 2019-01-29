
export function TextUtil() {
  function isEmpty(text) {
    if (text === undefined){
      return true;
    }
    if (!text) {
      return true
    }
    if (text.length === 0){
      return true;
    }
    return false;
  }
  function pad(num, n ) {
    return Array(n>(''+num).length?(n-(''+num).length+1):0).join(0)+num;
  }
  return {
    isEmpty,
    pad,
  }

}
