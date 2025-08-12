import { useContext, useState } from "react";
import { toast } from "react-toastify";
import { loginUser } from "../../services/user";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/auth.context.jsx";
import axios from "axios";
import "../../Style/Login.css";
import { config } from "../../config.js";

function Login() {
  // get the setUser from AuthContext
  const { setUser } = useContext(AuthContext);

  // create state to get input from user
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  // get navigate() function reference
  const navigate = useNavigate();

  // button click event handler
  const onLogin = async (e) => {
    e.preventDefault();
    if (email.length == 0) {
      toast.warn("please enter email");
    } else if (password.length == 0) {
      toast.warn("please enter password");
    } else {
      // call the Login API
      const result = await loginUser(email, password);
      if (!result) {
        toast.error("Error while login");
      } else {
        if (result["status"] == "success") {
          // persist the login information like token, username etc
          console.log("result: ", result);
          const { user, token } = result["data"];

          // persist the information in session storage
          sessionStorage.setItem("Name", user.name);
          sessionStorage.setItem("token", token);
          sessionStorage.setItem("userType", user.type);

          // set the user details in the AuthContext
          setUser({ name: user.name });

          console.log("result: ", result);
          
            axios
              .get(`${config.serverURL}/appointment/manage`, {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              })
              .then((res) => {
                if(res.data.length!=0)
                {
                  
                  toast.info(`${res.data.length} : Pending requests`)
                  console.log(res.data)
                }
              })
              .catch((err) => {
               
                console.error(err);
              })
              console.log("User type: ", user.type);

          // navigate to home screen
          if(user.type=="ADMIN")
          {
            navigate("/home/admin");
          }
          else
          navigate("/home");
        } else {
          toast.error("Invalid email or password");
        }
      }
    }
  };

  return (
    <>
      <div className="login-page">
        <div className="window">
          <span className="h1">Login</span>
          <form>
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              className="mt-4 form-control"
              placeholder="Your email"
            ></input>
            <input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              className="mt-2 form-control"
              placeholder="Your password"
            ></input>
            <button
              type="submit"
              onClick={(e) => onLogin(e)}
              className="mb-2 btn btn-light mt-2"
            >
              Login
            </button>
            <small>
              You do not have an account?{" "}
              <a href="/register" className="text-warning">
                Register
              </a>
            </small>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
