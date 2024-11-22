import React, { useState } from "react";
import { View, FlatList, StyleSheet, TouchableOpacity, TextInput, Alert } from "react-native";
import { RouteProp, useRoute } from "@react-navigation/native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

type CartItem = {
  _id: string;
  date: string;
  teacher: string;
  comment: string;
  course?: {
    classId: string; 
    description: string;
    price: string | number; 
  };
};

type CartScreenRouteProp = RouteProp<{ Cart: { cartItems: CartItem[] } }, "Cart">;

const CartScreen = () => {
  const route = useRoute<CartScreenRouteProp>();
  const { cartItems } = route.params;

  // State for email input
  const [email, setEmail] = useState<string>("");

  const totalPrice = cartItems.reduce((sum, item) => {
    if (item.course) {
      const price = item.course.price;
      let priceAsNumber: number;

      if (typeof price === 'string') {
        priceAsNumber = parseFloat(price);
      } else if (typeof price === 'number') {
        priceAsNumber = price;
      } else {
        return sum; 
      }
      return sum + priceAsNumber; 
    }
    return sum; 
  }, 0);

  const handleCheckout = async () => {
    // Extract class IDs from cartItems
    console.log("Cart Items:", cartItems)
    const classIds = cartItems.map(item => item._id).filter(Boolean); // Ensure classId exists
  
    console.log("Email:", email); // Debugging: log the email
    console.log("Class IDs:", classIds); // Debugging: log extracted class IDs
  
    if (!email || classIds.length === 0) {
      Alert.alert("Error", "Please enter a valid email and ensure there are classes in your cart.");
      return;
    }
  
    try {
      const response = await fetch("http://192.168.55.105:3000/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, classIds }),
      });
  
      if (!response.ok) {
        throw new Error("Failed to register");
      }
  
      const data = await response.json();
      Alert.alert("Success", data.message);
  
    } catch (error) {
      Alert.alert("Error");
    }
  };
  
  return (
    <ThemedView style={styles.container}>
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.cartItem}>
            <ThemedText style={{ color: "black" }}>{"Date: " + item.date}</ThemedText>
            <ThemedText style={{ color: "black" }}>{"Teacher: " + item.teacher}</ThemedText>
            <ThemedText style={{ color: "black" }}>{"Comment: " + item.comment}</ThemedText>
            {item.course && (
              <>
                <ThemedText style={{ color: "black" }}>{"Course: " + item.course.description}</ThemedText>
                <ThemedText style={{ color: "black" }}>{"Price: $" + item.course.price}</ThemedText>
              </>
            )}
          </View>
        )}
      />
      <View style={styles.totalContainer}>
        <ThemedText style={styles.totalText}>{"Total Price: $" + totalPrice}</ThemedText>
        
        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          value={email}
          onChangeText={setEmail} 
          keyboardType="email-address"
          autoCapitalize="none" 
        />

        <TouchableOpacity style={styles.checkoutButton} onPress={handleCheckout}>
          <ThemedText style={{ color: "white" }}>Checkout</ThemedText>
        </TouchableOpacity>
      </View>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#E5E5E5",
    flex: 1,
  },
  cartItem: {
    padding: 15,
    margin: 15,
    backgroundColor: "white",
    borderRadius: 10,
  },
  totalContainer: {
    padding: 15,
    alignItems: "center",
    borderTopWidth: 1,
    borderColor: "#ddd",
  },
  totalText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
  },
  checkoutButton: {
    backgroundColor: "#28A745",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
    width: '100%',
  },
});

export default CartScreen;