import { World } from "./types";

export interface Rectangle {
  x: number;
  y: number;
  width: number;
  height: number;
  name: string;
}

interface ProcessedRectangle extends Rectangle {
  area: number;
  parents: string[];
}

function getArea(obj: Rectangle): number {
  return obj.width * obj.height;
}

function setValue(world: World, parents: string[], child: string): void {
  let current = world;

  for (const parent of parents) {
    if (!current[parent]) {
      current[parent] = {};
    }
    current = current[parent] as World;
  }

  current[child] = 0;
}

function isInside(obj1: Rectangle, obj2: Rectangle): boolean {
  return (
    obj1.x > obj2.x &&
    obj1.y > obj2.y &&
    obj1.x + obj1.width < obj2.x + obj2.width &&
    obj1.y + obj1.height < obj2.y + obj2.height
  );
}

export function buildSpatialWorld(rectangles: Rectangle[]): World {
  const processedRectangles: ProcessedRectangle[] = rectangles.map((r) => ({
    ...r,
    area: getArea(r),
    parents: [],
  }));

  // Sort by area
  processedRectangles.sort((a, b) => b.area - a.area);

  // Find parents
  for (let i = 0; i < processedRectangles.length; i++) {
    for (let j = 0; j < processedRectangles.length; j++) {
      if (isInside(processedRectangles[i], processedRectangles[j])) {
        processedRectangles[i].parents.push(processedRectangles[j].name);
      }
    }
  }

  const world: World = {};

  // sort by increasing number of parents
  processedRectangles.sort((a, b) => a.parents.length - b.parents.length);
  // sort parents by area too, (smaller parents first)
  processedRectangles.forEach((r) =>
    r.parents.sort((a, b) => {
      const aParent = processedRectangles.find((pr) => pr.name === a);
      const bParent = processedRectangles.find((pr) => pr.name === b);
      if (!aParent || !bParent) {
        return 0;
      }
      return aParent.area - bParent.area;
    })
  );

  // if they don't have parents, they are the root
  // attach each element to the first parent that has already been added
  processedRectangles.forEach((r) => {
    if (r.parents.length === 0) {
      world[r.name] = 0;
    } else {
      setValue(world, r.parents, r.name);
    }
  });

  return world;
}

export const sampleWorld: Rectangle[] = [
  {
    x: 2119,
    y: 136,
    width: 79,
    height: 114,
    name: "thomas_miller_bathtub",
  },
  {
    x: 2052,
    y: 141,
    width: 47,
    height: 118,
    name: "thomas_miller_toilet",
  },
  {
    x: 2054,
    y: 388,
    width: 125,
    height: 86,
    name: "thomas_miller_bed",
  },
  {
    x: 2040,
    y: 520,
    width: 72,
    height: 48,
    name: "thomas_miller_table",
  },
  {
    x: 2194,
    y: 518,
    width: -36,
    height: 50,
    name: "thomas_miller_chair",
  },
  {
    x: 2045,
    y: 595,
    width: 114,
    height: 120,
    name: "miller_computer",
  },
  {
    x: 2343,
    y: 136,
    width: 86,
    height: 122,
    name: "susan_miller_bathtub",
  },
  {
    x: 2277,
    y: 142,
    width: 51,
    height: 117,
    name: "susan_miller_toilet",
  },
  {
    x: 2278,
    y: 389,
    width: 126,
    height: 86,
    name: "susan_miller_bed",
  },
  {
    x: 2268,
    y: 516,
    width: 70,
    height: 70,
    name: "susan_miller_table",
  },
  {
    x: 2380,
    y: 518,
    width: 42,
    height: 68,
    name: "susan_miller_chair",
  },
  {
    x: 2572,
    y: 135,
    width: 85,
    height: 121,
    name: "lucy_miller_bathtub",
  },
  {
    x: 2508,
    y: 143,
    width: 46,
    height: 118,
    name: "lucy_miller_toilet",
  },
  {
    x: 2508,
    y: 390,
    width: 127,
    height: 90,
    name: "lucy_miller_bed",
  },
  {
    x: 2492,
    y: 522,
    width: 74,
    height: 68,
    name: "lucy_miller_table",
  },
  {
    x: 2610,
    y: 517,
    width: 39,
    height: 71,
    name: "lucy_miller_chair",
  },
  {
    x: 2734,
    y: 141,
    width: 48,
    height: 116,
    name: "mike_miller_toilet",
  },
  {
    x: 2798,
    y: 135,
    width: 85,
    height: 117,
    name: "mike_miller_bathtub",
  },
  {
    x: 2736,
    y: 390,
    width: 123,
    height: 85,
    name: "mike_miller_bed",
  },
  {
    x: 2720,
    y: 515,
    width: 73,
    height: 74,
    name: "mike_miller_table",
  },
  {
    x: 2841,
    y: 517,
    width: 34,
    height: 65,
    name: "mike_miller_chair",
  },
  { x: 2956, y: 141, width: 84, height: 126, name: "miller_fridge" },
  {
    x: 3117,
    y: 246,
    width: 238,
    height: 209,
    name: "miller_dinning",
  },
  {
    x: 2957,
    y: 486,
    width: 162,
    height: 142,
    name: "miller_cupboard",
  },
  { x: 3071, y: 122, width: 54, height: 49, name: "miller_stove" },
  {
    x: 3467,
    y: 313,
    width: 55,
    height: 43,
    name: "miller_telephone",
  },
  {
    x: 2043,
    y: 134,
    width: 204,
    height: 510,
    name: "thomas_miller_room",
  },
  {
    x: 2274,
    y: 134,
    width: 204,
    height: 492,
    name: "susan_miller_room",
  },
  {
    x: 2502,
    y: 134,
    width: 202,
    height: 492,
    name: "lucy_miller_room",
  },
  {
    x: 2729,
    y: 135,
    width: 204,
    height: 491,
    name: "mike_miller_room",
  },
  {
    x: 119,
    y: 143,
    width: 50,
    height: 120,
    name: "james_johnson_toilet",
  },
  {
    x: 183,
    y: 138,
    width: 87,
    height: 117,
    name: "james_johnson_bathtub",
  },
  {
    x: 121,
    y: 390,
    width: 125,
    height: 88,
    name: "james_johnson_bed",
  },
  {
    x: 107,
    y: 517,
    width: 68,
    height: 52,
    name: "james_johnson_table",
  },
  {
    x: 227,
    y: 517,
    width: 34,
    height: 53,
    name: "james_johnson_chair",
  },
  {
    x: 113,
    y: 594,
    width: 108,
    height: 115,
    name: "johnson_computer",
  },
  {
    x: 346,
    y: 141,
    width: 50,
    height: 119,
    name: "linda_johnson_toilet",
  },
  {
    x: 410,
    y: 135,
    width: 86,
    height: 121,
    name: "linda_johnson_bathtub",
  },
  {
    x: 343,
    y: 387,
    width: 125,
    height: 82,
    name: "linda_johnson_bed",
  },
  {
    x: 331,
    y: 518,
    width: 78,
    height: 70,
    name: "linda_johnson_table",
  },
  {
    x: 452,
    y: 517,
    width: 38,
    height: 68,
    name: "linda_johnson_chair",
  },
  {
    x: 340,
    y: 135,
    width: 200,
    height: 481,
    name: "linda_johnson_room",
  },
  {
    x: 113,
    y: 133,
    width: 202,
    height: 495,
    name: "james_johnson_room",
  },
  {
    x: 574,
    y: 143,
    width: 48,
    height: 116,
    name: "henry_johnson_toilet",
  },
  {
    x: 638,
    y: 135,
    width: 86,
    height: 119,
    name: "henry_johnson_bathtub",
  },
  {
    x: 576,
    y: 390,
    width: 123,
    height: 90,
    name: "henry_johnson_bed",
  },
  {
    x: 558,
    y: 519,
    width: 77,
    height: 69,
    name: "henry_johnson_table",
  },
  {
    x: 680,
    y: 515,
    width: 37,
    height: 76,
    name: "henry_johnson_chair",
  },
  {
    x: 570,
    y: 137,
    width: 198,
    height: 481,
    name: "henry_johnson_room",
  },
  {
    x: 801,
    y: 142,
    width: 48,
    height: 117,
    name: "nicole_johnsoon_toilet",
  },
  {
    x: 864,
    y: 135,
    width: 89,
    height: 123,
    name: "nicole_johnson_bathtub",
  },
  {
    x: 801,
    y: 388,
    width: 127,
    height: 90,
    name: "nicole_johnson_bed",
  },
  {
    x: 788,
    y: 515,
    width: 74,
    height: 74,
    name: "nicole_johnson_bed_2",
  },
  {
    x: 785,
    y: 516,
    width: 78,
    height: 72,
    name: "nicole_johnson_table",
  },
  {
    x: 906,
    y: 513,
    width: 40,
    height: 77,
    name: "nicole_johnson_chair",
  },
  {
    x: 796,
    y: 135,
    width: 201,
    height: 490,
    name: "nicole_johnson_room",
  },
  { x: 1024, y: 140, width: 77, height: 116, name: "johnson_fridge" },
  { x: 1138, y: 122, width: 55, height: 49, name: "johnson_stove" },
  {
    x: 1184,
    y: 246,
    width: 251,
    height: 210,
    name: "johnson_dinning",
  },
  {
    x: 1023,
    y: 487,
    width: 167,
    height: 137,
    name: "johnson_cupboard",
  },
  {
    x: 1534,
    y: 311,
    width: 60,
    height: 49,
    name: "johnson_telephone",
  },
  {
    x: 2024.5,
    y: 116.00390625,
    width: 1523,
    height: 700,
    name: "miller_house",
  },
  {
    x: 89,
    y: 116.00390625,
    width: 1528,
    height: 702,
    name: "johnson_house",
  },
  {
    x: 586,
    y: 1629.50390625,
    width: 0,
    height: 0,
    name: "taiki_restaurant",
  },
  {
    x: 401,
    y: 1770.50390625,
    width: 217,
    height: 160,
    name: "taiki_seating1",
  },
  {
    x: 404,
    y: 2002.50390625,
    width: 160,
    height: 99,
    name: "taiki_seating2",
  },
  {
    x: 405,
    y: 2168.50390625,
    width: 214,
    height: 107,
    name: "taiki_seating3",
  },
  {
    x: 235,
    y: 1705.50390625,
    width: 42,
    height: 41,
    name: "taiki_bread1",
  },
  {
    x: 289,
    y: 1708.50390625,
    width: 46,
    height: 37,
    name: "taiki_bread2",
  },
  {
    x: 346,
    y: 1708.50390625,
    width: 42,
    height: 36,
    name: "taiki_bread3",
  },
  {
    x: 345,
    y: 1664.50390625,
    width: 46,
    height: 36,
    name: "taiki_knife",
  },
  {
    x: 232,
    y: 1666.50390625,
    width: 109,
    height: 33,
    name: "taiki_plate",
  },
  {
    x: 529,
    y: 2404.50390625,
    width: 65,
    height: 38,
    name: "taiki_utensil1",
  },
  {
    x: 642,
    y: 2403.50390625,
    width: 66,
    height: 40,
    name: "taiki_utensil2",
  },
  {
    x: 219,
    y: 1992.50390625,
    width: 81,
    height: 96,
    name: "taiki_grill1",
  },
  {
    x: 217,
    y: 1874.50390625,
    width: 86,
    height: 102,
    name: "taiki_grill2",
  },
  {
    x: 288,
    y: 2397.50390625,
    width: 42,
    height: 33,
    name: "taiki_meat",
  },
  {
    x: 400,
    y: 2397.50390625,
    width: 46,
    height: 34,
    name: "taiki_meat2",
  },
  {
    x: 231,
    y: 2326.50390625,
    width: 45,
    height: 44,
    name: "taiki_bread4",
  },
  {
    x: 287,
    y: 2332.50390625,
    width: 59,
    height: 36,
    name: "taiki_bread5",
  },
  {
    x: 402,
    y: 1613.00390625,
    width: 335,
    height: 52,
    name: "taiki_washbasin",
  },
  {
    x: 739,
    y: 1840.00390625,
    width: 24,
    height: 377,
    name: "taiki_entrance",
  },
  {
    x: 584,
    y: 2003.75390625,
    width: 124,
    height: 99,
    name: "taiki_dancefloor",
  },
  {
    x: 205,
    y: 2675.666748046875,
    width: 556,
    height: 926,
    name: "maven_cafe",
  },
  {
    x: 742,
    y: 2954.666748046875,
    width: 19,
    height: 287,
    name: "maven_entrance",
  },
  {
    x: 571,
    y: 2712.666748046875,
    width: 45,
    height: 75,
    name: "maven_chair",
  },
  {
    x: 229,
    y: 2707.666748046875,
    width: 284,
    height: 73,
    name: "maven_counter1",
  },
  {
    x: 232,
    y: 2931.666748046875,
    width: 279,
    height: 74,
    name: "maven_counter2",
  },
  {
    x: 232,
    y: 3155.666748046875,
    width: 274,
    height: 83,
    name: "maven_counter3",
  },
  {
    x: 228,
    y: 3387.666748046875,
    width: 274,
    height: 71,
    name: "maven_counter4",
  },
  {
    x: 566,
    y: 3381.666748046875,
    width: 173,
    height: 197,
    name: "maven_kitchen",
  },
  {
    x: 547,
    y: 3194.666748046875,
    width: 138,
    height: 146,
    name: "maven_socialising",
  },
  {
    x: 1346.5,
    y: 4062,
    width: 0,
    height: 0,
    name: "harborview_forest",
  },
  {
    x: 4005.5,
    y: 17,
    width: 307,
    height: 1688,
    name: "harborview_lake",
  },
  {
    x: 3786.5,
    y: 3027,
    width: 517,
    height: 1053,
    name: "harborview_lake2",
  },
  {
    x: 4009.5,
    y: 1722,
    width: 302,
    height: 1287,
    name: "harborview_lake1",
  },
  {
    x: 1968.5,
    y: 1582,
    width: 1370,
    height: 690,
    name: "harborview_field",
  },
];
