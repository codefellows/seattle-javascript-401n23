import React, { useEffect, useReducer } from "react";

import "./App.scss";

// Let's talk about using index.js and some other name in the component folder.
// There's pros and cons for each way of doing this...
// OFFICIALLY, we have chosen to use the Airbnb style guide naming convention.
// Why is this source of truth beneficial when spread across a global organization?
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Form from "./Components/Form";
import Results from "./Components/Results";
import History from "./Components/History";
// import TestComponent from "./Components/TestComponent";

const initialState = {
  data: {},
  requestParams: {},
  history: [],
};
// {url: method: results:}

const reducerFunc = (state, action) => {
  //addResults (which updates data and pushes a new history item)
  // addParams (called from the callAPI func and adds form data)
  if (action.type === "addResults") {
    // (which updates data and pushes a new history item)
    return {
      ...state,
      data: action.data,
      history: [...state.history, action.history],
    };
  } else if (action.type === "addParams") {
    console.log("in the dispatch adding params");
    // (called from the callAPI func and adds form data)
    return { ...state, requestParams: action.requestParams, data: {} };
  }
};

/// update the appState to use useReducer, add history as a property

const App = () => {
  const [appState, dispatchAppState] = useReducer(reducerFunc, initialState);

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
    console.log("we made it into the useEffect", appState, appState.data);
    if (appState.data && Object.keys(appState.data).length) return;
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

      // right here we will dispatch updating data, and we will add a record to history
      // addResult
      // {url: method: results:}
      const historyObj = { url, method, results: request.data };
      const action = {
        type: "addResults",
        data: request.data,
        history: historyObj,
      };
      // setAppState({ ...appState, data: request.data });
      dispatchAppState(action);
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
    // add params
    // setAppState({ data: {}, requestParams });
    dispatchAppState({ type: "addParams", requestParams });
  };

  return (
    <React.Fragment>
      <Header />
      <div style={{ display: "flex" }}>
        <div style={{ width: "66%" }}>
          <div>Request Method: {appState.requestParams.method}</div>
          <div>URL: {appState.requestParams.url}</div>
          {appState.requestParams.body && (
            <div>Body: {appState.requestParams.body}</div>
          )}
          <div style={{ width: "50%", marginLeft: "60%" }}>
            <Form handleApiCall={callApi} />
            <Results data={appState.data} />
          </div>
        </div>
        <div style={{ width: "33%" }}>
          <History history={appState.history} />
        </div>
      </div>
      {/* <TestComponent /> */}
      <Footer />
    </React.Fragment>
  );
};

export default App;
