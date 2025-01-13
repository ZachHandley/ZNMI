import {
  AddRecurringPlanSchema,
  EditRecurringPlanSchema,
  AddSubscriptionToExistingPlanSchema,
  AddCustomSubscriptionSchema,
  UpdateSubscriptionSchema,
  DeleteSubscriptionRequestSchema,
  RECURRING_URL,
} from "../types/recurringRequest.js";
import { RecurringResponseSchema } from "../types/responseTypes.js";
import { z } from "zod";
import { PostRequest } from "./utils.js";

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

export class RecurringApi {
  _securityKey: string;

  constructor(securityKey: string) {
    this._securityKey = securityKey;
  }

  beforeRequest = (request: any) => {
    return {
      ...request,
      security_key: this._securityKey,
    };
  };

  parseResponse = (data: any) => {
    return RecurringResponseSchema.parse(data);
  };

  createRecurringPlan = async (addRecurringPlan: AddRecurringPlan) => {
    const request = this.beforeRequest(addRecurringPlan);
    const response = await PostRequest(RECURRING_URL, request);
    return this.parseResponse(response.data);
  };

  editRecurringPlan = async (editRecurringPlan: EditRecurringPlan) => {
    const request = this.beforeRequest(editRecurringPlan);
    const response = await PostRequest(RECURRING_URL, request);
    return this.parseResponse(response.data);
  };

  addSubscriptionToExistingPlan = async (
    addSubscriptionToExistingPlan: AddSubscriptionToExistingPlan
  ) => {
    const request = this.beforeRequest(addSubscriptionToExistingPlan);
    const response = await PostRequest(RECURRING_URL, request);
    return this.parseResponse(response.data);
  };

  addCustomSubscription = async (
    addCustomSubscription: AddCustomSubscription
  ) => {
    const request = this.beforeRequest(addCustomSubscription);
    const response = await PostRequest(RECURRING_URL, request);
    return this.parseResponse(response.data);
  };

  updateSubscription = async (updateSubscription: UpdateSubscription) => {
    const request = this.beforeRequest(updateSubscription);
    const response = await PostRequest(RECURRING_URL, request);
    return this.parseResponse(response.data);
  };

  deleteSubscription = async (
    deleteSubscriptionRequest: DeleteSubscriptionRequest
  ) => {
    const request = this.beforeRequest(deleteSubscriptionRequest);
    const response = await PostRequest(RECURRING_URL, request);
    return this.parseResponse(response.data);
  };
}
