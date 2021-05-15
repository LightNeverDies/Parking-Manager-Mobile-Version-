import React from 'react'
import { StyleSheet, View} from 'react-native'
import Tabs from '../../components/Tabs/Tabs'
// import { connect } from 'react-redux'


class Account extends React.Component {
    componentDidMount() {
    }

    render() {
        return (
                <View style={styles.container}>
                    <Tabs onPress={ this.onMenu }>Account Settings</Tabs>
                    <Tabs onPress={ this.onRegister }>Account History</Tabs>
                </View>
        )
    }

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
    },
})

// const mapStateToProps = (state) => {    
// }


// const mapDispatchToProps = dispatch => ({ 
// })

export default Account
// export default connect(mapStateToProps, mapDispatchToProps)(Account)