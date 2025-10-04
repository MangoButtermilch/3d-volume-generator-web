/// <reference lib="webworker" />

addEventListener('message',  async({ data }) => {

  postMessage(null);
});
