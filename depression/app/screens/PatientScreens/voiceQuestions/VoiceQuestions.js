import React, { Component, useState, useEffect, useCallback  } from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity, SafeAreaView, ScrollView, Dimensions, Button, ProgressBarAndroid, StatusBar, Alert} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import { Card, Avatar, ListItem  } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Tts from 'react-native-tts';
import { RNVoiceRecorder } from 'react-native-voice-recorder';

const { width, height } = Dimensions.get('window');

const VoiceQuestions = () => {
    useEffect(() => {
        Tts.getInitStatus().then(() => {
            Tts.speak('');
            Tts.setDucking(true);
          });
        Tts.voices().then(voices => setVoices(voices));
    }, []); 
    const user = useSelector(state => state.auth.user)
    const QuestionList = useSelector(state => state.auth.QuestionList)
    const [questions, setQuestions] = useState(QuestionList[0]) 
    const navigation = useNavigation();
    const [items, setVoices] = useState()
    const [changeVoices, setChangeVoices] = useState(false)
    console.log("printing doctorlist", questions)
    console.log("rendring voice question page")
    return (
        <SafeAreaView style = {styles.container} >
            <StatusBar backgroundColor='#2E71DC'/>
            <View style = {styles.FirstHalf}>
                <View style={{flexDirection: 'row', justifyContent: 'flex-start',  alignContent:'center', alignItems: 'center'}}>
                    <Icon.Button 
                        backgroundColor="#2E71DC"
                        name="menu"
                        onPress={() => navigation.openDrawer()}
                    />
                    <View style={{flexDirection: 'row', marginHorizontal: '20%'}}>
                        <Avatar
                            size="large"
                            rounded
                            source={{
                                uri: user.profileURL
                            }}
                            showEditButton
                            onEditPress={() => alert("not allowed now")}
                        />
                        <Avatar
                            size="large"
                            rounded
                            source={{
                                uri: user.AvatarImg
                            }}
                        />
                    </View>
                </View>
                <View style={{alignItems: 'center', alignContent: 'center', paddingTop: 5,paddingBottom: 5,}}>
                    <Text style={{fontSize: 18,color: '#fff'}}>{user.fullname}</Text>
                </View>
            </View>
            <ScrollView contentContainerStyle={styles.SecondHalf}>
                <TouchableOpacity onPress={()=> setChangeVoices(true)}>
                    <Text style={styles.changeVoiceButton}>Change voice</Text>
                </TouchableOpacity>
                <View>
                    <Card
                        containerStyle={{borderRadius: 5, width: width/1.1,}}>
                        <Text style={{marginBottom: '2%', marginVertical: '2%', alignSelf: 'center'}}>
                            {questions.Question}
                        </Text>
                        <Button
                            onPress={()=> Record()}
                            buttonStyle={{borderRadius: 5}}
                            title='Record Answer' 
                        />
                    </Card>
                </View>
                <View>
                    {changeVoices && (
                        <View>
                            {items.map(item => (
                                <ListItem
                                    leftAvatar={{
                                        title: item.language,
                                        source: { uri: 'https://cdn2.iconfinder.com/data/icons/calendar-36/64/5-512.png' },
                                    }}
                                    title= {item.language}
                                    subtitle={item.name}
                                    onPress={()=> setChangeVoices(false)}
                                    chevron
                                />
                            ))}
                        </View>
                    )}
                </View>
            </ScrollView>
		</SafeAreaView>
    );
};

const Questions = async(word) => {
    console.log("printing item", word)
    await Tts.speak(word)
}

const Record = async() => {
    console.log("started recording")
    RNVoiceRecorder.Record({
        onDone: (path) => {
            console.log("recording done", path)
        },
        onCancel: () => {
            console.log("recording cancel")
        }
    })
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    FirstHalf: {
      backgroundColor: '#2E71DC',
    },
    SecondHalf: {
     
    },
    AvailableDoc: {
        fontSize: 25,
        padding: 8,
    },
    appointment: {
        padding: 10,
        fontSize: 25,
    },
    appointmentBox: {
        height: height/4,
        backgroundColor: '#fff'
    },
    card: {
        borderRadius: 7,
        width: width/1.07,
        shadowOffset: { width: 0, height: 3 },
        shadowColor: '#000',
        shadowOpacity: 0.4,
        elevation: 4,
    },
    image: {
        width: width/1.155,
        height: width/1.155,
        borderRadius: 3,
    },
    DocName: {
        fontSize: 25,
        padding: 10
    },
    message: {
        paddingLeft: 19,
        fontSize: 15,
    },
    appointmentButton: {
        backgroundColor: '#2E71DC',
        height: 40,
        marginHorizontal: 25,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 15,
        shadowOffset: { width: 0, height: 3 },
        shadowColor: '#000',
        shadowOpacity: 0.4,
        elevation: 4,
    },
    Lbutton: {
        backgroundColor: '#2E71DC',
        height: 40,
        marginHorizontal: 25,
        borderBottomLeftRadius: 5,
        borderTopLeftRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 5,
        width: width/2.9,
        shadowOffset: { width: 0, height: 3 },
        shadowColor: '#000',
        shadowOpacity: 0.4,
        elevation: 4,
      },
      Rbutton: {
        backgroundColor: '#2E71DC',
        height: 40,
        borderBottomRightRadius: 5,
        borderTopRightRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 5,
        width: width/2.9,
        shadowOffset: { width: 0, height: 3 },
        shadowColor: '#000',
        shadowOpacity: 0.4,
        elevation: 4,
      },
      changeVoiceButton: {
          fontSize: 20,
      }
});

export default VoiceQuestions

