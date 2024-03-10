'use client'

import React, { useState, useEffect } from 'react'
import {
    signInWithGoogle,
    signOut,
    onAuthStateChanged
} from '@/firebase/auth.js'
import { useRouter } from 'next/router'

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

export default function Header({initialUser}) {

    // =======
    function useUserSession(initialUser) {
        // The initialUser comes from the server via a server component
        const [user, setUser] = useState(initialUser);
        // const router = useRouter()
    
        useEffect(() => {
            const unsubscribe = onAuthStateChanged((authUser) => {
                setUser(authUser)
            })
    
            return () => unsubscribe()
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [])
    
        useEffect(() => {
            onAuthStateChanged((authUser) => {
                if (user === undefined) return
    
                // refresh when user changed to ease testing
                if (user?.email !== authUser?.email) {
                    router.refresh()
                }
            })
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [user])
    
        return user;
    }
    // =======

	const user = useUserSession(initialUser) ;

	const handleSignOut = event => {
		event.preventDefault();
		signOut();
	};

	const handleSignIn = event => {
		event.preventDefault();
		signInWithGoogle();
	};

	return (
		<header>
			{user ? (
				<>
					<div>
						<p>
							{user.displayName}
						</p>
						<div>
							...
							<ul>
								<li>
									<a href="#" onClick={handleSignOut}>
										Sign Out
									</a>
								</li>
							</ul>
						</div>
					</div>
				</>
			) : (
				<a href="#" onClick={handleSignIn}>
					Sign In with Google
				</a>
			)}
		</header>
	);
}