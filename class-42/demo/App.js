import { StatusBar } from "expo-status-bar";
import { Box, Heading, NativeBaseProvider, VStack } from "native-base";
import { Button, FlatList, StyleSheet, Text, View } from "react-native";
import * as Haptics from "expo-haptics";
import { LinearGradient } from "expo-linear-gradient";
import useGetAxios from "./hook/getAxios.js";
import ScrollableTileList from "./components/ScrollableTileList.js";

export default function App() {
  const { results, prev, next, error, getPage } = useGetAxios(
    "https://pokeapi.co/api/v2/pokemon"
  );
  // console.log(results);
  const renderItem = (item) => (
    // <View style={styles.item}>
    <Button
      key={item.name}
      color="#FFFFFF"
      onPress={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)}
      // onPress={() => call(item)}
      // style={styles.button}
      title={item.name}
    />
    // </View>
  );

  const getNext = () => {
    getPage(next);
  };

  const getPrevious = () => {
    getPage(prev);
  };

  return (
    <NativeBaseProvider>
      <Box safeArea>
        <LinearGradient
          // Button Linear Gradient
          colors={["#4c669f", "#3b5998", "#192f6a"]}
          style={styles.button}
        >
          <Heading size="2xl" mb="4" textAlign="center">
            Pokemon
          </Heading>
          <VStack space={3} alignItems="center">
            <ScrollableTileList
              data={results}
              renderItem={renderItem}
              getPrevious={getPrevious}
              getNext={getNext}
              prev={prev}
              next={next}
            />
          </VStack>
        </LinearGradient>
      </Box>
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    padding: 15,
    alignItems: "center",
    borderRadius: 5,
  },
});
