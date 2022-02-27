import axios from "axios";

const BASE_URL = "http://localhost:5000/api/";
// const TOKEN =
//   JSON.parse(JSON.parse(localStorage.getItem("persist:root"))?.user).currentUser
//     .accessToken || "";


// const TOKEN ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MjAyNDM1ODhiOTQ1NTdiZGE0NmY3NDAiLCJpYXQiOjE2NDQzMTg2OTksImV4cCI6MTY0NDkyMzQ5OX0.OuY06vwdkP_9UJf6dlArvwX884jKIEY03Lp_pon8RJo"
const user = JSON.parse(localStorage.getItem("persist:root"))?.user;
const currentUser = user && JSON.parse(user).currentUser;
const TOKEN = currentUser?.accessToken;

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({ 
  mainURL: BASE_URL,
  header:{ token: `${TOKEN}` },
});