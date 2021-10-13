import React, { useState } from "react"
import { View, Text, StyleSheet ,Button } from "react-native"
import userActions from "../redux/actions/userActions"
import cartActions from "../redux/actions/cartActions"
import productsActions from "../redux/actions/productsActions"
import Paypal from "../components/Paypal"
import { TextInput } from "react-native-gesture-handler"
import { connect } from "react-redux"
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from "react-native-simple-radio-button"

const PaymentGateway = ({
  loginUser,
  products,
  manageUser,
  getProducts,
  editCard,
  addNewOrder,
  addCard,
  getCard,
  deleteAllCartProduct,
}) => {
  const [sharedPayment, setSharedPayment] = useState(false)
  const [code, setCode] = useState(null)
  const [balance, setBalance] = useState(null)
  const [hideRadio, setHideRadio] = useState(true)
  const [enableInput, setEnableInput] = useState(false)
  const [enablePayment, setEnablePayment] = useState(true)
  const [renderError, setRenderError] = useState(null)
  const [chosenMethod, setChosenMethod] = useState({
    type: null,
    enable: false,
  })
  const [info, setInfo] = useState({
    zipCode: "",
    number: "",
    city: "",
    street: "",
    phone: "",
    dni: "",
    firstName: loginUser.firstName,
    lastName: loginUser.lastName,
    eMail: loginUser.eMail,
  })

  const totalPrice = products.map((obj) =>
    obj.product.discount === 0
      ? obj.product.price * obj.quantity
      : ((100 - obj.product.discount) / 100) * obj.product.price * obj.quantity
  )

  const [order, setOrder] = useState({
    products: products.map((obj) => ({
      productId: obj.product._id,
      quantity: obj.quantity,
    })),
    paymentMethod: {
      type: "",
      extraInfo: "",
    },
    totalPrice: totalPrice.reduce((a, b) => a + b, 0).toFixed(2),
  })

  const validateGift = products.filter(
    (obj) => obj.product.category === "GiftCard"
  )

  if (validateGift.length) {
    var giftCard = validateGift.map((obj) => ({ balance: obj.product.price }))
  }

  const validate = () => {
    if (Object.values(info).some((value) => value === "")) {
      setRenderError("You need to complete all the fields to continue!")
    } else {
      manageUser(info).then((res) => {
        if (res.success) {
          setChosenMethod({ ...chosenMethod, enable: true })
          setEnableInput(true)
          setHideRadio(false)
          setEnablePayment(true)
          setRenderError("")
        } else {
          setRenderError("The information provided is incorrect!")
        }
      })
    }
  }

  const fillUserInfo = (e, nameImput) => {
    setInfo({
      ...info,
      [nameImput]: e,
    })
  }

  const fillOrderInfo = (e, add) => {
    setOrder({
      ...order,
      paymentMethod: {
        extraInfo: !add
          ? null
          : `giftCArd : $${balance} - ${e} : $${sharedPaymentPrice} `,
        type: !add ? e : `${order.paymentMethod.type} - ${e}`,
      },
    })
    setChosenMethod({
      ...chosenMethod,
      type: !add ? e : `${chosenMethod.type} - ${e}`,
    })
    add && setSharedPayment(true)
  }
  
  const addNewOrderHandler = () => {
    if (giftCard) {
      addCard(giftCard).then((res) => console.log(res))
    }
    if (
      order.paymentMethod.extraInfo ||
      order.paymentMethod.type === "GiftCard"
    ) {
      let obj = {
        balance: checkBalance < 0 ? 0 : checkBalance,
        code,
      }
      editCard(obj)
    }
    addNewOrder(order).then((res) => {
      setChosenMethod({ ...chosenMethod, enable: false })
      deleteAllCartProduct()
      getProducts()
      // history.push("/", { view: true }) //HACER NAVEGACION PARA MANDAR A HOME
    })
  }

  let date = new Date()

  const fillCode = (e) => {
    setCode(e.target.value)
  }
  const getCardHandler = () => {
    getCard(code).then((res) => {
      if (res.success) {
        setBalance(res.res.balance)
      } else {
        setBalance("Invalid Giftcard code")
      }
    })
  }

  const checkBalance =
    typeof balance === "number" ? (balance - order.totalPrice).toFixed(2) : null

  const sharedPaymentPrice = Math.abs(checkBalance)

  const catchMercadoPagoErr = () => {
    setChosenMethod({
      ...chosenMethod,
      enable: false,
    })
    setEnableInput(false)
    setEnablePayment(false)
    setHideRadio(true)
    //   alert(
    //     "We were unable to process the payment, please try again, or choose another payment method. "
    //   ) //AGREGAR UNA ALERTA DE REACT NATIVE
  }

  const paymentOptions = [
    { label: "Paypal", value: "PayPal" },
    { label: "Mercado Pago / Credit", value: "MercadoPago" },
    { label: "Giftcard", value: "GiftCard"},]

  return (
    <View style={styles.gatewayContainer}>
      <View style={styles.checkoutInfo}>
        <Text style={styles.h1}>Personal Info</Text>
        <View style={styles.uniqueInput}>
          <Text style={styles.label}>Email:</Text>
          <TextInput
            style={styles.input}
            editable={false}
            defaultValue={info.eMail}
          />
        </View>
        <View style={styles.inputDiv}>
          <View style={styles.uniqueInput}>
            <Text style={styles.label}>Name:</Text>
            <TextInput
              style={styles.input}
              editable={false}
              defaultValue={info.firstName}
            />
          </View>
          <View style={styles.uniqueInput}>
            <Text style={styles.label}>Lastname:</Text>
            <TextInput
              style={styles.input}
              editable={false}
              defaultValue={info.lastName}
            />
          </View>
        </View>
        <View style={styles.inputDiv}>
          <View style={styles.uniqueInput}>
            <Text style={styles.label}>DNI:</Text>
            <TextInput
              style={styles.input}
              editable={!enableInput}
              defaultValue={info.dni}
              onChangeText={(e) => fillUserInfo(e, "dni")}
            />
          </View>
          <View style={styles.uniqueInput}>
            <Text style={styles.label}>Phone Number:</Text>
            <TextInput
              style={styles.input}
              editable={!enableInput}
              defaultValue={info.phone}
              onChangeText={(e) => fillUserInfo(e, "phone")}
            />
          </View>
        </View>
        <Text style={styles.h1}>Shipment Info</Text>

        <View style={styles.inputDiv}>
          <View style={styles.uniqueInput}>
            <Text style={styles.label}>Adress:</Text>
            <TextInput
              style={styles.input}
              editable={!enableInput}
              defaultValue={info.street}
              onChangeText={(e) => fillUserInfo(e, "street")}
            />
          </View>
          <View style={styles.uniqueInput}>
            <Text style={styles.label}>Number:</Text>
            <TextInput
              style={styles.input}
              editable={!enableInput}
              defaultValue={info.number}
              onChangeText={(e) => fillUserInfo(e, "number")}
            />
          </View>
        </View>
        <View style={styles.inputDiv}>
          <View style={styles.uniqueInput}>
            <Text style={styles.label}>City:</Text>
            <TextInput
              style={styles.input}
              editable={!enableInput}
              defaultValue={info.city}
              onChangeText={(e) => fillUserInfo(e, "city")}
            />
          </View>
          <View style={styles.uniqueInput}>
            <Text style={styles.label}>Zip Code:</Text>
            <TextInput
              style={styles.input}
              editable={!enableInput}
              defaultValue={info.zipCode}
              onChangeText={(e) => fillUserInfo(e, "zipCode")}
            />
          </View>
        </View>
        <Text style={styles.h1}>Payment</Text>
        <View>
         {hideRadio ? <RadioForm
            style={styles.radioButtons}
            radio_props={paymentOptions}
            onPress={(value) => fillOrderInfo(value)}
            onPress={() => setEnablePayment(false)}
            disabled={enableInput}
            buttonColor={"#ad999393"}
            selectedButtonColor={"#ad999393"}
            labelHorizontal={false}
            labelStyle={{
              fontSize: 18,
              color: "black",
              fontFamily: "Roboto_500Medium",
            }}/> 
            : <Test>{order.paymentMethod.type}</Test>}
        </View>
        <Button style={styles.checkOut}
            title='Checkout Order'
            disabled={enablePayment}
            onPress={validate}/>
        <Text style={styles.error}>{renderError}</Text>
      </View>
    </View>
  )
}

const mapStateToProps = (state) => {
  return {
    products: state.cart.products,
    loginUser: state.users.user,
  }
}

const mapDispatchToProps = {
  manageUser: userActions.manageUser,
  addNewOrder: cartActions.addNewOrder,
  getProducts: productsActions.getProducts,
  addCard: cartActions.addCard,
  getCard: cartActions.getCard,
  editCard: cartActions.editCard,
  deleteAllCartProduct: cartActions.deleteAllCartProduct,
}

export default connect(mapStateToProps, mapDispatchToProps)(PaymentGateway)

const styles = StyleSheet.create({
  gatewayContainer: { paddingVertical: 15, paddingHorizontal: 10 },
  checkoutInfo: {},
  inputDiv: {},
  radioButtons: {
    display: "flex",
    flexDirection: "row",
    paddingVertical: 10,
    justifyContent: "space-evenly",
  },
  h1: {
    backgroundColor: "#ad999393",
    textAlign: "center",
    color: "black",
    fontFamily: "Cormorant_700Bold",
    textTransform: "uppercase",
    paddingVertical: 4,
    marginTop: 8,
    letterSpacing: 3,
  },
  uniqueInput: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 4,
    paddingHorizontal: 15,
  },
  label: { paddingRight: 7, fontFamily: "Roboto_500Medium" },
  input: {
    padding: 0,
    paddingLeft: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#bf988f",
    flex: 1,
    marginVertical: 3,

    height: 35,
  },
  error:{
    textAlign: 'center',
    fontSize: 15,
    color: 'rgb(216, 34, 34)',
    paddingTop:10,
  }
})
