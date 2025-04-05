import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useAuth } from '../../../app/context/AuthContext';

const GoogleLogin: React.FC = () => {
  const {loginWithGoogle} = useAuth();

  return (
    <View style={styles.container}>
        <TouchableOpacity style={styles.signInButton} onPress={loginWithGoogle}>
          <Image
            source={require('../../../assets/google.png')}
            style={styles.googleLogo}
          />
          <Text style={styles.buttonText}>Sign in with Google</Text>
        </TouchableOpacity>
    </View>
  );
};

export default GoogleLogin;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  signInButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 30,
    elevation: 3,
  },
  signOutButton: {
    backgroundColor: '#DB4437',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 30,
    elevation: 3,
    marginTop: 20,
  },
  buttonText: {
    color: '#000',
    fontWeight: '600',
    marginLeft: 10,
    fontSize: 16,
  },
  googleLogo: {
    width: 30,
    height: 30,
  },
  userContainer: {
    alignItems: 'center',
  },
  userText: {
    fontSize: 18,
    marginBottom: 20,
  },
});
