import React from 'react';
import { TextInput, Text, View, Pressable, StyleSheet, Platform } from 'react-native';
import { Card } from 'react-native-elements';
import { useSession } from '../auth/ctx';
import { Stack, router } from 'expo-router';
import Header from '../components/Header.web';
import { useMagicSession } from '../auth/magicSdk';

export default function SignInScreen() {
  const isWeb = Platform.OS === 'web'
  const [email, onChangeEmail] = React.useState('');
  // const [phoneNumber, onChangePhoneNumber] = React.useState('');

  // const onSelectSwitch = (value: any) => {

  // };

  const TouchableButton = (props: { handler: () => void, title: String }) => (
    <View style={styles.actionContainer}>
      <Pressable style={styles.button} onPress={() => props.handler()}>
        <Text style={styles.text}>{props.title}</Text>
      </Pressable>
    </View>
  )

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
            {/* First team member */}
            {/* <Banner
              title="Jonathan Gan"
              subtitle="Software Engineer"
              description="Lor ipsumtamet, consectetur adipiscing elit, sed do eiusmod te"
              img="https://github.com/jongan69/jongan69/blob/main/profile.PNG?raw=true"
            /> */}
          </div>
          {/* GitHub Link */}

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
              // https://reactnavigation.org/docs/headers#replacing-the-title-with-a-custom-component
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
            href="https://github.com/jongan69/ExpoRouterAuthTemplate"
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
      <View style={styles.container}>
        {/* <GestureHandlerRootView style={styles.contentContainer}> */}
        {/* <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer} keyboardShouldPersistTaps="handled"> */}
        {/* Magic Auth Sign-in */}
        <Card>
          <Card.Title>Welcome to the Mobile App</Card.Title>
          {/* Email Login */}

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
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  loginContainer: {
    alignItems: 'flex-start',
    marginTop: 10,
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

