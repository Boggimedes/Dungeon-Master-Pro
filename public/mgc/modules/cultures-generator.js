"use strict";

window.Cultures = (function () {
  let cells;

  const generate = function () {
    TIME && console.time("generateCultures");
    cells = pack.cells;
    cells.culture = new Uint16Array(cells.i.length); // cell cultures
    let count = Math.min(
      window.regionCultures.length,
      +culturesSet.selectedOptions[0].dataset.max
    );

    const populated = cells.i.filter((i) => cells.s[i]); // populated cells
    if (populated.length < count * 25) {
      count = Math.floor(populated.length / 50);
      if (!count) {
        WARN &&
          console.warn(
            `There are no populated cells. Cannot generate cultures`
          );
        pack.cultures = [{ name: "Wildlands", i: 0, base: 1, shield: "round" }];
        alertMessage.innerHTML = `
          The climate is harsh and people cannot live in this world.<br>
          No cultures, states and burgs will be created.<br>
          Please consider changing climate settings in the World Configurator`;
        $("#alert").dialog({
          resizable: false,
          title: "Extreme climate warning",
          buttons: {
            Ok: function () {
              $(this).dialog("close");
            },
          },
        });
        return;
      } else {
        WARN &&
          console.warn(
            `Not enough populated cells (${populated.length}). Will generate only ${count} cultures`
          );
        alertMessage.innerHTML = `
          There are only ${populated.length} populated cells and it's insufficient livable area.<br>
          Only ${count} out of ${culturesInput.value} requested cultures will be generated.<br>
          Please consider changing climate settings in the World Configurator`;
        $("#alert").dialog({
          resizable: false,
          title: "Extreme climate warning",
          buttons: {
            Ok: function () {
              $(this).dialog("close");
            },
          },
        });
      }
    } else {
      pack.cultures = selectCultures(count);
    }
    const cultures = pack.cultures;
    const centers = d3.quadtree();
    const colors = getColors(count);
    const emblemShape = document.getElementById("emblemShape").value;
    const codes = [];
    cultures.forEach(function (c, i) {
      const cell = (c.center = placeCenter(
        c.sort ? c.sort : (i) => cells.s[i]
      ));
      centers.add(cells.p[cell]);
      c.i = i + 1;
      delete c.odd;
      delete c.sort;
      c.color = colors[i];
      c.type = defineCultureType(cell);
      if (!c.expansionism) c.expansionism = defineCultureExpansionism(c.type);
      c.origin = 0;
      c.code = abbreviate(c.name, codes);
      codes.push(c.code);
      cells.culture[cell] = i + 1;
      if (emblemShape === "random") c.shield = getRandomShield();
    });

    function placeCenter(v) {
      let c,
        spacing = (graphWidth + graphHeight) / 2 / count;
      const sorted = [...populated].sort((a, b) => v(b) - v(a)),
        max = Math.floor(sorted.length / 2);
      do {
        c = sorted[biased(0, max, 5)];
        spacing *= 0.9;
      } while (
        centers.find(cells.p[c][0], cells.p[c][1], spacing) !== undefined
      );
      return c;
    }

    // the first culture with id 0 is for wildlands
    cultures.unshift({
      name: "Wildlands",
      i: 0,
      base: 1,
      origin: null,
      shield: "round",
    });

    // make sure all bases exist in nameBases
    if (!nameBases.length) {
      ERROR &&
        console.error("Name base is empty, default nameBases will be applied");
      nameBases = Names.getNameBases();
    }

    cultures.forEach((c) => (c.base = c.base % nameBases.length));

    function selectCultures(c) {
      if (window.regionCultures.length > 0) c = window.regionCultures.length;
      let def = getDefault(c);
      if (c === def.length) return def;
      if (def.every((d) => d.odd === 1)) return def.splice(0, c);

      const count = Math.min(c, def.length);
      const cultures = [];

      for (let culture, rnd, i = 0; cultures.length < count && i < 200; i++) {
        do {
          rnd = rand(def.length - 1);
          culture = def[rnd];
        } while (!P(culture.odd));
        cultures.push(culture);
        def.splice(rnd, 1);
      }
      return cultures;
    }

    // set culture type based on culture center position
    function defineCultureType(i) {
      if (cells.h[i] < 70 && [1, 2, 4].includes(cells.biome[i]))
        return "Nomadic"; // high penalty in forest biomes and near coastline
      if (cells.h[i] > 50) return "Highland"; // no penalty for hills and moutains, high for other elevations
      const f = pack.features[cells.f[cells.haven[i]]]; // opposite feature
      if (f.type === "lake" && f.cells > 5) return "Lake"; // low water cross penalty and high for growth not along coastline
      if (
        (cells.harbor[i] && f.type !== "lake" && P(0.1)) ||
        (cells.harbor[i] === 1 && P(0.6)) ||
        (pack.features[cells.f[i]].group === "isle" && P(0.4))
      )
        return "Naval"; // low water cross penalty and high for non-along-coastline growth
      if (cells.r[i] && cells.fl[i] > 100) return "River"; // no River cross penalty, penalty for non-River growth
      if (cells.t[i] > 2 && [3, 7, 8, 9, 10, 12].includes(cells.biome[i]))
        return "Hunting"; // high penalty in non-native biomes
      return "Generic";
    }

    function defineCultureExpansionism(type) {
      let base = 1; // Generic
      if (type === "Lake") base = 0.8;
      else if (type === "Naval") base = 1.5;
      else if (type === "River") base = 0.9;
      else if (type === "Nomadic") base = 1.5;
      else if (type === "Hunting") base = 0.7;
      else if (type === "Highland") base = 1.2;
      return rn(((Math.random() * powerInput.value) / 2 + 1) * base, 1);
    }
    window.regionCultures = pack.cultures.slice(1);
    culturesTable();
    TIME && console.timeEnd("generateCultures");
  };

  const add = function (center) {
    const defaultCultures = getDefault();
    let culture, base, name;

    if (pack.cultures.length < defaultCultures.length) {
      // add one of the default cultures
      culture = pack.cultures.length;
      base = defaultCultures[culture].base;
      name = defaultCultures[culture].name;
    } else {
      // add random culture besed on one of the current ones
      culture = rand(pack.cultures.length - 1);
      name = Names.getCulture(culture, 5, 8, "");
      base = pack.cultures[culture].base;
    }
    const code = abbreviate(
      name,
      pack.cultures.map((c) => c.code)
    );
    const i = pack.cultures.length;
    const color = d3
      .color(d3.scaleSequential(d3.interpolateRainbow)(Math.random()))
      .hex();

    // define emblem shape
    let shield = culture.shield;
    const emblemShape = document.getElementById("emblemShape").value;
    if (emblemShape === "random") shield = getRandomShield();

    pack.cultures.push({
      name,
      color,
      base,
      center,
      i,
      expansionism: 1,
      type: "Generic",
      cells: 0,
      area: 0,
      rural: 0,
      urban: 0,
      origin: 0,
      code,
      shield,
    });
  };

  const getDefault = function (count) {
    // generic sorting functions
    const cells = pack.cells,
      s = cells.s,
      sMax = d3.max(s),
      t = cells.t,
      h = cells.h,
      temp = grid.cells.temp;
    const n = (cell) => Math.ceil((s[cell] / sMax) * 3); // normalized cell score
    const td = (cell, goal) => {
      const d = Math.abs(temp[cells.g[cell]] - goal);
      return d ? d + 1 : 1;
    }; // temperature difference fee
    const bd = (cell, biomes, fee = 4) =>
      biomes.includes(cells.biome[cell]) ? 1 : fee; // biome difference fee
    const sf = (cell, fee = 4) =>
      cells.haven[cell] &&
      pack.features[cells.f[cells.haven[cell]]].type !== "lake"
        ? 1
        : fee; // not on sea coast fee

    if (window.regionCultures.length > 0) {
      let cultures = window.regionCultures;
      const getName = () => Names.getBase(1, 5, 9, "", 0);
      cultures = cultures.map((c) => {
        if (!c.name) c.name = getName();
        c.sort = (i) => n(i) / td(i, 10);
        if (!c.expansionism) c.expansionism = rand(10, 50) / 10;
        return c;
      });
      return cultures;
    }
    if (culturesSet.value === "european") {
      return [
        {
          name: "Shwazen",
          base: 0,
          odd: 1,
          sort: (i) => n(i) / td(i, 10) / bd(i, [6, 8]),
          shield: "swiss",
        },
        {
          name: "Angshire",
          base: 1,
          odd: 1,
          sort: (i) => n(i) / td(i, 10) / sf(i),
          shield: "wedged",
        },
        {
          name: "Luari",
          base: 2,
          odd: 1,
          sort: (i) => n(i) / td(i, 12) / bd(i, [6, 8]),
          shield: "french",
        },
        {
          name: "Tallian",
          base: 3,
          odd: 1,
          sort: (i) => n(i) / td(i, 15),
          shield: "horsehead",
        },
        {
          name: "Astellian",
          base: 4,
          odd: 1,
          sort: (i) => n(i) / td(i, 16),
          shield: "spanish",
        },
        {
          name: "Slovan",
          base: 5,
          odd: 1,
          sort: (i) => (n(i) / td(i, 6)) * t[i],
          shield: "polish",
        },
        {
          name: "Norse",
          base: 6,
          odd: 1,
          sort: (i) => n(i) / td(i, 5),
          shield: "heater",
        },
        {
          name: "Elladan",
          base: 7,
          odd: 1,
          sort: (i) => (n(i) / td(i, 18)) * h[i],
          shield: "boeotian",
        },
        {
          name: "Romian",
          base: 8,
          odd: 0.2,
          sort: (i) => n(i) / td(i, 15) / t[i],
          shield: "roman",
        },
        {
          name: "Soumi",
          base: 9,
          odd: 1,
          sort: (i) => (n(i) / td(i, 5) / bd(i, [9])) * t[i],
          shield: "pavise",
        },
        {
          name: "Portuzian",
          base: 13,
          odd: 1,
          sort: (i) => n(i) / td(i, 17) / sf(i),
          shield: "renaissance",
        },
        {
          name: "Vengrian",
          base: 15,
          odd: 1,
          sort: (i) => (n(i) / td(i, 11) / bd(i, [4])) * t[i],
          shield: "horsehead2",
        },
        {
          name: "Turchian",
          base: 16,
          odd: 0.05,
          sort: (i) => n(i) / td(i, 14),
          shield: "round",
        },
        {
          name: "Euskati",
          base: 20,
          odd: 0.05,
          sort: (i) => (n(i) / td(i, 15)) * h[i],
          shield: "oldFrench",
        },
        {
          name: "Keltan",
          base: 22,
          odd: 0.05,
          sort: (i) => (n(i) / td(i, 11) / bd(i, [6, 8])) * t[i],
          shield: "oval",
        },
      ];
    }

    if (culturesSet.value === "oriental") {
      return [
        {
          name: "Koryo",
          base: 10,
          odd: 1,
          sort: (i) => n(i) / td(i, 12) / t[i],
          shield: "round",
        },
        {
          name: "Hantzu",
          base: 11,
          odd: 1,
          sort: (i) => n(i) / td(i, 13),
          shield: "banner",
        },
        {
          name: "Yamoto",
          base: 12,
          odd: 1,
          sort: (i) => n(i) / td(i, 15) / t[i],
          shield: "round",
        },
        {
          name: "Turchian",
          base: 16,
          odd: 1,
          sort: (i) => n(i) / td(i, 12),
          shield: "round",
        },
        {
          name: "Berberan",
          base: 17,
          odd: 0.2,
          sort: (i) => (n(i) / td(i, 19) / bd(i, [1, 2, 3], 7)) * t[i],
          shield: "oval",
        },
        {
          name: "Eurabic",
          base: 18,
          odd: 1,
          sort: (i) => (n(i) / td(i, 26) / bd(i, [1, 2], 7)) * t[i],
          shield: "oval",
        },
        {
          name: "Efratic",
          base: 23,
          odd: 0.1,
          sort: (i) => (n(i) / td(i, 22)) * t[i],
          shield: "round",
        },
        {
          name: "Tehrani",
          base: 24,
          odd: 1,
          sort: (i) => (n(i) / td(i, 18)) * h[i],
          shield: "round",
        },
        {
          name: "Maui",
          base: 25,
          odd: 0.2,
          sort: (i) => n(i) / td(i, 24) / sf(i) / t[i],
          shield: "vesicaPiscis",
        },
        {
          name: "Carnatic",
          base: 26,
          odd: 0.5,
          sort: (i) => n(i) / td(i, 26),
          shield: "round",
        },
        {
          name: "Vietic",
          base: 29,
          odd: 0.8,
          sort: (i) => n(i) / td(i, 25) / bd(i, [7], 7) / t[i],
          shield: "banner",
        },
        {
          name: "Guantzu",
          base: 30,
          odd: 0.5,
          sort: (i) => n(i) / td(i, 17),
          shield: "banner",
        },
        {
          name: "Ulus",
          base: 31,
          odd: 1,
          sort: (i) => (n(i) / td(i, 5) / bd(i, [2, 4, 10], 7)) * t[i],
          shield: "banner",
        },
      ];
    }

    if (culturesSet.value === "english") {
      const getName = () => Names.getBase(1, 5, 9, "", 0);
      return [
        { name: getName(), base: 1, odd: 1, shield: "heater" },
        { name: getName(), base: 1, odd: 1, shield: "wedged" },
        { name: getName(), base: 1, odd: 1, shield: "swiss" },
        { name: getName(), base: 1, odd: 1, shield: "oldFrench" },
        { name: getName(), base: 1, odd: 1, shield: "swiss" },
        { name: getName(), base: 1, odd: 1, shield: "spanish" },
        { name: getName(), base: 1, odd: 1, shield: "hessen" },
        { name: getName(), base: 1, odd: 1, shield: "fantasy5" },
        { name: getName(), base: 1, odd: 1, shield: "fantasy4" },
        { name: getName(), base: 1, odd: 1, shield: "fantasy1" },
      ];
    }

    if (culturesSet.value === "antique") {
      return [
        {
          name: "Roman",
          base: 8,
          odd: 1,
          sort: (i) => n(i) / td(i, 14) / t[i],
          shield: "roman",
        }, // Roman
        {
          name: "Roman",
          base: 8,
          odd: 1,
          sort: (i) => n(i) / td(i, 15) / sf(i),
          shield: "roman",
        }, // Roman
        {
          name: "Roman",
          base: 8,
          odd: 1,
          sort: (i) => n(i) / td(i, 16) / sf(i),
          shield: "roman",
        }, // Roman
        {
          name: "Roman",
          base: 8,
          odd: 1,
          sort: (i) => n(i) / td(i, 17) / t[i],
          shield: "roman",
        }, // Roman
        {
          name: "Hellenic",
          base: 7,
          odd: 1,
          sort: (i) => (n(i) / td(i, 18) / sf(i)) * h[i],
          shield: "boeotian",
        }, // Greek
        {
          name: "Hellenic",
          base: 7,
          odd: 1,
          sort: (i) => (n(i) / td(i, 19) / sf(i)) * h[i],
          shield: "boeotian",
        }, // Greek
        {
          name: "Macedonian",
          base: 7,
          odd: 0.5,
          sort: (i) => (n(i) / td(i, 12)) * h[i],
          shield: "round",
        }, // Greek
        {
          name: "Celtic",
          base: 22,
          odd: 1,
          sort: (i) => n(i) / td(i, 11) ** 0.5 / bd(i, [6, 8]),
          shield: "round",
        },
        {
          name: "Germanic",
          base: 0,
          odd: 1,
          sort: (i) => n(i) / td(i, 10) ** 0.5 / bd(i, [6, 8]),
          shield: "round",
        },
        {
          name: "Persian",
          base: 24,
          odd: 0.8,
          sort: (i) => (n(i) / td(i, 18)) * h[i],
          shield: "oval",
        }, // Iranian
        {
          name: "Scythian",
          base: 24,
          odd: 0.5,
          sort: (i) => n(i) / td(i, 11) ** 0.5 / bd(i, [4]),
          shield: "round",
        }, // Iranian
        {
          name: "Cantabrian",
          base: 20,
          odd: 0.5,
          sort: (i) => (n(i) / td(i, 16)) * h[i],
          shield: "oval",
        }, // Basque
        {
          name: "Estian",
          base: 9,
          odd: 0.2,
          sort: (i) => (n(i) / td(i, 5)) * t[i],
          shield: "pavise",
        }, // Finnic
        {
          name: "Carthaginian",
          base: 17,
          odd: 0.3,
          sort: (i) => n(i) / td(i, 19) / sf(i),
          shield: "oval",
        }, // Berber
        {
          name: "Mesopotamian",
          base: 23,
          odd: 0.2,
          sort: (i) => n(i) / td(i, 22) / bd(i, [1, 2, 3]),
          shield: "oval",
        }, // Mesopotamian
      ];
    }

    if (culturesSet.value === "highFantasy") {
      return [
        // fantasy races
        {
          name: "Quenian (Elfish)",
          base: 33,
          odd: 1,
          sort: (i) => (n(i) / bd(i, [6, 7, 8, 9], 10)) * t[i],
          shield: "gondor",
        }, // Elves
        {
          name: "Eldar (Elfish)",
          base: 33,
          odd: 1,
          sort: (i) => (n(i) / bd(i, [6, 7, 8, 9], 10)) * t[i],
          shield: "noldor",
        }, // Elves
        {
          name: "Trow (Dark Elfish)",
          base: 34,
          odd: 0.9,
          sort: (i) => (n(i) / bd(i, [7, 8, 9, 12], 10)) * t[i],
          shield: "hessen",
        }, // Dark Elves
        {
          name: "Lothian (Dark Elfish)",
          base: 34,
          odd: 0.3,
          sort: (i) => (n(i) / bd(i, [7, 8, 9, 12], 10)) * t[i],
          shield: "wedged",
        }, // Dark Elves
        {
          name: "Dunirr (Dwarven)",
          base: 35,
          odd: 1,
          sort: (i) => n(i) + h[i],
          shield: "ironHills",
        }, // Dwarfs
        {
          name: "Khazadur (Dwarven)",
          base: 35,
          odd: 1,
          sort: (i) => n(i) + h[i],
          shield: "erebor",
        }, // Dwarfs
        {
          name: "Kobold (Goblin)",
          base: 36,
          odd: 1,
          sort: (i) => t[i] - s[i],
          shield: "moriaOrc",
        }, // Goblin
        {
          name: "Uruk (Orkish)",
          base: 37,
          odd: 1,
          sort: (i) => h[i] * t[i],
          shield: "urukHai",
        }, // Orc
        {
          name: "Ugluk (Orkish)",
          base: 37,
          odd: 0.5,
          sort: (i) => (h[i] * t[i]) / bd(i, [1, 2, 10, 11]),
          shield: "moriaOrc",
        }, // Orc
        {
          name: "Yotunn (Giants)",
          base: 38,
          odd: 0.7,
          sort: (i) => td(i, -10),
          shield: "pavise",
        }, // Giant
        {
          name: "Rake (Drakonic)",
          base: 39,
          odd: 0.7,
          sort: (i) => -s[i],
          shield: "fantasy2",
        }, // Draconic
        {
          name: "Arago (Arachnid)",
          base: 40,
          odd: 0.7,
          sort: (i) => t[i] - s[i],
          shield: "horsehead2",
        }, // Arachnid
        {
          name: "Aj'Snaga (Serpents)",
          base: 41,
          odd: 0.7,
          sort: (i) => n(i) / bd(i, [12], 10),
          shield: "fantasy1",
        }, // Serpents
        // fantasy human
        {
          name: "Anor (Human)",
          base: 32,
          odd: 1,
          sort: (i) => n(i) / td(i, 10),
          shield: "fantasy5",
        },
        {
          name: "Dail (Human)",
          base: 32,
          odd: 1,
          sort: (i) => n(i) / td(i, 13),
          shield: "roman",
        },
        {
          name: "Rohand (Human)",
          base: 16,
          odd: 1,
          sort: (i) => n(i) / td(i, 16),
          shield: "round",
        },
        {
          name: "Dulandir (Human)",
          base: 31,
          odd: 1,
          sort: (i) => (n(i) / td(i, 5) / bd(i, [2, 4, 10], 7)) * t[i],
          shield: "easterling",
        },
      ];
    }

    if (culturesSet.value === "darkFantasy") {
      return [
        // common real-world English
        {
          name: "Angshire",
          base: 1,
          odd: 1,
          sort: (i) => n(i) / td(i, 10) / sf(i),
          shield: "heater",
        },
        {
          name: "Enlandic",
          base: 1,
          odd: 1,
          sort: (i) => n(i) / td(i, 12),
          shield: "heater",
        },
        {
          name: "Westen",
          base: 1,
          odd: 1,
          sort: (i) => n(i) / td(i, 10),
          shield: "heater",
        },
        {
          name: "Nortumbic",
          base: 1,
          odd: 1,
          sort: (i) => n(i) / td(i, 7),
          shield: "heater",
        },
        {
          name: "Mercian",
          base: 1,
          odd: 1,
          sort: (i) => n(i) / td(i, 9),
          shield: "heater",
        },
        {
          name: "Kentian",
          base: 1,
          odd: 1,
          sort: (i) => n(i) / td(i, 12),
          shield: "heater",
        },
        // rare real-world western
        {
          name: "Norse",
          base: 6,
          odd: 0.7,
          sort: (i) => n(i) / td(i, 5) / sf(i),
          shield: "oldFrench",
        },
        {
          name: "Schwarzen",
          base: 0,
          odd: 0.3,
          sort: (i) => n(i) / td(i, 10) / bd(i, [6, 8]),
          shield: "gonfalon",
        },
        {
          name: "Luarian",
          base: 2,
          odd: 0.3,
          sort: (i) => n(i) / td(i, 12) / bd(i, [6, 8]),
          shield: "oldFrench",
        },
        {
          name: "Hetallian",
          base: 3,
          odd: 0.3,
          sort: (i) => n(i) / td(i, 15),
          shield: "oval",
        },
        {
          name: "Astellian",
          base: 4,
          odd: 0.3,
          sort: (i) => n(i) / td(i, 16),
          shield: "spanish",
        },
        // rare real-world exotic
        {
          name: "Kiswaili",
          base: 28,
          odd: 0.05,
          sort: (i) => n(i) / td(i, 29) / bd(i, [1, 3, 5, 7]),
          shield: "vesicaPiscis",
        },
        {
          name: "Yoruba",
          base: 21,
          odd: 0.05,
          sort: (i) => n(i) / td(i, 15) / bd(i, [5, 7]),
          shield: "vesicaPiscis",
        },
        {
          name: "Koryo",
          base: 10,
          odd: 0.05,
          sort: (i) => n(i) / td(i, 12) / t[i],
          shield: "round",
        },
        {
          name: "Hantzu",
          base: 11,
          odd: 0.05,
          sort: (i) => n(i) / td(i, 13),
          shield: "banner",
        },
        {
          name: "Yamoto",
          base: 12,
          odd: 0.05,
          sort: (i) => n(i) / td(i, 15) / t[i],
          shield: "round",
        },
        {
          name: "Guantzu",
          base: 30,
          odd: 0.05,
          sort: (i) => n(i) / td(i, 17),
          shield: "banner",
        },
        {
          name: "Ulus",
          base: 31,
          odd: 0.05,
          sort: (i) => (n(i) / td(i, 5) / bd(i, [2, 4, 10], 7)) * t[i],
          shield: "banner",
        },
        {
          name: "Turan",
          base: 16,
          odd: 0.05,
          sort: (i) => n(i) / td(i, 12),
          shield: "round",
        },
        {
          name: "Berberan",
          base: 17,
          odd: 0.05,
          sort: (i) => (n(i) / td(i, 19) / bd(i, [1, 2, 3], 7)) * t[i],
          shield: "round",
        },
        {
          name: "Eurabic",
          base: 18,
          odd: 0.05,
          sort: (i) => (n(i) / td(i, 26) / bd(i, [1, 2], 7)) * t[i],
          shield: "round",
        },
        {
          name: "Slovan",
          base: 5,
          odd: 0.05,
          sort: (i) => (n(i) / td(i, 6)) * t[i],
          shield: "round",
        },
        {
          name: "Keltan",
          base: 22,
          odd: 0.1,
          sort: (i) => n(i) / td(i, 11) ** 0.5 / bd(i, [6, 8]),
          shield: "vesicaPiscis",
        },
        {
          name: "Elladan",
          base: 7,
          odd: 0.2,
          sort: (i) => (n(i) / td(i, 18) / sf(i)) * h[i],
          shield: "boeotian",
        },
        {
          name: "Romian",
          base: 8,
          odd: 0.2,
          sort: (i) => n(i) / td(i, 14) / t[i],
          shield: "roman",
        },
        // fantasy races
        {
          name: "Eldar",
          base: 33,
          odd: 0.5,
          sort: (i) => (n(i) / bd(i, [6, 7, 8, 9], 10)) * t[i],
          shield: "fantasy5",
        }, // Elves
        {
          name: "Trow",
          base: 34,
          odd: 0.8,
          sort: (i) => (n(i) / bd(i, [7, 8, 9, 12], 10)) * t[i],
          shield: "hessen",
        }, // Dark Elves
        {
          name: "Durinn",
          base: 35,
          odd: 0.8,
          sort: (i) => n(i) + h[i],
          shield: "erebor",
        }, // Dwarven
        {
          name: "Kobblin",
          base: 36,
          odd: 0.8,
          sort: (i) => t[i] - s[i],
          shield: "moriaOrc",
        }, // Goblin
        {
          name: "Uruk",
          base: 37,
          odd: 0.8,
          sort: (i) => (h[i] * t[i]) / bd(i, [1, 2, 10, 11]),
          shield: "urukHai",
        }, // Orc
        {
          name: "Yotunn",
          base: 38,
          odd: 0.8,
          sort: (i) => td(i, -10),
          shield: "pavise",
        }, // Giant
        {
          name: "Drake",
          base: 39,
          odd: 0.9,
          sort: (i) => -s[i],
          shield: "fantasy2",
        }, // Draconic
        {
          name: "Rakhnid",
          base: 40,
          odd: 0.9,
          sort: (i) => t[i] - s[i],
          shield: "horsehead2",
        }, // Arachnid
        {
          name: "Aj'Snaga",
          base: 41,
          odd: 0.9,
          sort: (i) => n(i) / bd(i, [12], 10),
          shield: "fantasy1",
        }, // Serpents
      ];
    }

    if (culturesSet.value === "random") {
      return d3.range(count).map(function () {
        const rnd = rand(nameBases.length - 1);
        const name = Names.getBaseShort(rnd);
        return { name, base: rnd, odd: 1, shield: getRandomShield() };
      });
    }

    // all-world
    return [
      {
        name: "Shwazen",
        base: 0,
        odd: 0.7,
        sort: (i) => n(i) / td(i, 10) / bd(i, [6, 8]),
        shield: "hessen",
      },
      {
        name: "Angshire",
        base: 1,
        odd: 1,
        sort: (i) => n(i) / td(i, 10) / sf(i),
        shield: "heater",
      },
      {
        name: "Luari",
        base: 2,
        odd: 0.6,
        sort: (i) => n(i) / td(i, 12) / bd(i, [6, 8]),
        shield: "oldFrench",
      },
      {
        name: "Tallian",
        base: 3,
        odd: 0.6,
        sort: (i) => n(i) / td(i, 15),
        shield: "horsehead2",
      },
      {
        name: "Astellian",
        base: 4,
        odd: 0.6,
        sort: (i) => n(i) / td(i, 16),
        shield: "spanish",
      },
      {
        name: "Slovan",
        base: 5,
        odd: 0.7,
        sort: (i) => (n(i) / td(i, 6)) * t[i],
        shield: "round",
      },
      {
        name: "Norse",
        base: 6,
        odd: 0.7,
        sort: (i) => n(i) / td(i, 5),
        shield: "heater",
      },
      {
        name: "Elladan",
        base: 7,
        odd: 0.7,
        sort: (i) => (n(i) / td(i, 18)) * h[i],
        shield: "boeotian",
      },
      {
        name: "Romian",
        base: 8,
        odd: 0.7,
        sort: (i) => n(i) / td(i, 15),
        shield: "roman",
      },
      {
        name: "Soumi",
        base: 9,
        odd: 0.3,
        sort: (i) => (n(i) / td(i, 5) / bd(i, [9])) * t[i],
        shield: "pavise",
      },
      {
        name: "Koryo",
        base: 10,
        odd: 0.1,
        sort: (i) => n(i) / td(i, 12) / t[i],
        shield: "round",
      },
      {
        name: "Hantzu",
        base: 11,
        odd: 0.1,
        sort: (i) => n(i) / td(i, 13),
        shield: "banner",
      },
      {
        name: "Yamoto",
        base: 12,
        odd: 0.1,
        sort: (i) => n(i) / td(i, 15) / t[i],
        shield: "round",
      },
      {
        name: "Portuzian",
        base: 13,
        odd: 0.4,
        sort: (i) => n(i) / td(i, 17) / sf(i),
        shield: "spanish",
      },
      {
        name: "Nawatli",
        base: 14,
        odd: 0.1,
        sort: (i) => h[i] / td(i, 18) / bd(i, [7]),
        shield: "square",
      },
      {
        name: "Vengrian",
        base: 15,
        odd: 0.2,
        sort: (i) => (n(i) / td(i, 11) / bd(i, [4])) * t[i],
        shield: "wedged",
      },
      {
        name: "Turchian",
        base: 16,
        odd: 0.2,
        sort: (i) => n(i) / td(i, 13),
        shield: "round",
      },
      {
        name: "Berberan",
        base: 17,
        odd: 0.1,
        sort: (i) => (n(i) / td(i, 19) / bd(i, [1, 2, 3], 7)) * t[i],
        shield: "round",
      },
      {
        name: "Eurabic",
        base: 18,
        odd: 0.2,
        sort: (i) => (n(i) / td(i, 26) / bd(i, [1, 2], 7)) * t[i],
        shield: "round",
      },
      {
        name: "Inuk",
        base: 19,
        odd: 0.05,
        sort: (i) => td(i, -1) / bd(i, [10, 11]) / sf(i),
        shield: "square",
      },
      {
        name: "Euskati",
        base: 20,
        odd: 0.05,
        sort: (i) => (n(i) / td(i, 15)) * h[i],
        shield: "spanish",
      },
      {
        name: "Yoruba",
        base: 21,
        odd: 0.05,
        sort: (i) => n(i) / td(i, 15) / bd(i, [5, 7]),
        shield: "vesicaPiscis",
      },
      {
        name: "Keltan",
        base: 22,
        odd: 0.05,
        sort: (i) => (n(i) / td(i, 11) / bd(i, [6, 8])) * t[i],
        shield: "vesicaPiscis",
      },
      {
        name: "Efratic",
        base: 23,
        odd: 0.05,
        sort: (i) => (n(i) / td(i, 22)) * t[i],
        shield: "diamond",
      },
      {
        name: "Tehrani",
        base: 24,
        odd: 0.1,
        sort: (i) => (n(i) / td(i, 18)) * h[i],
        shield: "round",
      },
      {
        name: "Maui",
        base: 25,
        odd: 0.05,
        sort: (i) => n(i) / td(i, 24) / sf(i) / t[i],
        shield: "round",
      },
      {
        name: "Carnatic",
        base: 26,
        odd: 0.05,
        sort: (i) => n(i) / td(i, 26),
        shield: "round",
      },
      {
        name: "Inqan",
        base: 27,
        odd: 0.05,
        sort: (i) => h[i] / td(i, 13),
        shield: "square",
      },
      {
        name: "Kiswaili",
        base: 28,
        odd: 0.1,
        sort: (i) => n(i) / td(i, 29) / bd(i, [1, 3, 5, 7]),
        shield: "vesicaPiscis",
      },
      {
        name: "Vietic",
        base: 29,
        odd: 0.1,
        sort: (i) => n(i) / td(i, 25) / bd(i, [7], 7) / t[i],
        shield: "banner",
      },
      {
        name: "Guantzu",
        base: 30,
        odd: 0.1,
        sort: (i) => n(i) / td(i, 17),
        shield: "banner",
      },
      {
        name: "Ulus",
        base: 31,
        odd: 0.1,
        sort: (i) => (n(i) / td(i, 5) / bd(i, [2, 4, 10], 7)) * t[i],
        shield: "banner",
      },
    ];
  };

  // expand cultures across the map (Dijkstra-like algorithm)
  const expand = function () {
    TIME && console.time("expandCultures");
    cells = pack.cells;

    const queue = new PriorityQueue({ comparator: (a, b) => a.p - b.p });
    pack.cultures.forEach(function (c) {
      if (!c.i || c.removed) return;
      queue.queue({ e: c.center, p: 0, c: c.i });
    });

    const neutral = (cells.i.length / 5000) * 1500 * neutralInput.value; // limit cost for culture growth
    const cost = [];
    while (queue.length) {
      const next = queue.dequeue(),
        n = next.e,
        p = next.p,
        c = next.c;
      const type = pack.cultures[c].type;
      cells.c[n].forEach(function (e) {
        const biome = cells.biome[e];
        const biomeCost = getBiomeCost(c, biome, type);
        const biomeChangeCost = biome === cells.biome[n] ? 0 : 20; // penalty on biome change
        const heightCost = getHeightCost(e, cells.h[e], type);
        const riverCost = getRiverCost(cells.r[e], e, type);
        const typeCost = getTypeCost(cells.t[e], type);
        const totalCost =
          p +
          (biomeCost + biomeChangeCost + heightCost + riverCost + typeCost) /
            pack.cultures[c].expansionism;

        if (totalCost > neutral) return;

        if (!cost[e] || totalCost < cost[e]) {
          // assign culture to populated cell
          if (cells.s[e] > 0) cells.culture[e] = c;
          else cells.culture[e] = 0;
          cost[e] = totalCost;
          queue.queue({ e, p: totalCost, c });
        }
      });
    }

    TIME && console.timeEnd("expandCultures");
  };

  function getBiomeCost(c, biome, type) {
    if (cells.biome[pack.cultures[c].center] === biome) return 10; // tiny penalty for native biome
    if (type === "Hunting") return biomesData.cost[biome] * 5; // non-native biome penalty for hunters
    if (type === "Nomadic" && biome > 4 && biome < 10)
      return biomesData.cost[biome] * 10; // forest biome penalty for nomads
    return biomesData.cost[biome] * 2; // general non-native biome penalty
  }

  function getHeightCost(i, h, type) {
    const f = pack.features[cells.f[i]],
      a = cells.area[i];
    if (type === "Lake" && f.type === "lake") return 10; // no lake crossing penalty for Lake cultures
    if (type === "Naval" && h < 20) return a * 2; // low sea/lake crossing penalty for Naval cultures
    if (type === "Nomadic" && h < 20) return a * 50; // giant sea/lake crossing penalty for Nomads
    if (h < 20) return a * 6; // general sea/lake crossing penalty
    if (type === "Highland" && h < 44) return 3000; // giant penalty for highlanders on lowlands
    if (type === "Highland" && h < 62) return 200; // giant penalty for highlanders on lowhills
    if (type === "Highland") return 0; // no penalty for highlanders on highlands
    if (h >= 67) return 200; // general mountains crossing penalty
    if (h >= 44) return 30; // general hills crossing penalty
    return 0;
  }

  function getRiverCost(r, i, type) {
    if (type === "River") return r ? 0 : 100; // penalty for river cultures
    if (!r) return 0; // no penalty for others if there is no river
    return minmax(cells.fl[i] / 10, 20, 100); // river penalty from 20 to 100 based on flux
  }

  function getTypeCost(t, type) {
    if (t === 1)
      return type === "Naval" || type === "Lake"
        ? 0
        : type === "Nomadic"
        ? 60
        : 20; // penalty for coastline
    if (t === 2) return type === "Naval" || type === "Nomadic" ? 30 : 0; // low penalty for land level 2 for Navals and nomads
    if (t !== -1) return type === "Naval" || type === "Lake" ? 100 : 0; // penalty for mainland for navals
    return 0;
  }

  const getRandomShield = function () {
    const type = rw(COA.shields.types);
    return rw(COA.shields[type]);
  };
  // calculate states data like area, population etc.
  function collectStatistics() {
    TIME && console.time("collectStatistics");
    const cells = pack.cells,
      cultures = pack.cultures;
    cultures.forEach((s) => {
      if (s.removed) return;
      s.cells = s.area = s.burgs = s.rural = s.urban = 0;
      s.neighbors = new Set();
    });
    for (const i of cells.i) {
      if (cells.h[i] < 20) continue;
      const s = cells.culture[i];

      // check for neighboring cultures
      cells.c[i]
        .filter((c) => cells.h[c] >= 20 && cells.culture[c] !== s)
        .forEach((c) => cultures[s].neighbors.add(cells.culture[c]));

      // collect stats
      cultures[s].cells += 1;
      cultures[s].area += cells.area[i];
      cultures[s].rural += cells.pop[i];
      if (cells.burg[i]) {
        cultures[s].urban += pack.burgs[cells.burg[i]].population;
        cultures[s].burgs++;
      }
    }

    // convert neighbors Set object into array
    cultures.forEach((s) => {
      if (!s.neighbors) return;
      s.neighbors = Array.from(s.neighbors);
    });

    TIME && console.timeEnd("collectStatistics");
  }

  // calculate and draw curved state labels for a list of cultures
  const drawCultureLabels = function (list) {
    const { cells, features, cultures } = pack;
    const paths = []; // text paths
    lineGen.curve(d3.curveBundle.beta(1));
    for (const culture of cultures) {
      if (
        !culture.i ||
        culture.removed ||
        !culture.cells ||
        (list && !list.includes(culture.i))
      )
        continue;
      const used = [];
      const visualCenter = findCell(culture.pole[0], culture.pole[1]);
      const start =
        cells.culture[visualCenter] === culture.i
          ? visualCenter
          : culture.center;
      const hull = getHull(start, culture.i, culture.cells / 10);
      const points = [...hull].map((v) => pack.vertices.p[v]);
      const delaunay = Delaunator.from(points);
      const voronoi = new Voronoi(delaunay, points, points.length);
      const chain = connectCenters(voronoi.vertices, culture.pole[1]);
      const relaxed = chain
        .map((i) => voronoi.vertices.p[i])
        .filter((p, i) => i % 15 === 0 || i + 1 === chain.length);
      paths.push([culture.i, relaxed]);

      function getHull(start, culture, maxLake) {
        const queue = [start],
          hull = new Set();

        while (queue.length) {
          const q = queue.pop();
          const nQ = cells.c[q].filter((c) => cells.culture[c] === culture);

          cells.c[q].forEach(function (c, d) {
            const passableLake =
              features[cells.f[c]].type === "lake" &&
              features[cells.f[c]].cells < maxLake;
            if (cells.b[c] || (cells.culture[c] !== culture && !passableLake)) {
              hull.add(cells.v[q][d]);
              return;
            }
            const nC = cells.c[c].filter((n) => cells.culture[n] === culture);
            const intersected = common(nQ, nC).length;
            if (hull.size > 20 && !intersected && !passableLake) {
              hull.add(cells.v[q][d]);
              return;
            }
            if (used[c]) return;
            used[c] = 1;
            queue.push(c);
          });
        }

        return hull;
      }

      function connectCenters(c, y) {
        // check if vertex is inside the area
        const inside = c.p.map(function (p) {
          if (
            p[0] <= 0 ||
            p[1] <= 0 ||
            p[0] >= graphWidth ||
            p[1] >= graphHeight
          )
            return false; // out of the screen
          return used[findCell(p[0], p[1])];
        });

        const pointsInside = d3.range(c.p.length).filter((i) => inside[i]);
        if (!pointsInside.length) return [0];
        const h = c.p.length < 200 ? 0 : c.p.length < 600 ? 0.5 : 1; // power of horyzontality shift
        const end =
          pointsInside[
            d3.scan(
              pointsInside,
              (a, b) =>
                c.p[a][0] -
                c.p[b][0] +
                (Math.abs(c.p[a][1] - y) - Math.abs(c.p[b][1] - y)) * h
            )
          ]; // left point
        const start =
          pointsInside[
            d3.scan(
              pointsInside,
              (a, b) =>
                c.p[b][0] -
                c.p[a][0] -
                (Math.abs(c.p[b][1] - y) - Math.abs(c.p[a][1] - y)) * h
            )
          ]; // right point

        // connect leftmost and rightmost points with shortest path
        const queue = new PriorityQueue({ comparator: (a, b) => a.p - b.p });
        const cost = [],
          from = [];
        queue.queue({ e: start, p: 0 });

        while (queue.length) {
          const next = queue.dequeue(),
            n = next.e,
            p = next.p;
          if (n === end) break;

          for (const v of c.v[n]) {
            if (v === -1) continue;
            const totalCost = p + (inside[v] ? 1 : 100);
            if (from[v] || totalCost >= cost[v]) continue;
            cost[v] = totalCost;
            from[v] = n;
            queue.queue({ e: v, p: totalCost });
          }
        }

        // restore path
        const chain = [end];
        let cur = end;
        while (cur !== start) {
          cur = from[cur];
          if (inside[cur]) chain.push(cur);
        }
        return chain;
      }
    }

    void (function drawLabels() {
      let g = labels.select("#cultures");
      const t = defs.select("#textPaths");
      // const displayed = layerIsOn("toggleLabels");
      // if (!displayed)
      toggleLabels(1);
      if (!list) {
        // remove all labels and textpaths
        g.selectAll("text").remove();
        t.selectAll("path[id*='cultureLabel']").remove();
        labels.select("#states").selectAll("text").remove();
        t.selectAll("path[id*='stateLabel']").remove();
        labels.select("#religions").selectAll("text").remove();
        t.selectAll("path[id*='religionLabel']").remove();
      }
      if (typeof g._groups[0][0] == "undefined") {
        g = labels.append("g").attr("id", "cultures");
      }
      const example = g
        .append("text")
        .attr("x", 0)
        .attr("x", 0)
        .text("Average");
      const letterLength = example.node().getComputedTextLength() / 7; // average length of 1 letter
      paths.forEach((p) => {
        const id = p[0];
        const s = cultures[p[0]];
        let short = false;
        if (list) {
          t.select("#textPath_cultureLabel" + id).remove();
          g.select("#cultureLabel" + id).remove();
        }

        const path =
          p[1].length > 1
            ? lineGen(p[1])
            : `M${p[1][0][0] - 50},${p[1][0][1]}h${100}`;
        const textPath = t
          .append("path")
          .attr("d", path)
          .attr("id", "textPath_cultureLabel" + id);
        const pathLength =
          p[1].length > 1 ? textPath.node().getTotalLength() / letterLength : 0; // path length in letters

        let lines = [];
        let ratio = 100;

        if (pathLength < s.name.length) {
          // only short name will fit
          lines = splitInTwo(s.name);
          ratio = minmax(rn((pathLength / lines[0].length) * 60), 50, 150);
        } else if (pathLength > s.name.length * 2.5) {
          // full name will fit in one line
          lines = [s.name];
          ratio = minmax(rn((pathLength / lines[0].length) * 70), 70, 170);
        } else {
          // try miltilined label
          lines = splitInTwo(s.name);
          ratio = minmax(rn((pathLength / lines[0].length) * 60), 70, 150);
        }

        // prolongate path if it's too short
        if (pathLength && pathLength < lines[0].length) {
          const points = p[1];
          const f = points[0];
          const l = points[points.length - 1];
          const [dx, dy] = [l[0] - f[0], l[1] - f[1]];
          const mod = Math.abs((letterLength * lines[0].length) / dx) / 2;
          points[0] = [rn(f[0] - dx * mod), rn(f[1] - dy * mod)];
          points[points.length - 1] = [
            rn(l[0] + dx * mod),
            rn(l[1] + dy * mod),
          ];
          textPath.attr("d", round(lineGen(points)));
          short = true;
        }

        example.attr("font-size", ratio + "%");
        const top = (lines.length - 1) / -2; // y offset
        const spans = lines.map((l, d) => {
          example.text(l);
          const left = example.node().getBBox().width / -2; // x offset
          return `<tspan x="${left}px" dy="${d ? 1 : top}em">${l}</tspan>`;
        });

        const el = g
          .append("text")
          .attr("id", "cultureLabel" + id)
          .append("textPath")
          .attr("xlink:href", "#textPath_cultureLabel" + id)
          .attr("startOffset", "50%")
          .attr("font-size", ratio + "%")
          .node();

        el.insertAdjacentHTML("afterbegin", spans.join(""));
        if (lines.length < 2) return;

        // check whether multilined label is generally inside the culture. If no, replace with short name label
        const cs = pack.cells.culture;
        const b = el.parentNode.getBBox();
        const c1 = () => +cs[findCell(b.x, b.y)] === id;
        const c2 = () => +cs[findCell(b.x + b.width / 2, b.y)] === id;
        const c3 = () => +cs[findCell(b.x + b.width, b.y)] === id;
        const c4 = () => +cs[findCell(b.x + b.width, b.y + b.height)] === id;
        const c5 = () =>
          +cs[findCell(b.x + b.width / 2, b.y + b.height)] === id;
        const c6 = () => +cs[findCell(b.x, b.y + b.height)] === id;
        if (c1() + c2() + c3() + c4() + c5() + c6() > 3) return; // generally inside

        // use one-line name
        const name = s.name;
        example.text(name);
        const left = example.node().getBBox().width / -2; // x offset
        el.innerHTML = `<tspan x="${left}px">${name}</tspan>`;
        ratio = minmax(rn((pathLength / name.length) * 60), 40, 130);
        el.setAttribute("font-size", ratio + "%");
      });

      example.remove();
      toggleLabels(1);
    })();
  };

  return {
    generate,
    add,
    expand,
    getDefault,
    getRandomShield,
    drawCultureLabels,
    collectStatistics,
  };
})();
