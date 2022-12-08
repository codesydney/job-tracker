import { render, screen } from "@testing-library/react";

import Home from "../../pages";

describe("Home Page", () => {
  test("smoke test if it renders", () => {
    render(<Home />);

    expect(screen.queryByLabelText(/^home-page$/i)).toBeTruthy();
  });
});
