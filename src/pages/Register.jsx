import { useState } from "react";
import { Layout } from "../components/Layout";
import { useAuth } from "../context/UserContext";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");

  const { register } = useAuth(); 

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Validaciones
  const validate = () => {
    let tempErrors = {};
    if (!formData.username.trim()) tempErrors.username = "Requerido";
    if (!formData.email.trim()) {
      tempErrors.email = "Requerido";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = "Formato de correo inválido";
    }
    if (formData.password.length < 6) {
      tempErrors.password = "La contraseña debe tener al menos 6 caracteres";
    }
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setSuccess("");

    if (!validate()) return;

    try {
      const result = await register(formData); 
      if (result.success) {
        setSuccess("Usuario registrado correctamente");
        setFormData({ username: "", email: "", password: "" });
      } else {
        setErrors({ general: result.message || "No se pudo registrar al usuario" });
      }
    } catch (error) {
      setErrors({ general: "Error al registrar el usuario" });
    }
  };

  return (
    <Layout>
      <h1>¡Registrate!</h1>
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
            {errors.username && <p style={{ color: "red" }}>{errors.username}</p>}
          </div>
          <div>
            <label>Correo electrónico:</label>
            <input
              type="email"
              name="email"
              onChange={handleChange}
              value={formData.email}
            />
            {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
          </div>
          <div>
            <label>Contraseña:</label>
            <input
              type="password"
              name="password"
              onChange={handleChange}
              value={formData.password}
            />
            {errors.password && <p style={{ color: "red" }}>{errors.password}</p>}
          </div>
          <button type="submit">Registrarse</button>
        </form>
        {errors.general && <p style={{ color: "red" }}>{errors.general}</p>}
        {success && <p style={{ color: "green" }}>{success}</p>}
      </section>
    </Layout>
  );
};

export { Register };