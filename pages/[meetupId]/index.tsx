import MeetupDetail from "@/components/meetups/MeetupDetails";
import { MeetupProp } from "@/Types/meetup";
import { MongoClient, ObjectId } from "mongodb";
import { GetStaticPropsContext } from "next";

export default function MeetupDetails({ meetups }: { meetups: MeetupProp }) {
  return (
    <>
      <MeetupDetail
        props={{
          image: meetups.image,
          title: meetups.title,
          address: meetups.address,
          description: meetups.description,
          id: meetups.id,
        }}
      />
    </>
  );
}

export async function getStaticPaths() {
  //nextjs will render all version of this Dynamic page in advanced
  const client = await MongoClient.connect("mongodb://127.0.0.1:27017/meetups-app");
  const db = client.db();

  const meetupCollection = db.collection("meetups");
  const result = await meetupCollection.find({}, { projection: { _id: 1 } }).toArray();
  client.close();

  return {
    fallback: false, // It means path contain all possible values of meetupId
    paths: result.map((doc) => ({
      params: {
        meetupId: doc._id.toString(),
      },
    })),
  };
}

export async function getStaticProps(context: GetStaticPropsContext) {
  const meetupId = context?.params?.meetupId;
  //nextjs will render all version of this Dynamic page in advanced
  const client = await MongoClient.connect("mongodb://127.0.0.1:27017/meetups-app");
  const db = client.db();

  const meetupCollection = db.collection("meetups");
  const result = await meetupCollection.findOne({ _id: new ObjectId(meetupId as string) });
  client.close();
  return {
    props: {
      meetups: {
        image: result?.image,
        title: result?.title,
        address: result?.address,
        description: result?.description,
        id: result?._id.toString(),
      },
    },
  };
}
