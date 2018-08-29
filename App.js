/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TouchableHighlight} from 'react-native';
import {AudioRecorder, AudioUtils} from 'react-native-audio';
import {
  Player,
  Recorder,
  MediaStates
} from 'react-native-audio-toolkit';



let audioPath = AudioUtils.DocumentDirectoryPath + '/test.aac';

AudioRecorder.prepareRecordingAtPath(audioPath, {
  SampleRate: 22050,
  Channels: 1,
  AudioQuality: "Low",
  AudioEncoding: "aac"
});

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {

  _onPress() {
    let filename = "filename.mp4";
    if (this.rec == null) {
      this.rec = new Recorder(filename).record();
    } else {
      this.rec.stop((err) => {
        new Player(filename)
        .play()
        .on('ended', () => {
          this.rec = null;
          this.setState({disabled: false});
        });
      });
    }
  }

  render() {
    this.rec = null;
    this.cutPosints = [];

    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>うえるかむ！やったね！いえーい！</Text>
        <Text style={styles.instructions}>To get started, edit App.js</Text>
        <Text style={styles.instructions}>{instructions}</Text>
        <TouchableHighlight onPress={() => this._onPress()}>
          <Text>
            Press me!
          </Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
