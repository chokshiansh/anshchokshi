export interface LifeEvent {
  id: string;
  year: string;
  items: string[];
}

export interface TravelEntry {
  id: string;
  city: string;
  country: string;
  date: string;
  reflection: string;
  coordinates: [number, number]; // [longitude, latitude]
  images?: string[];
}

export interface Essay {
  id: string;
  slug: string;
  title: string;
  listingTitle?: string;
  date: string;
  readTime: string;
  content: string;
  why?: string;
  passcode?: string;
}

export interface BuildLog {
  id: string;
  date: string;
  title: string;
  description: string;
  worked: string;
  failed: string;
  learnings: string;
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

export type ViewMode = 'list' | 'map';

export interface BookingData {
  date: string | null;
  time: string | null;
  name: string;
  email: string;
  phone: string;
  note: string;
}
