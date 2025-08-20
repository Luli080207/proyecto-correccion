import { useState } from "react"
import { Layout } from "../components/Layout"
import { useAuth } from "../context/UserContext";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [succes, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  }
};

//validaciones
const validate = () => {
  let tempErrors = {};
  if (!formData.username.trim()) tempErrors.username = "Requerido";
  if (!formData.email.trim()) {
    tempErrors.email = "requerido";
  } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
    tempErrors.email = "formato de correo invalido";
  }
  if (formData.password.length < 6) {
    tempErrors.password = "La contraseña debe tener al menos 6 caracteres"
  }
  setErrors(tempErrors);
   return Object.keys(tempErrors).length === 0;
};

const handleSubmit = async (e) => {
  e.preventDefault();
  setErrors({});
  setSuccess("")
}

if (!validate()) return;

  try {
      const res = await fetch("https://fakestoreapi.com/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          username: formData.username,
          password: formData.password
        })
      });

      if (!res.ok) throw new Error("Error al registrar al usuario");
      const data = await res.json();
      console.log("usuario creado:", data);

      setSuccess("Usuario registrado con éxito");
      setUser(true);

      setFormData({ username: "", email: "", password: ""});
    } catch (error) {
      setErrors({ general: "no se pudo registrar al usuario"});
    };

    return (
      <layout>
        <h1>Registrate!</h1>
        <section>
          <h2>Bienvenido</h2>
          <form onSubmit={handleSubmit} noValidate>
            <div>
              <label>Username:</label>
              <input
              type="text"
              name="username"
              onChange={handleChange}
              value={formData.username}
              />
              {errors.username && <p style={{ color: "red"}}>{errors.username}</p>}
            </div>
            <div>
              <label>Correo electrónico:</label>|
              <input
              type="email"
              name="email"
              onChange={handleChange}
              value={formData.email}
              />
              {errors.email && <p style={{ color: "red"}}>{errors.email}</p>}
            </div>
            <div>
              <label>Contraseña</label>
              <input
              type="password"
              name="password"
              onChange={handleChange}
              value={formData.password}
              />
              {errors.password && <p style={{ color: "red"}}>{errors.password}</p>}
            </div>
            <button>Registrarse</button>
            </form>
          {errors.general && <p style={{ color: "red"}}>{errors.general}</p>}
          {success && <p style={{ color: "green"}}></p>}
        </section>
      </layout>
    );
  
    export { Register };
