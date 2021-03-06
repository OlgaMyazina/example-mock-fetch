import React from "react";
import { render } from "@testing-library/react";
import App from "./App";
import { server, rest } from "./testServer";


test("renders learn react link", async () => {
  const { findByText } = render(
      <App />
  );
  const element = await findByText(/USD to CAD = 1.42/i);
  expect(element).toBeInTheDocument();
});

test("handles errors", async () => {
  server.use(
      rest.get("https://api.exchangeratesapi.io/latest", (_req, res, ctx) => {
        return res(ctx.status(404));
      })
  );

  const { findByText } = render(
      <App />
  );
  const element = await findByText(/Error/i);
  expect(element).toBeInTheDocument();
});
