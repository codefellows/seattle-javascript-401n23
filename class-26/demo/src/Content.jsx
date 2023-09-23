// import React from "react";
import Article from "./Article.jsx";

const Content = (props) => {
  return (
    <header>
      <h1>{props.greeting}</h1>
      <button onClick={() => props.changeTitle("Test Title")}>
        Change Title
      </button>
      <Article />
    </header>
  );
};

export default Content;

// import React from "react";
// import Article from "./Article.jsx";

// class Content extends React.Component {
//   render() {
//     return (
//       <header>
//         <h1>{this.props.greeting}</h1>
//         <button onClick={() => this.props.changeTitle("Test Title")}>
//           Change Title
//         </button>
//         <Article />
//       </header>
//     );
//   }
// }

// export default Content;
