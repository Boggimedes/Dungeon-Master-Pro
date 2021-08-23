<?php

namespace App\Models\Helpers\NameGenerator;


class Group {
    private $wrappers = [];//: Wrappers[] = [];
    private $set = [];//: Generator[] = [];

    public $type;
    
    public function __construct($type) {
        $this->type = $type;
    }

    public function produce() {//: Generator {
        switch (count($this->set)) {
            case 0:
                return new Literal('');
            case 1:
                return $this->set[0];
            default:
                return new Random($this->set);
        }
        return;
    }

    public function split() { //: void {
        // if (count($this->set) == 0) {
        // 	$this->set[] = new Sequence([]);
        // }
        $this->set[] = new Sequence([]);
    }

    public function wrap($type) { //: Wrappers): void {
        $this->wrappers[] = $type;
    }

    public function add($a) { //: Generator | string): void {
        if (is_object($a)) {
            $g = $a;
            while (count($this->wrappers) > 0) {
                switch (array_pop($this->wrappers)) {
                    case 'reverser': //Wrappers->reverser:
                        $g = New Reverser($g); //implode('', array_reverse(str_split($g, 1)));
                        break;
                    case 'capitalizer': //Wrappers->capitalizer:
                        $g = New Capitalizer($g); //ucfirst($g);
                        break;
                }
            }
            if (count($this->set) == 0) {
                $this->set[] = new Sequence([]);
            }
            $this->set[count($this->set) - 1]->add($g);
            return;
        }
        $chr = $a;
        // $g = new Random([]);
        // $g->add(new Literal($chr));
        // $this->add($g);
        $this->add(new Literal($chr));
    }
}

