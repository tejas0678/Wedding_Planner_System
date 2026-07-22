import { useState, useEffect } from 'react'
import PaymentForm from '../components/PaymentForm'
import { MdHistory } from 'react-icons/md'

export default function Payments() {
  const [paymentHistory, setPaymentHistory] = useState([])
  const [loading, setLoading] = useState(true)

  // Fetch payment history from API
  useEffect(() => {
    const fetchPaymentHistory = async () => {
      try {
        // Replace with actual API call
        // const response = await fetch('/api/payments/history')
        // const data = await response.json()
        // setPaymentHistory(data)
        
        // For now, using empty array to show no data state
        setPaymentHistory([])
        setLoading(false)
      } catch (error) {
        console.error('Error fetching payment history:', error)
        setLoading(false)
      }
    }

    fetchPaymentHistory()
  }, [])

  const handlePaymentSuccess = (paymentData) => {
    // Refresh payment history after successful payment
    // fetchPaymentHistory()
    console.log('Payment successful:', paymentData)
  }

  return (
    <div>
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">Payments</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Payment Form */}
        <PaymentForm onSuccess={handlePaymentSuccess} />

        {/* Payment History */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-5">
            <MdHistory size={20} className="text-[#EC0B72]" />
            <h2 className="text-lg font-bold text-gray-900">Payment History</h2>
          </div>
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <p className="text-sm text-gray-400">Loading payment history...</p>
            </div>
          ) : paymentHistory.length === 0 ? (
            <div className="flex items-center justify-center py-12">
              <p className="text-sm text-gray-400">No payment history found.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {paymentHistory.map((payment) => (
                <div key={payment.id} className="border-b border-gray-100 pb-3 last:border-0">
                  {/* Payment history items */}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}