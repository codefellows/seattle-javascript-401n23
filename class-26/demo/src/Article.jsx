import "./Article.css";

const Article = () => {
  return (
    <article>
      <h3>Lorem Ipsum</h3>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis
        possimus deserunt voluptatum quam? Corporis nisi voluptatum doloremque
        laudantium obcaecati accusantium.
      </p>
    </article>
  );
};

export default Article;

// Switch from class syntax to function syntax
// const ComponentName = () => {
//   return ()
// }

// export default ComponentName

// if we use props bring them into the function parameters and remove "this."

// import React from 'react';
// import './Article.css';

// class Article extends React.Component {
//   render() {
//     return (
//       <article>
//         <h3>Lorem Ipsum</h3>
//         <p>
//           Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis possimus deserunt voluptatum quam? Corporis nisi voluptatum doloremque laudantium obcaecati accusantium.
//         </p>
//       </article>
//     );
//   }
// }

// export default Article;
