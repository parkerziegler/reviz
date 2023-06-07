/**
 * Skeleton implementation taken from:
 * https://developer.chrome.com/docs/extensions/mv3/devtools/#content-script-to-devtools
 */
const connections: Record<number, chrome.runtime.Port> = {};

chrome.runtime.onConnect.addListener((port) => {
  const extensionListener = (message: { name: string; tabId: number }) => {
    // The original connection event doesn't include the tabId of the DevTools
    // page, so we need to send it explicitly.
    if (message.name === 'init') {
      connections[message.tabId] = port;
      return;
    }
  };

  port.onMessage.addListener(extensionListener);

  port.onDisconnect.addListener((port) => {
    // Remove the extension listener on port disconnect.
    port.onMessage.removeListener(extensionListener);

    // Delete the reference to the port in the connections object.
    const tabs = Object.keys(connections).map((id) => +id);

    for (let i = 0, len = tabs.length; i < len; i++) {
      if (connections[tabs[i]] === port) {
        delete connections[tabs[i]];
        break;
      }
    }
  });
});

// When we receive a message from the content script, forward it to the DevTools
// page to handle.
chrome.runtime.onMessage.addListener((request, sender) => {
  if (sender.tab) {
    const tabId = sender.tab.id;

    if (tabId && tabId in connections) {
      connections[tabId].postMessage(request);
    } else {
      console.log('Tab not found in connection list.');
    }
  } else {
    console.log('sender.tab not defined.');
  }

  return true;
});
