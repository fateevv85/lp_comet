if (!window.WebSocket) {
  alert('no WebSocket for you');
}

let webSocket = new WebSocket('ws://comet:8081');

document.getElementById('chat_form')
  .addEventListener('submit', function (event) {
    let textMessage = this.message.value;
    webSocket.send(textMessage);
    event.preventDefault();
    return false;
  });

webSocket.onmessage = function (event) {
  let data = event.data;
  let container = document.createElement('div');
  let textNode = document.createTextNode(data);
  container.appendChild(textNode);
  document.getElementById('root_chat').appendChild(container);
};