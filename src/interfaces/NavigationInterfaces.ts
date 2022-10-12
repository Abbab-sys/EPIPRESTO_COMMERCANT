import { BottomTabNavigationOptions } from "@react-navigation/bottom-tabs";

export interface TabScreenProps {
    title: string;
    navigationName: string;
    component: React.ComponentType<any>;
    iconName: string;
}