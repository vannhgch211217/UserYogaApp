import React, { useState, useEffect } from 'react';
import { FlatList, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import axios from 'axios';
import moment from 'moment';
import { RootStackParamList } from '@/app/(tabs)/index';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

type Props = {
  navigation: HomeScreenNavigationProp;
};

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const [classes, setClasses] = useState<any[]>([]);
  const [courses, setCourses] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [cart, setCart] = useState<any[]>([]);

  useEffect(() => {
    fetchClasses();
    fetchCourses();
  }, []);

  const fetchClasses = async () => {
    try {
      const response = await axios.get("http://192.168.55.108:3000/api/allClasses");
      setClasses(response.data);
    } catch (error) {
      console.error("Error fetching classes:", error);
    }
  };

  const fetchCourses = async () => {
    try {
      const response = await axios.get("http://192.168.55.108:3000/api/allCourses");
      setCourses(response.data);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  const getCourseDetails = (courseId: number) => {
    return courses.find((c) => c.id === courseId) || null;
  };

  const isFutureClass = (classItem: any) => {
    const classDate = moment(classItem.date, "DD/MM/YYYY");
    const now = moment();
    const course = getCourseDetails(classItem.courseId);
    if (course) {
      const courseTime = moment(course.time, "HH:mm");
      classDate.hour(courseTime.hour()).minute(courseTime.minute());
    }
    return classDate.isAfter(now);
  };

  const handleSearch = (text: string) => {
    setSearchQuery(text);
  };

  const filterClasses = () => {
    return classes.filter((classItem) => {
      const dateMatch = classItem.date.includes(searchQuery);
      const course = getCourseDetails(classItem.courseId);
      const timeMatch = course && course.time.includes(searchQuery);
      return isFutureClass(classItem) && (dateMatch || timeMatch);
    });
  };

  const addToCart = (classItem: any) => {
    const course = getCourseDetails(classItem.courseId);
    if (course) {
      const itemWithCourseDetails = { ...classItem, course };
      setCart((prevCart) => [...prevCart, itemWithCourseDetails]);
    }
  };

  const navigateToCart = () => {
    navigation.navigate('Cart', { cartItems: cart });
  };

  const navigateToMyClass = () => {
    navigation.navigate('MyClass');
  };

  return (
    <ThemedView style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search by date or time"
        placeholderTextColor="#888"
        value={searchQuery}
        onChangeText={handleSearch}
      />
      <FlatList
        data={filterClasses()}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => {
          const course = getCourseDetails(item.courseId);
          return (
            <ThemedView style={styles.reviewItem}>
              <ThemedText style={{ color: "black" }}>{"Date: " + item.date}</ThemedText>
              <ThemedText style={{ color: "black" }}>{"Teacher: " + item.teacher}</ThemedText>
              <ThemedText style={{ color: "black" }}>{"Comment: " + item.comment}</ThemedText>
              {course && (
                <>
                  <ThemedText style={{ color: "black" }}>{"Course Description: " + course.description}</ThemedText>
                  <ThemedText style={{ color: "black" }}>{"Day: " + course.day}</ThemedText>
                  <ThemedText style={{ color: "black" }}>{"Time: " + course.time}</ThemedText>
                  <ThemedText style={{ color: "black" }}>{"Capacity: " + course.capacity}</ThemedText>
                  <ThemedText style={{ color: "black" }}>{"Duration: " + course.duration}</ThemedText>
                  <ThemedText style={{ color: "black" }}>{"Price: " + course.price}</ThemedText>
                  <ThemedText style={{ color: "black" }}>{"Type: " + course.type}</ThemedText>
                </>
              )}
              <TouchableOpacity onPress={() => addToCart(item)} style={styles.addButton}>
                <ThemedText style={{ color: "white" }}>Add to Cart</ThemedText>
              </TouchableOpacity>
            </ThemedView>
          );
        }}
      />
      <TouchableOpacity onPress={navigateToCart} style={styles.cartButton}>
        <ThemedText style={{ color: "white" }}>Go to Cart</ThemedText>
      </TouchableOpacity>
      <TouchableOpacity onPress={navigateToMyClass} style={styles.cartButton}>
        <ThemedText style={{ color: "white" }}>Go to My Class</ThemedText>
      </TouchableOpacity>
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
  addButton: {
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: "center",
  },
  cartButton: {
    backgroundColor: "#28A745",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    margin: 15,
  },
});

export default HomeScreen;
