import { Component, OnInit, Input, EventEmitter, Output } from "@angular/core";

const hooks = [
  "Blood",
  "Things Aren't Right",
  "Body Changes",
  "Mind Changes",
  "The Hunt",
  "Monsters",
  "Mysterious Disappearances",
  "The Gift",
  "Mistaken Identity",
  "Mis-Deliveries & Documents",
  "Random Violence",
  "A Prophecy",
  "Disasters and Catastrophes",
  "Job Offer",
  "The Mysterious Friend",
  "A Sudden Trip",
];
@Component({
  selector: "app-hooks",
  templateUrl: "./hooks.component.html",
  styleUrls: ["./hooks.component.scss"],
})
export class StoryHooksComponent implements OnInit {
  public hooks = hooks;
  @Output() hookEmitter: EventEmitter<any> = new EventEmitter();
  @Input()
  public selectedHook = null;
  constructor() {}
  selectHook(hook = "Random") {
    if (hook === "Random") {
      hook = this.ra(this.hooks);
    }
    this.hookEmitter.emit(hook);
    this.selectedHook = hook;
  }

  ngOnInit(): void {}
  // random number in a range
  rand(x = 1, y) {
    return x + (crypto.getRandomValues(new Uint32Array(1))[0] % (y - x + 1));
  }

  // return random value from the array
  ra(array) {
    return array[this.rand(0, array.length - 1)];
  }
}

export class HookGenerator {
  generateHook() {
    let hook = this.ra(hooks);
    let hookDetails = { note: null, type: null };
    switch (hook) {
      case "Blood":
        hookDetails.type = "Blood";
        switch (this.rand(1, 4)) {
          case 1:
            hookDetails.note =
              "The party finds a small pool of blood " +
              this.ra([
                "someplace creepy (dark alley, abandoned home, eery basement, etc). ",
                "someplace personal (bedroom, backpack/trunk, etc). ",
              ]);
            if (this.rand(0, 1)) {
              hookDetails.note +=
                " There are smudges in the blood that look like " +
                this.ra([
                  "a partial hand-print",
                  "a partially-formed word",
                  "a dragged heel",
                  "an arcane symbol",
                  "a religious symbol",
                ]);
            }
            break;
          case 2:
            hookDetails.note =
              "A PC's wound (from combat, or mysteriously appeared) won't heal right.  Whenever they are " +
              this.ra(["distracted", "stressed", "asleep", "tired", "hungry"]) +
              " it reopens leaving a trail of blood and soaking through any worn clothing.";
            break;
          case 3:
            hookDetails.note =
              "The party finds a room doused in blood.  Spattered on walls, windows, even on the ceiling. ";
            if (this.rand(0, 1)) {
              hookDetails.note +=
                "It is used to mark ornate " +
                this.ra(["occult", "arcane"]) +
                " symbols " +
                this.ra([
                  "along the lintel",
                  "on the floor",
                  "on the ceiling",
                  "on the walls",
                ]);
            }
            break;
          case 4:
            hookDetails.note =
              "The party finds a trail of blood leading " +
              this.ra([
                "into an abandoned house",
                "into the woods",
                "into a prominent figure's home.",
              ]);
            break;
        }

        break;
      case "Things Aren't Right":
        hookDetails.type = "Things Aren't Right";
        switch (this.rand(1, 4)) {
          case 1:
            hookDetails.note =
              "Everyone in the nearby " +
              this.ra([
                "town",
                "place of worship",
                "tavern",
                "inn",
                "village",
                "barracks",
              ]) +
              " has vanished... ";
            if (!this.rand(0, 3)) {
              hookDetails.note += "leaving all their belongings behind";
            }
            break;
          case 2:
            hookDetails.note =
              "A PC" +
              this.ra([
                "'s " +
                  this.ra([
                    "hearing",
                    "sight",
                    "sense of touch",
                    "sense of smell",
                  ]) +
                  " is " +
                  this.ra(["gone.", "diminished.", "enhanced."]),
                "'s voice is " +
                  this.ra(["higher", "deeper", "louder", "quieter"]) +
                  " than normal",
                "'s " +
                  this.ra(["hair", "eyes", "skin"]) +
                  " is a different color than normal",
                " is " + this.ra(["taller", "shorter"]) + " than normal",
              ]);
            break;
          case 3:
            hookDetails.note =
              "Little details are wrong.  The sky is too blue, the grass is not quite green, the cloud shapes are slightly off, etc.";
            break;
          case 4:
            hookDetails.note = "An NPC isn't acting quite right.  ";
            break;
        }
        break;
      case "Body Changes":
        hookDetails.type = "Body Changes";
        switch (this.rand(1, 2)) {
          case 1:
            hookDetails.note =
              "One or more of the PCs are growing " +
              this.ra(["gills", "horns", "body hair", "scales", "feathers"]) +
              ". Slowly at first, but with an accelerating pace.";
            break;
          case 2:
            hookDetails.note =
              "A PC (or the entire party) is starting to disappear! Slowly, bit by bit, they is becoming incorporeal.";
            break;
        }
      case "Mind Changes":
        hookDetails.type = "Mind Changes";
        switch (this.rand(1, 3)) {
          case 1:
            hookDetails.note =
              "Unbeknownst to them, a PC is having blackout periods.  Eventually they start meeting NPCs that have memories of the PC.";
            break;
          case 2:
            hookDetails.note =
              " A character starts experiencing emotions that don't match the situation. Irrational anger, sadness, and joy.";
            break;
          case 3:
            hookDetails.note =
              "A PC has thoughts that aren't his own.  At first they seem like perfectly normal subconscious thoughts, but the slowlly become more extreme (extremely detrimental/helpful/both).";
            break;
        }

        break;
      case "The Hunt":
        hookDetails.type = "The Hunt";
        switch (this.rand(1, 3)) {
          case 1:
            hookDetails.note =
              "The party is being tracked by an unseen (or invisible) hunter. They hear it occasionally or sees signs of its passing, but it leaves no tracks to be followed.";
            break;
          case 2:
            hookDetails.note =
              "The party is hunted by something or someone slow-yet-inexorable. They can outrun it. They can flee it. But slowly, somehow, it always catches up with them again.";
            break;
          case 3:
            hookDetails.note =
              "The party finds a room doused in blood.  Spattered on walls, windows, even on the ceiling. ";
            break;
        }

        break;
      case "Monsters":
        hookDetails.type = "Monsters";
        switch (this.rand(1, 2)) {
          case 1:
            hookDetails.note =
              "A monster (either previously captured by the PC's or somehow set free by the PCs) goes on a bloody rampage.  Do the PC's feel responsible enough to help?";
            break;
          case 2:
            hookDetails.note =
              "A monster is pretending to be human.  Come up with small ways to raise suspicion.  Are they a threat or just living a life among humans...";
        }
        break;
      case "Mysterious Disappearances":
        hookDetails.type = "Mysterious Disappearances";
        switch (this.rand(1, 4)) {
          case 1:
            hookDetails.note =
              "A party member or ally ends up in the hospital, where they discover patients are" +
              this.ra(["slowly", "slowly", "rapidly"]) +
              " disappearing.";
            if (this.rand(0, 1)) {
              hookDetails.note += " Leaving no apparent evidence behind.";
            }
            break;
          case 2:
            hookDetails.note =
              "A PC's (recognizeable) weapon is stolen and used to commit a crime.";
            if (this.rand(0, 1)) {
              hookDetails.note +=
                " It is only a matter of time before the crime is discovered and the party implicated.  Do they cover it up or attempt to prove their innocence?";
            } else {
              hookDetails.note +=
                " The authorities are already looking for the party for questioning.";
            }
            break;
          case 3:
            hookDetails.note =
              "The entire city/town disappears from around the party while they're asleep.";
            break;
          case 4:
            hookDetails.note =
              "A ally of the party " +
              this.ra([
                "screams and vanishes.",
                "fadess away.",
                "gets sucked into a vortex.",
              ]);
            break;
        }
        break;
      case "The Gift":
        hookDetails.type = "The Gift";
        let descrip =
          this.ra(["light", "dark", ""]) +
          this.ra(["blue", "green", "brown", "red", "purple", ""]);
        hookDetails.note =
          "A " +
          this.ra(["tall", "short", "nondescript"]) +
          this.ra([" man", " woman"]);
        if (this.rand(0, 1) && descrip) {
          hookDetails.note += " with " + descrip + this.ra([" hair", " eyes"]);
        }
        hookDetails.note +=
          " approaches you and hands you a parcel." +
          this.ra([
            " They offer no explanation.  They simply turn and walk away",
            "They inform you this is from a friend.",
            " They stand with a hand outstreached, waiting for something.",
          ]) +
          " Inside you find ";
        hookDetails.note += this.ra([
          "a pair of antique, curved blades with script on each side; they're incredibly sharp.",
          "an ancient tomb with a " +
            this.ra(["brass", "gold", "silver", "tarnished"]) +
            " lock.",
          "a small " +
            this.ra(["cat", "dog", "weasel", "bird", "lizard"]) +
            " with a " +
            this.ra(["brass", "gold", "silver", "tarnished"]) +
            this.ra([" anklet", " collar"]),
          "a large " +
            this.ra([
              "ruby",
              "emerald",
              "diamond",
              "saphire",
              "jewel",
              "crystal",
            ]),
          "nothing at all, but you suddenly feel strange...",
        ]);
        break;
      case "Mistaken Identity":
        hookDetails.type = "Mistaken Identity";
        switch (this.rand(1, 3)) {
          case 1:
            hookDetails.note =
              "A PC is mistaken for local politician or officer who's been ";
            hookDetails.note += this.ra([
              "making backalley deals with",
              "cracking down on",
              "taking bribes from",
              "spying on",
            ]);
            hookDetails.note +=
              " " +
              this.ra([
                "a gang/guild",
                "the merchants",
                "a burgler",
                "the church",
                "the inkeeper",
              ]);
            hookDetails.note += ".";
            break;
          case 2:
            hookDetails.note =
              "A PC is mistaken for an assasin/bounty hunter. A stranger approaches the party handing them a parcel with money, and a dosier of details on an NPC.";
            break;
          case 3:
            hookDetails.note =
              "A PC is mistaken for a criminal.  It won't take long for someone to report them to the authorities.";
            break;
        }

        break;
      case "Mis-Deliveries & Documents":
        hookDetails.type = "Mis-Deliveries & Documents";
        hookDetails.note = "The party somehow comes across";
        switch (this.rand(1, 2)) {
          case 1:
            hookDetails.note +=
              " a severed " +
              this.ra(["hand", "arm", "finger", "head", "leg", "foot"]) +
              " (where one would not normally expect to find such a thing...)";
            if (this.rand(0, 3)) {
              hookDetails.note +=
                ".  There appears to be a strange symbol drawn on it.";
            }
            break;
          case 2:
            hookDetails.note += " a map with several buildings circled on it.";
            if (this.rand(0, 3)) {
              hookDetails.note +=
                " It appears as though someone was attempting to burn it.";
            }
            break;
        }
        break;
      case "Random Violence":
        hookDetails.type = "Random Violence";
        switch (this.rand(1, 4)) {
          case 1:
            hookDetails.note = "A random monster encounter.";
            if (this.rand(0, 1)) {
              hookDetails.note +=
                " Twist: " +
                this.ra([
                  "the mosters are the victims.",
                  "there are innocents which must be protected.",
                  "the party can hear the battle, but can't see it.",
                  "its a baby monster and its mother is dead.",
                ]);
            }
            break;
          case 2:
            hookDetails.note =
              "Someone mugs an NPC that the party cares about and grabs their satchel.  Aside from being brutalized, something important to the NPC was stolen and they desparately need it back.";
            break;
          case 3:
            hookDetails.note =
              "The party finds a room doused in blood.  Spattered on walls, windows, even on the ceiling. ";
            break;
          case 4:
            hookDetails.note =
              "A friend of the party attacks a party member for no apparent reason.";
            break;
        }
        break;
      case "A Prophecy":
        hookDetails.type = "A Prophecy";
        switch (this.rand(1, 2)) {
          case 1:
            hookDetails.note =
              "Have a fortune-teller offer to tell the fortunes of the party. Use a tarot deck and pull one or two cards for each PC (make notes of which cards you pull). Have the fortune-teller nod wisely and make suitably vague predictions based on the cards. Make one come true and let the party run around worrying about what the rest mean and how they'll happen. (Spend the next week figuring out how the predictions will actually come true.)";
            break;
          case 2:
            hookDetails.note =
              "An NPC has a vision where " +
              this.ra(["another NPC", "a party member"]) +
              " stands atop a hill over a field of " +
              this.ra([
                "corpses",
                "townsfolk",
                "monsters",
                "warriors",
                "blood",
              ]) +
              ".  It is unclear whether they are a savior or a villian.";
            break;
        }
        break;
      case "Disasters and Catastrophes":
        hookDetails.type = "Disasters and Catastrophes";
        switch (this.rand(1, 5)) {
          case 1:
            hookDetails.note =
              "An earthquake.  Is the party buried? Will they help the locals? Was this magical or natural?";
            break;
          case 2:
            hookDetails.note = "A fire.";
            break;
          case 3:
            hookDetails.note = "A riot";
            break;
          case 4:
            hookDetails.note = "A flood";
            break;
          case 4:
            hookDetails.note = "A drought";
            break;
        }
        break;
      case "Job Offer":
        hookDetails.type = "Job Offer";
        switch (this.rand(1, 4)) {
          case 1:
            hookDetails.note =
              "Someone powerful has heard the party are particularly good bodyguards or protectors. They " +
              this.ra(["force", "offer to pay", "blackmail"]) +
              " them to protect a member of their family";
            if (this.rand(0, 1)) {
              hookDetails.note +=
                " who doesn't want to be protected and who has figured out how to elude the security the family member usually uses.";
            }
            break;
          case 2:
            hookDetails.note =
              "Someone offers a party (/member) a job they're clearly unqualified for.  Do they wing it? Hire help? Decline and face the consequences?";
            break;
          case 3:
            hookDetails.note =
              "Someone offers to pay the party an impressive sum of money if they'll just deliver a letter for him. ";
            hookDetails.note += this.ra([
              "The job goes off without a hitch...  or did it?",
              "The party is amushed on the way by the (supposed?) true recipients of the letter.",
              " When the party arrives there are a pair of identical twins each claiming to be the recipient.",
            ]);
            break;
          case 4:
            hookDetails.note =
              "Someone offers to pay the party to watch a person for a day and report on all of her activities.";
            break;
        }
        break;
      case "The Mysterious Friend":
        hookDetails.type = "The Mysterious Friend";
        switch (this.rand(1, 3)) {
          case 1:
            hookDetails.note =
              "Someone shows up claiming to be a party member's child, but the PC is sure he (or she!) never had a child.";
            if (this.rand(0, 1)) {
              hookDetails.note +=
                " What is even stranger is the NPC looks very much like a younger version of the PC.";
            }
            break;
          case 2:
            hookDetails.note =
              "Someone shows up claiming to be a party member's childhood best friend, but the party member doesn't remember them.";
            if (this.rand(0, 1)) {
              hookDetails.note +=
                " If contacted the PC's family " +
                this.ra(["does", "doesn't"]) +
                " remember them.";
            }
            break;
          case 3:
            hookDetails.note =
              "Someone claims to be a party member's " +
              this.ra([
                "distant relative",
                "aunt",
                "mother",
                "father",
                "uncle",
                "grandparent",
                "cousin",
              ]) +
              ".";
            break;
        }

        break;
      case "A Sudden Trip":
        hookDetails.type = "A Sudden Trip";
        switch (this.rand(1, 2)) {
          case 1:
            hookDetails.note =
              "The party falls through a deep dark hole into some tunnels beneath the city. Climb out or explore?";
            if (this.rand(0, 1)) {
              hookDetails.note +=
                "One (and only one) member of the party hears a faint voice calling from the darkness.";
            }
            break;
          case 2:
            hookDetails.note =
              "The party is rendered unconscious and wakes up in a " +
              this.ra([
                "jail cell.",
                "surreal land unlike anything the've seen before.",
                "bed with several people they don't recognize (are they clothed?)",
                "pile of bodies.",
                "somewhere else.",
              ]);
            break;
        }

        break;
    }
    return hookDetails;
  }

  // random number in a range
  rand(x = 1, y) {
    return x + (crypto.getRandomValues(new Uint32Array(1))[0] % (y - x + 1));
  }

  // return random value from the array
  ra(array) {
    return array[this.rand(0, array.length - 1)];
  }
}
