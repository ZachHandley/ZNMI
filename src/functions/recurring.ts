import { z } from "zod";
import { RecurringApi } from "../api/recurringApi.js";
import {
  AddRecurringPlanSchema,
  EditRecurringPlanSchema,
  AddSubscriptionToExistingPlanSchema,
  AddCustomSubscriptionSchema,
  AddSubscriptionToExistingPlanRequestSchema,
  UpdateSubscriptionSchema,
  DeleteSubscriptionRequestSchema,
  type AddRecurringPlan,
  type EditRecurringPlan,
  type AddSubscriptionToExistingPlan,
  type AddCustomSubscription,
  type UpdateSubscription,
  type DeleteSubscriptionRequest,
} from "../types/recurringRequest.js";
import { type RecurringResponse } from "../types/responseTypes.js";

export class Recurring {
  recurringApi: RecurringApi;
  _securityKey: string;

  constructor(securityKey: string) {
    this.recurringApi = new RecurringApi(securityKey);
    this._securityKey = securityKey;
  }

  async addRecurringPlan(
    planDetails?: {
      plan_name: string;
      plan_amount: number;
      plan_id: string;
      day_frequency?: number;
      month_frequency?: number;
      day_of_month?: number;
    },
    planData?: Partial<AddRecurringPlan>
  ): Promise<{
    status: number;
    data?: RecurringResponse;
    message: string;
  }> {
    try {
      if (!planDetails && !planData) {
        return {
          status: 400,
          message: "Invalid request",
        };
      }
      const {
        plan_name,
        plan_amount,
        plan_id,
        day_frequency,
        month_frequency,
        day_of_month,
      } = planDetails || {};
      if (!day_frequency && (!month_frequency || !day_of_month)) {
        throw new Error(
          "at least one of day_frequency or month_frequency and day_of_month is required"
        );
      } else if (day_frequency && (month_frequency || day_of_month)) {
        throw new Error(
          "day_frequency and month_frequency/day_of_month are mutually exclusive"
        );
      }
      const parsed = AddRecurringPlanSchema.safeParse({
        recurring: "add_plan",
        plan_payments: 0,
        ...planDetails,
        ...planData,
      });
      if (!parsed.success) {
        return {
          status: 400,
          message: `Invalid input data for addRecurringPlan: ${parsed.error.message}`,
        };
      }
      const planRequest: AddRecurringPlan = parsed.data;
      const result = await this.recurringApi.createRecurringPlan(planRequest);
      return {
        status: 200,
        data: result,
        message: "Recurring plan added successfully",
      };
    } catch (error: any) {
      console.log(error);
      return {
        status: 500,
        message: `Error in addRecurringPlan ${error.message}`,
      };
    }
  }

  async editRecurringPlan(
    planDetails?: {
      current_plan_id: string;
      plan_name?: string;
      plan_amount?: number;
      plan_payments?: number;
      day_frequency?: number;
      month_frequency?: number;
      day_of_month?: number;
    },
    planData?: Partial<EditRecurringPlan>
  ): Promise<{
    status: number;
    data?: RecurringResponse;
    message: string;
  }> {
    try {
      if (!planDetails && !planData) {
        return {
          status: 400,
          message: "Invalid request",
        };
      }
      const parsed = EditRecurringPlanSchema.safeParse({
        recurring: "edit_plan",
        ...planDetails,
        ...planData,
      });
      if (!parsed.success) {
        return {
          status: 400,
          message: `Invalid input data for editRecurringPlan: ${parsed.error.message}`,
        };
      }
      const planRequest: EditRecurringPlan = parsed.data;
      const result = await this.recurringApi.editRecurringPlan(planRequest);
      return {
        status: 200,
        data: result,
        message: "Recurring plan edited successfully",
      };
    } catch (error: any) {
      console.log(error);
      return {
        status: 500,
        message: `Error in editRecurringPlan ${error.message}`,
      };
    }
  }

  async addCustomSubscriptionByCc(
    subscriptionData?: {
      plan_id: string;
      start_date: string;
      amount: number;
      first_name: string;
      last_name: string;
      address1: string;
      city: string;
      state: string;
      zip: string;
      country: string;
      phone: string;
      email: string;
      ccnumber: string;
      ccexp: string;
      cvv?: string;
      day_frequency?: number;
      month_frequency?: number;
      day_of_month?: number;
    },
    additionalData?: Partial<AddSubscriptionToExistingPlan>
  ): Promise<{
    status: number;
    data?: RecurringResponse;
    message: string;
  }> {
    try {
      if (!subscriptionData && !additionalData) {
        return {
          status: 400,
          message: "Invalid request",
        };
      }
      const parsed = AddSubscriptionToExistingPlanSchema.safeParse({
        recurring: "add_subscription",
        payment: "creditcard",
        ...subscriptionData,
        ...additionalData,
      });
      if (!parsed.success) {
        return {
          status: 400,
          message: `Invalid input data for addCustomSubscriptionByCc: ${parsed.error.message}`,
        };
      }
      const subscriptionRequest = parsed.data;
      const result = await this.recurringApi.addSubscriptionToExistingPlan(
        subscriptionRequest
      );
      return {
        status: 200,
        data: result,
        message: "Custom subscription added successfully",
      };
    } catch (error: any) {
      console.log(error);
      return {
        status: 500,
        message: `Error in addCustomSubscriptionByCc ${error.message}`,
      };
    }
  }

  async addCustomSubscriptionByAch(
    subscriptionData?: {
      plan_id: string;
      start_date: string;
      amount: number;
      first_name: string;
      last_name: string;
      address1: string;
      city: string;
      state: string;
      zip: string;
      country: string;
      phone: string;
      email: string;
      account_type: string;
      routing: string;
      account: string;
      fullNameOnAccount: string;
      day_frequency?: number;
      month_frequency?: number;
      day_of_month?: number;
    },
    additionalData?: Partial<AddCustomSubscription>
  ): Promise<{
    status: number;
    data?: RecurringResponse;
    message: string;
  }> {
    try {
      if (!subscriptionData && !additionalData) {
        return {
          status: 400,
          message: "Invalid request",
        };
      }
      const parsed = AddCustomSubscriptionSchema.safeParse({
        recurring: "add_subscription",
        payment: "check",
        ...subscriptionData,
        ...additionalData,
      });
      if (!parsed.success) {
        return {
          status: 400,
          message: `Invalid input data for addCustomSubscriptionByAch: ${parsed.error.message}`,
        };
      }
      const subscriptionRequest = parsed.data;
      const result = await this.recurringApi.addCustomSubscription(
        subscriptionRequest
      );
      return {
        status: 200,
        data: result,
        message: "Subscription updated successfully",
      };
    } catch (error: any) {
      console.log(error);
      return {
        status: 500,
        message: `Error in addCustomSubscriptionByAch ${error.message}`,
      };
    }
  }

  async addSubscriptionToExistingPlan(
    subscriptionData?: {
      plan_id: string;
      start_date?: string;
      amount?: number;
      payment?: "creditcard" | "check";
      day_frequency?: number;
      month_frequency?: number;
      day_of_month?: number;
    },
    additionalData?: Partial<AddSubscriptionToExistingPlan>
  ): Promise<{
    status: number;
    data?: RecurringResponse;
    message: string;
  }> {
    try {
      if (!subscriptionData && !additionalData) {
        return {
          status: 400,
          message:
            "Invalid request: either subscriptionData or additionalData is required",
        };
      }

      // Ensure plan_id is provided
      if (!subscriptionData?.plan_id) {
        return {
          status: 400,
          message: "Invalid request: plan_id is required",
        };
      }

      // Validate frequency parameters
      if (
        (subscriptionData?.day_frequency &&
          subscriptionData?.month_frequency) ||
        (subscriptionData?.day_frequency && subscriptionData?.day_of_month) ||
        (subscriptionData?.month_frequency && !subscriptionData?.day_of_month)
      ) {
        return {
          status: 400,
          message:
            "Invalid frequency configuration: day_frequency cannot be used with month_frequency or day_of_month, and month_frequency requires day_of_month",
        };
      }

      const parsed = AddSubscriptionToExistingPlanRequestSchema.safeParse({
        recurring: "add_subscription",
        ...subscriptionData,
        ...additionalData,
        // Convert amount to string if provided
        ...(subscriptionData?.amount && {
          plan_amount: subscriptionData.amount.toFixed(2),
        }),
        // Format start_date if provided
        ...(subscriptionData?.start_date && {
          start_date: subscriptionData.start_date.replace(/-/g, ""),
        }),
      });

      if (!parsed.success) {
        return {
          status: 400,
          message: `Invalid input data: ${parsed.error.message}`,
        };
      }

      const subscriptionRequest = parsed.data;
      const result = await this.recurringApi.addSubscriptionToExistingPlan(
        subscriptionRequest
      );

      return {
        status: 200,
        data: result,
        message: "Subscription added successfully",
      };
    } catch (error: any) {
      console.error("Error in addSubscriptionToExistingPlan:", error);
      return {
        status: 500,
        message: `Error adding subscription: ${error.message}`,
      };
    }
  }

  async updateSubscription(
    subscriptionData?: {
      subscription_id: string;
      amount?: number;
      plan_payments?: number;
      day_frequency?: number;
      month_frequency?: number;
      day_of_month?: number;
    },
    additionalData?: Partial<UpdateSubscription>
  ): Promise<{
    status: number;
    data?: RecurringResponse;
    message: string;
  }> {
    try {
      if (!subscriptionData && !additionalData) {
        return {
          status: 400,
          message: "Invalid request",
        };
      }
      const parsed = UpdateSubscriptionSchema.safeParse({
        recurring: "update_subscription",
        ...subscriptionData,
        ...additionalData,
      });
      if (!parsed.success) {
        return {
          status: 400,
          message: `Invalid input data for updateSubscription: ${parsed.error.message}`,
        };
      }
      const subscriptionRequest = parsed.data;
      const result = await this.recurringApi.updateSubscription(
        subscriptionRequest
      );
      return {
        status: 200,
        data: result,
        message: "Subscription updated successfully",
      };
    } catch (error: any) {
      console.log(error);
      return {
        status: 500,
        message: `Error in updateSubscription ${error.message}`,
      };
    }
  }

  async deleteSubscription(
    subscriptionData?: {
      subscription_id: string;
    },
    additionalData?: Partial<DeleteSubscriptionRequest>
  ): Promise<{
    status: number;
    data?: RecurringResponse;
    message: string;
  }> {
    try {
      if (!subscriptionData && !additionalData) {
        return {
          status: 400,
          message: "Invalid request",
        };
      }
      const parsed = DeleteSubscriptionRequestSchema.safeParse({
        recurring: "delete_subscription",
        ...subscriptionData,
        ...additionalData,
      });
      if (!parsed.success) {
        return {
          status: 400,
          message: `Invalid input data for deleteSubscription: ${parsed.error.message}`,
        };
      }
      const deleteRequest = parsed.data;
      const result = await this.recurringApi.deleteSubscription(deleteRequest);
      return {
        status: 200,
        data: result,
        message: "Subscription deleted successfully",
      };
    } catch (error: any) {
      console.log(error);
      return {
        status: 500,
        message: `Error in deleteSubscription ${error.message}`,
      };
    }
  }
}
