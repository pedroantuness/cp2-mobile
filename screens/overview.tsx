import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { StyleSheet, View, Text, FlatList, TouchableOpacity, Modal, Image, ActivityIndicator } from 'react-native';
import { RootStackParamList } from 'navigation';

const Overview = ({ navigation }) => {
  const [personagens, setPersonagens] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPersonagens = async () => {
      try {
        const response = await fetch(
          'https://valorant-api.com/v1/agents'
        );
        const json = await response.json();
        setPersonagens(json.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchPersonagens();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" />;
  }

  return (
    <FlatList
      data={personagens}
      keyExtractor={(item) => item.uuid.toString()}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={styles.persoContainer}
          onPress={() => navigation.navigate('Details', { persoDetails: item })}>
          {item.displayIcon ? <Image source={{ uri: item.displayIcon }} style={styles.icon} /> : null}
          <Text style={styles.name}>{item.displayName}</Text>
        </TouchableOpacity>
      )}
    />
  );
};

export default Overview;

const styles = StyleSheet.create({
  persoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  icon: {
    width: 50,
    height: 50,
    marginRight: 10,
    borderRadius: 25,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});