import React, { useEffect, useRef } from 'react';

import { TextInputProps } from 'react-native';

import { useField } from '@unform/core';

import { Container, TextInput, Icon } from './styles';

interface InputProps extends TextInputProps {
    name: string;
    icon: string;
}

interface InputValueReference {
    value: string;
}

const Input: React.FC<InputProps> = ({ name, icon, ...rest }) => {
    const inputElementRef = useRef<any>(null);

    const { registerField, defaultValue = '', fieldName, error } = useField(
        name,
    );
    const inputValueRef = useRef<InputValueReference>({ value: defaultValue });

    useEffect(() => {
        registerField<string>({
            path: 'value',
            name: fieldName,
            ref: inputValueRef.current,
            setValue(ref: any, value) {
                inputValueRef.current.value = value;
                inputElementRef.current.setNativeProps({ text: value });
            },
            clearValue() {
                inputValueRef.current.value = '';
                inputElementRef.current.clear();
            },
        });
    }, [fieldName, registerField]);

    return (
        <Container>
            <Icon name={icon} size={20} color="#666360" />

            <TextInput
                ref={inputElementRef}
                keyboardAppearance="dark"
                defaultValue={defaultValue}
                placeholderTextColor="#666360"
                onChangeText={(value) => {
                    inputValueRef.current.value = value;
                }}
                {...rest}
            />
        </Container>
    );
};

export default Input;
