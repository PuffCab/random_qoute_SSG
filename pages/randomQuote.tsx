import { GetStaticProps } from "next";
import Head from "next/head";
import React from "react";
import style from "@/styles/randomQuote.module.css";

export interface QuoteType {
  _id: string;
  content: string;
  author: string;
  // tags:         string[];
  authorSlug: string;
  length: number;
  // dateAdded:    Date;
  // dateModified: Date;
}

interface RandomQuoteProps {
  quote: QuoteType[];
  generatedAt: string;
}

export const getStaticProps: GetStaticProps<RandomQuoteProps> = async () => {
  const response = await fetch("https://api.quotable.io/quotes/random");
  const result: QuoteType[] = await response.json();
  console.log("result :>> ", result);
  const date = new Date();
  const generatedAt = new Intl.DateTimeFormat("default", {
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  }).format(date);

  return {
    props: {
      quote: result,
      generatedAt: generatedAt,
    },
    revalidate: 60 * 5, // revalidate every 5 minutes
  };
};

export default function RandomQuote({ quote, generatedAt }: RandomQuoteProps) {
  console.log("quote :>> ", quote);
  const reloadPage = () => {
    window.location.reload();
  };
  return (
    <>
      <Head>
        <title key="title">SSG - random quote</title>
      </Head>
      <div className={style.container}>
        <h2 className={style.title}>Get a new Quote every 5 minutes</h2>

        <text className={style.quote}>{quote[0].content}</text>
        <text className={style.author}> From: {quote[0].author}</text>
        <div className={style.generatedAt}>
          Generated at <span className="date">{generatedAt}</span>
        </div>

        <button className={style.refresh} onClick={reloadPage}>
          Refresh to get a new one
        </button>
      </div>
    </>
  );
}
