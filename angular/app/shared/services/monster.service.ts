import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class MonsterService {
  constructor(private http: HttpClient) {}
  getMonsters = (term = null, page: number) => {
    return this.http.get("/api/monsters/" + term + "?page=" + page);
  };
  addMonster = (pageData) => {
    return this.http.post("/api/monster/add", pageData);
  };
  updateMonster = (pageData) => {
    return this.http.post("/api/monster/update", pageData);
  };
  deleteMonster = (id) => {
    var pageData = { field: "id", value: id };
    return this.http.post("/api/monster/delete", pageData);
  };
  getMonster = (monster) => {
    return this.http.get("/api/monster/" + monster.id);
  };
  getSpells = (monster) => {
    return this.http.get("/api/monster" + monster.id + "/getspells");
  };
}
