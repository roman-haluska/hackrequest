import { db } from "@/db/db";
import { events } from "@/db/schema";
import { EventCard } from "@/components/event-card";
import { desc } from "drizzle-orm";

export default async function EventsPage() {
	const eventsData = await db
		.select()
		.from(events)
		.orderBy(desc(events.startDate));

	return (
		<div className="container mx-auto p-6">
			<h1 className="text-2xl font-bold mb-6">Events</h1>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{eventsData.map((event) => (
					<EventCard key={event.id} event={event} />
				))}
			</div>
		</div>
	);
}
