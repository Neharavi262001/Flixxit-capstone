import React, { useEffect } from 'react'
import './subscription.css'
import { useGetSubscriptionPlansQuery,useCreateSessionMutation } from '../../redux/user/userApiSlice'

const Subscription = () => {
  useEffect(()=>{

  },[])

  

  const { data: subscriptionPlans, error, isLoading } = useGetSubscriptionPlansQuery();
  const [createSession] = useCreateSessionMutation();
  console.log(subscriptionPlans)

  const handleCreateSession=async(planId)=>{
    try {
      const id=String(planId)
      const {data} = await createSession(id);
      console.log(data)

      if (data && data.checkoutUrl) {
        // Redirect to the hosted invoice URL
        window.location.href = data.checkoutUrl;
      } else {
        console.error('Invalid session data:', data);
      }
    } catch (error) {
      console.error('Error creating checkout session:', error.message);
    }
  }
 
  return (
    <div className='subscription-page'>
      
      <div className="sub-container">
      <h2 className='sub-title'>Choose a Subscription Plan</h2>
      {isLoading && <p>Loading subscription plans...</p>}

      {error && <p>Error fetching subscription plans: {error.message}</p>}

      {subscriptionPlans && subscriptionPlans.map((plan) => (
          <button key={plan.id} className='subscribe-btn' onClick={() => handleCreateSession(plan.id)}>
            {plan.productName} <span>₹ {plan.amount}/{plan.interval}</span>
          </button>
        ))}



      </div>
      
    </div>
  )
}

export default Subscription
