/* eslint-disable @typescript-eslint/no-explicit-any */
declare global {
    export interface Window {
      Go: any;
      goEncrypt: (plaintext: string) => any;
      goDecrypt: (ciphertext: string) => any;
    }
  }
  export {};
