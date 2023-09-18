//our-domain.com/meetupId
import { Fragment } from "react";
import { MongoClient, ObjectId } from "mongodb";
import Head from "next/head";

import MeetupDetail from "@/components/meetups/MeetupDetail";

function DetailsPage(props) {
  // return <Fragment>
  //     <img src="https://pbs.twimg.com/media/F6EuTm6W4AALdSW?format=jpg&name=900x900" alt="meetup 1 title"/>
  //     <h1>meetup 1 title</h1>
  //     <address>meetup 1 address</address>
  //     <p>meetup 1 desription</p>
  // </Fragment>;
  return (
    <Fragment>
      <Head>
        <title>{props.meetupData.title}</title>
        <meta name="description" content={props.meetupData.description} />
      </Head>
      <MeetupDetail
        // img="https://pbs.twimg.com/media/F6EuTm6W4AALdSW?format=jpg&name=900x900"
        // title="meetup 1 title"
        // address="meetup 1 address"
        // description="meetup 1 description"
        img={props.meetupData.image}
        address={props.meetupData.address}
        title={props.meetupData.title}
        description={props.meetupData.description}
      />
    </Fragment>
  );
}

export default DetailsPage;

export async function getStaticPaths() {
  const client = await MongoClient.connect(
    "mongodb+srv://msvmongodb1:xCjtQD7hLwM_1EYAa@cluster0.a0s4nqy.mongodb.net/?retryWrites=true&w=majority"
  );
  const db = client.db();
  const meetupsCollection = db.collection("meetups");
  const meetupIds = await meetupsCollection.find({}, { _id: 1 }).toArray();
  client.close();

  return {
    fallback: false,
    paths: meetupIds.map((meetupId) => ({
      params: { meetupId: meetupId._id.toString() },
    })),
    // paths: [
    //   {
    //     params: {
    //       meetupId: "id1",
    //     },
    //   },
    //   {
    //     params: {
    //       meetupId: "id2",
    //     },
    //   },
    // ],
  };
}

export async function getStaticProps(context) {
  // fetch data for a single meetup
  const meetupId = context.params.meetupId;
  console.log("meetupId", meetupId);
  const client = await MongoClient.connect(
    "mongodb+srv://msvmongodb1:xCjtQD7hLwM_1EYAa@cluster0.a0s4nqy.mongodb.net/?retryWrites=true&w=majority"
  );
  const db = client.db();
  const meetupsCollection = db.collection("meetups");
  const selectedMeetup = await meetupsCollection.findOne({
    _id: new ObjectId(meetupId),
  });
  client.close();

  return {
    props: {
      meetupData: {
        id: selectedMeetup._id.toString(),
        title: selectedMeetup.title,
        address: selectedMeetup.address,
        image: selectedMeetup.image,
        description: selectedMeetup.description,
      },
      // meetupData: {
      //   id: meetupId,
      //   img: "https://pbs.twimg.com/media/F6EuTm6W4AALdSW?format=jpg&name=900x900",
      //   title: "meetup 1 title",
      //   address: "meetup 1 address",
      //   description: "meetup 1 desription",
      // },
    },
  };
}
