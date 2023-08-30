const dynamoose = require("dynamoose");

// make a schema - just like we did with mongoDB or like with our sql db
const schema = new dynamoose.Schema({ id: String, name: String, age: Number });

const peopleModel = dynamoose.model("people", schema);

exports.handler = async (event) => {
  // TODO implement
  const response = {
    statusCode: null,
    body: null,
  };
  console.log(event.pathParameters, "PATH PARAM");
  try {
    const id = event.pathParameters?.id;
    let results;
    if (id) {
      // if we send through an id, get one
      const list = await peopleModel.query("id").eq(id).exec();
      results = list[0];
    } else {
      // if we don't send an id, get all
      results = await peopleModel.scan().exec();
    }
    response.statusCode = 200;
    response.body = JSON.stringify(results);
  } catch (e) {
    // if I am not successful in getting from my table I will send back status 500 and the error message
    response.statusCode = 500;
    response.body = JSON.stringify(e.message);
  }

  return response;
};
