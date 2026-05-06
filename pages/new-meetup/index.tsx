import NewMeetupForm from "@/components/meetups/NewMeetupForm";
import { MeetupProp } from "@/Types/meetup";

type NewMeetupInput = Omit<MeetupProp, "id">;

export default function NewMeetupPage() {
  async function handleAddMeetup(meetupData: NewMeetupInput) {
    const response = await fetch("/api/new-meetup", {
      method: "POST",
      body: JSON.stringify(meetupData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log("Data :-", data);
  }
  return <NewMeetupForm onAddMeetup={handleAddMeetup} />;
}
