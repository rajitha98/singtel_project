import { fireEvent, render, screen } from "@testing-library/react";
import axios from "axios";

import App, { ImageRow } from "../App";
import { getApiResponse } from "../utils";
import userEvent from "@testing-library/user-event";

const mockData = [
  {
    name: "Standard Schnauzer",
    height: { imperial: "17.5 - 19.5", metric: "44 - 50" },
    weight: { imperial: "30 - 50", metric: "14 - 23" },
    lifeSpan: "13 - 15 years",
    bredFor: "Ratting, guarding",
    breedGroup: "Working",
    temperament:
      "Trainable, Good-natured, Devoted, Lively, Playful, Intelligent",
    imageUrl: "https://cdn2.thedogapi.com/images/TqHc0-BCd.jpg",
  },
];

describe("APP", () => {
  test("main page initial render", () => {
    render(<App />);
    expect(screen.getByTestId("sort-type-dropdown")).toBeInTheDocument();
  });
  test("render image row", () => {
    render(<ImageRow dogList={mockData} />);
    expect(screen.getByTestId("image-row")).toBeInTheDocument();
  });
  test("text input change", () => {
    render(<App/>);
    fireEvent.change(screen.getByTestId("search-text"), {target: {value: 'a'}})
    expect(screen.getByTestId("show-error-alert")).toBeInTheDocument();

  });
  test("dropdown and input change", () => {
    render(<App/>);
    fireEvent.change(screen.getByTestId("sort-type-dropdown"), {target: {value: 'name'}})
    fireEvent.change(screen.getByTestId("search-text"), {target: {value: 'a'}})

  });
});

jest.mock("axios");
describe("getResource", () => {
  describe("with success", () => {
    const onComplete = jest.fn();
    let data = [];

    beforeEach(() => {
      axios.get.mockResolvedValue(data);
    });

    it("call axios", () => {
      getApiResponse("name", "a", onComplete);
      getApiResponse("height", "4", onComplete);
      getApiResponse("lifespan", "20", onComplete);
      expect(axios.get).toBeCalledTimes(3);
    });
  });
});
