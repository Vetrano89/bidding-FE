enum DealStatus {
  //Unused, used in an admin flow where Deals must be approved before going live
  PENDING_APPROVAL = "PENDING_APPROVAL",
  // Unused, this would allow a user to set a deal to become active in the future
  SCHEDULED = "SCHEDULED",
  ACTIVE = "ACTIVE",
  COMPLETE = "COMPLETE",
  // Unused, this would be applied when no Bid was chosen
  CANCELLED = "CANCELLED",
}

export default DealStatus;
