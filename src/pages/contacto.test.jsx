import { render, screen } from "@testing-library/react";
import Contacto from "./contacto"; // Path to your Contacto component

describe("Contacto Page", () => {
  test("renders the page title and content", () => {
    render(<Contacto />);

    // Check if the page title "Contactos" is rendered
    expect(screen.getByText("Contactos")).toBeInTheDocument();

    // Check if the content "Estas en contacto" is rendered
    expect(screen.getByText("Estas en contacto")).toBeInTheDocument();
  });
});
