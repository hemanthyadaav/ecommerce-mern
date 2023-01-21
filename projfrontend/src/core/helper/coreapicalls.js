import { API } from "../../backend";

export const getAllProducts = () => {
  return fetch(`${API}/product/all`)
    .then((res) => {
      return res.json();
    })
    .catch((err) => console.log(err));
};
