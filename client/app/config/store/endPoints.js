export const END_POINTS = {
  ARTICLES: "/api/article",
  ARTICLES_LATEST: "/api/article/latest",
  ARTICLES_MOST_VIEWED: "/api/article?orderBy=viewCount&limit=4",
  ARTICLES_HOME: "/api/article?limit=9",
  ARTICLES_COUNT: "/api/article?count=1",
  ARTICLE_ID: "/api/article/:id",
  ARTICLE_CATEGORY_ID: "/api/article/catId/:catId",
  ARTICLE_COMMENTS: "/api/comment/:articleId",
  ARTICLE_SHAHRDARI: "/api/article/shahrdari",

  CATEGORY_SLUG: "/api/category/:slug",
  CATEGORY: "/api/category",
  CATEGORIES_SHOWED_ON_NAVBAR: "/api/category?showOnNavbar=1",

  COMMENTS: "/api/comment",
  COMMENTS_COUNT: "/api/comment?count=1",
  COMMENTS_ACTIVATE: "/api/comment/active/:commentId",
  COMMENTS_DEACTIVATE: "/api/comment/unactive/:commentId",

  USERS: "/api/users",
  USERS_LOGIN: "/api/users/logout",
  USERS_COUNT: "/api/users?count=1",

  GALLERY: "/api/gallery",
  GET_GALLERY: "/api/gallery/:id",
  SALON: "/api/salon",
  GET_SALON: "/api/salon/:id",

  GET_OWNERDETAILS: "/api/ownerDetail/3",
  GET_NUMBERS: "/api/number",
  GET_EDCSERVICES: "/api/edcService",
  GET_SERVICES: "/api/service",
  CREATE_RESERVE: "/api/reserve",
};
