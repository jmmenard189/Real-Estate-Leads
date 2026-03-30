import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useSubmitLead } from "@workspace/api-client-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

const leadSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().optional(),
  message: z.string().optional(),
  leadType: z.enum(["buyer", "seller", "general"]),
  source: z.string(),
  address: z.string().optional(),
  areaOfInterest: z.string().optional(),
  timeline: z.string().optional(),
  budget: z.string().optional(),
});

type LeadFormValues = z.infer<typeof leadSchema>;

interface LeadFormProps {
  source: string;
  leadType?: "buyer" | "seller" | "general";
  title?: string;
  subtitle?: string;
  buttonText?: string;
  showAddress?: boolean;
  showAreaOfInterest?: boolean;
  showTimeline?: boolean;
  showBudget?: boolean;
  className?: string;
}

export function LeadForm({
  source,
  leadType = "general",
  title = "Get in Touch",
  subtitle = "Fill out the form below and we'll be in touch shortly.",
  buttonText = "Get Started",
  showAddress = false,
  showAreaOfInterest = false,
  showTimeline = false,
  showBudget = false,
  className = "",
}: LeadFormProps) {
  const { toast } = useToast();
  const submitLead = useSubmitLead();

  const form = useForm<LeadFormValues>({
    resolver: zodResolver(leadSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
      leadType,
      source,
      address: "",
      areaOfInterest: "",
      timeline: "",
      budget: "",
    },
  });

  function onSubmit(data: LeadFormValues) {
    submitLead.mutate(
      { data },
      {
        onSuccess: () => {
          toast({
            title: "Success!",
            description: "Your information has been submitted. We'll contact you soon.",
          });
          form.reset();
        },
        onError: () => {
          toast({
            title: "Error",
            description: "Something went wrong. Please try again or contact us directly.",
            variant: "destructive",
          });
        },
      }
    );
  }

  return (
    <div className={`bg-card p-6 md:p-8 rounded-xl shadow-lg border ${className}`}>
      <div className="mb-6">
        <h3 className="text-2xl font-serif font-bold text-foreground mb-2">{title}</h3>
        {subtitle && <p className="text-muted-foreground text-sm">{subtitle}</p>}
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name *</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address *</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="john@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input type="tel" placeholder="(416) 555-0123" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {showAddress && (
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Property Address</FormLabel>
                  <FormControl>
                    <Input placeholder="123 Main St, Toronto" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          {showAreaOfInterest && (
            <FormField
              control={form.control}
              name="areaOfInterest"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Area of Interest</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. Markham, Vaughan, etc." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          {showTimeline && (
            <FormField
              control={form.control}
              name="timeline"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Timeline</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="When are you looking to move?" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="ASAP">ASAP</SelectItem>
                      <SelectItem value="1-3 months">1-3 months</SelectItem>
                      <SelectItem value="3-6 months">3-6 months</SelectItem>
                      <SelectItem value="6+ months">6+ months</SelectItem>
                      <SelectItem value="Just browsing">Just browsing</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          {showBudget && (
            <FormField
              control={form.control}
              name="budget"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Budget Range</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a budget range" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Under $750k">Under $750k</SelectItem>
                      <SelectItem value="$750k - $1M">$750k - $1M</SelectItem>
                      <SelectItem value="$1M - $1.5M">$1M - $1.5M</SelectItem>
                      <SelectItem value="$1.5M - $2M">$1.5M - $2M</SelectItem>
                      <SelectItem value="$2M+">$2M+</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Message (Optional)</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="How can we help you?" 
                    className="resize-none h-24" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button 
            type="submit" 
            className="w-full h-12 text-lg font-semibold mt-4" 
            disabled={submitLead.isPending}
          >
            {submitLead.isPending && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
            {buttonText}
          </Button>
        </form>
      </Form>
    </div>
  );
}
