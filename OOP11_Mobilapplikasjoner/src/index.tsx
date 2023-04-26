import * as React from 'react';
import { Component } from 'react-simplified';
import { View, Text, TextInput } from 'react-native';
import moji from 'moji-translate';

export class App extends Component {
  name = 'hello world';
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <Text>{moji.translate(this.name)}</Text>
        <TextInput
          style={{ borderWidth: 1 }}
          value={this.name}
          onChangeText={(text) => (this.name = text)}
        />
      </View>
    );
  }
}
