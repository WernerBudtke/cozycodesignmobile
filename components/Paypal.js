import React, { useEffect, useRef } from "react"
import { View, Text } from "react-native"

const Paypal = ({ description, total, catchPagoErr, addNewOrderHandler }) => {
  const paypal = useRef()
  useEffect(() => {
    if (window.myButton) window.myButton.close()
    window.myButton = window.paypal.Buttons({
      createOrder: (data, actions, err) => {
        return actions.order.create({
          intent: "CAPTURE",
          purchase_units: [
            {
              description: description,
              amount: {
                value: total,
                currency_code: "USD",
              },
            },
          ],
        })
      },
      onApprove: async (data, actions) => {
        await actions.order.capture()
        addNewOrderHandler()
      },
      onError: (err) => {
        catchPagoErr()
      },
    })
    window.myButton.render(paypal.current)
  })

  return <View ref={paypal}></View>
}

export default Paypal
