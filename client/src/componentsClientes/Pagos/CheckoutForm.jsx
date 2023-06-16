import {PaymentElement, CardElement, useStripe, useElements} from '@stripe/react-stripe-js';

const CheckoutForm = () => {

    const handleSubmit = async (e) => {
        e.preventDefault()

        const {error, paymentMethod} = await BsStripe.createPaymentMethod({
            type: 'card',
            card: elements.getElement(CardElement)
        })
    }

  return (
    <form>
      {/* <PaymentElement /> */}
      <CardElement className='w-96'/>
      <button>Submit</button>
    </form>
  );
};

export default CheckoutForm;