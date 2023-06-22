import axios from "axios";
import { FormValues } from "../components/CountryForm";

const url = "https://apit1.web2.anasource.com/";
export const getAllCountries = async (
  path: string,
  pageNumber: number,
  pageSize: number,
  sortOrder?: string,
  sortColumn?: string,
  searchQuery?: string
) => {
  let result;
  await axios
    .post(url + path, {
      pageNumber: pageNumber,
      pageSize: pageSize,
      sortOrder: sortOrder,
      sortBy: sortColumn,
      searchKey: searchQuery,
    })
    .then((response) => {
      result = response.data;
      console.log(result);
    })
    .catch((err) => console.log(err.message));
  return result;
};

export const getCountry = async (path:string) => {
    let result;
    await axios.get(url+path)
    .then(response => {
        result= response.data
    }).catch(err => {
        console.log(err.message)
    })
    console.log(result)
    return result
}

export const addCountry = async (path: string, data: FormValues) => {
  
    const fullData = {
    ...data,
    status: data.status === "Active" ? 2 : 1,
  };

  let message;
  await axios.post(url + path, fullData)
  .then((response) => {
    console.log(response)
    console.log(response.data.message);
    message = response.data.message
  }).catch(err => {
    console.log(err.message)
    message = err.message
  })
  return message
};


export const editCountry = async (path: string, data: FormValues) => {
  
    const fullData = {
    ...data,
    status: data.status === "Active" ? 2 : 1,
  };

  let message;
  await axios.put(url + path, fullData)
  .then((response) => {
    console.log(response.data.message);
    message = response.data.message
  }).catch(err => {
    console.log(err.message)
    message = err.messages
  })
  return message
};

export const deleteCountry = async (path:string) => {
    let message;
    await axios.delete(url+path)
    .then(response => {
        console.log(response)
        message= response.data.message

    }).catch(err => {
        message = err.response.data.Message
    })
    console.log(message)
    return message
}
