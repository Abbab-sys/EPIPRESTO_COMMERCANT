/*
 * Name: Analytics Interface
 * Description: This file contains the interface for the analytics component.
 * Author: Khalil Zriba
 */

export interface AnalyticsInterface {
  totalSales: number;
  totalOrders: number;
  topProducts: [any] | null;
}
