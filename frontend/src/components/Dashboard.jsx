import { useEffect, useState } from "react";
import { fetchSweets, purchaseSweet } from "../api/sweetsApi";
import SearchFilter from "../components/SearchFilter";
import SweetList from "../components/SweetList";
import SweetForm from "./SweetForm";
import AuthForm from "./AuthForm";

export default function Dashboard() {
  const [sweets, setSweets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [refresh, setRefresh] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const data = await fetchSweets();
        console.log("data", data);
        setSweets(data.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    })();
  }, [refresh]);

  const handlePurchase = async ({ sweetId, quantity = 1 }) => {
    alert(`Purchasing sweet of Id: ${sweetId} - Quantity: ${quantity}`);
    await purchaseSweet({ sweetId, quantity });
    setRefresh(!refresh);
  };

  const filteredSweets = sweets.filter((s) => {
    const matchesSearch = s.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category ? s.category === category : true;
    const matchesMinPrice = minPrice ? s.price >= parseFloat(minPrice) : true;
    const matchesMaxPrice = maxPrice ? s.price <= parseFloat(maxPrice) : true;
    return matchesSearch && matchesCategory && matchesMinPrice && matchesMaxPrice;
  });

  if (loading)
    return (
      <p
        style={{
          textAlign: "center",
          marginTop: "2.5rem"
        }}
      >
        Loading sweets...
      </p>
    );

  return (
    <div style={{ padding: "1.5rem" }}>
      {loggedIn ? (
        <div>
          <SearchFilter
            search={search}
            setSearch={setSearch}
            category={category}
            setCategory={setCategory}
            minPrice={minPrice}
            setMinPrice={setMinPrice}
            maxPrice={maxPrice}
            setMaxPrice={setMaxPrice}
          />
          <SweetList sweets={filteredSweets} onPurchase={handlePurchase} />
          <SweetForm  />
        </div>
      ) : (
        <AuthForm setLoggedIn={setLoggedIn} />
      )}
    </div>
  );
}
