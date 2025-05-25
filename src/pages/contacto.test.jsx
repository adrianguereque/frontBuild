import { render, screen } from "@testing-library/react";
import { vi } from "vitest";  // Importa vi, que es el equivalente a jest en Vitest

// Mock del Layout para aislar la prueba
vi.mock("../components/Layout", () => ({
  default: ({ children, pageTitle }) => (
    <div>
      <h1>{pageTitle}</h1>
      {children}
    </div>
  ),
}));

import Contacto from "./contacto";

test("renderiza Contacto con el título correcto y contenido", () => {
  render(<Contacto />);
  expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Contactos");
  expect(screen.getByText("Estas en contacto")).toBeInTheDocument();
});
