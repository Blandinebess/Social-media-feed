import { render, screen } from "@testing-library/react";
import App from "../App";

test("renders social feed heading", () => {
render(<App />);
const heading = screen.getByText(/my social feed/i);
expect(heading).toBeInTheDocument();
});