import { connect } from 'react-redux';
import React, { Component } from 'react';
import { View } from 'react-native';

import Camera from 'react-native-camera';
import { Scene, Router, Actions } from 'react-native-router-flux';

import { Languages } from '../../global/globalIncludes';

import styles from './resources/styles';

class QRScannerView extends Component {
    static propTypes = {
        locale: React.PropTypes.string
    }
    constructor(props) {
        super(props);
        this.state = {};
    }
    async componentWillMount() {
        Actions.refresh({ title: Languages.t('qrScanner', this.props.locale) });
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

function select(store) {
    return {
        category: store.data.category,
        locale: store.settings.locale,
        config: store.settings.config
    };
}

module.exports = connect(select)(QRScannerView);
