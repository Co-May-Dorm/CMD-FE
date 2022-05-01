import { useCallback } from "react";
import axiosClient from "./axiosClient";
var axios = require("axios");
const baseUrl = "/tasks";
const todoListApi = {
  //get detail a task
  getDetailTask: async (params) => {
    let url = `${baseUrl}/${params}`;
    return await axiosClient.get(url);
  },
  getTasks: async (params) => {
    //cai nay dung de phan trang
    let url = `${baseUrl}?page=${params.page}`;
    const values = Object.values(params.search); //all value of params
    const keys = Object.keys(params.search); //all key of params
    for (let i = 0; i < keys.length; i++) {
      if (values[i] !== "") {
        url += "&" + keys[i] + "=" + values[i];
      }
    }
    return await axiosClient.get(url);
  },
  //search by params
  searchByParams: (params) => {
    let reqSearch = "";
    params.mapSearch.forEach((element) => {
      reqSearch += `${element.key}=${element.value}`;
    });
    let url = `/${params.object}?${reqSearch}&page=${params.page}`;
    return axiosClient.get(url);
  },
  newTask: (params) => {
    const url = `${baseUrl}/add`;
    axiosClient.post(url, params);
  },
  filterTask: async (params) => {
    const url = `${baseUrl}/statuses`;
   return axiosClient.post(url, params);
  },
  updateTask: async (task) => {
    const url = `${baseUrl}/edit`;
    return axiosClient.put(url, task);
  },
  deteleTask: (id) => {
    // const url = "/tasks/delete"
    const url = `${baseUrl}/delete/${id}`;
    return axiosClient.delete(url);
  },
};
export default todoListApi;
