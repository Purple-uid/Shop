import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth, useAccount } from "../../store/cartStore";
import "./Login.css";

function Login() {
  const navigate = useNavigate();
  const [isLoginTab, setIsLoginTab] = useState<boolean>(true);

  const auth = useAuth((state) => state.isAuth);
  const login = useAuth((state) => state.login);
  const setUser = useAccount((state) => state.setUser);
  const userStore = useAccount((state) => state.user);

  const [password, setPassword] = useState<string>("");
  const [loginValue, setLoginValue] = useState<string>("");
  const [fio, setFio] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (auth) {
      navigate("/user");
    }
  }, [auth, navigate]);

  const toggleTab = (tab: boolean) => {
    setIsLoginTab(tab);
    setError("");
    setPassword("");
    setLoginValue("");
    setFio("");
    setEmail("");
  };

  const handleLogin = () => {
    if (!loginValue || !password) {
      setError("Введите логин и пароль");
      return;
    }

    if (
      userStore.login === loginValue &&
      userStore.password === (password as any)
    ) {
      login();
      navigate("/user");
    } else {
      setError("Неверный логин или пароль");
    }
  };

  const handleRegister = () => {
    if (!password || !loginValue || !fio || !email) {
      setError("Заполните все поля");
      return;
    }

    const userData = {
      fio,
      login: loginValue,
      email,
      password,
    };

    setUser(userData);
    login();
    navigate("/user");
  };

  return (
    <div className="form">
      <div className="registration-form">
        <div className="login-toggle-container">
          <button
            className="buttonLogin"
            style={{
              backgroundColor: isLoginTab ? "black" : "white",
              color: isLoginTab ? "white" : "black",
            }}
            onClick={() => toggleTab(true)}
          >
            Вход
          </button>
          <button
            className="buttonLogin"
            style={{
              backgroundColor: !isLoginTab ? "black" : "white",
              color: !isLoginTab ? "white" : "black",
            }}
            onClick={() => toggleTab(false)}
          >
            Регистрация
          </button>
        </div>

        <div className="Entrance">
          <h1>{isLoginTab ? "Вход" : "Регистрация"}</h1>

          {!isLoginTab && (
            <input
              value={fio}
              onChange={(e) => setFio(e.target.value)}
              type="text"
              placeholder="ФИО"
            />
          )}

          <input
            value={loginValue}
            onChange={(e) => setLoginValue(e.target.value)}
            type="text"
            placeholder="Логин"
          />

          {!isLoginTab && (
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Email"
            />
          )}

          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Пароль"
          />

          <button
            className="EntranceLogin"
            onClick={isLoginTab ? handleLogin : handleRegister}
          >
            {isLoginTab ? "Войти" : "Создать аккаунт"}
          </button>

          {error && <p className="error-message">{error}</p>}
        </div>
      </div>
    </div>
  );
}

export default Login;
