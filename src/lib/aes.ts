export const LoadWasm = async function (): Promise<void> {
  const goWasm = new window.Go();
  const result = await WebAssembly.instantiateStreaming(
    fetch("/main.wasm"),
    goWasm.importObject
  );
  goWasm.run(result.instance);
};

function goEncrypt(plaintext: string) {
  return new Promise<any>((resolve) => {
    if (window.goEncrypt == undefined) {
      LoadWasm().then(() => {
        const res = window.goEncrypt(plaintext);
        resolve(res);
      });
    } else {
      const res = window.goEncrypt(plaintext);
      resolve(res);
    }
  });
}

function goDecrypt(ciphertext: string) {
  return new Promise<any>((resolve) => {
    if (window.goDecrypt == undefined) {
      LoadWasm().then(() => {
        const res = window.goDecrypt(ciphertext);
        resolve(res);
      });
    } else {
      const res = window.goDecrypt(ciphertext);
      resolve(res);
    }
  });
}

//加密
export const AesEncryptGCM = async (data: string): Promise<string> => {
  if (!data) {
    return "";
  }
  return await goEncrypt(data);
};

//解密
export async function AesDecryptGCM(encryptData: string): Promise<any> {
  if (!encryptData) {
    return "";
  }
  return await goDecrypt(encryptData);
}
