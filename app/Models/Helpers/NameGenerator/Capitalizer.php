<?php

namespace App\Models\Helpers\NameGenerator;

class Capitalizer extends Generator {

public function __construct($generator) { //}: Generator) {
    parent::__construct([$generator]);

}

public function toString(): string {
    return ucfirst(parent::toString());
}
}