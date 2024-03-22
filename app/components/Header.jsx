"use client";

import React, { useState, useEffect, cloneElement } from "react";
import {
  signInWithGoogle,
  signOut,
  onAuthStateChanged,
} from "@/firebase/auth.js";
import { PutItemCommand, DynamoDBClient, GetItemCommand } from "@aws-sdk/client-dynamodb";

export default function Header({ initialUser }) {
  function useUserSession(initialUser) {
    // The initialUser comes from the server via a server component
    const [user, setUser] = useState(initialUser);

    useEffect(() => {
      const unsubscribe = onAuthStateChanged((authUser) => {
        setUser(authUser);
      });

      return () => unsubscribe();
    }, []);

    useEffect(() => {
      onAuthStateChanged((authUser) => {
        if (user === undefined) return;

        // refresh when user changed to ease testing
        // if (user?.email !== authUser?.email) {
        //   router.refresh();
        // }
      });
    }, [user]);

    return user;
  }

  const user = useUserSession(initialUser);

  const handleSignOut = (event) => {
    event.preventDefault();
    signOut();
  };

  const handleSignIn = (event) => {
    event.preventDefault();
    signInWithGoogle();
  };

  useEffect(() => {
    if (!user) return;

    const checkAndCreateUser = async () => {
      const userExists = await checkUserInDatabase(user);
      console.log("userExists = ",userExists);
      if (!userExists) {
        console.log("User not found in database, creating user in database")
        await createUserInDatabase(user);
      }
    };
    checkAndCreateUser();

  }, [user]);

  
  return (
    <header className="fixed min-w-full p-4 flex flex-row justify-between bg-black">
      {user ? (
        <>
          <div className="p-2 border-white border rounded">
            <a href="#" onClick={handleSignOut}>
              Sign Out
            </a>
          </div>
          <div className="p-2">
            <p className="">{user.displayName}</p>
          </div>
        </>
      ) : (
        <a className="" href="#" onClick={handleSignIn}>
          <div className="rounded p-2 border-white border">
            <p>Sign In with Google</p>
          </div>
        </a>
      )}
    </header>
  );
}


const checkUserInDatabase = async (user) => {
  // check if user exists in database
  console.log(`Checking if user exists in database: ${user.uid}`)
  const client = new DynamoDBClient({ region: process.env.NEXT_PUBLIC_AWS_REGION, credentials: { accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID, secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY}});
  const command = new GetItemCommand({
    TableName: "Quiz-Me",
    Key: {
      "UserID": { S: user.uid },
      "FileCreationDate": { S: "Long Time Ago In A Land Far Away" },
    }
  });
  console.log("Just before the try")
  try {
    console.log("Just inside the try before the send command")
    const response = await client.send(command);
    console.log("Just inside the try after the send command")
    console.log("checked user in database",response);
    if (response.Item) {
      return true;
    }
    console.log("User not found in database")
    return false;
  } catch (error) {
    console.error("Failed to send request to DynamoDB",error);
    return error;
  }
}

const createUserInDatabase = async (user) => {
  // const client = new DynamoDBClient();
  const client = new DynamoDBClient({ region: process.env.NEXT_PUBLIC_AWS_REGION, credentials: { accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID, secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY}});
  const command = new PutItemCommand({
    TableName: "Quiz-Me",
    Item: {
      "UserID": { S: user.uid },
      "FileCreationDate": { S: "Long Time Ago In A Land Far Away" },
    }
  });

  try {
    const response = await client.send(command);
    console.log("Successfully created user in database",response);
    return response;
  } catch (error) {
    console.error("Failed to send request to DynamoDB",error);
    return error;
  }
}