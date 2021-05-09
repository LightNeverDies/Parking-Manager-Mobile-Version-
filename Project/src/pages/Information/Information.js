import React from 'react'
import { StyleSheet, View, Text, Dimensions } from 'react-native';
import { BarChart } from 'react-native-chart-kit'
import { requestStatistic } from '@src/reduxStore/statistic/actions/Statistic'
import { connect } from 'react-redux'

class Information extends React.Component {
    constructor() {
        super()
    }
    
    componentDidMount() {
        this.props.requestStatistic()
    }


    render() {

        const data = Object.values(this.props.data).map(item => {
            return item
        })
        const count = data.map(c => {
            return c.count 
        })
        const date = data.map(d => {
            return d.date
        })
     
        return (
        <View style={styles.loginContainer}>
            <View style = {styles.mainContainer}>
                <Text style = {styles.textStyle}>Users Registered By Month</Text>
                <BarChart
                data={{
                    labels: date,
                    datasets: [
                      {
                        data: count
                      }
                    ]
                  }}
                width={Dimensions.get('window').width}
                height={220}
                fromZero= {true}
                verticalLabelRotation={0}
                showValuesOnTopOfBars={true}
                chartConfig={{
                    backgroundColor: "#e26a00",
                    backgroundGradientFrom: "#fb8c00",
                    backgroundGradientTo: "#ffa726",
                    decimalPlaces: 0,
                    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    style: {
                      borderRadius: 16
                    },
                    propsForDots: {
                      r: "6",
                      strokeWidth: "2",
                      stroke: "#ffa726"
                    },
                    fillShadowGradient:'#ba2d2d',
                    fillShadowGradientOpacity:1,
                  }}
                />
            </View>
        </View>
        )
    }

}

const styles = StyleSheet.create({
    loginContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        backgroundColor: '#2A303E',
    },
    textStyle: {
        color: 'white',
        fontSize: 20,
        textAlign: 'center',
    },

})

const mapStateToProps = (state) => {
    return {
        data: state.statistic.data
    }
}

const mapDispatchToProps = dispatch => ({ 
    requestStatistic: () => dispatch(requestStatistic())
})

export default connect(mapStateToProps, mapDispatchToProps)(Information)