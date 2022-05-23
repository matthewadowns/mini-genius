import Head from "next/head";
import Image from "next/image";
import React from "react";

import SearchGenius from "../components/SearchGenius";

import styles from "../styles/Home.module.css";

export default function Home() {
    return (
        <div className={styles.container}>
            <Head>
                <title>Mini Genius</title>
                <meta
                    name="description"
                    content="Generated by create next app"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={styles.main}>
                <h1 className={styles.title}>Welcome to Mini Genius</h1>
                <p className={styles.description}>
                    A simple NextJS app to search <em>songs</em>,{" "}
                    <em>artists</em> and{" "}
                    <strong>
                        <em>lyrics</em>
                    </strong>
                    . Get information for any Lyrics, Artist or Song from{" "}
                    <a
                        href="http://genius.com"
                        rel="noopener noreferrer"
                        title="Go to genius.com"
                        target="_blank"
                    >
                        Genius.com
                    </a>
                    , using{" "}
                    <a
                        href="https://rapidapi.com"
                        rel="noopener noreferrer"
                        title="Go to rapidapi.com"
                        target="_blank"
                    >
                        RapidAPI
                    </a>
                </p>
                <SearchGenius />
            </main>

            <footer className={styles.footer}>
                <a
                    href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
                    rel="noopener noreferrer"
                    target="_blank"
                    title="Go to Vercel"
                >
                    Powered by{" "}
                    <span className={styles.logo}>
                        <Image
                            src="/vercel.svg"
                            alt="Vercel Logo"
                            width={72}
                            height={16}
                        />
                    </span>
                </a>
            </footer>
        </div>
    );
}
