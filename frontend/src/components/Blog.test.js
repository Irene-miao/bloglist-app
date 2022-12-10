import React from "react";
import "@testing-library/jest-dom";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog";
import { renderWithProviders } from "../utils/for-tests";
import Comment from "./Comment";

test("renders blog", () => {
  const initialBlog = [
    {
      id: "1",
      title: "Monday",
      author: "poppy",
      url: "www.flower.com",
      likes: "2",
    },
  ];

  jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useParams: () => ({
      id: '1',
    }),
  }))
  
  const { getByText } = renderWithProviders(<Blog />, {
    preloadedState: {
      blogs: initialBlog
    }
  });
  const title = getByText("Monday");
  const author = getByText("poppy");
  expect(title).toBeInTheDocument();
  expect(author).toBeVisible();
});

test("add comment by clicking button", () => {
 
  const { getByText, getByTestId } = renderWithProviders(<Comment />);
  const input = getByText("More");
  const comment = getByTestId("comment");
  const button = getByText("add comments");

  userEvent.type(input, "Hello");
  userEvent.click(button);

  expect(comment).toHaveValue("Hello");
});
