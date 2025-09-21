export default function SweetCard({ sweet, onPurchase }) {
  const cardStyle = {
    border: "1px solid #ccc",
    borderRadius: "0.5rem",
    padding: "1rem",
    boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
    width: "15rem",
    textAlign: "center",
    marginBottom: "1rem"
  };

  const titleStyle = {
    fontSize: "1.125rem",
    fontWeight: "bold",
    marginBottom: "0.5rem"
  };

  const textStyle = {
    marginBottom: "0.25rem"
  };

  const quantityStyle = {
    marginBottom: "0.75rem"
  };

  const buttonStyle = {
    padding: "0.5rem 1rem",
    borderRadius: "0.25rem",
    color: "white",
    backgroundColor: sweet.quantity === 0 ? "#ccc" : "#16a34a", 
    cursor: sweet.quantity === 0 ? "not-allowed" : "pointer",
    border: "none"
  };

  const hoverStyle = {
    backgroundColor: sweet.quantity === 0 ? "#ccc" : "#15803d" 
  };

  return (
    <div style={cardStyle}>
      <h2 style={titleStyle}>{sweet.name}</h2>
      <p style={textStyle}>Category: {sweet.category}</p>
      <p style={textStyle}>Price: ₹{sweet.price}</p>
      <p style={quantityStyle}>Quantity: {sweet.quantity}</p>
      <button
        onClick={() => onPurchase({ sweetId: sweet.sweetId })}
        disabled={sweet.quantity === 0}
        style={buttonStyle}
        onMouseOver={e => (e.currentTarget.style.backgroundColor = hoverStyle.backgroundColor)}
        onMouseOut={e => (e.currentTarget.style.backgroundColor = buttonStyle.backgroundColor)}
      >
        Purchase
      </button>
    </div>
  );
}
