import React, { useState, useEffect } from "react"
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native"
import userActions from "../redux/actions/userActions"
import cartActions from "../redux/actions/cartActions"
import productsActions from "../redux/actions/productsActions"
import { TextInput } from "react-native-gesture-handler"
import { connect } from "react-redux"
import RadioForm from "react-native-simple-radio-button"
import PayWithCard from "../components/PayWithCard"
import AwesomeAlert from "react-native-awesome-alerts"

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
  navigation,
  route,
}) => {
  const [sharedPayment, setSharedPayment] = useState(false)
  const [code, setCode] = useState(null)
  const [balance, setBalance] = useState(null)
  const [hideRadio, setHideRadio] = useState(true)
  const [enableInput, setEnableInput] = useState(false)
  const [enablePayment, setEnablePayment] = useState(true)
  const [renderError, setRenderError] = useState(null)
  const [showAlert2, setShowAlert2] = useState(false)
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
    console.log("entro a addneworder handler")
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
      setShowAlert2(true)
      // navigation.reset({
      //   index: 0,
      //   routes: [
      //     {
      //       name: "Home", 
      //       params: {}, 
      //     },
      //   ],
      // })
      ///////
    })
  }

  const fillCode = (e) => {
    setCode(e)
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

  const catchPagoErr = () => {
    setChosenMethod({
      ...chosenMethod,
      enable: false,
    })
    setEnableInput(false)
    setEnablePayment(false)
    setHideRadio(true)
    // toast.custom(
    //   <div className={styles.alertPago}>
    //     <p>
    //       <i className="fas fa-exclamation-circle"></i> We were unable to
    //       process the payment, please try again, or choose another payment
    //       method.
    //     </p>
    //   </div>,
    //   { duration: 3000 }
    // )
  }

  const paymentOptions = [
    { label: "Mercado Pago / Credit", value: "MercadoPago" },
    { label: "Giftcard", value: "GiftCard" },
  ]

  const paymentOptionsGiftC = [
    { label: "Mercado Pago / Credit", value: "MercadoPago" },
  ]

  return (
    <ScrollView style={styles.gatewayContainer}>
      <AwesomeAlert
        show={showAlert2}
        showProgress={false}
        message="Gracias por su compra!! voleva prontos :D"
        closeOnTouchOutside={false}
        closeOnHardwareBackPress={false}
        showConfirmButton={true}
        confirmText="BACK TO HOME"
        confirmButtonColor="#b7cbd3"
        onConfirmPressed={() => {
          setShowAlert2(false) , navigation.reset({
            index: 0,
            routes: [
              {
                name: "Home", 
                params: {}, 
              },
            ],
          })
        }}
      />
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
          <Text>{order.totalPrice} </Text>
          {hideRadio ? (
            <RadioForm
              style={styles.radioButtons}
              radio_props={paymentOptions}
              initial={-1}
              onPress={(value) => {
                fillOrderInfo(value)
                setEnablePayment(false)
              }}
              // onPress={() => setEnablePayment(false)}
              disabled={enableInput}
              buttonColor={"#ad999393"}
              selectedButtonColor={"#ad999393"}
              labelHorizontal={false}
              labelStyle={{
                fontSize: 18,
                color: "black",
                fontFamily: "Roboto_500Medium",
              }}
            />
          ) : (
            <Text style={styles.h2}>{order.paymentMethod.type}</Text>
          )}
        </View>
        <View style={styles.divError}>
          <Text style={styles.error}>{renderError}</Text>
        </View>
        <View style={styles.checkOut}>
          <TouchableOpacity
            style={styles.button}
            disabled={enablePayment}
            onPress={validate}
          >
            <Text>Checkout Order</Text>
          </TouchableOpacity>
        </View>
        {chosenMethod.enable && chosenMethod.type.includes("GiftCard") && (
          <View>
            <View className={styles.giftCardCode}>
              <View style={styles.codeInput}>
                <Text style={styles.label}>Enter your Giftcard Code:</Text>
                <TextInput
                  style={styles.input}
                  required
                  defaultValue=" "
                  onChangeText={(e) => fillCode(e)}
                />
              </View>
              <TouchableOpacity style={styles.button} onPress={getCardHandler}>
                <Text>Check balance</Text>
              </TouchableOpacity>
            </View>
            {typeof balance === "string" && (
              <Text style={styles.error}>{balance}</Text>
            )}
            {checkBalance < 0 && (
              <View style={styles.paywithGiftC}>
                <View style={styles.giftCardText}>
                  <Text style={styles.p}>
                    The available amount in your Giftcard is
                    <Text style={styles.span}> ${balance}</Text>
                  </Text>
                  <Text style={styles.p}>
                    The total amount of your order
                    <Text style={styles.span}> ${order.totalPrice}</Text> is
                    higher than the balance left in your GiftCard{" "}
                  </Text>
                  <Text style={styles.p}>
                    The remaining amount is{" "}
                    <Text style={styles.span}>${Math.abs(checkBalance)}</Text>.
                  </Text>
                </View>
                <RadioForm
                  style={styles.radioButtons}
                  radio_props={paymentOptionsGiftC}
                  initial={-1}
                  onPress={(value) => {
                    fillOrderInfo(value, "add"), setEnablePayment(false)
                  }}
                  disabled={sharedPayment}
                  buttonColor={"#ad999393"}
                  selectedButtonColor={"#ad999393"}
                  labelHorizontal={false}
                  labelStyle={{
                    fontSize: 18,
                    color: "black",
                    fontFamily: "Roboto_500Medium",
                  }}
                />
              </View>
            )}
            {checkBalance > 0 && (
              <View style={styles.paywithGiftC}>
                <View style={styles.giftCardText}>
                  <Text style={styles.p}>
                    The available amount in your Giftcard is
                    <Text style={styles.span}> ${balance}</Text>
                  </Text>
                  <Text style={styles.p}>
                    The total amount of your order is
                    <Text style={styles.span}> ${order.totalPrice}</Text>
                  </Text>
                  <Text style={styles.p}>
                    You have a remaining balance of
                    <Text style={styles.span}>${checkBalance}</Text>
                  </Text>
                </View>
                <TouchableOpacity
                  style={styles.button}
                  onPress={addNewOrderHandler}
                >
                  <Text>pagar</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        )}
        {chosenMethod.enable && chosenMethod.type.includes("MercadoPago") && (
          <PayWithCard
            addNewOrderHandler={addNewOrderHandler}
            catchPagoErr={catchPagoErr}
            // total={!sharedPayment ? order.totalPrice : sharedPaymentPrice}
          />
        )}
      </View>
    </ScrollView>
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
  gatewayContainer: {
    paddingTop: 15,
    paddingHorizontal: 10,
  },
  checkoutInfo: { marginBottom: 35 },
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
  h2: {
    textAlign: "center",
    marginTop: 30,
    textTransform: "uppercase",
    letterSpacing: 3,
    fontFamily: "Roboto_500Medium",
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
  error: {
    textAlign: "center",
    fontSize: 15,
    color: "rgb(216, 34, 34)",
  },
  divError: { height: 18, marginBottom: 20 },
  checkOut: { marginBottom: 30 },
  codeInput: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    marginBottom: 20,
  },
  button: {
    alignSelf: "center",
    width: "70%",
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10,
    borderRadius: 20,
  },
  giftCardText: {},
  paywithGiftC: {
    marginVertical: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderColor: "#ad999393",
    borderWidth: 3,
  },
  span: { fontFamily: "Roboto_500Medium", fontSize: 20 },
  p: {
    fontFamily: "Roboto_400Regular",
    fontSize: 18,
    textAlign: "center",
    margin: 5,
  },
})
