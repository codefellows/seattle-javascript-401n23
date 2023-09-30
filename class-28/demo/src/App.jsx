import React, { useEffect, useState } from "react";

import "./App.scss";

// Let's talk about using index.js and some other name in the component folder.
// There's pros and cons for each way of doing this...
// OFFICIALLY, we have chosen to use the Airbnb style guide naming convention.
// Why is this source of truth beneficial when spread across a global organization?
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Form from "./Components/Form";
import Results from "./Components/Results";

const App = () => {
  const [appState, setAppState] = useState({
    data: {},
    requestParams: {},
  });

  // listen for the state (appState.requestParams) to change (url and method, maybe body)
  // when they change, make a http request
  // update the DATA (appState.data) to the new values
  // use a useEffect to do this

  // useEffect is a hook, it takes 2 arguments: callback function, dependancy array
  // OPTION 1
  // useEffect(() => {
  //   // can do anything
  //   // this function runs on component mount AND when any dependancies in the array change
  //   if (!appState.requestParams.url) return;
  //   (async () => {
  //     // make the request
  //     const url = appState.requestParams.url;
  //     const method = appState.requestParams.method;
  //     // make the request, get back data
  //     // spread opperator takes the object and spreads it apart
  //     // {data, requestParams}
  //     // {...appState, pizza: "yum"}
  //     // {data, requestParams, pizza: "yum"}
  //     // {appState, pizza: "yum"}
  //     // {appState: {data, requestParams}, pizza: "yum"}
  //     //{...appState, data: {}}
  //     // {data: {fkjsdhfkafh" "woo"}, requestParams: {url: "yaya", method: "GET"}, data: {}}
  //     setAppState((prev) => ({ ...prev, data: {} }));
  //     // be very careful that you don't create a circular dependancy - where the state of the thing you are watching changes every time the function runs
  //   })();
  // }, [appState.requestParams]);

  // OPTION 2
  useEffect(() => {
    // can do anything
    if (!appState.requestParams.url) return;
    if (appState.data && Object.keys(appState.data)) return;
    // early exit gate
    (async () => {
      // make the request
      const url = appState.requestParams.url;
      const method = appState.requestParams.method;
      console.log(url, method);
      // make the request, get back data
      const request = {
        data: {
          count: 2,
          results: [
            { name: "fake thing 1", url: "http://fakethings.com/1" },
            { name: "fake thing 2", url: "http://fakethings.com/2" },
          ],
        },
      };
      // spread opperator takes the object and spreads it apart
      // {data, requestParams}
      // {...appState, pizza: "yum"}
      // {data, requestParams, pizza: "yum"}
      // {appState, pizza: "yum"}
      // {appState: {data, requestParams}, pizza: "yum"}
      //{...appState, data: {}}
      // {data: {fkjsdhfkafh" "woo"}, requestParams: {url: "yaya", method: "GET"}, data: {}}
      setAppState({ ...appState, data: request.data });
      // be very careful that you don't create a circular dependancy - where the state of the thing you are watching changes every time the function runs
    })();
    return () => {
      console.log("component unmounts");
    };
    // the dependancy array is our watch list
  }, [appState]);

  const callApi = (requestParams) => {
    // mock output
    // const data = {
    //   count: 2,
    //   results: [
    //     { name: "fake thing 1", url: "http://fakethings.com/1" },
    //     { name: "fake thing 2", url: "http://fakethings.com/2" },
    //   ],
    // };
    // updating the requestParams in state will trigger the use effect
    setAppState({ data: {}, requestParams });
  };

  return (
    <React.Fragment>
      <Header />
      <div>Request Method: {appState.requestParams.method}</div>
      <div>URL: {appState.requestParams.url}</div>
      {appState.requestParams.body && (
        <div>Body: {appState.requestParams.body}</div>
      )}
      <Form handleApiCall={callApi} />
      <Results data={appState.data} />
      <Footer />
    </React.Fragment>
  );
};

export default App;
