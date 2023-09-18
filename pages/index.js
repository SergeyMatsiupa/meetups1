//our-domain.com
import { useEffect, useState, Fragment } from "react";
import { MongoClient } from "mongodb";
import Head from "next/head";

// import Layout from "@/components/layout/Layout";
import MeetupList from "@/components/meetups/MeetupList";

const DUMMY_MEETUPS = [
  {
    id: "id1",
    title: "meetup 1 title",
    address: "meetup 1 address",
    image:
      "https://pbs.twimg.com/media/F6EuTm6W4AALdSW?format=jpg&name=900x900",
    description: "meetup 1 desription",
  },
  {
    id: "id2",
    title: "meetup 2 title",
    address: "meetup 2 address",
    image:
      "https://pbs.twimg.com/media/F6EuTm6W4AALdSW?format=jpg&name=900x900",
    description: "meetup 2 desription",
  },
];

function HomePage(props) {
  // const [loadedMeetups, setLoadedMeetups] = useState([]);

  // useEffect(() => {
  //   // make a http request and fetch meetups from server
  //   setLoadedMeetups(DUMMY_MEETUPS);
  // }, []);

  return (
    // <p>bla bla</p>
    // <Layout>
    // <MeetupList meetups={DUMMY_MEETUPS} />
    // <MeetupList meetups={loadedMeetups} />
    <Fragment>
      <Head>
        <title>Page title</title>
        <meta name="description" content="browse a huge list of highly active React meetups"/>
      </Head>
      <MeetupList meetups={props.meetups} />
    </Fragment>
    // </Layout>
  );
}

export default HomePage;

// export async function getStaticProps() {
//   // fetch data from an API
//   return {
//     props: {
//       meetups: DUMMY_MEETUPS,
//     },
//     revalidate: 1,
//   }

export async function getServerSideProps(context) {
  const req = context.request;
  const res = context.response;
  // fetch data from an API
  const client = await MongoClient.connect(
    "mongodb+srv://msvmongodb1:xCjtQD7hLwM_1EYAa@cluster0.a0s4nqy.mongodb.net/?retryWrites=true&w=majority"
  );
  const db = client.db();
  const meetupsCollection = db.collection("meetups");
  const meetups = await meetupsCollection.find().toArray();
  client.close();

  return {
    props: {
      // meetups: DUMMY_MEETUPS,
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        image: meetup.image,
        address: meetup.address,
        id: meetup._id.toString(),
      })),
    },
  };
}
