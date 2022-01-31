import React from 'react'
import { StyleSheet, View, Text, Dimensions, ScrollView } from 'react-native';
import { BarChart } from 'react-native-chart-kit'
import { requestStatistic } from '@src/reduxStore/statistic/actions/Statistic'
import { connect } from 'react-redux'
import info from './information.json'

class Information extends React.Component {
    constructor() {
        super()
    }
    
    componentDidMount() {
        this.props.requestStatistic()
    }

    renderInformation = (data) => {

        return (
            data.map((el) => {
                return(
                    <View key={el.id} style={{ width: Dimensions.get('window').width, height:'auto', backgroundColor:'#fb8c00', margin:5}}>
                        <Text style = {{ color:'white', fontSize:13, textAlign:'left', lineHeight: 20}} key={el.id}>{el.date} : {el.update}</Text>
                    </View>
                )
            })
        )
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
        <ScrollView style={styles.scrollContainer}>
            <View style={styles.loginContainer}>
                <Text style = {styles.textStyle}>News</Text>
                {this.renderInformation(info['Added features'])}
                <Text style = {styles.textStyle}>Users Registered By Year and Month</Text>
                <BarChart
                data={{
                    labels: date,
                    datasets: [
                      {
                        data: count
                      }
                    ]
                  }}
                width={Dimensions.get('screen').width}
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
        </ScrollView>
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
    scrollContainer: {
        flex:1,
        borderColor: 'white',
        borderWidth: 0.2,
        width: Dimensions.get('screen').width,
        height: Dimensions.get('screen').height,
        paddingBottom: 300
    }

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