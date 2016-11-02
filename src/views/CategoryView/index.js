import { connect } from 'react-redux';
import React, { Component } from 'react';
import { Col, Grid, Row } from 'react-native-easy-grid';
import LinearGradient from 'react-native-linear-gradient';
import { View, ScrollView, InteractionManager, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { List, ListItem } from 'react-native-elements';
import randomColor from 'randomcolor';

import { Languages, Colors, Components } from '../../global/globalIncludes';
import styles from './resources/styles';

class CategoryView extends Component {
    static propTypes = {
        category: React.PropTypes.array,
        locale: React.PropTypes.string
    }
    componentWillMount() {
        Actions.refresh({ title: Languages.t('interestsLC', this.props.locale) });
    }
    render() {
        return (
            <View style={styles.container}>
                <ScrollView
                    ref={(c) => { this.scrollView = c; }}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    style={styles.scrollView}>
                    <Grid>
                        <Row>
                            <Col style={{ paddingLeft: 10, paddingRight: 5, paddingTop: 10}}>
                                <LinearGradient
                                    colors={[ Colors.infraRed, Colors.redTangelo ]}
                                    style={{
                                        height: 100,
                                        borderRadius: 20,
                                        flexDirection: 'column',
                                        justifyContent: 'center',
                                        alignSelf: 'stretch',
                                        alignItems: 'center'
                                    }}>
                                    <Text style={{ backgroundColor: 'transparent', color: 'white', fontWeight: '700', fontSize: 20 }}>Technology</Text>
                                </LinearGradient>
                            </Col>
                            <Col style={{ paddingLeft: 5, paddingRight: 10, paddingTop: 10}}>
                                <LinearGradient
                                    colors={[ Colors.infraRed, Colors.redTangelo ]}
                                    style={{
                                        height: 100,
                                        borderRadius: 20,
                                        flexDirection: 'column',
                                        justifyContent: 'center',
                                        alignSelf: 'stretch',
                                        alignItems: 'center'
                                    }}>
                                    <Text style={{ backgroundColor: 'transparent', color: 'white', fontWeight: '700', fontSize: 20 }}>Technology</Text>
                                </LinearGradient>
                            </Col>
                        </Row>
                        <Row>
                            <Col style={{ paddingLeft: 10, paddingRight: 5, paddingTop: 10}}>
                                <LinearGradient
                                    colors={[ Colors.infraRed, Colors.redTangelo ]}
                                    style={{
                                        height: 100,
                                        borderRadius: 20,
                                        flexDirection: 'column',
                                        justifyContent: 'center',
                                        alignSelf: 'stretch',
                                        alignItems: 'center'
                                    }}>
                                    <Text style={{ backgroundColor: 'transparent', color: 'white', fontWeight: '700', fontSize: 20 }}>Technology</Text>
                                </LinearGradient>
                            </Col>
                            <Col style={{ paddingLeft: 5, paddingRight: 10, paddingTop: 10}}>
                                <LinearGradient
                                    colors={[ Colors.infraRed, Colors.redTangelo ]}
                                    style={{
                                        height: 100,
                                        borderRadius: 20,
                                        flexDirection: 'column',
                                        justifyContent: 'center',
                                        alignSelf: 'stretch',
                                        alignItems: 'center'
                                    }}>
                                    <Text style={{ backgroundColor: 'transparent', color: 'white', fontWeight: '700', fontSize: 20 }}>Technology</Text>
                                </LinearGradient>
                            </Col>
                        </Row>
                    </Grid>
                </ScrollView>
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

module.exports = connect(select)(CategoryView);
