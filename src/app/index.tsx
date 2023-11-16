import React from 'react';
import { StyleSheet, Platform, SafeAreaView, TouchableOpacity } from 'react-native';
// import { Card } from '@ui-kitten/components';
import { Text, View } from '../components/Themed'
import { useSession } from '../auth/ctx';
import { Stack, router } from 'expo-router';
import Header from '../components/Header.web';
import { useMagicSession } from '../auth/magicSdk';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import LoginSVG from "../../assets/images/login.svg";
import AppleSVG from "../../assets/images/apple.svg";
import GoogleSVG from "../../assets/images/google.svg";
import FacebookSVG from "../../assets/images/facebook.svg";
import CustomButton from '../components/CustomButton';
import InputField from '../components/InputField';
import CustomSwitch from '../components/CustomSwitch';
import { Card } from '@ui-kitten/components';

import * as appData from '../../app.json'

export default function SignInScreen() {
  const isWeb = Platform.OS === 'web'
  const [email, onChangeEmail] = React.useState('');
  const [phoneNumber, onChangePhoneNumber] = React.useState('');

  const onSelectSwitch = (value: any) => {

  };

  if (isWeb) {
    const { signIn, session }: any = useSession();
    React.useEffect(() => {
      if (session) router.replace('/(app)/(web)/');
    }, [session])
    return (
      <>
        <section className="max-w-6xl px-4 py-12 mx-auto sm:px-6 lg:px-4">
          <Header
            title="Welcome to Expo Router Web"
            subTitle="Styled using Tailwind CSS"
          />
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          </div>
        </section>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Stack.Screen
            options={{
              // https://reactnavigation.org/docs/headers#setting-the-header-title
              title: 'Welcome',
              // https://reactnavigation.org/docs/headers#adjusting-header-styles
              headerStyle: { backgroundColor: '#f4511e' },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
          />
          <Text>Welcome to the {Platform.OS}!</Text>
          {Platform.OS === 'web' && <a onClick={() => {
            signIn(),
              router.push('/(app)/(web)/')
          }}>
            Click here to sign in
          </a>}
        </View>
        <div className="pt-12 text-center">
          <a
            className="text-base font-bold text-indigo-600"
            href={appData.expo.githubUrl}
          >
            View on GitHub
          </a>
        </div>
      </>
    );
  } else {
    const { signIn, session }: any = useMagicSession();
    React.useEffect(() => {
      if (session) router.replace('/(app)/(mobile)');
    }, [session])
    return (

      <SafeAreaView
        style={{
          flex: 1,
          justifyContent: "center",
        }}
      >
        <KeyboardAwareScrollView>
          <View style={styles.container}>
            <View style={{ alignItems: "center" }}>
              <LoginSVG
                height={300}
                width={300}
                style={{ transform: [{ rotate: "-5deg" }] }}
              />
              <Text
                style={{
                  fontFamily: "Roboto-Medium",
                  fontSize: 28,
                  fontWeight: "500",
                  marginBottom: 30,
                }}
              >
                Login
              </Text>
            </View>
            {/* Magic Auth Email Sign-in */}
            <Card style={styles.card}>
              {/* Email Login */}
              <View style={{ paddingHorizontal: 25 }}>
                <InputField
                  label={"Email ID"}
                  icon={<MaterialIcons
                    name="alternate-email"
                    size={20}
                    color="#666"
                    style={{ marginRight: 5 }} />}
                  keyboardType="email-address"
                  value={email}
                  inputType={undefined}
                  fieldButtonLabel={undefined}
                  fieldButtonFunction={undefined}
                  onChangeText={text => onChangeEmail(text)}
                />
                <CustomSwitch
                  selectionMode={1}
                  option1="Email"
                  option2="Phone"
                  onSelectSwitch={onSelectSwitch}
                />

                {/* <InputField
          label={error ? 'Error Please Try again' : 'Wallet Address'}
          icon={<Ionicons
            name="wallet"
            size={20}
            color={colors.primary}
            style={{ marginRight: 5 }} />}
          value={address}
          onChangeText={(value: string) => setAddress(value)}
          inputType="wallet"
          keyboardType={undefined} /> */}

                <CustomButton
                  label={"Login"}
                  onPress={() => {
                    signIn(email)
                  }}
                />

                <Text
                  style={{
                    textAlign: "center",
                    marginBottom: 30,
                  }}
                >
                  Or, login with ...
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginBottom: 30,
                  }}
                >
                  <TouchableOpacity
                    // onPress={() => Login("google")}
                    style={{
                      borderWidth: 2,
                      borderRadius: 10,
                      paddingHorizontal: 30,
                      paddingVertical: 10,
                    }}
                  >
                    <GoogleSVG height={24} width={24} />
                  </TouchableOpacity>
                  <TouchableOpacity
                    // onPress={() => Login("apple")}
                    style={{
                      borderWidth: 2,
                      borderRadius: 10,
                      paddingHorizontal: 30,
                      paddingVertical: 10,
                    }}
                  >
                    <AppleSVG height={24} width={24} />
                  </TouchableOpacity>
                  <TouchableOpacity
                    // onPress={() => Login("facebook")}
                    style={{
                      borderWidth: 2,
                      borderRadius: 10,
                      paddingHorizontal: 30,
                      paddingVertical: 10,
                    }}
                  >
                    <FacebookSVG height={24} width={24} />
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    marginBottom: 30,
                  }}
                >
                  {/* <Text 
          style={{
            color: colors.text,
          }}
          >
            New to the app?
            </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={{ color: colors.primary, fontWeight: '700' }}> Register </Text>
          </TouchableOpacity> */}
                </View>
              </View>
            </Card>
          </View >
        </KeyboardAwareScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  topContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  icon: {
    width: 32,
    height: 32,
  },
  card: {
    margin: 2,
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  footerControl: {
    marginHorizontal: 2,
  },
  loginContainer: {
    alignItems: 'flex-start',
    marginTop: 10,
    padding: 20,
    justifyContent: 'center',
  },
  emailContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
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

