import { CreditCardInput } from "expo-credit-card"
import { useState } from "react"
import React from "react"
import { connect } from "react-redux"
import cartActions from "../redux/actions/cartActions"
import {
  Text,
  View,
  Pressable,
  StyleSheet,
  TouchableOpacity,
} from "react-native"

const PayWithCard = ({
  addNewOrderHandler,
  catchPagoErr,
  payWithCreditCard,
  total,
}) => {
  console.log(total)
  const [fetching, setFetching] = useState(false)
  const payWithCCard = async () => {
    try {
      setFetching(true)
      let res = await payWithCreditCard()
      if (!res.success) throw new Error("Payment failed")
      console.log("success true")
      addNewOrderHandler()
    } catch (e) {
      console.log("error")
      catchPagoErr()
    }
  }
  return (
    <View>
      <CreditCardInput onChange={this._onChange} />
      {fetching && <Text style={styles.button}>Processing payment...</Text>}
      {!fetching && (
        <TouchableOpacity style={styles.button} onPress={payWithCCard}>
          <Text>Complete Payment</Text>
        </TouchableOpacity>
      )}
    </View>
  )
}
const mapDispatchToProps = {
  payWithCreditCard: cartActions.payWithCreditCard,
}
export default connect(null, mapDispatchToProps)(PayWithCard)

const styles = StyleSheet.create({
  button: {
    textAlign: "center",
    alignSelf: "center",
    width: "70%",
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10,
    borderRadius: 20,
    marginVertical: 30,
  },
})
