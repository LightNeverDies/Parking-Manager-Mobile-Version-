import React from 'react'
import { StyleSheet, View, Text, TextInput, Dimensions } from 'react-native'
import LogoHolder from '@src/components/LogoHolder/LogoHolder'
import Tabs from '../../components/Tabs/Tabs'
import { AntDesign } from '@expo/vector-icons'
import FloatButton from '../../components/FloatButton/FloatButton'
import { connect } from 'react-redux'


class Account extends React.Component {
    constructor(){
        super()
        this.state = {
            active: '',
            currentImage: 0,
            intervalID: 0,
            disabled: false,
            carImage: [
                require('../../../assets/carNum.png'),
                require('../../../assets/carNumP.png')
            ]
        }
    }
    componentDidMount() {
        this.onSettings()
        this.onTabSelected()
    }


    onSettings = () => {
        this.setState({ active: 'onSettings' })
    }

    onHistory = () => {
        this.setState({ active: 'onHistory' })
    }

    onClickImage = () => {
        if(this.state.disabled === false) {
            this.onStartTimer()
        } else {
            this.onStopTimer()
        }
    }

    onStartTimer = () => {
        const intervalID = setInterval(this.onStart, 1000)
        this.setState({ intervalID })
        this.setState({ disabled: true})
    }

    onStopTimer = () => {
        clearInterval(this.state.intervalID)
        this.setState({ currentImage: 0})
        this.setState({ disabled: false})
    }

    onStart = () => {

        if (this.state.currentImage < this.state.carImage.length - 1) {

            this.setState({ currentImage: this.state.currentImage + 1 })
        } else {
            this.setState({ currentImage: 0 })
        } 
        return this.currentImage;
    }

    sendCarNumber = () => {
        console.log('Welcome')
    }

    onSettingsPage = () => {
        return (
            <View style = {{ flexDirection: 'column', height: Dimensions.get('window').height }}>
                <View style= {{ flex: 1 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-end'}}>
                        <Text style = {{color: 'white', fontSize: 20, textAlign: 'right'}}>Balance </Text>
                        <TextInput style = {styles.noEditableFields} editable = {false}>0$  </TextInput>
                    </View>
                </View>
                <View style = {{ flex:1,  alignItems: 'center'}}>
                    <LogoHolder onPress={ this.onClickImage } source={this.state.carImage[this.state.currentImage]}/>
                </View>
                <View style= {{ flex: 2, marginTop: 30 }}>
                    <View style={styles.columnLine}>
                        <View style = {styles.rows}>
                            <Text style = {styles.noEditableFields}>Username </Text>
                            <TextInput style = {styles.noEditableFields} editable = {false}>{this.props.username}</TextInput>
                        </View>
                        <View style = {styles.rows}>
                            <Text style = {styles.noEditableFields}>Car Number</Text>
                            <TextInput style = {styles.inputField}></TextInput>
                            <FloatButton onPress={this.sendCarNumber}>
                                <AntDesign name="pluscircle" color={"white"} size={28} />
                            </FloatButton>
                        </View>
                    </View>
                </View>
            </View>

        )
    }

    onHistoryPage = () => {
        return (
            <View>
                <Text>Hello on History</Text>
                {/* List with whole store of user  */}
            </View>
        )
    }

    onTabSelected = () => {
        return (
            <>
            {this.state.active === 'onSettings' 
            ? this.onSettingsPage() 
            : this.onHistoryPage()}
            </>
        )
    }

    render() {
        return (
            <View style={styles.screen}>
                <View style={styles.container}>
                    <Tabs onPress={ this.onSettings } styles={{ backgroundColor: this.state.active === 'onSettings' ? 'red' : '#12285c' }}>Account Settings</Tabs>
                    <Tabs onPress={ this.onHistory } styles= {{ backgroundColor: this.state.active === 'onHistory' ? 'red' : '#12285c' }}>Account History</Tabs>
                </View>
                {this.onTabSelected()}
            </View>
        )
    }

}

const styles = StyleSheet.create({
    screen: {
        width: '100%',
        height: Dimensions.get('window').height,
        flex: 1,
    },
    container: {
        flexDirection: 'row',
    },
    onSettings: {
        flex: 1 
    },
    inputField: {
        borderRadius: 3,
        borderColor: 'white',
        borderWidth: 0.2,
        color: 'white',
        width: "50%",
        fontSize: 20,
        marginLeft: 20,
        marginRight: 20
    },
    columnLine: {
        flexDirection: 'column'
    },
    rows: {
        flexDirection: 'row',  
        justifyContent: 'center',
        padding: 20
    },
    noEditableFields: {
        color:'white', 
        fontSize: 20
    },
    floatB: {
        flex:1,
        backgroundColor: 'red',
        width: '50%',
        height: '30%'
    }
})

const mapStateToProps = (state) => {    
    return {
        username: state.login.username,
        email: state.login.email,
        created: state.login.accountCreated
    }
}


// const mapDispatchToProps = dispatch => ({ 
// })


export default connect(mapStateToProps, null)(Account)