import { z } from "zod";
import { RecurringApi } from "../api/recurringApi";
import {
  AddRecurringPlanSchema,
  EditRecurringPlanSchema,
  AddSubscriptionToExistingPlanSchema,
  AddCustomSubscriptionSchema,
  UpdateSubscriptionSchema,
  DeleteSubscriptionRequestSchema,
} from "../types/recurringRequest";
import { DefaultResponseSchema } from "../types/base";

type AddRecurringPlan = z.infer<typeof AddRecurringPlanSchema>;
type EditRecurringPlan = z.infer<typeof EditRecurringPlanSchema>;
type AddSubscriptionToExistingPlan = z.infer<
  typeof AddSubscriptionToExistingPlanSchema
>;
type AddCustomSubscription = z.infer<typeof AddCustomSubscriptionSchema>;
type UpdateSubscription = z.infer<typeof UpdateSubscriptionSchema>;
type DeleteSubscriptionRequest = z.infer<
  typeof DeleteSubscriptionRequestSchema
>;
type DefaultResponse = z.infer<typeof DefaultResponseSchema>;

export class Recurring {
  recurringApi: RecurringApi;
  _securityKey: string;

  constructor(securityKey: string) {
    this.recurringApi = new RecurringApi(securityKey);
    this._securityKey = securityKey;
  }

  async addRecurringPlan(
    planDetails?: {
      plan_name?: string;
      plan_amount?: number;
      plan_id?: string;
      day_frequency?: number;
      month_frequency?: number;
      day_of_month?: number;
    },
    planData?: Partial<AddRecurringPlan>
  ): Promise<{
    status: number;
    data?: DefaultResponse;
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
      const planRequest: AddRecurringPlan = AddRecurringPlanSchema.parse({
        recurring: "add_plan",
        plan_payments: 0,
        ...planDetails,
        ...planData,
      });
      const result = await this.recurringApi.createRecurringPlan(planRequest);
      return {
        status: 200,
        data: result.data,
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
      plan_id?: string;
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
    data?: DefaultResponse;
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
        plan_id,
        plan_name,
        plan_amount,
        plan_payments,
        day_frequency,
        month_frequency,
        day_of_month,
      } = planDetails || {};
      if (!plan_name && !plan_amount && !plan_payments) {
        throw new Error(
          "at least one of plan_name or plan_amount or plan_payments is required"
        );
      } else if (day_frequency && (month_frequency || day_of_month)) {
        throw new Error(
          "day_frequency and month_frequency/day_of_month are mutually exclusive"
        );
      }
      const planRequest: EditRecurringPlan = EditRecurringPlanSchema.parse({
        recurring: "edit_plan",
        ...planDetails,
        ...planData,
      });
      const result = await this.recurringApi.editRecurringPlan(planRequest);
      return {
        status: 200,
        data: result.data,
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
    data?: DefaultResponse;
    message: string;
  }> {
    try {
      if (!subscriptionData && !additionalData) {
        return {
          status: 400,
          message: "Invalid request",
        };
      }
      const subscriptionRequest: UpdateSubscription =
        UpdateSubscriptionSchema.parse({
          recurring: "add_subscription",
          payment: "check",
          ...subscriptionData,
          ...additionalData,
        });
      const result = await this.recurringApi.updateSubscription(
        subscriptionRequest
      );
      return {
        status: 200,
        data: result.data,
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

  async updateSubscription(
    subscriptionData?: {
      subscription_id: string;
      amount: number;
      plan_payments?: number;
      day_frequency?: number;
      month_frequency?: number;
      day_of_month?: number;
    },
    additionalData?: Partial<UpdateSubscription>
  ): Promise<{
    status: number;
    data?: DefaultResponse;
    message: string;
  }> {
    try {
      if (!subscriptionData && !additionalData) {
        return {
          status: 400,
          message: "Invalid request",
        };
      }
      const subscriptionRequest: UpdateSubscription =
        UpdateSubscriptionSchema.parse({
          recurring: "update_subscription",
          ...subscriptionData,
          ...additionalData,
        });
      const result = await this.recurringApi.updateSubscription(
        subscriptionRequest
      );
      return {
        status: 200,
        data: result.data,
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
    data?: DefaultResponse;
    message: string;
  }> {
    try {
      if (!subscriptionData && !additionalData) {
        return {
          status: 400,
          message: "Invalid request",
        };
      }
      const deleteRequest: DeleteSubscriptionRequest =
        DeleteSubscriptionRequestSchema.parse({
          recurring: "delete_subscription",
          ...subscriptionData,
          ...additionalData,
        });
      const result = await this.recurringApi.deleteSubscription(deleteRequest);
      return {
        status: 200,
        data: result.data,
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
