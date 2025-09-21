import SweetCard from "./SweetCard";

export default function SweetList({ sweets, onPurchase }) {
  if (sweets.length === 0)
    return (
      <p
        style={{
          textAlign: "center",
          marginTop: "2.5rem",
          color: "#6b7280" 
        }}
      >
        No sweets found.
      </p>
    );

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(15rem, 1fr))",
        gap: "1.5rem",
        justifyItems: "center"
      }}
    >
      {sweets.map((sweet) => (
        <SweetCard key={sweet._id} sweet={sweet} onPurchase={onPurchase} />
      ))}
    </div>
  );
}
