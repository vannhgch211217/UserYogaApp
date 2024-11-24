import React, { useState, useEffect } from 'react';
import { FlatList, StyleSheet, TextInput } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import axios from 'axios';

const MyClassScreen = () => {
  const [myClasses, setMyClasses] = useState<any[]>([]);
  const [classes, setClasses] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    fetchMyClasses();
    fetchClasses();
  }, []);

  const fetchMyClasses = async () => {
    try {
      const response = await axios.get("http://192.168.55.103:3000/api/allMyClass");
      setMyClasses(response.data);
    } catch (error) {
      console.error("Error fetching my classes:", error);
    }
  };

  const fetchClasses = async () => {
    try {
      const response = await axios.get("http://192.168.55.103:3000/api/allClasses"); 
      setClasses(response.data);
    } catch (error) {
      console.error("Error fetching classes:", error); 
    }
  };

  const handleSearch = (text: string) => {
    setSearchQuery(text);
  };

  const filterClasses = () => {
    return myClasses.filter((classItem) => {
      return (
        classItem.email && 
        classItem.email.toLowerCase() === searchQuery.toLowerCase() 
      );
    });
  };

  const getClassDetails = (classId: string): any => { 
    return classes.find((c) => c._id === classId) || null; 
  };

  return (
    <ThemedView style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search by email"
        placeholderTextColor="#888"
        value={searchQuery}
        onChangeText={handleSearch}
      />
      <FlatList
        data={filterClasses()}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => {
          return item.classIds.map((classId: string) => {
            const classDetails = getClassDetails(classId);
            return classDetails ? (
              <ThemedView key={classId} style={styles.reviewItem}>
                <ThemedText style={{ color: "black" }}>
                  {"Date: " + (classDetails.date || "N/A")}
                </ThemedText>
                <ThemedText style={{ color: "black" }}>
                  {"Teacher: " + (classDetails.teacher || "N/A")}
                </ThemedText>
              </ThemedView>
            ) : null; 
          });
        }}
      />
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#E5E5E5",
    flex: 1,
  },
  reviewItem: {
    justifyContent: "space-between",
    padding: 15,
    margin: 15,
    backgroundColor: "white",
    borderRadius: 10,
  },
  searchInput: {
    height: 40,
    margin: 15,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: "white",
  },
});

export default MyClassScreen;
