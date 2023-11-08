import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Modal,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";

export default function App() {
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const [purpose, setPurpose] = useState("");
  const [amount, setAmount] = useState("");
  const [entries, setEntries] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    (async () => {
      if (Constants.platform.ios) {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const takePicture = async () => {
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.uri);
    }
  };

  const submitEntry = () => {
    const newEntry = {
      id: entries.length + 1,
      title: title,
      purpose: purpose,
      amount: amount,
      image: image,
    };
    setEntries([...entries, newEntry]);
    setImage(null);
    setTitle("");
    setPurpose("");
    setAmount("");
  };

  const displayImage = (image) => {
    setSelectedImage(image);
    setModalVisible(true);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.titleText}>Expense Tracker App</Text>
        <View style={styles.imageContainer}>
          {image ? (
            <Image source={{ uri: image }} style={styles.image} />
          ) : (
            <Text style={styles.uploadText}>Upload</Text>
          )}
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={pickImage}>
          <Text style={styles.buttonText}>Pick from gallery</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={takePicture}>
          <Text style={styles.buttonText}>Take a picture</Text>
        </TouchableOpacity>
      </View>
      <TextInput
        style={styles.input}
        onChangeText={(text) => setTitle(text)}
        value={title}
        placeholder="Title"
      />
      <TextInput
        style={styles.input}
        onChangeText={(text) => setPurpose(text)}
        value={purpose}
        placeholder="Purpose"
      />
      <TextInput
        style={styles.input}
        onChangeText={(text) => setAmount(text)}
        value={amount}
        placeholder="Amount"
        keyboardType="numeric"
      />
      <TouchableOpacity style={styles.submitButton} onPress={submitEntry}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
      <ScrollView style={styles.entryContainer}>
        {entries.length > 0 ? (
          entries.map((entry) => (
            <TouchableOpacity
              key={entry.id}
              style={styles.entry}
              onPress={() => displayImage(entry.image)}
            >
              <Text>{`Title: ${entry.title}`}</Text>
              <Text>{`Purpose: ${entry.purpose}`}</Text>
              <Text>{`Amount: ${entry.amount}`}</Text>
            </TouchableOpacity>
          ))
        ) : (
          <View style={styles.noRecordsContainer}>
            <Text style={styles.noRecordsText}>No records found</Text>
          </View>
        )}
      </ScrollView>
      {selectedImage && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(false);
            setSelectedImage(null);
          }}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Image
                source={{ uri: selectedImage }}
                style={styles.modalImage}
              />
              <Button title="Close" onPress={() => setModalVisible(false)} />
            </View>
          </View>
        </Modal>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  header: {
    alignItems: "center",
    marginBottom: 40,
  },
  titleText: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 50,
  },
  imageContainer: {
    marginTop: 20,
    width: 200,
    height: 200,
    borderWidth: 1,
    borderColor: "#ddd",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 5,
  },
  uploadText: {
    fontSize: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#4EB151",
    padding: 10,
    borderRadius: 5,
    width: "48%",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
    borderRadius: 5,
  },
  submitButton: {
    backgroundColor: "#4EB151",
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
    height: 50,
  },
  entryContainer: {
    flex: 1,
    backgroundColor: "#f9f9f9",
    marginTop: 20,
  },
  entry: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: "#f9f9f9",
    borderRadius: 5,
  },
  noRecordsContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  noRecordsText: {
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 22,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    borderColor: "rgba(0, 0, 0, 0.1)",
  },
  modalImage: {
    width: 300,
    height: 300,
    marginBottom: 20,
  },
});
