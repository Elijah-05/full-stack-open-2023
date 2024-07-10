const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  const isBlogEmpty = blogs?.length == 0;

  const reducer = (sum, item) => {
    return +sum + +item;
  };

  if (!isBlogEmpty) {
    const likeArray = blogs.map((blog) => blog.likes);
    const result = likeArray.reduce(reducer, 0);
    return result;
  }

  return 0;
};

const favoriteBlog = (blogs) => {
  if (blogs.length > 0) {
    const likeArray = blogs.map((blog) => blog.likes);
    const biggestLike = Math.max(...likeArray);
    const indexOfBigestLike = likeArray.indexOf(biggestLike);

    const biggestLikeBlog = blogs[indexOfBigestLike];
    return {
      title: biggestLikeBlog.title,
      author: biggestLikeBlog.author,
      likes: biggestLikeBlog.likes,
    };
  }

  return 0;
};

const mostBlogs = (blogs) => {
  if (blogs.length > 0) {
    const authorsArray = blogs.map((blog) => blog.author);
    // console.log("authorsArray: ", authorsArray);
    let mostBlog = 0;
    let mostBlogAuthor = { author: "", blogs: 0 };
    for (const author of authorsArray) {
      // console.log("for loop######");
      const authorBlogs = authorsArray.filter(
        (auths) => auths === author
      ).length;
      // console.log("author blogs No.", authorBlogs);
      if (authorBlogs > mostBlog) {
        mostBlog = authorBlogs;
        mostBlogAuthor = { author, blogs: mostBlog };
      }
      // console.log("the mostAuthor: ", mostBlogAuthor);
    }

    return mostBlogAuthor;
  }
  return 0;
};

const mostLikes = (blogs) => {
  if (blogs?.length == 0) {
    return 0;
  }

  const authorsArray = blogs.map((blog) => blog.author);
  let topLike = 0;
  let topLikeAuthor = { author: "", likes: 0 };

  for (const author of authorsArray) {
    const authorsTotalLike = blogs
      .filter((blog) => blog.author === author)
      .map((blog) => blog.likes)
      .reduce((acc, cur) => acc + cur, 0);

    if (authorsTotalLike > topLike) {
      topLike = authorsTotalLike;
      topLikeAuthor = {
        author: author,
        likes: authorsTotalLike,
      };
    }
  }

  return topLikeAuthor
};

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes };
