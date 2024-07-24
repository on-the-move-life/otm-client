import React, { useRef } from 'react';
import useLocalStorage from '../../hooks/useLocalStorage';

const DataInputComponent = ({
    inputId,
    inputType,
    inputOptions,
    placeholder,
    label,
    // value,
    twClasses,
    options,
    unitId
}) => {
    const selectInputRef = useRef('');
    const textInputRef = useRef('');
    const [storedValue, setValue, getItem] = useLocalStorage(inputId, '');
    const [storedUnitValue, setUnitValue, getUnitValue] = useLocalStorage(unitId, '');
    const [storedInputValues, setStoredInputValues, getStoredInputValues] = useLocalStorage('inputIds', []);

    const handleInputChange = (value, inputId) => {
        inputId.includes('unit') ? setUnitValue(value) : setValue(value);

        // add the inputId to the storedInputValues array if it's not already there
        const inputIds = getStoredInputValues();
        if (inputIds !== null && !inputIds.includes(inputId)) {
            setStoredInputValues([...inputIds, inputId]);
        }
        else if (inputIds === null) {
            setStoredInputValues([inputId]);
        }
    };


    const inputDropdownStyle = {
        backgroundColor: '#0F0F0F',
        color: 'white',
        width: '10px',
    };

    twClasses = twClasses
        ? twClasses
        : 'w-full border-b border-gray-400 bg-transparent py-2 text-white outline-none focus:border-blue-500';

    // Set default value to an empty string if not provided
    const value = storedValue !== undefined ? storedValue : '';
    const unitValue = storedUnitValue !== undefined ? storedUnitValue : '';

    return (
        <div className="py-4">
            {/* !inputId.includes('unit') -> this check is to prevent the rendering of unit dataInput element */}
            {inputType === 'select' && !inputId.includes('unit') ? (
                <>
                    <label
                        className="text-xs tracking-widest text-lightGray"
                        htmlFor={inputId}
                    >
                        {label}
                    </label>

                    <select
                        className={twClasses}
                        id={inputId}
                        name={inputId}
                        value={value}
                        onChange={(e) => handleInputChange(e.target.value, inputId)}
                        label={label}
                        ref={selectInputRef}
                    >
                        {inputOptions.map((option) => (
                            <option key={option} value={option} style={inputDropdownStyle}>
                                {option}
                            </option>
                        ))}
                    </select>
                </>
            ) : inputType === 'textarea' ? (
                <>
                    <label
                        className="text-xs tracking-widest text-lightGray"
                        htmlFor={inputId}
                    >
                        {label}
                    </label>
                    <textarea
                        className="textbox outline-none"
                        rows={1}
                        id={inputId}
                        name={inputId}
                        value={value}
                        onChange={(e) => handleInputChange(e.target.value, inputId)}
                        placeholder={placeholder}
                        label={label}
                        ref={textInputRef}
                    ></textarea>
                </>
            ) : (inputType === "number" && inputId.includes('load')) ? (
                <div className='w-full'>
                    <label className="text-gray-600 text-sm">
                        {label}
                    </label>
                    <div className="w-full relative mt-2 text-gray-500">
                        {options !== null && 
                        <div className="absolute inset-y-0 left-3 my-auto h-6 flex items-center border-r pr-2">
                            <select className="text-sm outline-none rounded-lg h-full bg-transparent" value={unitValue} onChange={(e) => {
                                // this sets the value of unit
                                handleInputChange(e.target.value, unitId)
                            }}>
                                {
                                    options && options.map(option => {
                                        return <option>{option}</option>
                                    })
                                }
                            </select>
                        </div>}
                        <input type="number" placeholder={placeholder} value={value} pattern={"[0-9.+-e]"} className="textbox-kginput w-full pl-[4.5rem] pr-3 py-2 text-[#b1b1b1] appearance-none bg-transparent outline-none border focus:border-slate-600 shadow-sm rounded-lg" onChange={(e) => {
                            handleInputChange(e.target.value, inputId);
                            // to selet the initial default unit if user does not explicitly chooses the unit
                            if(unitValue === ''){
                                handleInputChange(options[0], unitId);
                            }
                        }} />
                    </div>
                </div>
            ) : ( 
                !inputId.includes('unit') && 
                <>
                    <label
                        className="text-xs tracking-widest text-lightGray"
                        htmlFor={inputId}
                    >
                        {label}
                    </label>
                    <input
                        className="textbox outline-none"
                        type={inputType}
                        id={inputId}
                        name={inputId}
                        value={value}
                        onChange={(e) => handleInputChange(e.target.value, inputId)}
                        placeholder={placeholder}
                    />
                </>
            )}
        </div>
    );
};

export default DataInputComponent;