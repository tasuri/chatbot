var chatInputs = document.getElementsByClassName('chatbot-text');
var content;
var chatWindow = document.getElementById('chatbot-window');
var chatbotInput = document.getElementById('chatbot-input');


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
        addMessagesToChat(JSON.parse(httpReq.response));
        scrollToBottom(chatWindow);
      }
    }
    httpReq.send(null);
  }
}

Array.from(document.getElementsByClassName('chatbot-message')).forEach(function (msg) {
  if (!msg.classList.contains('bot-message')) {
    msg.addEventListener('click', function () {
      sendMessage(this.getAttribute('data-index'));
    })
  }
});

function addMessagesToChat(response) {
  var newBotMsg = document.createElement('div');
  console.log(response)
  newBotMsg.innerText = response['msg'];
  newBotMsg.classList.add('chatbot-message');
  newBotMsg.classList.add('bot-message');
  chatbotInput.appendChild(newBotMsg);

  response['answers'].forEach(function(answer) {
    var newAnswer = document.createElement('div');
    newAnswer.classList.add('chatbot-message');
    newAnswer.setAttribute('data-index', answer['refID']);
    newAnswer.innerText = answer['msg'];
    newAnswer.addEventListener('click', function() {
      sendMessage(this.getAttribute('data-index'))
    })
    chatbotInput.appendChild(newAnswer)
  });


}

function scrollToBottom(element) {
  element.scrollTo({
    top: element.scrollHeight,
      behavior: 'smooth'
  })
}