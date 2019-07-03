import React, { Component } from "react"
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  TextInput,
  Button
} from "react-native"
import firebase from "react-native-firebase"

class Main extends React.Component {
  state = { currentUser: null }
  render() {
    const { currentUser } = this.state
    return (
      <View style={styles.container}>
        <Text>Hi {currentUser && currentUser.email}!</Text>
      </View>
    )
  }
}

class Loading extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Loading</Text>
        <ActivityIndicator size="large" />
      </View>
    )
  }
}

class SignUp extends React.Component {
  state = { email: "", password: "", errorMessage: null }
  handleSignUp = () => {
    // TODO: Firebase stuff...
    console.log("handleSignUp")
  }
  render() {
    return (
      <View style={styles.container}>
        <Text>Sign Up</Text>
        {this.state.errorMessage && (
          <Text style={{ color: "red" }}>{this.state.errorMessage}</Text>
        )}
        <TextInput
          placeholder="Email"
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={email => this.setState({ email })}
          value={this.state.email}
        />
        <TextInput
          secureTextEntry
          placeholder="Password"
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={password => this.setState({ password })}
          value={this.state.password}
        />
        <Button title="Sign Up" onPress={this.handleSignUp} />
        <Button
          title="Already have an account? Login"
          onPress={() => this.props.navigation.navigate("Login")}
        />
      </View>
    )
  }
}

class Login extends React.Component {
  state = { email: "", password: "", errorMessage: null }
  handleLogin = () => {
    // TODO: Firebase stuff...
    console.log("handleLogin")
  }
  render() {
    return (
      <View style={styles.container}>
        <Text>Login</Text>
        {this.state.errorMessage && (
          <Text style={{ color: "red" }}>{this.state.errorMessage}</Text>
        )}
        <TextInput
          style={styles.textInput}
          autoCapitalize="none"
          placeholder="Email"
          onChangeText={email => this.setState({ email })}
          value={this.state.email}
        />
        <TextInput
          secureTextEntry
          style={styles.textInput}
          autoCapitalize="none"
          placeholder="Password"
          onChangeText={password => this.setState({ password })}
          value={this.state.password}
        />
        <Button title="Login" onPress={this.handleLogin} />
        <Button
          title="Don't have an account? Sign Up"
          onPress={() => this.props.navigation.navigate("SignUp")}
        />
      </View>
    )
  }
}

export default class App extends Component {
  state = {
    route: Loading
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      const route = user ? Main : SignUp
      this.setState({ route })
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Firebase, go</Text>
        <this.state.route />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  textInput: {
    height: 40,
    width: "90%",
    borderColor: "gray",
    borderWidth: 1,
    marginTop: 8
  }
})
