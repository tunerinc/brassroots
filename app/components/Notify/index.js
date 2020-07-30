import React, { useState, useEffect } from 'react';
import {
    View,
    StyleSheet,
    SafeAreaView,
    ScrollView,
    StatusBar,
    RefreshControl,
    Animated,
    Easing,
    Text,
    Dimensions,
} from 'react-native';
import {
    Icon,
    Thumbnail,
    Spinner,
    Card,
    CardItem,
} from 'native-base';
// import { fonts, colors, roles } from '../constants/DefaultProps';
// import Text from '../config/AppText';

const { height, width } = Dimensions.get('screen');
function Notify(props) {
    const [opacity, setOpacity] = useState(new Animated.Value(0));

    useEffect(() => {
        Animated.timing(opacity, {
            toValue: 1,
            easing: Easing.back(),
            duration: 500,
            useNativeDriver: true,
        }).start();
    })

    function notification() {
        setTimeout(() => {
            Animated.timing(opacity, {
                toValue: 0,
                easing: Easing.back(),
                duration: 1000,
                useNativeDriver: true,
            }).start();
        }, (props.duration || 5000));

        const dynamicStyles = {
            borderColor: props.type && props.type == "danger" ? "#b20000" : "#008DD5",
            borderEndColor: props.type && props.type == "danger" ? "#b20000" : "#008DD5",
            backgroundColor: props.type && props.type == "danger" ? "#b20000" : "#008DD5",
        }
        return (
            <Animated.View style={{ opacity: opacity, zIndex: 1000, position: "absolute", top: 0, width: "100%", }}>
                <Card style={[styles.Input___shadow, dynamicStyles]}>
                    <CardItem style={styles.cardItem}>
                        <View>
                            <Icon style={{ color: "#000", }} name='ios-notifications' />
                        </View>
                        <View style={{ paddingHorizontal: 8, }}>
                            <Text style={{ color: "#000", fontFamily: 'Muli', fontSize: 18, }}>{props.title}</Text>
                            <Text style={{ color: "#707070", fontFamily: 'Muli', }}>{props.message}</Text>
                        </View>
                    </CardItem>
                </Card>
            </Animated.View>
        )
    }

    return (
        <>
            {notification()}
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
    },
    Input___shadow: {
        position: "absolute",
        left: 20,
        right: 20,
        top: 50,
        zIndex: 1000,
        paddingRight: 12,
        marginTop: 10,
        borderWidth: 1,
        borderRadius: 5,
        borderBottomWidth: 0,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.4,
        shadowRadius: 2,
        elevation: 5,
    },
    cardItem: {
        borderRadius: 4,
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
        backgroundColor: "#fff",
        flexDirection: 'row',
    }
});

export default Notify;