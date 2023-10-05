import React from "react";
import "./App.css";

function App() {
  const [users, setUsers] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "https://random-data-api.com/api/users/random_user?size=10"
      );
      const data = await response.json();
      console.log({ data });
      setLoading(false);
      setUsers(data);
    } catch (error) {
      setLoading(false);
      console.log({ error });
    }
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="main">
      <div className="button">
        <button onClick={fetchData}>Fetch Random</button>
      </div>
      <div className="fetches">
        {loading ? (
          <div>
            <p>Loading...</p>
          </div>
        ) : (
          users.map((user) => (
            <div className="data" key={user.id}>
              <img src={user.avatar} loading="lazy" alt="api images" />
              <div>
                <h4>{`${user.first_name} ${user.last_name}`}</h4>
                <p>{user.employment.title}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;
