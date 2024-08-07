const { test, describe } = require("node:test");
const assert = require("node:assert");
const listHelper = require("../utils/list_helper");

const listWithOneBlog = [
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
    likes: 5,
    __v: 0,
  },
];

const blogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0,
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0,
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0,
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0,
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0,
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0,
  },
];

test("dummy returns one", () => {
  const blogs = [];

  const result = listHelper.dummy(blogs);
  assert.strictEqual(result, 1);
});

describe("total likes", () => {
  test("when list has only one blog, equals the likes of that", () => {
    const result = listHelper.totalLikes(listWithOneBlog);
    assert.strictEqual(result, 5);
  });
  test("when list has six blog lists, equals the likes of that", () => {
    const result = listHelper.totalLikes(blogs);
    assert.strictEqual(result, 36);
  });
});

describe("Favorite Blog", () => {
  test("when blog list has only one blog, the response of favorite blog", () => {
    const result = listHelper.favoriteBlog(listWithOneBlog);
    const favoriteOfSingleBlog = {
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      likes: 5,
    };
    assert.deepStrictEqual(result, favoriteOfSingleBlog);
  });

  test("when blog list has more than one blog, the response of favorite blog", () => {
    const result = listHelper.favoriteBlog(blogs);
    const favoriteOfSingleBlog = {
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      likes: 12,
    };
    assert.deepStrictEqual(result, favoriteOfSingleBlog);
  });
});

describe("Most Blog Author", () => {
  test("when blog list is empty array", () => {
    assert.deepStrictEqual(listHelper.mostBlogs([]), 0);
  });

  test("when blog list has one blog", () => {
    const expectedResult = {
      author: "Edsger W. Dijkstra",
      blogs: 1,
    };
    assert.deepStrictEqual(
      listHelper.mostBlogs(listWithOneBlog),
      expectedResult
    );
  });

  test("when blog list has more blogs", () => {
    const expectedResult = {
      author: "Robert C. Martin",
      blogs: 3,
    };
    assert.deepStrictEqual(listHelper.mostBlogs(blogs), expectedResult);
  });
});

describe("Most like Author", () => {
  test("when an empty array", () => {
    assert.strictEqual(listHelper.mostLikes([]), 0);
  });

  test("when the blog has only one list", () => {
    const expectedResult = { author: "Edsger W. Dijkstra", likes: 5 };

    assert.deepStrictEqual(
      listHelper.mostLikes(listWithOneBlog),
      expectedResult
    );
  });

  test("when the blog has more blog lists", () => {
    const expectedResult = { author: "Edsger W. Dijkstra", likes: 17 };

    assert.deepStrictEqual(listHelper.mostLikes(blogs), expectedResult);
  });
});
