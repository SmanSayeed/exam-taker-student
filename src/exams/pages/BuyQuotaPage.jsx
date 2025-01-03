import React from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useBuyQuotaMutation } from "@/features/quota/quotaApi";


const BuyQuotaPage = () => {
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [buyQuota, { isLoading }] = useBuyQuotaMutation();

  const handleBuyQuota = async (formData) => {
    const payload = {
      student_id: auth?.student?.id,
      mobile_number: formData.mobile_number,
      payment_method: formData.payment_method,
      transaction_id: formData.transaction_id,
      coupon: formData.coupon || null,
    };

    try {
      const response = await buyQuota(payload).unwrap();
      toast.success("Quota purchased successfully!");
      navigate("/exams"); // Redirect to dashboard or a relevant page
    } catch (err) {
      toast.error(
        err?.data?.error || err?.data?.message || "Failed to purchase quota."
      );
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow rounded">
      <h1 className="text-2xl font-bold mb-6 text-center">Buy Quota</h1>
      <form onSubmit={handleSubmit(handleBuyQuota)} className="space-y-4">
        <div>
          <Label htmlFor="mobile_number" className="block text-sm font-medium">
            Mobile Number (for Transaction)
          </Label>
          <Input
            id="mobile_number"
            {...register("mobile_number", {
              required: "Mobile number is required",
            })}
            type="text"
            placeholder="Enter your transaction mobile number"
          />
          {errors.mobile_number && (
            <span className="text-red-500 text-sm">
              {errors.mobile_number.message}
            </span>
          )}
        </div>

        <div>
          <Label htmlFor="payment_method" className="block text-sm font-medium">
            Payment Method
          </Label>
          <select
            id="payment_method"
            {...register("payment_method", {
              required: "Payment method is required",
            })}
            className="w-full border rounded px-3 py-2"
          >
            <option value="">Select a payment method</option>
            <option value="Bkash">bKash</option>
            <option value="Rocket">Rocket</option>
            <option value="Nagad">Nagad</option>
          </select>
          {errors.payment_method && (
            <span className="text-red-500 text-sm">
              {errors.payment_method.message}
            </span>
          )}
        </div>

        <div>
          <Label htmlFor="transaction_id" className="block text-sm font-medium">
            Transaction ID
          </Label>
          <Input
            id="transaction_id"
            {...register("transaction_id", {
              required: "Transaction ID is required",
            })}
            type="text"
            placeholder="Enter your transaction ID"
          />
          {errors.transaction_id && (
            <span className="text-red-500 text-sm">
              {errors.transaction_id.message}
            </span>
          )}
        </div>

        <div>
          <Label htmlFor="coupon" className="block text-sm font-medium">
            Coupon Code (Optional)
          </Label>
          <Input
            id="coupon"
            {...register("coupon")}
            type="text"
            placeholder="Enter your coupon code (if any)"
          />
        </div>

        <Button type="submit" className="w-full mt-4" disabled={isLoading}>
          {isLoading ? "Processing..." : "Buy Quota"}
        </Button>
      </form>
    </div>
  );
};

export default BuyQuotaPage;
