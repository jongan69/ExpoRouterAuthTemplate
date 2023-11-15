import React from 'react';
import { TextInput, Text, View, Pressable, StyleSheet, Platform } from 'react-native';
import { Card } from 'react-native-elements';
import { useSession } from '../auth/ctx';
import { router } from 'expo-router';

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

  function TeamMate({ img, name, role }) {
    return (
      <div className="w-full bg-white rounded-lg sahdow-lg overflow-hidden flex flex-col md:flex-row">
        <div className="w-full md:w-2/5 h-80">
          <img
            className="object-center object-cover w-full h-full"
            src={img}
            alt="photo"
          />
        </div>
        <div className="w-full md:w-3/5 text-left p-6 md:p-4 space-y-2">
          <p className="text-xl text-gray-700 font-bold">{name}</p>
          <p className="text-base text-gray-400 font-normal">{role}</p>
          <p className="text-base leading-relaxed text-gray-500 font-normal">
            Lor ipsumtamet, consectetur adipiscing elit, sed do eiusmod te
          </p>
          <div className="flex justify-start space-x-2">
            {/* Social media icons */}
            {/* ... */}
          </div>
        </div>
      </div>
    );
  }

  if (isWeb) {
    const webSignIn = () => {
      alert('Static Login Here, Im not doing that lol');
    }
    return (
      <>
        {isWeb
          ? <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-4 py-12">
            <div className="text-center pb-12">
              <h2 className="text-base font-bold text-indigo-600">
                Welcome to Expo Router Web
              </h2>
              <h1 className="font-bold text-3xl md:text-4xl lg:text-5xl font-heading text-gray-900">
                Styled using Tailwind CSS
              </h1>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* First team member */}
              <TeamMate
                name="Jonathan Gan"
                role="Software Engineer"
                img="https://github.com/jongan69/jongan69/blob/main/profile.PNG?raw=true"
              />
            </div>
            {/* GitHub Link */}
            <div className="text-center pt-12">
              <a
                className="text-base font-bold text-indigo-600"
                href="https://github.com/evanbacon/expo-router-tailwind-demo"
              >
                View on GitHub
              </a>
            </div>
          </section>
          :
          <View style={styles.container}>
            <Card>
              <Card.Title>Expo Router Mobile Auth</Card.Title>
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
              <TouchableButton handler={() => webSignIn()} title="Login" />
            </Card>
          </View >
        }
      </>
    );

  } else {
    const { signIn, session }: any = useSession();
    React.useEffect(() => {
      if (session) router.push('/(app)/(tabs)')
    }, [session])
    return (
      <View style={styles.container}>
        {/* <GestureHandlerRootView style={styles.contentContainer}> */}
        {/* <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer} keyboardShouldPersistTaps="handled"> */}
        {/* Magic Auth Sign-in */}
        <Card>
          <Card.Title>Expo Router Auth</Card.Title>
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

