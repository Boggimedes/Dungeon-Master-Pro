import { Component, Input, OnInit } from "@angular/core";
import {
  shieldColors,
  shieldPositions,
  shieldPaths,
  shieldLines,
  shieldSize,
  shieldBox,
  templates,
  // ordinaries,
  patterns,
  lines,
  colors,
} from "../../../shared/configs/const";

@Component({
  selector: "app-coa",
  templateUrl: "./coa.component.html",
  styleUrls: ["./coa.component.scss"],
})
export class CoaComponent implements OnInit {
  @Input() coa;
  @Input() id;
  public ordinariesRegular;
  public ordinariesAboveCharges;
  public shieldPath;
  public tDiv;
  public positions;
  public sizeModifier;
  public viewBox;
  public svg;
  public shield;
  public division;
  public ordinaries = [];
  public charges;
  constructor() {}

  ngOnInit(): void {
    console.log(this.coa);
    this.shield = this.coa.shield;
    this.division = this.coa.division;
    this.ordinaries = this.coa.ordinaries ? this.coa.ordinaries : [];
    this.charges = this.coa.charges ? this.coa.charges : [];

    this.ordinariesRegular = this.ordinaries.filter((o) => !o.above);
    this.ordinariesAboveCharges = this.ordinaries.filter((o) => o.above);
    this.shieldPath = shieldPaths[this.shield];
    this.tDiv = this.division
      ? this.division.t.includes("-")
        ? this.division.t.split("-")[1]
        : this.division.t
      : null;
    this.positions = shieldPositions[this.shield];
    this.sizeModifier = shieldSize[this.shield] || 1;
    this.viewBox = shieldBox[this.shield] || "0 0 200 200";

    const shieldClip = `<clipPath id="${this.shield}_${this.id}"><path d="${this.shieldPath}"/></clipPath>`;
    const divisionClip = this.division
      ? `<clipPath id="divisionClip_${this.id}">${this.getTemplate(
          this.division.division,
          this.division.line
        )}</clipPath>`
      : "";
    const loadedCharges = this.getCharges(this.coa, this.id, this.shieldPath);
    const loadedPatterns = this.getPatterns(this.coa, this.id);
    const blacklight = `<radialGradient id="backlight_${this.id}" cx="100%" cy="100%" r="150%"><stop stop-color="#fff" stop-opacity=".3" offset="0"/><stop stop-color="#fff" stop-opacity=".15" offset=".25"/><stop stop-color="#000" stop-opacity="0" offset="1"/></radialGradient>`;
    const field = `<rect x="0" y="0" width="200" height="200" fill="${this.clr(
      this.coa.t1
    )}"/>`;
    const divisionGroup = this.division ? this.templateDivision() : "";
    const overlay = `<path d="${this.shieldPath}" fill="url(#backlight_${this.id})" stroke="#333"/>`;

    this.svg = `<svg id="${this.id}" width="200" height="200" viewBox="${
      this.viewBox
    }">
          <defs>${shieldClip}${divisionClip}${loadedCharges}${loadedPatterns}${blacklight}</defs>
          <g clip-path="url(#${this.shield}_${
      this.id
    })">${field}${divisionGroup}${this.templateAboveAll()}</g>
          ${overlay}</svg>`;
  }
  templateDivision() {
    let svg = "";

    // In field part
    for (const ordinary of this.ordinariesRegular) {
      if (ordinary.divided === "field")
        svg += this.templateOrdinary(ordinary, ordinary.t);
      else if (ordinary.divided === "counter")
        svg += this.templateOrdinary(ordinary, this.tDiv);
    }

    for (const charge of this.charges) {
      if (charge.divided === "field")
        svg += this.templateCharge(charge, charge.t);
      else if (charge.divided === "counter")
        svg += this.templateCharge(charge, this.tDiv);
    }

    for (const ordinary of this.ordinariesAboveCharges) {
      if (ordinary.divided === "field")
        svg += this.templateOrdinary(ordinary, ordinary.t);
      else if (ordinary.divided === "counter")
        svg += this.templateOrdinary(ordinary, this.tDiv);
    }

    // In division part
    svg += `<g clip-path="url(#divisionClip_${
      this.id
    })"><rect x="0" y="0" width="200" height="200" fill="${this.clr(
      this.division.t
    )}"/>`;

    for (const ordinary of this.ordinariesRegular) {
      if (ordinary.divided === "division")
        svg += this.templateOrdinary(ordinary, ordinary.t);
      else if (ordinary.divided === "counter")
        svg += this.templateOrdinary(ordinary, this.coa.t1);
    }

    for (const charge of this.charges) {
      if (charge.divided === "division")
        svg += this.templateCharge(charge, charge.t);
      else if (charge.divided === "counter")
        svg += this.templateCharge(charge, this.coa.t1);
    }

    for (const ordinary of this.ordinariesAboveCharges) {
      if (ordinary.divided === "division")
        svg += this.templateOrdinary(ordinary, ordinary.t);
      else if (ordinary.divided === "counter")
        svg += this.templateOrdinary(ordinary, this.coa.t1);
    }

    return (svg += `</g>`);
  }

  templateAboveAll() {
    let svg = "";

    this.ordinariesRegular
      .filter((o) => !o.divided)
      .forEach((ordinary) => {
        svg += this.templateOrdinary(ordinary, ordinary.t);
      });

    this.charges
      .filter((o) => !o.divided || !this.division)
      .forEach((charge) => {
        svg += this.templateCharge(charge, charge.t);
      });

    this.ordinariesAboveCharges
      .filter((o) => !o.divided)
      .forEach((ordinary) => {
        svg += this.templateOrdinary(ordinary, ordinary.t);
      });

    return svg;
  }

  templateOrdinary(ordinary, tincture) {
    const fill = this.clr(tincture);
    let svg = `<g fill="${fill}" stroke="none">`;
    if (ordinary.ordinary === "bordure")
      svg += `<path d="${this.shieldPath}" fill="none" stroke="${fill}" stroke-width="16.7%"/>`;
    else if (ordinary.ordinary === "orle")
      svg += `<path d="${this.shieldPath}" fill="none" stroke="${fill}" stroke-width="5%" transform="scale(.85)" transform-origin="center">`;
    else svg += this.getTemplate(ordinary.ordinary, ordinary.line);
    return svg + `</g>`;
  }
  templateCharge(charge, tincture) {
    const fill = this.clr(tincture);
    const chargePositions = [...new Set(charge.p)].filter(
      (position: number) => this.positions[position]
    );

    let svg = "";
    svg += `<g fill="${fill}" stroke="#000">`;
    for (const p of chargePositions) {
      const transform = this.getElTransform(charge, p);
      svg += `<use href="#${charge.charge}_${this.id}" transform="${transform}"></use>`;
    }
    return svg + `</g>`;
  }

  getElTransform = (c, p) => {
    const s = (c.size || 1) * this.sizeModifier;
    const sx = c.sinister ? -s : s;
    const sy = c.reversed ? -s : s;
    let [x, y] = this.positions[p];
    x = x - 100 * (sx - 1);
    y = y - 100 * (sy - 1);
    const scale = c.sinister || c.reversed ? `${sx} ${sy}` : s;
    return `translate(${x} ${y}) scale(${scale})`;
  };
  async getCharges(coa, id, shieldPath) {
    let charges = coa.charges ? coa.charges.map((charge) => charge.charge) : []; // add charges async
    if (this.semy(coa.t1)) charges.push(this.semy(coa.t1)); // add field semy charge
    if (this.semy(coa.division?.t)) charges.push(this.semy(coa.division.t)); // add division semy charge

    const uniqueCharges = [...new Set(charges)];
    const fetchedCharges = await Promise.all(
      uniqueCharges.map(async (charge) => {
        if (charge === "inescutcheon")
          return `<g id="inescutcheon_${id}"><path transform="translate(66 66) scale(.34)" d="${shieldPath}"/></g>`;
        const fetched = await fetchCharge(charge, id);
        return fetched;
      })
    );
    return fetchedCharges.join("");
  }
  getPatterns(coa, id) {
    const isPattern = (string) => string.includes("-");
    let patternsToAdd = [];
    if (coa.t1.includes("-")) patternsToAdd.push(coa.t1); // add field pattern
    if (coa.division && isPattern(coa.division.t))
      patternsToAdd.push(coa.division.t); // add division pattern
    if (this.ordinaries)
      this.ordinaries
        .filter((ordinary) => isPattern(ordinary.t))
        .forEach((ordinary) => patternsToAdd.push(ordinary.t)); // add ordinaries pattern
    if (coa.charges)
      coa.charges
        .filter((charge) => isPattern(charge.t))
        .forEach((charge) => patternsToAdd.push(charge.t)); // add charges pattern
    if (!patternsToAdd.length) return "";

    return [...new Set(patternsToAdd)]
      .map((patternString) => {
        const [pattern, t1, t2, size] = patternString.split("-");
        const charge = this.semy(patternString);
        if (charge)
          return patterns.semy(
            patternString,
            this.clr(t1),
            this.clr(t2),
            this.getSizeMod(size),
            charge + "_" + id
          );
        return patterns[pattern](
          patternString,
          this.clr(t1),
          this.clr(t2),
          this.getSizeMod(size),
          charge
        );
      })
      .join("");
  }
  getSizeMod(size) {
    if (size === "small") return 0.8;
    if (size === "smaller") return 0.5;
    if (size === "smallest") return 0.25;
    if (size === "big") return 1.6;
    return 1;
  }
  getTemplate(id, line) {
    const linedId = id + "Lined";
    if (!line || line === "straight" || !templates[linedId])
      return templates[id];
    const linePath = shieldLines[line];
    return templates[linedId](linePath);
  }

  semy(string) {
    const isSemy = /^semy/.test(string);
    if (!isSemy) return false;
    return string.match(/semy_of_(.*?)-/)[1];
  }
  clr(tincture) {
    if (shieldColors[tincture]) return shieldColors[tincture];
    return `url(#${tincture})`;
  }
  // trigger = async function (id, coa) {
  //   if (coa === "custom") {
  //     console.warn("Cannot render custom emblem", coa);
  //     return;
  //   }
  //   if (!coa) {
  //     console.warn(`Emblem ${id} is undefined`);
  //     return;
  //   }
  //   if (!document.getElementById(id)) return draw(id, coa);
  // };

  // add = (type, i, coa, x, y) => {
  //   const id = type + "COA" + i;
  //   const g = document.getElementById(type + "Emblems");

  //   if (this.emblems.selectAll("use").size()) {
  //     const size = +g.getAttribute("font-size") || 50;
  //     const use = `<use data-i="${i}" x="${x - size / 2}" y="${
  //       y - size / 2
  //     }" width="1em" height="1em" href="#${id}"/>`;
  //     g.insertAdjacentHTML("beforeend", use);
  //   }
  // };
}

const url = location.hostname
  ? "./charges/"
  : "http://armoria.herokuapp.com/charges/"; // on local machine fetch files from server
async function fetchCharge(charge, id) {
  const fetched = fetch(url + charge + ".svg")
    .then((res) => {
      if (res.ok) return res.text();
      else throw new Error("Cannot fetch charge");
    })
    .then((text) => {
      const html = document.createElement("html");
      html.innerHTML = text;
      const g = html.querySelector("g");
      g.setAttribute("id", charge + "_" + id);
      return g.outerHTML;
    })
    .catch((err) => console.error(err));
  return fetched;
}
