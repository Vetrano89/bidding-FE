import Party from "./party";
import BidStatus from "./bid-status";
import Deal from "./deal";

interface BaseModel {
  created_at: string;
  id: number;
  published_at: string;
  updated_at: string;
}

export default BaseModel;
