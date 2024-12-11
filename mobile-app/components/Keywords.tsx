// Keywords Component

// Asset Imports
import { Text, View, StyleSheet, ScrollView } from "react-native";

const keywords = [
  { word: "Kash", definition: " - A very cool bird!" },
  { word: "Michael", definition: " - A very tired boy!" },
  { word: "React", definition: " - A JavaScript library for building UIs!" },
  { word: "JavaScript", definition: " - A programming language!" },
  { word: "Node", definition: " - A JavaScript runtime environment!" },
  { word: "Expo", definition: " - A framework and platform for universal React apps!" },
  { word: "TypeScript", definition: " - A superset of JavaScript that adds types!" },
  { word: "React", definition: " - A JavaScript library for building UIs!" },
  { word: "JavaScript", definition: " - A programming language!" },
  { word: "Node", definition: " - A JavaScript runtime environment!" },
  { word: "Expo", definition: " - A framework and platform for universal React apps!" },
  { word: "TypeScript", definition: " - A superset of JavaScript that adds types!" },
  { word: "React", definition: " - A JavaScript library for building UIs!" },
  { word: "JavaScript", definition: " - A programming language!" },
  { word: "Node", definition: " - A JavaScript runtime environment!" },
  { word: "Expo", definition: " - A framework and platform for universal React apps!" },
  { word: "TypeScript", definition: " - A superset of JavaScript that adds types!" },
  { word: "React", definition: " - A JavaScript library for building UIs!" },
  { word: "JavaScript", definition: " - A programming language!" },
  { word: "Node", definition: " - A JavaScript runtime environment!" },
  { word: "Expo", definition: " - A framework and platform for universal React apps!" },
  { word: "TypeScript", definition: " - A superset of JavaScript that adds types!" },
  { word: "React", definition: " - A JavaScript library for building UIs!" },
  { word: "JavaScript", definition: " - A programming language!" },
  { word: "Node", definition: " - A JavaScript runtime environment!" },
  { word: "Expo", definition: " - A framework and platform for universal React apps!" },
  { word: "TypeScript", definition: " - A superset of JavaScript that adds types!" },
  { word: "React", definition: " - A JavaScript library for building UIs!" },
  { word: "JavaScript", definition: " - A programming language!" },
  { word: "Node", definition: " - A JavaScript runtime environment!" },
  { word: "Expo", definition: " - A framework and platform for universal React apps!" },
  { word: "TypeScript", definition: " - A superset of JavaScript that adds types!" },
  { word: "React", definition: " - A JavaScript library for building UIs!" },
  { word: "JavaScript", definition: " - A programming language!" },
  { word: "Node", definition: " - A JavaScript runtime environment!" },
  { word: "Expo", definition: " - A framework and platform for universal React apps!" },
  { word: "TypeScript", definition: " - A superset of JavaScript that adds types!" },
  { word: "React", definition: " - A JavaScript library for building UIs!" },
  { word: "JavaScript", definition: " - A programming language!" },
  { word: "Node", definition: " - A JavaScript runtime environment!" },
  { word: "Expo", definition: " - A framework and platform for universal React apps!" },
  { word: "TypeScript", definition: " - A superset of JavaScript that adds types!" },
]

// Returns a Keywords Component
export function Keywords() {
    return (
      <View
        style={styles.container}
      >
        <Text
          style={styles.title}
        >
          Keywords
        </Text>
        <ScrollView
          style={styles.scrollView}
        >
          {keywords.map((item) => (
            <View
              style={styles.keywordItem}
            >
              <Text
                style={styles.blueText}
              >
                {item.word}
              </Text>
              <Text> {item.definition}</Text>
              <Text>lorem100
                
              </Text>
            </View>
          ))}
        </ScrollView>
      </View>
    );
}

const styles = StyleSheet.create({
  blueText: {
    color: "blue",
  },
  container: {
    flexGrow: 1,
    width: "80%",
  },
  title: {

  },
  keywordItem: {
    flex: 1,
    flexDirection: "row",
    paddingHorizontal: 10,
  },
  scrollView: {
    paddingBottom: 20,
  },
});

