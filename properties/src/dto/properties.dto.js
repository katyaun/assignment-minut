class PropertyDto {
  constructor({ name, long, lat, ownerId, timezone, bookingSlots, role, region }) {
    this.name = name;
    this.ownerId = ownerId;
    this.region = region || this.getRegion();
    this.timezone = timezone || "Europe/London";
    this.bookingSlots = bookingSlots || [];
    this.lat = lat || 45.224;
    this.long = long || 53.22;
  }

  getRegion() {
    return 'Europe';
  }
}

export default PropertyDto;
