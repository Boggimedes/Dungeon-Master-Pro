import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SpellService {

  constructor() { }
}

.factory('spellFactory', ['$http',
    function($http) {

        return {
            getSpells: function(pageData) {
                return $http.post('/api/spell/getspells', pageData);
            },
            getSpellBasics: function(pageData) {
                return $http.post('/api/spell/getspellbasics', pageData);
            },
            updateSpell: function(pageData) {
                return $http.post('/api/spell/update', pageData);
            },
            addSpell: function(pageData) {
                return $http.post('/api/spell/add', pageData);
            },
            deleteSpell: function(pageData) {
                return $http.post('/api/spell/delete', pageData);
            }
        };
    }
])

