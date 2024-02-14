import {
  AddRecurringPlanSchema,
  EditRecurringPlanSchema,
  AddSubscriptionToExistingPlanSchema,
  AddCustomSubscriptionSchema,
  UpdateSubscriptionSchema,
  DeleteSubscriptionRequestSchema,
  RECURRING_URL,
} from "../types/recurringRequest";
import { z } from "zod";
import { PostRequest } from "./utils";

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

export class Recurring {
  _securityKey: string;

  constructor(securityKey: string) {
    this._securityKey = securityKey;
  }

  beforeRequest = (request: any) => {
    return {
      ...request,
      securityKey: this._securityKey,
    };
  };

  createRecurringPlan = async (addRecurringPlan: AddRecurringPlan) => {
    const request = this.beforeRequest(addRecurringPlan);
    return PostRequest(RECURRING_URL, request);
  };

  editRecurringPlan = async (editRecurringPlan: EditRecurringPlan) => {
    const request = this.beforeRequest(editRecurringPlan);
    return PostRequest(RECURRING_URL, request);
  };

  addSubscriptionToExistingPlan = async (
    addSubscriptionToExistingPlan: AddSubscriptionToExistingPlan
  ) => {
    const request = this.beforeRequest(addSubscriptionToExistingPlan);
    return PostRequest(RECURRING_URL, request);
  };

  addCustomSubscription = async (
    addCustomSubscription: AddCustomSubscription
  ) => {
    const request = this.beforeRequest(addCustomSubscription);
    return PostRequest(RECURRING_URL, request);
  };

  updateSubscription = async (updateSubscription: UpdateSubscription) => {
    const request = this.beforeRequest(updateSubscription);
    return PostRequest(RECURRING_URL, request);
  };

  deleteSubscription = async (
    deleteSubscriptionRequest: DeleteSubscriptionRequest
  ) => {
    const request = this.beforeRequest(deleteSubscriptionRequest);
    return PostRequest(RECURRING_URL, request);
  };
}
