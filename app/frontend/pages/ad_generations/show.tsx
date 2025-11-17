import { Head, Link } from "@inertiajs/react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import AppLayout from "@/layouts/app-layout"
import { dashboardPath } from "@/routes"
import type { BreadcrumbItem } from "@/types"

interface Generation {
  website_url: string
  product_description: string
  target_audience: string
  budget: string
  campaign_goal: string
}

interface Props {
  generation: Generation
}

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: "Dashboard",
    href: dashboardPath(),
  },
  {
    title: "Ad Generation Results",
    href: "#",
  },
]

const goalLabels: Record<string, string> = {
  traffic: "Drive traffic to website",
  leads: "Generate leads",
  sales: "Increase sales",
}

export default function ShowAdGeneration({ generation }: Props) {
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Ad Generation Results" />

      <div className="flex h-full flex-1 flex-col items-center justify-center p-4">
        <div className="w-full max-w-2xl space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">
              Form Submitted Successfully!
            </h1>
            <p className="text-muted-foreground text-lg">
              Here's what you entered:
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Your Business Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <dt className="text-sm font-medium text-muted-foreground">
                  Website URL
                </dt>
                <dd className="mt-1 text-base">{generation.website_url}</dd>
              </div>

              <div>
                <dt className="text-sm font-medium text-muted-foreground">
                  What you sell
                </dt>
                <dd className="mt-1 text-base">
                  {generation.product_description}
                </dd>
              </div>

              <div>
                <dt className="text-sm font-medium text-muted-foreground">
                  Target audience
                </dt>
                <dd className="mt-1 text-base">{generation.target_audience}</dd>
              </div>

              <div>
                <dt className="text-sm font-medium text-muted-foreground">
                  Monthly budget
                </dt>
                <dd className="mt-1 text-base">${generation.budget}</dd>
              </div>

              <div>
                <dt className="text-sm font-medium text-muted-foreground">
                  Campaign goal
                </dt>
                <dd className="mt-1 text-base">
                  {goalLabels[generation.campaign_goal] ||
                    generation.campaign_goal}
                </dd>
              </div>
            </CardContent>
          </Card>

          <div className="bg-muted/50 rounded-lg p-4 border">
            <p className="text-sm text-muted-foreground text-center">
              <strong>Coming tomorrow:</strong> AI-generated ad headlines,
              descriptions, keywords, and CSV export
            </p>
          </div>

          <div className="flex gap-3">
            <Button asChild variant="outline" className="flex-1">
              <Link href="/ad_generations/new">Create Another</Link>
            </Button>
            <Button asChild className="flex-1">
              <Link href={dashboardPath()}>Back to Dashboard</Link>
            </Button>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
