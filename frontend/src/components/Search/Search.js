import { Button, Typography } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../Actions/User";
import User from "../User/User";
import "./Search.css";

const Search = () => {
  const [name, setName] = React.useState("");

  const { users, loading } = useSelector((state) => state.allUsers);
  const [filteredUsers, setFilteredUsers] = React.useState([]);

  React.useEffect(() => {
    console.log(users);
    
    setFilteredUsers(users); // Initialize filtered users with the fetched users
  }, [users]);


  const handleSearch = (query) => {
   
    const filtered = users.filter((user) =>
      user.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredUsers(filtered);
  };

  React.useEffect(() => {
    handleSearch(name);
  }, [name, users]);

  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(getAllUsers(name));
  };

  return (
    <div className="search dark:bg-darkbg1">
      <form className="searchForm dark:bg-darkpost" onSubmit={handleSearch}>
        <Typography variant="h3" style={{ padding: "2vmax" }}>
          BookVana
        </Typography>

        <input
          type="text"
          value={name}
          placeholder="Name"
          required
          onChange={(e) => setName(e.target.value)}
        />

        <Button disabled={loading} type="submit">
          Search
        </Button>

        <div className="searchResults">
          {filteredUsers &&
            filteredUsers.map((user) => (
              <User
                key={user._id}
                userId={user._id}
                name={user.name}
                avatar={user.avatar.url}
              />
            ))}
        </div>
      </form>
    </div>
  );
};

export default Search;
