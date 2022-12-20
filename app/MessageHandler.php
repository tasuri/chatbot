<?php
class MessageHandler {

    private $depth, $index;
    private $data;

    public function __construct(int $depth, int $index)
    {
        $this->depth = htmlspecialchars($depth);
        $this->index = htmlspecialchars($index);

        $this->data = json_decode(file_get_contents("data.json"));
    }

    public function answerMessage() {
        echo $this->data[$this->depth][$this->index];
    }

}