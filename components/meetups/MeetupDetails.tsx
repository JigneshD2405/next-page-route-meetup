import { MeetupProp } from "@/Types/meetup";
import classes from "./MeetupDetails.module.css";
export default function MeetupDetail({ props }: { props: MeetupProp }) {
  return (
    <section className={classes.detail}>
      <img src={props.image} alt={props.title} />
      <h1>{props.title}</h1>
      <address>{props.address}</address>
      <p>{props.description}</p>
    </section>
  );
}
