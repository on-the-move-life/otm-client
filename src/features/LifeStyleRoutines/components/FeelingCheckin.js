import React from 'react'

const FeelingCheckin = () => {

    const [feeling, setFeeling] = useState(null);

    return (
        <div className="mb-6">
            <h3 className="text-lg mb-2 pb-4 leading-8 font-sfpro">Feeling Check-In</h3>
            <div className="flex justify-between">
                {['😡', '😟', '😐', '😊', '😍'].map((emoji, index) => (
                    <button
                        key={index}
                        onClick={() => setFeeling(index)}
                        className={`p-2 rounded-full ${feeling === index ? 'bg-green-600' : 'bg-gray-800'
                            }`}
                    >
                        {emoji}
                    </button>
                ))}
            </div>
        </div>
    )
}

export default FeelingCheckin