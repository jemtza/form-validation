import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import App from "./App";

test("renders learn react link", () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
});
