import React, { useState, useContext } from "react";
import { AppContext } from "../AppContext";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  TouchableOpacity,
  Modal,
} from "react-native";

export default function SalesScreen() {
  const { state, dispatch } = useContext(AppContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [entryToDelete, setEntryToDelete] = useState(null);
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

  const confirmDelete = (id) => {
    setEntryToDelete(id);
    setModalVisible(true);
  };

  const proceedWithDelete = () => {
    if (entryToDelete) {
      deleteSalesEntry(entryToDelete);
      setEntryToDelete(null);
      setModalVisible(false);
    }
  };

  const cancelDelete = () => {
    setEntryToDelete(null);
    setModalVisible(false);
  };

  return (
    <KeyboardAwareScrollView
      resetScrollToCoords={{ x: 0, y: 0 }}
      scrollEnabled={true}
    >
      <Text style={styles.titleText}>Tap on each entry to view an image</Text>
      <View style={styles.entryContainer}>
        {salesEntries.length > 0 ? (
          salesEntries.map((entry, index) => (
            <TouchableOpacity
              key={entry.id}
              style={styles.entry}
              onPress={() => displayImage(entry.image)}
            >
              <View style={styles.serialNumberContainer}>
                <Text style={styles.serialNumber}>{`${index + 1}. `}</Text>
              </View>
              <View style={styles.entryTextContainer}>
                <Text style={styles.entryText}>{`Title: ${entry.title}`}</Text>
                <Text
                  style={styles.entryText}
                >{`Description: ${entry.description}`}</Text>
                <Text style={styles.entryText}>{`Amount: $${Number(
                  entry.amount
                ).toFixed(2)}`}</Text>
              </View>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => confirmDelete(entry.id)}
              >
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
      {entryToDelete && (
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={cancelDelete}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text>Confirm delete?</Text>
              <Button title="Delete" onPress={proceedWithDelete} />
              <Button title="Cancel" onPress={cancelDelete} />
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
    fontSize: 12,
    color: "grey",
    marginTop: 10,
    marginBottom: -10,
    alignSelf: "center",
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
    marginLeft: 10,
  },
  entry: {
    marginBottom: 1,
    padding: 15,
    backgroundColor: "#f9f9f9",
    borderRadius: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  entryTextContainer: {
    flex: 1,
    paddingRight: 10,
    flexDirection: "column",
  },
  deleteButton: {
    backgroundColor: "#4EB151",
    padding: 10,
    borderRadius: 5,
  },
  noRecordsContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 20,
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
  serialNumberContainer: {
    marginTop: -35,
  },
  serialNumber: {
    fontSize: 16,
  },
});
