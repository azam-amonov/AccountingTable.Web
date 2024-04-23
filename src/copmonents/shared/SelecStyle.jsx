function custom(customStyle) {
    const customStyles = {
        control: (provided, state) => ({
            ...provided,
            width: '300px',
            border: state.isFocused ? '1px solid #000' : '1px solid #ccc',
            boxShadow: state.isFocused ? '0 0 3px rgba(0, 0, 0, 0.5)' : 'none',
        }),
        multiValue: (provided) => ({
            ...provided,
            backgroundColor: '#f0f0f0',
        }),
    };

    return customStyles; // Return the custom styles object
}

export default custom;
