import BaseModel from "./base-model";

enum DealStatus {
  PENDING_APPROVAL = "PENDING_APPROVAL",
  SCHEDULED = "SCHEDULED",
  ACTIVE = "ACTIVE",
  COMPLETE = "COMPLETE",
  CANCELLED = "CANCELLED",
}

export default DealStatus;