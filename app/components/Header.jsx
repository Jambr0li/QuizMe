"use client";

import React, { useState, useEffect } from "react";
import {
  signInWithGoogle,
  signOut,
  onAuthStateChanged,
} from "@/firebase/auth.js";
import { useRouter } from "next/router";

// function useUserSession(initialUser) {
// 	// The initialUser comes from the server via a server component
// 	const [user, setUser] = useState(initialUser);
// 	const router = useRouter()

// 	useEffect(() => {
// 		const unsubscribe = onAuthStateChanged((authUser) => {
// 			setUser(authUser)
// 		})

// 		return () => unsubscribe()
// 		// eslint-disable-next-line react-hooks/exhaustive-deps
// 	}, [])

// 	useEffect(() => {
// 		onAuthStateChanged((authUser) => {
// 			if (user === undefined) return

// 			// refresh when user changed to ease testing
// 			if (user?.email !== authUser?.email) {
// 				router.refresh()
// 			}
// 		})
// 		// eslint-disable-next-line react-hooks/exhaustive-deps
// 	}, [user])

// 	return user;
// }

export default function Header({ initialUser }) {
  // =======
  function useUserSession(initialUser) {
    // The initialUser comes from the server via a server component
    const [user, setUser] = useState(initialUser);
    // const router = useRouter()

    useEffect(() => {
      const unsubscribe = onAuthStateChanged((authUser) => {
        setUser(authUser);
      });

      return () => unsubscribe();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
      onAuthStateChanged((authUser) => {
        if (user === undefined) return;

        // refresh when user changed to ease testing
        if (user?.email !== authUser?.email) {
          router.refresh();
        }
      });
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]);

    return user;
  }
  // =======

  const user = useUserSession(initialUser);

  const handleSignOut = (event) => {
    event.preventDefault();
    signOut();
  };

  const handleSignIn = (event) => {
    event.preventDefault();
    signInWithGoogle();
  };

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
