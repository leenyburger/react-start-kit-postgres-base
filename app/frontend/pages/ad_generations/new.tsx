import { Form, Head } from "@inertiajs/react"
import { LoaderCircle } from "lucide-react"

import InputError from "@/components/input-error"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import AppLayout from "@/layouts/app-layout"
import { dashboardPath } from "@/routes"
import type { BreadcrumbItem } from "@/types"

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: "Dashboard",
    href: dashboardPath(),
  },
  {
    title: "Generate Ads",
    href: "/ad_generations/new",
  },
]

export default function NewAdGeneration() {
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Generate Ads" />

      <div className="flex h-full flex-1 flex-col items-center justify-center p-4">
        <div className="w-full max-w-2xl space-y-8">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">
              Create Your Google Ads
            </h1>
            <p className="text-muted-foreground text-lg">
              Answer a few quick questions and we'll generate your ad campaign
            </p>
          </div>

          <Form
            method="post"
            action="/ad_generations"
            className="space-y-6 rounded-lg border p-8 shadow-sm"
          >
            {({ processing, errors }) => (
              <>
                <div className="space-y-6">
                  {/* Website URL */}
                  <div className="space-y-2">
                    <Label htmlFor="website_url" className="text-base">
                      What's your website URL?
                    </Label>
                    <Input
                      id="website_url"
                      type="url"
                      name="ad_generation[website_url]"
                      required
                      autoFocus
                      disabled={processing}
                      placeholder="https://yourbusiness.com"
                      className="text-base h-11"
                    />
                    <InputError message={errors.website_url} />
                  </div>

                  {/* Product Description */}
                  <div className="space-y-2">
                    <Label htmlFor="product_description" className="text-base">
                      What do you sell?
                    </Label>
                    <p className="text-muted-foreground text-sm">
                      Describe your product or service in a few words
                    </p>
                    <Input
                      id="product_description"
                      type="text"
                      name="ad_generation[product_description]"
                      required
                      disabled={processing}
                      placeholder="e.g., organic coffee beans, yoga classes, plumbing services"
                      className="text-base h-11"
                    />
                    <InputError message={errors.product_description} />
                  </div>

                  {/* Target Audience */}
                  <div className="space-y-2">
                    <Label htmlFor="target_audience" className="text-base">
                      Who is your target audience?
                    </Label>
                    <p className="text-muted-foreground text-sm">
                      Who are you trying to reach?
                    </p>
                    <Input
                      id="target_audience"
                      type="text"
                      name="ad_generation[target_audience]"
                      required
                      disabled={processing}
                      placeholder="e.g., health-conscious millennials, homeowners in Seattle"
                      className="text-base h-11"
                    />
                    <InputError message={errors.target_audience} />
                  </div>

                  {/* Budget */}
                  <div className="space-y-2">
                    <Label htmlFor="budget" className="text-base">
                      What's your monthly budget?
                    </Label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                        $
                      </span>
                      <Input
                        id="budget"
                        type="number"
                        name="ad_generation[budget]"
                        required
                        disabled={processing}
                        placeholder="500"
                        min="1"
                        step="1"
                        className="text-base h-11 pl-7"
                      />
                    </div>
                    <InputError message={errors.budget} />
                  </div>

                  {/* Campaign Goal */}
                  <div className="space-y-2">
                    <Label htmlFor="campaign_goal" className="text-base">
                      What's your campaign goal?
                    </Label>
                    <Select name="ad_generation[campaign_goal]" required>
                      <SelectTrigger className="text-base h-11 w-full">
                        <SelectValue placeholder="Select a goal" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="traffic">
                          Drive traffic to website
                        </SelectItem>
                        <SelectItem value="leads">Generate leads</SelectItem>
                        <SelectItem value="sales">Increase sales</SelectItem>
                      </SelectContent>
                    </Select>
                    <InputError message={errors.campaign_goal} />
                  </div>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  size="lg"
                  className="w-full text-base h-12"
                  disabled={processing}
                >
                  {processing && (
                    <LoaderCircle className="h-5 w-5 animate-spin" />
                  )}
                  Generate My Ads
                </Button>
              </>
            )}
          </Form>
        </div>
      </div>
    </AppLayout>
  )
}
