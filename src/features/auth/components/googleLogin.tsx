import React, { useEffect, useState } from 'react';
import { View, Text, Button, Alert, StyleSheet } from 'react-native';
import { GoogleSignin, GoogleSigninButton, statusCodes } from '@react-native-google-signin/google-signin';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';

const GoogleLogin: React.FC = () => {
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: '273704106291-emik2jk8kaavk8k18q4quoguokp6br9p.apps.googleusercontent.com', // Replace with your Firebase Web Client ID
      offlineAccess: true,
    });
  }, []);

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(setUser);
    return subscriber; // Unsubscribe on unmount
  }, []);

  const signInWithGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
      const { data } = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(data!.idToken);
      await auth().signInWithCredential(googleCredential);
    } catch (error: any) {
      let message = 'Error signing in';
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        message = 'User cancelled the login flow';
      } else if (error.code === statusCodes.IN_PROGRESS) {
        message = 'Sign in is already in progress';
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        message = 'Play services not available or outdated';
      }
      Alert.alert(message, error.message);
    }
  };

  const signOut = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      await auth().signOut();
    } catch (error: any) {
      Alert.alert('Error signing out', error.message);
    }
  };

  return (
    <View style={styles.container}>
      {user ? (
        <View style={styles.userContainer}>
          <Text style={styles.userText}>Welcome, {user.displayName}</Text>
          <Button title="Sign Out" onPress={signOut} />
        </View>
      ) : (
        <GoogleSigninButton
          style={styles.signInButton}
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Dark}
          onPress={signInWithGoogle}
        />
      )}
    </View>
  );
};

export default GoogleLogin;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  signInButton: { width: 230, height: 48 },
  userContainer: { alignItems: 'center' },
  userText: { fontSize: 18, marginBottom: 20 },
});