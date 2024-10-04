export const fileToUint8Array = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      resolve(new Uint8Array(event.target.result)); 
    };
    reader.onerror = reject;
    reader.readAsArrayBuffer(file); 
  });
};
