/*
 * Name: Navigation Interfaces
 * Description: This file contains all the interfaces used in the navigation page.
 * Author: Alessandro van Reusel
 */

export interface TabScreenProps {
  title: string;
  navigationName: string;
  component: React.ComponentType<any>;
  iconName: string;
}
