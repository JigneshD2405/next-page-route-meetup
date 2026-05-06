import MeetupList from "@/components/meetups/MeetupList";
import { MeetupProp } from "@/Types/meetup";
import { MongoClient } from "mongodb";

const DUMMY_MEETUPS = [
  {
    id: "m1",
    title: "A First Meetup",
    image: "https://www.wikipedia.org/portal/wikipedia.org/assets/img/Wikipedia-logo-v2@1.5x.png",
    address: "Some address 5, 12345 Some City",
    description: "This is a first meetup!",
  },
  {
    id: "m2",
    title: "A Second Meetup",
    image: "https://www.wikipedia.org/portal/wikipedia.org/assets/img/Wikipedia-logo-v2@1.5x.png",
    address: "Some address 5, 12345 Some City",
    description: "This is a Second meetup!",
  },
];

function HomePage(props: { meetups: MeetupProp[] }) {
  return <MeetupList meetups={props?.meetups} />;
}

export async function getStaticProps() {
  const client = await MongoClient.connect("mongodb://127.0.0.1:27017/meetups-app");
  const db = client.db();

  const meetupCollection = db.collection("meetups");
  const result = await meetupCollection.find().toArray();
  client.close();
  return {
    props: {
      meetups: result.map((meetup) => ({
        ...meetup,
        id: meetup._id.toString(),
        _id: null,
      })),
    },
  };
}

// export async function getServerSideProps(context: GetServerSidePropsContext) {
// return {
//   props: {
//     meetups: DUMMY_MEETUPS,
//   },
// };
// }

export default HomePage;
