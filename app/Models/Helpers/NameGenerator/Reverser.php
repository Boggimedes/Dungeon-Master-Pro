<?php

namespace App\Models\Helpers\NameGenerator;


class Reverser extends Generator {

    public function __construct($generator) { //}: Generator) {
        parent::__construct([$generator]);
    }
    
    
    public function toString(): string {
        $str = parent::toString();
        return implode('', array_reverse(str_split($str, 1)));
    }
}