import { useState } from "react";
import { loginFunction, signUpFunction } from "../api/authApi";

export default function AuthForm({setLoggedIn}) {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      if (isLogin) {
        const response = await loginFunction({ email: formData.email, password: formData.password });
        if(response?.data?.token){
            localStorage.setItem("token", response.data.token);
            alert("Login Successful");
            setLoggedIn(true);
        }
      } else {
        const response = await signUpFunction(formData);
        if(response?.data?.token){
            localStorage.setItem("token", response.data.token);
            alert("Signup Successful");
            setLoggedIn(true);
        }
      }
    } catch (err) {
      setError(err?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-sm mx-auto p-6 border rounded-xl shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-center">
        {isLogin ? "Login" : "Sign Up"}
      </h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {!isLogin && (
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />
        )}

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          {loading ? "Please wait..." : isLogin ? "Login" : "Create Account"}
        </button>
      </form>

      <p className="text-center mt-4 text-sm">
        {isLogin ? "No account?" : "Already have an account?"}{" "}
        <button
          type="button"
          onClick={() => setIsLogin(!isLogin)}
          className="text-blue-600 underline"
        >
          {isLogin ? "Sign Up" : "Login"}
        </button>
      </p>
    </div>
  );
}
