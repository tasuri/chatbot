var chatInputs = document.getElementsByClassName('chatbot-text');
var content;

var messages = [];

function addMessage(text, src, from) {
  if(from === "user") {
    messages.push({"message": text, "actor": "user"});
  } else {
    messages.push({"message": text, "actor": "bot"});
  }
  updateMessageView(messages[messages.length-1]);
}

function updateMessageView(msg) {

}


document.getElementById("chatbot-close").addEventListener('click', function() {
  document.getElementById('chatbot-display').classList.add('hidden');
})

var host = 'http://test-felix.werbewind-dev1.com'
var httpReq = null;

function sendMessage(msg, depth) {
  httpReq = new XMLHttpRequest();
  if(httpReq) {
    httpReq.open('GET', host + "?depth=" + depth + "&message=" + msg, true);
    httpReq.onreadystatechange = function() {
      if(httpReq.readyState === 4) {
        console.log(httpReq.response);
      }
    }
    httpReq.send(null);
  }
}

var depth = 1;
Array.from(document.getElementsByClassName('chatbot-message')).forEach(function(msg) {
  msg.addEventListener('click', function() {
    sendMessage(this.innerText, depth);
    depth++;
  })
});