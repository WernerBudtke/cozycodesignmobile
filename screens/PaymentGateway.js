import React, { useState } from "react"
import { View, Text, StyleSheet } from "react-native"
import userActions from "../redux/actions/userActions"
import cartActions from "../redux/actions/cartActions"
import productsActions from "../redux/actions/productsActions"
import Paypal from "../components/Paypal"
import { TextInput } from "react-native-gesture-handler"
import { connect } from "react-redux"

const PaymentGateway = ({
  loginUser,
  products,
  manageUser,
  getProducts,
  editCard,
  addNewOrder,
  history,
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
    firstName: "loginUser.firstName",
    lastName: "loginUser.lastName",
    eMail: "loginUser.eMail",
  })
  console.log(loginUser)
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
          : `giftCArd : $${balance} - ${e.target.value} : $${sharedPaymentPrice} `,
        type: !add
          ? e.target.value
          : `${order.paymentMethod.type} - ${e.target.value}`,
      },
    })
    setChosenMethod({
      ...chosenMethod,
      type: !add ? e.target.value : `${chosenMethod.type} - ${e.target.value}`,
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

  return (
    <View style={styles.gatewayContaine}>
      <View styles={styles.checkoutInfo}>
        <Text>Personal Info</Text>
        <View styles={styles.inputMail}>
          <Text>Email</Text>
          <TextInput editable={false} defaultValue={info.eMail} />
        </View>
        <View styles={styles.inputDiv}>
          <View>
            <Text>Name</Text>
            <TextInput editable={false} defaultValue={info.firstName} />
          </View>
          <View>
            <Text>Lastname</Text>
            <TextInput editable={false} defaultValue={info.lastName} />
          </View>
        </View>
        <View styles={styles.inputDiv}>
          <View>
            <Text>DNI</Text>
            <TextInput
              editable={!enableInput}
              defaultValue={info.dni}
              onChangeText={(e) => fillUserInfo(e, "dni")}
            />
          </View>
          <View>
            <Text>Phone Number</Text>
            <TextInput
              editable={!enableInput}
              defaultValue={info.dni}
              onChangeText={(e) => fillUserInfo(e, "phone")}
            />
          </View>
        </View>
        <Text>Shipment Info</Text>

        <View styles={styles.inputDiv}>
          <View>
            <Text>Adress</Text>
            <TextInput
              editable={!enableInput}
              defaultValue={info.street}
              onChangeText={(e) => fillUserInfo(e, "street")}
            />
          </View>
          <View>
            <Text>Number</Text>
            <TextInput
              editable={!enableInput}
              defaultValue={info.number}
              onChangeText={(e) => fillUserInfo(e, "number")}
            />
          </View>
        </View>
        <View styles={styles.inputDiv}>
          <View>
            <Text>City</Text>
            <TextInput
              editable={!enableInput}
              defaultValue={info.city}
              onChangeText={(e) => fillUserInfo(e, "city")}
            />
          </View>
          <View>
            <Text>Zip Code</Text>
            <TextInput
              editable={!enableInput}
              defaultValue={info.zipCode}
              onChangeText={(e) => fillUserInfo(e, "zipCode")}
            />
          </View>
        </View>
        <Text>Payment</Text>
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

const styles = StyleSheet.create({})
