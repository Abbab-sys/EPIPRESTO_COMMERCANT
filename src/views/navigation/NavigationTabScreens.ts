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
    iconName: 'database',
  },
  {
    title: ORDERS_TITLE_KEY,
    navigationName: 'Orders',
    component: Orders,
    iconName: 'shopping-cart',
  },
  {
    title: SETTINGS_TITLE_KEY,
    navigationName: 'Settings',
    component: Settings,
    iconName: 'cog',
  },
  {
    title: 'Chat',
    navigationName: 'Chat',
    component: AllChats,
    iconName: 'comment',
  },
];
