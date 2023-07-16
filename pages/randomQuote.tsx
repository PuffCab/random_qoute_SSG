import { GetStaticProps } from "next";
import Head from "next/head";
import React from "react";

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
}

export const getStaticProps: GetStaticProps<RandomQuoteProps> = async () => {
  const response = await fetch("https://api.quotable.io/quotes/random");
  const result: QuoteType[] = await response.json();
  console.log("result :>> ", result);

  return {
    props: {
      quote: result,
    },
    revalidate: 60 * 5, // revalidate every 5 minutes
  };
};

export default function RandomQuote({ quote }: RandomQuoteProps) {
  console.log("quote :>> ", quote);
  return (
    <>
      <Head>
        <title key="title">SSG - random quote</title>
      </Head>
      <div>
        <h2>Random Quote of the day</h2>
        <div>
          <h3>{quote[0].content}</h3>
          <ul>From: {quote[0].author}</ul>
        </div>

        <p>Refresh to get a new one</p>
      </div>
    </>
  );
}
