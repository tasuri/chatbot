<?php
class MessageHandler {

    private $index;
    private $data;

    public function __construct(int $index)
    {
        $this->index = htmlspecialchars($index);

        $this->data = json_decode(file_get_contents("data.json"), true);
    }

    public function answerMessage() {
        if(isset($this->data[$this->index])) {
            echo json_encode($this->data[$this->index]);
        } else {
            echo json_encode($this->data[9999]);
        }
    }

}