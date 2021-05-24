import axios, { AxiosResponse } from "axios";
import Party from "../model/party";

export async function getParties(): Promise<Party[]> {
  const data: Party[] = await axios
    .get<Party[]>(`http://localhost:1337/parties`)
    .then((response) => response.data)
    .catch(() => []);

  return data;
}
