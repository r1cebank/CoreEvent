import React, { Component } from 'react';
import {
  Text,
  View
} from 'react-native';

import Camera from 'react-native-camera';
import { Scene, Router } from 'react-native-router-flux';

import styles from './resources/styles';

class QRScannerView extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    async componentWillMount() {
        const authorization = await Camera.checkDeviceAuthorizationStatus();
        this.setState({ authorization });
    }
    readBarcode(code) {
        console.log(code);
    }
    render() {
        return (
            <View style={styles.container}>
                <Camera onBarCodeRead={this.readBarcode} style={styles.camera}>
                    <View style={styles.rectangleContainer}>
                      <View style={styles.rectangle} />
                    </View>
              </Camera>
            </View>
        );
    }
}

module.exports = QRScannerView;
