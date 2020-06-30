import React, {
    useState,
    useCallback,
    useEffect,
    useRef,
    useImperativeHandle,
    forwardRef,
} from 'react';

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

interface InputRef {
    focus(): void;
}

const Input: React.RefForwardingComponent<InputRef, InputProps> = (
    { name, icon, ...rest },
    ref,
) => {
    const inputElementRef = useRef<any>(null);

    const { registerField, defaultValue = '', fieldName, error } = useField(
        name,
    );
    const inputValueRef = useRef<InputValueReference>({ value: defaultValue });

    const [isFilled, setIsFilled] = useState(false);
    const [isFocused, setIsFocused] = useState(false);

    const handleInputFocus = useCallback(() => {
        setIsFocused(true);
    }, []);

    const handleInputBlur = useCallback(() => {
        setIsFocused(false);

        setIsFilled(!!inputValueRef.current.value);
    }, []);

    useImperativeHandle(ref, () => ({
        focus() {
            inputElementRef.current.focus();
        },
    }));

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
        <Container isFocused={isFocused}>
            <Icon
                size={20}
                name={icon}
                color={isFocused || isFilled ? '#ff9000' : '#666360'}
            />

            <TextInput
                ref={inputElementRef}
                onBlur={handleInputBlur}
                keyboardAppearance="dark"
                onFocus={handleInputFocus}
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

export default forwardRef(Input);
