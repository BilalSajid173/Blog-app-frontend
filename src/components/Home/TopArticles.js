import React from "react";
import TopArticle from "./TopArticle";

const TopPicks = (props) => {
  return (
    <div className="flex flex-wrap justify-center mb-8">
      <div className="md:w-[90%] lg:w-[68.2%]">
        <h2 className="hidden md:block font-bold text-2xl mb-4 dark:text-gray-200">
          Recommended For You!
        </h2>
        <div className="hidden md:flex flex-wrap justify-between">
          {props.articles.map((article) => {
            return (
              <TopArticle title={article.heading} content={article.content} />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TopPicks;
