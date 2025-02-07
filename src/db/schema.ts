import { pgTable, serial, text, varchar, timestamp, boolean } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
    id: serial("id").primaryKey(),
    fullName: text("full_name"),
    phone: varchar("phone", { length: 256 }),
});


export const attendees = pgTable("attendees", {
    id: serial("id").primaryKey(),
    fullName: text("full_name"),                    // Meno a priezvisko
    email: varchar("email", { length: 256 }),       // E-mail
    gender: varchar("gender", { length: 1 }),       // Pohlavie (M/F)
    dateOfBirth: text("date_of_birth"),            // Dátum narodenia
    category: varchar("category", { length: 100 }), // Kategória
    city: text("city"),                            // Mesto (optional)
    club: text("club"),                            // Klub (optional)
    phone: varchar("phone", { length: 256 }),      // Keeping the phone field
});

export const events = pgTable('events', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),                    // e.g. "CYKLOKROSA", "OSA TRÁVATHLON 2024"
  type: varchar('type', { length: 50 }).notNull(), // e.g. "Cyklokros", "Duathlon", "Cestný bike"
  startDate: timestamp('start_date').notNull(),
  endDate: timestamp('end_date').notNull(),
  location: text('location').notNull(),            // e.g. "Futbalový štadión Ladce"
  venueDetail: text('venue_detail'),               // e.g. "Pri reštaurácii Dubno"
  city: text('city').notNull(),                   // e.g. "Ladce", "Nová Dubnica"
  isCanceled: boolean('is_canceled')
    .notNull()
    .default(false),
  eventCategory: varchar('event_category', { length: 50 }), // e.g. "Pre rodiny"
  description: text('description'),
  imageUrl: text('image_url'),
});

export type Event = typeof events.$inferSelect;

// If you need to track registrations/participants
export const eventRegistrations = pgTable('event_registrations', {
  id: serial('id').primaryKey(),
  eventId: serial('event_id').references(() => events.id),
  attendeeId: serial('attendee_id').references(() => attendees.id),
  registrationDate: timestamp('registration_date')
    .notNull()
    .defaultNow(),
  status: varchar('status', { length: 20 })
    .notNull()
    .default('pending'), // pending, confirmed, cancelled
});