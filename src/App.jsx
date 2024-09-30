import { useState } from 'react'
import { InputBox } from './components'
import useCurrInfo from './hooks/useCurrInfo'

function App() {
    const [amount, setAmount] = useState(0)
    const [from, setFrom] = useState("usd")
    const [to, setTo] = useState("inr")
    const [convertedAmount, setConvertedAmount] = useState(0)
    const currencyInfo = useCurrInfo(from)
    const [isClicked, setIsClicked] = useState(false);

    const handleSubmit = (e) => {
          e.preventDefault();
          setIsClicked(true);
          setTimeout(() => {
              setIsClicked(false);
              convert();
          }, 300); 
        };

    const swap = () => {
        // Swapping the currencies
        const tempFrom = from
        const tempAmount = amount
        setFrom(to)
        setTo(tempFrom)
        setAmount(convertedAmount)
        setConvertedAmount(tempAmount)
    }

    const convert = () => {
        if (currencyInfo[to]) {
            setConvertedAmount(amount * currencyInfo[to])
        }
    }
    const handleAmountChange = (value) => {
      let sanitizedValue = value.toString().replace(/^0+(?!$)/, '');
      if (sanitizedValue === '') {
          setAmount(''); 
      } else {
          setAmount(sanitizedValue);
      }
  };

    const options = Object.keys(currencyInfo)

    return (
        <div
            className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat"
            style={{
                backgroundImage: `url('https://img.freepik.com/premium-vector/global-currency-background_115579-405.jpg')`,
            }}
        >
            <div className="w-full">
                <div className="w-full max-w-md mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/30">
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            convert();
                        }}
                    >
                        <div className="w-full mb-1">
                            <InputBox
                                label="From"
                                amount={amount}
                                currencyOptions={options}
                                onCurrencyChange={(currency) => setFrom(currency)}
                                selectCurrency={from}
                                onAmountChange={handleAmountChange}
                            />
                        </div>
                        <div className="relative w-full h-0.5">
                            <button
                                type="button"
                                className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-blue-600 text-white px-2 py-0.5"
                                onClick={swap}
                            >
                                swap
                            </button>
                        </div>
                        <div className="w-full mt-1 mb-4">
                            <InputBox
                                label="To"
                                amount={convertedAmount}
                                currencyOptions={options}
                                onCurrencyChange={(currency) => setTo(currency)}
                                selectCurrency={to}
                                disabled
                            />
                        </div>
                        <button
                              type="submit"
                              className={`w-full bg-blue-600 text-white px-4 py-3 rounded-lg transition-all duration-150 ${
                                  isClicked ? 'bg-blue-800 scale-95' : 'hover:bg-blue-700'
                              }`}
                              onClick={handleSubmit}
                          >
                              Convert {from.toUpperCase()} to {to.toUpperCase()}
                          </button>


                    </form>
                </div>
            </div>
        </div>
    )
}

export default App
