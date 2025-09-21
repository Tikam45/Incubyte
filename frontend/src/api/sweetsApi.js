import {apiConnector} from './apiCall'
import {BASE_URL, endpoints } from './apis'

export async function fetchSweets(queryParams) {
  const response = await apiConnector("GET", endpoints.GET_SWEETS_API, queryParams, 
    {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    }
  );
  console.log(response);
  return response.data;
}

export async function purchaseSweet({sweetId, quantity}) {
  const response = await apiConnector("POST", BASE_URL+'/sweets/'+sweetId+'/purchase', { quantity },
    {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    }
  );
  console.log(response);
  return response.data;
}