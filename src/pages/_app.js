import React, { Fragment } from "react";
import App from "next/app";
import { DefaultSeo } from "next-seo";
import "@/src/styles/index.css";

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <Fragment>
        <DefaultSeo
          titleTemplate="%s | TuTutor"
          openGraph={{
            type: "website",
            locale: "es_ES",
            site_name: "TuTutor.uy",
          }}
        />
        <Component {...pageProps} />
      </Fragment>
    );
  }
}

export default MyApp;