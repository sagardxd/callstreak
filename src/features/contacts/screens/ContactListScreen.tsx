import { View, Text, FlatList, StyleSheet, ScrollView, SectionList } from 'react-native';
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

  const sections = [
    {
      title: 'Contacts Using the App',
      data: usersInApp || [],
    },
    {
      title: 'Other Contacts',
      data: usersNotInApp || [],
    },
  ];
  
  if(loading) {
    return <Spinner
      visible={loading}
      textContent='Loading contacts'
    />
  }

  return (
    <SectionList
      sections={sections}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <ContactCard item={item} />}
      renderSectionHeader={({ section }) => (
        <Text style={styles.sectionTitle}>{section.title}</Text>
      )}
      ListEmptyComponent={<Text style={styles.empty}>No contacts found</Text>}
      contentContainerStyle={styles.container}
    />
  )
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
