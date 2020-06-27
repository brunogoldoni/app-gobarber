import styled from 'styled-components/native';
import { getBottomSpace } from 'react-native-iphone-x-helper';

export const Container = styled.View`
    align-items: center;
    flex: 1;
    justify-content: center;
    padding: 0 30px;
`;

export const Title = styled.Text`
    color: #f4ede8;
    font-size: 24px;
    font-family: 'RobotoSlab-Medium';
    margin: 40px 0 14px;
`;

export const ForgotPassword = styled.TouchableOpacity`
    margin: 20px 0 30px;
`;

export const ForgotPasswordText = styled.Text`
    color: #f4ede8;
    font-size: 12px;
    font-family: 'RobotoSlab-Regular';
`;

export const CreateAccountButton = styled.View`
    align-items: center;
    background: #312e38;
    border-color: #232129;
    border-top-width: 1px;
    bottom: 0;
    flex-direction: row;
    justify-content: center;
    left: 0;
    padding: 12px 0 ${12 + getBottomSpace()}px;
    position: absolute;
    right: 0;
`;

export const CreateAccountButtonText = styled.Text`
    color: #ff9000;
    font-family: 'RobotoSlab-Regular';
    font-size: 12px;
    margin-left: 16px;
`;
