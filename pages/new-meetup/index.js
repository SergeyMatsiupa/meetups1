//our-domain.com/new-meetup
import { useRouter } from "next/router";
import Head from "next/head";
import { Fragment } from "react";

import NewMeetupForm from "@/components/meetups/NewMeetupForm";

function NewMeetupPage() {
  const router = useRouter();

  async function addMeetupHandler(enteredMeetupData) {
    console.log("enteredMeetupData", enteredMeetupData);
    const response = await fetch("/api/new-meetup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(enteredMeetupData),
    });
    const data = await response.json();
    console.log("data", data);
    router.push("/");
  }

  return (
    <Fragment>
      <Head>
        <title>Add a new meetup</title>
        <meta name="description" content="add a new amazing meetup" />
      </Head>
      <NewMeetupForm onAddMeetup={addMeetupHandler} />
    </Fragment>
  );
}

export default NewMeetupPage;
