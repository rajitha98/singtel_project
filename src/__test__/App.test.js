import { render, screen } from "@testing-library/react";
import axios from "axios";

import App from "../App";
import { getApiResponse } from "../utils";

describe("APP", () => {
  test("main page initial render", () => {
    render(<App />);
    expect(screen.getByTestId("sort-type-dropdown")).toBeInTheDocument();
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
