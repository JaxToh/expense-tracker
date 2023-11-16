import React, { useState, useContext } from "react";
import { AppContext } from "../AppContext";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  TouchableOpacity,
  ScrollView,
  Modal,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function SalesScreen() {
  const { state, dispatch } = useContext(AppContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const salesEntries = state.salesEntries;

  const displayImage = (image) => {
    setSelectedImage(image);
    setModalVisible(true);
  };

  const deleteSalesEntry = (id) => {
    dispatch({
      type: "DELETE_SALES_ENTRY",
      payload: { id },
    });
  };

  return (
    <KeyboardAwareScrollView
      resetScrollToCoords={{ x: 0, y: 0 }}
      scrollEnabled={true}
    >
      <View style={styles.entryContainer}>
        {salesEntries.length > 0 ? (
          salesEntries.map((entry) => (
            <TouchableOpacity
              key={entry.id}
              style={styles.entry}
              onPress={() => displayImage(entry.image)}
            >
              <Text>{`Title: ${entry.title}`}</Text>
              <Text>{`Description: ${entry.description}`}</Text>
              <Text>{`Amount: ${entry.amount}`}</Text>
              <TouchableOpacity style={styles.button} onPress={() => deleteSalesEntry(entry.id)}>
                <Text style={styles.buttonText}>Delete</Text>
              </TouchableOpacity>
            </TouchableOpacity>
          ))
        ) : (
          <View style={styles.noRecordsContainer}>
            <Text style={styles.noRecordsText}>No records found</Text>
          </View>
        )}
      </View>
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
