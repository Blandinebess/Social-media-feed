import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom"; // Enables matchers like toBeInTheDocument
import Post from "../Post";

describe("Post component", () => {
  test("renders post content and delete button", () => {
    const post = {
      content: "Hello Capstone!",
      createdAt: new Date().toISOString(),
    };

    render(<Post post={post} onDelete={() => {}} />);

    // Check post content
    expect(screen.getByText(/Hello Capstone!/i)).toBeInTheDocument();

    // Check delete button
    expect(screen.getByRole("button", { name: /delete/i })).toBeInTheDocument();
  });
});
