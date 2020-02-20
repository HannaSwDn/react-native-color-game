import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      score: 0,
      x: 'blue',
      y: 'yellow',
      currentColor: 'blue',
      timerIsOn: true,
      difficulty: 800
    }
  }

  userClick(color) {
    if (color == this.state.currentColor) {
      this.setState({
        score: this.state.score + 1
      });

      this.generateColors();
      this.startTimer()

    } else {
      this.resetGame();
    }
  }

  generateColors() {
    let colors = ['red', 'blue', 'green', 'purple', 'gray', 'yellow']

    let x = colors[Math.floor(Math.random() * colors.length)];
    let y = colors[Math.floor(Math.random() * colors.length)];

    if (x === y) {
      this.generateColors()
    } else {
      this.setState({ x: x, y: y })
      let num = Math.floor(Math.random() * 2)
      if (num === 0) { this.setState({ currentColor: x }) }
      else if (num === 1) {
        this.setState({ currentColor: y })
      }
    }
  }

  startTimer() {
    let lvl = this.state.score + 1;
    let timer = setTimeout(() => { this.endTimer(timer, lvl) }, this.state.difficulty);
  }

  endTimer(timer, lvl) {
    if (lvl === this.state.score) {
      this.resetGame();
    }
    else if (lvl !== this.state.score) { clearTimeout(timer) }
  }

  resetGame() {
    Alert.alert('You lost, you now have 0 points!');

    this.setState({
      score: 0
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.color}>Spel gjort av Hanna.</Text>
        <Text style={styles.color}>
          { `Your points: ${ this.state.score }` }
        </Text>
        <Text style={styles.color}>
          {this.state.currentColor}
        </Text>
        <TouchableOpacity onPress={() => this.userClick(this.state.x)} style={[styles.x, { backgroundColor: this.state.x }]} />
        <TouchableOpacity onPress={() => this.userClick(this.state.y)} style={[styles.y, { backgroundColor: this.state.y }]} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  x: {
    height: 180,
    width: '100%'
  },
  y: {
    height: 180,
    width: '100%'
  },
  color: {
    margin: 20
  }
});
