import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "../AppContext";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
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

export default function HomeScreen() {
  const { state } = useContext(AppContext);

  const totalSales = state.totalSales.toFixed(2);
  const totalExpenses = state.totalExpenses.toFixed(2);
  const cashFlow = (totalSales - totalExpenses).toFixed(2);

  return (
    <KeyboardAwareScrollView
      resetScrollToCoords={{ x: 0, y: 0 }}
      scrollEnabled={true}
    >
      <View style={styles.imageContainer}>
        <Text style={styles.uploadText}>Graph</Text>
      </View>
      <View style={styles.container}>
        <View style={styles.row}>
          <Text style={styles.label}>Total Sales:</Text>
          <Text style={styles.value}>${totalSales}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Total Expenses:</Text>
          <Text style={styles.value}>${totalExpenses}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Cashflow:</Text>
          <Text
            style={[
              styles.value,
              cashFlow < 0 ? styles.negativeCashFlow : styles.positiveCashFlow,
            ]}
          >
            ${cashFlow}
          </Text>
        </View>
      </View>
      <View style={styles.imageContainer}>
        <Text style={styles.uploadText}>
          This section can be used to show rows of month names, each with an export CSV / download
          button, when we start to capture date of entry creation.
        </Text>
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
    marginBottom: 40,
  },
  titleText: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 50,
  },
  imageContainer: {
    marginTop: 20,
    width: 400,
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
    padding: 45,
    textAlign: "justify"
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
  totalText: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
  },
  cashFlowText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  negativeCashFlow: {
    color: "red",
  },
  positiveCashFlow: {
    color: "darkgreen",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "left",
  },
  value: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "right",
  },
});
