import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "../AppContext";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  TouchableOpacity,
  TextInput,
  Modal,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Picker } from "@react-native-picker/picker";

export default function CreateEntryScreen() {
  const { state, dispatch } = useContext(AppContext);
  const salesEntries = state.salesEntries;
  const expensesEntries = state.expensesEntries;
  const [type, setType] = useState("Sale");
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [modalText, setModalText] = useState("");

  useEffect(() => {
    (async () => {
      if (Constants.platform.ios || Constants.platform.android) {
        const cameraRollStatus =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        const cameraStatus = await ImagePicker.requestCameraPermissionsAsync();
        if (
          cameraRollStatus.status !== "granted" ||
          cameraStatus.status !== "granted"
        ) {
          alert("Sorry, we need camera and camera roll permissions!");
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
      setImage(result.assets[0].uri);
    }
  };

  const addExpensesEntry = (newEntry) => {
    dispatch({ type: "ADD_EXPENSES_ENTRY", payload: { newEntry } });
  };

  const addSalesEntry = (newEntry) => {
    dispatch({ type: "ADD_SALES_ENTRY", payload: { newEntry } });
  };

  const toggleModalTrue = (text) => {
    setModalText(text);
    setModalVisible(true);
  };

  const submitEntry = () => {
    if (!title || !description || !amount || !image) {
      toggleModalTrue("Please upload an image and fill in all fields");
      return;
    }

    if (type === "Expense") {
      const newEntry = {
        id: expensesEntries.length + 1,
        title: title,
        description: description,
        amount: amount,
        image: image,
      };
      addExpensesEntry(newEntry);
    } else {
      const newEntry = {
        id: salesEntries.length + 1,
        title: title,
        description: description,
        amount: amount,
        image: image,
      };
      addSalesEntry(newEntry);
    }
    setImage(null);
    setTitle("");
    setDescription("");
    setAmount("");
    toggleModalTrue("Entry added successfully!");
  };

  return (
    <KeyboardAwareScrollView
      resetScrollToCoords={{ x: 0, y: 0 }}
      scrollEnabled={true}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.imageContainer}>
            {image ? (
              <Image source={{ uri: image }} style={styles.image} />
            ) : (
              <Text style={styles.uploadText}>Upload an image</Text>
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
        <Picker
          style={styles.picker}
          itemStyle={styles.pickerItem}
          selectedValue={type}
          onValueChange={(itemValue) => setType(itemValue)}
        >
          <Picker.Item label="Recording a Sale" value="Sale" />
          <Picker.Item label="Recording an Expense" value="Expense" />
        </Picker>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setTitle(text)}
          value={title}
          placeholder="Title"
        />
        <TextInput
          style={styles.input}
          onChangeText={(text) => setDescription(text)}
          value={description}
          placeholder="Description"
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

        {modalVisible && (
          <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(false);
            }}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Text>{modalText}</Text>
                <Button title="Close" onPress={() => setModalVisible(false)} />
              </View>
            </View>
          </Modal>
        )}
      </View>
    </KeyboardAwareScrollView>
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
    marginBottom: 20,
  },
  titleText: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 50,
  },
  imageContainer: {
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
    fontSize: 15,
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
    lineHeight: 30,
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
  picker: {
    height: 110,
    marginBottom: 10,
    backgroundColor: "#eee",
    borderRadius: 10,
  },

  pickerItem: {
    height: 110,
  },
});
