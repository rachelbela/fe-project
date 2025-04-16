export function createChatHistoryDB() {
  const dbName = "chatHistoryDB";
  const storeName = "messages";

  // Open the database
  const request = indexedDB.open(dbName, 1);

  request.onupgradeneeded = function (event) {
    const db = (event.target as IDBOpenDBRequest).result;
    if (!db.objectStoreNames.contains(storeName)) {
      db.createObjectStore(storeName, { keyPath: "id" });
    }
  };

  request.onsuccess = function () {
    console.log("Database opened successfully");
  };

  request.onerror = function (event) {
    console.error("Database error: ", event);
  };
}
export function addMessageToChatHistory(message: any) {
  const dbName = "chatHistoryDB";
  const storeName = "messages";

  // Open the database
  const request = indexedDB.open(dbName, 1);

  request.onsuccess = function (event) {
    const db = (event.target as IDBOpenDBRequest).result;
    const transaction = db.transaction(storeName, "readwrite");
    const objectStore = transaction.objectStore(storeName);

    // Check if the message already exists
    const getRequest = objectStore.get(message.id);
    getRequest.onsuccess = function () {
      if (getRequest.result) {
        // If the message exists, update it
        const updateRequest = objectStore.put(message);
        updateRequest.onsuccess = function () {
          console.log("Message updated in chat history");
        };
        updateRequest.onerror = function (event) {
          console.error("Error updating message: ", event);
        };
      } else {
        // If the message does not exist, add it
        const addRequest = objectStore.add(message);
        addRequest.onsuccess = function () {
          console.log("Message added to chat history");
        };
        addRequest.onerror = function (event) {
          console.error("Error adding message: ", event);
        };
      }
    };
    getRequest.onerror = function (event) {
      console.error("Error checking message existence: ", event);
    };
  };

  request.onerror = function (event) {
    console.error("Database error: ", event);
  };
}

export function getChatHistory(callback: (messages: any[]) => void) {
  const dbName = "chatHistoryDB";
  const storeName = "messages";

  // Open the database
  const request = indexedDB.open(dbName, 1);

  request.onsuccess = function (event) {
    const db = (event.target as IDBOpenDBRequest).result;
    const transaction = db.transaction(storeName, "readonly");
    const objectStore = transaction.objectStore(storeName);

    // Get all messages from the object store
    const getRequest = objectStore.getAll();

    getRequest.onsuccess = function () {
      console.log("Messages retrieved from chat history");
      callback(getRequest.result);
    };

    getRequest.onerror = function (event) {
      console.error("Error retrieving messages: ", event);
    };
  };

  request.onerror = function (event) {
    console.error("Database error: ", event);
  };
}

export function clearChatHistory() {
  const dbName = "chatHistoryDB";
  const storeName = "messages";

  // Open the database
  const request = indexedDB.open(dbName, 1);

  request.onsuccess = function (event) {
    const db = (event.target as IDBOpenDBRequest).result;
    const transaction = db.transaction(storeName, "readwrite");
    const objectStore = transaction.objectStore(storeName);

    // Clear the object store
    const clearRequest = objectStore.clear();

    clearRequest.onsuccess = function () {
      console.log("Chat history cleared");
    };

    clearRequest.onerror = function (event) {
      console.error("Error clearing chat history: ", event);
    };
  };

  request.onerror = function (event) {
    console.error("Database error: ", event);
  };
}
