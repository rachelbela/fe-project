export function deliverMessage(msg: string) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(msg);
    }, 1000);
  });
}
