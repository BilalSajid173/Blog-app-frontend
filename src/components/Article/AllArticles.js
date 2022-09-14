import { Fragment } from "react";
import Article from "./Article";

const articles = [
  {
    name: "Bilal Sajid",
    time: "10 minutes ago",
    heading: "This is an Article and this is an article!!",
    tags: ["javascript", "nodejs", "react", "mongodb"],
    likes: 20,
    comments: 10,
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed doeiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enimad minim veniam, quis nostrud exercitation ullamco laboris nisi utaliquip ex ea commodo consequat. Duis aute irure dolor inreprehenderit in voluptate velit esse cillum dolore eu fugiat nullapariatur. Excepteur sint occaecat cupidatat non proident, sunt inculpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    name: "Aatir Nadim",
    time: "30 minutes ago",
    heading: "This is an Article and this is an article!!",
    tags: ["javascript", "react", "Algorithms"],
    likes: 15,
    comments: 50,
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed doeiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enimad minim veniam, quis nostrud exercitation ullamco laboris nisi utaliquip ex ea commodo consequat. Duis aute irure dolor inreprehenderit in voluptate velit esse cillum dolore eu fugiat nullapariatur. Excepteur sint occaecat cupidatat non proident, sunt inculpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    name: "Aaliyah Beg",
    time: "20 minutes ago",
    heading: "This is an Article and this is an article!!",
    tags: ["javascript", "react", "Algorithms", "Mongodb"],
    likes: 15,
    comments: 20,
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed doeiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enimad minim veniam, quis nostrud exercitation ullamco laboris nisi utaliquip ex ea commodo consequat. Duis aute irure dolor inreprehenderit in voluptate velit esse cillum dolore eu fugiat nullapariatur. Excepteur sint occaecat cupidatat non proident, sunt inculpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    name: "Aatir Nadim",
    time: "30 minutes ago",
    heading: "This is an Article and this is an article!!",
    tags: ["javascript", "react", "Algorithms"],
    likes: 15,
    comments: 50,
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed doeiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enimad minim veniam, quis nostrud exercitation ullamco laboris nisi utaliquip ex ea commodo consequat. Duis aute irure dolor inreprehenderit in voluptate velit esse cillum dolore eu fugiat nullapariatur. Excepteur sint occaecat cupidatat non proident, sunt inculpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    name: "Aaliyah Beg",
    time: "20 minutes ago",
    heading: "This is an Article and this is an article!!",
    tags: ["javascript", "react", "Algorithms", "Mongodb"],
    likes: 15,
    comments: 20,
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed doeiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enimad minim veniam, quis nostrud exercitation ullamco laboris nisi utaliquip ex ea commodo consequat. Duis aute irure dolor inreprehenderit in voluptate velit esse cillum dolore eu fugiat nullapariatur. Excepteur sint occaecat cupidatat non proident, sunt inculpa qui officia deserunt mollit anim id est laborum.",
  },
];

const AllArticles = () => {
  return (
    <Fragment>
      {articles.map((article) => {
        return (
          <Article
            name={article.name}
            time={article.time}
            heading={article.heading}
            tags={article.tags}
            likes={article.likes}
            comments={article.comments}
            content={article.content}
          />
        );
      })}
    </Fragment>
  );
};

export default AllArticles;
