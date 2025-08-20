import { createContext, useContext, useState } from "react"

const UserContext = createContext()

const UserProvider = (props) => {
  const [user, setUser] = useState(null)

  const login = async (username, password) => {
    // realizar una petición al backend 
    const response = await fetch("https://fakestoreapi.com/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ username, password })
    })

    if (response.ok) {
      const token = await response.json()
      setUser(true)
      return token
    } else {
      return false
    }
  }

  const register = async (formData) => {
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

    if (!res.ok) {
      throw new Error("Error al registrar usuario");
    }

    const data = await res.json();
    console.log("Usuario creado:", data)

    setUser(true);

    return { success: true, data};
  } catch (error) {
    console.error(error);
    return { success: false, message: error.message };
  }
};

  
  

  const logout = () => {
    setUser(null)
  }

  return (
    <UserContext.Provider value={{ login, logout, user }}>
      {props.children}
    </UserContext.Provider>
  )
}

const useAuth = () => useContext(UserContext)

export { UserProvider, useAuth }