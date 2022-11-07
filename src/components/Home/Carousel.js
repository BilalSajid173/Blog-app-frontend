import React, { useEffect } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { useSelector, useDispatch } from "react-redux";
import { postsActions } from "../../store/allposts";
import { BASE_URL } from "../../lib/apiurl";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import classes from "./Carousel.module.css";

import { Pagination } from "swiper";
import TopArticle from "./TopArticle";
import useHttp from "../../hooks/use-http";

const Carousel = () => {
  const { sendRequest: fetchArticles } = useHttp();

  // const [articles, setArticles] = useState(null);
  const articles = useSelector((state) => state.posts.topPosts);
  const dispatch = useDispatch();

  const shuffle = (arra1) => {
    let ctr = arra1.length;
    let temp;
    let index;
    while (ctr > 0) {
      index = Math.floor(Math.random() * ctr);
      ctr--;
      temp = arra1[ctr];
      arra1[ctr] = arra1[index];
      arra1[index] = temp;
    }
    return arra1;
  };

  useEffect(() => {
    const autoLoginHandler = (data) => {
      data = shuffle(data).slice(0, 5);
      const posts = data.map((post) => {
        return {
          id: post.id,
          name: post.user.name,
          content: post.content.slice(0, 200) + "...",
          createdAt: post.created_at,
          authorId: post.user.id,
          title: post.title,
          imageId: post.imageId,
          userimgId: post.user.profilePic,
          commentsCount: post.commentCount,
          likesCount: post.likesCount,
          tags: post.tags.split(", "),
        };
      });
      dispatch(postsActions.savetopposts({ topposts: posts }));
    };
    if (articles === null) {
      fetchArticles(
        {
          url: BASE_URL + "api/products/all/",
          headers: {
            "Content-Type": "application/json",
          },
        },
        autoLoginHandler
      );
    }
  }, [fetchArticles, articles, dispatch]);

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
          {articles &&
            articles.map((article) => {
              return (
                <SwiperSlide
                  key={article.id}
                  className={classes["swiper-slide"]}
                >
                  <TopArticle
                    title={article.heading}
                    content={article.content}
                    imageId={article.imageId}
                    id={article.id}
                  />
                </SwiperSlide>
              );
            })}
        </Swiper>
      </div>
    </>
  );
};

export default Carousel;
