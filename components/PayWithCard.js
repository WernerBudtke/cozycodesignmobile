import { CreditCardInput } from "expo-credit-card";
import { useState } from 'react';
import React from "react";
import {connect} from 'react-redux'
import cartActions from '../redux/actions/cartActions';
import { Text, View, Pressable } from "react-native";
const PayWithCard = ({addNewOrderHandler, catchPagoErr, payWithCreditCard}) => {
    const [fetching, setFetching] = useState(false)
    const payWithCCard = async () => {
        try{
            setFetching(true)
            let res = await payWithCreditCard()
            if(!res.success)throw new Error('Payment failed')
            console.log("success true")
            addNewOrderHandler()
        }catch(e){
            console.log("error")
            catchPagoErr()
        }
    }
    return(
        <View>
            <CreditCardInput onChange={this._onChange} />
            {fetching && <Text>Processing payment... please wait!</Text>}
            {!fetching && <Pressable onPress={payWithCCard}><Text>Complete Payment</Text></Pressable>}
        </View>
    )
}
const mapDispatchToProps = {
    payWithCreditCard: cartActions.payWithCreditCard
}
export default connect(null, mapDispatchToProps)(PayWithCard)