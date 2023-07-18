import { render } from "@testing-library/react";

import ImageCard from "../imageCard";

const props = {
  name: "Standard Schnauzer",
  height: { imperial: "17.5 - 19.5", metric: "44 - 50" },
  weight: { imperial: "30 - 50", metric: "14 - 23" },
  lifeSpan: "13 - 15 years",
  bredFor: "Ratting, guarding",
  breedGroup: "Working",
  temperament: "Trainable, Good-natured, Devoted, Lively, Playful, Intelligent",
  imageUrl: "https://cdn2.thedogapi.com/images/TqHc0-BCd.jpg",
};

test("WHEN pass data to component THEN component should render correctly", () => {
  render(<ImageCard {...props} />);
  // const h1Element = screen.getByText(/todo/i);
});
