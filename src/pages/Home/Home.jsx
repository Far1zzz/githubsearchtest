import React, { useState, useEffect } from "react";
import "./Home.css";
import axios from "axios";
import User from "../../components/ui/User";

const Home = () => {
  const [query, setQuery] = useState("");
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const handleQuery = (e) => {
    const value = e.target.value;
    setQuery(value);
  };

  const handlePrevPage = () => {
    setPage((page) => {
      if (page === 1) return page;
      else return page - 1;
    });
  };

  const handleNextPage = () => {
    setPage((page) => page + 1);
  };

  const handlePageLimit = (e) => {
    const value = e.target.value;
    setLimit(parseInt(value));
  };

  const fetchUsers = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_URL}/search/users?q=${query}`,
        {
          params: {
            page,
            per_page: limit,
          },
        }
      );
      return data?.items;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (query) {
      const items = await fetchUsers();
      setUsers(items);
    } else {
      console.log("Query is empty!!!");
    }
  };

  useEffect(() => {
    const displayUser = async () => {
      if (query) {
        const items = await fetchUsers();
        setUsers(items);
      }
    };
    displayUser();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, limit]);

  return (
    <div className="container">
      <div className="search-form">
        <h4>Search User</h4>
        <form>
          <input
            value={query}
            onChange={handleQuery}
            type="text"
            placeholder="Search User"
          />
          <button onClick={handleSearch}>Search</button>
        </form>
      </div>
      <div className="search-result">
        <div className="more-options">
          <label>
            <small>Per Page</small>
            <select onChange={handlePageLimit}>
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>
          </label>
          <div className="pagination">
            <button onClick={handlePrevPage}>{page}</button>
            <button onClick={handleNextPage}>{page + 1}</button>
          </div>
        </div>
        {users ? (
          users.map((user) => {
            return <User user={user} key={user.id} />;
          })
        ) : (
          <h2>Data Undifined</h2>
        )}
      </div>
    </div>
  );
};

export default Home;
