import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const countries = [
  "Pakistan", "India", "United States", "Canada",
  "United Kingdom", "Germany", "France", "Australia"
];

export default function Checkout() {
  const [address, setAddress] = useState("");
  const [addressError, setAddressError] = useState(false);

  const handleCompleteOrder = () => {
    if (address.trim().split(" ").length < 12) {
      setAddressError(true);
    } else {
      setAddressError(false);
      alert("Order completed!");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8 text-gray-800">
      <h2 className="text-2xl font-semibold">Contact</h2>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input type="email" id="email" placeholder="Enter your email" />
        <div className="flex items-center space-x-2">
          <Checkbox id="newsletter" />
          <Label htmlFor="newsletter">Email me with news and offers</Label>
        </div>
      </div>

      <h2 className="text-2xl font-semibold">Delivery</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Label>Country</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Pakistan" />
            </SelectTrigger>
            <SelectContent>
              {countries.map((country) => (
                <SelectItem key={country} value={country}>{country}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label>First name</Label>
          <Input type="text" placeholder="Enter your first name" />
        </div>
        <div>
          <Label>Last name</Label>
          <Input type="text" placeholder="Enter your last name" />
        </div>
        <div className="sm:col-span-2">
          <Label>Address</Label>
          <Input
            type="text"
            placeholder="Add complete address & nearest landmark (At least 12 words)"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className={addressError ? "border-red-500" : ""}
          />
          {addressError && <p className="text-red-600 text-sm mt-1">Address must contain at least 12 words.</p>}
        </div>
        <div>
          <Label>City</Label>
          <Input type="text" placeholder="Enter your city" />
        </div>
        <div>
          <Label>Postal code (optional)</Label>
          <Input type="text" placeholder="Postal code" />
        </div>
        <div className="sm:col-span-2">
          <Label>Phone</Label>
          <Input type="tel" placeholder="Enter your phone number" />
        </div>
        <div className="flex items-center space-x-2 sm:col-span-2">
          <Checkbox id="save-info" />
          <Label htmlFor="save-info">Save this information for next time</Label>
        </div>
      </div>

      <h2 className="text-2xl font-semibold">Shipping method</h2>
      <div className="border p-4 rounded-xl">
        <p className="flex justify-between">Free Delivery <span className="font-medium">Free</span></p>
      </div>

      <h2 className="text-2xl font-semibold">Payment</h2>
      <p className="text-sm text-gray-600 mb-2">All transactions are secure and encrypted.</p>
      <RadioGroup defaultValue="cod" className="space-y-3">
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="cod" id="cod" />
          <Label htmlFor="cod">Cash on Delivery (COD)</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="payfast" id="payfast" />
          <Label htmlFor="payfast">PAYFAST (Pay via Debit/Credit/Wallet/Bank Account)</Label>
        </div>
        <div className="ml-6 text-sm text-gray-500">Visa, MasterCard, UnionPay</div>
      </RadioGroup>

      <h2 className="text-2xl font-semibold">Billing address</h2>
      <RadioGroup defaultValue="same" className="space-y-3">
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="same" id="same" />
          <Label htmlFor="same">Same as shipping address</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="different" id="different" />
          <Label htmlFor="different">Use a different billing address</Label>
        </div>
      </RadioGroup>

      <div className="pt-6">
        <Button onClick={handleCompleteOrder} className="w-full bg-red-800 hover:bg-red-900 text-white text-lg rounded-xl py-4">
          Complete Order
        </Button>
      </div>
    </div>
  );
}
