
 export function base64toBlob(b64Data, extention = '') {
    const byteCharacters = atob(b64Data);
    const byteArrays = [];
    const contentType = getContentType(extention);
  
    for (let offset = 0; offset < byteCharacters.length; offset += 512) {
      const slice = byteCharacters.slice(offset, offset + 512);
      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
  
      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }
    return new Blob(byteArrays, { type: contentType });
  }
  
  export function getContentType(extention) {
    switch (extention.toLowerCase()) {
      case '.png':
        return 'image/png'
        break;
      case '.jpeg':
      case '.jpg':
        return 'image/jpeg'
        break;
      default:
        return 'octet/stream'
        break;
    }
  }
  
  export function saveByteArrayToFile(reportName, byte, type = "application/pdf") {
    var blob = new Blob([byte], { type });
    var link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    var fileName = reportName;
    link.download = fileName;
    link.click();
  }
  
  export function saveFile(url, fileName) {
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    link.click();
    // document.body.appendChild(link);
    // link.click();
    // document.body.removeChild(link);
  }
  
  
  export function base64ToArrayBuffer(base64) {
    var binaryString = window.atob(base64);
    var binaryLen = binaryString.length;
    var bytes = new Uint8Array(binaryLen);
    for (var i = 0; i < binaryLen; i++) {
      var ascii = binaryString.charCodeAt(i);
      bytes[i] = ascii;
    }
    return bytes;
  }
  