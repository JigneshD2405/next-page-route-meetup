import MeetupDetail from "@/components/meetups/MeetupDetails";

export default function MeetupDetails() {
  return (
    <>
      <MeetupDetail
        props={{
          image: "https://www.wikipedia.org/portal/wikipedia.org/assets/img/Wikipedia-logo-v2@1.5x.png",
          title: "A First Meetup",
          address: "Some address 5, 12345 Some City",
          description: "The Meetup Description",
          id: "m1",
        }}
      />
    </>
  );
}
