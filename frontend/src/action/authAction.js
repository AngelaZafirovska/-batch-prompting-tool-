import fetch from "isomorphic-fetch";
import { API } from "../config/config";
import cookie from "js-cookie";

export const signup = async (user) => {
  try {
    const res = await fetch(`${API}/signup`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    return await res.json();
  } catch (err) {
    return err;
  }
};

export const signin = async (user) => {
  try {
    const res = await fetch(`${API}/signin`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    return await res.json();
  } catch (err) {
    return err;
  }
};

export const signout = async (next) => {
  removeCookie("token");
  removeLocalStorage("user");
  next();

  try {
    const response = await fetch(`${API}/signout`, {
      method: "GET",
    });
    console.log("signout success");
  } catch (err) {
    console.log(err);
  }
};

// set the cookie
export const setCookie = (key, value) => {
  if (typeof window !== "undefined") {
    cookie.set(key, value, {
      expires: 1,
    });
  }
};

// remove the cookie
export const removeCookie = (key) => {
  if (typeof window !== "undefined") {
    cookie.remove(key, {
      expires: 1,
    });
  }
};

// get cookie
export const getCookie = (key) => {
  if (typeof window !== "undefined") {
    return cookie.get(key);
  }
};

//localStorage
export const setLocalStorage = (key, value) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(key, JSON.stringify(value));
  }
};

// remove from localStrorage
export const removeLocalStorage = (key) => {
  if (typeof window !== "undefined") {
    localStorage.removeItem(key);
  }
};

// autheticate user by pass data to cookie and localStorage
export const autheticate = (data, next) => {
  setCookie("token", data.token);
  setLocalStorage("user", data.user);
  next();
};

export const isAuth = () => {
  if (typeof window !== "undefined") {
    const cookieChecked = getCookie("token");
    if (cookieChecked) {
      const userData = localStorage.getItem("user")
      if (userData) {
        if (userData == "undefined") {
          return false
        }
        return JSON.parse(userData);
      } else {
        return false;
      }
    }
  }
};
