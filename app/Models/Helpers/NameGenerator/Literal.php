<?php

namespace App\Models\Helpers\NameGenerator;



	class Literal extends Generator {
		private $value;
		public function __construct($value) {
			$this->value = $value;
		}

        
		public function combinations() {
			return 1;
		}

		public function min() {
			return strlen($this->value);
		}

		public function max() {
			return strlen($this->value);
		}

		public function toString(): string {
            if (is_object($this->value)) {
                return $this->value->toString();
            }
			return $this->value;
		}
	}

