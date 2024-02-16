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
    plan_name: string,
    plan_amount: number,
    plan_id: string,
    day_frequency?: number,
    month_frequency?: number,
    day_of_month?: number,
    planData?: Partial<AddRecurringPlan>
  ): Promise<{
    status: number;
    data?: DefaultResponse;
    message: string;
  }> {
    try {
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
        plan_name: plan_name,
        plan_amount: plan_amount,
        plan_id: plan_id,
        plan_payments: 0,
        day_frequency: day_frequency,
        month_frequency: month_frequency,
        day_of_month: day_of_month,
        security_key: this._securityKey,
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
    plan_id: string,
    plan_name?: string,
    plan_amount?: number,
    plan_payments?: number,
    day_frequency?: number,
    month_frequency?: number,
    day_of_month?: number,
    planData?: Partial<EditRecurringPlan>
  ): Promise<{
    status: number;
    data?: DefaultResponse;
    message: string;
  }> {
    try {
      if (!plan_name && !plan_amount && !plan_payments) {
        throw new Error(
          "at least one of plan_name or plan_amount or plan_payments is required"
        );
      } else if (plan_payments && (day_frequency || month_frequency)) {
        throw new Error(
          "plan_payments and day_frequency/month_frequency are mutually exclusive"
        );
      }
      const planRequest: EditRecurringPlan = EditRecurringPlanSchema.parse({
        recurring: "edit_plan",
        plan_id: plan_id,
        plan_name: plan_name,
        plan_amount: plan_amount,
        plan_payments: plan_payments,
        day_frequency: day_frequency,
        month_frequency: month_frequency,
        day_of_month: day_of_month,
        security_key: this._securityKey,
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

  /**
   * Adds a subscription to an existing plan
   * Needs plan_id, start date, and payment details of some form
   */
  async addSubscriptionToExistingPlanByCreditCard(
    plan_id: string,
    start_date: string,
    first_name: string,
    last_name: string,
    address1: string,
    city: string,
    state: string,
    zip: string,
    country: string,
    phone: string,
    cc_number: string,
    cc_exp: string,
    subscriptionData?: Partial<AddSubscriptionToExistingPlan>
  ): Promise<{
    status: number;
    data?: DefaultResponse;
    message: string;
  }> {
    try {
      const subscriptionRequest: AddSubscriptionToExistingPlan =
        AddSubscriptionToExistingPlanSchema.parse({
          recurring: "add_subscription",
          payment: "creditcard",
          plan_id: plan_id,
          start_date: start_date,
          first_name: first_name,
          last_name: last_name,
          address1: address1,
          city: city,
          state: state,
          zip: zip,
          country: country,
          phone: phone,
          ccnumber: cc_number,
          ccexp: cc_exp,
          security_key: this._securityKey,
          ...subscriptionData,
        });
      const result = await this.recurringApi.addSubscriptionToExistingPlan(
        subscriptionRequest
      );
      return {
        status: 200,
        data: result.data,
        message: "Subscription added to existing plan successfully",
      };
    } catch (error: any) {
      console.log(error);
      return {
        status: 500,
        message: `Error in addSubscriptionToExistingPlan ${error.message}`,
      };
    }
  }

  async addSubscriptionToExistingPlanByAch(
    plan_id: string,
    start_date: string,
    first_name: string,
    last_name: string,
    address1: string,
    city: string,
    state: string,
    zip: string,
    country: string,
    phone: string,
    account_type: string,
    routing: string,
    account: string,
    fullNameOnAccount: string,
    subscriptionData?: Partial<AddSubscriptionToExistingPlan>
  ): Promise<{
    status: number;
    data?: DefaultResponse;
    message: string;
  }> {
    try {
      const subscriptionRequest: AddSubscriptionToExistingPlan =
        AddSubscriptionToExistingPlanSchema.parse({
          recurring: "add_subscription",
          payment: "check",
          plan_id: plan_id,
          start_date: start_date,
          first_name: first_name,
          last_name: last_name,
          address1: address1,
          city: city,
          state: state,
          zip: zip,
          country: country,
          phone: phone,
          account_type: account_type,
          checkaba: routing,
          checkaccount: account,
          checkname: fullNameOnAccount,
          security_key: this._securityKey,
          ...subscriptionData,
        });
      const result = await this.recurringApi.addSubscriptionToExistingPlan(
        subscriptionRequest
      );
      return {
        status: 200,
        data: result.data,
        message: "Subscription added to existing plan successfully",
      };
    } catch (error: any) {
      console.log(error);
      return {
        status: 500,
        message: `Error in addSubscriptionToExistingPlan ${error.message}`,
      };
    }
  }

  async addCustomSubscription(
    subscriptionData: Partial<AddCustomSubscription>
  ): Promise<{
    status: number;
    data?: DefaultResponse;
    message: string;
  }> {
    try {
      const subscriptionRequest: AddCustomSubscription =
        AddCustomSubscriptionSchema.parse({
          ...subscriptionData,
          security_key: this._securityKey,
        });
      const result = await this.recurringApi.addCustomSubscription(
        subscriptionRequest
      );
      return {
        status: 200,
        data: result.data,
        message: "Custom subscription added successfully",
      };
    } catch (error: any) {
      console.log(error);
      return {
        status: 500,
        message: `Error in addCustomSubscription ${error.message}`,
      };
    }
  }

  async updateSubscription(
    subscriptionData: Partial<UpdateSubscription>
  ): Promise<{
    status: number;
    data?: DefaultResponse;
    message: string;
  }> {
    try {
      const subscriptionRequest: UpdateSubscription =
        UpdateSubscriptionSchema.parse({
          ...subscriptionData,
          security_key: this._securityKey,
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
    subscriptionData: Partial<DeleteSubscriptionRequest>
  ): Promise<{
    status: number;
    data?: DefaultResponse;
    message: string;
  }> {
    try {
      const deleteRequest: DeleteSubscriptionRequest =
        DeleteSubscriptionRequestSchema.parse({
          ...subscriptionData,
          security_key: this._securityKey,
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
