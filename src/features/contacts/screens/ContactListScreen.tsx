import { View, Text, FlatList, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { MyContact } from './CallLogScreen';
import { getUsersInApp, getUsersNotInApp } from '../services/contacts.storage';
import Spinner from 'react-native-loading-spinner-overlay';
import ContactCard from '../components/ContactCard';

const ContactListScreen = () => {
  const [usersInApp, setUsersInApp] = useState<MyContact[] | null>(null);
  const [usersNotInApp, setUsersNotInApp] = useState<MyContact[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      setUsersInApp(getUsersInApp());
      setUsersNotInApp(getUsersNotInApp());
    } catch (error) {
      console.error('Error fetching contacts in ContactList Screen', error);
    }finally{
      setLoading(false);
    }
  }, []);
  
  if(loading) {
    return <Spinner
      visible={loading}
      textContent='Loading contacts'
    />
  }

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Contacts Using the App</Text>
      <FlatList
        data={usersInApp || []}
        renderItem={({ item }) => <ContactCard item={item} />}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={<Text style={styles.empty}>No contacts found in app</Text>}
      />

      <Text style={styles.sectionTitle}>Other Contacts</Text>
      <FlatList
        data={usersNotInApp || []}
        renderItem={({ item }) => <ContactCard item={item} />}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={<Text style={styles.empty}>No contacts outside the app</Text>}
      />
    </View>
  );
};

export default ContactListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 12,
    color: '#333',
  },
  empty: {
    fontStyle: 'italic',
    color: '#888',
    marginBottom: 20,
  },
});
