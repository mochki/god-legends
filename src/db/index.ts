/*
  gender-category x classic-alt-form
  shiny-alpha-restriction x all-forms
*/
import { Gender } from "./gender.db";
import { Form } from "./form.db";
import { Illegal } from "./illegal.db";


// TODO: import { Evolution } from './evolution.db'

import { Task } from "./task.db";
import { Research } from "./research.db";

const Pokemon = _Pokemon();

Gender.forEach(([id, gender]) => {
  Pokemon[id].genders.push(gender);
});

Form.forEach(([id, form]) => {
  Pokemon[id].forms.push(form);
});

Illegal.forEach(([id, modifier, filter]) => {
  Pokemon[id].restrictions = {
    ...Pokemon[id].restrictions,
    [modifier]: filter,
  };
});

const shinyForm = (form) => `${form}-Shiny`;
const alphaForm = (form) => `${form}-Alpha`;

Object.values(Pokemon).forEach((pokemon) => {
  // @ts-expect-error duh
  pokemon.uniques = pokemon.forms.flatMap((form) => {
    const formName = `${pokemon.name}-${form}`;
    const forms = [formName];

    if (shinyP(pokemon, form)) {
      // forms.push(shinyForm(formName)); //* biggest compromise :(
      if (alphaP(pokemon, form)) {
        forms.push(shinyForm(alphaForm(formName)));
      } else {
        forms.push(shinyForm(formName));
      }
    } // Game specific - No alpha that can't be shiny

    return forms.flatMap((form) =>
      // @ts-expect-error duh
      pokemon.genders.map((gender) => `${form}-${gender}`)
    );
  });
});

const ResearchExpanded = Research.map(([id, taskId, goal]) => [
  id,
  { ...Task[taskId], goal },
]);

function _Pokemon() {
  const pokemons = {
    1: { name: "Rowlet" },
    2: { name: "Dartrix" },
    3: { name: "Decidueye" },
    4: { name: "Cyndaquil" },
    5: { name: "Quilava" },
    6: { name: "Typhlosion" },
    7: { name: "Oshawott" },
    8: { name: "Dewott" },
    9: { name: "Samurott" },
    10: { name: "Bidoof" },
    11: { name: "Bibarel" },
    12: { name: "Starly" },
    13: { name: "Staravia" },
    14: { name: "Staraptor" },
    15: { name: "Shinx" },
    16: { name: "Luxio" },
    17: { name: "Luxray" },
    18: { name: "Wurmple" },
    19: { name: "Silcoon" },
    20: { name: "Beautifly" },
    21: { name: "Cascoon" },
    22: { name: "Dustox" },
    23: { name: "Ponyta" },
    24: { name: "Rapidash" },
    25: { name: "Eevee" },
    26: { name: "Vaporeon" },
    27: { name: "Jolteon" },
    28: { name: "Flareon" },
    29: { name: "Espeon" },
    30: { name: "Umbreon" },
    31: { name: "Leafeon" },
    32: { name: "Glaceon" },
    33: { name: "Sylveon" },
    34: { name: "Zubat" },
    35: { name: "Golbat" },
    36: { name: "Crobat" },
    37: { name: "Drifloon" },
    38: { name: "Drifblim" },
    39: { name: "Kricketot" },
    40: { name: "Kricketune" },
    41: { name: "Buizel" },
    42: { name: "Floatzel" },
    43: { name: "Burmy" },
    44: { name: "Wormadam" },
    45: { name: "Mothim" },
    46: { name: "Geodude" },
    47: { name: "Graveler" },
    48: { name: "Golem" },
    49: { name: "Stantler" },
    50: { name: "Wyrdeer" },
    51: { name: "Munchlax" },
    52: { name: "Snorlax" },
    53: { name: "Paras" },
    54: { name: "Parasect" },
    55: { name: "Pichu" },
    56: { name: "Pikachu" },
    57: { name: "Raichu" },
    58: { name: "Abra" },
    59: { name: "Kadabra" },
    60: { name: "Alakazam" },
    61: { name: "Chimchar" },
    62: { name: "Monferno" },
    63: { name: "Infernape" },
    64: { name: "Buneary" },
    65: { name: "Lopunny" },
    66: { name: "Cherubi" },
    67: { name: "Cherrim" },
    68: { name: "Psyduck" },
    69: { name: "Golduck" },
    70: { name: "Combee" },
    71: { name: "Vespiquen" },
    72: { name: "Scyther" },
    73: { name: "Kleavor" },
    74: { name: "Scizor" },
    75: { name: "Heracross" },
    76: { name: "Mime Jr." },
    77: { name: "Mr. Mime" },
    78: { name: "Aipom" },
    79: { name: "Ambipom" },
    80: { name: "Magikarp" },
    81: { name: "Gyarados" },
    82: { name: "Shellos" },
    83: { name: "Gastrodon" },
    84: { name: "Qwilfish" },
    85: { name: "Overqwil" },
    86: { name: "Happiny" },
    87: { name: "Chansey" },
    88: { name: "Blissey" },
    89: { name: "Budew" },
    90: { name: "Roselia" },
    91: { name: "Roserade" },
    92: { name: "Carnivine" },
    93: { name: "Petilil" },
    94: { name: "Lilligant" },
    95: { name: "Tangela" },
    96: { name: "Tangrowth" },
    97: { name: "Barboach" },
    98: { name: "Whiscash" },
    99: { name: "Croagunk" },
    100: { name: "Toxicroak" },
    101: { name: "Ralts" },
    102: { name: "Kirlia" },
    103: { name: "Gardevoir" },
    104: { name: "Gallade" },
    105: { name: "Yanma" },
    106: { name: "Yanmega" },
    107: { name: "Hippopotas" },
    108: { name: "Hippowdon" },
    109: { name: "Pachirisu" },
    110: { name: "Stunky" },
    111: { name: "Skuntank" },
    112: { name: "Teddiursa" },
    113: { name: "Ursaring" },
    114: { name: "Ursaluna" },
    115: { name: "Goomy" },
    116: { name: "Sliggoo" },
    117: { name: "Goodra" },
    118: { name: "Onix" },
    119: { name: "Steelix" },
    120: { name: "Rhyhorn" },
    121: { name: "Rhydon" },
    122: { name: "Rhyperior" },
    123: { name: "Bonsly" },
    124: { name: "Sudowoodo" },
    125: { name: "Lickitung" },
    126: { name: "Lickilicky" },
    127: { name: "Togepi" },
    128: { name: "Togetic" },
    129: { name: "Togekiss" },
    130: { name: "Turtwig" },
    131: { name: "Grotle" },
    132: { name: "Torterra" },
    133: { name: "Porygon" },
    134: { name: "Porygon2" },
    135: { name: "Porygon-Z" },
    136: { name: "Gastly" },
    137: { name: "Haunter" },
    138: { name: "Gengar" },
    139: { name: "Spiritomb" },
    140: { name: "Murkrow" },
    141: { name: "Honchkrow" },
    142: { name: "Unown" },
    143: { name: "Spheal" },
    144: { name: "Sealeo" },
    145: { name: "Walrein" },
    146: { name: "Remoraid" },
    147: { name: "Octillery" },
    148: { name: "Skorupi" },
    149: { name: "Drapion" },
    150: { name: "Growlithe" },
    151: { name: "Arcanine" },
    152: { name: "Glameow" },
    153: { name: "Purugly" },
    154: { name: "Machop" },
    155: { name: "Machoke" },
    156: { name: "Machamp" },
    157: { name: "Chatot" },
    158: { name: "Duskull" },
    159: { name: "Dusclops" },
    160: { name: "Dusknoir" },
    161: { name: "Piplup" },
    162: { name: "Prinplup" },
    163: { name: "Empoleon" },
    164: { name: "Mantyke" },
    165: { name: "Mantine" },
    166: { name: "Basculin" },
    167: { name: "Basculegion" },
    168: { name: "Vulpix" },
    169: { name: "Ninetales" },
    170: { name: "Tentacool" },
    171: { name: "Tentacruel" },
    172: { name: "Finneon" },
    173: { name: "Lumineon" },
    174: { name: "Magby" },
    175: { name: "Magmar" },
    176: { name: "Magmortar" },
    177: { name: "Magnemite" },
    178: { name: "Magneton" },
    179: { name: "Magnezone" },
    180: { name: "Bronzor" },
    181: { name: "Bronzong" },
    182: { name: "Elekid" },
    183: { name: "Electabuzz" },
    184: { name: "Electivire" },
    185: { name: "Gligar" },
    186: { name: "Gliscor" },
    187: { name: "Gible" },
    188: { name: "Gabite" },
    189: { name: "Garchomp" },
    190: { name: "Nosepass" },
    191: { name: "Probopass" },
    192: { name: "Voltorb" },
    193: { name: "Electrode" },
    194: { name: "Rotom" },
    195: { name: "Chingling" },
    196: { name: "Chimecho" },
    197: { name: "Misdreavus" },
    198: { name: "Mismagius" },
    199: { name: "Cleffa" },
    200: { name: "Clefairy" },
    201: { name: "Clefable" },
    202: { name: "Sneasel" },
    203: { name: "Sneasler" },
    204: { name: "Weavile" },
    205: { name: "Snorunt" },
    206: { name: "Glalie" },
    207: { name: "Froslass" },
    208: { name: "Cranidos" },
    209: { name: "Rampardos" },
    210: { name: "Shieldon" },
    211: { name: "Bastiodon" },
    212: { name: "Swinub" },
    213: { name: "Piloswine" },
    214: { name: "Mamoswine" },
    215: { name: "Bergmite" },
    216: { name: "Avalugg" },
    217: { name: "Snover" },
    218: { name: "Abomasnow" },
    219: { name: "Zorua" },
    220: { name: "Zoroark" },
    221: { name: "Rufflet" },
    222: { name: "Braviary" },
    223: { name: "Riolu" },
    224: { name: "Lucario" },
    225: { name: "Uxie" },
    226: { name: "Mesprit" },
    227: { name: "Azelf" },
    228: { name: "Heatran" },
    229: { name: "Regigigas" },
    230: { name: "Cresselia" },
    231: { name: "Tornadus" },
    232: { name: "Thundurus" },
    233: { name: "Landorus" },
    234: { name: "Enamorus" },
    235: { name: "Dialga" },
    236: { name: "Palkia" },
    237: { name: "Giratina" },
    238: { name: "Arceus" },
    239: { name: "Phione" },
    240: { name: "Manaphy" },
    241: { name: "Shaymin" },
    242: { name: "Darkrai" },
  };

  Object.values(pokemons).forEach((pokemon) => {
    // @ts-expect-error duh
    pokemon.genders = [];
    // @ts-expect-error duh
    pokemon.forms = [];
    // restrictions?: []
  });

  return pokemons;
}

function shinyP(pokemon, form) {
  if (!(pokemon.restrictions || {})["Shiny"]) {
    return true;
  }
  return !form.match(pokemon.restrictions["Shiny"]);
}

function alphaP(pokemon, form) {
  if (!(pokemon.restrictions || {})["Alpha"]) {
    return true;
  }
  return !form.match(pokemon.restrictions["Alpha"]);
}

// @ts-expect-error duh
window.YY = { Pokemon, ResearchExpanded };
export { Pokemon, ResearchExpanded as Research };
