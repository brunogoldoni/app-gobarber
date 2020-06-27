import styled from 'styled-components/native';
import { Platform } from 'react-native';
import { getBottomSpace } from 'react-native-iphone-x-helper';

export const Container = styled.View`
    align-items: center;
    flex: 1;
    justify-content: center;
    padding: 0 30px ${Platform.OS === 'android' ? 150 : 40}px;
`;

export const Title = styled.Text`
    color: #f4ede8;
    font-size: 24px;
    font-family: 'RobotoSlab-Medium';
    margin: 50px 0 14px;
`;

export const BackToSignInButton = styled.TouchableOpacity`
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

export const BackToSignInButtonText = styled.Text`
    color: #ffffff;
    font-family: 'RobotoSlab-Regular';
    font-size: 12px;
    margin-left: 16px;
`;
