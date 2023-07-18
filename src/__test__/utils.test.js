import {
  dataMapper,
  searchByHeight,
  searchByLifeSpan,
  searchByName,
} from "../utils";

const mockResponse = [
  {
    breeds: [
      {
        weight: {
          imperial: "120 - 140",
          metric: "54 - 64",
        },
        height: {
          imperial: "26 - 30",
          metric: "66 - 76",
        },
        id: 225,
        name: "Shiloh Shepherd",
        bred_for: "Swimming, Carrying backpacks, Pulling carts or sleds",
        life_span: "9 – 14 years",
        temperament:
          "Outgoing, Loyal, Companionable, Gentle, Loving, Trainable",
        reference_image_id: "SJJxjecEX",
      },
    ],
    id: "SJJxjecEX",
    url: "https://cdn2.thedogapi.com/images/SJJxjecEX_1280.jpg",
    width: 1005,
    height: 803,
  },
];

const formattedMockData = [
  {
    name: "Shiloh Shepherd",
    height: { imperial: "26 - 30", metric: "66 - 76" },
    weight: { imperial: "120 - 140", metric: "54 - 64" },
    lifeSpan: "9 – 14 years",
    bredFor: "Swimming, Carrying backpacks, Pulling carts or sleds",
    breedGroup: undefined,
    temperament: "Outgoing, Loyal, Companionable, Gentle, Loving, Trainable",
    imageUrl: "https://cdn2.thedogapi.com/images/SJJxjecEX_1280.jpg",
  },
];

test("dataMapper function response testing", () => {
  expect(dataMapper(mockResponse)).toEqual(formattedMockData);
});
test("searchByName function response testing", () => {
  expect(searchByName(formattedMockData, "Shiloh").length).toEqual(1);
});
test("searchByHeight function response testing", () => {
  expect(searchByHeight(formattedMockData, "26").length).toEqual(1);
});
test("searchByLifeSpan function response testing", () => {
  expect(searchByLifeSpan(formattedMockData, "9").length).toEqual(1);
});
