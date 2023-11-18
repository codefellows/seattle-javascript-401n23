import React from "react";
import { HStack, ScrollView } from "native-base";
import { Button } from "native-base";

const ScrollableTileList = ({
  data,
  renderItem,
  getPrevious,
  getNext,
  prev,
  next,
}) => {
  const Stack = () =>
    data ? (
      <HStack
        space={10}
        justifyContent="space-around"
        minH={20}
        display={"flex"}
        flexWrap={"wrap"}
      >
        {data.map((poke) => renderItem(poke))}
      </HStack>
    ) : null;
  return (
    <ScrollView>
      <Button
        colorScheme="secondary"
        onPress={() => getPrevious()}
        isDisabled={prev ? false : true}
        // onPress={() => call(item)}
        // style={styles.button}
      >
        Prev
      </Button>
      <Button
        onPress={() => getNext()}
        isDisabled={next ? false : true}
        // style={styles.button}
      >
        Next
      </Button>
      <Stack />
    </ScrollView>
  );
};

export default ScrollableTileList;
