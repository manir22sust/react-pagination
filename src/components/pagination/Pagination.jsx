// PAGINATION IN REACT

import { useEffect, useState } from "react";
import "./pagination.css";

export const Pagination = () => {
  const BASE_URL = "https://jsonplaceholder.typicode.com/posts";
  const RESULT_PER_PAGE = 10;

  const [posts, setPosts] = useState([]);
  const [totalPosts, setTotalPosts] = useState(0);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [visible, setVisible] = useState(RESULT_PER_PAGE);

  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const handleResultsPerPage = (event) => {
    setVisible(Number(event.target.value));
    setPage(1);
  };

  const handlePagination = (newPage) => {
    setPage(newPage);
  };

  const fetchTotalPosts = async () => {
    try {
      const response = await fetch(BASE_URL);
      const data = await response.json();
      setTotalPosts(data.length);
      setPages(Math.ceil(data.length / visible));
    } catch (error) {
      setError(error.message);
    }
  };

  const fetchPosts = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `${BASE_URL}?_page=${page}&limit=${visible}`
      );
      const data = await response.json();
      setPosts(data);
      setError(null);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTotalPosts();
  }, [visible]);

  useEffect(() => {
    fetchPosts();
  }, [page, visible]);

  const resultOptions = [10, 25, 50, 100];
  return (
    <div className="container">
      <h1>Pagination in React</h1>
      <div className="pagination">
        <div className="totalResults">About {totalPosts} results</div>
        <div className="paginationControls">
          <button
            onClick={() => handlePagination(page - 1)}
            disabled={page === 1}
          >
            &lt;
          </button>
          <div>
            {Array.from({ length: pages }, (_, index) => (
              <span
                key={index + 1}
                onClick={() => handlePagination(index + 1)}
                style={{
                  cursor: "pointer",
                  margin: "0 10px",
                  fontWeight: page === index + 1 ? "bold" : "normal",
                }}
              >
                {index + 1}
              </span>
            ))}
          </div>
          <button
            onClick={() => handlePagination(page + 1)}
            disabled={page === pages}
          >
            &gt;
          </button>
        </div>
        <div className="resultsPerPage">
          Show &nbsp;
          <select onChange={handleResultsPerPage} value={visible}>
            {resultOptions.map((option) => (
              <option value={option} key={option}>
                {option}
              </option>
            ))}
          </select>
          &nbsp;Results
        </div>
      </div>
      {error && <div>{error}</div>}
      {isLoading && <div>Loading...</div>}
      {posts.map((post) => (
        <div className="post" key={post.id}>
          <h2>{post.id}</h2>
          <h3>{post.title}</h3>
          <p>{post.body}</p>
        </div>
      ))}
    </div>
  );
};
