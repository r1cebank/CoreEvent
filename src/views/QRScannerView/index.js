import { connect } from 'react-redux';
import React, { Component } from 'react';
import { View, Text } from 'react-native';

import Camera from 'react-native-camera';
import { Actions } from 'react-native-router-flux';

import { Languages, Storage } from '../../global/globalIncludes';

import styles from './resources/styles';

class QRScannerView extends Component {
    static propTypes = {
        locale: React.PropTypes.string
    }
    constructor(props) {
        super(props);
        this.state = {
            errorText: ''
        };
    }
    async componentWillMount() {
        Actions.refresh({ title: Languages.t('qrScanner', this.props.locale) });
        const authorization = await Camera.checkDeviceAuthorizationStatus();
        this.setState({ authorization });
    }
    readBarcode = async (code) => {
        if (code.type === 'org.iso.QRCode') {
            try {
                const dataJson = JSON.parse(code.data);
                if (dataJson.eventId) {
                    try {
                        const modalEventData = await Storage.Event.fetchById(dataJson.eventId);
                        const modalLocationData = await Storage.Location
                        .fetchById(modalEventData.get('location').id);
                        Actions.pop({
                            refresh: {
                                showModal: true,
                                modalEventData,
                                modalLocationData
                            }
                        });
                    } catch (e) {
                        this.setState({
                            errorText: Languages.t('cannotGetEvent', this.props.locale)
                        });
                    }
                } else {
                    this.setState({
                        errorText: Languages.t('missingEventID', this.props.locale)
                    });
                }
            } catch (e) {
                this.setState({
                    errorText: Languages.t('cannotDecode', this.props.locale)
                });
            }
        } else {
            this.setState({
                errorText: Languages.t('codeNotSupported', this.props.locale)
            });
        }
    }
    render() {
        return (
            <View style={styles.container}>
                <Camera onBarCodeRead={this.readBarcode} style={styles.camera}>
                    <View style={styles.rectangleContainer}>
                        <View style={styles.errorContainer}>
                            <Text style={styles.errorText}>
                                {this.state.errorText}
                            </Text>
                        </View>
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
