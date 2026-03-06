import axios from "axios";
import { useEffect, useState } from "react";

import useDebounce from "../hooks/useDebounce";
import type { User } from "../types/users";

import { useNavigate } from "react-router-dom";
import SearchBar from "../components/searchbar";
import Button from "../components/button";
import Loader from "../components/loader";
import Profile from "../components/profile";

const Home = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [skip, setSkip] = useState(0);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("");

  const debouncedSearch = useDebounce(search, 1500);
  console.log(debouncedSearch);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError("");

        let url = "";
        if (debouncedSearch) {
          url = `https://dummyjson.com/users/search?q=${debouncedSearch}`;
        } else if (filter) {
          console.log("check");
          url = `https://dummyjson.com/users/filter?key=gender&value=${filter}`;
        } else {
          url = `https://dummyjson.com/users?skip=${skip}&limit=12`;
        }

        const data = await axios.get(url);

        setUsers(data.data.users);
        console.log(data);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Something went wrong");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [skip, debouncedSearch, filter]);

  const onNext = () => {
    setSkip(skip + 10);

    console.log(skip);
  };

  const onPrevious = () => {
    setSkip(skip - 10);
  };

  const onCheck = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setFilter(event.target.value);
    setSkip(0);
  };
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-3xl font-bold mt-6">User Listing</h1>
      <p className="text-gray-500 mb-6">Search and filter users</p>
      <div className="flex flex-row items-center gap-x-2">
        <SearchBar
          onChange={(e) => {
            setSkip(0);

            setSearch(e.target.value);
          }}
        />
        <select className="border border-black p-1" onChange={onCheck}>
          <option value="">All</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>

      {loading && (
        <div>
          <Loader />
        </div>
      )}
      {error && <div>Error</div>}
      {!loading && !error && (
        <div className="grid  grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
          {users.map((users) => {
            return (
              <div key={users?.id}>
                <Profile
                  imgSrc={users?.image}
                  fullName={users?.firstName + " " + users?.lastName}
                  email={users?.email}
                  phone={users?.phone}
                  companyName={users.company.name}
                  onClick={() => navigate(`/${users.id}`)}
                />
              </div>
            );
          })}
        </div>
      )}

      <div className="flex items-center gap-2">
        <Button label="Prev" onClick={onPrevious} disabled={skip == 0} />

        <Button label="Next" onClick={onNext} />
      </div>
    </div>
  );
};

export default Home;
