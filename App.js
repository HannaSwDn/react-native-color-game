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
      difficulty: 1000
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
      Alert.alert(`You clicked on the wrong color!! You got ${ this.state.score } points.\n\nA highscore board will soon be added to the game.`);
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
      Alert.alert(`You were too slow!! You got ${ this.state.score } points.\n\nA highscore board will soon be added to the game.`);
      this.resetGame();
    }
    else if (lvl !== this.state.score) { clearTimeout(timer) }
  }

  resetGame() {
    this.setState({
      score: 0
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.bar} />

        <Text style={styles.instructions}>
          Click on the correct color within 1 second to score a point.
        </Text>

        <Text style={styles.color}>
          {this.state.currentColor.toUpperCase()}
        </Text>

        <View style={styles.colors}>
          <TouchableOpacity onPress={() => this.userClick(this.state.x)} style={[styles.x, { backgroundColor: this.state.x }]} />
          <TouchableOpacity onPress={() => this.userClick(this.state.y)} style={[styles.y, { backgroundColor: this.state.y }]} />
        </View>

        <Text style={styles.color}>
          { `POINTS: ${ this.state.score }` }
        </Text>
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
    height: '100%',
    width: '45%'
  },
  y: {
    height: '100%',
    width: '45%'
  },
  color: {
    margin: 20,
    fontSize: 30,
    fontWeight: '900'
  },
  colors: {
    height: 300,
    flexDirection: 'row'

  },
  bar: {
    height: 20,
    backgroundColor: 'red'
  },
  instructions: {
    fontSize: 20,
    textAlign: 'center',
    padding: 15
  }
});
