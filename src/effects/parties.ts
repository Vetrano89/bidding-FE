import axios from "axios";
import Party from "../model/party";

//TODO: Actually do something when calls fail

export async function getParties(): Promise<Party[]> {
  const data: Party[] = await axios
    .get<Party[]>(`http://localhost:1337/parties`)
    .then((response) => response.data)
    .catch(() => []);

  return data;
}
