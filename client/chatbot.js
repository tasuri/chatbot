var chatInputs = document.getElementsByClassName('chatbot-text');
var content;
var chatWindow = document.getElementById('chatbot-window');
var chatbotInput = document.getElementById('chatbot-input');
var chatMessageWindow = document.getElementById('chatbot-message-window');


var messages = [];

function addMessage(text, src, from) {
  if (from === "user") {
    messages.push({"message": text, "actor": "user"});
  } else {
    messages.push({"message": text, "actor": "bot"});
  }
  updateMessageView(messages[messages.length - 1]);
}

function updateMessageView(msg) {

}


document.getElementById("chatbot-close").addEventListener('click', function () {
  document.getElementById('chatbot').classList.add('hidden');
})

var host = 'http://test-felix.werbewind-dev1.com'
var httpReq = null;

function sendMessage(index) {
  httpReq = new XMLHttpRequest();
  if (httpReq) {
    httpReq.open('GET', host + "?index=" + index, true);
    httpReq.onreadystatechange = function () {
      if (httpReq.readyState === 4) {
        console.log(httpReq.response)
        addBotMessage(JSON.parse(httpReq.response));
        addUserMessage(JSON.parse(httpReq.response))
        scrollToBottom(chatMessageWindow);
      }
    }
    httpReq.send(null);
  }
}

sendMessage(1);

Array.from(document.getElementsByClassName('chatbot-message')).forEach(function (msg) {
  if (msg.classList.contains('option')) {
    msg.addEventListener('click', function () {

      sendMessage(this.getAttribute('data-index'));
      this.classList.remove('option');
      this.classList.add('user-message');
    })
  }
});


function addBotMessage(response) {
  var newBotMsg = document.createElement('div');
  newBotMsg.innerText = response['msg'];
  newBotMsg.classList.add('chatbot-message');
  newBotMsg.classList.add('bot-message');
  chatMessageWindow.appendChild(newBotMsg);
}
function addUserMessage(response) {
  var i = 0;
  response['answers'].forEach(function(answer) {
    var newAnswer = document.createElement('div');
    newAnswer.classList.add('chatbot-message');
    newAnswer.classList.add('option');
    newAnswer.setAttribute('data-index', answer['refID']);
    newAnswer.innerText = answer['msg'];
    newAnswer.addEventListener('click', function convertToUserMsg() {
      sendMessage(this.getAttribute('data-index'))
      this.classList.remove('option');
      Array.from(document.getElementsByClassName('option')).forEach(function(option) {
       option.remove();
      });
      this.classList.add('user-message');
      this.removeAttribute('style');
      this.removeEventListener('click', convertToUserMsg);
      this.remove();
      chatMessageWindow.appendChild(this);
    })
    chatbotInput.appendChild(newAnswer)
    i++;
  });


}

function scrollToBottom(element) {
  element.scrollTo({
    top: element.scrollHeight,
      behavior: 'smooth'
  })
}