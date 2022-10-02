import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import classes from "./Carousel.module.css";

import { Pagination } from "swiper";
import TopArticle from "./TopArticle";

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

const Carousel = () => {
  return (
    <>
      <div className="px-[4%] md:px-[7%] lg:px-[7%] xl:px-[6%]">
        <h2 className="font-bold text-2xl mb-4 dark:text-gray-200">
          Recommended For You!
        </h2>
        <Swiper
          slidesPerView={1}
          spaceBetween={20}
          pagination={{
            clickable: true,
          }}
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
            1280: {
              slidesPerView: 4,
              spaceBetween: 20,
            },
          }}
          modules={[Pagination]}
          className={classes.mySwiper}
        >
          {articles.map((article) => {
            return (
              <SwiperSlide>
                <TopArticle title={article.heading} content={article.content} />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </>
  );
};

export default Carousel;
