import React from 'react'
import { StyleSheet, View, Text} from 'react-native'
// import { getArticles } from '@src/reduxStore/actions/get_articles'
// import { connect } from 'react-redux'


class Account extends React.Component {
    componentDidMount() {
        this.props.setArticle()
    }

    render() {
        // const { articles } = this.props
        return (
            <View>
                <Text>Account</Text>
            </View>
        )
    }

}
// {articles.length > 0 ? articles.map((el) => {return (<Text key={el.id}>{el.title}</Text>) } ): null}
const styles = StyleSheet.create({
        
})

// const mapStateToProps = (state) => {
//     return { articles: state.articles }
// }


// const mapDispatchToProps = dispatch => ({ setArticle: () => dispatch(getArticles()) })

export default Account
// export default connect(mapStateToProps, mapDispatchToProps)(Account)