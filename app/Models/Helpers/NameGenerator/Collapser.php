<?php

namespace App\Models\Helpers\NameGenerator;


class Collapser extends Generator {
    public function __construct($generator) { //}: Generator) {
        parent::__construct([$generator]);
    }

    public function toString(): string {
        $str = parent::toString();
        $out = '';
        $cnt = 0;
        $pch = '';
        for ($i = 0; $i < strlen($str); $i++) {
            $chr = $str[$i];
            if ($chr === $pch) {
                $cnt++;
            } else {
                $cnt = 0;
            }
            $mch = 2;
            switch ($chr) {
                case 'a':
                case 'h':
                case 'i':
                case 'j':
                case 'q':
                case 'u':
                case 'v':
                case 'w':
                case 'x':
                case 'y':
                    $mch = 1;
            }
            if ($cnt < $mch) {
                $out .= $chr;
            }
            $pch = $chr;
        }
        return $out;
    }
}

