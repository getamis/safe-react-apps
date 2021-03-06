export type Networks = "rinkeby" | "mainnet"
export interface SafeInfo {
  safeAddress: string;
  network: Networks;
  ethBalance: string;
}

export interface TransactionUpdate {
  txHash: string;
  status: string;
}

export interface SafeListeners {
  onSafeInfo: (info: SafeInfo) => any;
  onTransactionUpdate?: (txId: TransactionUpdate) => any;
}

const parentUrl = process.env.REACT_APP_PARENT_URL
  ? process.env.REACT_APP_PARENT_URL
  : "*";
let listeners: SafeListeners;

const operations = {
  SEND_TRANSACTIONS: "sendTransactions",
  GET_TRANSACTIONS: "getTransactions",
  ON_SAFE_INFO: "onSafeInfo",
  ON_TX_UPDATE: "onTransactionUpdate"
};

const onParentMessage = async ({ origin, data, ...rest }: MessageEvent) => {
  if (origin === window.origin) {
    return;
  }

  // if (origin !== parentUrl) {
  //   console.error(`Message from unknown origin: ${origin}`);
  //   return;
  // }

  if (!data || !data.messageId) {
    console.error("From Safe > No message id provided");
    return;
  }

  switch (data.messageId) {
    case operations.ON_SAFE_INFO: {
      console.info("From Safe > onSafeInfo");
      listeners.onSafeInfo({
        safeAddress: data.data.safeAddress,
        network: data.data.network.toLowerCase(),
        ethBalance: data.data.ethBalance
      });
      break;
    }
    case operations.ON_TX_UPDATE: {
      console.info("From Safe > onTransactionUpdate");
      if (listeners.onTransactionUpdate) {
        listeners.onTransactionUpdate({
          txHash: data.data.txHash,
          status: data.data.status
        });
      }
      break;
    }
    default: {
      console.warn(`From Safe > ERROR message unknown: ${data.messageId}`);
      break;
    }
  }
};

const sendMessageToParent = (messageId: string, data: any) => {
  window.parent.postMessage({ messageId, data }, parentUrl);
};

export function sendTransactions(txs: Array<any>) {
  sendMessageToParent(operations.SEND_TRANSACTIONS, txs);
}

export function addListeners({ ...allListeners }: SafeListeners) {
  listeners = { ...allListeners };
  window.addEventListener("message", onParentMessage);
}
