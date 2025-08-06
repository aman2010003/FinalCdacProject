// services/user.js
import axios from "axios";
import { config } from "../config";

//For Registration
export async function registerUser(
  name,
  email,
  phoneNo,
  password,
  confirmPassword
) {
  try {
    const url = `${config.serverURL}/users/signup`;
    const body = { name, email, phoneNo, password, confirmPassword };

    const response = await axios.post(url, body);

    return {
      status: "success",
      data: response.data,
    };
  } catch (error) {
    if (error.response && error.response.data) {
      console.error("🚨 Backend validation error:", error.response.data);
      return {
        status: "error",
        errors: error.response.data,
      };
    } else {
      console.error("🚨 Network or unexpected error:", error.message);
      return {
        status: "error",
        errors: { message: "Something went wrong. Please try again." },
      };
    }
  }
}

//For Login
export async function loginUser(email, password) {
  try {
    //Create url

    const url = `${config.serverURL}/users/signin`;

    //create a body

    const body = {
      email,
      password,
    };

    //call Post API
    const response = await axios.post(url, body);

    //check if response is ok
    if (response.status == 200) {
      //Send the Response body
      return {
        status: "success",
        data: response.data,
      };
    } else {
      //Send null Result
      return null;
    }
  } catch (ex) {
    console.error("Login exception:", ex.response?.data || ex.message);
    return {
      status: "error",
      errors: ex.response?.data || { message: "Unexpected error" },
    };
  }
}
