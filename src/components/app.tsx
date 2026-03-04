import axios from "axios";
import { useEffect, useState } from "react";
import Profile from "./profile";
import useDebounce from "../hooks/useDebounce";
import type { User } from "../types/users";
import SearchBar from "./searchbar";

const App = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [skip, setSkip] = useState(0);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const debouncedSearch = useDebounce(search, 1000);
  console.log(debouncedSearch);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError("");
        const data = await axios.get(
          debouncedSearch
            ? `https://dummyjson.com/users/search?q=${debouncedSearch}`
            : `https://dummyjson.com/users?skip=${skip}&limit=12`,
        );

        setUsers(data.data.users);
        console.log(data);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Something went wrong");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [skip, debouncedSearch, search]);

  const onNext = () => {
    setSkip(skip + 10);

    console.log(skip);
  };

  const onPrevious = () => {
    setSkip(skip - 10);
  };
  return (
    <div className="flex flex-col items-center">
      <SearchBar
        onChange={(e) => {
          setSkip(0);

          setSearch(e.target.value);
        }}
      />
      {loading && <div>loading</div>}
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
                />
              </div>
            );
          })}
        </div>
      )}

      <div className="flex items-center gap-2">
        <button onClick={onPrevious} disabled={skip == 0}>
          Prev
        </button>
        <button onClick={onNext}>Next</button>
      </div>
    </div>
  );
};

export default App;
