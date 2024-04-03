"use client"
import React from 'react';
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";
import { useSearchParams } from "next/navigation";

// const styles = StyleSheet.create({
//     page: {
//         flexDirection: "row",
//         backgroundColor: "#E4E4E4"
//     },
//     section: {
//         magrin: 10,
//         padding: 10,
//         flexGrow: 1
//     }
// });

// const MyDocument = () => (
//     <Document>
//         <Page size="A4" style={styles.page}>
//             <View style={styles.section}>
//                 <Text>Section #1</Text>
//             </View>
//             <View style={styles.section}>
//                 <Text>Section #2</Text>
//             </View>
//         </Page>
//     </Document>
// )

export default function AccessQuiz(){
    const searchParams = useSearchParams()
    const prompt = searchParams.get('prompt')
    //const user = searchParams.get('userId')

    return(
        <main className="flex min-h-screen flex-col items-center p-24 bg-white text-black">
            <iframe src="/output.pdf" width="100%" height="1200px" />
        </main>
    )
}