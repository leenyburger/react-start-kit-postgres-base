import { Head, Link, router } from "@inertiajs/react"
import { Rocket } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import AppLayout from "@/layouts/app-layout"
import { dashboardPath } from "@/routes"
import type { BreadcrumbItem } from "@/types"

interface Brief {
  website_url: string
  product_description: string
  target_audience: string
  budget: string
  campaign_goal: string
}

interface Keyword {
  match_type: string
  text: string
}

interface Ad {
  type: string
  headlines: string[]
  descriptions: string[]
}

interface Payload {
  campaign: {
    name: string
    goal: string
    daily_budget: number
  }
  ad_group: {
    name: string
  }
  ads: Ad[]
  keywords: Keyword[]
}

interface Props {
  brief: Brief
  payload: Payload
  submitted: boolean
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

export default function ShowAdGeneration({ brief, payload }: Props) {
  const ad = payload.ads[0] // Get the first ad

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Ad Generation Results" />

      <div className="flex h-full flex-1 flex-col p-4 overflow-y-auto">
        <div className="mx-auto w-full max-w-4xl space-y-6 pb-8">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">
              Your Google Ads Campaign
            </h1>
            <p className="text-muted-foreground text-lg">
              Generated from your business information
            </p>
          </div>

          {/* Campaign Info */}
          <Card>
            <CardHeader>
              <CardTitle>Campaign Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-muted-foreground">
                  Campaign Name
                </span>
                <span className="text-base font-medium">
                  {payload.campaign.name}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-muted-foreground">
                  Daily Budget
                </span>
                <span className="text-base font-medium">
                  ${payload.campaign.daily_budget}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-muted-foreground">
                  Campaign Goal
                </span>
                <Badge variant="secondary">{payload.campaign.goal}</Badge>
              </div>
            </CardContent>
          </Card>

          {/* Headlines */}
          <Card>
            <CardHeader>
              <CardTitle>Ad Headlines ({ad.headlines.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {ad.headlines.map((headline, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 p-3 rounded-md bg-muted/50"
                  >
                    <Badge variant="outline" className="mt-0.5">
                      {index + 1}
                    </Badge>
                    <span className="flex-1">{headline}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Descriptions */}
          <Card>
            <CardHeader>
              <CardTitle>Ad Descriptions ({ad.descriptions.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {ad.descriptions.map((description, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 p-3 rounded-md bg-muted/50"
                  >
                    <Badge variant="outline" className="mt-0.5">
                      {index + 1}
                    </Badge>
                    <span className="flex-1">{description}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Keywords */}
          <Card>
            <CardHeader>
              <CardTitle>Keywords ({payload.keywords.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {payload.keywords.map((keyword, index) => (
                  <Badge key={index} variant="secondary">
                    {keyword.text}
                    <span className="ml-2 text-xs opacity-60">
                      ({keyword.match_type})
                    </span>
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Push to Google Ads */}
          <Card className="border-blue-200 bg-blue-50/50 dark:border-blue-900 dark:bg-blue-950/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Rocket className="h-5 w-5" />
                Ready to Launch?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                This will create a real Google Ads campaign with the details
                shown above. Make sure everything looks correct before
                proceeding.
              </p>
              <Button
                onClick={() =>
                  router.post("/ad_generations/push_to_google", { payload })
                }
                className="w-full"
                size="lg"
              >
                <Rocket className="h-4 w-4 mr-2" />
                Push to Google Ads
              </Button>
              <p className="text-xs text-muted-foreground text-center">
                (Tomorrow's feature - currently not implemented)
              </p>
            </CardContent>
          </Card>

          {/* Action Buttons */}
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
