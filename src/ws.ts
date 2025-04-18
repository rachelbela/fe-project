type ObserverType = {
  type: string;
  callback: (event: MessageEvent) => void;
};

class SocketConnect {
  private url: string;
  private ws: WebSocket | undefined; //WebSocket实例
  private heartEnabled: boolean; //是否开启心跳
  private heartInterval = 10000; //心跳间隔时间
  private heartTimeout = 5000; //心跳超时时间
  private lockReconnect = false; //是否禁止重连
  private heartTimer: NodeJS.Timeout | undefined; //心跳定时器
  private serverTimer: NodeJS.Timeout | undefined; //服务器超时定时器
  private reconnectCount = 0; //重连次数
  private maxReconnectCount = 5; //最大重连次数
  private observers: ObserverType[] = []; //消息订阅者列表
  private waitingMessages: string[] = []; //待执行命令列表

  constructor(url = "ws://127.0.0.1:1024", heartEnabled = true) {
    this.url = url;
    this.heartEnabled = heartEnabled;

    this.connect();
  }

  //WebSocket连接
  connect() {
    this.ws = new WebSocket(this.url);

    this.ws.onopen = () => {
      this.reconnectCount = 0; // 重置重连次数
      this.heartEnabled && this.start(); // 开启心跳

      // 发送所有等待发送的信息
      const length = this.waitingMessages.length;
      for (let i = 0; i < length; ++i) {
        const message = this.waitingMessages.shift();
        this.send(message);
      }
    };

    this.ws.onclose = (event) => {
      console.log("WebSocket closed:", event);
      this.reconnect();
    };

    this.ws.onerror = (error) => {
      console.log("WebSocket error:", error);
      this.reconnect();
    };

    this.ws.onmessage = (event: MessageEvent) => {
      console.log("ws收到消息===", event);
      //收到心跳信息则重置心跳，收到其他信息则触发回调
      if (event.data === "pong") {
        this.start();
      } else {
        this.observers.forEach((observer) => {
          observer.callback(event.data);
        });
      }
    };
  }

  //发送信息
  send(message?: string) {
    if (message) {
      //发送信息时若WebSocket还未连接，则将信息放入待发送信息中等待连接成功后发送
      if (this.onReady() !== WebSocket.OPEN) {
        this.waitingMessages.push(message);
        return this;
      }
      console.log("客户端发送消息方法", message);

      this.ws && this.ws.send(message);
    }

    return this;
  }

  //订阅WebSocket信息
  onObserve(callback: (data: any) => void, type = "all") {
    const observer = { type, callback };
    this.observers.push(observer);

    return observer;
  }

  //取消订阅信息
  cancelObserve(cancelObserver: ObserverType) {
    this.observers.forEach((observer, index) => {
      if (cancelObserver === observer) {
        this.observers.splice(index, 1);
      }
    });
  }

  //开启心跳
  private start() {
    this.reset();

    this.heartTimer = setTimeout(() => {
      this.send("ping");

      //5秒钟还没有返回心跳信息，则认为连接断开，关闭WebSocket并重连
      this.serverTimer = setTimeout(() => {
        this.ws && this.ws.close();
      }, this.heartTimeout);
    }, this.heartInterval);
  }

  //重连
  private reconnect() {
    // 设置lockReconnect变量避免重复连接
    if (this.lockReconnect || this.reconnectCount >= this.maxReconnectCount)
      return;
    this.lockReconnect = true;

    this.reconnectCount++; //重连次数+1

    setTimeout(() => {
      this.connect();
      this.lockReconnect = false;
    }, 1000 * this.reconnectCount); //重连次数越多，延时越久
  }

  // 重置心跳定时器/服务超时定时器
  private reset() {
    this.heartTimer && clearTimeout(this.heartTimer);

    this.serverTimer && clearTimeout(this.serverTimer);
  }

  // WebSocket连接状态
  onReady() {
    return this.ws && this.ws.readyState;
  }
}

export default SocketConnect;
