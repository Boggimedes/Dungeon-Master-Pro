<?php

namespace App\Models\Helpers\NameGenerator;


class Random extends Generator {
    public function __construct($generators) { //}: Generator[]) {
    	parent::__construct($generators);
    }

    public function combinations() {
        $total = 0;
        foreach($this->generators as $g) {
            $total += $g->combinations();
        };
        return $total ? $total : 1;
    }

    public function min() {
        $final = -1;
        foreach($this->generators as $g) {
            $curr = $g->min();
            if ($curr < $final) {
                $final = $curr;
            }
        };
        return $final;
    }

    public function max() {
        $final = 0;
        foreach($this->generators as $g) {
            $curr = $g->max();
            if ($curr > $final) {
                $final = $curr;
            }
        };
        return $final;
    }

    public function toString(): string {
        if (!$this->generators) {
            return '';
        }
        $rnd = mt_rand(0, count($this->generators) - 1);
        return $this->generators[$rnd]->toString();
    }
}

