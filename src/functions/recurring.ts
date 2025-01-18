import { RecurringApi } from "../api/recurringApi.js";
import {
  type AddRecurringPlan,
  type EditRecurringPlan,
  type AddSubscriptionToExistingPlan,
  type AddCustomSubscription,
  type UpdateSubscription,
  type DeleteSubscriptionRequest,
} from "../types/recurringRequest.js";
import type { RecurringResponse } from "../types/responseTypes.js";

type RecurringApiResponse<T = RecurringResponse> = {
  status: number;
  data?: T;
  message: string;
};

export class Recurring {
  recurringApi: RecurringApi;
  _securityKey: string;

  constructor(securityKey: string) {
    this._securityKey = securityKey;
    this.recurringApi = new RecurringApi(securityKey);
  }

  async createRecurringPlan(
    planData: Omit<AddRecurringPlan, "recurring">
  ): Promise<RecurringApiResponse> {
    try {
      const result = await this.recurringApi.createRecurringPlan({
        recurring: "add_plan",
        ...planData,
      });
      return {
        status: 200,
        data: result,
        message: "Recurring plan created successfully",
      };
    } catch (error: any) {
      console.log(error);
      return {
        status: 500,
        message: `Error creating recurring plan: ${error.message}`,
      };
    }
  }

  async editRecurringPlan(
    planData: Omit<EditRecurringPlan, "recurring">
  ): Promise<RecurringApiResponse> {
    try {
      const result = await this.recurringApi.editRecurringPlan({
        recurring: "edit_plan",
        ...planData,
      });
      return {
        status: 200,
        data: result,
        message: "Recurring plan updated successfully",
      };
    } catch (error: any) {
      console.log(error);
      return {
        status: 500,
        message: `Error updating recurring plan: ${error.message}`,
      };
    }
  }

  async addCustomSubscriptionByCc(
    subscriptionData: Omit<AddCustomSubscription, "recurring" | "payment">
  ): Promise<RecurringApiResponse> {
    try {
      const result = await this.recurringApi.addCustomSubscription({
        recurring: "add_subscription",
        payment: "creditcard",
        ...subscriptionData,
      });
      return {
        status: 200,
        data: result,
        message: "Custom subscription added successfully",
      };
    } catch (error: any) {
      console.log(error);
      return {
        status: 500,
        message: `Error in addCustomSubscriptionByCc: ${error.message}`,
      };
    }
  }

  async addCustomSubscriptionByAch(
    subscriptionData: Omit<AddCustomSubscription, "recurring" | "payment">
  ): Promise<RecurringApiResponse> {
    try {
      const result = await this.recurringApi.addCustomSubscription({
        recurring: "add_subscription",
        payment: "check",
        ...subscriptionData,
      });
      return {
        status: 200,
        data: result,
        message: "Custom subscription added successfully",
      };
    } catch (error: any) {
      console.log(error);
      return {
        status: 500,
        message: `Error in addCustomSubscriptionByAch: ${error.message}`,
      };
    }
  }

  async addSubscriptionToExistingPlan(
    subscriptionData: Omit<AddSubscriptionToExistingPlan, "recurring">
  ): Promise<RecurringApiResponse> {
    try {
      const result = await this.recurringApi.addSubscriptionToExistingPlan({
        recurring: "add_subscription",
        ...subscriptionData,
      });
      return {
        status: 200,
        data: result,
        message: "Subscription added successfully",
      };
    } catch (error: any) {
      console.log(error);
      return {
        status: 500,
        message: `Error adding subscription: ${error.message}`,
      };
    }
  }

  async updateSubscription(
    subscriptionData: Omit<UpdateSubscription, "recurring">
  ): Promise<RecurringApiResponse> {
    try {
      const result = await this.recurringApi.updateSubscription({
        recurring: "update_subscription",
        ...subscriptionData,
      });
      return {
        status: 200,
        data: result,
        message: "Subscription updated successfully",
      };
    } catch (error: any) {
      console.log(error);
      return {
        status: 500,
        message: `Error updating subscription: ${error.message}`,
      };
    }
  }

  async deleteSubscription(
    subscriptionData: Omit<DeleteSubscriptionRequest, "recurring">
  ): Promise<RecurringApiResponse> {
    try {
      const result = await this.recurringApi.deleteSubscription({
        recurring: "delete_subscription",
        ...subscriptionData,
      });
      return {
        status: 200,
        data: result,
        message: "Subscription deleted successfully",
      };
    } catch (error: any) {
      console.log(error);
      return {
        status: 500,
        message: `Error deleting subscription: ${error.message}`,
      };
    }
  }
}
