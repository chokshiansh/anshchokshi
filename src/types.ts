export interface Essay {
  id: string;
  slug: string;
  title: string;
  listingTitle?: string;
  date: string;
  readTime: string;
  content: string;
  why?: string;
}

export interface Cafe {
  id: string;
  name: string;
  location: string; // Neighborhood name
  address: string;
  notes: string;
  coordinates: [number, number]; // [longitude, latitude]
}

export interface DayHours {
  open: string;
  close: string;
}

export interface WeeklyHours {
  monday: DayHours;
  tuesday: DayHours;
  wednesday: DayHours;
  thursday: DayHours;
  friday: DayHours;
  saturday: DayHours;
  sunday: DayHours;
}

export interface CoffeeShop {
  name: string;
  address: string;
  hours: string;
  weekly_hours?: WeeklyHours;
  coordinates?: [number, number]; // [longitude, latitude]
}

export interface CoffeeShopFile {
  metadata: Record<string, unknown>;
  coffee_shops: CoffeeShop[];
}

export interface BookingData {
  date: string | null;
  time: string | null;
  name: string;
  email: string;
  phone: string;
  note: string;
}
