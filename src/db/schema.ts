import { boolean, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
    id: serial("id").primaryKey(),
    fullName: text("full_name"),
    phone: text("phone"),
});


export const attendees = pgTable("attendees", {
    id: serial("id").primaryKey(),
    fullName: text("full_name"),                    // Meno a priezvisko
    email: text("email"),                          // E-mail
    gender: text("gender"),                        // Pohlavie (M/F)
    dateOfBirth: text("date_of_birth"),            // Dátum narodenia
    category: text("category"),                    // Kategória
    city: text("city"),                            // Mesto (optional)
    club: text("club"),                            // Klub (optional)
});

export type Attendee = typeof attendees.$inferSelect;

export const events = pgTable('events', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),                    // e.g. "CYKLOKROSA", "OSA TRÁVATHLON 2024"
  type: text('type'),                           // e.g. "Cyklokros", "Duathlon", "Cestný bike"
  startDate: timestamp('start_date').notNull(),
  endDate: timestamp('end_date').notNull(),
  location: text('location').notNull(),            // e.g. "Futbalový štadión Ladce"
  venueDetail: text('venue_detail'),               // e.g. "Pri reštaurácii Dubno"
  city: text('city').notNull(),                   // e.g. "Ladce", "Nová Dubnica"
  isCanceled: boolean('is_canceled')
    .notNull()
    .default(false),
  eventCategory: text('event_category'),         // e.g. "Pre rodiny"
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
  status: text('status')
    .notNull()
    .default('pending'), // pending, confirmed, cancelled
});
