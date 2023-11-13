import React from 'react';
import { TextInput, Text, View, Pressable, StyleSheet } from 'react-native';
import { ScrollView, GestureHandlerRootView } from 'react-native-gesture-handler';
import { Card } from 'react-native-elements';
import * as Linking from 'expo-linking';
import { DeepLinkPage } from '@magic-sdk/react-native-expo';
import { useSession } from '../auth/ctx';


import CustomSwitch from '../components/CustomSwitch';
import { router } from 'expo-router';

export default function SignInScreen() {
  const { signIn, session }: any = useSession();
  const [email, onChangeEmail] = React.useState('');
  // const [phoneNumber, onChangePhoneNumber] = React.useState('');

  React.useEffect(() => {
    if(session) router.push('/(app)/(tabs)')
  },[session])

  const onSelectSwitch = (value: any) => {

  };

  const TouchableButton = (props: { handler: () => void, title: String }) => (
    <View style={styles.actionContainer}>
      <Pressable style={styles.button} onPress={() => props.handler()}>
        <Text style={styles.text}>{props.title}</Text>
      </Pressable>
    </View>
  )

  //   Magic Sign-in with SMS
  //   <Card>
  //     <Card.Title>Login with SMS</Card.Title>
  //     <View style={styles.loginContainer}>
  //       <View style={styles.emailContainer}>
  //         <Text>
  //           Number:
  //         </Text>
  //         <TextInput
  //           style={styles.TextInputContainer}
  //           onChangeText={number => onChangePhoneNumber(number)}
  //           value={phoneNumber}
  //         />
  //       </View>
  //     </View>
  //     <View style={styles.margin10}>
  //       <TouchableButton handler={() => smsLogin()} title="Login with SMS" />
  //     </View>
  //     <View style={styles.margin10}>
  //       <TouchableButton handler={() => updateSMS()} title="Update SMS" />
  //     </View>
  //   </Card>
  //   {/* Google Sign in */}
  //   <Card>
  //     <Card.Title>Google Login</Card.Title>
  //     <TouchableButton handler={() => magicGoogleSignIn()} title="Login" />
  //   </Card>

  //   {/* Apple Sign in */}
  //   <Card>
  //     <Card.Title>Apple Login</Card.Title>
  //     <TouchableButton handler={() => magicAppleSignIn()} title="Login" />
  //   </Card>
  //   {/* Is Logged In */}
  //   <Card>
  //     <Card.Title>Is Logged In</Card.Title>
  //     <TouchableButton handler={() => isLoggedIn()} title="isLoggedIn" />
  //   </Card>
  //   {/* metaData */}
  //   <Card>
  //     <Card.Title>Metadata (getInfo)</Card.Title>
  //     <TouchableButton handler={() => getInfo()} title="metadata" />
  //   </Card>
  //   {/* Logout */}
  //   <Card>
  //     <Card.Title>Logout</Card.Title>
  //     <TouchableButton handler={() => logout()} title="Logout" />
  //   </Card>
  //   <Card>
  //     <Card.Title>Recover Account</Card.Title>
  //     <View style={styles.emailContainer}>
  //       <Text>
  //         Email:
  //       </Text>
  //       <TextInput
  //         style={styles.TextInputContainer}
  //         onChangeText={text => onChangerecoveryEmail(text)}
  //         value={recoveryEmail}
  //       />
  //     </View>
  //     <View style={styles.margin10}>
  //       <TouchableButton handler={() => recoverAccount()} title="Recover Account" />
  //     </View>
  //     <View style={styles.margin10}>
  //       <TouchableButton handler={() => showSettings()} title="Show Settings" />
  //     </View>
  //   </Card>
  // </Card>

  // {/* Magic Connect Sign-in */}
  // <Card>
  //   <Card.Title>Magic Connect</Card.Title>
  //   <TouchableButton handler={() => showMCUserInterface()} title="MC Login" />
  // </Card>



  return (
    <View style={styles.container}>
      {/* <GestureHandlerRootView style={styles.contentContainer}> */}
      {/* <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer} keyboardShouldPersistTaps="handled"> */}
      {/* Magic Auth Sign-in */}
      <Card>
        <Card.Title>Expo Router Magic Auth</Card.Title>
        {/* Email Login */}
        <Card>
          <Card.Title>Email Login</Card.Title>
          <View style={styles.loginContainer}>
            <View style={styles.emailContainer}>
              <Text>
                Email: {' '}
              </Text>
              <TextInput
                style={styles.TextInputContainer}
                placeholder='demo@gmail.com'
                onChangeText={text => onChangeEmail(text)}
                value={email}
              />
            </View>

          </View>

        </Card>
        {/* <CustomSwitch
              selectionMode={2}
              option1="Email"
              option2="Phone"
              onSelectSwitch={onSelectSwitch}
            /> */}
        <TouchableButton handler={() => signIn(email)} title="Login" />
      </Card>
      {/* </ScrollView > */}
      {/* </GestureHandlerRootView> */}
    </View >
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  // contentContainer: {
  //   paddingTop: 30,
  //   justifyContent: 'center'
  // },
  loginContainer: {
    alignItems: 'flex-start',
    marginTop: 10,
    // paddingHorizontal: 10,
    padding: 20,
    justifyContent: 'center'
  },
  emailContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',

  },
  TextInputContainer: {
    borderColor: 'black',
    borderWidth: 1,
    width: '80%',
    height: 30,
    paddingHorizontal: 10
  },
  actionContainer: {
    margin: 30,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center'
  },

  button: {
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 7,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'black',
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
});


// import { router } from 'expo-router';
// import { StyleSheet } from 'react-native';

// import { Text, View } from '../components/Themed';
// import { useSession } from '../auth/ctx';

// export default function SignIn() {
//   const { signIn }: any = useSession();
//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       <Text
//         style={styles.title}
//         onPress={() => {
//           signIn();
//           // Navigate after signing in. You may want to tweak this to ensure sign-in is
//           // successful before navigating.
//           router.replace('/(app)/(tabs)');
//         }}
//       >Sign in</Text>
//     </View>
//   );
// }

