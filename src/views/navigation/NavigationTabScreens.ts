import {TabScreenProps} from '../../interfaces/NavigationInterfaces';
import {HOME_TITLE_KEY} from '../../translations/keys/HomeTranslationKeys';
import {INVENTORY_TITLE_KEY} from '../../translations/keys/InventoryTranslationKeys';
import {SETTINGS_TITLE_KEY} from '../../translations/keys/SettingsTranslationsKeys';
import AllChats from '../chat/AllChats';
import Home from '../home/Home';
import Inventory from '../inventory/Inventory';
import Settings from '../settings/Settings';
import {ORDERS_TITLE_KEY} from '../../translations/keys/OrdersTranslationKeys';
import Orders from '../orders/Orders';
import Analytics from '../analytics/Analytics';
import {ANALYTICS_TITLE_KEY} from '../../translations/keys/AnalyticsTranslationKeys';
import {CHATS_TITLE_KEY} from '../../translations/keys/ChatTranslationKeys';

/*
 * Name : Navigation Tab Screens
 * Description : This file contains all the sections that are used in the tab navigation
 * Author : Khalil Zriba, Adam Naoui-Busson, Zouhair Derouich, Alessandro van Reusel
 */

export const NavigationTabScreens: TabScreenProps[] = [
  {
    title: HOME_TITLE_KEY,
    navigationName: 'Home',
    component: Home,
    iconName: 'home',
  },
  {
    title: INVENTORY_TITLE_KEY,
    navigationName: 'Inventory',
    component: Inventory,
    iconName: 'inventory',
  },
  {
    title: ORDERS_TITLE_KEY,
    navigationName: 'Orders',
    component: Orders,
    iconName: 'shopping-cart',
  },
  {
    title: ANALYTICS_TITLE_KEY,
    navigationName: 'Analytics',
    component: Analytics,
    iconName: 'bar-chart',
  },
  {
    title: CHATS_TITLE_KEY,
    navigationName: 'Chat',
    component: AllChats,
    iconName: 'comment',
  },
  {
    title: SETTINGS_TITLE_KEY,
    navigationName: 'Settings',
    component: Settings,
    iconName: 'settings',
  },
];
