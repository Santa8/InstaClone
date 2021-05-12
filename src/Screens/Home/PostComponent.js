import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    Image
} from "react-native";

import { Card, CardItem, Thumbnail, Body, Left, Right, Button, Icon } from 'native-base'

class PostComponent extends Component {


    

    render() {

        const images = {

            "1": require('./naruto.jpg'),
            "2": require('./naruto.jpg'),
            "3": require('./naruto.jpg')
        }
        console.log(this.props.imageSource);

        return (
            <Card>
                <CardItem>
                    <Left>
                        <Thumbnail source={require('./me.jpg')} />
                        <Body>
                            <Text> {this.props.username}</Text>
                            <Text note> Mai 10, 2021</Text>
                        </Body>
                    </Left>
                </CardItem>
                <CardItem cardBody>
                    <Image source={this.props.imageSource} style={{ height: 200, width: null, flex: 1 }} />
                </CardItem>
                <CardItem style={{ height: 45 }}>
                    <Left>
                        <Button transparent>
                            <Icon name="ios-heart-outline" style={{ color: 'black' }} />
                        </Button>
                        <Button transparent>
                            <Icon name="ios-chatbubbles-outline" style={{ color: 'black' }} />
                        </Button>
                        <Button transparent>
                            <Icon name="ios-send-outline" style={{ color: 'black' }} />
                        </Button>


                    </Left>
                </CardItem>

                <CardItem style={{ height: 20 }}>
                    <Text>{this.props.likes} </Text>
                </CardItem>
                <CardItem>
                    <Body>
                        <Text>
                            <Text style={{ fontWeight: "900" }}>{this.props.username} </Text>
                                  Saluut cavaaa
                        </Text>
                    </Body>
                </CardItem>
            </Card>
        );
    }
}
export default PostComponent;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});